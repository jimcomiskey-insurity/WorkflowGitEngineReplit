import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/workflows',
    pathMatch: 'full'
  },
  {
    path: 'workflows',
    loadComponent: () => import('./workflow-list/workflow-list.component').then(m => m.WorkflowListComponent)
  },
  {
    path: 'workflows/new',
    loadComponent: () => import('./workflow-editor/workflow-editor.component').then(m => m.WorkflowEditorComponent)
  },
  {
    path: 'workflows/edit/:key',
    loadComponent: () => import('./workflow-editor/workflow-editor.component').then(m => m.WorkflowEditorComponent)
  },
  {
    path: 'version-control',
    loadComponent: () => import('./version-control/version-control.component').then(m => m.VersionControlComponent)
  },
  {
    path: 'pending-changes',
    loadComponent: () => import('./pending-changes/pending-changes.component').then(m => m.PendingChangesComponent)
  },
  {
    path: 'pull-requests',
    loadComponent: () => import('./pull-requests/pull-requests.component').then(m => m.PullRequestsComponent)
  },
  {
    path: 'pull-requests/:number',
    loadComponent: () => import('./pull-request-detail/pull-request-detail.component').then(m => m.PullRequestDetailComponent)
  }
];
