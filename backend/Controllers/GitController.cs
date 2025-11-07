using Microsoft.AspNetCore.Mvc;
using WorkflowConfig.Api.Services;
using NSwag.Annotations;

namespace WorkflowConfig.Api.Controllers;

[ApiController]
[Route("api/users/{userId}/programs/{programId}/[controller]")]
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
    [OpenApiOperation("Get Git Status")]
    public IActionResult GetStatus([FromRoute] string userId, [FromRoute] string programId)
    {
        var status = _gitService.GetStatus(programId, userId);
        return Ok(status);
    }

    [HttpPost("commit")]
    [OpenApiOperation("Commit Changes")]
    public IActionResult Commit([FromRoute] string userId, [FromRoute] string programId, [FromBody] CommitRequest request)
    {
        _gitService.CommitChanges(programId, userId, request.Message, request.AuthorName, request.AuthorEmail);
        return Ok(new { message = "Changes committed successfully" });
    }

    [HttpPost("discard")]
    [OpenApiOperation("Discard Changes")]
    public IActionResult Discard([FromRoute] string userId, [FromRoute] string programId)
    {
        _gitService.DiscardChanges(programId, userId);
        return Ok(new { message = "Changes discarded successfully" });
    }

    [HttpPost("pull")]
    [OpenApiOperation("Pull From Remote")]
    public IActionResult Pull([FromRoute] string userId, [FromRoute] string programId)
    {
        try
        {
            _gitService.Pull(programId, userId);
            return Ok(new { message = "Changes pulled successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("push")]
    [OpenApiOperation("Push To Remote")]
    public IActionResult Push([FromRoute] string userId, [FromRoute] string programId)
    {
        try
        {
            _gitService.Push(programId, userId);
            return Ok(new { message = "Changes pushed successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("branches")]
    [OpenApiOperation("Get Branches")]
    public IActionResult GetBranches([FromRoute] string userId, [FromRoute] string programId)
    {
        var branches = _gitService.GetBranches(programId, userId);
        return Ok(branches);
    }

    [HttpPost("branches")]
    [OpenApiOperation("Create Branch")]
    public IActionResult CreateBranch([FromRoute] string userId, [FromRoute] string programId, [FromBody] BranchRequest request)
    {
        _gitService.CreateBranch(programId, userId, request.BranchName);
        return Ok(new { message = $"Branch '{request.BranchName}' created successfully" });
    }

    [HttpPost("branches/switch")]
    [OpenApiOperation("Switch Branch")]
    public IActionResult SwitchBranch([FromRoute] string userId, [FromRoute] string programId, [FromBody] BranchRequest request)
    {
        _gitService.SwitchBranch(programId, userId, request.BranchName);
        return Ok(new { message = $"Switched to branch '{request.BranchName}'" });
    }

    [HttpGet("commits")]
    [OpenApiOperation("Get Commit History")]
    public IActionResult GetCommits([FromRoute] string userId, [FromRoute] string programId, [FromQuery] int count = 20)
    {
        var commits = _gitService.GetCommitHistory(programId, userId, count);
        return Ok(commits);
    }

    [HttpGet("last-pushed-commit")]
    [OpenApiOperation("Get Last Pushed Commit")]
    public IActionResult GetLastPushedCommit([FromRoute] string userId, [FromRoute] string programId)
    {
        try
        {
            var commitSha = _gitService.GetLastPushedCommitSha(programId, userId);
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
    [OpenApiOperation("Reset To Commit")]
    public IActionResult ResetToCommit([FromRoute] string userId, [FromRoute] string programId, [FromBody] ResetToCommitRequest request)
    {
        try
        {
            _gitService.ResetToCommit(programId, userId, request.CommitSha);
            return Ok(new { message = "Successfully reset to commit" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("compare-branches")]
    [OpenApiOperation("Compare Branches")]
    public IActionResult CompareBranches(
        string userId,
        string programId,
        [FromQuery] string sourceBranch,
        [FromQuery] string targetBranch)
    {
        try
        {
            var comparison = _gitService.CompareBranchesInCentral(programId, sourceBranch, targetBranch);
            return Ok(comparison);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("file-at-commit")]
    [OpenApiOperation("Get File At Commit")]
    public IActionResult GetFileAtCommit(
        string userId,
        string programId,
        [FromQuery] string commitSha,
        [FromQuery] string filePath)
    {
        try
        {
            var content = _gitService.GetFileContentAtCommit(programId, userId, commitSha, filePath);
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
    [OpenApiOperation("Reset Repository")]
    public IActionResult ResetRepositories([FromRoute] string userId, [FromRoute] string programId)
    {
        try
        {
            var sampleDataPath = Path.Combine(Directory.GetCurrentDirectory(), "sampledata.json");
            _gitService.ResetAllRepositories(programId, sampleDataPath);
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
