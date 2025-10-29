using Microsoft.AspNetCore.Mvc;
using WorkflowConfig.Api.Models;
using WorkflowConfig.Api.Services;

namespace WorkflowConfig.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssetsController : ControllerBase
{
    private readonly GitService _gitService;

    public AssetsController(GitService gitService)
    {
        _gitService = gitService;
    }

    [HttpGet]
    public IActionResult GetAssets([FromQuery] string userId = "default")
    {
        var assets = _gitService.ReadAssetsWithGitStatus(userId);
        return Ok(assets);
    }

    [HttpGet("{id}")]
    public IActionResult GetAsset(Guid id, [FromQuery] string userId = "default")
    {
        var assets = _gitService.ReadAssets(userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null)
        {
            return NotFound();
        }

        return Ok(asset);
    }

    [HttpPost]
    public IActionResult CreateAsset([FromBody] Asset asset, [FromQuery] string userId = "default")
    {
        var assets = _gitService.ReadAssets(userId);
        
        if (asset.Id == null || asset.Id == Guid.Empty)
        {
            asset.Id = Guid.NewGuid();
        }

        assets.Assets.Add(asset);
        _gitService.WriteAssets(userId, assets);
        
        return CreatedAtAction(nameof(GetAsset), new { id = asset.Id, userId }, asset);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateAsset(Guid id, [FromBody] Asset asset, [FromQuery] string userId = "default")
    {
        var assets = _gitService.ReadAssets(userId);
        var index = assets.Assets.FindIndex(a => a.Id == id);
        
        if (index == -1)
        {
            return NotFound();
        }

        asset.Id = id;
        assets.Assets[index] = asset;
        _gitService.WriteAssets(userId, assets);
        
        return Ok(asset);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteAsset(Guid id, [FromQuery] string userId = "default")
    {
        var assets = _gitService.ReadAssets(userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null)
        {
            return NotFound();
        }

        if (asset.FileName != null)
        {
            _gitService.DeleteAssetFileContent(userId, id, asset.FileName);
        }

        assets.Assets.Remove(asset);
        _gitService.WriteAssets(userId, assets);
        
        return NoContent();
    }

    [HttpPost("{id}/file")]
    public async Task<IActionResult> UploadFile(Guid id, [FromQuery] string userId = "default", IFormFile? file = null)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded");
        }

        var assets = _gitService.ReadAssets(userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null)
        {
            return NotFound("Asset not found");
        }

        if (asset.FileName != null)
        {
            _gitService.DeleteAssetFileContent(userId, id, asset.FileName);
        }

        using (var stream = file.OpenReadStream())
        {
            _gitService.SaveAssetFileContent(userId, id, file.FileName, stream);
        }

        asset.FileName = file.FileName;
        asset.FileType = Path.GetExtension(file.FileName).TrimStart('.');
        asset.FileSizeBytes = file.Length;
        asset.FileUploadedDate = DateTime.UtcNow;

        _gitService.WriteAssets(userId, assets);

        return Ok(asset);
    }

    [HttpGet("{id}/file")]
    public IActionResult DownloadFile(Guid id, [FromQuery] string userId = "default")
    {
        var assets = _gitService.ReadAssets(userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null || asset.FileName == null)
        {
            return NotFound();
        }

        var fileContent = _gitService.GetAssetFileContent(userId, id, asset.FileName);
        
        if (fileContent == null)
        {
            return NotFound("File not found");
        }

        var contentType = GetContentType(asset.FileType);
        return File(fileContent, contentType, asset.FileName);
    }

    [HttpGet("{id}/file/content")]
    public IActionResult GetFileContent(Guid id, [FromQuery] string userId = "default")
    {
        var assets = _gitService.ReadAssets(userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null || asset.FileName == null)
        {
            return NotFound();
        }

        var fileContent = _gitService.GetAssetFileContent(userId, id, asset.FileName);
        
        if (fileContent == null)
        {
            return NotFound("File not found");
        }

        var contentAsString = System.Text.Encoding.UTF8.GetString(fileContent);
        return Ok(new { content = contentAsString });
    }

    [HttpGet("{id}/file/content/committed")]
    public IActionResult GetCommittedFileContent(Guid id, [FromQuery] string userId = "default")
    {
        var assets = _gitService.ReadAssets(userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null || asset.FileName == null)
        {
            return NotFound();
        }

        var fileContent = _gitService.GetAssetFileContentFromCommit(userId, id, asset.FileName);
        
        if (fileContent == null)
        {
            return NotFound("Committed file not found");
        }

        var contentAsString = System.Text.Encoding.UTF8.GetString(fileContent);
        return Ok(new { content = contentAsString });
    }

    [HttpPut("{id}/file/content")]
    public IActionResult UpdateFileContent(Guid id, [FromBody] FileContentUpdate update, [FromQuery] string userId = "default")
    {
        var assets = _gitService.ReadAssets(userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null || asset.FileName == null)
        {
            return NotFound();
        }

        var contentBytes = System.Text.Encoding.UTF8.GetBytes(update.Content);
        using (var stream = new MemoryStream(contentBytes))
        {
            _gitService.SaveAssetFileContent(userId, id, asset.FileName, stream);
        }

        asset.FileSizeBytes = contentBytes.Length;
        asset.FileUploadedDate = DateTime.UtcNow;
        _gitService.WriteAssets(userId, assets);

        return Ok(asset);
    }

    [HttpDelete("{id}/file")]
    public IActionResult DeleteFile(Guid id, [FromQuery] string userId = "default")
    {
        var assets = _gitService.ReadAssets(userId);
        var asset = assets.Assets.FirstOrDefault(a => a.Id == id);
        
        if (asset == null || asset.FileName == null)
        {
            return NotFound();
        }

        _gitService.DeleteAssetFileContent(userId, id, asset.FileName);

        asset.FileName = null;
        asset.FileType = null;
        asset.FileSizeBytes = null;
        asset.FileUploadedDate = null;

        _gitService.WriteAssets(userId, assets);

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
