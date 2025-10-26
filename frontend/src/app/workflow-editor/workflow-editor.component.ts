import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Workflow, Phase, TaskItem } from '../services/workflow.service';
import { WorkflowStateService } from '../services/workflow-state.service';
import { GitEventService } from '../services/git-event.service';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

interface ExtendedPhase extends Phase {
  collapsed?: boolean;
}

@Component({
  selector: 'app-workflow-editor',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './workflow-editor.component.html',
  styleUrls: ['./workflow-editor.component.css']
})
export class WorkflowEditorComponent implements OnInit, OnDestroy {
  workflow: Workflow = {
    workflowName: '',
    workflowKey: '',
    description: '',
    phases: []
  };
  
  isNewWorkflow = true;
  originalKey = '';
  showPropertiesDialog = false;
  showPhaseDialog = false;
  showTaskDialog = false;
  editingPhaseIndex: number | null = null;
  editingTaskIndex: number | null = null;
  editingPhase: ExtendedPhase | null = null;
  editingTask: TaskItem | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private workflowStateService: WorkflowStateService,
    private gitEventService: GitEventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['key']) {
        this.isNewWorkflow = false;
        this.originalKey = params['key'];
        
        // Subscribe to workflows and filter for this specific workflow
        // Automatically updates when any change occurs (user switch, git ops, etc.)
        this.workflowStateService.workflows$.pipe(
          map(workflows => workflows.find(w => w.workflowKey === this.originalKey)),
          takeUntil(this.destroy$)
        ).subscribe({
          next: (workflow) => {
            if (workflow) {
              this.workflow = {
                ...workflow,
                phases: workflow.phases.map(phase => ({
                  ...phase,
                  collapsed: (this.workflow.phases.find(p => p.phaseName === phase.phaseName) as ExtendedPhase)?.collapsed || false
                } as ExtendedPhase))
              };
            } else if (!this.isNewWorkflow) {
              // Workflow not found
              console.error('Workflow not found:', this.originalKey);
              alert('Workflow not found');
              this.router.navigate(['/workflows']);
            }
          },
          error: (error) => {
            console.error('Error loading workflow:', error);
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  saveWorkflow() {
    if (!this.workflow.workflowName || !this.workflow.workflowKey) {
      alert('Please provide both Workflow Name and Workflow Key');
      return;
    }

    const workflowToSave = {
      ...this.workflow,
      phases: this.workflow.phases.map(phase => {
        const { collapsed, ...rest } = phase as ExtendedPhase;
        return rest;
      })
    };

    if (this.isNewWorkflow) {
      this.workflowStateService.createWorkflow(workflowToSave).subscribe({
        next: () => {
          this.router.navigate(['/workflows']);
        },
        error: (error) => {
          console.error('Error creating workflow:', error);
          alert('Failed to create workflow: ' + (error.error || error.message));
        }
      });
    } else {
      this.workflowStateService.updateWorkflow(this.originalKey, workflowToSave).subscribe({
        next: () => {
          alert('Workflow updated successfully');
          this.closePropertiesDialog();
          this.gitEventService.emitCommit();
        },
        error: (error) => {
          console.error('Error updating workflow:', error);
          alert('Failed to update workflow');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/workflows']);
  }

  togglePhase(index: number) {
    const phase = this.workflow.phases[index] as ExtendedPhase;
    phase.collapsed = !phase.collapsed;
  }

  openPropertiesDialog() {
    this.showPropertiesDialog = true;
  }

  closePropertiesDialog() {
    this.showPropertiesDialog = false;
  }

  openPhaseDialog(index: number) {
    this.editingPhaseIndex = index;
    this.editingPhase = { ...this.workflow.phases[index] };
    this.showPhaseDialog = true;
  }

  closePhaseDialog() {
    this.showPhaseDialog = false;
    this.editingPhaseIndex = null;
    this.editingPhase = null;
  }

  savePhase() {
    if (this.editingPhaseIndex !== null && this.editingPhase) {
      const currentPhase = this.workflow.phases[this.editingPhaseIndex] as ExtendedPhase;
      this.workflow.phases[this.editingPhaseIndex] = {
        ...this.editingPhase,
        collapsed: currentPhase.collapsed
      } as ExtendedPhase;
      this.reorderPhases();
      this.closePhaseDialog();
      this.persistWorkflow();
    }
  }

  openTaskDialog(phaseIndex: number, taskIndex: number) {
    this.editingPhaseIndex = phaseIndex;
    this.editingTaskIndex = taskIndex;
    this.editingPhase = this.workflow.phases[phaseIndex];
    this.editingTask = { ...this.workflow.phases[phaseIndex].tasks[taskIndex] };
    this.showTaskDialog = true;
  }

  closeTaskDialog() {
    this.showTaskDialog = false;
    this.editingPhaseIndex = null;
    this.editingTaskIndex = null;
    this.editingPhase = null;
    this.editingTask = null;
  }

  saveTask() {
    if (this.editingPhaseIndex !== null && this.editingTaskIndex !== null && this.editingTask) {
      this.workflow.phases[this.editingPhaseIndex].tasks[this.editingTaskIndex] = { ...this.editingTask };
      this.closeTaskDialog();
      this.persistWorkflow();
    }
  }

  addPhase() {
    const newPhase: ExtendedPhase = {
      phaseName: 'New Phase',
      phaseOrder: this.workflow.phases.length + 1,
      tasks: [],
      collapsed: false
    };
    this.workflow.phases.push(newPhase);
    this.persistWorkflow();
  }

  removePhase(index: number) {
    if (confirm('Are you sure you want to remove this phase?')) {
      this.workflow.phases.splice(index, 1);
      this.reorderPhases();
      this.persistWorkflow();
    }
  }

  reorderPhases() {
    this.workflow.phases.forEach((phase, index) => {
      phase.phaseOrder = index + 1;
    });
  }

  addTask(phaseIndex: number) {
    const newTask: TaskItem = {
      taskId: this.generateId(),
      taskName: 'New Task',
      taskType: 'Manual',
      assignedRole: 'User',
      estimatedDurationHours: 1,
      dependencies: [],
      isAutomated: false
    };
    this.workflow.phases[phaseIndex].tasks.push(newTask);
    this.persistWorkflow();
  }

  generateId(): string {
    return crypto.randomUUID();
  }

  removeTask(phaseIndex: number, taskIndex: number) {
    if (confirm('Are you sure you want to remove this task?')) {
      this.workflow.phases[phaseIndex].tasks.splice(taskIndex, 1);
      this.persistWorkflow();
    }
  }

  persistWorkflow() {
    if (this.isNewWorkflow || !this.originalKey) {
      return;
    }

    const workflowToSave = {
      ...this.workflow,
      phases: this.workflow.phases.map(phase => {
        const { collapsed, ...rest } = phase as ExtendedPhase;
        return rest;
      })
    };

    this.workflowStateService.updateWorkflow(this.originalKey, workflowToSave).subscribe({
      next: () => {
        // State automatically refreshes - workflow will update via subscription
        // No need to emit events here - the WorkflowStateService handles refresh automatically
      },
      error: (error) => {
        console.error('Error persisting workflow:', error);
        alert('Failed to save changes');
      }
    });
  }
}
