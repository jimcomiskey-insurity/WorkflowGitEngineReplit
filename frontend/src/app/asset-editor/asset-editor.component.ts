import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AssetStateService } from '../services/asset-state.service';
import { GitStateService } from '../services/git-state.service';
import { GitEventService } from '../services/git-event.service';
import { Asset } from '../services/asset.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
  isSaving = false;
  saveError = false;
  private destroy$ = new Subject<void>();
  private editor: any = null;
  private editorInitialized = false;
  private monaco: Monaco | null = null;
  private contentChange$ = new Subject<string>();
  private currentBranch: string = '';
  private pendingSaveContent: string | null = null;
  private lastSavedContent: string = '';
  private latestDesiredContent: string = '';
  private retryTimeoutId: any = null;

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

    // Subscribe to branch changes to reload content
    this.gitStateService.gitStatus$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(status => {
      if (status && status.currentBranch && status.currentBranch !== this.currentBranch) {
        const previousBranch = this.currentBranch;
        this.currentBranch = status.currentBranch;
        
        // Reload asset content when branch changes (but not on initial load)
        if (previousBranch && !this.isNewAsset) {
          console.log(`Branch changed from ${previousBranch} to ${this.currentBranch}, reloading asset...`);
          this.loadAsset();
        }
      }
    });

    // Set up auto-save with debouncing (save 1 second after user stops typing)
    this.contentChange$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(content => {
      this.latestDesiredContent = content; // Always track the latest content
      this.autoSaveFileContent(content);
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
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
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
        this.lastSavedContent = response.content; // Track what's saved
        this.latestDesiredContent = response.content; // Initialize desired content
        this.isEditorVisible = true;
        
        setTimeout(() => {
          if (!this.editorInitialized) {
            this.initializeEditor();
          } else if (this.editor) {
            this.editor.setValue(this.fileContent);
          }
        }, 100);
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

      // Listen for content changes and trigger auto-save
      this.editor.onDidChangeModelContent(() => {
        const content = this.editor.getValue();
        this.contentChange$.next(content);
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
      const assetToCreate = { ...this.asset };
      delete (assetToCreate as any).id;
      
      this.assetStateService.createAsset(assetToCreate).subscribe({
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

  private autoSaveFileContent(content: string) {
    if (!this.asset.id) {
      return;
    }

    // Skip if content hasn't changed from last saved version
    if (content === this.lastSavedContent) {
      this.saveError = false; // Clear error if content is now saved
      return;
    }

    // If save is in progress, queue this content for later
    if (this.isSaving) {
      this.pendingSaveContent = content;
      this.latestDesiredContent = content; // Update latest desired
      return;
    }

    this.isSaving = true;
    this.saveError = false;
    console.log('Auto-saving file content...');
    
    this.assetStateService.updateFileContent(this.asset.id, content).subscribe({
      next: () => {
        console.log('File content auto-saved successfully');
        this.lastSavedContent = content;
        this.isSaving = false;
        this.saveError = false;
        this.gitEventService.emitCommit();

        // Clear any pending retry
        if (this.retryTimeoutId) {
          clearTimeout(this.retryTimeoutId);
          this.retryTimeoutId = null;
        }

        // If there's pending content that's different, save it now
        if (this.pendingSaveContent && this.pendingSaveContent !== this.lastSavedContent) {
          const pending = this.pendingSaveContent;
          this.pendingSaveContent = null;
          this.autoSaveFileContent(pending);
        } else {
          this.pendingSaveContent = null;
        }
      },
      error: (error) => {
        console.error('Error auto-saving file content:', error);
        this.isSaving = false;
        this.saveError = true;
        
        // Update latest desired with most recent content
        if (this.pendingSaveContent) {
          this.latestDesiredContent = this.pendingSaveContent;
        }
        this.pendingSaveContent = null;
        
        // Clear any existing retry timeout
        if (this.retryTimeoutId) {
          clearTimeout(this.retryTimeoutId);
        }
        
        // Retry after 2 seconds using the latest desired content
        this.retryTimeoutId = setTimeout(() => {
          this.retryTimeoutId = null;
          console.log('Retrying auto-save after error...');
          // Use the latest desired content, not the snapshot
          if (this.latestDesiredContent !== this.lastSavedContent) {
            this.autoSaveFileContent(this.latestDesiredContent);
          }
        }, 2000);
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
