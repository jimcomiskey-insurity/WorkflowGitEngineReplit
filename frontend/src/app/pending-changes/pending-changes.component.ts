import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Workflow, Phase, TaskItem } from '../services/workflow.service';
import { WorkflowStateService } from '../services/workflow-state.service';
import { AssetStateService } from '../services/asset-state.service';
import { Asset } from '../services/asset.service';
import { DataStoreStateService, DataStore } from '../services/datastore-state.service';
import { DataStoresService } from '../services/datastores.service';

interface ExtendedPhase extends Phase {
  collapsed: boolean;
}

interface ExtendedWorkflow extends Workflow {
  phases: ExtendedPhase[];
  hasChanges: boolean;
  changeCount: number;
}

@Component({
  selector: 'app-pending-changes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-changes.component.html',
  styleUrls: ['./pending-changes.component.css']
})
export class PendingChangesComponent implements OnInit, OnDestroy {
  workflows: ExtendedWorkflow[] = [];
  filteredWorkflows: ExtendedWorkflow[] = [];
  assets: Asset[] = [];
  filteredAssets: Asset[] = [];
  dataStores: DataStore[] = [];
  filteredDataStores: DataStore[] = [];
  selectedFilter: 'all' | 'added' | 'modified' | 'deleted' = 'all';
  totalChanges = 0;
  private destroy$ = new Subject<void>();
  private dataStoresService = inject(DataStoresService);
  currentUser = 'userA';

  constructor(
    private workflowStateService: WorkflowStateService,
    private assetStateService: AssetStateService,
    private dataStoreStateService: DataStoreStateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.workflowStateService.workflows$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (workflows) => {
        this.workflows = workflows
          .map(w => this.extendWorkflow(w))
          .filter(w => w.hasChanges);
        
        this.calculateTotalChanges();
        this.applyFilter();
      },
      error: (error) => {
        console.error('Error loading workflows:', error);
      }
    });

    this.assetStateService.assets$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (assets) => {
        this.assets = assets.filter(a => this.hasAssetChanges(a));
        
        this.calculateTotalChanges();
        this.applyFilter();
      },
      error: (error) => {
        console.error('Error loading assets:', error);
      }
    });

    this.dataStoreStateService.dataStores$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (dataStores) => {
        console.log('[PendingChanges] Received datastores:', dataStores.length, 'datastores');
        dataStores.forEach(ds => {
          console.log(`[PendingChanges] DataStore ${ds.id} (${ds.name}) gitStatus:`, ds.gitStatus);
        });
        this.dataStores = dataStores.filter(ds => this.hasDataStoreChanges(ds));
        console.log('[PendingChanges] Datastores with changes:', this.dataStores.length);
        
        this.calculateTotalChanges();
        this.applyFilter();
      },
      error: (error) => {
        console.error('Error loading datastores:', error);
      }
    });

    // Trigger manual refresh of datastores to get latest Git status
    this.dataStoresService.getAllDataStores(this.currentUser).subscribe({
      error: (error) => {
        console.error('Error loading datastores:', error);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  extendWorkflow(workflow: Workflow): ExtendedWorkflow {
    const extendedPhases = workflow.phases.map(phase => ({
      ...phase,
      collapsed: false
    } as ExtendedPhase));

    const hasChanges = this.workflowHasChanges(workflow);
    const changeCount = this.countChanges(workflow);

    return {
      ...workflow,
      phases: extendedPhases,
      hasChanges,
      changeCount
    };
  }

  workflowHasChanges(workflow: Workflow): boolean {
    if (workflow.gitStatus && workflow.gitStatus !== 'none') {
      return true;
    }

    return workflow.phases.some(phase => {
      if (phase.gitStatus && phase.gitStatus !== 'none') {
        return true;
      }
      return phase.tasks.some(task => task.gitStatus && task.gitStatus !== 'none');
    });
  }

  hasAssetChanges(asset: Asset): boolean {
    return asset.gitStatus !== undefined && 
           asset.gitStatus !== null && 
           asset.gitStatus !== 'none';
  }

  hasDataStoreChanges(dataStore: DataStore): boolean {
    if (dataStore.gitStatus && dataStore.gitStatus !== 'none') {
      return true;
    }
    return dataStore.dataGroups.some(dg => this.hasDataGroupChanges(dg));
  }

  hasDataGroupChanges(dataGroup: any): boolean {
    if (dataGroup.gitStatus && dataGroup.gitStatus !== 'none') {
      return true;
    }
    if (dataGroup.dataPoints.some((dp: any) => dp.gitStatus && dp.gitStatus !== 'none')) {
      return true;
    }
    return dataGroup.childGroups.some((cg: any) => this.hasDataGroupChanges(cg));
  }

  countChanges(workflow: Workflow): number {
    let count = 0;
    
    if (workflow.gitStatus && workflow.gitStatus !== 'none') {
      count++;
    }

    workflow.phases.forEach(phase => {
      if (phase.gitStatus && phase.gitStatus !== 'none') {
        count++;
      }
      phase.tasks.forEach(task => {
        if (task.gitStatus && task.gitStatus !== 'none') {
          count++;
        }
      });
    });

    return count;
  }

  calculateTotalChanges() {
    const workflowChanges = this.workflows.reduce((sum, w) => sum + w.changeCount, 0);
    const assetChanges = this.assets.filter(a => this.hasAssetChanges(a)).length;
    const dataStoreChanges = this.dataStores.reduce((sum, ds) => sum + this.countDataStoreChanges(ds), 0);
    this.totalChanges = workflowChanges + assetChanges + dataStoreChanges;
  }

  countDataStoreChanges(dataStore: DataStore): number {
    let count = 0;
    if (dataStore.gitStatus && dataStore.gitStatus !== 'none') {
      count++;
    }
    dataStore.dataGroups.forEach(dg => {
      count += this.countDataGroupChanges(dg);
    });
    return count;
  }

  countDataGroupChanges(dataGroup: any): number {
    let count = 0;
    if (dataGroup.gitStatus && dataGroup.gitStatus !== 'none') {
      count++;
    }
    dataGroup.dataPoints.forEach((dp: any) => {
      if (dp.gitStatus && dp.gitStatus !== 'none') {
        count++;
      }
    });
    dataGroup.childGroups.forEach((cg: any) => {
      count += this.countDataGroupChanges(cg);
    });
    return count;
  }

  applyFilter() {
    if (this.selectedFilter === 'all') {
      this.filteredWorkflows = this.workflows;
      this.filteredAssets = this.assets;
      this.filteredDataStores = this.dataStores;
    } else {
      this.filteredWorkflows = this.workflows
        .map(w => this.filterWorkflowByStatus(w, this.selectedFilter))
        .filter(w => w.hasChanges);
      
      this.filteredAssets = this.assets
        .filter(a => a.gitStatus === this.selectedFilter);
      
      this.filteredDataStores = this.dataStores
        .filter(ds => this.dataStoreMatchesFilter(ds, this.selectedFilter));
    }
  }

  dataStoreMatchesFilter(dataStore: DataStore, status: string): boolean {
    if (dataStore.gitStatus === status) {
      return true;
    }
    
    return dataStore.dataGroups.some(dg => this.dataGroupMatchesFilter(dg, status));
  }

  dataGroupMatchesFilter(dataGroup: any, status: string): boolean {
    if (dataGroup.gitStatus === status) {
      return true;
    }
    
    if (dataGroup.dataPoints.some((dp: any) => dp.gitStatus === status)) {
      return true;
    }
    
    return dataGroup.childGroups.some((cg: any) => this.dataGroupMatchesFilter(cg, status));
  }

  filterWorkflowByStatus(workflow: ExtendedWorkflow, status: string): ExtendedWorkflow {
    const filteredPhases = workflow.phases
      .map(phase => ({
        ...phase,
        tasks: phase.tasks.filter(task => task.gitStatus === status)
      }))
      .filter(phase => 
        phase.gitStatus === status || 
        phase.tasks.length > 0
      );

    const hasChanges = workflow.gitStatus === status || filteredPhases.length > 0;
    const changeCount = this.countFilteredChanges(workflow, filteredPhases, status);

    return {
      ...workflow,
      phases: filteredPhases,
      hasChanges,
      changeCount
    };
  }

  countFilteredChanges(workflow: Workflow, phases: Phase[], status: string): number {
    let count = 0;
    
    if (workflow.gitStatus === status) {
      count++;
    }

    phases.forEach(phase => {
      if (phase.gitStatus === status) {
        count++;
      }
      phase.tasks.forEach(task => {
        if (task.gitStatus === status) {
          count++;
        }
      });
    });

    return count;
  }

  setFilter(filter: 'all' | 'added' | 'modified' | 'deleted') {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  togglePhase(workflow: ExtendedWorkflow, phaseIndex: number) {
    workflow.phases[phaseIndex].collapsed = !workflow.phases[phaseIndex].collapsed;
  }

  getPhaseChangeCount(phase: Phase): number {
    let count = 0;
    if (phase.gitStatus && phase.gitStatus !== 'none') {
      count++;
    }
    phase.tasks.forEach(task => {
      if (task.gitStatus && task.gitStatus !== 'none') {
        count++;
      }
    });
    return count;
  }

  getPhaseChangeSummary(phase: Phase): string {
    const count = this.getPhaseChangeCount(phase);
    if (count === 0) {
      return '';
    }
    return count === 1 ? '1 change' : `${count} changes`;
  }

  formatFileSize(bytes?: number): string {
    if (!bytes) return '';
    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  }

  isEditableAssetFile(asset: Asset): boolean {
    if (!asset.fileName) return false;
    const extension = asset.fileName.split('.').pop()?.toLowerCase();
    return ['xml', 'json', 'xslt', 'txt'].includes(extension || '');
  }

  canViewDiff(asset: Asset): boolean {
    return asset.gitStatus === 'modified' && this.isEditableAssetFile(asset);
  }

  viewAssetDiff(assetId: string) {
    this.router.navigate(['/assets/diff', assetId]);
  }
}
