import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface WorkflowChange {
  workflowKey: string;
  workflowName: string;
  changeType: string;
  sourceWorkflow?: any;
  targetWorkflow?: any;
}

@Component({
  selector: 'app-comparison-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comparison-viewer.component.html',
  styleUrls: ['./comparison-viewer.component.css']
})
export class ComparisonViewerComponent {
  @Input() changes: WorkflowChange[] = [];
  @Input() title: string = 'Changes';
  @Input() emptyMessage: string = 'No workflow changes';
  
  expandedChanges: Set<string> = new Set();

  toggleChangeDetails(workflowKey: string) {
    if (this.expandedChanges.has(workflowKey)) {
      this.expandedChanges.delete(workflowKey);
    } else {
      this.expandedChanges.add(workflowKey);
    }
  }

  isExpanded(workflowKey: string): boolean {
    return this.expandedChanges.has(workflowKey);
  }

  getTotalTasks(workflow: any): number {
    if (!workflow.phases) {
      return 0;
    }
    return workflow.phases.reduce((total: number, phase: any) => {
      return total + (phase.tasks?.length || 0);
    }, 0);
  }

  getWorkflowLevelChanges(change: WorkflowChange): any[] {
    if (!change.sourceWorkflow || !change.targetWorkflow) {
      return [];
    }

    const changes: any[] = [];
    const newVersion = change.sourceWorkflow;
    const oldVersion = change.targetWorkflow;

    if (newVersion.workflowName !== oldVersion.workflowName) {
      changes.push({
        field: 'Workflow Name',
        oldValue: oldVersion.workflowName,
        newValue: newVersion.workflowName
      });
    }

    if (newVersion.description !== oldVersion.description) {
      changes.push({
        field: 'Description',
        oldValue: oldVersion.description || '(empty)',
        newValue: newVersion.description || '(empty)'
      });
    }

    return changes;
  }

  getPhaseChanges(change: WorkflowChange): any {
    if (!change.sourceWorkflow || !change.targetWorkflow) {
      return { added: [], removed: [], modified: [] };
    }

    const newPhases = change.sourceWorkflow.phases || [];
    const oldPhases = change.targetWorkflow.phases || [];

    const added = newPhases.filter((np: any) => 
      !oldPhases.some((op: any) => op.phaseName === np.phaseName)
    );

    const removed = oldPhases.filter((op: any) => 
      !newPhases.some((np: any) => np.phaseName === op.phaseName)
    );

    const modified = newPhases.filter((np: any) => {
      const oldPhase = oldPhases.find((op: any) => op.phaseName === np.phaseName);
      return oldPhase && JSON.stringify(np) !== JSON.stringify(oldPhase);
    }).map((np: any) => ({
      phase: np,
      oldPhase: oldPhases.find((op: any) => op.phaseName === np.phaseName)
    }));

    return { added, removed, modified };
  }

  getTaskChanges(newPhase: any, oldPhase: any): any {
    const newTasks = newPhase.tasks || [];
    const oldTasks = oldPhase.tasks || [];

    const added = newTasks.filter((nt: any) => 
      !oldTasks.some((ot: any) => ot.taskId === nt.taskId)
    );

    const removed = oldTasks.filter((ot: any) => 
      !newTasks.some((nt: any) => nt.taskId === ot.taskId)
    );

    const modified = newTasks.filter((nt: any) => {
      const oldTask = oldTasks.find((ot: any) => ot.taskId === nt.taskId);
      return oldTask && JSON.stringify(nt) !== JSON.stringify(oldTask);
    }).map((nt: any) => ({
      task: nt,
      oldTask: oldTasks.find((ot: any) => ot.taskId === nt.taskId)
    }));

    return { added, removed, modified };
  }

  getTaskFieldChanges(newTask: any, oldTask: any): any[] {
    const changes: any[] = [];

    if (newTask.taskName !== oldTask.taskName) {
      changes.push({ field: 'Task Name', oldValue: oldTask.taskName, newValue: newTask.taskName });
    }

    if (newTask.taskType !== oldTask.taskType) {
      changes.push({ field: 'Type', oldValue: oldTask.taskType, newValue: newTask.taskType });
    }

    if (newTask.assignedRole !== oldTask.assignedRole) {
      changes.push({ field: 'Role', oldValue: oldTask.assignedRole || '(none)', newValue: newTask.assignedRole || '(none)' });
    }

    if (newTask.estimatedDuration !== oldTask.estimatedDuration) {
      changes.push({ field: 'Duration', oldValue: oldTask.estimatedDuration || '(none)', newValue: newTask.estimatedDuration || '(none)' });
    }

    if (newTask.isAutomated !== oldTask.isAutomated) {
      changes.push({ field: 'Automated', oldValue: oldTask.isAutomated ? 'Yes' : 'No', newValue: newTask.isAutomated ? 'Yes' : 'No' });
    }

    const oldDeps = (oldTask.dependencies || []).join(', ');
    const newDeps = (newTask.dependencies || []).join(', ');
    if (oldDeps !== newDeps) {
      changes.push({ field: 'Dependencies', oldValue: oldDeps || '(none)', newValue: newDeps || '(none)' });
    }

    return changes;
  }
}
