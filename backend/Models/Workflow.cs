namespace WorkflowConfig.Api.Models;

public class Workflow
{
    public string WorkflowName { get; set; } = string.Empty;
    public string WorkflowKey { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<Phase> Phases { get; set; } = new();
}
