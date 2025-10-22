import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskItem {
  taskName: string;
  taskType: string;
  assignedRole: string;
  estimatedDurationHours: number;
  dependencies: string[];
  isAutomated: boolean;
}

export interface Phase {
  phaseName: string;
  phaseOrder: number;
  tasks: TaskItem[];
}

export interface Workflow {
  workflowName: string;
  workflowKey: string;
  description: string;
  phases: Phase[];
}

export interface ProgramWorkflows {
  workflows: Workflow[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  private apiUrl = '/api/workflows';
  private userId = 'default';

  constructor(private http: HttpClient) { }

  getWorkflows(): Observable<ProgramWorkflows> {
    return this.http.get<ProgramWorkflows>(`${this.apiUrl}?userId=${this.userId}`);
  }

  getWorkflow(key: string): Observable<Workflow> {
    return this.http.get<Workflow>(`${this.apiUrl}/${key}?userId=${this.userId}`);
  }

  createWorkflow(workflow: Workflow): Observable<Workflow> {
    return this.http.post<Workflow>(`${this.apiUrl}?userId=${this.userId}`, workflow);
  }

  updateWorkflow(key: string, workflow: Workflow): Observable<Workflow> {
    return this.http.put<Workflow>(`${this.apiUrl}/${key}?userId=${this.userId}`, workflow);
  }

  deleteWorkflow(key: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${key}?userId=${this.userId}`);
  }
}
