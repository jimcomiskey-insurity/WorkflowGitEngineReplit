using Microsoft.AspNetCore.Mvc;
using WorkflowConfig.Api.Models;
using WorkflowConfig.Api.Services;

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
    public IActionResult GetWorkflows([FromQuery] string userId = "default")
    {
        var workflows = _gitService.ReadWorkflows(userId);
        return Ok(workflows);
    }

    [HttpGet("{workflowKey}")]
    public IActionResult GetWorkflow(string workflowKey, [FromQuery] string userId = "default")
    {
        var workflows = _gitService.ReadWorkflows(userId);
        var workflow = workflows.Workflows.FirstOrDefault(w => w.WorkflowKey == workflowKey);
        
        if (workflow == null)
        {
            return NotFound();
        }

        return Ok(workflow);
    }

    [HttpPost]
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
    public IActionResult UpdateWorkflow(string workflowKey, [FromBody] Workflow workflow, [FromQuery] string userId = "default")
    {
        var workflows = _gitService.ReadWorkflows(userId);
        var index = workflows.Workflows.FindIndex(w => w.WorkflowKey == workflowKey);
        
        if (index == -1)
        {
            return NotFound();
        }

        workflow.WorkflowKey = workflowKey;
        workflows.Workflows[index] = workflow;
        _gitService.WriteWorkflows(userId, workflows);
        
        return Ok(workflow);
    }

    [HttpDelete("{workflowKey}")]
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
