import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { ProgramStateService } from './services/program-state.service';
import { UserService } from './services/user.service';
import { GitStateService } from './services/git-state.service';
import { WorkflowStateService } from './services/workflow-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  template: `
    <div class="app-root">
      <div class="user-selector-overlay" *ngIf="!isInProgramContext">
        <div class="user-selector-container">
          <label for="user-select">Current User:</label>
          <select id="user-select" [(ngModel)]="currentUser" (ngModelChange)="onUserChange($event)">
            <option *ngFor="let user of availableUsers" [value]="user">{{ user }}</option>
          </select>
        </div>
      </div>
      <div class="user-selector-overlay user-selector-in-program" *ngIf="isInProgramContext">
        <div class="user-selector-container">
          <label for="user-select-program">User:</label>
          <select id="user-select-program" [(ngModel)]="currentUser" (ngModelChange)="onUserChange($event)">
            <option *ngFor="let user of availableUsers" [value]="user">{{ user }}</option>
          </select>
        </div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-root {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }

    .user-selector-overlay {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 1001;
    }

    .user-selector-in-program {
      top: 8px;
      right: 160px;
    }

    .user-selector-container {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px;
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .user-selector-container label {
      font-size: 14px;
      color: var(--text-secondary);
      font-weight: 500;
      white-space: nowrap;
    }

    .user-selector-container select {
      padding: 6px 12px;
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      min-width: 120px;
      transition: all 0.2s;
    }

    .user-selector-container select:hover {
      background-color: var(--bg-hover);
      border-color: var(--accent-blue);
    }

    .user-selector-container select:focus {
      outline: none;
      border-color: var(--accent-blue);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser: string;
  availableUsers: string[];
  isInProgramContext = false;
  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private programStateService: ProgramStateService,
    private gitStateService: GitStateService,
    private workflowStateService: WorkflowStateService,
    private router: Router
  ) {
    this.currentUser = this.userService.getCurrentUser();
    this.availableUsers = this.userService.getAvailableUsers();
    this.isInProgramContext = this.programStateService.isInProgramContext();
  }

  ngOnInit() {
    this.programStateService.loadPrograms(this.currentUser);

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.isInProgramContext = this.programStateService.isInProgramContext();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onUserChange(newUser: string) {
    this.userService.setCurrentUser(newUser);
    this.programStateService.loadPrograms(newUser);
    window.location.reload();
  }
}
