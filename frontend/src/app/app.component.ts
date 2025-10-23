import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, merge } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { WorkflowService } from './services/workflow.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  template: `
    <div class="app-container">
      <header class="top-header">
        <div class="header-content">
          <div class="header-title">Insurance Workflow Configuration</div>
          <div class="user-selector">
            <label for="user-select">User:</label>
            <select id="user-select" [(ngModel)]="currentUser" (change)="onUserChange()">
              <option *ngFor="let user of availableUsers" [value]="user">{{ user }}</option>
            </select>
          </div>
        </div>
      </header>
      <div class="content-wrapper">
        <aside class="sidebar">
          <div class="sidebar-header">
            <div class="logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                <path d="M14 2v6h6"/>
              </svg>
              <div>
                <div class="logo-title">Workflow Designer</div>
                <div class="logo-subtitle">Insurance Programs</div>
              </div>
            </div>
          </div>
          
          <nav class="sidebar-nav">
            <div class="nav-section">Navigation</div>
            <a routerLink="/workflows" routerLinkActive="active" class="nav-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                <path d="M14 2v6h6"/>
              </svg>
              <span>Workflows</span>
            </a>
            <a routerLink="/version-control" routerLinkActive="active" class="nav-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="18" r="3"></circle>
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="18" cy="6" r="3"></circle>
                <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path>
                <path d="M12 12v3"></path>
              </svg>
              <span>Version Control</span>
            </a>
            <a routerLink="/pending-changes" routerLinkActive="active" class="nav-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              <span>Pending Changes</span>
              <span class="badge" *ngIf="pendingChangesCount > 0">{{ pendingChangesCount }}</span>
            </a>
            <a routerLink="/pull-requests" routerLinkActive="active" class="nav-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="18" r="3"></circle>
                <circle cx="6" cy="6" r="3"></circle>
                <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                <line x1="6" y1="9" x2="6" y2="21"></line>
              </svg>
              <span>Pull Requests</span>
            </a>
          </nav>
        </aside>
        
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }

    .top-header {
      height: 56px;
      background-color: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
      flex-shrink: 0;
      z-index: 100;
    }

    .header-content {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
    }

    .header-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .user-selector {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .user-selector label {
      font-size: 14px;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .user-selector select {
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

    .user-selector select:hover {
      background-color: var(--bg-hover);
      border-color: var(--accent-blue);
    }

    .user-selector select:focus {
      outline: none;
      border-color: var(--accent-blue);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .content-wrapper {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    
    .sidebar {
      width: 240px;
      background-color: var(--bg-secondary);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    
    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid var(--border-color);
    }
    
    .logo {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      color: var(--accent-blue);
    }
    
    .logo svg {
      flex-shrink: 0;
      margin-top: 2px;
    }
    
    .logo-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.3;
    }
    
    .logo-subtitle {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.3;
    }
    
    .sidebar-nav {
      padding: 20px 12px;
      flex: 1;
      overflow-y: auto;
    }
    
    .nav-section {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-muted);
      padding: 0 12px 8px;
      letter-spacing: 0.5px;
    }
    
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: 6px;
      margin-bottom: 4px;
      font-size: 14px;
      transition: all 0.2s;
    }
    
    .nav-item:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }
    
    .nav-item.active {
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
    }
    
    .main-content {
      flex: 1;
      overflow-y: auto;
      background-color: var(--bg-primary);
    }

    .badge {
      margin-left: auto;
      background: var(--accent-blue);
      color: white;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Insurance Workflow Configuration';
  pendingChangesCount = 0;
  currentUser: string;
  availableUsers: string[];
  private destroy$ = new Subject<void>();

  constructor(
    private workflowService: WorkflowService,
    private userService: UserService
  ) {
    this.currentUser = this.userService.getCurrentUser();
    this.availableUsers = this.userService.getAvailableUsers();
  }

  ngOnInit() {
    // Subscribe to user changes and reload data
    merge(this.userService.currentUser$)
      .pipe(
        switchMap(() => this.workflowService.getWorkflows()),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          this.pendingChangesCount = this.countAllChanges(response.workflows);
        },
        error: (error) => {
          console.error('Error loading pending changes count:', error);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onUserChange() {
    this.userService.setCurrentUser(this.currentUser);
  }

  countAllChanges(workflows: any[]): number {
    let total = 0;
    
    workflows.forEach(workflow => {
      if (workflow.gitStatus && workflow.gitStatus !== 'none') {
        total++;
      }
      
      workflow.phases?.forEach((phase: any) => {
        if (phase.gitStatus && phase.gitStatus !== 'none') {
          total++;
        }
        
        phase.tasks?.forEach((task: any) => {
          if (task.gitStatus && task.gitStatus !== 'none') {
            total++;
          }
        });
      });
    });
    
    return total;
  }
}
