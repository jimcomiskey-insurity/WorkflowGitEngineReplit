import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Program } from '../models/program.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private http = inject(HttpClient);
  private apiUrl = '/api/users';

  getAllPrograms(userId: string): Observable<Program[]> {
    return this.http.get<Program[]>(`${this.apiUrl}/${userId}/programs`);
  }

  getProgram(userId: string, programId: string): Observable<Program> {
    return this.http.get<Program>(`${this.apiUrl}/${userId}/programs/${programId}`);
  }

  createProgram(userId: string, program: Program): Observable<Program> {
    return this.http.post<Program>(`${this.apiUrl}/${userId}/programs`, program);
  }

  updateProgram(userId: string, programId: string, program: Program): Observable<Program> {
    return this.http.put<Program>(`${this.apiUrl}/${userId}/programs/${programId}`, program);
  }

  deleteProgram(userId: string, programId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/programs/${programId}`);
  }
}
