using Microsoft.AspNetCore.Mvc;
using WorkflowConfig.Api.Models;
using WorkflowConfig.Api.Services;
using NSwag.Annotations;

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
    [SwaggerOperation("Get All Pull Requests")]
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
    [SwaggerOperation("Get Pull Request By Number")]
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
    [SwaggerOperation("Get Pull Request Branch Comparison")]
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
            // For open PRs, use null to compare current branch tips in central repo (allows updates after PR creation)
            var sourceCommitSha = pullRequest.Status == "merged" ? pullRequest.SourceCommitSha : null;
            var targetCommitSha = pullRequest.Status == "merged" ? pullRequest.TargetCommitSha : null;
            
            // Compare branches in the central repository (not user's local repo)
            var comparison = _gitService.CompareBranchesInCentral(
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

    [HttpGet("suggestion")]
    [SwaggerOperation("Get Pull Request Suggestion")]
    public ActionResult<PullRequestSuggestion> GetPullRequestSuggestion(
        [FromQuery] string sourceBranch,
        [FromQuery] string targetBranch)
    {
        try
        {
            // Compare branches in the central repository to get commits
            var comparison = _gitService.CompareBranchesInCentral(sourceBranch, targetBranch);
            
            string suggestedTitle = "";
            string suggestedDescription = "";
            
            if (comparison.Commits.Count == 1)
            {
                // Single commit: use commit message for both title and description
                var commit = comparison.Commits[0];
                suggestedTitle = commit.Message;
                suggestedDescription = commit.Message;
            }
            else if (comparison.Commits.Count > 1)
            {
                // Multiple commits: leave title blank, list all commits in description
                suggestedTitle = "";
                var commitList = comparison.Commits
                    .Select(c => $"- {c.Message} ({c.Sha.Substring(0, 7)})")
                    .ToList();
                suggestedDescription = string.Join("\n", commitList);
            }
            
            return Ok(new PullRequestSuggestion
            {
                Title = suggestedTitle,
                Description = suggestedDescription,
                CommitCount = comparison.Commits.Count
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting PR suggestion for {Source} -> {Target}", sourceBranch, targetBranch);
            return StatusCode(500, new { message = "Error getting PR suggestion" });
        }
    }

    [HttpPost]
    [SwaggerOperation("Create Pull Request")]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(PullRequest))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<PullRequest> CreatePullRequest(
        [FromQuery] string userId,
        [FromBody] CreatePullRequestRequest request)
    {
        try
        {
            // Pull requests work directly with the central repository
            // Both branches must be pushed to central before creating a PR
            var sourceCommitSha = _gitService.GetBranchCommitShaFromCentral(request.SourceBranch);
            var targetCommitSha = _gitService.GetBranchCommitShaFromCentral(request.TargetBranch);
            
            var pullRequest = _pullRequestService.CreatePullRequest(userId, request, sourceCommitSha, targetCommitSha);
            return CreatedAtAction(nameof(GetPullRequest), new { userId, number = pullRequest.Number }, pullRequest);
        }
        catch (ArgumentException ex) when (ex.Message.Contains("not found in central repository"))
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating pull request for user {UserId}", userId);
            return StatusCode(500, new { message = "Error creating pull request" });
        }
    }

    [HttpPost("{number}/merge")]
    [SwaggerOperation("Merge Pull Request")]
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

    [HttpGet("{number}/conflicts")]
    [SwaggerOperation("Get Merge Conflicts")]
    public ActionResult<MergeConflictInfo> GetMergeConflicts(
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
                return BadRequest(new { message = "Only open pull requests can be analyzed for conflicts" });
            }

            var conflicts = _gitService.GetMergeConflicts(userId, pullRequest.SourceBranch, pullRequest.TargetBranch);
            
            return Ok(conflicts);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting merge conflicts for PR #{Number}, user {UserId}", number, userId);
            return StatusCode(500, new { message = "Error analyzing merge conflicts" });
        }
    }

    [HttpPost("{number}/resolve-conflicts")]
    [SwaggerOperation("Resolve Conflicts And Merge")]
    public ActionResult<PullRequest> ResolveAndMergePullRequest(
        [FromQuery] string userId,
        int number,
        [FromBody] ResolveConflictsRequest request)
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

            // Perform the Git merge with conflict resolutions
            _gitService.ResolveAndMerge(userId, pullRequest.SourceBranch, pullRequest.TargetBranch, request.Resolutions);

            // Update PR status
            var mergedPr = _pullRequestService.MergePullRequest(userId, number);

            return Ok(mergedPr);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error resolving conflicts and merging PR #{Number} for user {UserId}", number, userId);
            return StatusCode(500, new { message = "Error resolving and merging pull request" });
        }
    }

    [HttpPost("{number}/close")]
    [SwaggerOperation("Close Pull Request")]
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
