import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, merge } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { PullRequestService, PullRequest } from '../services/pull-request.service';
import { CreatePullRequestComponent } from '../create-pull-request/create-pull-request.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pull-requests',
  standalone: true,
  imports: [CommonModule, CreatePullRequestComponent],
  templateUrl: './pull-requests.component.html',
  styleUrls: ['./pull-requests.component.css']
})
export class PullRequestsComponent implements OnInit, OnDestroy {
  pullRequests: PullRequest[] = [];
  filteredPullRequests: PullRequest[] = [];
  selectedFilter: 'open' | 'merged' | 'closed' | 'all' = 'all';
  isCreatingPR = false;
  userId: string = 'userA';
  private destroy$ = new Subject<void>();

  constructor(
    private pullRequestService: PullRequestService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Subscribe to user changes and reload pull requests
    merge(this.userService.currentUser$)
      .pipe(
        switchMap((userId) => {
          this.userId = userId;
          return this.pullRequestService.getPullRequests(userId);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (prs) => {
          this.pullRequests = prs;
          this.applyFilter();
        },
        error: (error) => {
          console.error('Error loading pull requests:', error);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPullRequests() {
    const userId = this.userService.getCurrentUser();
    this.pullRequestService.getPullRequests(userId).subscribe({
      next: (prs) => {
        this.pullRequests = prs;
        this.applyFilter();
      },
      error: (error) => {
        console.error('Error loading pull requests:', error);
      }
    });
  }

  setFilter(filter: 'open' | 'merged' | 'closed' | 'all') {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedFilter === 'all') {
      this.filteredPullRequests = this.pullRequests;
    } else {
      this.filteredPullRequests = this.pullRequests.filter(pr => pr.status === this.selectedFilter);
    }
  }

  openCreatePRDialog() {
    this.isCreatingPR = true;
  }

  closeCreatePRDialog() {
    this.isCreatingPR = false;
  }

  onPRCreated() {
    this.isCreatingPR = false;
    this.loadPullRequests();
  }

  viewPRDetail(pr: PullRequest) {
    this.router.navigate(['/pull-requests', pr.number]);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}
