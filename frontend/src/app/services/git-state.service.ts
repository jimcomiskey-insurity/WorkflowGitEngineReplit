import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { tap, switchMap, map, startWith } from 'rxjs/operators';
import { UserService } from './user.service';
import { GitEventService } from './git-event.service';
import { GitStatus, CommitInfo } from './git.service';

export interface LastPushedCommitResponse {
  commitSha: string | null;
}

/**
 * Centralized state management service for Git operations.
 * 
 * Components subscribe to the observable streams (gitStatus$, commits$, etc.)
 * and automatically receive updates when state changes.
 * 
 * All mutation methods (commit, push, pull, etc.) automatically refresh
 * the relevant state after successful operations.
 */
@Injectable({
  providedIn: 'root'
})
export class GitStateService {
  private apiUrl = '/api/git';

  // Internal BehaviorSubjects that hold the current state
  private gitStatusSubject = new BehaviorSubject<GitStatus | null>(null);
  private commitsSubject = new BehaviorSubject<CommitInfo[]>([]);
  private branchesSubject = new BehaviorSubject<string[]>([]);
  private lastPushedCommitSubject = new BehaviorSubject<string | null>(null);

  // Refresh triggers - emit to force a refresh
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  // Public observable streams - components subscribe to these
  public readonly gitStatus$: Observable<GitStatus | null>;
  public readonly commits$: Observable<CommitInfo[]>;
  public readonly branches$: Observable<string[]>;
  public readonly lastPushedCommit$: Observable<string | null>;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private gitEventService: GitEventService
  ) {
    console.log('[GitStateService] Initializing');
    
    // Create observable streams that automatically refresh when:
    // 1. User changes
    // 2. Manual refresh is triggered
    // 3. Any Git event occurs (workflow save, commit, push, pull, etc.)
    const refreshTriggers$ = merge(
      this.userService.currentUser$,
      this.refreshTrigger$,
      this.gitEventService.events$.pipe(startWith(null))
    ).pipe(
      map(() => this.userService.getCurrentUser())
    );

    // Git status stream - refreshes on any trigger
    this.gitStatus$ = refreshTriggers$.pipe(
      switchMap(userId => {
        console.log('[GitStateService] Fetching Git status for user:', userId);
        return this.http.get<GitStatus>(`${this.apiUrl}/status?userId=${userId}`);
      }),
      tap(status => {
        console.log('[GitStateService] Received Git status, isDirty:', status.isDirty);
        this.gitStatusSubject.next(status);
      })
    );

    // Commits stream - refreshes on any trigger
    this.commits$ = refreshTriggers$.pipe(
      switchMap(userId => 
        this.http.get<CommitInfo[]>(`${this.apiUrl}/commits?userId=${userId}&count=20`)
      ),
      tap(commits => this.commitsSubject.next(commits))
    );

    // Branches stream - refreshes on any trigger
    this.branches$ = refreshTriggers$.pipe(
      switchMap(userId => 
        this.http.get<string[]>(`${this.apiUrl}/branches?userId=${userId}`)
      ),
      tap(branches => this.branchesSubject.next(branches))
    );

    // Last pushed commit stream - refreshes on any trigger
    this.lastPushedCommit$ = refreshTriggers$.pipe(
      switchMap(userId => 
        this.http.get<LastPushedCommitResponse>(`${this.apiUrl}/last-pushed-commit?userId=${userId}`)
      ),
      map(response => response.commitSha),
      tap(commitSha => this.lastPushedCommitSubject.next(commitSha))
    );
  }

  /**
   * Manually trigger a refresh of all state.
   * This causes all subscribed components to receive updated data.
   */
  public refresh(): void {
    this.refreshTrigger$.next();
  }

  /**
   * Get current git status value (synchronous access)
   */
  public getCurrentGitStatus(): GitStatus | null {
    return this.gitStatusSubject.value;
  }

  /**
   * Get current commits value (synchronous access)
   */
  public getCurrentCommits(): CommitInfo[] {
    return this.commitsSubject.value;
  }

  /**
   * Get current branches value (synchronous access)
   */
  public getCurrentBranches(): string[] {
    return this.branchesSubject.value;
  }

  /**
   * Get current last pushed commit value (synchronous access)
   */
  public getCurrentLastPushedCommit(): string | null {
    return this.lastPushedCommitSubject.value;
  }

  // ===== Mutation Methods =====
  // All mutation methods automatically refresh state after successful operations

  commit(message: string): Observable<any> {
    const userId = this.userService.getCurrentUser();
    return this.http.post(`${this.apiUrl}/commit?userId=${userId}`, { message }).pipe(
      tap(() => this.refresh())
    );
  }

  push(): Observable<any> {
    const userId = this.userService.getCurrentUser();
    return this.http.post(`${this.apiUrl}/push?userId=${userId}`, {}).pipe(
      tap(() => this.refresh())
    );
  }

  pull(): Observable<any> {
    const userId = this.userService.getCurrentUser();
    return this.http.post(`${this.apiUrl}/pull?userId=${userId}`, {}).pipe(
      tap(() => this.refresh())
    );
  }

  discard(): Observable<any> {
    const userId = this.userService.getCurrentUser();
    return this.http.post(`${this.apiUrl}/discard?userId=${userId}`, {}).pipe(
      tap(() => this.refresh())
    );
  }

  createBranch(branchName: string): Observable<any> {
    const userId = this.userService.getCurrentUser();
    return this.http.post(`${this.apiUrl}/branches?userId=${userId}`, { branchName }).pipe(
      tap(() => this.refresh())
    );
  }

  switchBranch(branchName: string): Observable<any> {
    const userId = this.userService.getCurrentUser();
    return this.http.post(`${this.apiUrl}/branches/switch?userId=${userId}`, { branchName }).pipe(
      tap(() => this.refresh())
    );
  }

  resetToCommit(commitSha: string): Observable<any> {
    const userId = this.userService.getCurrentUser();
    return this.http.post(`${this.apiUrl}/reset-to-commit?userId=${userId}`, { commitSha }).pipe(
      tap(() => this.refresh())
    );
  }

  resetAllRepositories(): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset`, {}).pipe(
      tap(() => this.refresh())
    );
  }
}
