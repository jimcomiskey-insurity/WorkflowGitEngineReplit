using Microsoft.AspNetCore.Mvc;
using WorkflowConfig.Api.Models;
using WorkflowConfig.Api.Services;
using NSwag.Annotations;

namespace WorkflowConfig.Api.Controllers;

[ApiController]
[Route("api/users/{userId}/programs/{programId}/[controller]")]
public class WorkflowsController : ControllerBase
{
    private readonly GitService _gitService;

    public WorkflowsController(GitService gitService)
    {
        _gitService = gitService;
    }

    [HttpGet]
    [OpenApiOperation("Get All Workflows")]
    public IActionResult GetWorkflows([FromRoute] string userId, [FromRoute] string programId)
    {
        var workflows = _gitService.ReadWorkflowsWithGitStatus(programId, userId);
        return Ok(workflows);
    }

    [HttpGet("{workflowKey}")]
    [OpenApiOperation("Get Workflow By Key")]
    public IActionResult GetWorkflow([FromRoute] string userId, [FromRoute] string programId, string workflowKey)
    {
        var workflows = _gitService.ReadWorkflowsWithGitStatus(programId, userId);
        var workflow = workflows.Workflows.FirstOrDefault(w => w.WorkflowKey == workflowKey);
        
        if (workflow == null)
        {
            return NotFound();
        }

        return Ok(workflow);
    }

    [HttpPost]
    [OpenApiOperation("Create Workflow")]
    public IActionResult CreateWorkflow([FromRoute] string userId, [FromRoute] string programId, [FromBody] Workflow workflow)
    {
        var workflows = _gitService.ReadWorkflows(programId, userId);
        
        if (workflows.Workflows.Any(w => w.WorkflowKey == workflow.WorkflowKey))
        {
            return BadRequest("Workflow with this key already exists");
        }

        workflows.Workflows.Add(workflow);
        _gitService.WriteWorkflows(programId, userId, workflows);
        
        return CreatedAtAction(nameof(GetWorkflow), new { userId, programId, workflowKey = workflow.WorkflowKey }, workflow);
    }

    [HttpPut("{workflowKey}")]
    [OpenApiOperation("Update Workflow")]
    public IActionResult UpdateWorkflow([FromRoute] string userId, [FromRoute] string programId, string workflowKey, [FromBody] Workflow workflow)
    {
        var workflows = _gitService.ReadWorkflows(programId, userId);
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
        _gitService.WriteWorkflows(programId, userId, workflows);
        
        return Ok(workflow);
    }

    [HttpDelete("{workflowKey}")]
    [OpenApiOperation("Delete Workflow")]
    public IActionResult DeleteWorkflow([FromRoute] string userId, [FromRoute] string programId, string workflowKey)
    {
        var workflows = _gitService.ReadWorkflows(programId, userId);
        var workflow = workflows.Workflows.FirstOrDefault(w => w.WorkflowKey == workflowKey);
        
        if (workflow == null)
        {
            return NotFound();
        }

        workflows.Workflows.Remove(workflow);
        _gitService.WriteWorkflows(programId, userId, workflows);
        
        return NoContent();
    }
}
