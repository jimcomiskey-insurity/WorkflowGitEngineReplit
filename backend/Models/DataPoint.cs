using System.Collections.Generic;

namespace WorkflowConfig.Api.Models
{
    public class DataPoint
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Tag { get; set; }
        public string DataType { get; set; } = "String";
        public int OrderIndex { get; set; }
        
        public DataPointConfiguration Configuration { get; set; } = new DataPointConfiguration();
        public DataPointCalculation? Calculation { get; set; }
        public string? GitStatus { get; set; }
    }

    public class DataPointConfiguration
    {
        public string Mode { get; set; } = "Basic";
        public string? DefaultValue { get; set; }
        public bool AllowMultiLine { get; set; } = false;
        public int? MinLength { get; set; }
        public int? MaxLength { get; set; }
        public int? MinValue { get; set; }
        public int? MaxValue { get; set; }
        public int? DecimalPlaces { get; set; }
        public string? Format { get; set; }
        public List<string>? AllowedValues { get; set; }
        public Dictionary<string, object>? AdditionalProperties { get; set; }
    }

    public class DataPointCalculation
    {
        public List<ScriptInput> Inputs { get; set; } = new List<ScriptInput>();
        public string Script { get; set; } = string.Empty;
    }

    public class ScriptInput
    {
        public string DataPointId { get; set; } = string.Empty;
        public string DataPointName { get; set; } = string.Empty;
        public string DataType { get; set; } = string.Empty;
        public string Alias { get; set; } = string.Empty;
    }
}
