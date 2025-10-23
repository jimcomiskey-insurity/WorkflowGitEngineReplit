using Microsoft.AspNetCore.Mvc;
using WorkflowConfig.Api.Services;

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
    public IActionResult GetStatus([FromQuery] string userId = "default")
    {
        var status = _gitService.GetStatus(userId);
        return Ok(status);
    }

    [HttpPost("commit")]
    public IActionResult Commit([FromBody] CommitRequest request, [FromQuery] string userId = "default")
    {
        _gitService.CommitChanges(userId, request.Message, request.AuthorName, request.AuthorEmail);
        return Ok(new { message = "Changes committed successfully" });
    }

    [HttpPost("discard")]
    public IActionResult Discard([FromQuery] string userId = "default")
    {
        _gitService.DiscardChanges(userId);
        return Ok(new { message = "Changes discarded successfully" });
    }

    [HttpPost("pull")]
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
    public IActionResult GetBranches([FromQuery] string userId = "default")
    {
        var branches = _gitService.GetBranches(userId);
        return Ok(branches);
    }

    [HttpPost("branches")]
    public IActionResult CreateBranch([FromBody] BranchRequest request, [FromQuery] string userId = "default")
    {
        _gitService.CreateBranch(userId, request.BranchName);
        return Ok(new { message = $"Branch '{request.BranchName}' created successfully" });
    }

    [HttpPost("branches/switch")]
    public IActionResult SwitchBranch([FromBody] BranchRequest request, [FromQuery] string userId = "default")
    {
        _gitService.SwitchBranch(userId, request.BranchName);
        return Ok(new { message = $"Switched to branch '{request.BranchName}'" });
    }

    [HttpGet("commits")]
    public IActionResult GetCommits([FromQuery] string userId = "default", [FromQuery] int count = 20)
    {
        var commits = _gitService.GetCommitHistory(userId, count);
        return Ok(commits);
    }

    [HttpPost("reset")]
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
