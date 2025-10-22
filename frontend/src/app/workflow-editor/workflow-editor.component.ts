import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WorkflowService, Workflow, Phase, TaskItem } from '../services/workflow.service';

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
      },
      error: (error) => {
        console.error('Error loading workflow:', error);
        alert('Failed to load workflow');
        this.router.navigate(['/']);
      }
    });
  }

  saveWorkflow() {
    if (!this.workflow.workflowName || !this.workflow.workflowKey) {
      alert('Please provide both Workflow Name and Workflow Key');
      return;
    }

    if (this.isNewWorkflow) {
      this.workflowService.createWorkflow(this.workflow).subscribe({
        next: () => {
          alert('Workflow created successfully');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error creating workflow:', error);
          alert('Failed to create workflow: ' + (error.error || error.message));
        }
      });
    } else {
      this.workflowService.updateWorkflow(this.originalKey, this.workflow).subscribe({
        next: () => {
          alert('Workflow updated successfully');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error updating workflow:', error);
          alert('Failed to update workflow');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  addPhase() {
    const newPhase: Phase = {
      phaseName: 'New Phase',
      phaseOrder: this.workflow.phases.length + 1,
      tasks: []
    };
    this.workflow.phases.push(newPhase);
  }

  removePhase(index: number) {
    if (confirm('Are you sure you want to remove this phase?')) {
      this.workflow.phases.splice(index, 1);
      this.reorderPhases();
    }
  }

  movePhaseUp(index: number) {
    if (index > 0) {
      const temp = this.workflow.phases[index];
      this.workflow.phases[index] = this.workflow.phases[index - 1];
      this.workflow.phases[index - 1] = temp;
      this.reorderPhases();
    }
  }

  movePhaseDown(index: number) {
    if (index < this.workflow.phases.length - 1) {
      const temp = this.workflow.phases[index];
      this.workflow.phases[index] = this.workflow.phases[index + 1];
      this.workflow.phases[index + 1] = temp;
      this.reorderPhases();
    }
  }

  reorderPhases() {
    this.workflow.phases.forEach((phase, index) => {
      phase.phaseOrder = index + 1;
    });
  }

  addTask(phaseIndex: number) {
    const newTask: TaskItem = {
      taskName: 'New Task',
      taskType: 'Manual',
      assignedRole: 'User',
      estimatedDurationHours: 1,
      dependencies: [],
      isAutomated: false
    };
    this.workflow.phases[phaseIndex].tasks.push(newTask);
  }

  removeTask(phaseIndex: number, taskIndex: number) {
    if (confirm('Are you sure you want to remove this task?')) {
      this.workflow.phases[phaseIndex].tasks.splice(taskIndex, 1);
    }
  }
}
