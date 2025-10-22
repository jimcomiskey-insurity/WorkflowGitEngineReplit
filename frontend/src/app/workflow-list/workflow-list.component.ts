import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { WorkflowService, Workflow } from '../services/workflow.service';
import { GitService, GitStatus, CommitInfo } from '../services/git.service';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { forkJoin, Subject, merge } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-workflow-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css']
})
export class WorkflowListComponent implements OnInit, OnDestroy {
  workflows: Workflow[] = [];
  gitStatus: GitStatus | null = null;
  commits: CommitInfo[] = [];
  branches: string[] = [];
  showCommitDialog = false;
  showCommitHistory = false;
  showBranchDialog = false;
  commitMessage = '';
  authorName = 'User';
  authorEmail = 'user@workflow.com';
  newBranchName = '';
  currentUser = '';
  availableUsers: string[] = [];
  private destroy$ = new Subject<void>();
  private refresh$ = new Subject<void>();

  constructor(
    private workflowService: WorkflowService,
    private gitService: GitService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.availableUsers = this.userService.getAvailableUsers();
    
    merge(this.userService.currentUser$, this.refresh$).pipe(
      switchMap(() => forkJoin({
        workflows: this.workflowService.getWorkflows(),
        status: this.gitService.getStatus(),
        commits: this.gitService.getCommits(20),
        branches: this.gitService.getBranches()
      })),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.workflows = data.workflows.workflows || [];
        this.gitStatus = data.status;
        this.commits = data.commits;
        this.branches = data.branches;
      },
      error: (error) => {
        console.error('Error loading data:', error);
      }
    });
  }

  refreshAllData() {
    this.refresh$.next();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onUserChange() {
    this.userService.setCurrentUser(this.currentUser);
  }

  loadWorkflows() {
    this.workflowService.getWorkflows().subscribe({
      next: (data) => {
        this.workflows = data.workflows || [];
      },
      error: (error) => {
        console.error('Error loading workflows:', error);
        this.workflows = [];
      }
    });
  }

  loadGitStatus() {
    this.gitService.getStatus().subscribe({
      next: (status) => {
        this.gitStatus = status;
      },
      error: (error) => {
        console.error('Error loading git status:', error);
      }
    });
  }

  loadCommitHistory() {
    this.gitService.getCommits(20).subscribe({
      next: (commits) => {
        this.commits = commits;
      },
      error: (error) => {
        console.error('Error loading commit history:', error);
      }
    });
  }

  loadBranches() {
    this.gitService.getBranches().subscribe({
      next: (branches) => {
        this.branches = branches;
      },
      error: (error) => {
        console.error('Error loading branches:', error);
      }
    });
  }

  toggleCommitHistory() {
    this.showCommitHistory = !this.showCommitHistory;
  }

  openBranchDialog() {
    this.newBranchName = '';
    this.showBranchDialog = true;
  }

  closeBranchDialog() {
    this.showBranchDialog = false;
    this.newBranchName = '';
  }

  createBranch() {
    if (!this.newBranchName.trim()) {
      alert('Please enter a branch name');
      return;
    }

    const branchName = this.newBranchName;
    this.gitService.createBranch(branchName).subscribe({
      next: () => {
        this.closeBranchDialog();
        this.refreshAllData();
      },
      error: (error) => {
        console.error('Error creating branch:', error);
        alert('Failed to create branch');
      }
    });
  }

  switchToBranch(branchName: string) {
    if (this.gitStatus?.isDirty) {
      if (!confirm('You have uncommitted changes. Switching branches will discard them. Continue?')) {
        return;
      }
    }

    this.gitService.switchBranch(branchName).subscribe({
      next: () => {
        this.refreshAllData();
      },
      error: (error) => {
        console.error('Error switching branch:', error);
        alert('Failed to switch branch');
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  getShortSha(sha: string): string {
    return sha.substring(0, 7);
  }

  editWorkflow(key: string) {
    this.router.navigate(['/workflow', key]);
  }

  createNewWorkflow() {
    this.router.navigate(['/workflow']);
  }

  deleteWorkflow(key: string) {
    if (confirm(`Are you sure you want to delete workflow "${key}"?`)) {
      this.workflowService.deleteWorkflow(key).subscribe({
        next: () => {
          this.refreshAllData();
        },
        error: (error) => {
          console.error('Error deleting workflow:', error);
          alert('Failed to delete workflow');
        }
      });
    }
  }

  openCommitDialog() {
    this.showCommitDialog = true;
  }

  closeCommitDialog() {
    this.showCommitDialog = false;
    this.commitMessage = '';
  }

  commitChanges() {
    if (!this.commitMessage.trim()) {
      alert('Please enter a commit message');
      return;
    }

    this.gitService.commit({
      message: this.commitMessage,
      authorName: this.authorName,
      authorEmail: this.authorEmail
    }).subscribe({
      next: () => {
        this.closeCommitDialog();
        this.refreshAllData();
      },
      error: (error) => {
        console.error('Error committing changes:', error);
        alert('Failed to commit changes');
      }
    });
  }

  discardChanges() {
    if (confirm('Are you sure you want to discard all changes? This cannot be undone.')) {
      this.gitService.discard().subscribe({
        next: () => {
          alert('Changes discarded successfully');
          this.refreshAllData();
        },
        error: (error) => {
          console.error('Error discarding changes:', error);
          alert('Failed to discard changes');
        }
      });
    }
  }

  pullChanges() {
    this.gitService.pull().subscribe({
      next: () => {
        alert('Changes pulled successfully');
        this.refreshAllData();
      },
      error: (error) => {
        console.error('Error pulling changes:', error);
        alert('Failed to pull changes: ' + (error.error?.error || error.message));
      }
    });
  }

  pushChanges() {
    this.gitService.push().subscribe({
      next: () => {
        alert('Changes pushed successfully');
        this.refreshAllData();
      },
      error: (error) => {
        console.error('Error pushing changes:', error);
        alert('Failed to push changes: ' + (error.error?.error || error.message));
      }
    });
  }

  get hasChanges(): boolean {
    if (!this.gitStatus) return false;
    return this.gitStatus.isDirty;
  }

  get hasCommitsToPush(): boolean {
    if (!this.gitStatus) return false;
    return this.gitStatus.commitsAhead > 0;
  }

  get commitsAheadCount(): number {
    return this.gitStatus?.commitsAhead || 0;
  }

  get allChangedFiles(): string[] {
    if (!this.gitStatus) return [];
    return [
      ...this.gitStatus.added,
      ...this.gitStatus.modified,
      ...this.gitStatus.removed,
      ...this.gitStatus.untracked
    ];
  }

  getTaskCount(workflow: Workflow): number {
    if (!workflow.phases) return 0;
    return workflow.phases.reduce((sum, phase) => sum + (phase.tasks?.length || 0), 0);
  }
}
