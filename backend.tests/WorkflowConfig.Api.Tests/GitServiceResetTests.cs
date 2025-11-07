using Xunit;
using FluentAssertions;
using WorkflowConfig.Api.Services;
using WorkflowConfig.Api.Models;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;
using Moq;

namespace WorkflowConfig.Api.Tests;

/// <summary>
/// Tests for GitService reset functionality.
/// Verifies that reset operations work correctly and safely.
/// </summary>
public class GitServiceResetTests : IDisposable
{
    private readonly Mock<IConfiguration> _configMock;
    private readonly Mock<IWebHostEnvironment> _envMock;
    private readonly Mock<ILogger<GitService>> _loggerMock;
    private readonly Mock<IProgramService> _programServiceMock;
    private readonly string _testBasePath;
    private readonly GitService _gitService;
    private const string TestProgramId = "test-program";

    public GitServiceResetTests()
    {
        // Create a unique test directory for this test run
        _testBasePath = Path.Combine(Path.GetTempPath(), $"GitServiceResetTests_{Guid.NewGuid()}");
        Directory.CreateDirectory(_testBasePath);
        
        _configMock = new Mock<IConfiguration>();
        _envMock = new Mock<IWebHostEnvironment>();
        _loggerMock = new Mock<ILogger<GitService>>();
        
        _configMock.Setup(c => c["GitSettings:RepoBasePath"]).Returns(Path.Combine(_testBasePath, "user-repos"));
        _configMock.Setup(c => c["GitSettings:CentralRepoPath"]).Returns(Path.Combine(_testBasePath, "central-repo"));
        _configMock.Setup(c => c["GitSettings:PullRequestsPath"]).Returns(Path.Combine(_testBasePath, "pull-requests"));
        _envMock.Setup(e => e.ContentRootPath).Returns(_testBasePath);
        
        _programServiceMock = new Mock<IProgramService>();
        
        _programServiceMock.Setup(x => x.GetCentralRepoPath(It.IsAny<string>()))
            .Returns((string programId) => Path.Combine(_testBasePath, "central-repo"));
            
        _programServiceMock.Setup(x => x.GetUserRepoPath(It.IsAny<string>(), It.IsAny<string>()))
            .Returns((string programId, string userId) => Path.Combine(_testBasePath, "user-repos", userId));
        
        _gitService = new GitService(_programServiceMock.Object, _configMock.Object, _envMock.Object, _loggerMock.Object);
        
        // Initialize the central repository
        _gitService.InitializeCentralRepository(TestProgramId);
        
        // Initialize with sample data
        InitializeSampleData();
    }
    
    private void InitializeSampleData()
    {
        var centralRepoPath = Path.Combine(_testBasePath, "central-repo");
        var tempInitPath = Path.Combine(_testBasePath, "temp-init");
        
        try
        {
            LibGit2Sharp.Repository.Clone(centralRepoPath, tempInitPath);
            
            using (var repo = new LibGit2Sharp.Repository(tempInitPath))
            {
                var workflow = new Workflow
                {
                    Id = Guid.Parse("00000000-0000-0000-0000-000000000002"),
                    WorkflowKey = "initial-workflow",
                    WorkflowName = "Initial Workflow",
                    Description = "Initial commit workflow",
                    Phases = new List<Phase>()
                };
                
                // Create split-file format: workflow-list.json + workflows/{id}.json
                var workflowsDir = Path.Combine(tempInitPath, "workflows");
                Directory.CreateDirectory(workflowsDir);
                
                var workflowList = new WorkflowList
                {
                    WorkflowIds = new List<Guid> { workflow.Id }
                };
                var listFilePath = Path.Combine(tempInitPath, "workflow-list.json");
                var listJson = System.Text.Json.JsonSerializer.Serialize(workflowList, new System.Text.Json.JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(listFilePath, listJson);
                
                var workflowFilePath = Path.Combine(workflowsDir, $"{workflow.Id}.json");
                var workflowJson = System.Text.Json.JsonSerializer.Serialize(workflow, new System.Text.Json.JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(workflowFilePath, workflowJson);
                
                LibGit2Sharp.Commands.Stage(repo, "*");
                var signature = new LibGit2Sharp.Signature("System", "system@workflow.com", DateTimeOffset.Now);
                repo.Commit("Initial commit with sample data", signature, signature, new LibGit2Sharp.CommitOptions());
                
                var remote = repo.Network.Remotes["origin"];
                var pushOptions = new LibGit2Sharp.PushOptions();
                repo.Network.Push(remote, @"refs/heads/master", pushOptions);
            }
        }
        finally
        {
            if (Directory.Exists(tempInitPath))
            {
                Directory.Delete(tempInitPath, true);
            }
        }
    }

    public void Dispose()
    {
        if (Directory.Exists(_testBasePath))
        {
            Directory.Delete(_testBasePath, true);
        }
    }

    [Fact]
    public void GetLastPushedCommitSha_WithPushedBranch_ShouldReturnRemoteTrackingBranchTip()
    {
        // Arrange
        var userId = "testUser";
        
        // Create a feature branch, make a commit, and push it
        _gitService.CreateBranch(TestProgramId, userId, "feature/test-branch");
        _gitService.SwitchBranch(TestProgramId, userId, "feature/test-branch");
        
        var workflows = _gitService.ReadWorkflows(TestProgramId, userId);
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "test-workflow",
            WorkflowName = "Test Workflow",
            Description = "Test",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Add test workflow", "Test User", "test@example.com");
        _gitService.Push(TestProgramId, userId);

        // Act
        var lastPushedSha = _gitService.GetLastPushedCommitSha(TestProgramId, userId);

        // Assert
        lastPushedSha.Should().NotBeNullOrEmpty("branch has been pushed to remote");
    }

    [Fact]
    public void GetLastPushedCommitSha_WithUnpushedLocalBranch_ShouldReturnNull()
    {
        // Arrange
        var userId = "testUser";
        
        // Create a feature branch and make a local commit (don't push)
        _gitService.CreateBranch(TestProgramId, userId, "feature/local-only");
        _gitService.SwitchBranch(TestProgramId, userId, "feature/local-only");
        
        var workflows = _gitService.ReadWorkflows(TestProgramId, userId);
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "local-workflow",
            WorkflowName = "Local Workflow",
            Description = "Not pushed",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Local commit", "Test User", "test@example.com");
        // Intentionally NOT pushing

        // Act
        var lastPushedSha = _gitService.GetLastPushedCommitSha(TestProgramId, userId);

        // Assert
        lastPushedSha.Should().BeNull("branch has not been pushed to remote");
    }

    [Fact]
    public void ResetToCommit_ToLastPushedCommit_ShouldSucceed()
    {
        // Arrange
        var userId = "testUser";
        
        // Create and push initial commit
        _gitService.CreateBranch(TestProgramId, userId, "feature/reset-test");
        _gitService.SwitchBranch(TestProgramId, userId, "feature/reset-test");
        
        var workflows = _gitService.ReadWorkflows(TestProgramId, userId);
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "workflow-1",
            WorkflowName = "Workflow 1",
            Description = "First commit",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "First commit", "Test User", "test@example.com");
        _gitService.Push(TestProgramId, userId);
        
        var lastPushedSha = _gitService.GetLastPushedCommitSha(TestProgramId, userId);
        
        // Make an additional local commit (not pushed)
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "workflow-2",
            WorkflowName = "Workflow 2",
            Description = "Second commit (to be reset)",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Second commit (accidental)", "Test User", "test@example.com");

        // Act - Reset to the last pushed commit
        _gitService.ResetToCommit(TestProgramId, userId, lastPushedSha!);

        // Assert
        var commits = _gitService.GetCommitHistory(TestProgramId, userId, 10);
        commits.First().Message.Should().Contain("First commit", "reset removed the second commit");
        commits.Should().NotContain(c => c.Message.Contains("Second commit"), "the accidental commit should be removed");
    }

    [Fact]
    public void ResetToCommit_ToNonLastPushedCommit_ShouldThrowException()
    {
        // Arrange
        var userId = "testUser";
        
        // Create and push two commits
        _gitService.CreateBranch(TestProgramId, userId, "feature/safety-test");
        _gitService.SwitchBranch(TestProgramId, userId, "feature/safety-test");
        
        var workflows = _gitService.ReadWorkflows(TestProgramId, userId);
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "workflow-1",
            WorkflowName = "Workflow 1",
            Description = "First",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "First commit", "Test User", "test@example.com");
        _gitService.Push(TestProgramId, userId);
        
        var firstCommitSha = _gitService.GetCommitHistory(TestProgramId, userId, 1).First().Sha;
        
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "workflow-2",
            WorkflowName = "Workflow 2",
            Description = "Second",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Second commit", "Test User", "test@example.com");
        _gitService.Push(TestProgramId, userId);

        // Act & Assert - Try to reset to first commit (not the last pushed)
        var action = () => _gitService.ResetToCommit(TestProgramId, userId, firstCommitSha);
        
        action.Should().Throw<InvalidOperationException>()
            .WithMessage("*only reset to the last pushed commit*");
    }

    [Fact]
    public void ResetToCommit_WithMixedReset_ShouldPreserveWorkingDirectoryChanges()
    {
        // Arrange
        var userId = "testUser";
        
        // Create and push initial commit
        _gitService.CreateBranch(TestProgramId, userId, "feature/preserve-test");
        _gitService.SwitchBranch(TestProgramId, userId, "feature/preserve-test");
        
        var workflows = _gitService.ReadWorkflows(TestProgramId, userId);
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "workflow-1",
            WorkflowName = "Workflow 1",
            Description = "Pushed",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Pushed commit", "Test User", "test@example.com");
        _gitService.Push(TestProgramId, userId);
        
        var lastPushedSha = _gitService.GetLastPushedCommitSha(TestProgramId, userId);
        
        // Make local commit with changes
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "workflow-2",
            WorkflowName = "Workflow 2",
            Description = "Local commit",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Local commit", "Test User", "test@example.com");

        // Act - Reset should preserve the workflow-2 changes in working directory
        _gitService.ResetToCommit(TestProgramId, userId, lastPushedSha!);

        // Assert - The reset should have removed the commit but kept the file changes
        var status = _gitService.GetStatus(TestProgramId, userId);
        status.Modified.Should().Contain("workflow-list.json", "reset --mixed keeps working directory changes");
    }

    [Fact]
    public void ResetToCommit_WithInvalidCommitSha_ShouldThrowException()
    {
        // Arrange
        var userId = "testUser";
        var invalidSha = "0000000000000000000000000000000000000000";

        // Act & Assert
        var action = () => _gitService.ResetToCommit(TestProgramId, userId, invalidSha);
        
        action.Should().Throw<InvalidOperationException>()
            .WithMessage("*only reset to the last pushed commit*");
    }

    [Fact]
    public void GetLastPushedCommitSha_AfterPushingMultipleCommits_ShouldReturnLatestPushedSha()
    {
        // Arrange
        var userId = "testUser";
        
        _gitService.CreateBranch(TestProgramId, userId, "feature/multiple-pushes");
        _gitService.SwitchBranch(TestProgramId, userId, "feature/multiple-pushes");
        
        // First commit and push
        var workflows = _gitService.ReadWorkflows(TestProgramId, userId);
        workflows.Workflows.Add(new Workflow { WorkflowKey = "wf-1", WorkflowName = "WF 1", Description = "1", Phases = new List<Phase>() });
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Commit 1", "User", "user@test.com");
        _gitService.Push(TestProgramId, userId);
        
        var firstPushedSha = _gitService.GetLastPushedCommitSha(TestProgramId, userId);
        
        // Second commit and push
        workflows.Workflows.Add(new Workflow { WorkflowKey = "wf-2", WorkflowName = "WF 2", Description = "2", Phases = new List<Phase>() });
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Commit 2", "User", "user@test.com");
        _gitService.Push(TestProgramId, userId);
        
        var secondPushedSha = _gitService.GetLastPushedCommitSha(TestProgramId, userId);

        // Act & Assert
        firstPushedSha.Should().NotBeNullOrEmpty();
        secondPushedSha.Should().NotBeNullOrEmpty();
        secondPushedSha.Should().NotBe(firstPushedSha, "second push should have a different SHA");
    }
}
