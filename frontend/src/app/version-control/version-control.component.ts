import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GitService, GitStatus, CommitInfo } from '../services/git.service';
import { UserService } from '../services/user.service';
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
  authorEmail = 'user@workflow.com';
  newBranchName = '';
  selectedBranch = '';
  private destroy$ = new Subject<void>();
  private refresh$ = new Subject<void>();

  constructor(
    private gitService: GitService,
    private userService: UserService
  ) {}

  ngOnInit() {
    merge(this.userService.currentUser$, this.refresh$).pipe(
      switchMap(() => forkJoin({
        status: this.gitService.getStatus(),
        commits: this.gitService.getCommits(20),
        branches: this.gitService.getBranches()
      })),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.gitStatus = data.status;
        this.commits = data.commits;
        this.branches = data.branches;
        this.selectedBranch = data.status.currentBranch || '';
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

  get canPush(): boolean {
    if (!this.gitStatus) return false;
    // Allow push if:
    // 1. There are commits ahead (normal case)
    // 2. OR there are commits but no tracking data (new branch case)
    return this.gitStatus.commitsAhead > 0 || 
           (this.commits.length > 0 && this.gitStatus.commitsAhead === 0 && this.gitStatus.commitsBehind === 0);
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
        forkJoin({
          status: this.gitService.getStatus(),
          commits: this.gitService.getCommits(20)
        }).subscribe({
          next: (data) => {
            this.gitStatus = data.status;
            this.commits = data.commits;
            this.closeCommitDialog();
            
            // Prompt to push changes to remote
            if (this.gitStatus.commitsAhead > 0) {
              const shouldPush = confirm(
                `Changes committed successfully!\n\n` +
                `You have ${this.gitStatus.commitsAhead} unpushed commit(s).\n` +
                `Would you like to push your changes to the remote now?`
              );
              
              if (shouldPush) {
                this.pushChanges();
              } else {
                alert('Changes committed locally. Remember to push before creating a pull request!');
              }
            } else {
              alert('Changes committed successfully!');
            }
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

    this.gitService.switchBranch(this.selectedBranch).subscribe({
      next: () => {
        this.refreshAllData();
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
}
