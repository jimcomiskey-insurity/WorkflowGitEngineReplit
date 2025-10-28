using LibGit2Sharp;
using WorkflowConfig.Api.Models;
using System.Text.Json;

namespace WorkflowConfig.Api.Services;

public class GitService
{
    private readonly string _repoBasePath;
    private readonly string _centralRepoPath;
    private readonly string _pullRequestsPath;
    private readonly ILogger<GitService> _logger;
    private const string WorkflowFileName = "workflows.json"; // Legacy format
    private const string WorkflowListFileName = "workflow-list.json";
    private const string WorkflowsDirectory = "workflows";

    public GitService(IConfiguration configuration, IWebHostEnvironment environment, ILogger<GitService> logger)
    {
        _logger = logger;
        var repoBasePath = configuration["GitSettings:RepoBasePath"] ?? Path.Combine(Directory.GetCurrentDirectory(), "data", "user-repos");
        var centralRepoPath = configuration["GitSettings:CentralRepoPath"] ?? Path.Combine(Directory.GetCurrentDirectory(), "data", "central-repo");
        var prBasePath = configuration["GitSettings:PullRequestsPath"] ?? "../../workflow-data/pull-requests";
        
        // Resolve paths relative to the content root to ensure consistent behavior in all contexts
        _repoBasePath = Path.IsPathRooted(repoBasePath) 
            ? repoBasePath 
            : Path.GetFullPath(Path.Combine(environment.ContentRootPath, repoBasePath));
        _centralRepoPath = Path.IsPathRooted(centralRepoPath) 
            ? centralRepoPath 
            : Path.GetFullPath(Path.Combine(environment.ContentRootPath, centralRepoPath));
        _pullRequestsPath = Path.IsPathRooted(prBasePath) 
            ? prBasePath 
            : Path.GetFullPath(Path.Combine(environment.ContentRootPath, prBasePath));
        
        Directory.CreateDirectory(_repoBasePath);
        Directory.CreateDirectory(Path.GetDirectoryName(_centralRepoPath)!);
        Directory.CreateDirectory(_pullRequestsPath);
    }

    public void InitializeCentralRepository()
    {
        if (!Repository.IsValid(_centralRepoPath))
        {
            Repository.Init(_centralRepoPath, isBare: true);
        }
    }

    public string GetUserRepoPath(string userId)
    {
        return Path.Combine(_repoBasePath, userId);
    }

    public void CloneRepositoryForUser(string userId)
    {
        var userRepoPath = GetUserRepoPath(userId);
        
        if (Repository.IsValid(userRepoPath))
        {
            _logger.LogDebug("Repository for user {UserId} already exists and is valid at {Path}", userId, userRepoPath);
            return; // Already exists and is valid
        }
        
        _logger.LogWarning("Repository for user {UserId} is invalid or missing at {Path}. Recreating...", userId, userRepoPath);
        
        // Clean up any partially created directory
        if (Directory.Exists(userRepoPath))
        {
            _logger.LogWarning("Deleting existing invalid repository directory for user {UserId}", userId);
            Directory.Delete(userRepoPath, true);
        }

        _logger.LogInformation("Cloning central repository for user {UserId}", userId);
        Repository.Clone(_centralRepoPath, userRepoPath);
        
        // Ensure the remote URL is correct after cloning
        using var repo = new Repository(userRepoPath);
        repo.Network.Remotes.Update("origin", r => r.Url = _centralRepoPath);
        
        _logger.LogInformation("Successfully created repository for user {UserId}", userId);
    }

    private void EnsureUserRepository(string userId)
    {
        var userRepoPath = GetUserRepoPath(userId);
        
        if (!Repository.IsValid(userRepoPath))
        {
            _logger.LogDebug("Repository validation failed for user {UserId} at {Path}", userId, userRepoPath);
            CloneRepositoryForUser(userId);
        }
        else
        {
            _logger.LogDebug("Repository is valid for user {UserId} at {Path}", userId, userRepoPath);
            
            // Fix remote URL if it's incorrect (e.g., after data folder relocation)
            using var repo = new Repository(userRepoPath);
            var remote = repo.Network.Remotes["origin"];
            if (remote != null && remote.Url != _centralRepoPath)
            {
                _logger.LogInformation("Updating remote URL for user {UserId} from {OldUrl} to {NewUrl}", 
                    userId, remote.Url, _centralRepoPath);
                repo.Network.Remotes.Update("origin", r => r.Url = _centralRepoPath);
            }
        }
    }

    public GitStatus GetStatus(string userId)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);

        using var repo = new Repository(userRepoPath);
        var status = repo.RetrieveStatus();

        // Calculate commits ahead and behind remote
        int commitsAhead = 0;
        int commitsBehind = 0;
        var currentBranch = repo.Head;
        if (currentBranch.TrackedBranch != null)
        {
            var aheadFilter = new CommitFilter
            {
                IncludeReachableFrom = currentBranch,
                ExcludeReachableFrom = currentBranch.TrackedBranch
            };
            commitsAhead = repo.Commits.QueryBy(aheadFilter).Count();
            
            var behindFilter = new CommitFilter
            {
                IncludeReachableFrom = currentBranch.TrackedBranch,
                ExcludeReachableFrom = currentBranch
            };
            commitsBehind = repo.Commits.QueryBy(behindFilter).Count();
        }

        // Include both staged and unstaged deletions in the Removed list
        var removedFiles = status
            .Where(s => s.State.HasFlag(FileStatus.DeletedFromWorkdir) || 
                       s.State.HasFlag(FileStatus.DeletedFromIndex))
            .Select(s => s.FilePath)
            .Distinct()
            .ToList();

        return new GitStatus
        {
            Added = status.Added.Select(s => s.FilePath).ToList(),
            Modified = status.Modified.Select(s => s.FilePath).ToList(),
            Removed = removedFiles,
            Untracked = status.Untracked.Select(s => s.FilePath).ToList(),
            CurrentBranch = repo.Head.FriendlyName,
            IsDirty = status.IsDirty,
            CommitsAhead = commitsAhead,
            CommitsBehind = commitsBehind,
            HasRemoteTracking = currentBranch.TrackedBranch != null
        };
    }

    public void CommitChanges(string userId, string message, string authorName, string authorEmail)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);
        
        using var repo = new Repository(userRepoPath);
        
        Commands.Stage(repo, "*");

        var signature = new Signature(authorName, authorEmail, DateTimeOffset.Now);
        repo.Commit(message, signature, signature);
    }

    public void DiscardChanges(string userId)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);
        
        using var repo = new Repository(userRepoPath);
        
        var options = new CheckoutOptions { CheckoutModifiers = CheckoutModifiers.Force };
        repo.Reset(ResetMode.Hard);
        
        var statusEntries = repo.RetrieveStatus(new StatusOptions());
        foreach (var item in statusEntries.Untracked)
        {
            File.Delete(Path.Combine(userRepoPath, item.FilePath));
        }
    }

    private void Fetch(Repository repo)
    {
        var remote = repo.Network.Remotes["origin"];
        if (remote != null)
        {
            var refSpecs = remote.FetchRefSpecs.Select(x => x.Specification);
            Commands.Fetch(repo, remote.Name, refSpecs, null, "");
        }
    }

    public void Pull(string userId)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);
        
        using var repo = new Repository(userRepoPath);
        
        var signature = new Signature("System", "system@workflow.com", DateTimeOffset.Now);
        var options = new PullOptions();
        
        Commands.Pull(repo, signature, options);
    }

    public void Push(string userId)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);
        
        using var repo = new Repository(userRepoPath);
        
        var remote = repo.Network.Remotes["origin"];
        if (remote == null)
        {
            throw new InvalidOperationException("Remote 'origin' not found in repository");
        }
        
        var currentBranch = repo.Head;
        if (currentBranch == null || currentBranch.FriendlyName == "(no branch)")
        {
            throw new InvalidOperationException("Not currently on a branch");
        }
        
        // Block direct pushes to master branch
        if (currentBranch.FriendlyName == "master" || currentBranch.FriendlyName == "main")
        {
            throw new InvalidOperationException(
                $"Direct pushes to the '{currentBranch.FriendlyName}' branch are not allowed. " +
                "Please create a new branch for your changes and submit a pull request.");
        }
        
        var options = new PushOptions();
        
        try
        {
            // Push the current branch and set up tracking if it doesn't exist
            var pushRefSpec = $"refs/heads/{currentBranch.FriendlyName}:refs/heads/{currentBranch.FriendlyName}";
            repo.Network.Push(remote, pushRefSpec, options);
            
            // Set up tracking if this is a new branch
            if (currentBranch.TrackedBranch == null)
            {
                repo.Branches.Update(currentBranch, b => b.TrackedBranch = $"refs/remotes/origin/{currentBranch.FriendlyName}");
            }
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Failed to push to remote: {ex.Message}", ex);
        }
    }

    public void CreateBranch(string userId, string branchName)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);
        
        using var repo = new Repository(userRepoPath);
        
        repo.CreateBranch(branchName);
    }

    public void SwitchBranch(string userId, string branchName)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);
        
        using var repo = new Repository(userRepoPath);
        
        // Fetch from remote to get latest changes
        var remote = repo.Network.Remotes["origin"];
        if (remote != null)
        {
            var refSpecs = remote.FetchRefSpecs.Select(x => x.Specification);
            Commands.Fetch(repo, remote.Name, refSpecs, null, null);
        }
        
        // Check if this is a remote branch (e.g., origin/feature-branch)
        if (branchName.StartsWith("origin/"))
        {
            var localBranchName = branchName.Substring("origin/".Length);
            var remoteBranch = repo.Branches[branchName];
            
            if (remoteBranch == null)
            {
                throw new InvalidOperationException($"Remote branch '{branchName}' not found");
            }
            
            var localBranch = repo.Branches[localBranchName];
            
            if (localBranch == null)
            {
                // Create a local tracking branch for this remote branch
                localBranch = repo.CreateBranch(localBranchName, remoteBranch.Tip);
                repo.Branches.Update(localBranch, b => b.TrackedBranch = remoteBranch.CanonicalName);
            }
            else
            {
                // Local branch exists - ensure tracking is set up
                if (localBranch.TrackedBranch == null || localBranch.TrackedBranch.CanonicalName != remoteBranch.CanonicalName)
                {
                    repo.Branches.Update(localBranch, b => b.TrackedBranch = remoteBranch.CanonicalName);
                }
            }
            
            Commands.Checkout(repo, localBranch);
        }
        else
        {
            // Regular local branch switch
            Commands.Checkout(repo, branchName);
        }
    }

    public List<string> GetBranches(string userId)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);
        
        using var repo = new Repository(userRepoPath);
        
        return repo.Branches.Select(b => b.FriendlyName).ToList();
    }

    public List<Models.CommitInfo> GetCommitHistory(string userId, int count = 20)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);
        
        using var repo = new Repository(userRepoPath);
        
        return repo.Commits
            .Take(count)
            .Select(c => new Models.CommitInfo
            {
                Sha = c.Sha,
                Message = c.MessageShort,
                Author = c.Author.Name,
                Date = c.Author.When
            })
            .ToList();
    }

    public ProgramWorkflows ReadWorkflows(string userId)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);

        // Try new split-file format first
        var workflowList = ReadWorkflowListIfExists(userRepoPath);
        if (workflowList != null)
        {
            var workflows = new List<Workflow>();
            foreach (var workflowId in workflowList.WorkflowIds)
            {
                var workflow = ReadWorkflowFileIfExists(userRepoPath, workflowId);
                if (workflow != null)
                {
                    workflows.Add(workflow);
                }
                else
                {
                    _logger.LogWarning($"Workflow file not found for ID {workflowId}, skipping");
                }
            }

            var result = new ProgramWorkflows { Workflows = workflows };
            EnsureWorkflowIds(result);
            EnsureTaskIds(result);
            return result;
        }

        // Fallback to legacy single-file format
        var legacyFilePath = Path.Combine(userRepoPath, WorkflowFileName);
        if (!File.Exists(legacyFilePath))
        {
            return new ProgramWorkflows { Workflows = new List<Workflow>() };
        }

        _logger.LogInformation($"Reading workflows from legacy format for user {userId}");
        var json = File.ReadAllText(legacyFilePath);
        var legacyWorkflows = JsonSerializer.Deserialize<ProgramWorkflows>(json) ?? new ProgramWorkflows { Workflows = new List<Workflow>() };
        
        EnsureWorkflowIds(legacyWorkflows);
        EnsureTaskIds(legacyWorkflows);
        
        return legacyWorkflows;
    }

    private void EnsureWorkflowIds(ProgramWorkflows programWorkflows)
    {
        foreach (var workflow in programWorkflows.Workflows)
        {
            if (workflow.Id == Guid.Empty)
            {
                // Generate deterministic ID based on WorkflowKey for stability
                workflow.Id = GenerateDeterministicGuid(workflow.WorkflowKey);
                _logger.LogInformation($"Generated deterministic ID {workflow.Id} for workflow {workflow.WorkflowKey}");
            }
        }
    }

    private void EnsureTaskIds(ProgramWorkflows programWorkflows)
    {
        foreach (var workflow in programWorkflows.Workflows)
        {
            foreach (var phase in workflow.Phases)
            {
                for (int i = 0; i < phase.Tasks.Count; i++)
                {
                    var task = phase.Tasks[i];
                    if (string.IsNullOrEmpty(task.TaskId))
                    {
                        task.TaskId = GenerateDeterministicId(workflow.WorkflowKey, phase.PhaseName, phase.PhaseOrder, task.TaskName, i);
                    }
                }
            }
        }
    }

    private Guid GenerateDeterministicGuid(string input)
    {
        using var sha256 = System.Security.Cryptography.SHA256.Create();
        var hashBytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(input));
        return new Guid(hashBytes.Take(16).ToArray());
    }

    private string GenerateDeterministicId(string workflowKey, string phaseName, int phaseOrder, string taskName, int taskIndex)
    {
        var input = $"{workflowKey}|{phaseName}|{phaseOrder}|{taskName}|{taskIndex}";
        using var sha256 = System.Security.Cryptography.SHA256.Create();
        var hashBytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(input));
        var guid = new Guid(hashBytes.Take(16).ToArray());
        return guid.ToString();
    }

    public void WriteWorkflows(string userId, ProgramWorkflows workflows)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);

        // Ensure all workflows have stable, deterministic IDs
        EnsureWorkflowIds(workflows);

        // Read existing workflow list to detect deletions
        var existingWorkflowList = ReadWorkflowListIfExists(userRepoPath);
        var existingIds = existingWorkflowList?.WorkflowIds ?? new List<Guid>();
        var newIds = workflows.Workflows.Select(w => w.Id).ToList();

        // Delete orphaned workflow files
        var deletedIds = existingIds.Except(newIds).ToList();
        foreach (var deletedId in deletedIds)
        {
            DeleteWorkflowFile(userRepoPath, deletedId);
            _logger.LogInformation($"Deleted orphaned workflow file for ID {deletedId}");
        }

        // Write workflow list file
        var workflowList = new WorkflowList { WorkflowIds = newIds };
        WriteWorkflowListFile(userRepoPath, workflowList);

        // Write individual workflow files
        foreach (var workflow in workflows.Workflows)
        {
            WriteWorkflowFile(userRepoPath, workflow);
        }

        _logger.LogInformation($"Written {workflows.Workflows.Count} workflows in split-file format for user {userId}");
    }

    // Helper methods for split-file persistence (new format)
    private string GetWorkflowsDirectoryPath(string userRepoPath)
    {
        return Path.Combine(userRepoPath, WorkflowsDirectory);
    }

    private string GetWorkflowFilePath(string userRepoPath, Guid workflowId)
    {
        return Path.Combine(GetWorkflowsDirectoryPath(userRepoPath), $"{workflowId}.json");
    }

    private string GetWorkflowListFilePath(string userRepoPath)
    {
        return Path.Combine(userRepoPath, WorkflowListFileName);
    }

    private WorkflowList? ReadWorkflowListIfExists(string userRepoPath)
    {
        var listFilePath = GetWorkflowListFilePath(userRepoPath);
        if (!File.Exists(listFilePath))
        {
            return null;
        }

        var json = File.ReadAllText(listFilePath);
        return JsonSerializer.Deserialize<WorkflowList>(json);
    }

    private Workflow? ReadWorkflowFileIfExists(string userRepoPath, Guid workflowId)
    {
        var workflowFilePath = GetWorkflowFilePath(userRepoPath, workflowId);
        if (!File.Exists(workflowFilePath))
        {
            return null;
        }

        var json = File.ReadAllText(workflowFilePath);
        return JsonSerializer.Deserialize<Workflow>(json);
    }

    private void WriteWorkflowListFile(string userRepoPath, WorkflowList workflowList)
    {
        var listFilePath = GetWorkflowListFilePath(userRepoPath);
        var options = new JsonSerializerOptions { WriteIndented = true };
        var json = JsonSerializer.Serialize(workflowList, options);
        
        // Only write if content has changed (avoid unnecessary Git modifications)
        if (File.Exists(listFilePath))
        {
            var existingContent = File.ReadAllText(listFilePath);
            if (existingContent == json)
            {
                // Content unchanged, skip write
                return;
            }
        }
        
        using var fileStream = new FileStream(listFilePath, FileMode.Create, FileAccess.Write, FileShare.None);
        using var streamWriter = new StreamWriter(fileStream);
        streamWriter.Write(json);
        streamWriter.Flush();
        fileStream.Flush(flushToDisk: true);
    }

    private void WriteWorkflowFile(string userRepoPath, Workflow workflow)
    {
        var workflowsDir = GetWorkflowsDirectoryPath(userRepoPath);
        Directory.CreateDirectory(workflowsDir);
        
        var workflowFilePath = GetWorkflowFilePath(userRepoPath, workflow.Id);
        var options = new JsonSerializerOptions { WriteIndented = true };
        var json = JsonSerializer.Serialize(workflow, options);
        
        // Only write if content has changed (avoid unnecessary Git modifications)
        if (File.Exists(workflowFilePath))
        {
            var existingContent = File.ReadAllText(workflowFilePath);
            if (existingContent == json)
            {
                // Content unchanged, skip write
                return;
            }
        }
        
        using var fileStream = new FileStream(workflowFilePath, FileMode.Create, FileAccess.Write, FileShare.None);
        using var streamWriter = new StreamWriter(fileStream);
        streamWriter.Write(json);
        streamWriter.Flush();
        fileStream.Flush(flushToDisk: true);
    }

    private void DeleteWorkflowFile(string userRepoPath, Guid workflowId)
    {
        var workflowFilePath = GetWorkflowFilePath(userRepoPath, workflowId);
        if (File.Exists(workflowFilePath))
        {
            File.Delete(workflowFilePath);
        }
    }

    private List<string> GetAllWorkflowFilePaths(string userRepoPath)
    {
        var workflowsDir = GetWorkflowsDirectoryPath(userRepoPath);
        if (!Directory.Exists(workflowsDir))
        {
            return new List<string>();
        }

        return Directory.GetFiles(workflowsDir, "*.json")
            .Select(f => Path.Combine(WorkflowsDirectory, Path.GetFileName(f)))
            .ToList();
    }

    public ProgramWorkflows ReadWorkflowsWithGitStatus(string userId)
    {
        var workflows = ReadWorkflows(userId);
        EnrichWithGitStatus(userId, workflows);
        return workflows;
    }

    private void EnrichWithGitStatus(string userId, ProgramWorkflows programWorkflows)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);
        
        using var repo = new Repository(userRepoPath);
        
        // Force Git to refresh the working directory status to detect file changes
        var repoStatus = repo.RetrieveStatus();
        _logger.LogInformation($"Git status refreshed for user {userId}, detecting {repoStatus.Count()} status entries");
        
        var headCommit = repo.Head.Tip;
        if (headCommit == null)
        {
            return;
        }

        try
        {
            // Use GetWorkflowsFromCommit which supports both split-file and legacy formats
            var previousWorkflows = GetWorkflowsFromCommit(repo, headCommit);
            var previousVersion = new ProgramWorkflows { Workflows = previousWorkflows };

            foreach (var workflow in programWorkflows.Workflows)
            {
                var previousWorkflow = previousVersion.Workflows.FirstOrDefault(w => w.WorkflowKey == workflow.WorkflowKey);
                
                if (previousWorkflow == null)
                {
                    workflow.GitStatus = "added";
                    MarkAllAsAdded(workflow);
                }
                else
                {
                    CompareWorkflow(workflow, previousWorkflow);
                }
            }

            foreach (var previousWorkflow in previousVersion.Workflows)
            {
                if (!programWorkflows.Workflows.Any(w => w.WorkflowKey == previousWorkflow.WorkflowKey))
                {
                    previousWorkflow.GitStatus = "deleted";
                    MarkAllAsDeleted(previousWorkflow);
                    programWorkflows.Workflows.Add(previousWorkflow);
                }
            }
        }
        catch (Exception)
        {
            return;
        }
    }

    private string GetFileContentFromCommit(Repository repo, Commit commit, string fileName)
    {
        var treeEntry = commit[fileName];
        if (treeEntry == null || treeEntry.TargetType != TreeEntryTargetType.Blob)
        {
            return string.Empty;
        }

        var blob = (Blob)treeEntry.Target;
        return blob.GetContentText();
    }

    private void CompareWorkflow(Workflow current, Workflow previous)
    {
        _logger.LogInformation($"Comparing workflow {current.WorkflowKey}: current name='{current.WorkflowName}', previous name='{previous.WorkflowName}'");
        
        if (current.WorkflowName != previous.WorkflowName || 
            current.Description != previous.Description)
        {
            _logger.LogInformation($"Workflow {current.WorkflowKey} marked as MODIFIED");
            current.GitStatus = "modified";
        }
        else
        {
            _logger.LogInformation($"Workflow {current.WorkflowKey} unchanged at workflow level");
            current.GitStatus = null;
        }

        foreach (var phase in current.Phases)
        {
            var previousPhase = previous.Phases.FirstOrDefault(p => p.PhaseName == phase.PhaseName && p.PhaseOrder == phase.PhaseOrder);
            
            if (previousPhase == null)
            {
                phase.GitStatus = "added";
                foreach (var task in phase.Tasks)
                {
                    task.GitStatus = "added";
                }
            }
            else
            {
                ComparePhase(phase, previousPhase);
            }
        }

        foreach (var previousPhase in previous.Phases)
        {
            if (!current.Phases.Any(p => p.PhaseName == previousPhase.PhaseName && p.PhaseOrder == previousPhase.PhaseOrder))
            {
                previousPhase.GitStatus = "deleted";
                foreach (var task in previousPhase.Tasks)
                {
                    task.GitStatus = "deleted";
                }
                current.Phases.Add(previousPhase);
            }
        }
    }

    private void ComparePhase(Phase current, Phase previous)
    {
        if (current.PhaseName != previous.PhaseName || current.PhaseOrder != previous.PhaseOrder)
        {
            current.GitStatus = "modified";
        }
        else
        {
            current.GitStatus = null;
        }

        foreach (var task in current.Tasks)
        {
            var previousTask = previous.Tasks.FirstOrDefault(t => 
                !string.IsNullOrEmpty(task.TaskId) && !string.IsNullOrEmpty(t.TaskId) && t.TaskId == task.TaskId);
            
            if (previousTask == null)
            {
                task.GitStatus = "added";
            }
            else
            {
                CompareTask(task, previousTask);
            }
        }

        foreach (var previousTask in previous.Tasks)
        {
            var currentTask = current.Tasks.FirstOrDefault(t => 
                !string.IsNullOrEmpty(previousTask.TaskId) && !string.IsNullOrEmpty(t.TaskId) && t.TaskId == previousTask.TaskId);
            
            if (currentTask == null)
            {
                previousTask.GitStatus = "deleted";
                current.Tasks.Add(previousTask);
            }
        }
    }

    private void CompareTask(TaskItem current, TaskItem previous)
    {
        if (current.TaskName != previous.TaskName ||
            current.TaskType != previous.TaskType ||
            current.AssignedRole != previous.AssignedRole ||
            current.EstimatedDurationHours != previous.EstimatedDurationHours ||
            current.IsAutomated != previous.IsAutomated ||
            !current.Dependencies.SequenceEqual(previous.Dependencies))
        {
            current.GitStatus = "modified";
        }
        else
        {
            current.GitStatus = null;
        }
    }

    private void MarkAllAsAdded(Workflow workflow)
    {
        foreach (var phase in workflow.Phases)
        {
            phase.GitStatus = "added";
            foreach (var task in phase.Tasks)
            {
                task.GitStatus = "added";
            }
        }
    }

    private void MarkAllAsDeleted(Workflow workflow)
    {
        foreach (var phase in workflow.Phases)
        {
            phase.GitStatus = "deleted";
            foreach (var task in phase.Tasks)
            {
                task.GitStatus = "deleted";
            }
        }
    }

    private Branch? ResolveBranch(Repository repo, string branchName)
    {
        // Try local branch first
        var branch = repo.Branches[branchName];
        if (branch != null)
        {
            return branch;
        }

        // Try with refs/heads/ prefix
        branch = repo.Branches[$"refs/heads/{branchName}"];
        if (branch != null)
        {
            return branch;
        }

        // Try remote branch
        branch = repo.Branches[$"origin/{branchName}"];
        if (branch != null)
        {
            return branch;
        }

        // Try with refs/remotes/ prefix
        branch = repo.Branches[$"refs/remotes/origin/{branchName}"];
        return branch;
    }

    private Branch? ResolveRemoteBranch(Repository repo, string branchName)
    {
        // Strictly resolve ONLY remote tracking branches
        // This is critical for PR comparisons to use the correct base (origin/master, not local master)
        // Do NOT fall back to local branches as this would reintroduce the 0-commit PR bug
        
        // Normalize branch name: strip "origin/" or "refs/remotes/origin/" prefix if already present
        var normalizedName = branchName;
        if (normalizedName.StartsWith("refs/remotes/origin/"))
        {
            normalizedName = normalizedName.Substring("refs/remotes/origin/".Length);
        }
        else if (normalizedName.StartsWith("origin/"))
        {
            normalizedName = normalizedName.Substring("origin/".Length);
        }
        
        // Try different remote branch formats
        var branch = repo.Branches[$"origin/{normalizedName}"];
        if (branch != null && branch.IsRemote)
        {
            return branch;
        }

        // Try with refs/remotes/ prefix
        branch = repo.Branches[$"refs/remotes/origin/{normalizedName}"];
        if (branch != null && branch.IsRemote)
        {
            return branch;
        }

        // Check if there's a local branch with remote tracking information
        var localBranch = repo.Branches[normalizedName] ?? repo.Branches[$"refs/heads/{normalizedName}"];
        if (localBranch != null && localBranch.TrackedBranch != null)
        {
            // Return the remote tracking branch (this is what we want for PR comparisons)
            return localBranch.TrackedBranch;
        }

        // If we reach here, no remote tracking branch was found
        // Return null to signal that remote is not available
        // The caller (GetBranchCommitSha with preferRemote=true) will throw a clear error
        return null;
    }

    public string GetBranchCommitShaFromCentral(string branchName)
    {
        // For pull requests: work directly with the central repository
        // PRs should only care about branches that have been pushed to central
        using var repo = new Repository(_centralRepoPath);
        
        // In a bare repository, all branches are what would be "remote" branches in a clone
        // Look for refs/heads/branchName
        var branch = repo.Branches[branchName] ?? repo.Branches[$"refs/heads/{branchName}"];
        
        if (branch == null || branch.Tip == null)
        {
            throw new ArgumentException($"Branch '{branchName}' not found in central repository. Make sure the branch has been pushed.");
        }

        return branch.Tip.Sha;
    }

    public string GetBranchCommitSha(string userId, string branchName, bool preferRemote = false)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);

        using var repo = new Repository(userRepoPath);
        
        // Fetch latest from remote to ensure we have all branches
        Fetch(repo);
        
        Branch? branch;
        if (preferRemote)
        {
            // For PR comparisons, we MUST use the remote tracking branch to get the true base
            // Do NOT fall back to local branch as this would reintroduce the 0-commit PR bug
            branch = ResolveRemoteBranch(repo, branchName);
            
            if (branch == null)
            {
                throw new InvalidOperationException(
                    $"Remote branch '{branchName}' not found. This may indicate the remote repository " +
                    $"is not properly synchronized or the branch hasn't been pushed yet.");
            }
        }
        else
        {
            branch = ResolveBranch(repo, branchName);
        }
        
        if (branch == null || branch.Tip == null)
        {
            throw new ArgumentException($"Invalid branch: {branchName}");
        }

        return branch.Tip.Sha;
    }

    public virtual BranchComparison CompareBranchesInCentral(string sourceBranch, string targetBranch, string? sourceCommitSha = null, string? targetCommitSha = null)
    {
        // For pull requests: work directly with the central repository
        // This ensures we're comparing branches as they exist in the central repo (what was pushed)
        using var repo = new Repository(_centralRepoPath);
        
        // Get source commit - either from SHA or from branch tip
        Commit sourceCommit;
        if (!string.IsNullOrEmpty(sourceCommitSha))
        {
            // Use the stored commit SHA (for merged PRs)
            sourceCommit = repo.Lookup<Commit>(sourceCommitSha);
            if (sourceCommit == null)
            {
                throw new ArgumentException($"Invalid source commit SHA: {sourceCommitSha}");
            }
        }
        else
        {
            // Use the current branch tip in central repo (for open PRs)
            var sourceBranchRef = repo.Branches[sourceBranch] ?? repo.Branches[$"refs/heads/{sourceBranch}"];
            if (sourceBranchRef == null || sourceBranchRef.Tip == null)
            {
                throw new ArgumentException($"Source branch '{sourceBranch}' not found in central repository");
            }
            sourceCommit = sourceBranchRef.Tip;
        }
        
        // Get target commit - either from SHA or from branch tip
        Commit targetCommit;
        if (!string.IsNullOrEmpty(targetCommitSha))
        {
            // Use the stored commit SHA (for merged PRs)
            targetCommit = repo.Lookup<Commit>(targetCommitSha);
            if (targetCommit == null)
            {
                throw new ArgumentException($"Invalid target commit SHA: {targetCommitSha}");
            }
        }
        else
        {
            // Use the current branch tip in central repo (for open PRs)
            var targetBranchRef = repo.Branches[targetBranch] ?? repo.Branches[$"refs/heads/{targetBranch}"];
            if (targetBranchRef == null || targetBranchRef.Tip == null)
            {
                throw new ArgumentException($"Target branch '{targetBranch}' not found in central repository");
            }
            targetCommit = targetBranchRef.Tip;
        }
        
        // Calculate commits ahead and behind
        var aheadFilter = new CommitFilter
        {
            IncludeReachableFrom = sourceCommit,
            ExcludeReachableFrom = targetCommit
        };
        var commitsAhead = repo.Commits.QueryBy(aheadFilter).Count();
        
        var behindFilter = new CommitFilter
        {
            IncludeReachableFrom = targetCommit,
            ExcludeReachableFrom = sourceCommit
        };
        var commitsBehind = repo.Commits.QueryBy(behindFilter).Count();
        
        // Get the actual commit objects for the ahead commits
        var aheadCommits = repo.Commits.QueryBy(aheadFilter)
            .Select(c => new Models.CommitInfo
            {
                Sha = c.Sha,
                Message = c.Message,
                Author = c.Author.Name,
                Date = c.Author.When
            })
            .ToList();
        
        // Get workflows from both branches for change detection
        var sourceWorkflows = GetWorkflowsFromCommit(repo, sourceCommit);
        var targetWorkflows = GetWorkflowsFromCommit(repo, targetCommit);

        var changes = new List<WorkflowChange>();

        // Find added and modified workflows
        foreach (var sourceWorkflow in sourceWorkflows)
        {
            var targetWorkflow = targetWorkflows.FirstOrDefault(w => w.WorkflowKey == sourceWorkflow.WorkflowKey);
            
            if (targetWorkflow == null)
            {
                changes.Add(new WorkflowChange
                {
                    WorkflowKey = sourceWorkflow.WorkflowKey,
                    WorkflowName = sourceWorkflow.WorkflowName,
                    ChangeType = "added",
                    SourceWorkflow = sourceWorkflow,
                    TargetWorkflow = null
                });
            }
            else if (!WorkflowsAreEqual(sourceWorkflow, targetWorkflow))
            {
                changes.Add(new WorkflowChange
                {
                    WorkflowKey = sourceWorkflow.WorkflowKey,
                    WorkflowName = sourceWorkflow.WorkflowName,
                    ChangeType = "modified",
                    SourceWorkflow = sourceWorkflow,
                    TargetWorkflow = targetWorkflow
                });
            }
        }

        // Find deleted workflows
        foreach (var targetWorkflow in targetWorkflows)
        {
            var sourceWorkflow = sourceWorkflows.FirstOrDefault(w => w.WorkflowKey == targetWorkflow.WorkflowKey);
            
            if (sourceWorkflow == null)
            {
                changes.Add(new WorkflowChange
                {
                    WorkflowKey = targetWorkflow.WorkflowKey,
                    WorkflowName = targetWorkflow.WorkflowName,
                    ChangeType = "deleted",
                    SourceWorkflow = null,
                    TargetWorkflow = targetWorkflow
                });
            }
        }
        
        return new BranchComparison
        {
            SourceBranch = sourceBranch,
            TargetBranch = targetBranch,
            CommitsAhead = commitsAhead,
            CommitsBehind = commitsBehind,
            Changes = changes,
            Commits = aheadCommits
        };
    }

    public BranchComparison CompareBranches(string userId, string sourceBranch, string targetBranch, string? sourceCommitSha = null, string? targetCommitSha = null)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);

        using var repo = new Repository(userRepoPath);
        
        // Fetch latest from remote to ensure we have all branches
        Fetch(repo);
        
        // Get source commit - either from SHA or from branch tip
        Commit sourceCommit;
        if (!string.IsNullOrEmpty(sourceCommitSha))
        {
            // Use the stored commit SHA (for merged PRs)
            sourceCommit = repo.Lookup<Commit>(sourceCommitSha);
            if (sourceCommit == null)
            {
                throw new ArgumentException($"Invalid source commit SHA: {sourceCommitSha}");
            }
        }
        else
        {
            // Use the current branch tip (for open PRs or ad-hoc comparisons)
            var sourceBranchRef = ResolveBranch(repo, sourceBranch);
            if (sourceBranchRef == null || sourceBranchRef.Tip == null)
            {
                throw new ArgumentException($"Invalid source branch: {sourceBranch}");
            }
            sourceCommit = sourceBranchRef.Tip;
        }
        
        // Get target commit - either from SHA or from branch tip
        Commit targetCommit;
        if (!string.IsNullOrEmpty(targetCommitSha))
        {
            // Use the stored commit SHA (for merged PRs)
            targetCommit = repo.Lookup<Commit>(targetCommitSha);
            if (targetCommit == null)
            {
                throw new ArgumentException($"Invalid target commit SHA: {targetCommitSha}");
            }
        }
        else
        {
            // Use the current branch tip (for open PRs or ad-hoc comparisons)
            var targetBranchRef = ResolveBranch(repo, targetBranch);
            if (targetBranchRef == null || targetBranchRef.Tip == null)
            {
                throw new ArgumentException($"Invalid target branch: {targetBranch}");
            }
            targetCommit = targetBranchRef.Tip;
        }

        // Count commits ahead
        var aheadFilter = new CommitFilter
        {
            IncludeReachableFrom = sourceCommit,
            ExcludeReachableFrom = targetCommit
        };
        var commitsAhead = repo.Commits.QueryBy(aheadFilter).Count();

        // Get workflows from both branches
        var sourceWorkflows = GetWorkflowsFromCommit(repo, sourceCommit);
        var targetWorkflows = GetWorkflowsFromCommit(repo, targetCommit);

        var changes = new List<WorkflowChange>();

        // Find added and modified workflows
        foreach (var sourceWorkflow in sourceWorkflows)
        {
            var targetWorkflow = targetWorkflows.FirstOrDefault(w => w.WorkflowKey == sourceWorkflow.WorkflowKey);
            
            if (targetWorkflow == null)
            {
                changes.Add(new WorkflowChange
                {
                    WorkflowKey = sourceWorkflow.WorkflowKey,
                    WorkflowName = sourceWorkflow.WorkflowName,
                    ChangeType = "added",
                    SourceWorkflow = sourceWorkflow,
                    TargetWorkflow = null
                });
            }
            else if (!WorkflowsAreEqual(sourceWorkflow, targetWorkflow))
            {
                changes.Add(new WorkflowChange
                {
                    WorkflowKey = sourceWorkflow.WorkflowKey,
                    WorkflowName = sourceWorkflow.WorkflowName,
                    ChangeType = "modified",
                    SourceWorkflow = sourceWorkflow,
                    TargetWorkflow = targetWorkflow
                });
            }
        }

        // Find deleted workflows
        foreach (var targetWorkflow in targetWorkflows)
        {
            var sourceWorkflow = sourceWorkflows.FirstOrDefault(w => w.WorkflowKey == targetWorkflow.WorkflowKey);
            
            if (sourceWorkflow == null)
            {
                changes.Add(new WorkflowChange
                {
                    WorkflowKey = targetWorkflow.WorkflowKey,
                    WorkflowName = targetWorkflow.WorkflowName,
                    ChangeType = "deleted",
                    SourceWorkflow = null,
                    TargetWorkflow = targetWorkflow
                });
            }
        }

        return new BranchComparison
        {
            SourceBranch = sourceBranch,
            TargetBranch = targetBranch,
            CommitsAhead = commitsAhead,
            Changes = changes
        };
    }

    private List<Workflow> GetWorkflowsFromCommit(Repository repo, Commit commit)
    {
        // Try new split-file format first
        var workflowListEntry = commit[WorkflowListFileName];
        if (workflowListEntry != null)
        {
            var listBlob = (Blob)workflowListEntry.Target;
            var listJson = listBlob.GetContentText();
            var workflowList = JsonSerializer.Deserialize<WorkflowList>(listJson);
            
            if (workflowList != null && workflowList.WorkflowIds.Any())
            {
                var workflows = new List<Workflow>();
                foreach (var workflowId in workflowList.WorkflowIds)
                {
                    var workflowPath = $"{WorkflowsDirectory}/{workflowId}.json";
                    var workflowEntry = commit[workflowPath];
                    
                    if (workflowEntry != null)
                    {
                        var workflowBlob = (Blob)workflowEntry.Target;
                        var workflowJson = workflowBlob.GetContentText();
                        var workflow = JsonSerializer.Deserialize<Workflow>(workflowJson);
                        
                        if (workflow != null)
                        {
                            workflows.Add(workflow);
                        }
                    }
                }
                
                var programWorkflowsWrapper = new ProgramWorkflows { Workflows = workflows };
                EnsureTaskIds(programWorkflowsWrapper);
                return workflows;
            }
        }

        // Fallback to legacy single-file format
        var workflowsEntry = commit[WorkflowFileName];
        
        if (workflowsEntry == null)
        {
            return new List<Workflow>();
        }

        var blob = (Blob)workflowsEntry.Target;
        var json = blob.GetContentText();
        
        // Deserialize as ProgramWorkflows (with root Workflows property) or fallback to direct list
        List<Workflow> legacyWorkflows;
        try
        {
            var programWorkflows = JsonSerializer.Deserialize<ProgramWorkflows>(json);
            legacyWorkflows = programWorkflows?.Workflows ?? new List<Workflow>();
        }
        catch
        {
            // Fallback: try deserializing as direct list
            legacyWorkflows = JsonSerializer.Deserialize<List<Workflow>>(json) ?? new List<Workflow>();
        }
        
        // Ensure all tasks have TaskIds
        var legacyWrapper = new ProgramWorkflows { Workflows = legacyWorkflows };
        EnsureTaskIds(legacyWrapper);
        
        return legacyWorkflows;
    }

    private bool WorkflowsAreEqual(Workflow w1, Workflow w2)
    {
        var json1 = JsonSerializer.Serialize(w1, new JsonSerializerOptions { WriteIndented = false });
        var json2 = JsonSerializer.Serialize(w2, new JsonSerializerOptions { WriteIndented = false });
        return json1 == json2;
    }

    private bool PhasesAreEqual(Phase p1, Phase p2)
    {
        var json1 = JsonSerializer.Serialize(p1, new JsonSerializerOptions { WriteIndented = false });
        var json2 = JsonSerializer.Serialize(p2, new JsonSerializerOptions { WriteIndented = false });
        return json1 == json2;
    }

    private bool TasksAreEqual(TaskItem t1, TaskItem t2)
    {
        var json1 = JsonSerializer.Serialize(t1, new JsonSerializerOptions { WriteIndented = false });
        var json2 = JsonSerializer.Serialize(t2, new JsonSerializerOptions { WriteIndented = false });
        return json1 == json2;
    }

    public void MergeBranch(string userId, string sourceBranch, string targetBranch, string message)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);

        using var repo = new Repository(userRepoPath);
        
        // Fetch latest from remote to ensure we have all branches
        Fetch(repo);
        
        var sourceBranchRef = ResolveBranch(repo, sourceBranch);
        var targetBranchRef = ResolveBranch(repo, targetBranch);

        if (sourceBranchRef == null || targetBranchRef == null)
        {
            throw new ArgumentException($"Invalid source or target branch. Source: {sourceBranch}, Target: {targetBranch}");
        }

        var sourceCommit = sourceBranchRef.Tip;

        if (sourceCommit == null)
        {
            throw new ArgumentException("Invalid source branch commit");
        }

        // Checkout target branch
        Commands.Checkout(repo, targetBranchRef);

        // Merge source into target - now properly detects conflicts
        var signature = new Signature("System", "system@workflow.local", DateTimeOffset.Now);
        var mergeResult = repo.Merge(sourceCommit, signature, new MergeOptions
        {
            FailOnConflict = false,
            CommitOnSuccess = true
        });

        if (mergeResult.Status == MergeStatus.Conflicts)
        {
            // Abort the merge to clean up the working directory
            repo.Reset(ResetMode.Hard);
            throw new InvalidOperationException("Merge conflicts detected");
        }

        // Push to remote
        var remote = repo.Network.Remotes["origin"];
        var options = new PushOptions();
        repo.Network.Push(remote, $"refs/heads/{targetBranch}", options);
    }

    public string? GetLastPushedCommitSha(string userId)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);
        
        using var repo = new Repository(userRepoPath);
        
        // Fetch latest from remote
        Fetch(repo);
        
        var currentBranch = repo.Head;
        if (currentBranch == null || !currentBranch.IsCurrentRepositoryHead)
        {
            return null;
        }
        
        // Get the remote tracking branch for the current branch
        var trackedBranch = currentBranch.TrackedBranch;
        if (trackedBranch == null)
        {
            return null; // No remote tracking branch, so no pushed commits
        }
        
        return trackedBranch.Tip?.Sha;
    }

    public void ResetToCommit(string userId, string commitSha)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);
        
        using var repo = new Repository(userRepoPath);
        
        // Fetch latest from remote to ensure we have up-to-date tracking information
        Fetch(repo);
        
        var currentBranch = repo.Head;
        if (currentBranch == null || !currentBranch.IsCurrentRepositoryHead)
        {
            throw new InvalidOperationException("Not currently on a branch");
        }
        
        // Get the last pushed commit (remote tracking branch tip)
        var lastPushedSha = GetLastPushedCommitSha(userId);
        
        // Safety check: Only allow resetting to the last pushed commit
        if (commitSha != lastPushedSha)
        {
            throw new InvalidOperationException(
                "For safety, you can only reset to the last pushed commit. " +
                "This prevents accidentally losing committed work.");
        }
        
        // Verify the commit exists
        var commit = repo.Lookup<Commit>(commitSha);
        if (commit == null)
        {
            throw new ArgumentException($"Commit {commitSha} not found in repository");
        }
        
        // Perform a mixed reset (keeps working directory changes, removes commits)
        // This is safer than hard reset as it preserves uncommitted work
        repo.Reset(ResetMode.Mixed, commit);
    }

    public MergeConflictInfo GetMergeConflicts(string userId, string sourceBranch, string targetBranch)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);

        using var repo = new Repository(userRepoPath);
        
        Fetch(repo);
        
        var sourceBranchRef = ResolveBranch(repo, sourceBranch);
        var targetBranchRef = ResolveBranch(repo, targetBranch);

        if (sourceBranchRef == null || targetBranchRef == null)
        {
            throw new ArgumentException($"Invalid source or target branch");
        }

        var conflictInfo = new MergeConflictInfo
        {
            SourceBranch = sourceBranch,
            TargetBranch = targetBranch
        };

        var baseCommit = repo.ObjectDatabase.FindMergeBase(sourceBranchRef.Tip, targetBranchRef.Tip);
        
        if (baseCommit == null)
        {
            return conflictInfo;
        }

        var baseWorkflows = GetWorkflowsAtCommit(repo, baseCommit);
        var sourceWorkflows = GetWorkflowsAtCommit(repo, sourceBranchRef.Tip);
        var targetWorkflows = GetWorkflowsAtCommit(repo, targetBranchRef.Tip);

        foreach (var sourceWorkflow in sourceWorkflows)
        {
            var baseWorkflow = baseWorkflows.FirstOrDefault(w => w.WorkflowKey == sourceWorkflow.WorkflowKey);
            var targetWorkflow = targetWorkflows.FirstOrDefault(w => w.WorkflowKey == sourceWorkflow.WorkflowKey);

            if (targetWorkflow == null)
            {
                // Workflow deleted in target, exists in source - check for modify-delete conflict
                DetectWorkflowDeletionConflict(
                    sourceWorkflow, 
                    null, 
                    baseWorkflow, 
                    conflictInfo, 
                    deletedInTarget: true);
                continue;
            }

            var workflowConflict = CompareWorkflowsForConflicts(
                sourceWorkflow, 
                targetWorkflow, 
                baseWorkflow,
                conflictInfo);

            if (workflowConflict != null && 
                (workflowConflict.FieldConflicts.Any() || workflowConflict.PhaseConflicts.Any()))
            {
                conflictInfo.WorkflowConflicts.Add(workflowConflict);
            }
        }

        // Check for workflows deleted in source but exist (and possibly modified) in target
        foreach (var targetWorkflow in targetWorkflows)
        {
            var sourceWorkflow = sourceWorkflows.FirstOrDefault(w => w.WorkflowKey == targetWorkflow.WorkflowKey);
            if (sourceWorkflow == null)
            {
                var baseWorkflow = baseWorkflows.FirstOrDefault(w => w.WorkflowKey == targetWorkflow.WorkflowKey);
                DetectWorkflowDeletionConflict(
                    null, 
                    targetWorkflow, 
                    baseWorkflow, 
                    conflictInfo, 
                    deletedInTarget: false);
            }
        }

        conflictInfo.TotalConflicts = conflictInfo.WorkflowConflicts.Sum(wc => 
            wc.FieldConflicts.Count + 
            wc.PhaseConflicts.Sum(pc => pc.FieldConflicts.Count + pc.TaskConflicts.Sum(tc => tc.FieldConflicts.Count)))
            + conflictInfo.DeletionConflicts.Count;

        return conflictInfo;
    }

    private void DetectWorkflowDeletionConflict(
        Workflow? sourceWorkflow,
        Workflow? targetWorkflow,
        Workflow? baseWorkflow,
        MergeConflictInfo conflictInfo,
        bool deletedInTarget)
    {
        if (baseWorkflow == null)
        {
            return;
        }

        var existingWorkflow = deletedInTarget ? sourceWorkflow : targetWorkflow;
        if (existingWorkflow == null)
        {
            return;
        }

        var wasModified = !WorkflowsAreEqual(existingWorkflow, baseWorkflow);
        
        if (wasModified)
        {
            conflictInfo.DeletionConflicts.Add(new DeletionConflict
            {
                ObjectType = ConflictObjectType.Workflow,
                WorkflowKey = baseWorkflow.WorkflowKey,
                ObjectIdentifier = baseWorkflow.WorkflowKey,
                ObjectDisplayName = baseWorkflow.WorkflowName,
                DeletedInSource = !deletedInTarget,
                ModifiedInSource = !deletedInTarget && wasModified,
                DeletedInTarget = deletedInTarget,
                ModifiedInTarget = deletedInTarget && wasModified,
                ModifiedObjectJson = wasModified ? System.Text.Json.JsonSerializer.Serialize(existingWorkflow) : null
            });
        }
    }

    private void DetectPhaseDeletionConflict(
        string workflowKey,
        Phase? sourcePhase,
        Phase? targetPhase,
        Phase? basePhase,
        MergeConflictInfo conflictInfo,
        bool deletedInTarget)
    {
        if (basePhase == null)
        {
            return;
        }

        var existingPhase = deletedInTarget ? sourcePhase : targetPhase;
        if (existingPhase == null)
        {
            return;
        }

        var wasModified = !PhasesAreEqual(existingPhase, basePhase);
        
        if (wasModified)
        {
            conflictInfo.DeletionConflicts.Add(new DeletionConflict
            {
                ObjectType = ConflictObjectType.Phase,
                WorkflowKey = workflowKey,
                PhaseName = basePhase.PhaseName,
                ObjectIdentifier = basePhase.PhaseName,
                ObjectDisplayName = basePhase.PhaseName,
                DeletedInSource = !deletedInTarget,
                ModifiedInSource = !deletedInTarget && wasModified,
                DeletedInTarget = deletedInTarget,
                ModifiedInTarget = deletedInTarget && wasModified,
                ModifiedObjectJson = wasModified ? System.Text.Json.JsonSerializer.Serialize(existingPhase) : null
            });
        }
    }

    private void DetectTaskDeletionConflict(
        string workflowKey,
        string phaseName,
        TaskItem? sourceTask,
        TaskItem? targetTask,
        TaskItem? baseTask,
        MergeConflictInfo conflictInfo,
        bool deletedInTarget)
    {
        if (baseTask == null)
        {
            return;
        }

        var existingTask = deletedInTarget ? sourceTask : targetTask;
        if (existingTask == null)
        {
            return;
        }

        var wasModified = !TasksAreEqual(existingTask, baseTask);
        
        if (wasModified)
        {
            conflictInfo.DeletionConflicts.Add(new DeletionConflict
            {
                ObjectType = ConflictObjectType.Task,
                WorkflowKey = workflowKey,
                PhaseName = phaseName,
                TaskId = baseTask.TaskId,
                ObjectIdentifier = baseTask.TaskId,
                ObjectDisplayName = baseTask.TaskName,
                DeletedInSource = !deletedInTarget,
                ModifiedInSource = !deletedInTarget && wasModified,
                DeletedInTarget = deletedInTarget,
                ModifiedInTarget = deletedInTarget && wasModified,
                ModifiedObjectJson = wasModified ? System.Text.Json.JsonSerializer.Serialize(existingTask) : null
            });
        }
    }

    private WorkflowConflict? CompareWorkflowsForConflicts(
        Workflow source, 
        Workflow target, 
        Workflow? baseWorkflow,
        MergeConflictInfo conflictInfo)
    {
        var conflict = new WorkflowConflict
        {
            WorkflowKey = source.WorkflowKey,
            WorkflowName = source.WorkflowName
        };

        if (baseWorkflow != null)
        {
            // Only report conflict if BOTH branches changed the field from base AND they differ
            if (source.WorkflowName != baseWorkflow.WorkflowName && 
                target.WorkflowName != baseWorkflow.WorkflowName &&
                source.WorkflowName != target.WorkflowName)
            {
                conflict.FieldConflicts.Add(new FieldConflict
                {
                    FieldName = "WorkflowName",
                    BaseValue = baseWorkflow.WorkflowName,
                    CurrentValue = target.WorkflowName,
                    IncomingValue = source.WorkflowName
                });
            }

            if (source.Description != baseWorkflow.Description && 
                target.Description != baseWorkflow.Description &&
                source.Description != target.Description)
            {
                conflict.FieldConflicts.Add(new FieldConflict
                {
                    FieldName = "Description",
                    BaseValue = baseWorkflow.Description,
                    CurrentValue = target.Description,
                    IncomingValue = source.Description
                });
            }
        }

        foreach (var sourcePhase in source.Phases ?? new List<Phase>())
        {
            var targetPhase = target.Phases?.FirstOrDefault(p => p.PhaseName == sourcePhase.PhaseName);
            var basePhase = baseWorkflow?.Phases?.FirstOrDefault(p => p.PhaseName == sourcePhase.PhaseName);

            if (targetPhase == null)
            {
                // Phase deleted in target, exists in source
                DetectPhaseDeletionConflict(
                    source.WorkflowKey,
                    sourcePhase,
                    null,
                    basePhase,
                    conflictInfo,
                    deletedInTarget: true);
            }
            else
            {
                var phaseConflict = ComparePhases(sourcePhase, targetPhase, basePhase, source.WorkflowKey, conflictInfo);
                if (phaseConflict != null && 
                    (phaseConflict.FieldConflicts.Any() || phaseConflict.TaskConflicts.Any()))
                {
                    conflict.PhaseConflicts.Add(phaseConflict);
                }
            }
        }

        // Check for phases deleted in source but exist in target
        foreach (var targetPhase in target.Phases ?? new List<Phase>())
        {
            var sourcePhase = source.Phases?.FirstOrDefault(p => p.PhaseName == targetPhase.PhaseName);
            if (sourcePhase == null)
            {
                var basePhase = baseWorkflow?.Phases?.FirstOrDefault(p => p.PhaseName == targetPhase.PhaseName);
                DetectPhaseDeletionConflict(
                    source.WorkflowKey,
                    null,
                    targetPhase,
                    basePhase,
                    conflictInfo,
                    deletedInTarget: false);
            }
        }

        return conflict;
    }

    private PhaseConflict? ComparePhases(
        Phase source, 
        Phase target, 
        Phase? basePhase,
        string workflowKey,
        MergeConflictInfo conflictInfo)
    {
        var conflict = new PhaseConflict
        {
            PhaseName = source.PhaseName,
            PhaseOrder = source.PhaseOrder
        };

        if (basePhase != null)
        {
            // Only report conflict if BOTH branches changed the field from base AND they differ
            if (source.PhaseName != basePhase.PhaseName && 
                target.PhaseName != basePhase.PhaseName &&
                source.PhaseName != target.PhaseName)
            {
                conflict.FieldConflicts.Add(new FieldConflict
                {
                    FieldName = "PhaseName",
                    BaseValue = basePhase.PhaseName,
                    CurrentValue = target.PhaseName,
                    IncomingValue = source.PhaseName
                });
            }
        }

        foreach (var sourceTask in source.Tasks ?? new List<TaskItem>())
        {
            var targetTask = target.Tasks?.FirstOrDefault(t => t.TaskId == sourceTask.TaskId);
            var baseTask = basePhase?.Tasks?.FirstOrDefault(t => t.TaskId == sourceTask.TaskId);

            if (targetTask == null)
            {
                // Task deleted in target, exists in source
                DetectTaskDeletionConflict(
                    workflowKey,
                    source.PhaseName,
                    sourceTask,
                    null,
                    baseTask,
                    conflictInfo,
                    deletedInTarget: true);
            }
            else
            {
                var taskConflict = CompareTasks(sourceTask, targetTask, baseTask);
                if (taskConflict != null && taskConflict.FieldConflicts.Any())
                {
                    conflict.TaskConflicts.Add(taskConflict);
                }
            }
        }

        // Check for tasks deleted in source but exist in target
        foreach (var targetTask in target.Tasks ?? new List<TaskItem>())
        {
            var sourceTask = source.Tasks?.FirstOrDefault(t => t.TaskId == targetTask.TaskId);
            if (sourceTask == null)
            {
                var baseTask = basePhase?.Tasks?.FirstOrDefault(t => t.TaskId == targetTask.TaskId);
                DetectTaskDeletionConflict(
                    workflowKey,
                    source.PhaseName,
                    null,
                    targetTask,
                    baseTask,
                    conflictInfo,
                    deletedInTarget: false);
            }
        }

        return conflict;
    }

    private TaskConflict? CompareTasks(TaskItem source, TaskItem target, TaskItem? baseTask)
    {
        var conflict = new TaskConflict
        {
            TaskId = source.TaskId,
            TaskName = source.TaskName
        };

        if (baseTask != null)
        {
            // Only report conflict if BOTH branches changed the field from base AND they differ
            if (source.TaskName != baseTask.TaskName && 
                target.TaskName != baseTask.TaskName &&
                source.TaskName != target.TaskName)
            {
                conflict.FieldConflicts.Add(new FieldConflict
                {
                    FieldName = "TaskName",
                    BaseValue = baseTask.TaskName,
                    CurrentValue = target.TaskName,
                    IncomingValue = source.TaskName
                });
            }

            if (source.AssignedRole != baseTask.AssignedRole && 
                target.AssignedRole != baseTask.AssignedRole &&
                source.AssignedRole != target.AssignedRole)
            {
                conflict.FieldConflicts.Add(new FieldConflict
                {
                    FieldName = "AssignedRole",
                    BaseValue = baseTask.AssignedRole,
                    CurrentValue = target.AssignedRole,
                    IncomingValue = source.AssignedRole
                });
            }
        }

        return conflict;
    }

    private List<Workflow> GetWorkflowsAtCommit(Repository repo, Commit commit)
    {
        return GetWorkflowsFromCommit(repo, commit);
    }

    public void ResolveAndMerge(
        string userId, 
        string sourceBranch, 
        string targetBranch, 
        List<ConflictResolution> resolutions)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);

        using var repo = new Repository(userRepoPath);
        
        Fetch(repo);
        
        var sourceBranchRef = ResolveBranch(repo, sourceBranch);
        var targetBranchRef = ResolveBranch(repo, targetBranch);

        if (sourceBranchRef == null || targetBranchRef == null)
        {
            throw new ArgumentException($"Invalid source or target branch");
        }

        Commands.Checkout(repo, targetBranchRef);

        var sourceWorkflows = GetWorkflowsAtCommit(repo, sourceBranchRef.Tip);
        var targetWorkflows = GetWorkflowsAtCommit(repo, targetBranchRef.Tip);

        var mergedWorkflows = ApplyConflictResolutions(sourceWorkflows, targetWorkflows, resolutions);

        // Use WriteWorkflows to properly handle split-file persistence
        var wrapper = new ProgramWorkflows { Workflows = mergedWorkflows };
        WriteWorkflows(userId, wrapper);

        // Stage all workflow files (workflow-list.json + all workflow files)
        Commands.Stage(repo, "*");

        // Check if there are any actual changes to commit
        var status = repo.RetrieveStatus();
        var hasChanges = status.Any(s => s.State != FileStatus.Ignored && s.State != FileStatus.Unaltered);
        
        if (hasChanges)
        {
            var signature = new Signature("System", "system@workflow.local", DateTimeOffset.Now);
            repo.Commit($"Merge {sourceBranch} into {targetBranch} (conflicts resolved)", signature, signature);

            var remote = repo.Network.Remotes["origin"];
            var options = new PushOptions();
            repo.Network.Push(remote, $"refs/heads/{targetBranch}", options);
        }
        // If no changes, the resolution resulted in the same state as target branch
        // This is valid (e.g., when choosing to "keep" in a deletion conflict where target has the item)
    }

    private List<Workflow> ApplyConflictResolutions(
        List<Workflow> sourceWorkflows,
        List<Workflow> targetWorkflows,
        List<ConflictResolution> resolutions)
    {
        var result = new List<Workflow>();
        
        // Get deletion conflict resolutions
        var deletionResolutions = resolutions.Where(r => r.IsDeletionConflict).ToList();

        foreach (var targetWorkflow in targetWorkflows)
        {
            // Check if this workflow has a deletion conflict resolution
            var workflowDeletionResolution = deletionResolutions.FirstOrDefault(r => 
                r.WorkflowKey == targetWorkflow.WorkflowKey && 
                r.ObjectType == ConflictObjectType.Workflow);
            
            if (workflowDeletionResolution != null && workflowDeletionResolution.Resolution == "delete")
            {
                // Skip this workflow - it should be deleted
                continue;
            }

            var sourceWorkflow = sourceWorkflows.FirstOrDefault(w => w.WorkflowKey == targetWorkflow.WorkflowKey);
            if (sourceWorkflow == null)
            {
                // Workflow deleted in source, check for deletion conflict resolution
                if (workflowDeletionResolution != null && workflowDeletionResolution.Resolution == "keep")
                {
                    // Keep the workflow from target
                    result.Add(targetWorkflow);
                }
                else
                {
                    result.Add(targetWorkflow);
                }
                continue;
            }

            var mergedWorkflow = new Workflow
            {
                WorkflowKey = targetWorkflow.WorkflowKey,
                WorkflowName = ApplyResolution(resolutions, targetWorkflow.WorkflowKey, null, null, "WorkflowName", 
                    targetWorkflow.WorkflowName, sourceWorkflow.WorkflowName),
                Description = ApplyResolution(resolutions, targetWorkflow.WorkflowKey, null, null, "Description", 
                    targetWorkflow.Description, sourceWorkflow.Description),
                Phases = MergePhases(targetWorkflow.Phases, sourceWorkflow.Phases, resolutions, targetWorkflow.WorkflowKey)
            };

            result.Add(mergedWorkflow);
        }

        foreach (var sourceWorkflow in sourceWorkflows)
        {
            if (!result.Any(w => w.WorkflowKey == sourceWorkflow.WorkflowKey))
            {
                // Workflow exists in source but not in result yet
                // Check if it has a deletion conflict resolution
                var workflowDeletionResolution = deletionResolutions.FirstOrDefault(r => 
                    r.WorkflowKey == sourceWorkflow.WorkflowKey && 
                    r.ObjectType == ConflictObjectType.Workflow);
                
                if (workflowDeletionResolution != null && workflowDeletionResolution.Resolution == "delete")
                {
                    // Skip - should be deleted
                    continue;
                }
                
                result.Add(sourceWorkflow);
            }
        }

        return result;
    }

    private List<Phase>? MergePhases(
        List<Phase>? targetPhases,
        List<Phase>? sourcePhases,
        List<ConflictResolution> resolutions,
        string workflowKey)
    {
        if (targetPhases == null && sourcePhases == null) return null;
        
        var result = new List<Phase>();
        var allPhaseNames = new HashSet<string>();
        var deletionResolutions = resolutions.Where(r => r.IsDeletionConflict).ToList();
        
        if (targetPhases != null) allPhaseNames.UnionWith(targetPhases.Select(p => p.PhaseName));
        if (sourcePhases != null) allPhaseNames.UnionWith(sourcePhases.Select(p => p.PhaseName));

        foreach (var phaseName in allPhaseNames)
        {
            var targetPhase = targetPhases?.FirstOrDefault(p => p.PhaseName == phaseName);
            var sourcePhase = sourcePhases?.FirstOrDefault(p => p.PhaseName == phaseName);

            // Check for phase deletion conflict resolution
            var phaseDeletionResolution = deletionResolutions.FirstOrDefault(r => 
                r.WorkflowKey == workflowKey && 
                r.PhaseName == phaseName && 
                r.ObjectType == ConflictObjectType.Phase);

            if (phaseDeletionResolution != null && phaseDeletionResolution.Resolution == "delete")
            {
                // Skip this phase - it should be deleted
                continue;
            }

            if (targetPhase != null && sourcePhase != null)
            {
                result.Add(new Phase
                {
                    PhaseName = ApplyResolution(resolutions, workflowKey, phaseName, null, "PhaseName", 
                        targetPhase.PhaseName, sourcePhase.PhaseName),
                    PhaseOrder = targetPhase.PhaseOrder,
                    Tasks = MergeTasks(targetPhase.Tasks, sourcePhase.Tasks, resolutions, workflowKey, phaseName)
                });
            }
            else
            {
                // Phase exists in only one branch - keep it unless explicitly deleted
                if (phaseDeletionResolution != null && phaseDeletionResolution.Resolution == "keep")
                {
                    result.Add(targetPhase ?? sourcePhase!);
                }
                else if (phaseDeletionResolution == null)
                {
                    // No deletion conflict, just keep the existing phase
                    result.Add(targetPhase ?? sourcePhase!);
                }
            }
        }

        return result;
    }

    private List<TaskItem>? MergeTasks(
        List<TaskItem>? targetTasks,
        List<TaskItem>? sourceTasks,
        List<ConflictResolution> resolutions,
        string workflowKey,
        string phaseName)
    {
        if (targetTasks == null && sourceTasks == null) return null;
        
        var result = new List<TaskItem>();
        var allTaskIds = new HashSet<string>();
        var deletionResolutions = resolutions.Where(r => r.IsDeletionConflict).ToList();
        
        if (targetTasks != null) allTaskIds.UnionWith(targetTasks.Where(t => t.TaskId != null).Select(t => t.TaskId!));
        if (sourceTasks != null) allTaskIds.UnionWith(sourceTasks.Where(t => t.TaskId != null).Select(t => t.TaskId!));

        foreach (var taskId in allTaskIds)
        {
            var targetTask = targetTasks?.FirstOrDefault(t => t.TaskId == taskId);
            var sourceTask = sourceTasks?.FirstOrDefault(t => t.TaskId == taskId);

            // Check for task deletion conflict resolution
            var taskDeletionResolution = deletionResolutions.FirstOrDefault(r => 
                r.WorkflowKey == workflowKey && 
                r.PhaseName == phaseName && 
                r.TaskId == taskId && 
                r.ObjectType == ConflictObjectType.Task);

            if (taskDeletionResolution != null && taskDeletionResolution.Resolution == "delete")
            {
                // Skip this task - it should be deleted
                continue;
            }

            if (targetTask != null && sourceTask != null)
            {
                result.Add(new TaskItem
                {
                    TaskId = taskId,
                    TaskName = ApplyResolution(resolutions, workflowKey, phaseName, taskId, "TaskName", 
                        targetTask.TaskName, sourceTask.TaskName),
                    TaskType = targetTask.TaskType,
                    AssignedRole = ApplyResolution(resolutions, workflowKey, phaseName, taskId, "AssignedRole", 
                        targetTask.AssignedRole, sourceTask.AssignedRole),
                    EstimatedDurationHours = targetTask.EstimatedDurationHours,
                    Dependencies = targetTask.Dependencies,
                    IsAutomated = targetTask.IsAutomated
                });
            }
            else
            {
                // Task exists in only one branch - keep it unless explicitly deleted
                if (taskDeletionResolution != null && taskDeletionResolution.Resolution == "keep")
                {
                    result.Add(targetTask ?? sourceTask!);
                }
                else if (taskDeletionResolution == null)
                {
                    // No deletion conflict, just keep the existing task
                    result.Add(targetTask ?? sourceTask!);
                }
            }
        }

        return result;
    }

    private string ApplyResolution(
        List<ConflictResolution> resolutions,
        string workflowKey,
        string? phaseName,
        string? taskId,
        string fieldName,
        string currentValue,
        string incomingValue)
    {
        var resolution = resolutions.FirstOrDefault(r =>
            r.WorkflowKey == workflowKey &&
            r.PhaseName == phaseName &&
            r.TaskId == taskId &&
            r.FieldName == fieldName);

        if (resolution != null)
        {
            return resolution.Resolution == "current" ? currentValue : incomingValue;
        }

        return currentValue == incomingValue ? currentValue : currentValue;
    }

    public void ResetAllRepositories(string sampleDataPath)
    {
        _logger.LogInformation("Starting repository reset...");
        
        try
        {
            // Delete all user repositories
            if (Directory.Exists(_repoBasePath))
            {
                _logger.LogInformation("Deleting all user repositories at {Path}", _repoBasePath);
                Directory.Delete(_repoBasePath, true);
                Directory.CreateDirectory(_repoBasePath);
            }

            // Delete central repository
            if (Directory.Exists(_centralRepoPath))
            {
                _logger.LogInformation("Deleting central repository at {Path}", _centralRepoPath);
                Directory.Delete(_centralRepoPath, true);
            }

            // Delete pull requests
            if (Directory.Exists(_pullRequestsPath))
            {
                _logger.LogInformation("Deleting all pull requests at {Path}", _pullRequestsPath);
                Directory.Delete(_pullRequestsPath, true);
            }
            
            // Recreate pull requests directory (always, even if it didn't exist before)
            Directory.CreateDirectory(_pullRequestsPath);

            // Recreate central repository
            _logger.LogInformation("Recreating central repository");
            Repository.Init(_centralRepoPath, isBare: true);

            // Initialize with sample data
            _logger.LogInformation("Initializing sample data");
            DataInitializer.InitializeSampleData(_centralRepoPath, sampleDataPath);

            _logger.LogInformation("Repository reset completed successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during repository reset");
            throw;
        }
    }
}
