import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GitService, GitStatus } from '../services/git.service';
import { UserService } from '../services/user.service';
import { GitEventService } from '../services/git-event.service';
import { Subject, merge } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-git-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="git-toolbar">
      <div class="git-control">
        <label>Branch:</label>
        <select [(ngModel)]="selectedBranch" (change)="onBranchChange()" [disabled]="isLoading">
          <option *ngFor="let branch of branches" [value]="branch">{{ branch }}</option>
        </select>
      </div>
      
      <button class="git-btn git-btn-secondary" (click)="pullChanges()" [disabled]="isLoading" title="Pull from Remote">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="8 17 12 21 16 17"></polyline>
          <line x1="12" y1="12" x2="12" y2="21"></line>
          <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>
        </svg>
        <span>Pull</span>
        <span class="badge-behind" *ngIf="commitsBehind > 0">{{ commitsBehind }}</span>
      </button>
      
      <button 
        class="git-btn git-btn-primary" 
        (click)="pushChanges()" 
        [disabled]="!canPush || isLoading"
        [title]="pushButtonTitle">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="16 7 12 3 8 7"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
          <path d="M3 21h18"></path>
        </svg>
        <span>Push</span>
        <span class="badge-ahead" *ngIf="commitsAhead > 0">{{ commitsAhead }}</span>
      </button>
      
      <div class="status-indicator" *ngIf="gitStatus">
        <span class="current-branch">{{ gitStatus.currentBranch }}</span>
        <span class="status-dot" [class.has-changes]="gitStatus.isDirty"></span>
      </div>
    </div>
  `,
  styles: [`
    .git-toolbar {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .git-control {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .git-control label {
      font-size: 14px;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .git-control select {
      padding: 6px 12px;
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      min-width: 150px;
      transition: all 0.2s;
    }

    .git-control select:hover:not(:disabled) {
      background-color: var(--bg-hover);
      border-color: var(--accent-blue);
    }

    .git-control select:focus {
      outline: none;
      border-color: var(--accent-blue);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .git-control select:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .git-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border: 1px solid var(--border-color);
      position: relative;
    }

    .git-btn-primary {
      background-color: var(--accent-blue);
      color: white;
      border-color: var(--accent-blue);
    }

    .git-btn-primary:hover:not(:disabled) {
      background-color: #2563eb;
    }

    .git-btn-secondary {
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
    }

    .git-btn-secondary:hover:not(:disabled) {
      background-color: var(--bg-hover);
      border-color: var(--accent-blue);
    }

    .git-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .git-btn svg {
      flex-shrink: 0;
    }

    .badge-ahead, .badge-behind {
      position: absolute;
      top: -4px;
      right: -4px;
      background: var(--accent-orange);
      color: white;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
    }

    .badge-behind {
      background: var(--accent-green);
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      background-color: var(--bg-tertiary);
      border-radius: 6px;
      font-size: 13px;
    }

    .current-branch {
      color: var(--text-secondary);
      font-weight: 500;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--text-muted);
    }

    .status-dot.has-changes {
      background-color: var(--accent-orange);
    }
  `]
})
export class GitToolbarComponent implements OnInit, OnDestroy {
  gitStatus: GitStatus | null = null;
  branches: string[] = [];
  selectedBranch = '';
  isLoading = false;
  private destroy$ = new Subject<void>();
  private refresh$ = new Subject<void>();

  constructor(
    private gitService: GitService,
    private userService: UserService,
    private gitEventService: GitEventService
  ) {}

  ngOnInit() {
    merge(this.userService.currentUser$, this.refresh$).pipe(
      switchMap(() => this.gitService.getStatus()),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (status) => {
        this.gitStatus = status;
        this.selectedBranch = status.currentBranch || '';
      },
      error: (error) => {
        console.error('Error loading git status:', error);
      }
    });

    merge(this.userService.currentUser$, this.refresh$).pipe(
      switchMap(() => this.gitService.getBranches()),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (branches) => {
        this.branches = branches;
      },
      error: (error) => {
        console.error('Error loading branches:', error);
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get commitsAhead(): number {
    return this.gitStatus?.commitsAhead || 0;
  }

  get commitsBehind(): number {
    return this.gitStatus?.commitsBehind || 0;
  }

  get isOnMasterBranch(): boolean {
    if (!this.gitStatus?.currentBranch) return false;
    const branch = this.gitStatus.currentBranch.toLowerCase();
    return branch === 'master' || branch === 'main';
  }

  get canPush(): boolean {
    if (!this.gitStatus) return false;
    if (this.isOnMasterBranch) return false;
    if (this.gitStatus.commitsAhead > 0) return true;
    if (!this.gitStatus.hasRemoteTracking) return true;
    return false;
  }

  get pushButtonTitle(): string {
    if (this.isOnMasterBranch) {
      return 'Cannot push directly to master/main. Create a new branch or discard changes.';
    }
    if (!this.canPush) {
      return 'No changes to push';
    }
    return 'Push to Remote';
  }

  onBranchChange() {
    if (this.selectedBranch && this.selectedBranch !== this.gitStatus?.currentBranch) {
      this.isLoading = true;
      const targetBranch = this.selectedBranch;
      this.gitService.switchBranch(targetBranch).subscribe({
        next: () => {
          this.gitEventService.emitBranchSwitch(targetBranch);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error switching branch:', error);
          alert('Failed to switch branch: ' + error.error?.error || error.message);
          this.isLoading = false;
          this.refresh$.next();
        }
      });
    }
  }

  pullChanges() {
    this.isLoading = true;
    this.gitService.pull().subscribe({
      next: () => {
        this.refresh$.next();
        this.gitEventService.emitPull();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error pulling changes:', error);
        alert('Failed to pull changes: ' + error.error?.error || error.message);
        this.isLoading = false;
      }
    });
  }

  pushChanges() {
    if (!this.canPush) return;

    this.isLoading = true;
    this.gitService.push().subscribe({
      next: () => {
        this.refresh$.next();
        this.gitEventService.emitPush();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error pushing changes:', error);
        alert('Failed to push changes: ' + error.error?.error || error.message);
        this.isLoading = false;
      }
    });
  }
}
