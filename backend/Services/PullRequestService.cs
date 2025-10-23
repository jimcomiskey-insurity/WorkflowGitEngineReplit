using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using WorkflowConfig.Api.Models;

namespace WorkflowConfig.Api.Services;

public class PullRequestService
{
    private readonly string _baseStoragePath;
    private readonly ILogger<PullRequestService> _logger;

    public PullRequestService(IConfiguration configuration, IWebHostEnvironment environment, ILogger<PullRequestService> logger)
    {
        _logger = logger;
        
        // Store PRs outside Git repository in persistent storage
        var prBasePath = configuration["GitSettings:PullRequestsPath"] ?? "../../workflow-data/pull-requests";
        
        _baseStoragePath = Path.IsPathRooted(prBasePath) 
            ? prBasePath 
            : Path.GetFullPath(Path.Combine(environment.ContentRootPath, prBasePath));
            
        Directory.CreateDirectory(_baseStoragePath);
        _logger.LogInformation("Pull requests storage path: {Path}", _baseStoragePath);
        
        // One-time migration: move PR files from old location (inside Git repo) to new persistent location
        MigrateLegacyPullRequests(environment.ContentRootPath);
    }
    
    private void MigrateLegacyPullRequests(string contentRootPath)
    {
        var oldPrPath = Path.GetFullPath(Path.Combine(contentRootPath, "data", "pull-requests"));
        
        if (!Directory.Exists(oldPrPath))
        {
            return; // No legacy data to migrate
        }
        
        var prFiles = Directory.GetFiles(oldPrPath, "*_pull_requests.json");
        
        if (prFiles.Length == 0)
        {
            _logger.LogDebug("No legacy pull request files found at {OldPath}", oldPrPath);
            return;
        }
        
        _logger.LogInformation("Migrating {Count} pull request files from {OldPath} to {NewPath}", 
            prFiles.Length, oldPrPath, _baseStoragePath);
        
        foreach (var oldFile in prFiles)
        {
            var fileName = Path.GetFileName(oldFile);
            var newFile = Path.Combine(_baseStoragePath, fileName);
            
            // Only migrate if the file doesn't already exist in the new location
            if (!File.Exists(newFile))
            {
                File.Copy(oldFile, newFile);
                _logger.LogInformation("Migrated pull requests file: {FileName}", fileName);
            }
        }
        
        _logger.LogInformation("Pull request migration complete. Legacy files remain at {OldPath} for safety.", oldPrPath);
    }

    private string GetPullRequestsFilePath(string userId)
    {
        return Path.Combine(_baseStoragePath, $"{userId}_pull_requests.json");
    }

    public List<PullRequest> GetAllPullRequests(string userId, string? status = null)
    {
        var filePath = GetPullRequestsFilePath(userId);
        
        if (!File.Exists(filePath))
        {
            return new List<PullRequest>();
        }

        var json = File.ReadAllText(filePath);
        var prs = JsonSerializer.Deserialize<List<PullRequest>>(json) ?? new List<PullRequest>();

        if (!string.IsNullOrEmpty(status))
        {
            prs = prs.Where(pr => pr.Status.Equals(status, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        return prs.OrderByDescending(pr => pr.Number).ToList();
    }

    public PullRequest? GetPullRequest(string userId, int number)
    {
        var prs = GetAllPullRequests(userId);
        return prs.FirstOrDefault(pr => pr.Number == number);
    }

    public PullRequest CreatePullRequest(string userId, CreatePullRequestRequest request)
    {
        var prs = GetAllPullRequests(userId);
        var nextNumber = prs.Any() ? prs.Max(pr => pr.Number) + 1 : 1;

        var newPr = new PullRequest
        {
            Number = nextNumber,
            Title = request.Title,
            Description = request.Description,
            SourceBranch = request.SourceBranch,
            TargetBranch = request.TargetBranch,
            Status = "open",
            Author = userId,
            CreatedDate = DateTime.UtcNow
        };

        prs.Add(newPr);
        SavePullRequests(userId, prs);

        _logger.LogInformation("Created PR #{Number}: {Title} from {Source} to {Target}", 
            newPr.Number, newPr.Title, newPr.SourceBranch, newPr.TargetBranch);

        return newPr;
    }

    public PullRequest? MergePullRequest(string userId, int number)
    {
        var prs = GetAllPullRequests(userId);
        var pr = prs.FirstOrDefault(pr => pr.Number == number);

        if (pr == null || pr.Status != "open")
        {
            return null;
        }

        pr.Status = "merged";
        pr.MergedDate = DateTime.UtcNow;

        SavePullRequests(userId, prs);

        _logger.LogInformation("Merged PR #{Number}: {Title}", pr.Number, pr.Title);

        return pr;
    }

    public PullRequest? ClosePullRequest(string userId, int number)
    {
        var prs = GetAllPullRequests(userId);
        var pr = prs.FirstOrDefault(pr => pr.Number == number);

        if (pr == null || pr.Status != "open")
        {
            return null;
        }

        pr.Status = "closed";

        SavePullRequests(userId, prs);

        _logger.LogInformation("Closed PR #{Number}: {Title}", pr.Number, pr.Title);

        return pr;
    }

    private void SavePullRequests(string userId, List<PullRequest> prs)
    {
        var filePath = GetPullRequestsFilePath(userId);
        var json = JsonSerializer.Serialize(prs, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(filePath, json);
    }
}
