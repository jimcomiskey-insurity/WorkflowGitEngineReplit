import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AssetStateService } from '../services/asset-state.service';
import { GitStateService } from '../services/git-state.service';
import { GitEventService } from '../services/git-event.service';
import { Asset } from '../services/asset.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import loader from '@monaco-editor/loader';

type Monaco = typeof import('monaco-editor');

@Component({
  selector: 'app-asset-editor',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './asset-editor.component.html',
  styleUrls: ['./asset-editor.component.css']
})
export class AssetEditorComponent implements OnInit, OnDestroy, AfterViewInit {
  asset: Asset = {
    id: '',
    name: '',
    description: '',
    tags: []
  };
  
  isNewAsset = true;
  originalId = '';
  newTag = '';
  selectedFile: File | null = null;
  fileContent = '';
  isEditorVisible = false;
  isLoading = false;
  private destroy$ = new Subject<void>();
  private editor: any = null;
  private editorInitialized = false;
  private monaco: Monaco | null = null;

  constructor(
    private assetStateService: AssetStateService,
    private gitStateService: GitStateService,
    private gitEventService: GitEventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isNewAsset = false;
        this.originalId = params['id'];
        this.loadAsset();
      }
    });
  }

  ngAfterViewInit() {
    if (!this.isNewAsset && this.isEditableFileType()) {
      setTimeout(() => {
        this.initializeEditor();
      }, 100);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.editor) {
      this.editor.dispose();
    }
  }

  loadAsset() {
    this.isLoading = true;
    this.assetStateService.getAsset(this.originalId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (asset) => {
        this.asset = { ...asset };
        this.isLoading = false;
        
        if (this.isEditableFileType()) {
          this.loadFileContent();
        }
      },
      error: (error) => {
        console.error('Error loading asset:', error);
        alert('Failed to load asset');
        this.isLoading = false;
        this.router.navigate(['/assets']);
      }
    });
  }

  loadFileContent() {
    if (!this.asset.id || !this.asset.fileName) {
      return;
    }

    this.assetStateService.getFileContent(this.asset.id).subscribe({
      next: (response) => {
        this.fileContent = response.content;
        this.isEditorVisible = true;
        
        if (!this.editorInitialized) {
          this.initializeEditor();
        } else if (this.editor) {
          this.editor.setValue(this.fileContent);
        }
      },
      error: (error) => {
        console.error('Error loading file content:', error);
      }
    });
  }

  async initializeEditor() {
    const container = document.getElementById('monaco-editor');
    if (!container || this.editorInitialized) {
      return;
    }

    try {
      this.monaco = await loader.init();
      const language = this.getMonacoLanguage();
      
      this.editor = this.monaco.editor.create(container, {
        value: this.fileContent,
        language: language,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: 'on',
        renderWhitespace: 'selection',
        tabSize: 2
      });

      this.editorInitialized = true;
    } catch (error) {
      console.error('Error initializing Monaco Editor:', error);
    }
  }

  getMonacoLanguage(): string {
    if (!this.asset.fileName) {
      return 'plaintext';
    }

    const extension = this.asset.fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'json':
        return 'json';
      case 'xml':
      case 'xslt':
        return 'xml';
      case 'txt':
        return 'plaintext';
      default:
        return 'plaintext';
    }
  }

  isEditableFileType(): boolean {
    if (!this.asset.fileName) {
      return false;
    }

    const extension = this.asset.fileName.split('.').pop()?.toLowerCase();
    return ['xml', 'json', 'xslt', 'txt'].includes(extension || '');
  }

  saveAsset() {
    if (!this.asset.name) {
      alert('Please provide an asset name');
      return;
    }

    if (this.isNewAsset) {
      this.assetStateService.createAsset(this.asset).subscribe({
        next: (createdAsset) => {
          if (this.selectedFile) {
            this.uploadFile(createdAsset.id);
          } else {
            this.router.navigate(['/assets']);
          }
        },
        error: (error) => {
          console.error('Error creating asset:', error);
          alert('Failed to create asset: ' + (error.error || error.message));
        }
      });
    } else {
      this.assetStateService.updateAsset(this.originalId, this.asset).subscribe({
        next: () => {
          this.gitEventService.emitCommit();
          this.router.navigate(['/assets']);
        },
        error: (error) => {
          console.error('Error updating asset:', error);
          alert('Failed to update asset');
        }
      });
    }
  }

  saveFileContent() {
    if (!this.editor || !this.asset.id) {
      return;
    }

    const content = this.editor.getValue();
    
    this.assetStateService.updateFileContent(this.asset.id, content).subscribe({
      next: () => {
        alert('File content saved successfully');
        this.gitEventService.emitCommit();
      },
      error: (error) => {
        console.error('Error saving file content:', error);
        alert('Failed to save file content');
      }
    });
  }

  cancel() {
    this.router.navigate(['/assets']);
  }

  addTag() {
    if (this.newTag.trim()) {
      const tags = this.newTag.split(',').map(t => t.trim()).filter(t => t);
      this.asset.tags = [...this.asset.tags, ...tags];
      this.newTag = '';
    }
  }

  removeTag(index: number) {
    this.asset.tags.splice(index, 1);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      if (this.isNewAsset) {
        return;
      }
      
      this.uploadFile(this.asset.id);
    }
  }

  uploadFile(assetId: string) {
    if (!this.selectedFile) {
      return;
    }

    this.assetStateService.uploadFile(assetId, this.selectedFile).subscribe({
      next: (updatedAsset) => {
        this.asset = { ...updatedAsset };
        this.selectedFile = null;
        
        if (this.isEditableFileType()) {
          this.loadFileContent();
        }
        
        if (this.isNewAsset) {
          this.router.navigate(['/assets']);
        } else {
          this.gitEventService.emitCommit();
        }
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        alert('Failed to upload file');
      }
    });
  }

  downloadFile() {
    if (!this.asset.id || !this.asset.fileName) {
      return;
    }

    const userId = 'userA';
    const url = `/api/assets/${this.asset.id}/file?userId=${userId}`;
    window.open(url, '_blank');
  }

  deleteFile() {
    if (!this.asset.id || !confirm('Are you sure you want to delete this file?')) {
      return;
    }

    this.assetStateService.deleteFile(this.asset.id).subscribe({
      next: () => {
        this.asset.fileName = undefined;
        this.asset.fileType = undefined;
        this.asset.fileSizeBytes = undefined;
        this.asset.fileUploadedDate = undefined;
        this.fileContent = '';
        this.isEditorVisible = false;
        
        if (this.editor) {
          this.editor.dispose();
          this.editor = null;
          this.editorInitialized = false;
        }
        
        this.gitEventService.emitCommit();
      },
      error: (error) => {
        console.error('Error deleting file:', error);
        alert('Failed to delete file');
      }
    });
  }

  formatFileSize(bytes: number | undefined): string {
    if (!bytes) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
}
