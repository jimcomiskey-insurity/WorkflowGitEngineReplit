namespace WorkflowConfig.Api.Models;

public class Phase
{
    public string PhaseName { get; set; } = string.Empty;
    public int PhaseOrder { get; set; }
    public List<TaskItem> Tasks { get; set; } = new();
}
