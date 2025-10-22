import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskItem {
  TaskName: string;
  TaskType: string;
  AssignedRole: string;
  EstimatedDurationHours: number;
  Dependencies: string[];
  IsAutomated: boolean;
}

export interface Phase {
  PhaseName: string;
  PhaseOrder: number;
  Tasks: TaskItem[];
}

export interface Workflow {
  WorkflowName: string;
  WorkflowKey: string;
  Description: string;
  Phases: Phase[];
}

export interface ProgramWorkflows {
  Workflows: Workflow[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  private apiUrl = 'http://localhost:8000/api/workflows';
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
