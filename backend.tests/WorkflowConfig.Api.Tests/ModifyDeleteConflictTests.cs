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
using LibGit2Sharp;

namespace WorkflowConfig.Api.Tests;

/// <summary>
/// Tests for modify-delete conflict resolution.
/// Tests scenarios where one branch modifies an item while another branch deletes it.
/// </summary>
public class ModifyDeleteConflictTests : IDisposable
{
    private readonly Mock<IConfiguration> _configMock;
    private readonly Mock<IWebHostEnvironment> _envMock;
    private readonly Mock<ILogger<GitService>> _loggerMock;
    private readonly string _testBasePath;
    private readonly GitService _gitService;

    public ModifyDeleteConflictTests()
    {
        _testBasePath = Path.Combine(Path.GetTempPath(), $"ModifyDeleteTests_{Guid.NewGuid()}");
        Directory.CreateDirectory(_testBasePath);
        
        _configMock = new Mock<IConfiguration>();
        _envMock = new Mock<IWebHostEnvironment>();
        _loggerMock = new Mock<ILogger<GitService>>();
        
        _configMock.Setup(c => c["GitSettings:RepoBasePath"]).Returns(Path.Combine(_testBasePath, "user-repos"));
        _configMock.Setup(c => c["GitSettings:CentralRepoPath"]).Returns(Path.Combine(_testBasePath, "central-repo"));
        _configMock.Setup(c => c["GitSettings:PullRequestsPath"]).Returns(Path.Combine(_testBasePath, "pull-requests"));
        _envMock.Setup(e => e.ContentRootPath).Returns(_testBasePath);
        
        _gitService = new GitService(_configMock.Object, _envMock.Object, _loggerMock.Object);
        _gitService.InitializeCentralRepository();
        InitializeSampleData();
    }
    
    private void InitializeSampleData()
    {
        var centralRepoPath = Path.Combine(_testBasePath, "central-repo");
        var tempInitPath = Path.Combine(_testBasePath, "temp-init");
        
        try
        {
            Repository.Clone(centralRepoPath, tempInitPath);
            
            using (var repo = new Repository(tempInitPath))
            {
                var sampleWorkflows = new ProgramWorkflows
                {
                    Workflows = new List<Workflow>
                    {
                        new Workflow
                        {
                            WorkflowKey = "WF-001",
                            WorkflowName = "Test Workflow",
                            Description = "Test Description",
                            Phases = new List<Phase>
                            {
                                new Phase
                                {
                                    PhaseName = "Phase 1",
                                    PhaseOrder = 1,
                                    Tasks = new List<TaskItem>
                                    {
                                        new TaskItem
                                        {
                                            TaskId = "TASK-001",
                                            TaskName = "Task 1",
                                            TaskType = "Review",
                                            AssignedRole = "Underwriter"
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                
                var workflowFilePath = Path.Combine(tempInitPath, "workflows.json");
                var json = System.Text.Json.JsonSerializer.Serialize(sampleWorkflows, new System.Text.Json.JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(workflowFilePath, json);
                
                Commands.Stage(repo, "*");
                var signature = new Signature("System", "system@workflow.com", DateTimeOffset.Now);
                repo.Commit("Initial commit", signature, signature);
                
                var remote = repo.Network.Remotes["origin"];
                repo.Network.Push(remote, @"refs/heads/master", new PushOptions());
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
    public void ResolveAndMerge_WorkflowModifyDelete_KeepResolution_ShouldKeepWorkflow()
    {
        // Arrange
        const string userId = "testUser";
        const string modifyBranch = "modify-branch";
        const string deleteBranch = "delete-branch";
        
        // Create modify and delete branches
        CreateWorkflowModifyDeleteScenario(userId, modifyBranch, deleteBranch);
        
        var resolutions = new List<ConflictResolution>
        {
            new ConflictResolution
            {
                WorkflowKey = "WF-001",
                ObjectType = ConflictObjectType.Workflow,
                Resolution = "keep",
                IsDeletionConflict = true
            }
        };
        
        // Act
        _gitService.ResolveAndMerge(userId, modifyBranch, deleteBranch, resolutions);
        
        // Assert
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.Should().HaveCount(1);
        workflows.Workflows.First().WorkflowKey.Should().Be("WF-001");
        workflows.Workflows.First().WorkflowName.Should().Be("Modified Workflow Name");
    }

    [Fact]
    public void ResolveAndMerge_WorkflowModifyDelete_DeleteResolution_ShouldDeleteWorkflow()
    {
        // Arrange
        const string userId = "testUser";
        const string modifyBranch = "modify-branch";
        const string deleteBranch = "delete-branch";
        
        CreateWorkflowModifyDeleteScenario(userId, modifyBranch, deleteBranch);
        
        var resolutions = new List<ConflictResolution>
        {
            new ConflictResolution
            {
                WorkflowKey = "WF-001",
                ObjectType = ConflictObjectType.Workflow,
                Resolution = "delete",
                IsDeletionConflict = true
            }
        };
        
        // Act
        _gitService.ResolveAndMerge(userId, modifyBranch, deleteBranch, resolutions);
        
        // Assert
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.Should().BeEmpty();
    }

    [Fact]
    public void ResolveAndMerge_PhaseModifyDelete_KeepResolution_ShouldKeepPhase()
    {
        // Arrange
        const string userId = "testUser";
        const string modifyBranch = "modify-branch";
        const string deleteBranch = "delete-branch";
        
        CreatePhaseModifyDeleteScenario(userId, modifyBranch, deleteBranch);
        
        var resolutions = new List<ConflictResolution>
        {
            new ConflictResolution
            {
                WorkflowKey = "WF-001",
                PhaseName = "Modified Phase Name",
                ObjectType = ConflictObjectType.Phase,
                Resolution = "keep",
                IsDeletionConflict = true
            }
        };
        
        // Act
        _gitService.ResolveAndMerge(userId, modifyBranch, deleteBranch, resolutions);
        
        // Assert
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.First().Phases.Should().HaveCount(1);
        workflows.Workflows.First().Phases.First().PhaseName.Should().Be("Modified Phase Name");
    }

    [Fact]
    public void ResolveAndMerge_PhaseModifyDelete_DeleteResolution_ShouldDeletePhase()
    {
        // Arrange
        const string userId = "testUser";
        const string modifyBranch = "modify-branch";
        const string deleteBranch = "delete-branch";
        
        CreatePhaseModifyDeleteScenario(userId, modifyBranch, deleteBranch);
        
        var resolutions = new List<ConflictResolution>
        {
            new ConflictResolution
            {
                WorkflowKey = "WF-001",
                PhaseName = "Modified Phase Name",
                ObjectType = ConflictObjectType.Phase,
                Resolution = "delete",
                IsDeletionConflict = true
            }
        };
        
        // Act
        _gitService.ResolveAndMerge(userId, modifyBranch, deleteBranch, resolutions);
        
        // Assert
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.First().Phases.Should().BeEmpty();
    }

    [Fact]
    public void ResolveAndMerge_TaskModifyDelete_KeepResolution_ShouldKeepTask()
    {
        // Arrange
        const string userId = "testUser";
        const string modifyBranch = "modify-branch";
        const string deleteBranch = "delete-branch";
        
        CreateTaskModifyDeleteScenario(userId, modifyBranch, deleteBranch);
        
        var resolutions = new List<ConflictResolution>
        {
            new ConflictResolution
            {
                WorkflowKey = "WF-001",
                PhaseName = "Phase 1",
                TaskId = "TASK-001",
                ObjectType = ConflictObjectType.Task,
                Resolution = "keep",
                IsDeletionConflict = true
            }
        };
        
        // Act
        _gitService.ResolveAndMerge(userId, modifyBranch, deleteBranch, resolutions);
        
        // Assert
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.First().Phases.First().Tasks.Should().HaveCount(1);
        workflows.Workflows.First().Phases.First().Tasks.First().TaskName.Should().Be("Modified Task Name");
    }

    [Fact]
    public void ResolveAndMerge_TaskModifyDelete_DeleteResolution_ShouldDeleteTask()
    {
        // Arrange
        const string userId = "testUser";
        const string modifyBranch = "modify-branch";
        const string deleteBranch = "delete-branch";
        
        CreateTaskModifyDeleteScenario(userId, modifyBranch, deleteBranch);
        
        var resolutions = new List<ConflictResolution>
        {
            new ConflictResolution
            {
                WorkflowKey = "WF-001",
                PhaseName = "Phase 1",
                TaskId = "TASK-001",
                ObjectType = ConflictObjectType.Task,
                Resolution = "delete",
                IsDeletionConflict = true
            }
        };
        
        // Act
        _gitService.ResolveAndMerge(userId, modifyBranch, deleteBranch, resolutions);
        
        // Assert
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.First().Phases.First().Tasks.Should().BeEmpty();
    }

    [Fact]
    public void ResolveAndMerge_NoChangesAfterResolution_ShouldNotThrowException()
    {
        // Arrange - This tests the fix for the EmptyCommitException
        const string userId = "testUser";
        const string modifyBranch = "modify-branch";
        const string deleteBranch = "delete-branch";
        
        CreateWorkflowModifyDeleteScenario(userId, modifyBranch, deleteBranch);
        
        // Resolution chooses to keep, which means target branch state remains unchanged
        var resolutions = new List<ConflictResolution>
        {
            new ConflictResolution
            {
                WorkflowKey = "WF-001",
                ObjectType = ConflictObjectType.Workflow,
                Resolution = "keep",
                IsDeletionConflict = true
            }
        };
        
        // Act - should not throw EmptyCommitException
        Action act = () => _gitService.ResolveAndMerge(userId, modifyBranch, deleteBranch, resolutions);
        
        // Assert
        act.Should().NotThrow();
        
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.Should().HaveCount(1);
    }

    // Helper methods
    private void CreateWorkflowModifyDeleteScenario(string userId, string modifyBranch, string deleteBranch)
    {
        // Create modify branch - change workflow name
        _gitService.CreateBranch(userId, modifyBranch);
        _gitService.SwitchBranch(userId, modifyBranch);
        
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.First().WorkflowName = "Modified Workflow Name";
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "Modified workflow name", "Test User", "test@example.com");
        _gitService.Push(userId);
        
        // Create delete branch - delete the workflow
        _gitService.SwitchBranch(userId, "master");
        _gitService.CreateBranch(userId, deleteBranch);
        _gitService.SwitchBranch(userId, deleteBranch);
        
        workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.RemoveAll(w => w.WorkflowKey == "WF-001");
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "Deleted workflow", "Test User", "test@example.com");
        _gitService.Push(userId);
    }

    private void CreatePhaseModifyDeleteScenario(string userId, string modifyBranch, string deleteBranch)
    {
        // Create modify branch - change phase name
        _gitService.CreateBranch(userId, modifyBranch);
        _gitService.SwitchBranch(userId, modifyBranch);
        
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.First().Phases.First().PhaseName = "Modified Phase Name";
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "Modified phase name", "Test User", "test@example.com");
        _gitService.Push(userId);
        
        // Create delete branch - delete the phase
        _gitService.SwitchBranch(userId, "master");
        _gitService.CreateBranch(userId, deleteBranch);
        _gitService.SwitchBranch(userId, deleteBranch);
        
        workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.First().Phases.Clear();
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "Deleted phase", "Test User", "test@example.com");
        _gitService.Push(userId);
    }

    private void CreateTaskModifyDeleteScenario(string userId, string modifyBranch, string deleteBranch)
    {
        // Create modify branch - change task name
        _gitService.CreateBranch(userId, modifyBranch);
        _gitService.SwitchBranch(userId, modifyBranch);
        
        var workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.First().Phases.First().Tasks.First().TaskName = "Modified Task Name";
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "Modified task name", "Test User", "test@example.com");
        _gitService.Push(userId);
        
        // Create delete branch - delete the task
        _gitService.SwitchBranch(userId, "master");
        _gitService.CreateBranch(userId, deleteBranch);
        _gitService.SwitchBranch(userId, deleteBranch);
        
        workflows = _gitService.ReadWorkflows(userId);
        workflows.Workflows.First().Phases.First().Tasks.Clear();
        _gitService.WriteWorkflows(userId, workflows);
        _gitService.CommitChanges(userId, "Deleted task", "Test User", "test@example.com");
        _gitService.Push(userId);
    }
}
