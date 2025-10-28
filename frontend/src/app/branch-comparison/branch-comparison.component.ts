import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PullRequestService, BranchComparison } from '../services/pull-request.service';
import { GitService } from '../services/git.service';
import { ComparisonViewerComponent } from '../comparison-viewer/comparison-viewer.component';

@Component({
  selector: 'app-branch-comparison',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ComparisonViewerComponent],
  templateUrl: './branch-comparison.component.html',
  styleUrl: './branch-comparison.component.css'
})
export class BranchComparisonComponent implements OnInit, OnDestroy {
  sourceBranchControl = new FormControl('');
  targetBranchControl = new FormControl('');
  
  branches: string[] = [];
  comparison: BranchComparison | null = null;
  loading = false;
  error: string | null = null;
  
  userId: string = '';
  selectedTab: 'all-changes' | 'commits' = 'all-changes';
  
  private destroy$ = new Subject<void>();

  constructor(
    private pullRequestService: PullRequestService,
    private gitService: GitService
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('selectedUser');
    this.userId = storedUser || 'userA';
    
    this.loadBranches();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadBranches(): void {
    this.gitService.getBranches()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (branches) => {
          this.branches = branches;
          
          // Set default target branch to the first branch if available
          if (branches.length > 0) {
            // Prefer 'master' or 'main' if they exist, otherwise use first branch
            const defaultBranch = branches.find(b => b === 'master' || b === 'main') || branches[0];
            this.targetBranchControl.setValue(defaultBranch);
          }
        },
        error: (error) => {
          console.error('Error loading branches:', error);
          this.error = 'Failed to load branches';
        }
      });
  }

  compareBranches(): void {
    const sourceBranch = this.sourceBranchControl.value?.trim();
    const targetBranch = this.targetBranchControl.value?.trim();

    if (!sourceBranch || !targetBranch) {
      this.error = 'Please select both source and target branches';
      return;
    }

    if (sourceBranch === targetBranch) {
      this.error = 'Source and target branches must be different';
      return;
    }

    // Validate that selected branches exist in the branch list
    if (!this.branches.includes(sourceBranch)) {
      this.error = `Source branch "${sourceBranch}" does not exist. Please select a valid branch.`;
      return;
    }

    if (!this.branches.includes(targetBranch)) {
      this.error = `Target branch "${targetBranch}" does not exist. Please select a valid branch.`;
      return;
    }

    this.loading = true;
    this.error = null;
    this.comparison = null;

    this.pullRequestService.compareBranches(this.userId, sourceBranch, targetBranch)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (comparison) => {
          this.comparison = comparison;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error comparing branches:', error);
          this.error = 'Failed to compare branches. Please try again.';
          this.loading = false;
        }
      });
  }

  switchTab(tab: 'all-changes' | 'commits'): void {
    this.selectedTab = tab;
  }
}
