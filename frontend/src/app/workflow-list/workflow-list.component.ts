import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { WorkflowService, Workflow } from '../services/workflow.service';
import { GitService, GitStatus } from '../services/git.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workflow-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css']
})
export class WorkflowListComponent implements OnInit {
  workflows: Workflow[] = [];
  gitStatus: GitStatus | null = null;
  showCommitDialog = false;
  commitMessage = '';
  authorName = 'User';
  authorEmail = 'user@workflow.com';

  constructor(
    private workflowService: WorkflowService,
    private gitService: GitService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadWorkflows();
    this.loadGitStatus();
  }

  loadWorkflows() {
    this.workflowService.getWorkflows().subscribe({
      next: (data) => {
        this.workflows = data.Workflows || [];
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
          this.loadWorkflows();
          this.loadGitStatus();
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
      Message: this.commitMessage,
      AuthorName: this.authorName,
      AuthorEmail: this.authorEmail
    }).subscribe({
      next: () => {
        alert('Changes committed successfully');
        this.closeCommitDialog();
        this.loadGitStatus();
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
          this.loadWorkflows();
          this.loadGitStatus();
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
        this.loadWorkflows();
        this.loadGitStatus();
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
        this.loadGitStatus();
      },
      error: (error) => {
        console.error('Error pushing changes:', error);
        alert('Failed to push changes: ' + (error.error?.error || error.message));
      }
    });
  }

  get hasChanges(): boolean {
    if (!this.gitStatus) return false;
    return this.gitStatus.IsDirty;
  }

  get allChangedFiles(): string[] {
    if (!this.gitStatus) return [];
    return [
      ...this.gitStatus.Added,
      ...this.gitStatus.Modified,
      ...this.gitStatus.Removed,
      ...this.gitStatus.Untracked
    ];
  }
}
