import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProgramService } from './program.service';
import { Program } from '../models/program.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramStateService {
  private programService = inject(ProgramService);
  private currentProgramIdSubject = new BehaviorSubject<string | null>(null);
  private programsSubject = new BehaviorSubject<Program[]>([]);

  currentProgramId$ = this.currentProgramIdSubject.asObservable();
  programs$ = this.programsSubject.asObservable();

  constructor() {
    const savedProgramId = sessionStorage.getItem('currentProgramId');
    const inContext = sessionStorage.getItem('inProgramContext');
    if (savedProgramId && inContext === 'true') {
      this.currentProgramIdSubject.next(savedProgramId);
    }
  }

  getCurrentProgramId(): string {
    return this.currentProgramIdSubject.value || 'default';
  }

  setCurrentProgramId(programId: string): void {
    this.currentProgramIdSubject.next(programId);
    sessionStorage.setItem('currentProgramId', programId);
  }

  loadPrograms(userId: string): void {
    this.programService.getAllPrograms(userId).subscribe({
      next: (programs) => {
        console.log('[ProgramStateService] Loaded programs:', programs.length);
        this.programsSubject.next(programs);
      },
      error: (error) => {
        console.error('[ProgramStateService] Error loading programs:', error);
        this.programsSubject.next([]);
      }
    });
  }

  refreshPrograms(userId: string): void {
    this.loadPrograms(userId);
  }

  enterProgram(programId: string): void {
    this.setCurrentProgramId(programId);
    sessionStorage.setItem('inProgramContext', 'true');
  }

  exitProgram(): void {
    sessionStorage.removeItem('inProgramContext');
    sessionStorage.removeItem('currentProgramId');
    this.currentProgramIdSubject.next(null);
  }

  isInProgramContext(): boolean {
    return sessionStorage.getItem('inProgramContext') === 'true';
  }

  clearState(): void {
    this.programsSubject.next([]);
  }

  async deleteProgram(programId: string, userId: string): Promise<void> {
    return this.programService.deleteProgram(userId, programId).toPromise();
  }
}
