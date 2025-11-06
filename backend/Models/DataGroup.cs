using System.Collections.Generic;

namespace WorkflowConfig.Api.Models
{
    public class DataGroup
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Tag { get; set; }
        public string? ParentId { get; set; }
        public int OrderIndex { get; set; }
        public List<DataPoint> DataPoints { get; set; } = new List<DataPoint>();
        public List<DataGroup> ChildGroups { get; set; } = new List<DataGroup>();
    }
}
