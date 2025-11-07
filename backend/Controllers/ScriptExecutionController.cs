using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Completion;
using Microsoft.CodeAnalysis.Host.Mef;
using Microsoft.CodeAnalysis.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkflowConfig.Api.Controllers
{
    [ApiController]
    [Route("api/users/{userId}/script")]
    public class ScriptExecutionController : ControllerBase
    {
        [HttpPost("execute")]
        [OpenApiOperation("Execute Script")]
        [ProducesResponseType(typeof(ScriptExecutionResult), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> ExecuteScript(string userId, [FromBody] ScriptExecutionRequest request)
        {
            try
            {
                var parameters = string.Join(", ", request.Inputs.Select(i =>
                {
                    var value = ParseValue(i.DataType, i.TestValue, i.TestWithNull);
                    return FormatParameter(i.Alias, value);
                }));

                var fullScript = $@"
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

{request.Script}

Calculate({parameters})
";

                var scriptOptions = ScriptOptions.Default
                    .WithReferences(
                        typeof(object).Assembly, 
                        typeof(Enumerable).Assembly,
                        typeof(System.Text.RegularExpressions.Regex).Assembly)
                    .WithImports(
                        "System", 
                        "System.Collections.Generic",
                        "System.Linq", 
                        "System.Text",
                        "System.Text.RegularExpressions");
                
                var result = await CSharpScript.EvaluateAsync<object>(
                    fullScript,
                    scriptOptions
                );

                return Ok(new ScriptExecutionResult
                {
                    Success = true,
                    Result = result?.ToString() ?? "null",
                    ResultType = result?.GetType().Name ?? "null"
                });
            }
            catch (CompilationErrorException ex)
            {
                return Ok(new ScriptExecutionResult
                {
                    Success = false,
                    Error = string.Join("\n", ex.Diagnostics.Select(d => d.GetMessage()))
                });
            }
            catch (Exception ex)
            {
                return Ok(new ScriptExecutionResult
                {
                    Success = false,
                    Error = ex.Message
                });
            }
        }

        [HttpPost("completions")]
        [OpenApiOperation("Get Code Completions")]
        [ProducesResponseType(typeof(CompletionResponse), 200)]
        public async Task<IActionResult> GetCompletions(string userId, [FromBody] CompletionRequest request)
        {
            try
            {
                var scriptBuilder = new StringBuilder();
                
                // Add common using statements for IntelliSense
                scriptBuilder.AppendLine("using System;");
                scriptBuilder.AppendLine("using System.Collections.Generic;");
                scriptBuilder.AppendLine("using System.Linq;");
                scriptBuilder.AppendLine("using System.Text;");
                scriptBuilder.AppendLine("using System.Text.RegularExpressions;");
                scriptBuilder.AppendLine();
                
                // Wrap in class for proper C# context
                scriptBuilder.AppendLine("public class Script");
                scriptBuilder.AppendLine("{");
                
                // Build method signature with parameters
                scriptBuilder.Append("    public object Calculate(");
                var parameters = request.Inputs.Select(input => 
                {
                    var csharpType = GetCSharpType(input.DataType);
                    return $"{csharpType} {input.Alias}";
                });
                scriptBuilder.Append(string.Join(", ", parameters));
                scriptBuilder.AppendLine(")");
                scriptBuilder.AppendLine("    {");
                
                // Calculate prefix length before adding user's script
                var prefixLength = scriptBuilder.Length;
                
                // Add user's script inside the method (WITHOUT indentation to avoid offset issues)
                scriptBuilder.AppendLine(request.Script);
                
                // Close the method and class
                scriptBuilder.AppendLine("    }");
                scriptBuilder.AppendLine("}");
                
                var fullScript = scriptBuilder.ToString();
                var adjustedPosition = prefixLength + request.Position;
                
                var workspace = new AdhocWorkspace(MefHostServices.Create(MefHostServices.DefaultAssemblies));
                var projectInfo = ProjectInfo.Create(
                    ProjectId.CreateNewId(),
                    VersionStamp.Default,
                    "Script",
                    "Script",
                    LanguageNames.CSharp,
                    metadataReferences: new[]
                    {
                        MetadataReference.CreateFromFile(typeof(object).Assembly.Location),
                        MetadataReference.CreateFromFile(typeof(Enumerable).Assembly.Location),
                        MetadataReference.CreateFromFile(typeof(Console).Assembly.Location),
                        MetadataReference.CreateFromFile(typeof(DateTime).Assembly.Location),
                        MetadataReference.CreateFromFile(typeof(List<>).Assembly.Location),
                        MetadataReference.CreateFromFile(typeof(StringBuilder).Assembly.Location),
                        MetadataReference.CreateFromFile(typeof(System.Text.RegularExpressions.Regex).Assembly.Location)
                    }
                );
                
                var project = workspace.AddProject(projectInfo);
                var document = project.AddDocument("Script.cs", SourceText.From(fullScript));
                
                // Force Roslyn to compile and analyze the document
                var semanticModel = await document.GetSemanticModelAsync();
                if (semanticModel == null)
                {
                    return Ok(new CompletionResponse());
                }
                
                var completionService = CompletionService.GetService(document);
                if (completionService == null)
                {
                    return Ok(new CompletionResponse());
                }
                
                var completions = await completionService.GetCompletionsAsync(document, adjustedPosition);
                
                var items = new List<CompletionSuggestion>();
                
                // PRIORITIZE: Add parameters and local variables FIRST (they should appear at top of list)
                var localSymbols = semanticModel.LookupSymbols(adjustedPosition);
                var parameterNames = new HashSet<string>();
                
                foreach (var symbol in localSymbols)
                {
                    // Only add parameters and local variables
                    if (symbol.Kind == SymbolKind.Parameter || symbol.Kind == SymbolKind.Local)
                    {
                        parameterNames.Add(symbol.Name);
                        items.Add(new CompletionSuggestion
                        {
                            Label = symbol.Name,
                            Kind = symbol.Kind == SymbolKind.Parameter ? "Parameter" : "Variable",
                            InsertText = symbol.Name,
                            Detail = symbol.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat),
                            Documentation = null
                        });
                    }
                }
                
                // Add standard completions (types, keywords, members, etc.) AFTER parameters
                if (completions != null)
                {
                    items.AddRange(completions.ItemsList
                        .Take(100)
                        .Where(item => !parameterNames.Contains(item.DisplayText)) // Avoid duplicates
                        .Select(item => new CompletionSuggestion
                        {
                            Label = item.DisplayText,
                            Kind = GetCompletionKind(item.Tags),
                            InsertText = item.DisplayText,
                            Detail = item.InlineDescription,
                            Documentation = null
                        }));
                }
                
                return Ok(new CompletionResponse { Items = items });
            }
            catch (Exception)
            {
                return Ok(new CompletionResponse());
            }
        }

        private static string GetCompletionKind(System.Collections.Immutable.ImmutableArray<string> tags)
        {
            if (tags.Contains("Class")) return "Class";
            if (tags.Contains("Method")) return "Method";
            if (tags.Contains("Property")) return "Property";
            if (tags.Contains("Field")) return "Field";
            if (tags.Contains("Namespace")) return "Module";
            if (tags.Contains("Keyword")) return "Keyword";
            if (tags.Contains("Local")) return "Variable";
            if (tags.Contains("Parameter")) return "Variable";
            return "Text";
        }

        private string GetCSharpType(string dataType)
        {
            return dataType.ToLower() switch
            {
                "string" or "email" or "phone" or "url" or "zipcode" => "string",
                "integer" or "year" => "int?",
                "decimal" or "money" => "decimal?",
                "date" or "timestamp" => "DateTime?",
                "yes-no" => "string",
                "list of strings" => "List<string>",
                _ => "string"
            };
        }

        private string FormatParameter(string alias, object? value)
        {
            if (value == null) return "null";
            if (value is string s) return $"\"{s}\"";
            if (value is bool b) return b ? "true" : "false";
            if (value is decimal d) return $"{d}m";
            return value.ToString() ?? "null";
        }

        private object? ParseValue(string dataType, string? testValue, bool testWithNull)
        {
            if (testWithNull || string.IsNullOrEmpty(testValue))
            {
                return null;
            }

            return dataType.ToLower() switch
            {
                "integer" => int.TryParse(testValue, out var intVal) ? intVal : null,
                "decimal" or "money" => decimal.TryParse(testValue, out var decVal) ? decVal : null,
                "date" or "timestamp" => DateTime.TryParse(testValue, out var dateVal) ? dateVal : null,
                "year" => int.TryParse(testValue, out var yearVal) ? yearVal : null,
                "yes-no" => bool.TryParse(testValue, out var boolVal) ? boolVal : null,
                "string" or "email" or "phone" or "url" or "zipcode" => testValue,
                "list of strings" => testValue?.Split(',').Select(s => s.Trim()).ToList(),
                _ => testValue
            };
        }
    }

    public class ScriptExecutionRequest
    {
        public string Script { get; set; } = string.Empty;
        public List<ScriptInputValue> Inputs { get; set; } = new List<ScriptInputValue>();
    }

    public class ScriptInputValue
    {
        public string Alias { get; set; } = string.Empty;
        public string DataType { get; set; } = string.Empty;
        public string? TestValue { get; set; }
        public bool TestWithNull { get; set; }
    }

    public class ScriptExecutionResult
    {
        public bool Success { get; set; }
        public string? Result { get; set; }
        public string? ResultType { get; set; }
        public string? Error { get; set; }
    }

    public class CompletionRequest
    {
        public string Script { get; set; } = string.Empty;
        public int Position { get; set; }
        public List<CompletionInput> Inputs { get; set; } = new();
    }

    public class CompletionInput
    {
        public string Alias { get; set; } = string.Empty;
        public string DataType { get; set; } = string.Empty;
    }

    public class CompletionResponse
    {
        public List<CompletionSuggestion> Items { get; set; } = new();
    }

    public class CompletionSuggestion
    {
        public string Label { get; set; } = string.Empty;
        public string Kind { get; set; } = string.Empty;
        public string InsertText { get; set; } = string.Empty;
        public string? Detail { get; set; }
        public string? Documentation { get; set; }
    }
}
