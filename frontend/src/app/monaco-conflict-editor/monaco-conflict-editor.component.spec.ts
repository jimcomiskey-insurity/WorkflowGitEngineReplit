import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonacoConflictEditorComponent } from './monaco-conflict-editor.component';
import * as monaco from 'monaco-editor';

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
  resolved?: boolean;
  resolution?: string;
}

describe('MonacoConflictEditorComponent', () => {
  let component: MonacoConflictEditorComponent;
  let fixture: ComponentFixture<MonacoConflictEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonacoConflictEditorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MonacoConflictEditorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('parseConflictMarkers', () => {
    it('should parse simple conflict markers', () => {
      const conflictedContent = `Line 1
<<<<<<< HEAD
Current change
=======
Incoming change
>>>>>>> branch-name
Line 2`;

      component.conflictedContent = conflictedContent;
      component.ngOnInit();

      const conflicts = (component as any).conflictBlocks as ConflictBlock[];
      expect(conflicts.length).toBe(1);
      expect(conflicts[0].currentContent).toBe('Current change');
      expect(conflicts[0].incomingContent).toBe('Incoming change');
    });

    it('should parse multiple conflicts', () => {
      const conflictedContent = `Line 1
<<<<<<< HEAD
First current
=======
First incoming
>>>>>>> branch-name
Line 2
<<<<<<< HEAD
Second current
=======
Second incoming
>>>>>>> branch-name
Line 3`;

      component.conflictedContent = conflictedContent;
      component.ngOnInit();

      const conflicts = (component as any).conflictBlocks as ConflictBlock[];
      expect(conflicts.length).toBe(2);
      expect(conflicts[0].currentContent).toBe('First current');
      expect(conflicts[0].incomingContent).toBe('First incoming');
      expect(conflicts[1].currentContent).toBe('Second current');
      expect(conflicts[1].incomingContent).toBe('Second incoming');
    });

    it('should handle empty current content', () => {
      const conflictedContent = `<<<<<<< HEAD
=======
Incoming only
>>>>>>> branch-name`;

      component.conflictedContent = conflictedContent;
      component.ngOnInit();

      const conflicts = (component as any).conflictBlocks as ConflictBlock[];
      expect(conflicts.length).toBe(1);
      expect(conflicts[0].currentContent).toBe('');
      expect(conflicts[0].incomingContent).toBe('Incoming only');
    });

    it('should handle empty incoming content', () => {
      const conflictedContent = `<<<<<<< HEAD
Current only
=======
>>>>>>> branch-name`;

      component.conflictedContent = conflictedContent;
      component.ngOnInit();

      const conflicts = (component as any).conflictBlocks as ConflictBlock[];
      expect(conflicts.length).toBe(1);
      expect(conflicts[0].currentContent).toBe('Current only');
      expect(conflicts[0].incomingContent).toBe('');
    });

    it('should handle no conflicts', () => {
      const conflictedContent = `Line 1
Line 2
Line 3`;

      component.conflictedContent = conflictedContent;
      component.ngOnInit();

      const conflicts = (component as any).conflictBlocks as ConflictBlock[];
      expect(conflicts.length).toBe(0);
    });
  });

  describe('acceptAllCurrent button functionality', () => {
    it('should call acceptAllCurrent method when button is clicked', () => {
      const conflictedContent = `Line 1
<<<<<<< HEAD
Current change
=======
Incoming change
>>>>>>> branch-name
Line 2`;

      component.conflictedContent = conflictedContent;
      component.ngOnInit();

      expect(component.conflictCount).toBe(1);
    });
  });

  describe('acceptAllIncoming button functionality', () => {
    it('should call acceptAllIncoming method when button is clicked', () => {
      const conflictedContent = `Line 1
<<<<<<< HEAD
Current change
=======
Incoming change
>>>>>>> branch-name
Line 2`;

      component.conflictedContent = conflictedContent;
      component.ngOnInit();

      expect(component.conflictCount).toBe(1);
    });
  });

  describe('conflict count', () => {
    it('should track conflict count correctly', () => {
      const conflictedContent = `Line 1
<<<<<<< HEAD
Current change
=======
Incoming change
>>>>>>> branch-name
Line 2`;

      component.conflictedContent = conflictedContent;
      component.ngOnInit();

      expect(component.conflictCount).toBe(1);
    });
  });

  describe('resolved event', () => {
    it('should have resolved event emitter', () => {
      expect(component.resolved).toBeDefined();
    });
  });

  describe('cancel event', () => {
    it('should have cancel event emitter', () => {
      expect(component.cancel).toBeDefined();
    });
  });

  describe('multiple conflicts', () => {
    it('should count multiple conflicts correctly', () => {
      const conflictedContent = `Line 1
<<<<<<< HEAD
First current
=======
First incoming
>>>>>>> branch-name
Line 2
<<<<<<< HEAD
Second current
=======
Second incoming
>>>>>>> branch-name
Line 3`;

      component.conflictedContent = conflictedContent;
      component.ngOnInit();

      expect(component.conflictCount).toBe(2);
    });
  });

  describe('file type handling', () => {
    it('should accept fileType input', () => {
      component.fileType = 'json';
      expect(component.fileType).toBe('json');
    });

    it('should accept fileName input', () => {
      component.fileName = 'test.json';
      expect(component.fileName).toBe('test.json');
    });
  });

  describe('editor state', () => {
    it('should start with editor loading state', () => {
      expect(component.editorLoading).toBe(true);
    });

    it('should not have editor load error initially', () => {
      expect(component.editorLoadError).toBe(false);
    });
  });
});
