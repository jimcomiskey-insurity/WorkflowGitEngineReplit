import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Asset } from '../services/asset.service';
import { AssetStateService } from '../services/asset-state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit, OnDestroy {
  assets: Asset[] = [];
  activeAssets: Asset[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private assetStateService: AssetStateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.assetStateService.assets$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (assets) => {
        this.assets = assets;
        this.activeAssets = assets.filter(a => a.gitStatus !== 'deleted');
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

  createNewAsset() {
    this.router.navigate(['/assets/new']);
  }

  editAsset(id: string) {
    this.router.navigate(['/assets/edit', id]);
  }

  deleteAsset(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete asset "${name}"?`)) {
      return;
    }

    this.assetStateService.deleteAsset(id).subscribe({
      next: () => {
      },
      error: (error) => {
        console.error('Error deleting asset:', error);
        alert('Failed to delete asset');
      }
    });
  }

  getFileTypeIcon(fileType?: string): string {
    if (!fileType) return 'file';
    
    const type = fileType.toLowerCase();
    if (type.includes('pdf')) return 'file-pdf';
    if (type.includes('word') || type.includes('doc')) return 'file-word';
    if (type.includes('excel') || type.includes('sheet')) return 'file-excel';
    if (type.includes('image') || type.includes('png') || type.includes('jpg') || type.includes('jpeg')) return 'file-image';
    if (type.includes('text') || type.includes('plain')) return 'file-text';
    return 'file';
  }

  formatFileSize(bytes?: number): string {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  getGitStatusClass(status?: string): string {
    if (!status || status === 'unmodified') return '';
    return 'git-status-' + status;
  }

  getGitStatusLabel(status?: string): string {
    if (!status || status === 'unmodified') return '';
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
}
