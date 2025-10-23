import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PullRequestService, PullRequest, BranchComparison } from '../services/pull-request.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pull-request-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pull-request-detail.component.html',
  styleUrls: ['./pull-request-detail.component.css']
})
export class PullRequestDetailComponent implements OnInit, OnDestroy {
  pullRequest?: PullRequest;
  comparison?: BranchComparison;
  userId: string = '';
  isLoading = true;
  isMerging = false;
  private prNumber: number = 0;
  private userSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pullRequestService: PullRequestService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.prNumber = Number(this.route.snapshot.paramMap.get('number'));
    
    // Subscribe to user changes and reload data
    this.userSubscription = this.userService.currentUser$.subscribe(user => {
      this.userId = user;
      this.loadPullRequest(this.prNumber);
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  loadPullRequest(number: number) {
    this.pullRequestService.getPullRequest(this.userId, number).subscribe({
      next: (pr) => {
        this.pullRequest = pr;
        this.loadComparison(number);
      },
      error: (error) => {
        console.error('Error loading pull request:', error);
        this.isLoading = false;
      }
    });
  }

  loadComparison(number: number) {
    this.pullRequestService.getBranchComparison(this.userId, number).subscribe({
      next: (comparison) => {
        this.comparison = comparison;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading comparison:', error);
        this.isLoading = false;
      }
    });
  }

  mergePullRequest() {
    if (!this.pullRequest || this.isMerging) {
      return;
    }

    if (!confirm(`Are you sure you want to merge PR #${this.pullRequest.number}?`)) {
      return;
    }

    this.isMerging = true;

    this.pullRequestService.mergePullRequest(this.userId, this.pullRequest.number).subscribe({
      next: (pr) => {
        this.pullRequest = pr;
        this.isMerging = false;
        alert('Pull request merged successfully!');
      },
      error: (error) => {
        console.error('Error merging pull request:', error);
        this.isMerging = false;
        alert('Failed to merge pull request. Please try again.');
      }
    });
  }

  closePullRequest() {
    if (!this.pullRequest || this.isMerging) {
      return;
    }

    if (!confirm(`Are you sure you want to close PR #${this.pullRequest.number}?`)) {
      return;
    }

    this.pullRequestService.closePullRequest(this.userId, this.pullRequest.number).subscribe({
      next: (pr) => {
        this.pullRequest = pr;
        alert('Pull request closed.');
      },
      error: (error) => {
        console.error('Error closing pull request:', error);
        alert('Failed to close pull request. Please try again.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/pull-requests']);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTotalTasks(workflow: any): number {
    if (!workflow.phases) {
      return 0;
    }
    return workflow.phases.reduce((total: number, phase: any) => {
      return total + (phase.tasks?.length || 0);
    }, 0);
  }

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

  getWorkflowLevelChanges(change: any): any[] {
    if (!change.sourceWorkflow || !change.targetWorkflow) {
      return [];
    }

    const changes: any[] = [];
    // sourceWorkflow = NEW version, targetWorkflow = OLD version
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

  getPhaseChanges(change: any): any {
    if (!change.sourceWorkflow || !change.targetWorkflow) {
      return { added: [], removed: [], modified: [] };
    }

    // sourceWorkflow = NEW version, targetWorkflow = OLD version
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
