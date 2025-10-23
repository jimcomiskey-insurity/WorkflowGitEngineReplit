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
        // Migrate from old location (inside Git repo) to new persistent location
        var oldPrPath = Path.GetFullPath(Path.Combine(contentRootPath, "data", "pull-requests"));
        
        if (Directory.Exists(oldPrPath))
        {
            var prFiles = Directory.GetFiles(oldPrPath, "*_pull_requests.json");
            
            if (prFiles.Length > 0)
            {
                _logger.LogInformation("Migrating {Count} pull request files from {OldPath} to {NewPath}", 
                    prFiles.Length, oldPrPath, _baseStoragePath);
                
                foreach (var oldFile in prFiles)
                {
                    var fileName = Path.GetFileName(oldFile);
                    var newFile = Path.Combine(_baseStoragePath, fileName);
                    
                    if (!File.Exists(newFile))
                    {
                        File.Copy(oldFile, newFile);
                        _logger.LogInformation("Migrated pull requests file: {FileName}", fileName);
                    }
                }
            }
        }
        
        // Consolidate per-user PR files into single global file
        ConsolidateUserPullRequests();
    }
    
    private void ConsolidateUserPullRequests()
    {
        var globalFile = GetPullRequestsFilePath();
        var globalFileName = Path.GetFileName(globalFile);
        var userPrFiles = Directory.GetFiles(_baseStoragePath, "*_pull_requests.json")
            .Where(f => Path.GetFileName(f) != globalFileName) // Exclude the global file itself
            .ToList();
        
        if (userPrFiles.Count == 0)
        {
            return; // No per-user files to consolidate
        }
        
        _logger.LogInformation("Consolidating {Count} user-specific PR files into global storage", userPrFiles.Count);
        
        // Load existing global PRs (if any)
        var allPrs = new List<PullRequest>();
        if (File.Exists(globalFile))
        {
            var json = File.ReadAllText(globalFile);
            allPrs = JsonSerializer.Deserialize<List<PullRequest>>(json) ?? new List<PullRequest>();
        }
        
        // Track which PR numbers are already in use
        var usedNumbers = new HashSet<int>(allPrs.Select(pr => pr.Number));
        int maxNumber = usedNumbers.Any() ? usedNumbers.Max() : 0;
        
        // Consolidate all user PRs
        foreach (var userFile in userPrFiles)
        {
            try
            {
                var json = File.ReadAllText(userFile);
                var userPrs = JsonSerializer.Deserialize<List<PullRequest>>(json) ?? new List<PullRequest>();
                
                foreach (var pr in userPrs)
                {
                    // Check if this PR number is already in use
                    if (usedNumbers.Contains(pr.Number))
                    {
                        // Number conflict - assign a new unique number
                        maxNumber++;
                        while (usedNumbers.Contains(maxNumber))
                        {
                            maxNumber++;
                        }
                        
                        _logger.LogInformation("Renumbering PR #{OldNumber} to #{NewNumber} to avoid conflict", 
                            pr.Number, maxNumber);
                        pr.Number = maxNumber;
                    }
                    
                    // Mark this number as used
                    usedNumbers.Add(pr.Number);
                    allPrs.Add(pr);
                }
                
                _logger.LogInformation("Consolidated {Count} PRs from {File}", userPrs.Count, Path.GetFileName(userFile));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error consolidating PRs from {File}", userFile);
            }
        }
        
        // Save consolidated PRs
        SavePullRequests(allPrs);
        
        // Archive old user-specific files (don't delete in case of issues)
        foreach (var userFile in userPrFiles)
        {
            try
            {
                var archiveFile = userFile + ".archived";
                File.Move(userFile, archiveFile, overwrite: true);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Could not archive {File}", userFile);
            }
        }
        
        _logger.LogInformation("PR consolidation complete. {Count} total PRs in global storage", allPrs.Count);
    }

    private string GetPullRequestsFilePath()
    {
        return Path.Combine(_baseStoragePath, "pull_requests.json");
    }

    public List<PullRequest> GetAllPullRequests(string userId, string? status = null)
    {
        var filePath = GetPullRequestsFilePath();
        
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
        SavePullRequests(prs);

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

        SavePullRequests(prs);

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

        SavePullRequests(prs);

        _logger.LogInformation("Closed PR #{Number}: {Title}", pr.Number, pr.Title);

        return pr;
    }

    private void SavePullRequests(List<PullRequest> prs)
    {
        var filePath = GetPullRequestsFilePath();
        var json = JsonSerializer.Serialize(prs, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(filePath, json);
    }
}
