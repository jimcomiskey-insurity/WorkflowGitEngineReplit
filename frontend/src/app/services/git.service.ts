import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

export interface GitStatus {
  added: string[];
  modified: string[];
  removed: string[];
  untracked: string[];
  currentBranch: string;
  isDirty: boolean;
  commitsAhead: number;
  commitsBehind: number;
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
  private apiUrl = '/api/git';

  constructor(private http: HttpClient, private userService: UserService) { }

  getStatus(): Observable<GitStatus> {
    const userId = this.userService.getCurrentUser();
    return this.http.get<GitStatus>(`${this.apiUrl}/status?userId=${userId}`);
  }

  commit(request: CommitRequest): Observable<any> {
    const userId = this.userService.getCurrentUser();
    return this.http.post(`${this.apiUrl}/commit?userId=${userId}`, request);
  }

  discard(): Observable<any> {
    const userId = this.userService.getCurrentUser();
    return this.http.post(`${this.apiUrl}/discard?userId=${userId}`, {});
  }

  pull(): Observable<any> {
    const userId = this.userService.getCurrentUser();
    return this.http.post(`${this.apiUrl}/pull?userId=${userId}`, {});
  }

  push(): Observable<any> {
    const userId = this.userService.getCurrentUser();
    return this.http.post(`${this.apiUrl}/push?userId=${userId}`, {});
  }

  getBranches(): Observable<string[]> {
    const userId = this.userService.getCurrentUser();
    return this.http.get<string[]>(`${this.apiUrl}/branches?userId=${userId}`);
  }

  createBranch(branchName: string): Observable<any> {
    const userId = this.userService.getCurrentUser();
    return this.http.post(`${this.apiUrl}/branches?userId=${userId}`, { branchName });
  }

  switchBranch(branchName: string): Observable<any> {
    const userId = this.userService.getCurrentUser();
    return this.http.post(`${this.apiUrl}/branches/switch?userId=${userId}`, { branchName });
  }

  getCommits(count: number = 20): Observable<CommitInfo[]> {
    const userId = this.userService.getCurrentUser();
    return this.http.get<CommitInfo[]>(`${this.apiUrl}/commits?userId=${userId}&count=${count}`);
  }

  resetAllRepositories(): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset`, {});
  }
}
