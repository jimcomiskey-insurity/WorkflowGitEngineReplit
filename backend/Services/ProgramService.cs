using System.Text.Json;
using LibGit2Sharp;
using WorkflowConfig.Api.Models;

namespace WorkflowConfig.Api.Services;

public class ProgramService : IProgramService
{
    private readonly string _programsBasePath;
    private readonly string _programListPath;
    private readonly string _legacyCentralRepoPath;
    private readonly string _legacyUserReposPath;
    private readonly ILogger<ProgramService> _logger;
    private const string DefaultProgramId = "default";

    public ProgramService(IConfiguration configuration, IWebHostEnvironment environment, ILogger<ProgramService> logger)
    {
        _logger = logger;
        var programsPath = configuration["GitSettings:ProgramsBasePath"] ?? "../../workflow-data/programs";
        
        _programsBasePath = Path.IsPathRooted(programsPath)
            ? programsPath
            : Path.GetFullPath(Path.Combine(environment.ContentRootPath, programsPath));

        _programListPath = Path.Combine(_programsBasePath, "program-list.json");
        
        var legacyCentralPath = configuration["GitSettings:CentralRepoPath"] ?? Path.Combine(Directory.GetCurrentDirectory(), "data", "central-repo");
        var legacyUserPath = configuration["GitSettings:RepoBasePath"] ?? Path.Combine(Directory.GetCurrentDirectory(), "data", "user-repos");
        
        _legacyCentralRepoPath = Path.IsPathRooted(legacyCentralPath)
            ? legacyCentralPath
            : Path.GetFullPath(Path.Combine(environment.ContentRootPath, legacyCentralPath));
        _legacyUserReposPath = Path.IsPathRooted(legacyUserPath)
            ? legacyUserPath
            : Path.GetFullPath(Path.Combine(environment.ContentRootPath, legacyUserPath));
        
        Directory.CreateDirectory(_programsBasePath);
        _logger.LogInformation("Programs storage path: {Path}", _programsBasePath);
    }

    public string GetDefaultProgramId() => DefaultProgramId;
    
    public bool IsLegacyDataPresent()
    {
        return Repository.IsValid(_legacyCentralRepoPath) || Directory.Exists(_legacyUserReposPath);
    }

    public string GetProgramBasePath(string programId)
    {
        return Path.Combine(_programsBasePath, programId);
    }

    public string GetCentralRepoPath(string programId)
    {
        return Path.Combine(GetProgramBasePath(programId), "central-repo");
    }

    public string GetUserReposBasePath(string programId)
    {
        return Path.Combine(GetProgramBasePath(programId), "user-repos");
    }

    public string GetUserRepoPath(string programId, string userId)
    {
        return Path.Combine(GetUserReposBasePath(programId), userId);
    }

    public List<Models.Program> GetAllPrograms()
    {
        if (!File.Exists(_programListPath))
        {
            return new List<Models.Program>();
        }

        var json = File.ReadAllText(_programListPath);
        return JsonSerializer.Deserialize<List<Models.Program>>(json) ?? new List<Models.Program>();
    }

    public Models.Program? GetProgramById(string programId)
    {
        var programs = GetAllPrograms();
        return programs.FirstOrDefault(p => p.Id == programId);
    }

    public Models.Program CreateProgram(Models.Program program)
    {
        if (string.IsNullOrEmpty(program.Id))
        {
            program.Id = Guid.NewGuid().ToString();
        }

        program.CreatedDate = DateTime.UtcNow;

        var programs = GetAllPrograms();
        if (programs.Any(p => p.Id == program.Id))
        {
            throw new InvalidOperationException($"Program with ID {program.Id} already exists");
        }

        programs.Add(program);
        SaveProgramList(programs);

        InitializeProgramRepository(program.Id);
        
        _logger.LogInformation("Created program {ProgramId}: {ProgramName}", program.Id, program.Name);
        return program;
    }

    public Models.Program? UpdateProgram(string programId, Models.Program updatedProgram)
    {
        var programs = GetAllPrograms();
        var index = programs.FindIndex(p => p.Id == programId);
        
        if (index == -1)
        {
            return null;
        }

        updatedProgram.Id = programId;
        updatedProgram.CreatedDate = programs[index].CreatedDate;
        programs[index] = updatedProgram;
        
        SaveProgramList(programs);
        _logger.LogInformation("Updated program {ProgramId}: {ProgramName}", programId, updatedProgram.Name);
        return updatedProgram;
    }

    public bool DeleteProgram(string programId)
    {
        var programs = GetAllPrograms();
        var program = programs.FirstOrDefault(p => p.Id == programId);
        
        if (program == null)
        {
            return false;
        }

        programs.Remove(program);
        SaveProgramList(programs);

        var programPath = GetProgramBasePath(programId);
        if (Directory.Exists(programPath))
        {
            Directory.Delete(programPath, true);
            _logger.LogInformation("Deleted program directory for {ProgramId}", programId);
        }

        _logger.LogInformation("Deleted program {ProgramId}: {ProgramName}", programId, program.Name);
        return true;
    }

    public void EnsureProgramRepositories(string programId)
    {
        InitializeProgramRepository(programId);
    }

    public string GetProgramCentralRepoPath(string programId)
    {
        return GetCentralRepoPath(programId);
    }

    public string GetProgramUserRepoPath(string programId, string userId)
    {
        return GetUserRepoPath(programId, userId);
    }

    private void SaveProgramList(List<Models.Program> programs)
    {
        var json = JsonSerializer.Serialize(programs, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(_programListPath, json);
    }

    private void InitializeProgramRepository(string programId)
    {
        var centralRepoPath = GetCentralRepoPath(programId);
        
        if (Repository.IsValid(centralRepoPath))
        {
            _logger.LogDebug("Central repository for program {ProgramId} already exists", programId);
            return;
        }

        _logger.LogInformation("Initializing central repository for program {ProgramId}", programId);
        
        Directory.CreateDirectory(centralRepoPath);
        Repository.Init(centralRepoPath, isBare: false);

        using var repo = new Repository(centralRepoPath);
        
        var readmePath = Path.Combine(centralRepoPath, "README.md");
        File.WriteAllText(readmePath, $"# Program Repository\n\nThis repository contains the configuration for program {programId}.\n");
        
        Commands.Stage(repo, "*");
        
        var signature = new Signature("System", "system@workflow-config", DateTime.Now);
        repo.Commit("Initial commit", signature, signature);
        
        _logger.LogInformation("Initialized central repository for program {ProgramId} at {Path}", programId, centralRepoPath);
        
        Directory.CreateDirectory(GetUserReposBasePath(programId));
    }
}
