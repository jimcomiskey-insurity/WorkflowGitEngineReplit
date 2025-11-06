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
    path: 'assets',
    loadComponent: () => import('./asset-list/asset-list.component').then(m => m.AssetListComponent)
  },
  {
    path: 'assets/new',
    loadComponent: () => import('./asset-editor/asset-editor.component').then(m => m.AssetEditorComponent)
  },
  {
    path: 'assets/edit/:id',
    loadComponent: () => import('./asset-editor/asset-editor.component').then(m => m.AssetEditorComponent)
  },
  {
    path: 'assets/diff/:id',
    loadComponent: () => import('./asset-diff-viewer/asset-diff-viewer.component').then(m => m.AssetDiffViewerComponent)
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
  },
  {
    path: 'pull-requests/:number/resolve-conflicts',
    loadComponent: () => import('./conflict-resolution/conflict-resolution.component').then(m => m.ConflictResolutionComponent)
  },
  {
    path: 'branch-comparison',
    loadComponent: () => import('./branch-comparison/branch-comparison.component').then(m => m.BranchComparisonComponent)
  },
  {
    path: 'datastores',
    loadComponent: () => import('./datastores/datastores.component').then(m => m.DataStoresComponent)
  },
  {
    path: 'datastores/:id',
    loadComponent: () => import('./datastore-editor/datastore-editor.component').then(m => m.DataStoreEditorComponent)
  }
];
