import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

interface FieldConflict {
  fieldName: string;
  baseValue: string | null;
  currentValue: string | null;
  incomingValue: string | null;
  resolution?: string;
}

interface TaskConflict {
  taskId: string;
  taskName: string;
  fieldConflicts: FieldConflict[];
}

interface PhaseConflict {
  phaseName: string;
  phaseOrder: number;
  fieldConflicts: FieldConflict[];
  taskConflicts: TaskConflict[];
}

interface WorkflowConflict {
  workflowKey: string;
  workflowName: string;
  fieldConflicts: FieldConflict[];
  phaseConflicts: PhaseConflict[];
}

enum ConflictObjectType {
  Workflow = 0,
  Phase = 1,
  Task = 2
}

interface DeletionConflict {
  objectType: ConflictObjectType;
  workflowKey: string;
  phaseName?: string;
  taskId?: string;
  objectIdentifier: string;
  objectDisplayName: string;
  deletedInSource: boolean;
  modifiedInSource: boolean;
  deletedInTarget: boolean;
  modifiedInTarget: boolean;
  modifiedObjectJson?: string;
  resolution?: string;
}

interface AssetFileContentConflict {
  assetId: string;
  assetName: string;
  fileName: string;
  fileType: string;
  conflictedContent: string;
  hasConflictMarkers: boolean;
  resolution?: string;
}

interface MergeConflictInfo {
  workflowConflicts: WorkflowConflict[];
  deletionConflicts: DeletionConflict[];
  assetFileContentConflicts: AssetFileContentConflict[];
  sourceBranch: string;
  targetBranch: string;
  totalConflicts: number;
}

interface ConflictResolution {
  workflowKey: string;
  phaseName?: string;
  taskId?: string;
  fieldName: string;
  resolution: string;
  isDeletionConflict?: boolean;
  objectType?: ConflictObjectType;
}

interface AssetFileContentResolution {
  assetId: string;
  resolvedContent: string;
}

import { MonacoConflictEditorComponent } from '../monaco-conflict-editor/monaco-conflict-editor.component';

@Component({
  selector: 'app-conflict-resolution',
  standalone: true,
  imports: [CommonModule, FormsModule, MonacoConflictEditorComponent],
  templateUrl: './conflict-resolution.component.html',
  styleUrls: ['./conflict-resolution.component.css']
})
export class ConflictResolutionComponent implements OnInit {
  conflicts: MergeConflictInfo | null = null;
  prNumber: number = 0;
  loading = true;
  error: string | null = null;
  resolving = false;
  assetFileResolutions: Map<string, string> = new Map();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.prNumber = Number(this.route.snapshot.paramMap.get('number'));
    this.loadConflicts();
  }

  loadConflicts(): void {
    const userId = this.userService.getCurrentUser();
    this.http
      .get<MergeConflictInfo>(`/api/pull-requests/${this.prNumber}/conflicts?userId=${userId}`)
      .subscribe({
        next: (data) => {
          this.conflicts = data;
          this.initializeResolutions();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading conflicts:', err);
          this.error = 'Failed to load conflict information';
          this.loading = false;
        }
      });
  }

  private initializeResolutions(): void {
    if (!this.conflicts) return;

    this.conflicts.workflowConflicts.forEach(wc => {
      wc.fieldConflicts.forEach(fc => fc.resolution = 'incoming');
      wc.phaseConflicts.forEach(pc => {
        pc.fieldConflicts.forEach(fc => fc.resolution = 'incoming');
        pc.taskConflicts.forEach(tc => {
          tc.fieldConflicts.forEach(fc => fc.resolution = 'incoming');
        });
      });
    });

    // Initialize deletion conflict resolutions to 'keep' (prefer keeping modified objects)
    this.conflicts.deletionConflicts?.forEach(dc => {
      dc.resolution = 'keep';
    });
    
    // Initialize asset file conflict resolutions map
    this.assetFileResolutions.clear();
  }

  isAllResolved(): boolean {
    if (!this.conflicts) return false;

    for (const wc of this.conflicts.workflowConflicts) {
      if (wc.fieldConflicts.some(fc => !fc.resolution)) return false;
      for (const pc of wc.phaseConflicts) {
        if (pc.fieldConflicts.some(fc => !fc.resolution)) return false;
        for (const tc of pc.taskConflicts) {
          if (tc.fieldConflicts.some(fc => !fc.resolution)) return false;
        }
      }
    }

    // Check deletion conflicts are resolved
    if (this.conflicts.deletionConflicts?.some(dc => !dc.resolution)) {
      return false;
    }
    
    // Check asset file conflicts are resolved
    if (this.conflicts.assetFileContentConflicts && this.conflicts.assetFileContentConflicts.length > 0) {
      for (const afc of this.conflicts.assetFileContentConflicts) {
        if (!this.assetFileResolutions.has(afc.assetId)) {
          return false;
        }
      }
    }

    return true;
  }

  resolveAndMerge(): void {
    if (!this.conflicts || !this.isAllResolved()) return;

    const resolutions: ConflictResolution[] = [];

    this.conflicts.workflowConflicts.forEach(wc => {
      wc.fieldConflicts.forEach(fc => {
        if (fc.resolution) {
          resolutions.push({
            workflowKey: wc.workflowKey,
            fieldName: fc.fieldName,
            resolution: fc.resolution
          });
        }
      });

      wc.phaseConflicts.forEach(pc => {
        pc.fieldConflicts.forEach(fc => {
          if (fc.resolution) {
            resolutions.push({
              workflowKey: wc.workflowKey,
              phaseName: pc.phaseName,
              fieldName: fc.fieldName,
              resolution: fc.resolution
            });
          }
        });

        pc.taskConflicts.forEach(tc => {
          tc.fieldConflicts.forEach(fc => {
            if (fc.resolution) {
              resolutions.push({
                workflowKey: wc.workflowKey,
                phaseName: pc.phaseName,
                taskId: tc.taskId,
                fieldName: fc.fieldName,
                resolution: fc.resolution
              });
            }
          });
        });
      });
    });

    // Add deletion conflict resolutions
    this.conflicts.deletionConflicts?.forEach(dc => {
      if (dc.resolution) {
        resolutions.push({
          workflowKey: dc.workflowKey,
          phaseName: dc.phaseName,
          taskId: dc.taskId,
          fieldName: '_deletion',
          resolution: dc.resolution,
          isDeletionConflict: true,
          objectType: dc.objectType
        });
      }
    });
    
    // Add asset file conflict resolutions
    const assetFileResolutions: AssetFileContentResolution[] = [];
    this.assetFileResolutions.forEach((resolvedContent, assetId) => {
      assetFileResolutions.push({
        assetId: assetId,
        resolvedContent: resolvedContent
      });
    });

    this.resolving = true;
    const userId = this.userService.getCurrentUser();

    this.http
      .post(`/api/pull-requests/${this.prNumber}/resolve-conflicts?userId=${userId}`, {
        resolutions,
        assetFileResolutions
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/pull-requests', this.prNumber]);
        },
        error: (err) => {
          console.error('Error resolving conflicts:', err);
          this.error = 'Failed to resolve conflicts and merge';
          this.resolving = false;
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/pull-requests', this.prNumber]);
  }

  getConflictCount(wc: WorkflowConflict): number {
    let count = wc.fieldConflicts.length;
    wc.phaseConflicts.forEach(pc => {
      count += pc.fieldConflicts.length;
      pc.taskConflicts.forEach(tc => {
        count += tc.fieldConflicts.length;
      });
    });
    return count;
  }

  getObjectTypeName(type: ConflictObjectType): string {
    switch (type) {
      case ConflictObjectType.Workflow: return 'Workflow';
      case ConflictObjectType.Phase: return 'Phase';
      case ConflictObjectType.Task: return 'Task';
      default: return 'Object';
    }
  }

  getDeletionConflictDescription(dc: DeletionConflict): string {
    const objectType = this.getObjectTypeName(dc.objectType);
    if (dc.deletedInSource && dc.modifiedInTarget) {
      return `${objectType} "${dc.objectDisplayName}" was deleted in ${this.conflicts?.sourceBranch} but modified in ${this.conflicts?.targetBranch}`;
    } else if (dc.deletedInTarget && dc.modifiedInSource) {
      return `${objectType} "${dc.objectDisplayName}" was deleted in ${this.conflicts?.targetBranch} but modified in ${this.conflicts?.sourceBranch}`;
    }
    return `${objectType} "${dc.objectDisplayName}" has a deletion conflict`;
  }
  
  onAssetFileResolved(assetId: string, resolvedContent: string): void {
    this.assetFileResolutions.set(assetId, resolvedContent);
    console.log(`Asset file ${assetId} resolved, ${this.assetFileResolutions.size} / ${this.conflicts?.assetFileContentConflicts.length} resolved`);
  }
}
