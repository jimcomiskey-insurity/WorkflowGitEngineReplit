import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PullRequestService, PullRequest } from '../services/pull-request.service';

@Component({
  selector: 'app-pull-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pull-requests.component.html',
  styleUrls: ['./pull-requests.component.css']
})
export class PullRequestsComponent implements OnInit {
  pullRequests: PullRequest[] = [];
  filteredPullRequests: PullRequest[] = [];
  selectedFilter: 'open' | 'merged' | 'closed' | 'all' = 'all';
  userId = 'userA';
  isCreatingPR = false;

  constructor(
    private pullRequestService: PullRequestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPullRequests();
  }

  loadPullRequests() {
    this.pullRequestService.getPullRequests(this.userId).subscribe({
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
