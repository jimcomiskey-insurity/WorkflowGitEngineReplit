import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./workflow-list/workflow-list.component').then(m => m.WorkflowListComponent)
  },
  {
    path: 'workflow/:key',
    loadComponent: () => import('./workflow-editor/workflow-editor.component').then(m => m.WorkflowEditorComponent)
  },
  {
    path: 'workflow',
    loadComponent: () => import('./workflow-editor/workflow-editor.component').then(m => m.WorkflowEditorComponent)
  }
];
