import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgramStateService } from './program-state.service';

export interface ScriptInputValue {
  alias: string;
  dataType: string;
  testValue?: string;
  testWithNull: boolean;
}

export interface ScriptExecutionRequest {
  script: string;
  inputs: ScriptInputValue[];
}

export interface ScriptExecutionResult {
  success: boolean;
  result?: string;
  resultType?: string;
  error?: string;
}

export interface CompletionInput {
  alias: string;
  dataType: string;
}

export interface CompletionRequest {
  script: string;
  position: number;
  inputs: CompletionInput[];
}

export interface CompletionSuggestion {
  label: string;
  kind: string;
  insertText: string;
  detail?: string;
  documentation?: string;
}

export interface CompletionResponse {
  items: CompletionSuggestion[];
}

@Injectable({
  providedIn: 'root'
})
export class ScriptExecutionService {
  private http = inject(HttpClient);
  private programStateService = inject(ProgramStateService);

  executeScript(userId: string, request: ScriptExecutionRequest): Observable<ScriptExecutionResult> {
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.post<ScriptExecutionResult>(
      `/api/users/${userId}/programs/${programId}/script/execute`,
      request
    );
  }

  getCompletions(userId: string, request: CompletionRequest): Observable<CompletionResponse> {
    const programId = this.programStateService.getCurrentProgramId();
    return this.http.post<CompletionResponse>(
      `/api/users/${userId}/programs/${programId}/script/completions`,
      request
    );
  }
}
