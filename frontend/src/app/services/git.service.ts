import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GitStatus {
  added: string[];
  modified: string[];
  removed: string[];
  untracked: string[];
  currentBranch: string;
  isDirty: boolean;
  commitsAhead: number;
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
  private userId = 'default';

  constructor(private http: HttpClient) { }

  getStatus(): Observable<GitStatus> {
    return this.http.get<GitStatus>(`${this.apiUrl}/status?userId=${this.userId}`);
  }

  commit(request: CommitRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/commit?userId=${this.userId}`, request);
  }

  discard(): Observable<any> {
    return this.http.post(`${this.apiUrl}/discard?userId=${this.userId}`, {});
  }

  pull(): Observable<any> {
    return this.http.post(`${this.apiUrl}/pull?userId=${this.userId}`, {});
  }

  push(): Observable<any> {
    return this.http.post(`${this.apiUrl}/push?userId=${this.userId}`, {});
  }

  getBranches(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/branches?userId=${this.userId}`);
  }

  createBranch(branchName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/branches?userId=${this.userId}`, { branchName });
  }

  switchBranch(branchName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/branches/switch?userId=${this.userId}`, { branchName });
  }

  getCommits(count: number = 20): Observable<CommitInfo[]> {
    return this.http.get<CommitInfo[]>(`${this.apiUrl}/commits?userId=${this.userId}&count=${count}`);
  }
}
