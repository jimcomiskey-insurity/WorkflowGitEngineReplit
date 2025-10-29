import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Workflow, Phase, TaskItem } from '../services/workflow.service';
import { WorkflowStateService } from '../services/workflow-state.service';
import { AssetStateService } from '../services/asset-state.service';
import { Asset } from '../services/asset.service';

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
  selectedFilter: 'all' | 'added' | 'modified' | 'deleted' = 'all';
  totalChanges = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private workflowStateService: WorkflowStateService,
    private assetStateService: AssetStateService
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
    this.totalChanges = workflowChanges + assetChanges;
  }

  applyFilter() {
    if (this.selectedFilter === 'all') {
      this.filteredWorkflows = this.workflows;
      this.filteredAssets = this.assets;
    } else {
      this.filteredWorkflows = this.workflows
        .map(w => this.filterWorkflowByStatus(w, this.selectedFilter))
        .filter(w => w.hasChanges);
      
      this.filteredAssets = this.assets
        .filter(a => a.gitStatus === this.selectedFilter);
    }
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
}
