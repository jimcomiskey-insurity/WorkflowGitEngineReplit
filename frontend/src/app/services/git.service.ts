import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { ProgramStateService } from './program-state.service';

export interface GitStatus {
  added: string[];
  modified: string[];
  removed: string[];
  untracked: string[];
  currentBranch: string;
  isDirty: boolean;
  commitsAhead: number;
  commitsBehind: number;
  hasRemoteTracking: boolean;
}

export interface CommitRequest {
  message: string;
  authorName: string;
  authorEmail: string;
}

export interface CommitInfo {
  sha: string;
  message: string;
  author: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class GitService {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private programStateService = inject(ProgramStateService);

  getStatus(): Observable<GitStatus> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.get<GitStatus>(`/api/users/${userId}/programs/${programId}/git/status`);
  }

  commit(request: CommitRequest): Observable<any> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.post(`/api/users/${userId}/programs/${programId}/git/commit`, request);
  }

  discard(): Observable<any> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.post(`/api/users/${userId}/programs/${programId}/git/discard`, {});
  }

  pull(): Observable<any> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.post(`/api/users/${userId}/programs/${programId}/git/pull`, {});
  }

  push(): Observable<any> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.post(`/api/users/${userId}/programs/${programId}/git/push`, {});
  }

  getBranches(): Observable<string[]> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.get<string[]>(`/api/users/${userId}/programs/${programId}/git/branches`);
  }

  createBranch(branchName: string): Observable<any> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.post(`/api/users/${userId}/programs/${programId}/git/branches`, { branchName });
  }

  switchBranch(branchName: string): Observable<any> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.post(`/api/users/${userId}/programs/${programId}/git/branches/switch`, { branchName });
  }

  getCommits(count: number = 20): Observable<CommitInfo[]> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.get<CommitInfo[]>(`/api/users/${userId}/programs/${programId}/git/commits?count=${count}`);
  }

  getLastPushedCommit(): Observable<{ commitSha: string | null; message?: string }> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.get<{ commitSha: string | null; message?: string }>(`/api/users/${userId}/programs/${programId}/git/last-pushed-commit`);
  }

  resetToCommit(commitSha: string): Observable<any> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.post(`/api/users/${userId}/programs/${programId}/git/reset-to-commit`, { commitSha });
  }

  resetAllRepositories(): Observable<any> {
    return this.http.post(`/api/git/reset`, {});
  }
}
