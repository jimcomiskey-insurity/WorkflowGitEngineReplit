import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { tap, switchMap, map, startWith } from 'rxjs/operators';
import { UserService } from './user.service';
import { GitEventService } from './git-event.service';
import { ProgramStateService } from './program-state.service';
import { WorkflowService, Workflow } from './workflow.service';

/**
 * Centralized state management service for Workflow operations.
 * 
 * Components subscribe to the observable streams (workflows$, pendingChangesCount$)
 * and automatically receive updates when state changes.
 * 
 * All mutation methods (createWorkflow, updateWorkflow, deleteWorkflow) automatically
 * refresh the relevant state after successful operations.
 */
@Injectable({
  providedIn: 'root'
})
export class WorkflowStateService {
  // Internal BehaviorSubjects that hold the current state
  private workflowsSubject = new BehaviorSubject<Workflow[]>([]);

  // Refresh triggers - emit to force a refresh
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  // Public observable streams - components subscribe to these
  public readonly workflows$: Observable<Workflow[]>;
  public readonly pendingChangesCount$: Observable<number>;

  constructor(
    private workflowService: WorkflowService,
    private userService: UserService,
    private gitEventService: GitEventService,
    private programStateService: ProgramStateService
  ) {
    // Create observable stream that automatically refreshes when:
    // - User changes
    // - Program changes
    // - Manual refresh is triggered
    // - Git events occur (commit, push, pull, discard, branch switch, etc.)
    // Note: startWith(null) ensures combineLatest emits immediately on startup
    const userWithRefresh$ = combineLatest([
      this.userService.currentUser$,
      this.programStateService.currentProgramId$,
      this.refreshTrigger$,
      this.gitEventService.events$.pipe(startWith(null))
    ]).pipe(
      map(([user, programId]) => ({ user, programId }))
    );

    // Workflows stream
    // Note: We don't use shareReplay here because it would cache the HTTP response
    // and prevent fresh fetches when refresh() is called
    this.workflows$ = userWithRefresh$.pipe(
      tap(() => console.log('[WorkflowStateService] Fetching workflows')),
      switchMap(({ user, programId }) => {
        if (!programId) {
          console.log('[WorkflowStateService] No active program, clearing workflows');
          return of({ workflows: [] });
        }
        return this.workflowService.getWorkflows();
      }),
      map(response => response.workflows),
      tap(workflows => {
        console.log('[WorkflowStateService] Received workflows:', workflows.length, 'workflows');
        this.workflowsSubject.next(workflows);
      })
    );

    // Derived stream: Count of workflows with pending changes
    this.pendingChangesCount$ = this.workflows$.pipe(
      map(workflows => this.countPendingChanges(workflows))
    );

    // Initialize - trigger first load
    this.refresh();
  }

  /**
   * Count workflows with pending changes (added, modified, or deleted)
   */
  private countPendingChanges(workflows: Workflow[]): number {
    return workflows.filter(w => 
      w.gitStatus === 'added' || 
      w.gitStatus === 'modified' || 
      w.gitStatus === 'deleted' ||
      (w.phases && w.phases.some(p => 
        p.gitStatus === 'added' || 
        p.gitStatus === 'modified' || 
        p.gitStatus === 'deleted' ||
        (p.tasks && p.tasks.some(t =>
          t.gitStatus === 'added' ||
          t.gitStatus === 'modified' ||
          t.gitStatus === 'deleted'
        ))
      ))
    ).length;
  }

  /**
   * Manually trigger a refresh of all state.
   * This causes all subscribed components to receive updated data.
   */
  public refresh(): void {
    console.log('[WorkflowStateService] Manual refresh triggered');
    this.refreshTrigger$.next();
  }

  /**
   * Get current workflows value (synchronous access)
   */
  public getCurrentWorkflows(): Workflow[] {
    return this.workflowsSubject.value;
  }

  /**
   * Get a specific workflow by key (from current state)
   */
  public getWorkflow(key: string): Observable<Workflow> {
    return this.workflowService.getWorkflow(key);
  }

  // ===== Mutation Methods =====
  // All mutation methods automatically refresh state after successful operations

  createWorkflow(workflow: Workflow): Observable<Workflow> {
    return this.workflowService.createWorkflow(workflow).pipe(
      tap(() => this.refresh())
    );
  }

  updateWorkflow(key: string, workflow: Workflow): Observable<Workflow> {
    console.log('[WorkflowStateService] Updating workflow:', key);
    return this.workflowService.updateWorkflow(key, workflow).pipe(
      tap(() => {
        console.log('[WorkflowStateService] Workflow updated, triggering refresh');
        this.refresh();
      })
    );
  }

  deleteWorkflow(key: string): Observable<void> {
    return this.workflowService.deleteWorkflow(key).pipe(
      tap(() => this.refresh())
    );
  }
}
