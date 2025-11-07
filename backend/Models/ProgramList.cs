namespace WorkflowConfig.Api.Models;

public class ProgramList
{
    public List<ProgramListItem> Programs { get; set; } = new();
}

public class ProgramListItem
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
}
