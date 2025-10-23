using LibGit2Sharp;
using WorkflowConfig.Api.Models;
using System.Text.Json;

namespace WorkflowConfig.Api.Services;

public class GitService
{
    private readonly string _repoBasePath;
    private readonly string _centralRepoPath;
    private readonly ILogger<GitService> _logger;
    private const string WorkflowFileName = "workflows.json";

    public GitService(IConfiguration configuration, IWebHostEnvironment environment, ILogger<GitService> logger)
    {
        _logger = logger;
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

    public string GetBranchCommitSha(string userId, string branchName)
    {
        EnsureUserRepository(userId);
        var userRepoPath = GetUserRepoPath(userId);

        using var repo = new Repository(userRepoPath);
        
        // Fetch latest from remote to ensure we have all branches
        Fetch(repo);
        
        var branch = ResolveBranch(repo, branchName);
        if (branch == null || branch.Tip == null)
        {
            throw new ArgumentException($"Invalid branch: {branchName}");
        }

        return branch.Tip.Sha;
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
        var workflowsEntry = commit[WorkflowFileName];
        
        if (workflowsEntry == null)
        {
            return new List<Workflow>();
        }

        var blob = (Blob)workflowsEntry.Target;
        var json = blob.GetContentText();
        
        // Deserialize as ProgramWorkflows (with root Workflows property) or fallback to direct list
        List<Workflow> workflows;
        try
        {
            var programWorkflows = JsonSerializer.Deserialize<ProgramWorkflows>(json);
            workflows = programWorkflows?.Workflows ?? new List<Workflow>();
        }
        catch
        {
            // Fallback: try deserializing as direct list
            workflows = JsonSerializer.Deserialize<List<Workflow>>(json) ?? new List<Workflow>();
        }
        
        // Ensure all tasks have TaskIds
        var programWorkflowsWrapper = new ProgramWorkflows { Workflows = workflows };
        EnsureTaskIds(programWorkflowsWrapper);
        
        return workflows;
    }

    private bool WorkflowsAreEqual(Workflow w1, Workflow w2)
    {
        var json1 = JsonSerializer.Serialize(w1, new JsonSerializerOptions { WriteIndented = false });
        var json2 = JsonSerializer.Serialize(w2, new JsonSerializerOptions { WriteIndented = false });
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

        // Merge source into target
        var signature = new Signature("System", "system@workflow.local", DateTimeOffset.Now);
        var mergeResult = repo.Merge(sourceCommit, signature, new MergeOptions
        {
            FileConflictStrategy = CheckoutFileConflictStrategy.Theirs,
            MergeFileFavor = MergeFileFavor.Theirs
        });

        if (mergeResult.Status == MergeStatus.Conflicts)
        {
            throw new InvalidOperationException("Merge conflicts detected");
        }

        // Push to remote
        var remote = repo.Network.Remotes["origin"];
        var options = new PushOptions();
        repo.Network.Push(remote, $"refs/heads/{targetBranch}", options);
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
