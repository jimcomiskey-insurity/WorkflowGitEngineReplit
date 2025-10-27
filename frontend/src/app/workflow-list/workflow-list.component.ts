import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Workflow } from '../services/workflow.service';
import { WorkflowStateService } from '../services/workflow-state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-workflow-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css']
})
export class WorkflowListComponent implements OnInit, OnDestroy {
  workflows: Workflow[] = [];
  activeWorkflows: Workflow[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private workflowStateService: WorkflowStateService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to workflows - automatically updates when state changes
    this.workflowStateService.workflows$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (workflows) => {
        this.workflows = workflows;
        // Filter out deleted workflows - they only appear in Pending Changes
        this.activeWorkflows = workflows.filter(w => w.gitStatus !== 'deleted');
      },
      error: (error) => {
        console.error('Error loading workflows:', error);
      }
    });
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

    this.workflowStateService.deleteWorkflow(key).subscribe({
      next: () => {
        // State automatically refreshes - no manual refresh needed
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
