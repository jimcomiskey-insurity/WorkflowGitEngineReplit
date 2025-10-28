import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { PullRequestService, CreatePullRequestRequest } from '../services/pull-request.service';
import { GitStateService } from '../services/git-state.service';
import { GitStatus } from '../services/git.service';

@Component({
  selector: 'app-create-pull-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-pull-request.component.html',
  styleUrls: ['./create-pull-request.component.css']
})
export class CreatePullRequestComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() userId: string = 'userA';
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  title = '';
  description = '';
  targetBranch = '';
  sourceBranch = '';
  allBranches: string[] = [];
  isSubmitting = false;
  gitStatus: GitStatus | null = null;
  isLoadingSuggestion = false;
  private destroy$ = new Subject<void>();
  private branchChange$ = new Subject<void>();

  constructor(
    private pullRequestService: PullRequestService,
    private gitStateService: GitStateService
  ) {}

  ngOnInit() {
    // Subscribe to Git status for validation
    this.gitStateService.gitStatus$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (status) => {
        this.gitStatus = status;
        if (status && !this.sourceBranch) {
          // Default source to current branch if not already set
          this.sourceBranch = status.currentBranch;
        }
      },
      error: (error) => {
        console.error('Error loading git status:', error);
      }
    });

    // Subscribe to branches
    this.gitStateService.branches$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (branches) => {
        // Keep all local branches (filter out remote tracking branches)
        this.allBranches = branches.filter(b => !b.startsWith('origin/'));
        
        // Set default source branch to current branch if available
        if (!this.sourceBranch && this.gitStatus) {
          this.sourceBranch = this.gitStatus.currentBranch;
        }
        
        // Set default target branch: prefer master/main, otherwise first available branch that's not the source
        if (!this.targetBranch) {
          if (this.allBranches.includes('master') && this.sourceBranch !== 'master') {
            this.targetBranch = 'master';
          } else if (this.allBranches.includes('main') && this.sourceBranch !== 'main') {
            this.targetBranch = 'main';
          } else {
            this.targetBranch = this.allBranches.find(b => b !== this.sourceBranch) || '';
          }
        }
      },
      error: (error) => {
        console.error('Error loading branches:', error);
      }
    });

    // Subscribe to branch changes to fetch PR suggestions
    this.branchChange$.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.loadPullRequestSuggestion();
    });
  }

  ngAfterViewInit() {
    // Trigger initial suggestion load after view is initialized
    setTimeout(() => {
      if (this.sourceBranch && this.targetBranch && this.sourceBranch !== this.targetBranch) {
        this.loadPullRequestSuggestion();
      }
    }, 500);
  }

  onSourceBranchChange() {
    // Trigger suggestion reload when source branch changes
    if (this.sourceBranch && this.targetBranch && this.sourceBranch !== this.targetBranch) {
      this.branchChange$.next();
    }
  }

  onTargetBranchChange() {
    // Trigger suggestion reload when target branch changes
    if (this.sourceBranch && this.targetBranch && this.sourceBranch !== this.targetBranch) {
      this.branchChange$.next();
    }
  }

  private loadPullRequestSuggestion() {
    if (!this.sourceBranch || !this.targetBranch || this.sourceBranch === this.targetBranch) {
      return;
    }

    this.isLoadingSuggestion = true;
    this.pullRequestService.getPullRequestSuggestion(this.sourceBranch, this.targetBranch)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (suggestion) => {
          // Auto-populate title and description from suggestion
          this.title = suggestion.title;
          this.description = suggestion.description;
          this.isLoadingSuggestion = false;
        },
        error: (error) => {
          console.error('Error loading PR suggestion:', error);
          this.isLoadingSuggestion = false;
          // Don't show error to user, just leave fields empty
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (!this.title.trim() || this.isSubmitting) {
      return;
    }

    // Validate no uncommitted changes
    if (this.hasUncommittedChanges) {
      alert('You have uncommitted changes. Please commit your changes before creating a pull request.');
      return;
    }

    // Validate branch has been pushed
    if (!this.isBranchPushed) {
      alert('This branch has not been pushed to the remote repository. Please push your changes before creating a pull request.');
      return;
    }

    this.isSubmitting = true;

    const request: CreatePullRequestRequest = {
      title: this.title,
      description: this.description,
      sourceBranch: this.sourceBranch,
      targetBranch: this.targetBranch
    };

    this.pullRequestService.createPullRequest(this.userId, request).subscribe({
      next: (pr) => {
        console.log('Pull request created:', pr);
        this.created.emit();
      },
      error: (error) => {
        console.error('Error creating pull request:', error);
        this.isSubmitting = false;
        alert('Failed to create pull request. Please try again.');
      }
    });
  }

  get hasUncommittedChanges(): boolean {
    return this.gitStatus?.isDirty || false;
  }

  get isBranchPushed(): boolean {
    if (!this.gitStatus) return false;
    
    // Branch is considered pushed if:
    // 1. It has a remote tracking branch, OR
    // 2. It has no commits ahead of remote (commitsAhead === 0)
    // If there's no remote tracking, it's definitely not pushed
    if (!this.gitStatus.hasRemoteTracking) {
      return false;
    }
    
    // If it has remote tracking but commits ahead, those commits aren't pushed yet
    return this.gitStatus.commitsAhead === 0;
  }

  get canSubmit(): boolean {
    return this.title.trim().length > 0 && 
           !this.hasUncommittedChanges && 
           this.isBranchPushed && 
           !this.isSubmitting &&
           this.sourceBranch !== this.targetBranch &&
           this.sourceBranch.length > 0 &&
           this.targetBranch.length > 0;
  }

  get sameBranchError(): boolean {
    return this.sourceBranch === this.targetBranch && this.sourceBranch.length > 0;
  }

  onBackgroundClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
