namespace WorkflowConfig.Api.Models;

public class Asset
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Tags { get; set; } = new();
    public string? FileName { get; set; }
    public string? FileType { get; set; }
    public long? FileSizeBytes { get; set; }
    public DateTime? FileUploadedDate { get; set; }
    public string? GitStatus { get; set; }
}
