using Microsoft.AspNetCore.Mvc;
using WorkflowConfig.Api.Models;
using WorkflowConfig.Api.Services;
using ProgramModel = WorkflowConfig.Api.Models.Program;

namespace WorkflowConfig.Api.Controllers;

[ApiController]
[Route("api/users/{userId}/programs")]
public class ProgramsController : ControllerBase
{
    private readonly IProgramService _programService;
    private readonly ILogger<ProgramsController> _logger;

    public ProgramsController(IProgramService programService, ILogger<ProgramsController> logger)
    {
        _programService = programService;
        _logger = logger;
    }

    [HttpGet]
    public ActionResult<List<ProgramModel>> GetAllPrograms([FromRoute] string userId)
    {
        try
        {
            var programs = _programService.GetAllPrograms();
            return Ok(programs);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving programs");
            return StatusCode(500, new { error = "Failed to retrieve programs", message = ex.Message });
        }
    }

    [HttpGet("{programId}")]
    public ActionResult<ProgramModel> GetProgram([FromRoute] string userId, [FromRoute] string programId)
    {
        try
        {
            var program = _programService.GetProgramById(programId);
            if (program == null)
            {
                return NotFound(new { error = $"Program '{programId}' not found" });
            }
            return Ok(program);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving program {ProgramId}", programId);
            return StatusCode(500, new { error = "Failed to retrieve program", message = ex.Message });
        }
    }

    [HttpPost]
    public ActionResult<ProgramModel> CreateProgram([FromRoute] string userId, [FromBody] ProgramModel program)
    {
        try
        {
            var createdProgram = _programService.CreateProgram(program);
            return CreatedAtAction(nameof(GetProgram), new { userId, programId = createdProgram.Id }, createdProgram);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating program");
            return StatusCode(500, new { error = "Failed to create program", message = ex.Message });
        }
    }

    [HttpPut("{programId}")]
    public ActionResult<ProgramModel> UpdateProgram([FromRoute] string userId, [FromRoute] string programId, [FromBody] ProgramModel program)
    {
        try
        {
            var updatedProgram = _programService.UpdateProgram(programId, program);
            if (updatedProgram == null)
            {
                return NotFound(new { error = $"Program '{programId}' not found" });
            }
            return Ok(updatedProgram);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating program {ProgramId}", programId);
            return StatusCode(500, new { error = "Failed to update program", message = ex.Message });
        }
    }

    [HttpDelete("{programId}")]
    public IActionResult DeleteProgram([FromRoute] string userId, [FromRoute] string programId)
    {
        try
        {
            var result = _programService.DeleteProgram(programId);
            if (!result)
            {
                return NotFound(new { error = $"Program '{programId}' not found" });
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting program {ProgramId}", programId);
            return StatusCode(500, new { error = "Failed to delete program", message = ex.Message });
        }
    }
}
