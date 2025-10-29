namespace WorkflowConfig.Api.Models;

public class PullRequest
{
    public int Number { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string SourceBranch { get; set; } = string.Empty;
    public string TargetBranch { get; set; } = string.Empty;
    public string Status { get; set; } = "open";
    public string Author { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public DateTime? MergedDate { get; set; }
    public string? SourceCommitSha { get; set; }
    public string? TargetCommitSha { get; set; }
}

public class CreatePullRequestRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string SourceBranch { get; set; } = string.Empty;
    public string TargetBranch { get; set; } = string.Empty;
}

public class PullRequestSuggestion
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int CommitCount { get; set; }
}

public class BranchComparison
{
    public string SourceBranch { get; set; } = string.Empty;
    public string TargetBranch { get; set; } = string.Empty;
    public int CommitsAhead { get; set; }
    public int CommitsBehind { get; set; }
    public List<WorkflowChange> Changes { get; set; } = new();
    public List<AssetChange> AssetChanges { get; set; } = new();
    public List<CommitInfo> Commits { get; set; } = new();
}

public class WorkflowChange
{
    public string WorkflowKey { get; set; } = string.Empty;
    public string WorkflowName { get; set; } = string.Empty;
    public string ChangeType { get; set; } = string.Empty;
    public Workflow? SourceWorkflow { get; set; }
    public Workflow? TargetWorkflow { get; set; }
}

public class AssetChange
{
    public Guid? AssetId { get; set; }
    public string AssetName { get; set; } = string.Empty;
    public string ChangeType { get; set; } = string.Empty;
    public Asset? SourceAsset { get; set; }
    public Asset? TargetAsset { get; set; }
    public bool FileContentChanged { get; set; }
}
