namespace WorkflowConfig.Api.Models
{
    public class DataStoreListItem
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int NoOfTimesUsed { get; set; }
    }
}
