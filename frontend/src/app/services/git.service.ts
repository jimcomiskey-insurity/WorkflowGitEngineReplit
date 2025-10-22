import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GitStatus {
  Added: string[];
  Modified: string[];
  Removed: string[];
  Untracked: string[];
  CurrentBranch: string;
  IsDirty: boolean;
}

export interface CommitRequest {
  Message: string;
  AuthorName: string;
  AuthorEmail: string;
}

export interface CommitInfo {
  Sha: string;
  Message: string;
  Author: string;
  Date: string;
}

@Injectable({
  providedIn: 'root'
})
export class GitService {
  private apiUrl = 'http://localhost:8000/api/git';
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

  getCommits(count: number = 20): Observable<CommitInfo[]> {
    return this.http.get<CommitInfo[]>(`${this.apiUrl}/commits?userId=${this.userId}&count=${count}`);
  }
}
