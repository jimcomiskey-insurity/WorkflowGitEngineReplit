import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { ProgramStateService } from './program-state.service';

export interface TaskItem {
  taskId?: string;
  taskName: string;
  taskType: string;
  assignedRole: string;
  estimatedDurationHours: number;
  dependencies: string[];
  isAutomated: boolean;
  gitStatus?: string;
}

export interface Phase {
  phaseName: string;
  phaseOrder: number;
  tasks: TaskItem[];
  gitStatus?: string;
}

export interface Workflow {
  workflowName: string;
  workflowKey: string;
  description: string;
  phases: Phase[];
  gitStatus?: string;
}

export interface ProgramWorkflows {
  workflows: Workflow[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private programStateService = inject(ProgramStateService);

  getWorkflows(): Observable<ProgramWorkflows> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.get<ProgramWorkflows>(`/api/users/${userId}/programs/${programId}/workflows`);
  }

  getWorkflow(key: string): Observable<Workflow> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.get<Workflow>(`/api/users/${userId}/programs/${programId}/workflows/${key}`);
  }

  createWorkflow(workflow: Workflow): Observable<Workflow> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.post<Workflow>(`/api/users/${userId}/programs/${programId}/workflows`, workflow);
  }

  updateWorkflow(key: string, workflow: Workflow): Observable<Workflow> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.put<Workflow>(`/api/users/${userId}/programs/${programId}/workflows/${key}`, workflow);
  }

  deleteWorkflow(key: string): Observable<void> {
    const userId = this.userService.getCurrentUser();
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.delete<void>(`/api/users/${userId}/programs/${programId}/workflows/${key}`);
  }
}
