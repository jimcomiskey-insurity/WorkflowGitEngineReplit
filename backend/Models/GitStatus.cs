namespace WorkflowConfig.Api.Models;

public class GitStatus
{
    public List<string> Added { get; set; } = new();
    public List<string> Modified { get; set; } = new();
    public List<string> Removed { get; set; } = new();
    public List<string> Untracked { get; set; } = new();
    public string CurrentBranch { get; set; } = string.Empty;
    public bool IsDirty { get; set; }
    public int CommitsAhead { get; set; }
    public int CommitsBehind { get; set; }
}

public class CommitInfo
{
    public string Sha { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public DateTimeOffset Date { get; set; }
}
