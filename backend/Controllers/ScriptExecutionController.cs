using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;
using System;
using System.Collections.Generic;
using System.Linq;
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
using System.Linq;

{request.Script}

Calculate({parameters})
";

                var scriptOptions = ScriptOptions.Default
                    .WithReferences(typeof(object).Assembly, typeof(Enumerable).Assembly)
                    .WithImports("System", "System.Linq");
                
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
}
