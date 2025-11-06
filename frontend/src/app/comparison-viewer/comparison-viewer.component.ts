import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import loader from '@monaco-editor/loader';
import { of } from 'rxjs';
import { PullRequestService } from '../services/pull-request.service';

type Monaco = typeof import('monaco-editor');

export interface WorkflowChange {
  workflowKey: string;
  workflowName: string;
  changeType: string;
  sourceWorkflow?: any;
  targetWorkflow?: any;
}

export interface AssetChange {
  assetId: string;
  assetName: string;
  changeType: string;
  sourceAsset?: any;
  targetAsset?: any;
  fileContentChanged: boolean;
}

export interface DataStoreChange {
  dataStoreId: string;
  dataStoreName: string;
  changeType: string;
  sourceDataStore?: any;
  targetDataStore?: any;
}

@Component({
  selector: 'app-comparison-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comparison-viewer.component.html',
  styleUrls: ['./comparison-viewer.component.css']
})
export class ComparisonViewerComponent implements OnDestroy {
  @Input() changes: WorkflowChange[] = [];
  @Input() assetChanges: AssetChange[] = [];
  @Input() dataStoreChanges: DataStoreChange[] = [];
  @Input() title: string = 'Changes';
  @Input() emptyMessage: string = 'No changes';
  @Input() userId: string = '';
  @Input() sourceCommitSha?: string;
  @Input() targetCommitSha?: string;
  
  expandedChanges: Set<string> = new Set();
  expandedAssets: Set<string> = new Set();
  expandedDataStores: Set<string> = new Set();
  assetDiffViewers: Map<string, any> = new Map();
  expandedAssetDiffs: Set<string> = new Set();
  loadingDiffs: Set<string> = new Set();
  diffErrors: Map<string, string> = new Map();
  monacoLoading: Set<string> = new Set();
  private monaco: Monaco | null = null;
  private readonly MAX_MONACO_LOAD_ATTEMPTS = 100;

  constructor(private pullRequestService: PullRequestService) {
    // Configure Monaco Editor loader to use CDN
    loader.config({ 
      paths: { 
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs'
      } 
    });
    loader.init().then((monacoInstance) => {
      this.monaco = monacoInstance;
      console.log('Monaco Editor loaded successfully');
    }).catch((error) => {
      console.error('Failed to load Monaco Editor:', error);
    });
  }

  ngOnDestroy() {
    // Clean up Monaco editors
    this.assetDiffViewers.forEach(editor => editor.dispose());
    this.assetDiffViewers.clear();
  }

  toggleChangeDetails(workflowKey: string) {
    if (this.expandedChanges.has(workflowKey)) {
      this.expandedChanges.delete(workflowKey);
    } else {
      this.expandedChanges.add(workflowKey);
    }
  }

  isExpanded(workflowKey: string): boolean {
    return this.expandedChanges.has(workflowKey);
  }

  toggleAssetDetails(assetId: string) {
    if (this.expandedAssets.has(assetId)) {
      this.expandedAssets.delete(assetId);
    } else {
      this.expandedAssets.add(assetId);
    }
  }

  isAssetExpanded(assetId: string): boolean {
    return this.expandedAssets.has(assetId);
  }

  toggleDataStoreDetails(dataStoreId: string) {
    if (this.expandedDataStores.has(dataStoreId)) {
      this.expandedDataStores.delete(dataStoreId);
    } else {
      this.expandedDataStores.add(dataStoreId);
    }
  }

  isDataStoreExpanded(dataStoreId: string): boolean {
    return this.expandedDataStores.has(dataStoreId);
  }

  getAssetFieldChanges(sourceAsset: any, targetAsset: any): any[] {
    const changes: any[] = [];

    if (sourceAsset.name !== targetAsset.name) {
      changes.push({ field: 'Name', oldValue: targetAsset.name, newValue: sourceAsset.name });
    }

    if (sourceAsset.description !== targetAsset.description) {
      changes.push({ field: 'Description', oldValue: targetAsset.description || '(empty)', newValue: sourceAsset.description || '(empty)' });
    }

    const oldTags = (targetAsset.tags || []).join(', ');
    const newTags = (sourceAsset.tags || []).join(', ');
    if (oldTags !== newTags) {
      changes.push({ field: 'Tags', oldValue: oldTags || '(none)', newValue: newTags || '(none)' });
    }

    if (sourceAsset.fileName !== targetAsset.fileName) {
      changes.push({ field: 'File Name', oldValue: targetAsset.fileName || '(none)', newValue: sourceAsset.fileName || '(none)' });
    }

    if (sourceAsset.fileType !== targetAsset.fileType) {
      changes.push({ field: 'File Type', oldValue: targetAsset.fileType || '(none)', newValue: sourceAsset.fileType || '(none)' });
    }

    return changes;
  }

  getTotalTasks(workflow: any): number {
    if (!workflow.phases) {
      return 0;
    }
    return workflow.phases.reduce((total: number, phase: any) => {
      return total + (phase.tasks?.length || 0);
    }, 0);
  }

  getWorkflowLevelChanges(change: WorkflowChange): any[] {
    if (!change.sourceWorkflow || !change.targetWorkflow) {
      return [];
    }

    const changes: any[] = [];
    const newVersion = change.sourceWorkflow;
    const oldVersion = change.targetWorkflow;

    if (newVersion.workflowName !== oldVersion.workflowName) {
      changes.push({
        field: 'Workflow Name',
        oldValue: oldVersion.workflowName,
        newValue: newVersion.workflowName
      });
    }

    if (newVersion.description !== oldVersion.description) {
      changes.push({
        field: 'Description',
        oldValue: oldVersion.description || '(empty)',
        newValue: newVersion.description || '(empty)'
      });
    }

    return changes;
  }

  getPhaseChanges(change: WorkflowChange): any {
    if (!change.sourceWorkflow || !change.targetWorkflow) {
      return { added: [], removed: [], modified: [] };
    }

    const newPhases = change.sourceWorkflow.phases || [];
    const oldPhases = change.targetWorkflow.phases || [];

    const added = newPhases.filter((np: any) => 
      !oldPhases.some((op: any) => op.phaseName === np.phaseName)
    );

    const removed = oldPhases.filter((op: any) => 
      !newPhases.some((np: any) => np.phaseName === op.phaseName)
    );

    const modified = newPhases.filter((np: any) => {
      const oldPhase = oldPhases.find((op: any) => op.phaseName === np.phaseName);
      return oldPhase && JSON.stringify(np) !== JSON.stringify(oldPhase);
    }).map((np: any) => ({
      phase: np,
      oldPhase: oldPhases.find((op: any) => op.phaseName === np.phaseName)
    }));

    return { added, removed, modified };
  }

  getTaskChanges(newPhase: any, oldPhase: any): any {
    const newTasks = newPhase.tasks || [];
    const oldTasks = oldPhase.tasks || [];

    const added = newTasks.filter((nt: any) => 
      !oldTasks.some((ot: any) => ot.taskId === nt.taskId)
    );

    const removed = oldTasks.filter((ot: any) => 
      !newTasks.some((nt: any) => nt.taskId === ot.taskId)
    );

    const modified = newTasks.filter((nt: any) => {
      const oldTask = oldTasks.find((ot: any) => ot.taskId === nt.taskId);
      return oldTask && JSON.stringify(nt) !== JSON.stringify(oldTask);
    }).map((nt: any) => ({
      task: nt,
      oldTask: oldTasks.find((ot: any) => ot.taskId === nt.taskId)
    }));

    return { added, removed, modified };
  }

  getTaskFieldChanges(newTask: any, oldTask: any): any[] {
    const changes: any[] = [];

    if (newTask.taskName !== oldTask.taskName) {
      changes.push({ field: 'Task Name', oldValue: oldTask.taskName, newValue: newTask.taskName });
    }

    if (newTask.taskType !== oldTask.taskType) {
      changes.push({ field: 'Type', oldValue: oldTask.taskType, newValue: newTask.taskType });
    }

    if (newTask.assignedRole !== oldTask.assignedRole) {
      changes.push({ field: 'Role', oldValue: oldTask.assignedRole || '(none)', newValue: newTask.assignedRole || '(none)' });
    }

    if (newTask.estimatedDuration !== oldTask.estimatedDuration) {
      changes.push({ field: 'Duration', oldValue: oldTask.estimatedDuration || '(none)', newValue: newTask.estimatedDuration || '(none)' });
    }

    if (newTask.isAutomated !== oldTask.isAutomated) {
      changes.push({ field: 'Automated', oldValue: oldTask.isAutomated ? 'Yes' : 'No', newValue: newTask.isAutomated ? 'Yes' : 'No' });
    }

    const oldDeps = (oldTask.dependencies || []).join(', ');
    const newDeps = (newTask.dependencies || []).join(', ');
    if (oldDeps !== newDeps) {
      changes.push({ field: 'Dependencies', oldValue: oldDeps || '(none)', newValue: newDeps || '(none)' });
    }

    return changes;
  }

  isEditableFileType(fileType: string | undefined): boolean {
    if (!fileType) return false;
    const editableTypes = ['json', 'xml', 'xslt', 'txt'];
    return editableTypes.includes(fileType.toLowerCase());
  }

  isAssetDiffExpanded(assetId: string): boolean {
    return this.expandedAssetDiffs.has(assetId);
  }

  toggleAssetDiff(asset: AssetChange) {
    if (!this.userId || !this.sourceCommitSha || !this.targetCommitSha) {
      this.diffErrors.set(asset.assetId, 'Missing commit information for comparison');
      return;
    }

    if (!asset.sourceAsset?.fileName && !asset.targetAsset?.fileName) {
      this.diffErrors.set(asset.assetId, 'Missing file information');
      return;
    }

    const assetId = asset.assetId;

    if (this.expandedAssetDiffs.has(assetId)) {
      // Collapse and dispose editor
      this.expandedAssetDiffs.delete(assetId);
      const editor = this.assetDiffViewers.get(assetId);
      if (editor) {
        editor.dispose();
        this.assetDiffViewers.delete(assetId);
      }
    } else {
      // Expand and load diff
      this.expandedAssetDiffs.add(assetId);
      this.loadAssetDiff(asset);
    }
  }

  private loadAssetDiff(asset: AssetChange) {
    if (!this.userId || !this.sourceCommitSha || !this.targetCommitSha) {
      return;
    }

    const assetId = asset.assetId;
    
    // Use the correct filename for each commit to handle renamed assets
    const targetFileName = asset.targetAsset?.fileName;
    const sourceFileName = asset.sourceAsset?.fileName;
    
    if (!targetFileName && !sourceFileName) {
      this.diffErrors.set(assetId, 'Missing file information');
      return;
    }

    this.loadingDiffs.add(assetId);
    this.diffErrors.delete(assetId);

    // Build file paths using the correct filename for each commit
    const targetFilePath = targetFileName ? `asset-files/${assetId}/${targetFileName}` : null;
    const sourceFilePath = sourceFileName ? `asset-files/${assetId}/${sourceFileName}` : null;

    // Fetch both versions of the file using the appropriate path for each commit
    const targetFile$ = targetFilePath 
      ? this.pullRequestService.getFileAtCommit(this.userId, this.targetCommitSha, targetFilePath)
      : of({ content: '' });
    const sourceFile$ = sourceFilePath
      ? this.pullRequestService.getFileAtCommit(this.userId, this.sourceCommitSha, sourceFilePath)
      : of({ content: '' });

    // Use setTimeout to allow DOM to render the container first
    setTimeout(() => {
      Promise.all([
        targetFile$.toPromise(),
        sourceFile$.toPromise()
      ]).then(([targetResponse, sourceResponse]) => {
        const targetContent = targetResponse?.content || '';
        const sourceContent = sourceResponse?.content || '';

        // Use the source filename for display (or target if source is missing)
        const displayFileName = sourceFileName || targetFileName || 'unknown';
        this.waitForMonacoAndCreateEditor(assetId, displayFileName, targetContent, sourceContent);
        this.loadingDiffs.delete(assetId);
      }).catch(error => {
        console.error('Error loading asset diff:', error);
        this.diffErrors.set(assetId, 'Failed to load file content');
        this.loadingDiffs.delete(assetId);
      });
    }, 100);
  }

  private waitForMonacoAndCreateEditor(assetId: string, fileName: string, originalContent: string, modifiedContent: string, attempt: number = 0) {
    if (this.monaco) {
      this.monacoLoading.delete(assetId);
      setTimeout(() => {
        this.createDiffEditor(assetId, fileName, originalContent, modifiedContent);
      }, 100);
    } else if (attempt < this.MAX_MONACO_LOAD_ATTEMPTS) {
      // Show loading indicator on first attempt
      if (attempt === 0) {
        this.monacoLoading.add(assetId);
      }
      
      setTimeout(() => {
        this.waitForMonacoAndCreateEditor(assetId, fileName, originalContent, modifiedContent, attempt + 1);
      }, 100);
    } else {
      this.monacoLoading.delete(assetId);
      this.diffErrors.set(assetId, 'Monaco Editor failed to load after 10 seconds. Please refresh the page and try again.');
    }
  }
  
  isMonacoLoading(assetId: string): boolean {
    return this.monacoLoading.has(assetId);
  }

  private createDiffEditor(assetId: string, fileName: string, originalContent: string, modifiedContent: string) {
    if (!this.monaco) {
      console.error('Monaco Editor not loaded yet');
      return;
    }

    const container = document.getElementById(`asset-diff-${assetId}`);
    if (!container) {
      console.error(`Container for asset diff ${assetId} not found`);
      return;
    }

    // Dispose existing editor if any
    const existingEditor = this.assetDiffViewers.get(assetId);
    if (existingEditor) {
      existingEditor.dispose();
    }

    // Determine language from file extension
    const fileExtension = fileName.split('.').pop()?.toLowerCase() || 'txt';
    const languageMap: { [key: string]: string } = {
      'json': 'json',
      'xml': 'xml',
      'xslt': 'xml',
      'txt': 'plaintext'
    };
    const language = languageMap[fileExtension] || 'plaintext';

    // Create diff editor
    const diffEditor = this.monaco.editor.createDiffEditor(container, {
      theme: 'vs-dark',
      readOnly: true,
      automaticLayout: true,
      minimap: { enabled: false },
      renderSideBySide: true,
      scrollBeyondLastLine: false,
      fontSize: 13
    });

    const originalModel = this.monaco.editor.createModel(originalContent, language);
    const modifiedModel = this.monaco.editor.createModel(modifiedContent, language);

    diffEditor.setModel({
      original: originalModel,
      modified: modifiedModel
    });

    this.assetDiffViewers.set(assetId, diffEditor);
  }
}
