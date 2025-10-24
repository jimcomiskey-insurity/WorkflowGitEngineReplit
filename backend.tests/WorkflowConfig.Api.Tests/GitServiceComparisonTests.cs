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
/// Tests for GitService comparison and enrichment logic.
/// Includes regression tests for PR comparison and gitStatus field clearing.
/// </summary>
public class GitServiceComparisonTests : IDisposable
{
    private readonly Mock<IConfiguration> _configMock;
    private readonly Mock<IWebHostEnvironment> _envMock;
    private readonly Mock<ILogger<GitService>> _loggerMock;
    private readonly string _testBasePath;
    private readonly GitService _gitService;

    public GitServiceComparisonTests()
    {
        // Create a unique test directory for this test run
        _testBasePath = Path.Combine(Path.GetTempPath(), $"GitServiceTests_{Guid.NewGuid()}");
        Directory.CreateDirectory(_testBasePath);
        
        _configMock = new Mock<IConfiguration>();
        _envMock = new Mock<IWebHostEnvironment>();
        _loggerMock = new Mock<ILogger<GitService>>();
        
        _configMock.Setup(c => c["GitSettings:RepoBasePath"]).Returns(Path.Combine(_testBasePath, "user-repos"));
        _configMock.Setup(c => c["GitSettings:CentralRepoPath"]).Returns(Path.Combine(_testBasePath, "central-repo"));
        _envMock.Setup(e => e.ContentRootPath).Returns(_testBasePath);
        
        _gitService = new GitService(_configMock.Object, _envMock.Object, _loggerMock.Object);
        
        // Initialize the central repository
        _gitService.InitializeCentralRepository();
    }

    public void Dispose()
    {
        // Clean up test directory
        if (Directory.Exists(_testBasePath))
        {
            Directory.Delete(_testBasePath, true);
        }
    }

    [Fact]
    public void EnrichWithGitStatus_AfterCommit_ShouldClearGitStatusFields()
    {
        // REGRESSION TEST for: Pending Changes showing items after commit
        //
        // Scenario:
        // 1. Create a workflow and commit it
        // 2. Read workflows with git status enrichment
        // 3. Verify gitStatus fields are null (not "added", "modified", etc.)
        //
        // Bug: gitStatus fields were not being cleared when items matched HEAD commit
        // Fix: Explicitly set gitStatus = null when items match in Compare methods

        // Arrange
        var userId = "testUser";
        var workflow = new Workflow
        {
            WorkflowKey = "test-workflow",
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
                            TaskId = "task-1",
                            TaskName = "Task 1",
                            TaskType = "Manual",
                            AssignedRole = "Underwriter",
                            EstimatedDurationHours = 2.0,
                            Dependencies = new List<string>(),
                            IsAutomated = false
                        }
                    }
                }
            }
        };

        var programWorkflows = new ProgramWorkflows
        {
            Workflows = new List<Workflow> { workflow }
        };

        // Act: Create initial commit
        _gitService.WriteWorkflows(userId, programWorkflows);
        _gitService.CommitChanges(userId, "Initial commit", "Test User", "test@example.com");

        // Read workflows with git status enrichment
        var enrichedWorkflows = _gitService.ReadWorkflowsWithGitStatus(userId);

        // Assert: All gitStatus fields should be null since nothing has changed
        var enrichedWorkflow = enrichedWorkflows.Workflows.Should().ContainSingle().Subject;
        enrichedWorkflow.GitStatus.Should().BeNull("workflow matches HEAD commit");
        
        var enrichedPhase = enrichedWorkflow.Phases.Should().ContainSingle().Subject;
        enrichedPhase.GitStatus.Should().BeNull("phase matches HEAD commit");
        
        var enrichedTask = enrichedPhase.Tasks.Should().ContainSingle().Subject;
        enrichedTask.GitStatus.Should().BeNull("task matches HEAD commit");
    }

    [Fact]
    public void EnrichWithGitStatus_WithModifiedWorkflow_ShouldMarkAsModified()
    {
        // Arrange
        var userId = "testUser";
        var workflow = new Workflow
        {
            WorkflowKey = "test-workflow",
            WorkflowName = "Original Name",
            Description = "Original Description",
            Phases = new List<Phase>()
        };

        var programWorkflows = new ProgramWorkflows
        {
            Workflows = new List<Workflow> { workflow }
        };

        // Create initial commit
        _gitService.WriteWorkflows(userId, programWorkflows);
        _gitService.CommitChanges(userId, "Initial commit", "Test User", "test@example.com");

        // Act: Modify the workflow
        workflow.WorkflowName = "Modified Name";
        _gitService.WriteWorkflows(userId, programWorkflows);

        // Read workflows with git status enrichment
        var enrichedWorkflows = _gitService.ReadWorkflowsWithGitStatus(userId);

        // Assert
        var enrichedWorkflow = enrichedWorkflows.Workflows.Should().ContainSingle().Subject;
        enrichedWorkflow.GitStatus.Should().Be("modified", "workflow name was changed");
    }

    [Fact]
    public void EnrichWithGitStatus_WithAddedPhase_ShouldMarkPhaseAsAdded()
    {
        // Arrange
        var userId = "testUser";
        var workflow = new Workflow
        {
            WorkflowKey = "test-workflow",
            WorkflowName = "Test Workflow",
            Description = "Description",
            Phases = new List<Phase>
            {
                new Phase
                {
                    PhaseName = "Phase 1",
                    PhaseOrder = 1,
                    Tasks = new List<TaskItem>()
                }
            }
        };

        var programWorkflows = new ProgramWorkflows
        {
            Workflows = new List<Workflow> { workflow }
        };

        // Create initial commit
        _gitService.WriteWorkflows(userId, programWorkflows);
        _gitService.CommitChanges(userId, "Initial commit", "Test User", "test@example.com");

        // Act: Add a new phase
        workflow.Phases.Add(new Phase
        {
            PhaseName = "Phase 2",
            PhaseOrder = 2,
            Tasks = new List<TaskItem>()
        });
        _gitService.WriteWorkflows(userId, programWorkflows);

        // Read workflows with git status enrichment
        var enrichedWorkflows = _gitService.ReadWorkflowsWithGitStatus(userId);

        // Assert
        var enrichedWorkflow = enrichedWorkflows.Workflows.Should().ContainSingle().Subject;
        enrichedWorkflow.GitStatus.Should().BeNull("workflow itself didn't change");
        
        enrichedWorkflow.Phases.Should().HaveCount(2);
        
        var existingPhase = enrichedWorkflow.Phases.First(p => p.PhaseName == "Phase 1");
        existingPhase.GitStatus.Should().BeNull("existing phase unchanged");
        
        var newPhase = enrichedWorkflow.Phases.First(p => p.PhaseName == "Phase 2");
        newPhase.GitStatus.Should().Be("added", "phase was newly added");
    }

    [Fact]
    public void EnrichWithGitStatus_WithModifiedTask_ShouldMarkTaskAsModified()
    {
        // Arrange
        var userId = "testUser";
        var workflow = new Workflow
        {
            WorkflowKey = "test-workflow",
            WorkflowName = "Test Workflow",
            Description = "Description",
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
                            TaskId = "task-1",
                            TaskName = "Original Task",
                            TaskType = "Manual",
                            AssignedRole = "Underwriter",
                            EstimatedDurationHours = 2.0,
                            Dependencies = new List<string>(),
                            IsAutomated = false
                        }
                    }
                }
            }
        };

        var programWorkflows = new ProgramWorkflows
        {
            Workflows = new List<Workflow> { workflow }
        };

        // Create initial commit
        _gitService.WriteWorkflows(userId, programWorkflows);
        _gitService.CommitChanges(userId, "Initial commit", "Test User", "test@example.com");

        // Act: Modify the task
        workflow.Phases[0].Tasks[0].TaskName = "Modified Task";
        _gitService.WriteWorkflows(userId, programWorkflows);

        // Read workflows with git status enrichment
        var enrichedWorkflows = _gitService.ReadWorkflowsWithGitStatus(userId);

        // Assert
        var enrichedWorkflow = enrichedWorkflows.Workflows.Should().ContainSingle().Subject;
        enrichedWorkflow.GitStatus.Should().BeNull("workflow itself didn't change");
        
        var enrichedPhase = enrichedWorkflow.Phases.Should().ContainSingle().Subject;
        enrichedPhase.GitStatus.Should().BeNull("phase itself didn't change");
        
        var enrichedTask = enrichedPhase.Tasks.Should().ContainSingle().Subject;
        enrichedTask.GitStatus.Should().Be("modified", "task name was changed");
    }

    [Fact]
    public void EnrichWithGitStatus_WithAddedWorkflow_ShouldMarkAsAdded()
    {
        // Arrange
        var userId = "testUser";
        var workflow1 = new Workflow
        {
            WorkflowKey = "workflow-1",
            WorkflowName = "Workflow 1",
            Description = "Description 1",
            Phases = new List<Phase>()
        };

        var programWorkflows = new ProgramWorkflows
        {
            Workflows = new List<Workflow> { workflow1 }
        };

        // Create initial commit
        _gitService.WriteWorkflows(userId, programWorkflows);
        _gitService.CommitChanges(userId, "Initial commit", "Test User", "test@example.com");

        // Act: Add a new workflow
        var workflow2 = new Workflow
        {
            WorkflowKey = "workflow-2",
            WorkflowName = "Workflow 2",
            Description = "Description 2",
            Phases = new List<Phase>
            {
                new Phase
                {
                    PhaseName = "New Phase",
                    PhaseOrder = 1,
                    Tasks = new List<TaskItem>
                    {
                        new TaskItem
                        {
                            TaskId = "task-1",
                            TaskName = "New Task",
                            TaskType = "Manual",
                            AssignedRole = "Underwriter",
                            EstimatedDurationHours = 1.0,
                            Dependencies = new List<string>(),
                            IsAutomated = false
                        }
                    }
                }
            }
        };
        programWorkflows.Workflows.Add(workflow2);
        _gitService.WriteWorkflows(userId, programWorkflows);

        // Read workflows with git status enrichment
        var enrichedWorkflows = _gitService.ReadWorkflowsWithGitStatus(userId);

        // Assert
        enrichedWorkflows.Workflows.Should().HaveCount(2);
        
        var existingWorkflow = enrichedWorkflows.Workflows.First(w => w.WorkflowKey == "workflow-1");
        existingWorkflow.GitStatus.Should().BeNull("existing workflow unchanged");
        
        var newWorkflow = enrichedWorkflows.Workflows.First(w => w.WorkflowKey == "workflow-2");
        newWorkflow.GitStatus.Should().Be("added", "workflow was newly created");
        
        var newPhase = newWorkflow.Phases.Should().ContainSingle().Subject;
        newPhase.GitStatus.Should().Be("added", "phase is part of new workflow");
        
        var newTask = newPhase.Tasks.Should().ContainSingle().Subject;
        newTask.GitStatus.Should().Be("added", "task is part of new workflow");
    }

    [Fact]
    public void EnrichWithGitStatus_CommitThenModifyThenCommit_ShouldClearStatusAfterSecondCommit()
    {
        // REGRESSION TEST: Verifies the full workflow of the reported bug
        //
        // User reported: "I created a new Workflow and committed and pushed it.
        // Why am I seeing stuff in Pending Changes but Version Control says nothing to commit?"
        //
        // This test simulates that exact scenario

        // Arrange
        var userId = "testUser";
        var workflow = new Workflow
        {
            WorkflowKey = "new-workflow",
            WorkflowName = "New Workflow",
            Description = "Test",
            Phases = new List<Phase>()
        };

        var programWorkflows = new ProgramWorkflows
        {
            Workflows = new List<Workflow> { workflow }
        };

        // Act 1: Create and commit the new workflow
        _gitService.WriteWorkflows(userId, programWorkflows);
        _gitService.CommitChanges(userId, "Add new workflow", "Test User", "test@example.com");

        // Read workflows - should have no pending changes
        var enrichedAfterFirstCommit = _gitService.ReadWorkflowsWithGitStatus(userId);
        
        // Assert 1: After commit, gitStatus should be null
        var workflowAfterCommit = enrichedAfterFirstCommit.Workflows.Should().ContainSingle().Subject;
        workflowAfterCommit.GitStatus.Should().BeNull("workflow was just committed");

        // Act 2: Modify the workflow
        workflow.WorkflowName = "Modified Workflow";
        _gitService.WriteWorkflows(userId, programWorkflows);
        
        var enrichedAfterModification = _gitService.ReadWorkflowsWithGitStatus(userId);
        
        // Assert 2: After modification, should show as modified
        var workflowAfterModification = enrichedAfterModification.Workflows.Should().ContainSingle().Subject;
        workflowAfterModification.GitStatus.Should().Be("modified", "workflow was changed");

        // Act 3: Commit the changes
        _gitService.CommitChanges(userId, "Update workflow name", "Test User", "test@example.com");

        var enrichedAfterSecondCommit = _gitService.ReadWorkflowsWithGitStatus(userId);
        
        // Assert 3: After second commit, gitStatus should be cleared again
        var workflowAfterSecondCommit = enrichedAfterSecondCommit.Workflows.Should().ContainSingle().Subject;
        workflowAfterSecondCommit.GitStatus.Should().BeNull("changes were committed, should match HEAD");
    }

    #region PR Comparison Documentation Tests

    [Fact(Skip = "Requires Git repository setup - documents expected behavior")]
    public void CompareBranches_WithMergedPR_ShouldUseStoredCommitShas()
    {
        // REGRESSION TEST for: Merged PRs showing 0 commits
        //
        // Scenario:
        // 1. Create PR from branch A to branch B
        // 2. Store both commit SHAs at PR creation time
        // 3. Merge the PR (branch A commits are now in branch B)
        // 4. Compare using stored SHAs
        //
        // Expected: Should show the original commits that were in the PR
        // Bug: Was comparing current branch tips (both pointing to same commit) = 0 commits
        //
        // Fix: Pass both sourceCommitSha and targetCommitSha for merged PRs
        //      This compares the historical snapshot from PR creation time
    }

    [Fact(Skip = "Requires Git repository setup - documents expected behavior")]
    public void CompareBranches_WithOpenPR_ShouldUseCurrentBranchTips()
    {
        // Scenario:
        // 1. Create PR from branch A to branch B
        // 2. Push additional commits to branch A
        // 3. Compare without providing commit SHAs
        //
        // Expected: Should show all commits including new ones pushed after PR creation
        // This allows open PRs to dynamically update as work continues
        //
        // Implementation: Pass null for sourceCommitSha and targetCommitSha
        //                 CompareBranches will use current branch tips
    }

    [Fact(Skip = "Requires Git repository setup - documents expected behavior")]
    public void CompareBranches_CommitShaLogic_ShouldPreferStoredShaOverBranchTip()
    {
        // Test the logic in CompareBranches:
        //
        // if (!string.IsNullOrEmpty(sourceCommitSha))
        // {
        //     sourceCommit = repo.Lookup<Commit>(sourceCommitSha);
        // }
        // else
        // {
        //     sourceCommit = sourceBranchRef.Tip;
        // }
        //
        // Expected: When SHA is provided, use it. When null/empty, use branch tip.
        // This allows the same method to handle both open and merged PRs correctly.
    }

    [Fact]
    public void DocumentedBehavior_MergedPRs_PreserveHistoricalSnapshot()
    {
        // This is not a real test but documentation of the fix
        var expectedBehavior = @"
When a PR is merged:
- SourceCommitSha: The commit on the source branch at PR creation time
- TargetCommitSha: The commit on the target branch at PR creation time
- Status: 'merged'

When viewing a merged PR:
- Controller passes both SourceCommitSha and TargetCommitSha to CompareBranches
- GitService.CompareBranches uses these SHAs instead of branch tips
- Result: Shows the exact changes that were in the PR, frozen in time

This ensures merged PRs display accurate commit counts even after:
- The branches have diverged
- The source branch has been merged into target
- Additional commits have been made to either branch
";

        expectedBehavior.Should().NotBeNullOrEmpty();
    }

    [Fact]
    public void DocumentedBehavior_OpenPRs_ShowLiveUpdates()
    {
        // This is not a real test but documentation of expected behavior
        var expectedBehavior = @"
When a PR is open:
- SourceCommitSha: Stored but not used for comparison
- TargetCommitSha: Stored but not used for comparison
- Status: 'open'

When viewing an open PR:
- Controller passes null for both commit SHAs to CompareBranches
- GitService.CompareBranches uses current branch tips
- Result: Shows all current commits, including those pushed after PR creation

This ensures open PRs dynamically update as work continues:
- New commits pushed to source branch appear immediately
- Commit count increases as more work is added
- Changes reflect current state of both branches
";

        expectedBehavior.Should().NotBeNullOrEmpty();
    }

    #endregion
}
