namespace WorkflowConfig.Api.Models;

public class MergeConflictInfo
{
    public List<WorkflowConflict> WorkflowConflicts { get; set; } = new();
    public List<DeletionConflict> DeletionConflicts { get; set; } = new();
    public List<AssetConflict> AssetConflicts { get; set; } = new();
    public List<AssetFileContentConflict> AssetFileContentConflicts { get; set; } = new();
    public string SourceBranch { get; set; } = string.Empty;
    public string TargetBranch { get; set; } = string.Empty;
    public int TotalConflicts { get; set; }
}

public enum ConflictObjectType
{
    Workflow,
    Phase,
    Task
}

public class DeletionConflict
{
    public ConflictObjectType ObjectType { get; set; }
    public string WorkflowKey { get; set; } = string.Empty;
    public string? PhaseName { get; set; }
    public string? TaskId { get; set; }
    
    public string ObjectIdentifier { get; set; } = string.Empty;
    public string ObjectDisplayName { get; set; } = string.Empty;
    
    public bool DeletedInSource { get; set; }
    public bool ModifiedInSource { get; set; }
    public bool DeletedInTarget { get; set; }
    public bool ModifiedInTarget { get; set; }
    
    public string? ModifiedObjectJson { get; set; }
    
    public string? Resolution { get; set; }
}

public class WorkflowConflict
{
    public string WorkflowKey { get; set; } = string.Empty;
    public string WorkflowName { get; set; } = string.Empty;
    public List<FieldConflict> FieldConflicts { get; set; } = new();
    public List<PhaseConflict> PhaseConflicts { get; set; } = new();
}

public class FieldConflict
{
    public string FieldName { get; set; } = string.Empty;
    public string? BaseValue { get; set; }
    public string? CurrentValue { get; set; }
    public string? IncomingValue { get; set; }
    public string? Resolution { get; set; }
}

public class PhaseConflict
{
    public string PhaseName { get; set; } = string.Empty;
    public int PhaseOrder { get; set; }
    public List<FieldConflict> FieldConflicts { get; set; } = new();
    public List<TaskConflict> TaskConflicts { get; set; } = new();
}

public class TaskConflict
{
    public string TaskId { get; set; } = string.Empty;
    public string TaskName { get; set; } = string.Empty;
    public List<FieldConflict> FieldConflicts { get; set; } = new();
}

public class ConflictResolution
{
    public string WorkflowKey { get; set; } = string.Empty;
    public string? PhaseName { get; set; }
    public string? TaskId { get; set; }
    public string FieldName { get; set; } = string.Empty;
    public string Resolution { get; set; } = string.Empty;
    
    public bool IsDeletionConflict { get; set; }
    public ConflictObjectType? ObjectType { get; set; }
}

public class AssetConflict
{
    public Guid AssetId { get; set; }
    public string AssetName { get; set; } = string.Empty;
    public List<FieldConflict> FieldConflicts { get; set; } = new();
}

public class AssetFileContentConflict
{
    public Guid AssetId { get; set; }
    public string AssetName { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string FileType { get; set; } = string.Empty;
    public string ConflictedContent { get; set; } = string.Empty;
    public bool HasConflictMarkers { get; set; }
    public string? Resolution { get; set; }
}

public class ResolveConflictsRequest
{
    public List<ConflictResolution> Resolutions { get; set; } = new();
    public List<AssetFileContentResolution> AssetFileResolutions { get; set; } = new();
}

public class AssetFileContentResolution
{
    public Guid AssetId { get; set; }
    public string ResolvedContent { get; set; } = string.Empty;
}
