import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowService, Workflow, Phase, TaskItem } from '../services/workflow.service';

interface ExtendedPhase extends Phase {
  collapsed: boolean;
}

interface ExtendedWorkflow extends Workflow {
  phases: ExtendedPhase[];
  hasChanges: boolean;
  changeCount: number;
}

@Component({
  selector: 'app-pending-changes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-changes.component.html',
  styleUrls: ['./pending-changes.component.css']
})
export class PendingChangesComponent implements OnInit {
  workflows: ExtendedWorkflow[] = [];
  filteredWorkflows: ExtendedWorkflow[] = [];
  selectedFilter: 'all' | 'added' | 'modified' | 'deleted' = 'all';
  totalChanges = 0;

  constructor(private workflowService: WorkflowService) {}

  ngOnInit() {
    this.loadWorkflows();
  }

  loadWorkflows() {
    this.workflowService.getWorkflows().subscribe({
      next: (response) => {
        this.workflows = response.workflows
          .map(w => this.extendWorkflow(w))
          .filter(w => w.hasChanges);
        
        this.calculateTotalChanges();
        this.applyFilter();
      },
      error: (error) => {
        console.error('Error loading workflows:', error);
      }
    });
  }

  extendWorkflow(workflow: Workflow): ExtendedWorkflow {
    const extendedPhases = workflow.phases.map(phase => ({
      ...phase,
      collapsed: false
    } as ExtendedPhase));

    const hasChanges = this.workflowHasChanges(workflow);
    const changeCount = this.countChanges(workflow);

    return {
      ...workflow,
      phases: extendedPhases,
      hasChanges,
      changeCount
    };
  }

  workflowHasChanges(workflow: Workflow): boolean {
    if (workflow.gitStatus && workflow.gitStatus !== 'none') {
      return true;
    }

    return workflow.phases.some(phase => {
      if (phase.gitStatus && phase.gitStatus !== 'none') {
        return true;
      }
      return phase.tasks.some(task => task.gitStatus && task.gitStatus !== 'none');
    });
  }

  countChanges(workflow: Workflow): number {
    let count = 0;
    
    if (workflow.gitStatus && workflow.gitStatus !== 'none') {
      count++;
    }

    workflow.phases.forEach(phase => {
      if (phase.gitStatus && phase.gitStatus !== 'none') {
        count++;
      }
      phase.tasks.forEach(task => {
        if (task.gitStatus && task.gitStatus !== 'none') {
          count++;
        }
      });
    });

    return count;
  }

  calculateTotalChanges() {
    this.totalChanges = this.workflows.reduce((sum, w) => sum + w.changeCount, 0);
  }

  applyFilter() {
    if (this.selectedFilter === 'all') {
      this.filteredWorkflows = this.workflows;
    } else {
      this.filteredWorkflows = this.workflows
        .map(w => this.filterWorkflowByStatus(w, this.selectedFilter))
        .filter(w => w.hasChanges);
    }
  }

  filterWorkflowByStatus(workflow: ExtendedWorkflow, status: string): ExtendedWorkflow {
    const filteredPhases = workflow.phases
      .map(phase => ({
        ...phase,
        tasks: phase.tasks.filter(task => task.gitStatus === status)
      }))
      .filter(phase => 
        phase.gitStatus === status || 
        phase.tasks.length > 0
      );

    const hasChanges = workflow.gitStatus === status || filteredPhases.length > 0;
    const changeCount = this.countFilteredChanges(workflow, filteredPhases, status);

    return {
      ...workflow,
      phases: filteredPhases,
      hasChanges,
      changeCount
    };
  }

  countFilteredChanges(workflow: Workflow, phases: Phase[], status: string): number {
    let count = 0;
    
    if (workflow.gitStatus === status) {
      count++;
    }

    phases.forEach(phase => {
      if (phase.gitStatus === status) {
        count++;
      }
      phase.tasks.forEach(task => {
        if (task.gitStatus === status) {
          count++;
        }
      });
    });

    return count;
  }

  setFilter(filter: 'all' | 'added' | 'modified' | 'deleted') {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  togglePhase(workflow: ExtendedWorkflow, phaseIndex: number) {
    workflow.phases[phaseIndex].collapsed = !workflow.phases[phaseIndex].collapsed;
  }

  getPhaseChangeCount(phase: Phase): number {
    let count = 0;
    if (phase.gitStatus && phase.gitStatus !== 'none') {
      count++;
    }
    phase.tasks.forEach(task => {
      if (task.gitStatus && task.gitStatus !== 'none') {
        count++;
      }
    });
    return count;
  }

  getPhaseChangeSummary(phase: Phase): string {
    const count = this.getPhaseChangeCount(phase);
    if (count === 0) {
      return '';
    }
    return count === 1 ? '1 change' : `${count} changes`;
  }
}
