using System.Collections.Generic;

namespace WorkflowConfig.Api.Models
{
    public class DataStore
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int NoOfTimesUsed { get; set; } = 0;
        public List<string>? Aliases { get; set; }
        public List<DataGroup> DataGroups { get; set; } = new List<DataGroup>();
        public string? GitStatus { get; set; }
    }
}
