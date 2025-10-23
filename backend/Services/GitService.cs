using LibGit2Sharp;
using WorkflowConfig.Api.Models;
using System.Text.Json;

namespace WorkflowConfig.Api.Services;

public class GitService
{
    private readonly string _repoBasePath;
    private readonly string _centralRepoPath;
    private const string WorkflowFileName = "workflows.json";

    public GitService(IConfiguration configuration, IWebHostEnvironment environment)
    {
        var repoBasePath = configuration["GitSettings:RepoBasePath"] ?? Path.Combine(Directory.GetCurrentDirectory(), "data", "user-repos");
        var centralRepoPath = configuration["GitSettings:CentralRepoPath"] ?? Path.Combine(Directory.GetCurrentDirectory(), "data", "central-repo");
        
        // Resolve paths relative to the content root to ensure consistent behavior in all contexts
        _repoBasePath = Path.IsPathRooted(repoBasePath) 
            ? repoBasePath 
            : Path.GetFullPath(Path.Combine(environment.ContentRootPath, repoBasePath));
        _centralRepoPath = Path.IsPathRooted(centralRepoPath) 
            ? centralRepoPath 
            : Path.GetFullPath(Path.Combine(environment.ContentRootPath, centralRepoPath));
        
        Directory.CreateDirectory(_repoBasePath);
        Directory.CreateDirectory(Path.GetDirectoryName(_centralRepoPath)!);
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
            return; // Already exists and is valid
        }
        
        // Clean up any partially created directory
        if (Directory.Exists(userRepoPath))
        {
            Directory.Delete(userRepoPath, true);
        }

        Repository.Clone(_centralRepoPath, userRepoPath);
        
        // Ensure the remote URL is correct after cloning
        using var repo = new Repository(userRepoPath);
        repo.Network.Remotes.Update("origin", r => r.Url = _centralRepoPath);
    }

    private void EnsureUserRepository(string userId)
    {
        var userRepoPath = GetUserRepoPath(userId);
        
        if (!Repository.IsValid(userRepoPath))
        {
            CloneRepositoryForUser(userId);
        }
        else
        {
            // Fix remote URL if it's incorrect (e.g., after data folder relocation)
            using var repo = new Repository(userRepoPath);
            var remote = repo.Network.Remotes["origin"];
            if (remote != null && remote.Url != _centralRepoPath)
            {
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

        return new GitStatus
        {
            Added = status.Added.Select(s => s.FilePath).ToList(),
            Modified = status.Modified.Select(s => s.FilePath).ToList(),
            Removed = status.Removed.Select(s => s.FilePath).ToList(),
            Untracked = status.Untracked.Select(s => s.FilePath).ToList(),
            CurrentBranch = repo.Head.FriendlyName,
            IsDirty = status.IsDirty,
            CommitsAhead = commitsAhead,
            CommitsBehind = commitsBehind
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

    public List<CommitInfo> GetCommitHistory(string userId, int count = 20)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);
        
        using var repo = new Repository(userRepoPath);
        
        return repo.Commits
            .Take(count)
            .Select(c => new CommitInfo
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
        var filePath = Path.Combine(userRepoPath, WorkflowFileName);

        if (!File.Exists(filePath))
        {
            return new ProgramWorkflows { Workflows = new List<Workflow>() };
        }

        var json = File.ReadAllText(filePath);
        var workflows = JsonSerializer.Deserialize<ProgramWorkflows>(json) ?? new ProgramWorkflows { Workflows = new List<Workflow>() };
        
        EnsureTaskIds(workflows);
        
        return workflows;
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
        var filePath = Path.Combine(userRepoPath, WorkflowFileName);

        var options = new JsonSerializerOptions { WriteIndented = true };
        var json = JsonSerializer.Serialize(workflows, options);
        
        File.WriteAllText(filePath, json);
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
        
        var headCommit = repo.Head.Tip;
        if (headCommit == null)
        {
            return;
        }

        try
        {
            var previousVersionJson = GetFileContentFromCommit(repo, headCommit, WorkflowFileName);
            var previousVersion = string.IsNullOrEmpty(previousVersionJson)
                ? new ProgramWorkflows { Workflows = new List<Workflow>() }
                : JsonSerializer.Deserialize<ProgramWorkflows>(previousVersionJson) ?? new ProgramWorkflows { Workflows = new List<Workflow>() };

            EnsureTaskIds(previousVersion);

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
        if (current.WorkflowName != previous.WorkflowName || 
            current.Description != previous.Description)
        {
            current.GitStatus = "modified";
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
}
