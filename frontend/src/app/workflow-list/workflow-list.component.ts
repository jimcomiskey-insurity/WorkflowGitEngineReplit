import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { WorkflowService, Workflow } from '../services/workflow.service';
import { UserService } from '../services/user.service';
import { GitEventService } from '../services/git-event.service';
import { Subject, merge } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-workflow-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css']
})
export class WorkflowListComponent implements OnInit, OnDestroy {
  workflows: Workflow[] = [];
  private destroy$ = new Subject<void>();
  private refresh$ = new Subject<void>();

  constructor(
    private workflowService: WorkflowService,
    private userService: UserService,
    private gitEventService: GitEventService,
    private router: Router
  ) {}

  ngOnInit() {
    // Refresh workflows when user changes OR when git events occur OR manual refresh
    merge(
      this.userService.currentUser$, 
      this.refresh$,
      this.gitEventService.events$
    ).pipe(
      switchMap(() => this.workflowService.getWorkflows()),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.workflows = data.workflows || [];
      },
      error: (error) => {
        console.error('Error loading workflows:', error);
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

  createNewWorkflow() {
    this.router.navigate(['/workflows/new']);
  }

  editWorkflow(key: string) {
    this.router.navigate(['/workflows/edit', key]);
  }

  deleteWorkflow(key: string) {
    if (!confirm(`Are you sure you want to delete workflow ${key}?`)) {
      return;
    }

    this.workflowService.deleteWorkflow(key).subscribe({
      next: () => {
        this.refreshAllData();
      },
      error: (error) => {
        console.error('Error deleting workflow:', error);
        alert('Failed to delete workflow');
      }
    });
  }

  getTaskCount(workflow: Workflow): number {
    if (!workflow.phases) return 0;
    return workflow.phases.reduce((total, phase) => total + (phase.tasks?.length || 0), 0);
  }
}
