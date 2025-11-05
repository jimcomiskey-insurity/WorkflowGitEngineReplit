import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import loader, { Monaco } from '@monaco-editor/loader';

interface ConflictBlock {
  startLine: number;
  endLine: number;
  currentStartLine: number;
  currentEndLine: number;
  incomingStartLine: number;
  incomingEndLine: number;
  currentContent: string;
  incomingContent: string;
  conflictMarkerLine: number;
  separatorLine: number;
  endMarkerLine: number;
}

@Component({
  selector: 'app-monaco-conflict-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monaco-conflict-editor.component.html',
  styleUrls: ['./monaco-conflict-editor.component.css']
})
export class MonacoConflictEditorComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() conflictedContent: string = '';
  @Input() fileName: string = '';
  @Input() fileType: string = 'txt';
  @Output() resolved = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  private editor: any = null;
  private monaco: Monaco | null = null;
  private decorations: string[] = [];
  private conflictBlocks: ConflictBlock[] = [];
  
  editorLoading = true;
  editorLoadError = false;
  conflictCount = 0;

  ngOnInit(): void {
    this.parseConflicts();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.loadMonaco();
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  private async loadMonaco(): Promise<void> {
    try {
      const container = document.getElementById('monaco-conflict-editor');
      if (!container) {
        console.error('Monaco container not found');
        return;
      }

      loader.config({
        paths: {
          vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs'
        }
      });

      let attempts = 0;
      const maxAttempts = 100;

      while (!this.monaco && attempts < maxAttempts) {
        try {
          this.monaco = await loader.init();
          break;
        } catch (e) {
          attempts++;
          if (attempts >= maxAttempts) {
            throw e;
          }
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      if (!this.monaco) {
        throw new Error('Failed to load Monaco Editor');
      }

      const language = this.getMonacoLanguage(this.fileType);

      this.editor = this.monaco.editor.create(container, {
        value: this.conflictedContent,
        language: language,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        readOnly: false,
        lineNumbers: 'on',
        glyphMargin: true
      });

      this.editorLoading = false;
      this.highlightConflicts();
      this.addActionButtons();

    } catch (error) {
      console.error('Error loading Monaco Editor:', error);
      this.editorLoading = false;
      this.editorLoadError = true;
    }
  }

  private getMonacoLanguage(fileType: string): string {
    const languageMap: { [key: string]: string } = {
      'json': 'json',
      'xml': 'xml',
      'xslt': 'xml',
      'txt': 'plaintext',
      'js': 'javascript',
      'ts': 'typescript',
      'html': 'html',
      'css': 'css'
    };
    return languageMap[fileType.toLowerCase()] || 'plaintext';
  }

  private parseConflicts(): void {
    const lines = this.conflictedContent.split('\n');
    this.conflictBlocks = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.startsWith('<<<<<<<')) {
        const conflict: Partial<ConflictBlock> = {
          conflictMarkerLine: i + 1,
          currentStartLine: i + 2
        };

        for (let j = i + 1; j < lines.length; j++) {
          if (lines[j].startsWith('=======')) {
            conflict.separatorLine = j + 1;
            conflict.currentEndLine = j;
            conflict.incomingStartLine = j + 2;
            conflict.currentContent = lines.slice(i + 1, j).join('\n');
          } else if (lines[j].startsWith('>>>>>>>')) {
            conflict.endMarkerLine = j + 1;
            conflict.incomingEndLine = j;
            conflict.startLine = i + 1;
            conflict.endLine = j + 1;
            conflict.incomingContent = lines.slice((conflict.separatorLine || 0), j).join('\n');
            
            this.conflictBlocks.push(conflict as ConflictBlock);
            i = j;
            break;
          }
        }
      }
    }

    this.conflictCount = this.conflictBlocks.length;
  }

  private highlightConflicts(): void {
    if (!this.editor || !this.monaco) return;

    const decorationsArray: any[] = [];

    this.conflictBlocks.forEach(conflict => {
      decorationsArray.push({
        range: new this.monaco!.Range(
          conflict.currentStartLine,
          1,
          conflict.currentEndLine,
          1
        ),
        options: {
          isWholeLine: true,
          className: 'conflict-current-block',
          glyphMarginClassName: 'conflict-current-glyph'
        }
      });

      decorationsArray.push({
        range: new this.monaco!.Range(
          conflict.incomingStartLine,
          1,
          conflict.incomingEndLine,
          1
        ),
        options: {
          isWholeLine: true,
          className: 'conflict-incoming-block',
          glyphMarginClassName: 'conflict-incoming-glyph'
        }
      });

      decorationsArray.push({
        range: new this.monaco!.Range(
          conflict.conflictMarkerLine,
          1,
          conflict.conflictMarkerLine,
          1
        ),
        options: {
          isWholeLine: true,
          className: 'conflict-marker-line'
        }
      });

      decorationsArray.push({
        range: new this.monaco!.Range(
          conflict.separatorLine,
          1,
          conflict.separatorLine,
          1
        ),
        options: {
          isWholeLine: true,
          className: 'conflict-separator-line'
        }
      });

      decorationsArray.push({
        range: new this.monaco!.Range(
          conflict.endMarkerLine,
          1,
          conflict.endMarkerLine,
          1
        ),
        options: {
          isWholeLine: true,
          className: 'conflict-marker-line'
        }
      });
    });

    this.decorations = this.editor.deltaDecorations(this.decorations, decorationsArray);
  }

  private addActionButtons(): void {
    if (!this.monaco) return;

    this.monaco.languages.registerCodeLensProvider('*', {
      provideCodeLenses: (model) => {
        const lenses: any[] = [];

        this.conflictBlocks.forEach((conflict, index) => {
          lenses.push({
            range: new this.monaco!.Range(conflict.startLine, 1, conflict.startLine, 1),
            command: {
              id: `acceptCurrent_${index}`,
              title: '✓ Accept Current Change',
              arguments: [index, 'current']
            }
          });

          lenses.push({
            range: new this.monaco!.Range(conflict.startLine, 1, conflict.startLine, 1),
            command: {
              id: `acceptIncoming_${index}`,
              title: '✓ Accept Incoming Change',
              arguments: [index, 'incoming']
            }
          });

          lenses.push({
            range: new this.monaco!.Range(conflict.startLine, 1, conflict.startLine, 1),
            command: {
              id: `acceptBoth_${index}`,
              title: '✓ Accept Both Changes',
              arguments: [index, 'both']
            }
          });
        });

        return { lenses, dispose: () => {} };
      },
      resolveCodeLens: (model, codeLens) => codeLens
    });

    this.conflictBlocks.forEach((conflict, index) => {
      this.editor.addCommand(
        this.monaco!.KeyMod.CtrlCmd | this.monaco!.KeyCode.Digit1,
        () => this.resolveConflict(index, 'current'),
        `acceptCurrent_${index}`
      );

      this.editor.addCommand(
        this.monaco!.KeyMod.CtrlCmd | this.monaco!.KeyCode.Digit2,
        () => this.resolveConflict(index, 'incoming'),
        `acceptIncoming_${index}`
      );

      this.editor.addCommand(
        this.monaco!.KeyMod.CtrlCmd | this.monaco!.KeyCode.Digit3,
        () => this.resolveConflict(index, 'both'),
        `acceptBoth_${index}`
      );
    });
  }

  resolveConflict(index: number, resolution: 'current' | 'incoming' | 'both'): void {
    if (!this.editor || !this.monaco) return;

    const conflict = this.conflictBlocks[index];
    if (!conflict) return;

    const model = this.editor.getModel();
    let replacementText = '';

    switch (resolution) {
      case 'current':
        replacementText = conflict.currentContent + '\n';
        break;
      case 'incoming':
        replacementText = conflict.incomingContent + '\n';
        break;
      case 'both':
        replacementText = conflict.currentContent + '\n' + conflict.incomingContent + '\n';
        break;
    }

    const range = new this.monaco.Range(
      conflict.startLine,
      1,
      conflict.endLine,
      model.getLineMaxColumn(conflict.endLine)
    );

    this.editor.executeEdits('resolve-conflict', [{
      range: range,
      text: replacementText,
      forceMoveMarkers: true
    }]);

    this.parseConflicts();
    this.highlightConflicts();
    
    if (this.conflictBlocks.length > 0) {
      this.addActionButtons();
    }
  }

  acceptAllCurrent(): void {
    for (let i = this.conflictBlocks.length - 1; i >= 0; i--) {
      this.resolveConflict(i, 'current');
    }
  }

  acceptAllIncoming(): void {
    for (let i = this.conflictBlocks.length - 1; i >= 0; i--) {
      this.resolveConflict(i, 'incoming');
    }
  }

  saveResolution(): void {
    if (!this.editor) return;
    
    const resolvedContent = this.editor.getValue();
    
    if (resolvedContent.includes('<<<<<<<') || resolvedContent.includes('=======') || resolvedContent.includes('>>>>>>>')) {
      alert('Please resolve all conflicts before saving. Some conflict markers remain in the file.');
      return;
    }
    
    this.resolved.emit(resolvedContent);
  }

  cancelEdit(): void {
    this.cancel.emit();
  }
}
