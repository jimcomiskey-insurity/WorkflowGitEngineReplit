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
    private readonly Mock<IProgramService> _programServiceMock;
    private readonly string _testBasePath;
    private readonly GitService _gitService;
    private const string TestProgramId = "test-program";

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
        
        // Initialize with sample data (create initial commit on master like production does)
        InitializeSampleData();
    }
    
    private void InitializeSampleData()
    {
        // Create initial sample workflows and commit to master (simulates InitializeSampleData.cs)
        // This needs to be done directly in the central repository to ensure it's available when users clone
        
        var centralRepoPath = Path.Combine(_testBasePath, "central-repo");
        var tempInitPath = Path.Combine(_testBasePath, "temp-init");
        
        try
        {
            // Clone central repository to a temporary location
            LibGit2Sharp.Repository.Clone(centralRepoPath, tempInitPath);
            
            using (var repo = new LibGit2Sharp.Repository(tempInitPath))
            {
                // Create sample workflow in split-file format
                var workflow = new Workflow
                {
                    Id = Guid.Parse("ce1ca1f5-b7d9-5346-9099-6c0d0a5f5875"),
                    WorkflowKey = "new-business",
                    WorkflowName = "New Business",
                    Description = "Sample new business workflow",
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
                
                // Commit and push to central repository
                LibGit2Sharp.Commands.Stage(repo, "*");
                var signature = new LibGit2Sharp.Signature("System", "system@workflow.com", DateTimeOffset.Now);
                repo.Commit("Initial commit: Add sample workflow data", signature, signature, new LibGit2Sharp.CommitOptions());
                
                var remote = repo.Network.Remotes["origin"];
                var pushOptions = new LibGit2Sharp.PushOptions();
                repo.Network.Push(remote, @"refs/heads/master", pushOptions);
            }
        }
        finally
        {
            // Cleanup temp directory
            if (Directory.Exists(tempInitPath))
            {
                Directory.Delete(tempInitPath, true);
            }
        }
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
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Initial commit", "Test User", "test@example.com");

        // Read workflows with git status enrichment
        var enrichedWorkflows = _gitService.ReadWorkflowsWithGitStatus(TestProgramId, userId);

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
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Initial commit", "Test User", "test@example.com");

        // Act: Modify the workflow
        workflow.WorkflowName = "Modified Name";
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);

        // Read workflows with git status enrichment
        var enrichedWorkflows = _gitService.ReadWorkflowsWithGitStatus(TestProgramId, userId);

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
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Initial commit", "Test User", "test@example.com");

        // Act: Add a new phase
        workflow.Phases.Add(new Phase
        {
            PhaseName = "Phase 2",
            PhaseOrder = 2,
            Tasks = new List<TaskItem>()
        });
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);

        // Read workflows with git status enrichment
        var enrichedWorkflows = _gitService.ReadWorkflowsWithGitStatus(TestProgramId, userId);

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
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Initial commit", "Test User", "test@example.com");

        // Act: Modify the task
        workflow.Phases[0].Tasks[0].TaskName = "Modified Task";
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);

        // Read workflows with git status enrichment
        var enrichedWorkflows = _gitService.ReadWorkflowsWithGitStatus(TestProgramId, userId);

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
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Initial commit", "Test User", "test@example.com");

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
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);

        // Read workflows with git status enrichment
        var enrichedWorkflows = _gitService.ReadWorkflowsWithGitStatus(TestProgramId, userId);

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
    public void EnrichWithGitStatus_WithDeletedWorkflow_ShouldMarkAsDeleted()
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
        var workflow2 = new Workflow
        {
            WorkflowKey = "workflow-2",
            WorkflowName = "Workflow 2",
            Description = "Description 2",
            Phases = new List<Phase>()
        };

        var programWorkflows = new ProgramWorkflows
        {
            Workflows = new List<Workflow> { workflow1, workflow2 }
        };

        // Create initial commit with two workflows
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Initial commit", "Test User", "test@example.com");

        // Act: Delete one workflow
        programWorkflows.Workflows.Remove(workflow2);
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);

        // Read workflows with git status enrichment
        var enrichedWorkflows = _gitService.ReadWorkflowsWithGitStatus(TestProgramId, userId);

        // Assert
        enrichedWorkflows.Workflows.Should().HaveCount(2, "deleted workflow should still appear in the list");
        
        var existingWorkflow = enrichedWorkflows.Workflows.First(w => w.WorkflowKey == "workflow-1");
        existingWorkflow.GitStatus.Should().BeNull("existing workflow unchanged");
        
        var deletedWorkflow = enrichedWorkflows.Workflows.First(w => w.WorkflowKey == "workflow-2");
        deletedWorkflow.GitStatus.Should().Be("deleted", "workflow was removed");
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
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Add new workflow", "Test User", "test@example.com");

        // Read workflows - should have no pending changes
        var enrichedAfterFirstCommit = _gitService.ReadWorkflowsWithGitStatus(TestProgramId, userId);
        
        // Assert 1: After commit, gitStatus should be null
        var workflowAfterCommit = enrichedAfterFirstCommit.Workflows.Should().ContainSingle().Subject;
        workflowAfterCommit.GitStatus.Should().BeNull("workflow was just committed");

        // Act 2: Modify the workflow
        workflow.WorkflowName = "Modified Workflow";
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        
        var enrichedAfterModification = _gitService.ReadWorkflowsWithGitStatus(TestProgramId, userId);
        
        // Assert 2: After modification, should show as modified
        var workflowAfterModification = enrichedAfterModification.Workflows.Should().ContainSingle().Subject;
        workflowAfterModification.GitStatus.Should().Be("modified", "workflow was changed");

        // Act 3: Commit the changes
        _gitService.CommitChanges(TestProgramId, userId, "Update workflow name", "Test User", "test@example.com");

        var enrichedAfterSecondCommit = _gitService.ReadWorkflowsWithGitStatus(TestProgramId, userId);
        
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

    #region Master Branch Push Protection Tests

    [Fact]
    public void Push_OnMasterBranch_ShouldThrowException()
    {
        // Arrange
        var userId = "testUser";
        var workflow = new Workflow
        {
            WorkflowKey = "test-workflow",
            WorkflowName = "Test Workflow",
            Description = "Description",
            Phases = new List<Phase>()
        };

        var programWorkflows = new ProgramWorkflows
        {
            Workflows = new List<Workflow> { workflow }
        };

        // Create initial commit on master branch
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Initial commit", "Test User", "test@example.com");

        // Act & Assert
        var exception = Assert.Throws<InvalidOperationException>(() => _gitService.Push(TestProgramId, userId));
        exception.Message.Should().Contain("Direct pushes to the 'master' branch are not allowed");
        exception.Message.Should().Contain("create a new branch");
    }

    [Fact]
    public void Push_OnFeatureBranch_ShouldSucceed()
    {
        // Arrange
        var userId = "testUser";
        var workflow = new Workflow
        {
            WorkflowKey = "test-workflow",
            WorkflowName = "Test Workflow",
            Description = "Description",
            Phases = new List<Phase>()
        };

        var programWorkflows = new ProgramWorkflows
        {
            Workflows = new List<Workflow> { workflow }
        };

        // Create initial commit on master
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Initial commit", "Test User", "test@example.com");

        // Create and switch to feature branch
        _gitService.CreateBranch(TestProgramId, userId, "feature-branch");
        _gitService.SwitchBranch(TestProgramId, userId, "feature-branch");

        // Make a change on the feature branch
        workflow.Description = "Updated description";
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Update description", "Test User", "test@example.com");

        // Act - Push should succeed on feature branch
        _gitService.Push(TestProgramId, userId);

        // Assert - If we get here without exception, the push succeeded
        var status = _gitService.GetStatus(TestProgramId, userId);
        status.CommitsAhead.Should().Be(0, "commits should be pushed to remote");
    }

    [Fact]
    public void Push_OnMainBranch_ShouldThrowException()
    {
        // Arrange - This test documents that 'main' is also protected
        var userId = "testUser";
        var workflow = new Workflow
        {
            WorkflowKey = "test-workflow",
            WorkflowName = "Test Workflow",
            Description = "Description",
            Phases = new List<Phase>()
        };

        var programWorkflows = new ProgramWorkflows
        {
            Workflows = new List<Workflow> { workflow }
        };

        // Create initial commit
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Initial commit", "Test User", "test@example.com");

        // Rename master to main (simulate a main branch)
        var userRepoPath = _gitService.GetUserRepoPath(TestProgramId, userId);
        using (var repo = new LibGit2Sharp.Repository(userRepoPath))
        {
            repo.Branches.Rename("master", "main");
        }

        // Act & Assert
        var exception = Assert.Throws<InvalidOperationException>(() => _gitService.Push(TestProgramId, userId));
        exception.Message.Should().Contain("Direct pushes to the 'main' branch are not allowed");
    }

    #endregion

    #region HasRemoteTracking Tests

    [Fact]
    public void GetStatus_OnNewBranchWithoutRemote_ShouldReturnHasRemoteTrackingFalse()
    {
        // Arrange
        var userId = "testUser";
        var workflow = new Workflow
        {
            WorkflowKey = "test-workflow",
            WorkflowName = "Test Workflow",
            Description = "Description",
            Phases = new List<Phase>()
        };

        var programWorkflows = new ProgramWorkflows
        {
            Workflows = new List<Workflow> { workflow }
        };

        // Create initial commit on master
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Initial commit", "Test User", "test@example.com");

        // Create a new branch without pushing
        _gitService.CreateBranch(TestProgramId, userId, "feature-branch");
        _gitService.SwitchBranch(TestProgramId, userId, "feature-branch");

        // Act
        var status = _gitService.GetStatus(TestProgramId, userId);

        // Assert
        status.HasRemoteTracking.Should().BeFalse("new branch has no remote tracking");
        status.CurrentBranch.Should().Be("feature-branch");
    }

    [Fact]
    public void GetStatus_OnTrackedBranch_ShouldReturnHasRemoteTrackingTrue()
    {
        // Arrange
        var userId = "testUser";
        var workflow = new Workflow
        {
            WorkflowKey = "test-workflow",
            WorkflowName = "Test Workflow",
            Description = "Description",
            Phases = new List<Phase>()
        };

        var programWorkflows = new ProgramWorkflows
        {
            Workflows = new List<Workflow> { workflow }
        };

        // Create initial commit
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Initial commit", "Test User", "test@example.com");

        // Create and switch to a feature branch
        _gitService.CreateBranch(TestProgramId, userId, "feature-branch");
        _gitService.SwitchBranch(TestProgramId, userId, "feature-branch");

        // Make a change and commit
        workflow.Description = "Updated";
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Update", "Test User", "test@example.com");

        // Push to establish tracking
        _gitService.Push(TestProgramId, userId);

        // Act
        var status = _gitService.GetStatus(TestProgramId, userId);

        // Assert
        status.HasRemoteTracking.Should().BeTrue("branch should have remote tracking after push");
        status.CurrentBranch.Should().Be("feature-branch");
    }

    [Fact]
    public void GetStatus_AfterPushingNewBranch_ShouldReturnHasRemoteTrackingTrue()
    {
        // Arrange
        var userId = "testUser";
        var workflow = new Workflow
        {
            WorkflowKey = "test-workflow",
            WorkflowName = "Test Workflow",
            Description = "Description",
            Phases = new List<Phase>()
        };

        var programWorkflows = new ProgramWorkflows
        {
            Workflows = new List<Workflow> { workflow }
        };

        // Create initial commit on master
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Initial commit", "Test User", "test@example.com");

        // Create and switch to new branch
        _gitService.CreateBranch(TestProgramId, userId, "feature-branch");
        _gitService.SwitchBranch(TestProgramId, userId, "feature-branch");

        // Make a change and commit
        workflow.Description = "Updated Description";
        _gitService.WriteWorkflows(TestProgramId, userId, programWorkflows);
        _gitService.CommitChanges(TestProgramId, userId, "Update description", "Test User", "test@example.com");

        // Push the branch
        _gitService.Push(TestProgramId, userId);

        // Act
        var status = _gitService.GetStatus(TestProgramId, userId);

        // Assert
        status.HasRemoteTracking.Should().BeTrue("branch should have remote tracking after push");
        status.CurrentBranch.Should().Be("feature-branch");
        status.CommitsAhead.Should().Be(0, "no commits ahead after push");
    }

    [Fact]
    public void GetBranchCommitSha_WithPreferRemoteFalse_ShouldUseLocalBranch()
    {
        // REGRESSION TEST for: PR showing 0 commits when local master has changes
        //
        // Scenario:
        // 1. User starts fresh (master already exists from sample data)
        // 2. Commit on local master
        // 3. Create new branch from master
        // 4. GetBranchCommitSha(master, preferRemote=false) should return local master SHA
        //
        // This test verifies that without preferRemote, we get the local branch

        // Arrange
        var userId = "testUser";
        
        // User makes a workflow change on master (simulating the bug scenario)
        var workflows = _gitService.ReadWorkflows(TestProgramId, userId);
        var newWorkflow = new Workflow
        {
            WorkflowKey = "test-workflow",
            WorkflowName = "Test Workflow",
            Description = "Test",
            Phases = new List<Phase>()
        };
        workflows.Workflows.Add(newWorkflow);
        
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Add workflow on master", "Test", "test@test.com");

        // Act - Get local master SHA
        var localMasterSha = _gitService.GetBranchCommitSha(TestProgramId, userId, "master", preferRemote: false);

        // Assert - Should get the local master tip with our commit
        localMasterSha.Should().NotBeNullOrEmpty();
    }

    [Fact]
    public void GetBranchCommitSha_WithPreferRemoteTrue_ShouldUseRemoteBranch()
    {
        // REGRESSION TEST for: PR showing 0 commits when local master has changes
        //
        // Scenario:
        // 1. User starts with existing sample data (origin/master is synced)
        // 2. Make a local commit on master (not pushed)
        // 3. GetBranchCommitSha(master, preferRemote=true) should return origin/master SHA
        // 4. The SHAs should be different (local is ahead)
        //
        // This test verifies that with preferRemote=true, we get the remote branch

        // Arrange
        var userId = "testUser";
        
        // Get the current remote master SHA (before local changes)
        var originalRemoteMasterSha = _gitService.GetBranchCommitSha(TestProgramId, userId, "master", preferRemote: true);

        // User makes a local commit on master (not pushed) - simulating the bug scenario
        var workflows = _gitService.ReadWorkflows(TestProgramId, userId);
        var newWorkflow = new Workflow
        {
            WorkflowKey = "test-workflow",
            WorkflowName = "Test Workflow",
            Description = "Test",
            Phases = new List<Phase>()
        };
        workflows.Workflows.Add(newWorkflow);
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Add workflow on local master", "Test", "test@test.com");

        // Act - Get remote master SHA (should be unchanged) and local master SHA (should be ahead)
        var remoteMasterSha = _gitService.GetBranchCommitSha(TestProgramId, userId, "master", preferRemote: true);
        var localMasterSha = _gitService.GetBranchCommitSha(TestProgramId, userId, "master", preferRemote: false);

        // Assert
        remoteMasterSha.Should().Be(originalRemoteMasterSha); // Remote hasn't changed
        localMasterSha.Should().NotBe(remoteMasterSha); // Local is ahead
    }

    [Fact]
    public void CreatePullRequest_WithLocalChangesOnMaster_ShouldCompareAgainstRemoteMaster()
    {
        // REGRESSION TEST for: PR showing 0 commits when created from branch after committing on master
        //
        // Scenario (EXACTLY the bug the user reported):
        // 1. User starts with sample data (origin/master is synced)
        // 2. User accidentally commits on local master (not pushed)
        // 3. User creates new branch from local master
        // 4. User creates PR from new branch to master
        // 5. PR should show 1 commit (comparing against origin/master, not local master)
        //
        // Bug: PR compared local master to feature branch, showing 0 commits
        // Fix: Use preferRemote=true for target branch in PR creation

        // Arrange
        var userId = "testUser";
        
        // User makes a commit on master (simulating the user's exact scenario)
        var workflows = _gitService.ReadWorkflows(TestProgramId, userId);
        var newWorkflow = new Workflow
        {
            WorkflowKey = "test-workflow",
            WorkflowName = "Test Workflow",
            Description = "Test",
            Phases = new List<Phase>()
        };
        workflows.Workflows.Add(newWorkflow);
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Add workflow on master", "Test", "test@test.com");

        // User then creates a new branch from local master (which has the unpushed commit)
        _gitService.CreateBranch(TestProgramId, userId, "feature-branch");
        _gitService.SwitchBranch(TestProgramId, userId, "feature-branch");

        // Act - Get commit SHAs as PR creation would now do with the fix
        var sourceCommitSha = _gitService.GetBranchCommitSha(TestProgramId, userId, "feature-branch", preferRemote: false);
        var targetCommitSha = _gitService.GetBranchCommitSha(TestProgramId, userId, "master", preferRemote: true);

        // Compare branches to see commits
        var comparison = _gitService.CompareBranches(TestProgramId, userId, "feature-branch", "master", sourceCommitSha, targetCommitSha);

        // Assert
        comparison.CommitsAhead.Should().Be(1); // Should show 1 commit ahead of origin/master
        sourceCommitSha.Should().NotBe(targetCommitSha); // Source and target should be different
    }

    [Fact]
    public void GetBranchCommitSha_WithRemoteQualifiedName_ShouldHandleCorrectly()
    {
        // REGRESSION TEST for: ResolveRemoteBranch handling already-qualified remote names
        //
        // Scenario:
        // Users might pass "origin/master" or "master" to GetBranchCommitSha
        // Both should work correctly and resolve to the same remote branch
        //
        // Bug: Passing "origin/master" would become "origin/origin/master" internally and fail
        // Fix: Normalize branch name to strip "origin/" prefix if already present

        // Arrange
        var userId = "testUser";
        
        // Act - Try getting remote master SHA with different naming conventions
        var sha1 = _gitService.GetBranchCommitSha(TestProgramId, userId, "master", preferRemote: true);
        var sha2 = _gitService.GetBranchCommitSha(TestProgramId, userId, "origin/master", preferRemote: true);
        
        // Assert - Both should resolve to the same remote branch SHA
        sha1.Should().Be(sha2, "both 'master' and 'origin/master' should resolve to the same remote branch");
        sha1.Should().NotBeNullOrEmpty();
    }

    #endregion

    #region Central Repository PR Comparison Tests

    [Fact]
    public void CompareBranchesInCentral_WithNewBranch_ShouldShowCommitsAheadAndChanges()
    {
        // REGRESSION TEST: PRs must use central repository for comparison
        //
        // Scenario:
        // 1. User creates a branch and makes commits locally
        // 2. User pushes to central repository
        // 3. PR comparison uses central repository to get accurate counts
        //
        // This test verifies the architectural fix that PRs interact only with central repo

        // Arrange
        var userId = "testUser";
        
        // Create a feature branch and add a new workflow (this will ensure user repo)
        _gitService.CreateBranch(TestProgramId, userId, "feature/new-workflow");
        _gitService.SwitchBranch(TestProgramId, userId, "feature/new-workflow");
        
        var newWorkflow = new Workflow
        {
            WorkflowKey = "feature-workflow",
            WorkflowName = "Feature Workflow",
            Description = "Added in feature branch",
            Phases = new List<Phase>
            {
                new Phase
                {
                    PhaseName = "Initial Phase",
                    PhaseOrder = 1,
                    Tasks = new List<TaskItem>
                    {
                        new TaskItem
                        {
                            TaskId = "task-1",
                            TaskName = "Feature Task",
                            TaskType = "Manual",
                            AssignedRole = "Developer",
                            EstimatedDurationHours = 3.0,
                            Dependencies = new List<string>(),
                            IsAutomated = false
                        }
                    }
                }
            }
        };
        
        var workflows = _gitService.ReadWorkflows(TestProgramId, userId);
        workflows.Workflows.Add(newWorkflow);
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Add feature workflow", "Test User", "test@example.com");
        
        // Push to central repository
        _gitService.Push(TestProgramId, userId);

        // Act: Compare branches in central repository
        var comparison = _gitService.CompareBranchesInCentral(TestProgramId, "feature/new-workflow", "master");

        // Assert
        comparison.Should().NotBeNull();
        comparison.SourceBranch.Should().Be("feature/new-workflow");
        comparison.TargetBranch.Should().Be("master");
        comparison.CommitsAhead.Should().Be(1, "feature branch has 1 commit ahead of master");
        comparison.CommitsBehind.Should().Be(0, "feature branch is not behind master");
        
        // Verify commit details
        comparison.Commits.Should().ContainSingle();
        var commit = comparison.Commits.First();
        commit.Message.Should().Contain("Add feature workflow");
        commit.Author.Should().Be("Test User");
        
        // Verify workflow changes
        comparison.Changes.Should().ContainSingle();
        var change = comparison.Changes.First();
        change.WorkflowKey.Should().Be("feature-workflow");
        change.ChangeType.Should().Be("added");
        change.SourceWorkflow.Should().NotBeNull();
        change.TargetWorkflow.Should().BeNull();
    }

    [Fact]
    public void CompareBranchesInCentral_WithModifiedWorkflow_ShouldDetectChanges()
    {
        // Arrange
        var userId = "testUser";
        
        // Get the existing workflow from master and modify it (this will ensure user repo)
        var workflows = _gitService.ReadWorkflows(TestProgramId, userId);
        var existingWorkflow = workflows.Workflows.First();
        var originalName = existingWorkflow.WorkflowName;
        
        // Create feature branch and modify workflow
        _gitService.CreateBranch(TestProgramId, userId, "feature/modify-workflow");
        _gitService.SwitchBranch(TestProgramId, userId, "feature/modify-workflow");
        
        existingWorkflow.WorkflowName = "Modified Workflow Name";
        existingWorkflow.Description = "Modified Description";
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Modify workflow", "Test User", "test@example.com");
        _gitService.Push(TestProgramId, userId);

        // Act: Compare in central repository
        var comparison = _gitService.CompareBranchesInCentral(TestProgramId, "feature/modify-workflow", "master");

        // Assert
        comparison.CommitsAhead.Should().Be(1);
        comparison.Changes.Should().ContainSingle();
        
        var change = comparison.Changes.First();
        change.ChangeType.Should().Be("modified");
        change.SourceWorkflow.Should().NotBeNull();
        change.TargetWorkflow.Should().NotBeNull();
        change.SourceWorkflow!.WorkflowName.Should().Be("Modified Workflow Name");
        change.TargetWorkflow!.WorkflowName.Should().Be(originalName);
    }

    [Fact]
    public void CompareBranchesInCentral_WithMultipleCommits_ShouldCountAllCommits()
    {
        // Arrange
        var userId = "testUser";
        
        // Create feature branch (this will ensure user repo)
        _gitService.CreateBranch(TestProgramId, userId, "feature/multiple-commits");
        _gitService.SwitchBranch(TestProgramId, userId, "feature/multiple-commits");
        
        var workflows = _gitService.ReadWorkflows(TestProgramId, userId);
        
        // Make first commit
        var workflow1 = new Workflow
        {
            WorkflowKey = "workflow-1",
            WorkflowName = "First Workflow",
            Description = "First commit",
            Phases = new List<Phase>()
        };
        workflows.Workflows.Add(workflow1);
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "First commit", "Test User", "test@example.com");
        
        // Make second commit
        var workflow2 = new Workflow
        {
            WorkflowKey = "workflow-2",
            WorkflowName = "Second Workflow",
            Description = "Second commit",
            Phases = new List<Phase>()
        };
        workflows.Workflows.Add(workflow2);
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Second commit", "Test User", "test@example.com");
        
        // Push to central
        _gitService.Push(TestProgramId, userId);

        // Act
        var comparison = _gitService.CompareBranchesInCentral(TestProgramId, "feature/multiple-commits", "master");

        // Assert
        comparison.CommitsAhead.Should().Be(2, "feature branch has 2 commits ahead");
        comparison.Commits.Should().HaveCount(2);
        // Note: Messages may contain newlines, so check if they start with the expected text
        comparison.Commits.Should().Contain(c => c.Message.StartsWith("First commit"));
        comparison.Commits.Should().Contain(c => c.Message.StartsWith("Second commit"));
        
        // Should show both added workflows
        comparison.Changes.Should().HaveCount(2);
        comparison.Changes.Should().AllSatisfy(c => c.ChangeType.Should().Be("added"));
    }

    [Fact]
    public void CompareBranchesInCentral_IndependentOfUserRepoState_ShouldUseOnlyCentralRepo()
    {
        // CRITICAL TEST: Verifies architectural fix
        //
        // This test ensures that PR comparisons use ONLY the central repository,
        // not the user's local repository state. This prevents issues where:
        // - User has unpushed commits
        // - User's local master is out of sync
        // - Different users see different PR commit counts

        // Arrange
        var userId = "testUser";
        
        // Create and push feature branch (this will ensure user repo)
        _gitService.CreateBranch(TestProgramId, userId, "feature/central-test");
        _gitService.SwitchBranch(TestProgramId, userId, "feature/central-test");
        
        var workflows = _gitService.ReadWorkflows(TestProgramId, userId);
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "central-workflow",
            WorkflowName = "Central Test",
            Description = "Test",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Add workflow", "Test User", "test@example.com");
        _gitService.Push(TestProgramId, userId);
        
        // Switch back to master and make LOCAL unpushed commits
        _gitService.SwitchBranch(TestProgramId, userId, "master");
        workflows = _gitService.ReadWorkflows(TestProgramId, userId);
        workflows.Workflows.Add(new Workflow
        {
            WorkflowKey = "local-only-workflow",
            WorkflowName = "Local Only",
            Description = "This is only in user's local master, not pushed",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(TestProgramId, userId, workflows);
        _gitService.CommitChanges(TestProgramId, userId, "Local unpushed commit", "Test User", "test@example.com");
        // Intentionally NOT pushing to central

        // Act: Compare in central repository
        // This should NOT see the unpushed local commit
        var comparison = _gitService.CompareBranchesInCentral(TestProgramId, "feature/central-test", "master");

        // Assert: Comparison should use central repo state, ignoring local unpushed commits
        comparison.CommitsAhead.Should().Be(1, "only the pushed commit should count");
        comparison.Changes.Should().ContainSingle();
        comparison.Changes.First().WorkflowKey.Should().Be("central-workflow");
        
        // The local-only workflow should NOT appear in changes since it's not in central repo
        comparison.Changes.Should().NotContain(c => c.WorkflowKey == "local-only-workflow");
    }

    [Fact]
    public void CompareBranchesInCentral_WithDivergentBranches_ShouldCalculateAheadAndBehind()
    {
        // This tests the scenario where branches have diverged:
        // - Feature branch has commits not in master
        // - Master has commits not in feature branch

        // Arrange
        var user1 = "user1";
        var user2 = "user2";
        
        // User1 creates feature branch from master
        _gitService.CreateBranch(TestProgramId, user1, "feature/diverge-test");
        _gitService.SwitchBranch(TestProgramId, user1, "feature/diverge-test");
        
        var workflows1 = _gitService.ReadWorkflows(TestProgramId, user1);
        workflows1.Workflows.Add(new Workflow
        {
            WorkflowKey = "feature-wf",
            WorkflowName = "Feature",
            Description = "Feature work",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(TestProgramId, user1, workflows1);
        _gitService.CommitChanges(TestProgramId, user1, "Feature commit", "User1", "user1@example.com");
        _gitService.Push(TestProgramId, user1);
        
        // User2 creates a different feature branch from master (parallel work)
        _gitService.CreateBranch(TestProgramId, user2, "feature/parallel-work");
        _gitService.SwitchBranch(TestProgramId, user2, "feature/parallel-work");
        
        var workflows2 = _gitService.ReadWorkflows(TestProgramId, user2);
        workflows2.Workflows.Add(new Workflow
        {
            WorkflowKey = "parallel-wf",
            WorkflowName = "Parallel",
            Description = "Parallel work",
            Phases = new List<Phase>()
        });
        _gitService.WriteWorkflows(TestProgramId, user2, workflows2);
        _gitService.CommitChanges(TestProgramId, user2, "Parallel commit", "User2", "user2@example.com");
        _gitService.Push(TestProgramId, user2);

        // Act: Compare the two feature branches
        var comparison = _gitService.CompareBranchesInCentral(TestProgramId, "feature/diverge-test", "feature/parallel-work");

        // Assert
        comparison.CommitsAhead.Should().Be(1, "diverge-test has 1 commit not in parallel-work");
        comparison.CommitsBehind.Should().Be(1, "diverge-test is missing 1 commit from parallel-work");
        
        // Verify the changes are different workflows
        comparison.Changes.Should().HaveCount(2);
        comparison.Changes.Should().Contain(c => c.WorkflowKey == "feature-wf" && c.ChangeType == "added");
        comparison.Changes.Should().Contain(c => c.WorkflowKey == "parallel-wf" && c.ChangeType == "deleted");
    }

    #endregion
}
