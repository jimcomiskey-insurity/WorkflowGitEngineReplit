import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PullRequestService, CreatePullRequestRequest } from '../services/pull-request.service';
import { GitService } from '../services/git.service';

@Component({
  selector: 'app-create-pull-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-pull-request.component.html',
  styleUrls: ['./create-pull-request.component.css']
})
export class CreatePullRequestComponent implements OnInit {
  @Input() userId: string = 'userA';
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  title = '';
  description = '';
  targetBranch = 'main';
  sourceBranch = '';
  availableBranches: string[] = [];
  isSubmitting = false;

  constructor(
    private pullRequestService: PullRequestService,
    private gitService: GitService
  ) {}

  ngOnInit() {
    this.loadBranches();
  }

  loadBranches() {
    // Get current branch from status
    this.gitService.getStatus().subscribe({
      next: (status) => {
        this.sourceBranch = status.currentBranch;
        
        // Get all branches
        this.gitService.getBranches().subscribe({
          next: (branches) => {
            this.availableBranches = branches.filter(b => b !== this.sourceBranch);
            
            // Set default target branch to main if current branch is not main
            if (this.sourceBranch === 'main') {
              this.targetBranch = this.availableBranches[0] || 'main';
            } else {
              this.targetBranch = 'main';
            }
          },
          error: (error) => {
            console.error('Error loading branches:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error loading status:', error);
      }
    });
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (!this.title.trim() || this.isSubmitting) {
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

  onBackgroundClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
