import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GitService, GitStatus, CommitInfo } from '../services/git.service';
import { UserService } from '../services/user.service';
import { GitEventService } from '../services/git-event.service';
import { FormsModule } from '@angular/forms';
import { forkJoin, Subject, merge } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-version-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './version-control.component.html',
  styleUrls: ['./version-control.component.css']
})
export class VersionControlComponent implements OnInit, OnDestroy {
  gitStatus: GitStatus | null = null;
  commits: CommitInfo[] = [];
  branches: string[] = [];
  showCommitDialog = false;
  showCommitHistory = false;
  showBranchDialog = false;
  commitMessage = '';
  authorName = 'User';
  authorEmail = 'User@workflow.com';
  newBranchName = '';
  selectedBranch = '';
  lastPushedCommitSha: string | null = null;
  private destroy$ = new Subject<void>();
  private refresh$ = new Subject<void>();

  constructor(
    private gitService: GitService,
    private userService: UserService,
    private gitEventService: GitEventService
  ) {}

  ngOnInit() {
    merge(this.userService.currentUser$, this.refresh$).pipe(
      switchMap(() => forkJoin({
        status: this.gitService.getStatus(),
        commits: this.gitService.getCommits(20),
        branches: this.gitService.getBranches(),
        lastPushedCommit: this.gitService.getLastPushedCommit()
      })),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.gitStatus = data.status;
        this.commits = data.commits;
        this.branches = data.branches;
        this.selectedBranch = data.status.currentBranch || '';
        this.lastPushedCommitSha = data.lastPushedCommit.commitSha;
      },
      error: (error) => {
        console.error('Error loading data:', error);
      }
    });

    this.gitEventService.events$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (event) => {
        if (event.type === 'branch-switch' && event.branchName) {
          this.selectedBranch = event.branchName;
          this.refresh$.next();
        }
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

  get hasChanges(): boolean {
    if (!this.gitStatus) return false;
    return this.gitStatus.isDirty;
  }

  get allChangedFiles(): any[] {
    if (!this.gitStatus) return [];
    return [
      ...this.gitStatus.added,
      ...this.gitStatus.modified,
      ...this.gitStatus.removed,
      ...this.gitStatus.untracked
    ];
  }

  get hasCommitsToPush(): boolean {
    return (this.gitStatus?.commitsAhead || 0) > 0;
  }

  get commitsAheadCount(): number {
    return this.gitStatus?.commitsAhead || 0;
  }

  get isOnMasterBranch(): boolean {
    if (!this.gitStatus?.currentBranch) return false;
    const branch = this.gitStatus.currentBranch.toLowerCase();
    return branch === 'master' || branch === 'main';
  }

  get canPush(): boolean {
    if (!this.gitStatus) return false;
    
    // Block push if on master/main branch
    if (this.isOnMasterBranch) return false;
    
    // Allow push when there are commits ahead of remote (tracked branch)
    if (this.gitStatus.commitsAhead > 0) return true;
    
    // Allow push for new branches without remote tracking that have commits
    if (!this.gitStatus.hasRemoteTracking && this.commits.length > 0) return true;
    
    return false;
  }

  toggleCommitHistory() {
    this.showCommitHistory = !this.showCommitHistory;
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
        this.gitEventService.emitCommit();
        forkJoin({
          status: this.gitService.getStatus(),
          commits: this.gitService.getCommits(20)
        }).subscribe({
          next: (data) => {
            this.gitStatus = data.status;
            this.commits = data.commits;
            this.closeCommitDialog();
          }
        });
      },
      error: (error) => {
        console.error('Error committing changes:', error);
        alert('Failed to commit changes');
      }
    });
  }

  discardChanges() {
    if (!confirm('Are you sure you want to discard all changes? This cannot be undone.')) {
      return;
    }

    this.gitService.discard().subscribe({
      next: () => {
        this.gitEventService.emitDiscard();
        this.refreshAllData();
        alert('Changes discarded');
      },
      error: (error) => {
        console.error('Error discarding changes:', error);
        alert('Failed to discard changes');
      }
    });
  }

  pullChanges() {
    this.gitService.pull().subscribe({
      next: () => {
        this.gitEventService.emitPull();
        this.refreshAllData();
        alert('Changes pulled successfully!');
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
        this.gitEventService.emitPush();
        this.refreshAllData();
        alert('Changes pushed successfully!');
      },
      error: (error) => {
        console.error('Error pushing changes:', error);
        alert('Failed to push changes: ' + (error.error?.error || error.message));
      }
    });
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
    this.closeBranchDialog();
    
    this.gitService.createBranch(branchName).subscribe({
      next: () => {
        this.gitService.switchBranch(branchName).subscribe({
          next: () => {
            this.gitEventService.emitBranchSwitch(branchName);
            this.refreshAllData();
          },
          error: (error) => {
            console.error('Error switching to new branch:', error);
            alert('Branch created but failed to switch to it');
            this.refreshAllData();
          }
        });
      },
      error: (error) => {
        console.error('Error creating branch:', error);
        alert('Failed to create branch: ' + (error.error?.error || error.message));
      }
    });
  }

  onBranchChange() {
    if (this.selectedBranch === this.gitStatus?.currentBranch) {
      return;
    }

    if (this.hasChanges) {
      if (!confirm('You have uncommitted changes. Switching branches will require committing or discarding these changes. Continue?')) {
        this.selectedBranch = this.gitStatus?.currentBranch || '';
        return;
      }
    }

    const targetBranch = this.selectedBranch;
    this.gitService.switchBranch(targetBranch).subscribe({
      next: () => {
        this.gitEventService.emitBranchSwitch(targetBranch);
      },
      error: (error) => {
        console.error('Error switching branch:', error);
        alert('Failed to switch branch: ' + (error.error?.error || error.message));
        this.selectedBranch = this.gitStatus?.currentBranch || '';
      }
    });
  }

  getShortSha(sha: string): string {
    return sha.substring(0, 7);
  }

  formatDate(date: any): string {
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }

  resetRepositories() {
    if (!confirm('This will delete all Git repositories and reset them to the initial state with sample data. All users will get fresh clones. This cannot be undone. Are you sure?')) {
      return;
    }

    this.gitService.resetAllRepositories().subscribe({
      next: (response) => {
        alert('All repositories have been reset successfully! The page will reload to reflect the changes.');
        window.location.reload();
      },
      error: (error) => {
        console.error('Error resetting repositories:', error);
        alert('Failed to reset repositories: ' + (error.error?.error || error.message));
      }
    });
  }

  isLastPushedCommit(commit: CommitInfo): boolean {
    return this.lastPushedCommitSha !== null && commit.sha === this.lastPushedCommitSha;
  }

  canResetToCommit(commit: CommitInfo): boolean {
    return this.isLastPushedCommit(commit);
  }

  resetToCommit(commit: CommitInfo) {
    const confirmMessage = `This will reset your current branch to this commit:\n\n` +
      `${this.getShortSha(commit.sha)} - ${commit.message}\n\n` +
      `Any local commits after this point will be removed, but your working directory changes will be preserved.\n\n` +
      `Are you sure you want to continue?`;
    
    if (!confirm(confirmMessage)) {
      return;
    }

    this.gitService.resetToCommit(commit.sha).subscribe({
      next: () => {
        this.gitEventService.emitCommit(); // Trigger refresh in other components
        this.refreshAllData();
        alert('Successfully reset to commit!');
      },
      error: (error) => {
        console.error('Error resetting to commit:', error);
        alert('Failed to reset to commit: ' + (error.error?.error || error.message));
      }
    });
  }
}
