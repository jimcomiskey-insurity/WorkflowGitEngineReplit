import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { tap, shareReplay, switchMap, map, startWith } from 'rxjs/operators';
import { UserService } from './user.service';
import { GitEventService } from './git-event.service';
import { Workflow } from './workflow.service';

export interface ProgramWorkflows {
  workflows: Workflow[];
}

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
  private apiUrl = '/api/workflows';

  // Internal BehaviorSubjects that hold the current state
  private workflowsSubject = new BehaviorSubject<Workflow[]>([]);

  // Refresh triggers - emit to force a refresh
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  // Public observable streams - components subscribe to these
  public readonly workflows$: Observable<Workflow[]>;
  public readonly pendingChangesCount$: Observable<number>;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private gitEventService: GitEventService
  ) {
    // Create observable stream that automatically refreshes when:
    // - User changes
    // - Manual refresh is triggered
    // - Git events occur (commit, push, pull, discard, branch switch, etc.)
    // Note: startWith(null) ensures combineLatest emits immediately on startup
    const userWithRefresh$ = combineLatest([
      this.userService.currentUser$,
      this.refreshTrigger$,
      this.gitEventService.events$.pipe(startWith(null))
    ]).pipe(
      map(([user]) => user)
    );

    // Workflows stream
    // Note: We don't use shareReplay here because it would cache the HTTP response
    // and prevent fresh fetches when refresh() is called
    this.workflows$ = userWithRefresh$.pipe(
      tap(userId => console.log('[WorkflowStateService] Fetching workflows for user:', userId)),
      switchMap(userId => 
        this.http.get<ProgramWorkflows>(`${this.apiUrl}?userId=${userId}`)
      ),
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
   * Count workflows with pending changes (added, modified, or removed)
   */
  private countPendingChanges(workflows: Workflow[]): number {
    return workflows.filter(w => 
      w.gitStatus === 'added' || 
      w.gitStatus === 'modified' || 
      w.gitStatus === 'removed' ||
      (w.phases && w.phases.some(p => 
        p.gitStatus === 'added' || 
        p.gitStatus === 'modified' || 
        p.gitStatus === 'removed' ||
        (p.tasks && p.tasks.some(t =>
          t.gitStatus === 'added' ||
          t.gitStatus === 'modified' ||
          t.gitStatus === 'removed'
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
    const userId = this.userService.getCurrentUser();
    return this.http.get<Workflow>(`${this.apiUrl}/${key}?userId=${userId}`);
  }

  // ===== Mutation Methods =====
  // All mutation methods automatically refresh state after successful operations

  createWorkflow(workflow: Workflow): Observable<Workflow> {
    const userId = this.userService.getCurrentUser();
    return this.http.post<Workflow>(`${this.apiUrl}?userId=${userId}`, workflow).pipe(
      tap(() => this.refresh())
    );
  }

  updateWorkflow(key: string, workflow: Workflow): Observable<Workflow> {
    const userId = this.userService.getCurrentUser();
    console.log('[WorkflowStateService] Updating workflow:', key);
    return this.http.put<Workflow>(`${this.apiUrl}/${key}?userId=${userId}`, workflow).pipe(
      tap(() => {
        console.log('[WorkflowStateService] Workflow updated, triggering refresh');
        this.refresh();
      })
    );
  }

  deleteWorkflow(key: string): Observable<void> {
    const userId = this.userService.getCurrentUser();
    return this.http.delete<void>(`${this.apiUrl}/${key}?userId=${userId}`).pipe(
      tap(() => this.refresh())
    );
  }
}
