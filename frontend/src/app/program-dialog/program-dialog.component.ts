import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgramService } from '../services/program.service';
import { UserService } from '../services/user.service';
import { Program } from '../models/program.model';

@Component({
  selector: 'app-program-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './program-dialog.component.html',
  styleUrl: './program-dialog.component.css'
})
export class ProgramDialogComponent implements OnInit {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() program: Program | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() programCreated = new EventEmitter<Program>();
  @Output() programUpdated = new EventEmitter<void>();

  programId = '';
  programName = '';
  programDescription = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private programService: ProgramService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.mode === 'edit' && this.program) {
      this.programId = this.program.id;
      this.programName = this.program.name;
      this.programDescription = this.program.description;
    }
  }

  async handleSubmit() {
    if (this.isSubmitting) return;

    this.errorMessage = '';

    if (!this.programName.trim()) {
      this.errorMessage = 'Program name is required';
      return;
    }

    if (this.mode === 'create' && !this.programId.trim()) {
      this.errorMessage = 'Program ID is required';
      return;
    }

    if (this.mode === 'create' && !/^[a-z0-9-]+$/.test(this.programId)) {
      this.errorMessage = 'Program ID can only contain lowercase letters, numbers, and hyphens';
      return;
    }

    this.isSubmitting = true;

    try {
      const currentUser = this.userService.getCurrentUser();

      if (this.mode === 'create') {
        const newProgram: Partial<Program> = {
          id: this.programId,
          name: this.programName,
          description: this.programDescription
        };
        
        const created = await this.programService.createProgram(currentUser, newProgram as Program).toPromise();
        this.programCreated.emit(created);
      } else {
        const updatedProgram = {
          ...this.program,
          name: this.programName,
          description: this.programDescription
        } as Program;

        await this.programService.updateProgram(currentUser, this.programId, updatedProgram).toPromise();
        this.programUpdated.emit();
      }
    } catch (error: any) {
      console.error('Error saving program:', error);
      this.errorMessage = error?.error?.message || error?.message || 'Failed to save program. Please try again.';
      this.isSubmitting = false;
    }
  }

  handleClose() {
    this.close.emit();
  }
}
