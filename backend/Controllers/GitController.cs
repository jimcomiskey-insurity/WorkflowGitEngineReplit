using Microsoft.AspNetCore.Mvc;
using WorkflowConfig.Api.Services;
using NSwag.Annotations;

namespace WorkflowConfig.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GitController : ControllerBase
{
    private readonly GitService _gitService;
    private readonly IConfiguration _configuration;

    public GitController(GitService gitService, IConfiguration configuration)
    {
        _gitService = gitService;
        _configuration = configuration;
    }

    [HttpGet("status")]
    [SwaggerOperation("Get Git Status")]
    public IActionResult GetStatus([FromQuery] string userId = "default")
    {
        var status = _gitService.GetStatus(userId);
        return Ok(status);
    }

    [HttpPost("commit")]
    [SwaggerOperation("Commit Changes")]
    public IActionResult Commit([FromBody] CommitRequest request, [FromQuery] string userId = "default")
    {
        _gitService.CommitChanges(userId, request.Message, request.AuthorName, request.AuthorEmail);
        return Ok(new { message = "Changes committed successfully" });
    }

    [HttpPost("discard")]
    [SwaggerOperation("Discard Changes")]
    public IActionResult Discard([FromQuery] string userId = "default")
    {
        _gitService.DiscardChanges(userId);
        return Ok(new { message = "Changes discarded successfully" });
    }

    [HttpPost("pull")]
    [SwaggerOperation("Pull From Remote")]
    public IActionResult Pull([FromQuery] string userId = "default")
    {
        try
        {
            _gitService.Pull(userId);
            return Ok(new { message = "Changes pulled successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("push")]
    [SwaggerOperation("Push To Remote")]
    public IActionResult Push([FromQuery] string userId = "default")
    {
        try
        {
            _gitService.Push(userId);
            return Ok(new { message = "Changes pushed successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("branches")]
    [SwaggerOperation("Get Branches")]
    public IActionResult GetBranches([FromQuery] string userId = "default")
    {
        var branches = _gitService.GetBranches(userId);
        return Ok(branches);
    }

    [HttpPost("branches")]
    [SwaggerOperation("Create Branch")]
    public IActionResult CreateBranch([FromBody] BranchRequest request, [FromQuery] string userId = "default")
    {
        _gitService.CreateBranch(userId, request.BranchName);
        return Ok(new { message = $"Branch '{request.BranchName}' created successfully" });
    }

    [HttpPost("branches/switch")]
    [SwaggerOperation("Switch Branch")]
    public IActionResult SwitchBranch([FromBody] BranchRequest request, [FromQuery] string userId = "default")
    {
        _gitService.SwitchBranch(userId, request.BranchName);
        return Ok(new { message = $"Switched to branch '{request.BranchName}'" });
    }

    [HttpGet("commits")]
    [SwaggerOperation("Get Commit History")]
    public IActionResult GetCommits([FromQuery] string userId = "default", [FromQuery] int count = 20)
    {
        var commits = _gitService.GetCommitHistory(userId, count);
        return Ok(commits);
    }

    [HttpGet("last-pushed-commit")]
    [SwaggerOperation("Get Last Pushed Commit")]
    public IActionResult GetLastPushedCommit([FromQuery] string userId = "default")
    {
        try
        {
            var commitSha = _gitService.GetLastPushedCommitSha(userId);
            if (commitSha == null)
            {
                return Ok(new { commitSha = (string?)null, message = "No pushed commits found for current branch" });
            }
            return Ok(new { commitSha });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("reset-to-commit")]
    [SwaggerOperation("Reset To Commit")]
    public IActionResult ResetToCommit([FromBody] ResetToCommitRequest request, [FromQuery] string userId = "default")
    {
        try
        {
            _gitService.ResetToCommit(userId, request.CommitSha);
            return Ok(new { message = "Successfully reset to commit" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("compare-branches")]
    [SwaggerOperation("Compare Branches")]
    public IActionResult CompareBranches(
        [FromQuery] string userId,
        [FromQuery] string sourceBranch,
        [FromQuery] string targetBranch)
    {
        try
        {
            var comparison = _gitService.CompareBranchesInCentral(userId, sourceBranch, targetBranch);
            return Ok(comparison);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("file-at-commit")]
    [SwaggerOperation("Get File At Commit")]
    public IActionResult GetFileAtCommit(
        [FromQuery] string userId,
        [FromQuery] string commitSha,
        [FromQuery] string filePath)
    {
        try
        {
            var content = _gitService.GetFileContentAtCommit(userId, commitSha, filePath);
            if (content == null)
            {
                return NotFound(new { error = "File not found at the specified commit" });
            }
            return Ok(new { content });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("reset")]
    [SwaggerOperation("Reset Repository")]
    public IActionResult ResetRepositories()
    {
        try
        {
            var sampleDataPath = Path.Combine(Directory.GetCurrentDirectory(), "sampledata.json");
            _gitService.ResetAllRepositories(sampleDataPath);
            return Ok(new { message = "All repositories have been reset successfully. Users will get fresh clones on next access." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}

public class CommitRequest
{
    public string Message { get; set; } = string.Empty;
    public string AuthorName { get; set; } = "User";
    public string AuthorEmail { get; set; } = "user@workflow.com";
}

public class BranchRequest
{
    public string BranchName { get; set; } = string.Empty;
}

public class ResetToCommitRequest
{
    public string CommitSha { get; set; } = string.Empty;
}
