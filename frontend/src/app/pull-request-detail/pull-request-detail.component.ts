import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PullRequestService, PullRequest, BranchComparison } from '../services/pull-request.service';

@Component({
  selector: 'app-pull-request-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pull-request-detail.component.html',
  styleUrls: ['./pull-request-detail.component.css']
})
export class PullRequestDetailComponent implements OnInit {
  pullRequest?: PullRequest;
  comparison?: BranchComparison;
  userId = 'userA';
  isLoading = true;
  isMerging = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pullRequestService: PullRequestService
  ) {}

  ngOnInit() {
    const prNumber = Number(this.route.snapshot.paramMap.get('number'));
    this.loadPullRequest(prNumber);
  }

  loadPullRequest(number: number) {
    this.pullRequestService.getPullRequest(this.userId, number).subscribe({
      next: (pr) => {
        this.pullRequest = pr;
        this.loadComparison(number);
      },
      error: (error) => {
        console.error('Error loading pull request:', error);
        this.isLoading = false;
      }
    });
  }

  loadComparison(number: number) {
    this.pullRequestService.getBranchComparison(this.userId, number).subscribe({
      next: (comparison) => {
        this.comparison = comparison;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading comparison:', error);
        this.isLoading = false;
      }
    });
  }

  mergePullRequest() {
    if (!this.pullRequest || this.isMerging) {
      return;
    }

    if (!confirm(`Are you sure you want to merge PR #${this.pullRequest.number}?`)) {
      return;
    }

    this.isMerging = true;

    this.pullRequestService.mergePullRequest(this.userId, this.pullRequest.number).subscribe({
      next: (pr) => {
        this.pullRequest = pr;
        this.isMerging = false;
        alert('Pull request merged successfully!');
      },
      error: (error) => {
        console.error('Error merging pull request:', error);
        this.isMerging = false;
        alert('Failed to merge pull request. Please try again.');
      }
    });
  }

  closePullRequest() {
    if (!this.pullRequest || this.isMerging) {
      return;
    }

    if (!confirm(`Are you sure you want to close PR #${this.pullRequest.number}?`)) {
      return;
    }

    this.pullRequestService.closePullRequest(this.userId, this.pullRequest.number).subscribe({
      next: (pr) => {
        this.pullRequest = pr;
        alert('Pull request closed.');
      },
      error: (error) => {
        console.error('Error closing pull request:', error);
        alert('Failed to close pull request. Please try again.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/pull-requests']);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTotalTasks(workflow: any): number {
    if (!workflow.phases) {
      return 0;
    }
    return workflow.phases.reduce((total: number, phase: any) => {
      return total + (phase.tasks?.length || 0);
    }, 0);
  }
}
