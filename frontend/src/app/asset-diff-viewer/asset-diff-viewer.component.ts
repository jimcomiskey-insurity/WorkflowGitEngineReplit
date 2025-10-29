import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AssetStateService } from '../services/asset-state.service';
import { Asset } from '../services/asset.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import loader from '@monaco-editor/loader';

type Monaco = typeof import('monaco-editor');

@Component({
  selector: 'app-asset-diff-viewer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './asset-diff-viewer.component.html',
  styleUrls: ['./asset-diff-viewer.component.css']
})
export class AssetDiffViewerComponent implements OnInit, OnDestroy, AfterViewInit {
  asset: Asset | null = null;
  isLoading = true;
  originalContent = '';
  modifiedContent = '';
  private destroy$ = new Subject<void>();
  private diffEditor: any = null;
  private monaco: Monaco | null = null;
  private assetId = '';
  private originalModel: any = null;
  private modifiedModel: any = null;

  constructor(
    private assetStateService: AssetStateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.assetId = params['id'];
        this.loadAssetAndContent();
      }
    });
  }

  ngAfterViewInit() {
    // Monaco will be initialized after content is loaded
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.diffEditor) {
      this.diffEditor.dispose();
    }
    if (this.originalModel) {
      this.originalModel.dispose();
    }
    if (this.modifiedModel) {
      this.modifiedModel.dispose();
    }
  }

  loadAssetAndContent() {
    this.isLoading = true;
    
    this.assetStateService.getAsset(this.assetId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (asset) => {
        this.asset = asset;
        
        if (!this.isEditableFileType()) {
          alert('Diff viewer only supports XML, JSON, XSLT, and TXT files');
          this.router.navigate(['/pending-changes']);
          return;
        }
        
        this.loadFileContents();
      },
      error: (error) => {
        console.error('Error loading asset:', error);
        alert('Failed to load asset');
        this.router.navigate(['/pending-changes']);
      }
    });
  }

  loadFileContents() {
    if (!this.asset || !this.asset.id) {
      return;
    }

    // Load both current and committed versions in parallel
    Promise.all([
      this.assetStateService.getFileContent(this.asset.id).toPromise(),
      this.assetStateService.getCommittedFileContent(this.asset.id).toPromise()
    ]).then(([currentResponse, committedResponse]) => {
      this.modifiedContent = currentResponse?.content || '';
      this.originalContent = committedResponse?.content || '';
      this.isLoading = false;
      
      setTimeout(() => {
        this.initializeDiffEditor();
      }, 100);
    }).catch(error => {
      console.error('Error loading file contents:', error);
      alert('Failed to load file contents for comparison');
      this.isLoading = false;
    });
  }

  async initializeDiffEditor() {
    const container = document.getElementById('monaco-diff-editor');
    if (!container || this.diffEditor) {
      return;
    }

    try {
      this.monaco = await loader.init();
      const language = this.getMonacoLanguage();
      
      this.originalModel = this.monaco.editor.createModel(
        this.originalContent,
        language
      );
      
      this.modifiedModel = this.monaco.editor.createModel(
        this.modifiedContent,
        language
      );
      
      this.diffEditor = this.monaco.editor.createDiffEditor(container, {
        theme: 'vs-dark',
        automaticLayout: true,
        readOnly: true,
        renderSideBySide: true,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: 'on',
        renderWhitespace: 'selection'
      });

      this.diffEditor.setModel({
        original: this.originalModel,
        modified: this.modifiedModel
      });
    } catch (error) {
      console.error('Error initializing Monaco Diff Editor:', error);
    }
  }

  getMonacoLanguage(): string {
    if (!this.asset?.fileType) return 'plaintext';
    
    const extension = this.asset.fileType.toLowerCase();
    switch (extension) {
      case 'json': return 'json';
      case 'xml':
      case 'xslt': return 'xml';
      case 'txt': return 'plaintext';
      default: return 'plaintext';
    }
  }

  isEditableFileType(): boolean {
    if (!this.asset?.fileName) return false;
    const extension = this.asset.fileName.split('.').pop()?.toLowerCase();
    return ['xml', 'json', 'xslt', 'txt'].includes(extension || '');
  }

  close() {
    this.router.navigate(['/pending-changes']);
  }
}
