import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workflow } from './workflow.service';

export interface PullRequest {
  number: number;
  title: string;
  description: string;
  sourceBranch: string;
  targetBranch: string;
  status: string;
  author: string;
  createdDate: string;
  mergedDate?: string;
}

export interface CreatePullRequestRequest {
  title: string;
  description: string;
  sourceBranch: string;
  targetBranch: string;
}

export interface WorkflowChange {
  workflowKey: string;
  workflowName: string;
  changeType: string;
  sourceWorkflow?: Workflow;
  targetWorkflow?: Workflow;
}

export interface BranchComparison {
  sourceBranch: string;
  targetBranch: string;
  commitsAhead: number;
  changes: WorkflowChange[];
}

@Injectable({
  providedIn: 'root'
})
export class PullRequestService {
  private apiUrl = '/api/pull-requests';

  constructor(private http: HttpClient) { }

  getPullRequests(userId: string, status?: string): Observable<PullRequest[]> {
    let params = new HttpParams().set('userId', userId);
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<PullRequest[]>(this.apiUrl, { params });
  }

  getPullRequest(userId: string, number: number): Observable<PullRequest> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<PullRequest>(`${this.apiUrl}/${number}`, { params });
  }

  getBranchComparison(userId: string, number: number): Observable<BranchComparison> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<BranchComparison>(`${this.apiUrl}/${number}/comparison`, { params });
  }

  createPullRequest(userId: string, request: CreatePullRequestRequest): Observable<PullRequest> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post<PullRequest>(this.apiUrl, request, { params });
  }

  mergePullRequest(userId: string, number: number): Observable<PullRequest> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post<PullRequest>(`${this.apiUrl}/${number}/merge`, {}, { params });
  }

  closePullRequest(userId: string, number: number): Observable<PullRequest> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post<PullRequest>(`${this.apiUrl}/${number}/close`, {}, { params });
  }
}
