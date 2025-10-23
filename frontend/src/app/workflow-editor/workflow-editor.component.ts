import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WorkflowService, Workflow, Phase, TaskItem } from '../services/workflow.service';

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
export class WorkflowEditorComponent implements OnInit {
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

  constructor(
    private workflowService: WorkflowService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['key']) {
        this.isNewWorkflow = false;
        this.originalKey = params['key'];
        this.loadWorkflow(params['key']);
      }
    });
  }

  loadWorkflow(key: string) {
    this.workflowService.getWorkflow(key).subscribe({
      next: (workflow) => {
        this.workflow = workflow;
        this.workflow.phases = this.workflow.phases.map(phase => ({
          ...phase,
          collapsed: false
        } as ExtendedPhase));
      },
      error: (error) => {
        console.error('Error loading workflow:', error);
        alert('Failed to load workflow');
        this.router.navigate(['/workflows']);
      }
    });
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
      this.workflowService.createWorkflow(workflowToSave).subscribe({
        next: () => {
          alert('Workflow created successfully');
          this.router.navigate(['/workflows']);
        },
        error: (error) => {
          console.error('Error creating workflow:', error);
          alert('Failed to create workflow: ' + (error.error || error.message));
        }
      });
    } else {
      this.workflowService.updateWorkflow(this.originalKey, workflowToSave).subscribe({
        next: () => {
          alert('Workflow updated successfully');
          this.closePropertiesDialog();
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

    this.workflowService.updateWorkflow(this.originalKey, workflowToSave).subscribe({
      next: () => {
        this.loadWorkflow(this.originalKey);
      },
      error: (error) => {
        console.error('Error persisting workflow:', error);
        alert('Failed to save changes');
      }
    });
  }
}
