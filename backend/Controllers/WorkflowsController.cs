using Microsoft.AspNetCore.Mvc;
using WorkflowConfig.Api.Models;
using WorkflowConfig.Api.Services;
using NSwag.Annotations;

namespace WorkflowConfig.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkflowsController : ControllerBase
{
    private readonly GitService _gitService;

    public WorkflowsController(GitService gitService)
    {
        _gitService = gitService;
    }

    [HttpGet]
    [SwaggerOperation("Get All Workflows")]
    public IActionResult GetWorkflows([FromQuery] string userId = "default")
    {
        var workflows = _gitService.ReadWorkflowsWithGitStatus(userId);
        return Ok(workflows);
    }

    [HttpGet("{workflowKey}")]
    [SwaggerOperation("Get Workflow By Key")]
    public IActionResult GetWorkflow(string workflowKey, [FromQuery] string userId = "default")
    {
        var workflows = _gitService.ReadWorkflowsWithGitStatus(userId);
        var workflow = workflows.Workflows.FirstOrDefault(w => w.WorkflowKey == workflowKey);
        
        if (workflow == null)
        {
            return NotFound();
        }

        return Ok(workflow);
    }

    [HttpPost]
    [SwaggerOperation("Create Workflow")]
    public IActionResult CreateWorkflow([FromBody] Workflow workflow, [FromQuery] string userId = "default")
    {
        var workflows = _gitService.ReadWorkflows(userId);
        
        if (workflows.Workflows.Any(w => w.WorkflowKey == workflow.WorkflowKey))
        {
            return BadRequest("Workflow with this key already exists");
        }

        workflows.Workflows.Add(workflow);
        _gitService.WriteWorkflows(userId, workflows);
        
        return CreatedAtAction(nameof(GetWorkflow), new { workflowKey = workflow.WorkflowKey, userId }, workflow);
    }

    [HttpPut("{workflowKey}")]
    [SwaggerOperation("Update Workflow")]
    public IActionResult UpdateWorkflow(string workflowKey, [FromBody] Workflow workflow, [FromQuery] string userId = "default")
    {
        var workflows = _gitService.ReadWorkflows(userId);
        var index = workflows.Workflows.FindIndex(w => w.WorkflowKey == workflowKey);
        
        if (index == -1)
        {
            return NotFound();
        }

        // Preserve the existing workflow ID to maintain split-file persistence stability
        var existingId = workflows.Workflows[index].Id;
        workflow.WorkflowKey = workflowKey;
        workflow.Id = existingId;
        
        workflows.Workflows[index] = workflow;
        _gitService.WriteWorkflows(userId, workflows);
        
        return Ok(workflow);
    }

    [HttpDelete("{workflowKey}")]
    [SwaggerOperation("Delete Workflow")]
    public IActionResult DeleteWorkflow(string workflowKey, [FromQuery] string userId = "default")
    {
        var workflows = _gitService.ReadWorkflows(userId);
        var workflow = workflows.Workflows.FirstOrDefault(w => w.WorkflowKey == workflowKey);
        
        if (workflow == null)
        {
            return NotFound();
        }

        workflows.Workflows.Remove(workflow);
        _gitService.WriteWorkflows(userId, workflows);
        
        return NoContent();
    }
}
