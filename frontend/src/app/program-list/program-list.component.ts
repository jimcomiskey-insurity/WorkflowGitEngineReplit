import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgramStateService } from '../services/program-state.service';
import { UserService } from '../services/user.service';
import { Program } from '../models/program.model';
import { ProgramDialogComponent } from '../program-dialog/program-dialog.component';

@Component({
  selector: 'app-program-list',
  standalone: true,
  imports: [CommonModule, ProgramDialogComponent],
  templateUrl: './program-list.component.html',
  styleUrl: './program-list.component.css'
})
export class ProgramListComponent implements OnInit, OnDestroy {
  programs: Program[] = [];
  currentUser: string;
  showCreateDialog = false;
  showEditDialog = false;
  showDeleteDialog = false;
  editingProgram: Program | null = null;
  deletingProgram: Program | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private programStateService: ProgramStateService,
    private userService: UserService,
    private router: Router
  ) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit() {
    this.programStateService.loadPrograms(this.currentUser);
    
    this.programStateService.programs$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (programs) => {
          this.programs = programs;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openProgram(program: Program) {
    this.programStateService.enterProgram(program.id);
    this.router.navigate(['/programs', program.id, 'workflows']);
  }

  openCreateDialog() {
    this.showCreateDialog = true;
  }

  closeCreateDialog() {
    this.showCreateDialog = false;
  }

  openEditDialog(program: Program, event: Event) {
    event.stopPropagation();
    this.editingProgram = program;
    this.showEditDialog = true;
  }

  closeEditDialog() {
    this.showEditDialog = false;
    this.editingProgram = null;
  }

  openDeleteDialog(program: Program, event: Event) {
    event.stopPropagation();
    this.deletingProgram = program;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
    this.deletingProgram = null;
  }

  handleProgramCreated(program: Program) {
    this.closeCreateDialog();
    this.programStateService.loadPrograms(this.currentUser);
  }

  handleProgramUpdated() {
    this.closeEditDialog();
    this.programStateService.loadPrograms(this.currentUser);
  }

  async handleDeleteConfirm() {
    if (!this.deletingProgram) return;

    try {
      await this.programStateService.deleteProgram(this.deletingProgram.id, this.currentUser);
      this.closeDeleteDialog();
      this.programStateService.loadPrograms(this.currentUser);
    } catch (error) {
      console.error('Error deleting program:', error);
      alert('Failed to delete program. Please try again.');
    }
  }
}
