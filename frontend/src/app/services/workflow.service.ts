import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

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

  constructor(private http: HttpClient, private userService: UserService) { }

  getWorkflows(): Observable<ProgramWorkflows> {
    const userId = this.userService.getCurrentUser();
    return this.http.get<ProgramWorkflows>(`${this.apiUrl}?userId=${userId}`);
  }

  getWorkflow(key: string): Observable<Workflow> {
    const userId = this.userService.getCurrentUser();
    return this.http.get<Workflow>(`${this.apiUrl}/${key}?userId=${userId}`);
  }

  createWorkflow(workflow: Workflow): Observable<Workflow> {
    const userId = this.userService.getCurrentUser();
    return this.http.post<Workflow>(`${this.apiUrl}?userId=${userId}`, workflow);
  }

  updateWorkflow(key: string, workflow: Workflow): Observable<Workflow> {
    const userId = this.userService.getCurrentUser();
    return this.http.put<Workflow>(`${this.apiUrl}/${key}?userId=${userId}`, workflow);
  }

  deleteWorkflow(key: string): Observable<void> {
    const userId = this.userService.getCurrentUser();
    return this.http.delete<void>(`${this.apiUrl}/${key}?userId=${userId}`);
  }
}
