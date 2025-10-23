using Microsoft.AspNetCore.Mvc;
using WorkflowConfig.Api.Models;
using WorkflowConfig.Api.Services;

namespace WorkflowConfig.Api.Controllers;

[ApiController]
[Route("api/pull-requests")]
public class PullRequestController : ControllerBase
{
    private readonly PullRequestService _pullRequestService;
    private readonly GitService _gitService;
    private readonly ILogger<PullRequestController> _logger;

    public PullRequestController(
        PullRequestService pullRequestService,
        GitService gitService,
        ILogger<PullRequestController> logger)
    {
        _pullRequestService = pullRequestService;
        _gitService = gitService;
        _logger = logger;
    }

    [HttpGet]
    public ActionResult<IEnumerable<PullRequest>> GetPullRequests(
        [FromQuery] string userId,
        [FromQuery] string? status = null)
    {
        try
        {
            var pullRequests = _pullRequestService.GetAllPullRequests(userId, status);
            return Ok(pullRequests);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving pull requests for user {UserId}", userId);
            return StatusCode(500, new { message = "Error retrieving pull requests" });
        }
    }

    [HttpGet("{number}")]
    public ActionResult<PullRequest> GetPullRequest(
        [FromQuery] string userId,
        int number)
    {
        try
        {
            var pullRequest = _pullRequestService.GetPullRequest(userId, number);
            
            if (pullRequest == null)
            {
                return NotFound(new { message = $"Pull request #{number} not found" });
            }

            return Ok(pullRequest);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving pull request #{Number} for user {UserId}", number, userId);
            return StatusCode(500, new { message = "Error retrieving pull request" });
        }
    }

    [HttpGet("{number}/comparison")]
    public ActionResult<BranchComparison> GetBranchComparison(
        [FromQuery] string userId,
        int number)
    {
        try
        {
            var pullRequest = _pullRequestService.GetPullRequest(userId, number);
            
            if (pullRequest == null)
            {
                return NotFound(new { message = $"Pull request #{number} not found" });
            }

            // Use the stored commit SHAs only for merged PRs to show historical changes
            // For open PRs, use null to compare current branch tips (allows updates after PR creation)
            var sourceCommitSha = pullRequest.Status == "merged" ? pullRequest.SourceCommitSha : null;
            var targetCommitSha = pullRequest.Status == "merged" ? pullRequest.TargetCommitSha : null;
            
            var comparison = _gitService.CompareBranches(
                userId, 
                pullRequest.SourceBranch, 
                pullRequest.TargetBranch, 
                sourceCommitSha,
                targetCommitSha);
            return Ok(comparison);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting branch comparison for PR #{Number}", number);
            return StatusCode(500, new { message = "Error getting branch comparison" });
        }
    }

    [HttpPost]
    public ActionResult<PullRequest> CreatePullRequest(
        [FromQuery] string userId,
        [FromBody] CreatePullRequestRequest request)
    {
        try
        {
            // Capture the current commit SHAs of both branches at PR creation time
            var sourceCommitSha = _gitService.GetBranchCommitSha(userId, request.SourceBranch);
            var targetCommitSha = _gitService.GetBranchCommitSha(userId, request.TargetBranch);
            
            var pullRequest = _pullRequestService.CreatePullRequest(userId, request, sourceCommitSha, targetCommitSha);
            return CreatedAtAction(nameof(GetPullRequest), new { userId, number = pullRequest.Number }, pullRequest);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating pull request for user {UserId}", userId);
            return StatusCode(500, new { message = "Error creating pull request" });
        }
    }

    [HttpPost("{number}/merge")]
    public ActionResult<PullRequest> MergePullRequest(
        [FromQuery] string userId,
        int number)
    {
        try
        {
            var pullRequest = _pullRequestService.GetPullRequest(userId, number);
            
            if (pullRequest == null)
            {
                return NotFound(new { message = $"Pull request #{number} not found" });
            }

            if (pullRequest.Status != "open")
            {
                return BadRequest(new { message = "Only open pull requests can be merged" });
            }

            // Perform the Git merge
            _gitService.MergeBranch(userId, pullRequest.SourceBranch, pullRequest.TargetBranch, pullRequest.Title);

            // Update PR status
            var mergedPr = _pullRequestService.MergePullRequest(userId, number);

            return Ok(mergedPr);
        }
        catch (InvalidOperationException ex) when (ex.Message.Contains("Merge conflicts"))
        {
            return Conflict(new { message = "Merge conflicts detected. Please resolve conflicts manually." });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error merging pull request #{Number} for user {UserId}", number, userId);
            return StatusCode(500, new { message = "Error merging pull request" });
        }
    }

    [HttpPost("{number}/close")]
    public ActionResult<PullRequest> ClosePullRequest(
        [FromQuery] string userId,
        int number)
    {
        try
        {
            var pullRequest = _pullRequestService.ClosePullRequest(userId, number);
            
            if (pullRequest == null)
            {
                return NotFound(new { message = $"Pull request #{number} not found or already closed" });
            }

            return Ok(pullRequest);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error closing pull request #{Number} for user {UserId}", number, userId);
            return StatusCode(500, new { message = "Error closing pull request" });
        }
    }
}
