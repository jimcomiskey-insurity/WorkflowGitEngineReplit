import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, merge, combineLatest, of } from 'rxjs';
import { tap, switchMap, map, startWith } from 'rxjs/operators';
import { UserService } from './user.service';
import { GitEventService } from './git-event.service';
import { ProgramStateService } from './program-state.service';
import { GitService, GitStatus, CommitInfo } from './git.service';

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
    private gitService: GitService,
    private userService: UserService,
    private gitEventService: GitEventService,
    private programStateService: ProgramStateService
  ) {
    console.log('[GitStateService] Initializing');
    
    // Create observable streams that automatically refresh when:
    // 1. User changes
    // 2. Program changes
    // 3. Manual refresh is triggered
    // 4. Any Git event occurs (workflow save, commit, push, pull, etc.)
    const refreshTriggers$ = combineLatest([
      this.userService.currentUser$,
      this.programStateService.currentProgramId$,
      merge(
        this.refreshTrigger$,
        this.gitEventService.events$.pipe(startWith(null))
      )
    ]).pipe(
      map(([user, programId]) => ({ user, programId }))
    );

    // Git status stream - refreshes on any trigger
    this.gitStatus$ = refreshTriggers$.pipe(
      switchMap(({ user, programId }) => {
        if (!programId) {
          console.log('[GitStateService] No active program, clearing git status');
          this.gitStatusSubject.next(null);
          return [null];
        }
        console.log('[GitStateService] Fetching Git status');
        return this.gitService.getStatus();
      }),
      tap(status => {
        if (status) {
          console.log('[GitStateService] Received Git status, isDirty:', status.isDirty);
        }
        this.gitStatusSubject.next(status);
      })
    );

    // Commits stream - refreshes on any trigger
    this.commits$ = refreshTriggers$.pipe(
      switchMap(({ user, programId }) => {
        if (!programId) {
          this.commitsSubject.next([]);
          return of([]);
        }
        return this.gitService.getCommits(20);
      }),
      tap(commits => this.commitsSubject.next(commits))
    );

    // Branches stream - refreshes on any trigger
    this.branches$ = refreshTriggers$.pipe(
      switchMap(({ user, programId }) => {
        if (!programId) {
          this.branchesSubject.next([]);
          return of([]);
        }
        return this.gitService.getBranches();
      }),
      tap(branches => this.branchesSubject.next(branches))
    );

    // Last pushed commit stream - refreshes on any trigger
    this.lastPushedCommit$ = refreshTriggers$.pipe(
      switchMap(({ user, programId }) => {
        if (!programId) {
          this.lastPushedCommitSubject.next(null);
          return of({ commitSha: null });
        }
        return this.gitService.getLastPushedCommit();
      }),
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
    return this.gitService.commit({ 
      message, 
      authorName: 'User', 
      authorEmail: 'user@example.com' 
    }).pipe(
      tap(() => this.refresh())
    );
  }

  push(): Observable<any> {
    return this.gitService.push().pipe(
      tap(() => this.refresh())
    );
  }

  pull(): Observable<any> {
    return this.gitService.pull().pipe(
      tap(() => this.refresh())
    );
  }

  discard(): Observable<any> {
    return this.gitService.discard().pipe(
      tap(() => this.refresh())
    );
  }

  createBranch(branchName: string): Observable<any> {
    return this.gitService.createBranch(branchName).pipe(
      tap(() => this.refresh())
    );
  }

  switchBranch(branchName: string): Observable<any> {
    return this.gitService.switchBranch(branchName).pipe(
      tap(() => this.refresh())
    );
  }

  resetToCommit(commitSha: string): Observable<any> {
    return this.gitService.resetToCommit(commitSha).pipe(
      tap(() => this.refresh())
    );
  }

  resetAllRepositories(): Observable<any> {
    return this.gitService.resetAllRepositories().pipe(
      tap(() => this.refresh())
    );
  }
}
