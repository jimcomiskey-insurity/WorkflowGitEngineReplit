import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { ProgramStateService } from '../services/program-state.service';
import { GitStateService } from '../services/git-state.service';
import { GitToolbarComponent } from '../git-toolbar/git-toolbar.component';
import { Program } from '../models/program.model';

@Component({
  selector: 'app-program-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, GitToolbarComponent],
  templateUrl: './program-shell.component.html',
  styleUrl: './program-shell.component.css'
})
export class ProgramShellComponent implements OnInit, OnDestroy {
  currentProgram: Program | null = null;
  pendingChangesCount = 0;
  swaggerUrl = '/swagger';
  private destroy$ = new Subject<void>();

  constructor(
    private programStateService: ProgramStateService,
    private gitStateService: GitStateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.programStateService.programs$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (programs) => {
          const currentId = this.programStateService.getCurrentProgramId();
          this.currentProgram = programs.find(p => p.id === currentId) || null;
        }
      });

    this.gitStateService.gitStatus$
      .pipe(
        takeUntil(this.destroy$),
        map(status => {
          if (!status) return 0;
          return (status.added?.length || 0) + 
                 (status.modified?.length || 0) + 
                 (status.removed?.length || 0) + 
                 (status.untracked?.length || 0);
        })
      )
      .subscribe({
        next: (count) => {
          this.pendingChangesCount = count;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  backToPrograms() {
    this.programStateService.exitProgram();
    this.router.navigate(['/programs']);
  }
}
