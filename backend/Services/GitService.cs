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
        return JsonSerializer.Deserialize<ProgramWorkflows>(json) ?? new ProgramWorkflows { Workflows = new List<Workflow>() };
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
}
