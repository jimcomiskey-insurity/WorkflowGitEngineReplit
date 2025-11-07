import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workflow } from './workflow.service';
import { ProgramStateService } from './program-state.service';

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

export interface PullRequestSuggestion {
  title: string;
  description: string;
  commitCount: number;
}

export interface WorkflowChange {
  workflowKey: string;
  workflowName: string;
  changeType: string;
  sourceWorkflow?: Workflow;
  targetWorkflow?: Workflow;
}

export interface CommitInfo {
  sha: string;
  message: string;
  author: string;
  date: string;
  changes: WorkflowChange[];
}

export interface AssetChange {
  assetId: string;
  assetName: string;
  changeType: string;
  sourceAsset?: any;
  targetAsset?: any;
  fileContentChanged: boolean;
}

export interface BranchComparison {
  sourceBranch: string;
  targetBranch: string;
  commitsAhead: number;
  commitsBehind: number;
  changes: WorkflowChange[];
  assetChanges: AssetChange[];
  commits: CommitInfo[];
  sourceCommitSha?: string;
  targetCommitSha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PullRequestService {
  private http = inject(HttpClient);
  private programStateService = inject(ProgramStateService);

  getPullRequests(userId: string, status?: string): Observable<PullRequest[]> {
    const programId = this.programStateService.getCurrentProgramId();
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<PullRequest[]>(`/api/users/${userId}/programs/${programId}/pull-requests`, { params });
  }

  getPullRequest(userId: string, number: number): Observable<PullRequest> {
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.get<PullRequest>(`/api/users/${userId}/programs/${programId}/pull-requests/${number}`);
  }

  getBranchComparison(userId: string, number: number): Observable<BranchComparison> {
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.get<BranchComparison>(`/api/users/${userId}/programs/${programId}/pull-requests/${number}/comparison`);
  }

  getPullRequestSuggestion(sourceBranch: string, targetBranch: string): Observable<PullRequestSuggestion> {
    const params = new HttpParams()
      .set('sourceBranch', sourceBranch)
      .set('targetBranch', targetBranch);
    return this.http.get<PullRequestSuggestion>(`/api/pull-requests/suggestion`, { params });
  }

  createPullRequest(userId: string, request: CreatePullRequestRequest): Observable<PullRequest> {
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.post<PullRequest>(`/api/users/${userId}/programs/${programId}/pull-requests`, request);
  }

  mergePullRequest(userId: string, number: number): Observable<PullRequest> {
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.post<PullRequest>(`/api/users/${userId}/programs/${programId}/pull-requests/${number}/merge`, {});
  }

  closePullRequest(userId: string, number: number): Observable<PullRequest> {
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.post<PullRequest>(`/api/users/${userId}/programs/${programId}/pull-requests/${number}/close`, {});
  }

  compareBranches(userId: string, sourceBranch: string, targetBranch: string): Observable<BranchComparison> {
    const programId = this.programStateService.getCurrentProgramId();
    const params = new HttpParams()
      .set('sourceBranch', sourceBranch)
      .set('targetBranch', targetBranch);
    return this.http.get<BranchComparison>(`/api/users/${userId}/programs/${programId}/git/compare-branches`, { params });
  }

  getFileAtCommit(userId: string, commitSha: string, filePath: string): Observable<{ content: string }> {
    const programId = this.programStateService.getCurrentProgramId();
    const params = new HttpParams()
      .set('commitSha', commitSha)
      .set('filePath', filePath);
    return this.http.get<{ content: string }>(`/api/users/${userId}/programs/${programId}/git/file-at-commit`, { params });
  }
}
