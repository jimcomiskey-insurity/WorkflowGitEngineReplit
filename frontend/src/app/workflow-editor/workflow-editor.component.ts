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
    WorkflowName: '',
    WorkflowKey: '',
    Description: '',
    Phases: []
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
    if (!this.workflow.WorkflowName || !this.workflow.WorkflowKey) {
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
      PhaseName: 'New Phase',
      PhaseOrder: this.workflow.Phases.length + 1,
      Tasks: []
    };
    this.workflow.Phases.push(newPhase);
  }

  removePhase(index: number) {
    if (confirm('Are you sure you want to remove this phase?')) {
      this.workflow.Phases.splice(index, 1);
      this.reorderPhases();
    }
  }

  movePhaseUp(index: number) {
    if (index > 0) {
      const temp = this.workflow.Phases[index];
      this.workflow.Phases[index] = this.workflow.Phases[index - 1];
      this.workflow.Phases[index - 1] = temp;
      this.reorderPhases();
    }
  }

  movePhaseDown(index: number) {
    if (index < this.workflow.Phases.length - 1) {
      const temp = this.workflow.Phases[index];
      this.workflow.Phases[index] = this.workflow.Phases[index + 1];
      this.workflow.Phases[index + 1] = temp;
      this.reorderPhases();
    }
  }

  reorderPhases() {
    this.workflow.Phases.forEach((phase, index) => {
      phase.PhaseOrder = index + 1;
    });
  }

  addTask(phaseIndex: number) {
    const newTask: TaskItem = {
      TaskName: 'New Task',
      TaskType: 'Manual',
      AssignedRole: 'User',
      EstimatedDurationHours: 1,
      Dependencies: [],
      IsAutomated: false
    };
    this.workflow.Phases[phaseIndex].Tasks.push(newTask);
  }

  removeTask(phaseIndex: number, taskIndex: number) {
    if (confirm('Are you sure you want to remove this task?')) {
      this.workflow.Phases[phaseIndex].Tasks.splice(taskIndex, 1);
    }
  }
}
