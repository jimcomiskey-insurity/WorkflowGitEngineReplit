using Microsoft.AspNetCore.Mvc;
using WorkflowConfig.Api.Models;
using WorkflowConfig.Api.Services;
using NSwag.Annotations;

namespace WorkflowConfig.Api.Controllers;

[ApiController]
[Route("api/users/{userId}/programs/{programId}/[controller]")]
public class AssetsController : ControllerBase
{
    private readonly GitService _gitService;

    public AssetsController(GitService gitService)
    {
        _gitService = gitService;
    }

    [HttpGet]
    [OpenApiOperation("Get All Assets")]
    public IActionResult GetAssets([FromRoute] string userId, [FromRoute] string programId)
    {
        var assets = _gitService.ReadAssetsWithGitStatus(programId, userId);
        return Ok(assets);
    }

    [HttpGet("{id}")]
    [OpenApiOperation("Get Asset By Id")]
    public IActionResult GetAsset([FromRoute] string userId, [FromRoute] string programId, Guid id)
    {
        var assets = _gitService.ReadAssets(programId, userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null)
        {
            return NotFound();
        }

        return Ok(asset);
    }

    [HttpPost]
    [OpenApiOperation("Create Asset")]
    public IActionResult CreateAsset([FromRoute] string userId, [FromRoute] string programId, [FromBody] Asset asset)
    {
        var assets = _gitService.ReadAssets(programId, userId);
        
        if (asset.Id == null || asset.Id == Guid.Empty)
        {
            asset.Id = Guid.NewGuid();
        }

        assets.Assets.Add(asset);
        _gitService.WriteAssets(programId, userId, assets);
        
        return CreatedAtAction(nameof(GetAsset), new { userId, programId, id = asset.Id }, asset);
    }

    [HttpPut("{id}")]
    [OpenApiOperation("Update Asset")]
    public IActionResult UpdateAsset([FromRoute] string userId, [FromRoute] string programId, Guid id, [FromBody] Asset asset)
    {
        var assets = _gitService.ReadAssets(programId, userId);
        var index = assets.Assets.FindIndex(a => a.Id == id);
        
        if (index == -1)
        {
            return NotFound();
        }

        asset.Id = id;
        assets.Assets[index] = asset;
        _gitService.WriteAssets(programId, userId, assets);
        
        return Ok(asset);
    }

    [HttpDelete("{id}")]
    [OpenApiOperation("Delete Asset")]
    public IActionResult DeleteAsset([FromRoute] string userId, [FromRoute] string programId, Guid id)
    {
        var assets = _gitService.ReadAssets(programId, userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null)
        {
            return NotFound();
        }

        if (asset.FileName != null)
        {
            _gitService.DeleteAssetFileContent(programId, userId, id, asset.FileName);
        }

        assets.Assets.Remove(asset);
        _gitService.WriteAssets(programId, userId, assets);
        
        return NoContent();
    }

    [HttpPost("{id}/file")]
    [OpenApiOperation("Upload Asset File")]
    public async Task<IActionResult> UploadFile([FromRoute] string userId, [FromRoute] string programId, Guid id, IFormFile? file = null)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded");
        }

        var assets = _gitService.ReadAssets(programId, userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null)
        {
            return NotFound("Asset not found");
        }

        if (asset.FileName != null)
        {
            _gitService.DeleteAssetFileContent(programId, userId, id, asset.FileName);
        }

        using (var stream = file.OpenReadStream())
        {
            _gitService.SaveAssetFileContent(programId, userId, id, file.FileName, stream);
        }

        asset.FileName = file.FileName;
        asset.FileType = Path.GetExtension(file.FileName).TrimStart('.');
        asset.FileSizeBytes = file.Length;
        asset.FileUploadedDate = DateTime.UtcNow;

        _gitService.WriteAssets(programId, userId, assets);

        return Ok(asset);
    }

    [HttpGet("{id}/file")]
    [OpenApiOperation("Get Asset File Info")]
    public IActionResult DownloadFile([FromRoute] string userId, [FromRoute] string programId, Guid id)
    {
        var assets = _gitService.ReadAssets(programId, userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null || asset.FileName == null)
        {
            return NotFound();
        }

        var fileContent = _gitService.GetAssetFileContent(programId, userId, id, asset.FileName);
        
        if (fileContent == null)
        {
            return NotFound("File not found");
        }

        var contentType = GetContentType(asset.FileType);
        return File(fileContent, contentType, asset.FileName);
    }

    [HttpGet("{id}/file/content")]
    [OpenApiOperation("Get Asset File Content")]
    public IActionResult GetFileContent([FromRoute] string userId, [FromRoute] string programId, Guid id)
    {
        var assets = _gitService.ReadAssets(programId, userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null || asset.FileName == null)
        {
            return NotFound();
        }

        var fileContent = _gitService.GetAssetFileContent(programId, userId, id, asset.FileName);
        
        if (fileContent == null)
        {
            return NotFound("File not found");
        }

        var contentAsString = System.Text.Encoding.UTF8.GetString(fileContent);
        return Ok(new { content = contentAsString });
    }

    [HttpGet("{id}/file/content/committed")]
    [OpenApiOperation("Get Asset File Content At Commit")]
    public IActionResult GetCommittedFileContent([FromRoute] string userId, [FromRoute] string programId, Guid id)
    {
        var assets = _gitService.ReadAssets(programId, userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null || asset.FileName == null)
        {
            return NotFound();
        }

        var fileContent = _gitService.GetAssetFileContentFromCommit(programId, userId, id, asset.FileName);
        
        if (fileContent == null)
        {
            return NotFound("Committed file not found");
        }

        var contentAsString = System.Text.Encoding.UTF8.GetString(fileContent);
        return Ok(new { content = contentAsString });
    }

    [HttpPut("{id}/file/content")]
    [OpenApiOperation("Update Asset File Content")]
    public IActionResult UpdateFileContent([FromRoute] string userId, [FromRoute] string programId, Guid id, [FromBody] FileContentUpdate update)
    {
        var assets = _gitService.ReadAssets(programId, userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null || asset.FileName == null)
        {
            return NotFound();
        }

        var contentBytes = System.Text.Encoding.UTF8.GetBytes(update.Content);
        using (var stream = new MemoryStream(contentBytes))
        {
            _gitService.SaveAssetFileContent(programId, userId, id, asset.FileName, stream);
        }

        asset.FileSizeBytes = contentBytes.Length;
        asset.FileUploadedDate = DateTime.UtcNow;
        _gitService.WriteAssets(programId, userId, assets);

        return Ok(asset);
    }

    [HttpDelete("{id}/file")]
    [OpenApiOperation("Delete Asset File")]
    public IActionResult DeleteFile([FromRoute] string userId, [FromRoute] string programId, Guid id)
    {
        var assets = _gitService.ReadAssets(programId, userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null || asset.FileName == null)
        {
            return NotFound();
        }

        _gitService.DeleteAssetFileContent(programId, userId, id, asset.FileName);

        asset.FileName = null;
        asset.FileType = null;
        asset.FileSizeBytes = null;
        asset.FileUploadedDate = null;

        _gitService.WriteAssets(programId, userId, assets);

        return NoContent();
    }

    private string GetContentType(string? fileType)
    {
        return fileType?.ToLower() switch
        {
            "xml" => "application/xml",
            "json" => "application/json",
            "xslt" => "application/xml",
            "txt" => "text/plain",
            "pdf" => "application/pdf",
            "png" => "image/png",
            "jpg" => "image/jpeg",
            "jpeg" => "image/jpeg",
            _ => "application/octet-stream"
        };
    }
}

public class FileContentUpdate
{
    public string Content { get; set; } = string.Empty;
}
