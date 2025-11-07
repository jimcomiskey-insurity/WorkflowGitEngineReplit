using WorkflowConfig.Api.Models;
using ProgramModel = WorkflowConfig.Api.Models.Program;

namespace WorkflowConfig.Api.Services;

public interface IProgramService
{
    string GetDefaultProgramId();
    bool IsLegacyDataPresent();
    string GetProgramBasePath(string programId);
    string GetCentralRepoPath(string programId);
    string GetUserReposBasePath(string programId);
    string GetUserRepoPath(string programId, string userId);
    List<ProgramModel> GetAllPrograms();
    ProgramModel? GetProgramById(string programId);
    ProgramModel CreateProgram(ProgramModel program);
    ProgramModel? UpdateProgram(string programId, ProgramModel program);
    bool DeleteProgram(string programId);
    void EnsureProgramRepositories(string programId);
    string GetProgramCentralRepoPath(string programId);
    string GetProgramUserRepoPath(string programId, string userId);
}
