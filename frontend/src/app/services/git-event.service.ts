import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface GitEvent {
  type: 'branch-switch' | 'pull' | 'push' | 'commit' | 'discard';
  branchName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GitEventService {
  private gitEvent$ = new Subject<GitEvent>();

  get events$(): Observable<GitEvent> {
    return this.gitEvent$.asObservable();
  }

  emitBranchSwitch(branchName: string) {
    this.gitEvent$.next({ type: 'branch-switch', branchName });
  }

  emitPull() {
    this.gitEvent$.next({ type: 'pull' });
  }

  emitPush() {
    this.gitEvent$.next({ type: 'push' });
  }

  emitCommit() {
    this.gitEvent$.next({ type: 'commit' });
  }

  emitDiscard() {
    this.gitEvent$.next({ type: 'discard' });
  }
}
