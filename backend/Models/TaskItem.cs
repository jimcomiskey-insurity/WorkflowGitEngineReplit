namespace WorkflowConfig.Api.Models;

public class TaskItem
{
    public string? TaskId { get; set; }
    public string TaskName { get; set; } = string.Empty;
    public string TaskType { get; set; } = string.Empty;
    public string AssignedRole { get; set; } = string.Empty;
    public double EstimatedDurationHours { get; set; }
    public List<string> Dependencies { get; set; } = new();
    public bool IsAutomated { get; set; }
    public string? GitStatus { get; set; }
}
