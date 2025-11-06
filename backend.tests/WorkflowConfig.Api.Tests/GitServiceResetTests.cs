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
    private readonly string _testBasePath;
    private readonly GitService _gitService;

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
        
        _gitService = new GitService(_configMock.Object, _envMock.Object, _loggerMock.Object);
        
        // Initialize the central repository
        _gitService.InitializeCentralRepository();
        
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
                var sampleWorkflows = new ProgramWorkflows
                {
                    Workflows = new List<Workflow>
                    {
                        new Workflow
                        {
                            WorkflowKey = "initial-workflow",
                            WorkflowName = "Initial Workflow",
                            Description = "Initial commit workflow",
                            Phases = new List<Phase>()
                        }
                    }
                };
                
                var workflowFilePath = Path.Combine(tempInitPath, "workflows.json");
                var json = System.Text.Json.JsonSerializer.Serialize(sampleWorkflows, new System.Text.Json.JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(workflowFilePath, json);
                
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
        _gitService.CreateBranch(userId, "feature/test-branch");
        _gitService.SwitchBranch(userId, "feature/test-branch");
        
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "test-workflow",
            WorkflowName = "Test Workflow",
            Description = "Test",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "Add test workflow", "Test User", "test@example.com");
        _gitService.Push(userId);

        // Act
        var lastPushedSha = _gitService.GetLastPushedCommitSha(userId);

        // Assert
        lastPushedSha.Should().NotBeNullOrEmpty("branch has been pushed to remote");
    }

    [Fact]
    public void GetLastPushedCommitSha_WithUnpushedLocalBranch_ShouldReturnNull()
    {
        // Arrange
        var userId = "testUser";
        
        // Create a feature branch and make a local commit (don't push)
        _gitService.CreateBranch(userId, "feature/local-only");
        _gitService.SwitchBranch(userId, "feature/local-only");
        
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "local-workflow",
            WorkflowName = "Local Workflow",
            Description = "Not pushed",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "Local commit", "Test User", "test@example.com");
        // Intentionally NOT pushing

        // Act
        var lastPushedSha = _gitService.GetLastPushedCommitSha(userId);

        // Assert
        lastPushedSha.Should().BeNull("branch has not been pushed to remote");
    }

    [Fact]
    public void ResetToCommit_ToLastPushedCommit_ShouldSucceed()
    {
        // Arrange
        var userId = "testUser";
        
        // Create and push initial commit
        _gitService.CreateBranch(userId, "feature/reset-test");
        _gitService.SwitchBranch(userId, "feature/reset-test");
        
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "workflow-1",
            WorkflowName = "Workflow 1",
            Description = "First commit",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "First commit", "Test User", "test@example.com");
        _gitService.Push(userId);
        
        var lastPushedSha = _gitService.GetLastPushedCommitSha(userId);
        
        // Make an additional local commit (not pushed)
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "workflow-2",
            WorkflowName = "Workflow 2",
            Description = "Second commit (to be reset)",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "Second commit (accidental)", "Test User", "test@example.com");

        // Act - Reset to the last pushed commit
        _gitService.ResetToCommit(userId, lastPushedSha!);

        // Assert
        var commits = _gitService.GetCommitHistory(userId, 10);
        commits.First().Message.Should().Contain("First commit", "reset removed the second commit");
        commits.Should().NotContain(c => c.Message.Contains("Second commit"), "the accidental commit should be removed");
    }

    [Fact]
    public void ResetToCommit_ToNonLastPushedCommit_ShouldThrowException()
    {
        // Arrange
        var userId = "testUser";
        
        // Create and push two commits
        _gitService.CreateBranch(userId, "feature/safety-test");
        _gitService.SwitchBranch(userId, "feature/safety-test");
        
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "workflow-1",
            WorkflowName = "Workflow 1",
            Description = "First",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "First commit", "Test User", "test@example.com");
        _gitService.Push(userId);
        
        var firstCommitSha = _gitService.GetCommitHistory(userId, 1).First().Sha;
        
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "workflow-2",
            WorkflowName = "Workflow 2",
            Description = "Second",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "Second commit", "Test User", "test@example.com");
        _gitService.Push(userId);

        // Act & Assert - Try to reset to first commit (not the last pushed)
        var action = () => _gitService.ResetToCommit(userId, firstCommitSha);
        
        action.Should().Throw<InvalidOperationException>()
            .WithMessage("*only reset to the last pushed commit*");
    }

    [Fact]
    public void ResetToCommit_WithMixedReset_ShouldPreserveWorkingDirectoryChanges()
    {
        // Arrange
        var userId = "testUser";
        
        // Create and push initial commit
        _gitService.CreateBranch(userId, "feature/preserve-test");
        _gitService.SwitchBranch(userId, "feature/preserve-test");
        
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "workflow-1",
            WorkflowName = "Workflow 1",
            Description = "Pushed",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "Pushed commit", "Test User", "test@example.com");
        _gitService.Push(userId);
        
        var lastPushedSha = _gitService.GetLastPushedCommitSha(userId);
        
        // Make local commit with changes
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "workflow-2",
            WorkflowName = "Workflow 2",
            Description = "Local commit",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "Local commit", "Test User", "test@example.com");

        // Act - Reset should preserve the workflow-2 changes in working directory
        _gitService.ResetToCommit(userId, lastPushedSha!);

        // Assert - The reset should have removed the commit but kept the file changes
        var status = _gitService.GetStatus(userId);
        status.Modified.Should().Contain("workflow-list.json", "reset --mixed keeps working directory changes");
    }

    [Fact]
    public void ResetToCommit_WithInvalidCommitSha_ShouldThrowException()
    {
        // Arrange
        var userId = "testUser";
        var invalidSha = "0000000000000000000000000000000000000000";

        // Act & Assert
        var action = () => _gitService.ResetToCommit(userId, invalidSha);
        
        action.Should().Throw<InvalidOperationException>()
            .WithMessage("*only reset to the last pushed commit*");
    }

    [Fact]
    public void GetLastPushedCommitSha_AfterPushingMultipleCommits_ShouldReturnLatestPushedSha()
    {
        // Arrange
        var userId = "testUser";
        
        _gitService.CreateBranch(userId, "feature/multiple-pushes");
        _gitService.SwitchBranch(userId, "feature/multiple-pushes");
        
        // First commit and push
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.Add(new Workflow { WorkflowKey = "wf-1", WorkflowName = "WF 1", Description = "1", Phases = new List<Phase>() });
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "Commit 1", "User", "user@test.com");
        _gitService.Push(userId);
        
        var firstPushedSha = _gitService.GetLastPushedCommitSha(userId);
        
        // Second commit and push
        workflows.Workflows.Add(new Workflow { WorkflowKey = "wf-2", WorkflowName = "WF 2", Description = "2", Phases = new List<Phase>() });
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "Commit 2", "User", "user@test.com");
        _gitService.Push(userId);
        
        var secondPushedSha = _gitService.GetLastPushedCommitSha(userId);

        // Act & Assert
        firstPushedSha.Should().NotBeNullOrEmpty();
        secondPushedSha.Should().NotBeNullOrEmpty();
        secondPushedSha.Should().NotBe(firstPushedSha, "second push should have a different SHA");
    }
}
