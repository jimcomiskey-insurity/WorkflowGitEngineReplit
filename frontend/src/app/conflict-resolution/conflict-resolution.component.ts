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

interface MergeConflictInfo {
  workflowConflicts: WorkflowConflict[];
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
}

@Component({
  selector: 'app-conflict-resolution',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conflict-resolution.component.html',
  styleUrls: ['./conflict-resolution.component.css']
})
export class ConflictResolutionComponent implements OnInit {
  conflicts: MergeConflictInfo | null = null;
  prNumber: number = 0;
  loading = true;
  error: string | null = null;
  resolving = false;

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

    this.resolving = true;
    const userId = this.userService.getCurrentUser();

    this.http
      .post(`/api/pull-requests/${this.prNumber}/resolve-conflicts?userId=${userId}`, {
        resolutions
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
}
