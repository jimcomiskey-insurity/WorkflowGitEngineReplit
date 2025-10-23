using System.Text.Json;
using WorkflowConfig.Api.Models;

namespace WorkflowConfig.Api.Services;

public class PullRequestService
{
    private readonly string _baseStoragePath;
    private readonly ILogger<PullRequestService> _logger;

    public PullRequestService(ILogger<PullRequestService> logger)
    {
        _logger = logger;
        _baseStoragePath = Path.Combine(Directory.GetCurrentDirectory(), "data", "pull-requests");
        Directory.CreateDirectory(_baseStoragePath);
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
