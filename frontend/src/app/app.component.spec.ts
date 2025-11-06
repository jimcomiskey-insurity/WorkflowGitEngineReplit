import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WorkflowStateService } from './services/workflow-state.service';
import { UserService } from './services/user.service';
import { GitStateService } from './services/git-state.service';
import { GitStatus } from './services/git.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let workflowStateService: jest.Mocked<WorkflowStateService>;
  let gitStateService: jest.Mocked<GitStateService>;
  let userService: jest.Mocked<UserService>;
  let gitStatusSubject: BehaviorSubject<GitStatus | null>;

  beforeEach(async () => {
    gitStatusSubject = new BehaviorSubject<GitStatus | null>({
      isDirty: false,
      currentBranch: 'master',
      added: [],
      modified: [],
      removed: [],
      untracked: [],
      commitsAhead: 0,
      commitsBehind: 0,
      hasRemoteTracking: true
    });

    const gitStateServiceMock = {
      gitStatus$: gitStatusSubject.asObservable(),
      commits$: new BehaviorSubject([]).asObservable(),
      branches$: new BehaviorSubject([]).asObservable(),
      lastPushedCommit$: new BehaviorSubject(null).asObservable(),
      refresh: jest.fn()
    } as unknown as jest.Mocked<GitStateService>;

    const workflowStateServiceMock = {
      refreshManually: jest.fn()
    } as unknown as jest.Mocked<WorkflowStateService>;

    const userServiceMock = {
      currentUser$: new BehaviorSubject<string>('testUser').asObservable(),
      getCurrentUser: jest.fn().mockReturnValue('testUser'),
      getAvailableUsers: jest.fn().mockReturnValue(['userA', 'userB', 'userC']),
      setCurrentUser: jest.fn()
    } as unknown as jest.Mocked<UserService>;

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: GitStateService, useValue: gitStateServiceMock },
        { provide: WorkflowStateService, useValue: workflowStateServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    gitStateService = TestBed.inject(GitStateService) as jest.Mocked<GitStateService>;
    workflowStateService = TestBed.inject(WorkflowStateService) as jest.Mocked<WorkflowStateService>;
    userService = TestBed.inject(UserService) as jest.Mocked<UserService>;

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with pending changes count of 0', (done) => {
      setTimeout(() => {
        expect(component.pendingChangesCount).toBe(0);
        done();
      }, 100);
    });
  });

  describe('Pending Changes Badge', () => {
    it('should update pending changes count when GitStateService emits new Git status', (done) => {
      gitStatusSubject.next({
        isDirty: true,
        currentBranch: 'master',
        added: ['file1.json'],
        modified: ['file2.json'],
        removed: ['file3.json'],
        untracked: [],
        commitsAhead: 0,
        commitsBehind: 0,
        hasRemoteTracking: true
      });

      setTimeout(() => {
        expect(component.pendingChangesCount).toBe(3);
        done();
      }, 100);
    });

    it('should reactively update when Git status changes', (done) => {
      // Start with 0
      expect(component.pendingChangesCount).toBe(0);

      // Update to 5 changes
      gitStatusSubject.next({
        isDirty: true,
        currentBranch: 'master',
        added: ['file1.json', 'file2.json'],
        modified: ['file3.json'],
        removed: [],
        untracked: ['file4.json', 'file5.json'],
        commitsAhead: 0,
        commitsBehind: 0,
        hasRemoteTracking: true
      });

      setTimeout(() => {
        expect(component.pendingChangesCount).toBe(5);

        // Update to 0 again
        gitStatusSubject.next({
          isDirty: false,
          currentBranch: 'master',
          added: [],
          modified: [],
          removed: [],
          untracked: [],
          commitsAhead: 0,
          commitsBehind: 0,
          hasRemoteTracking: true
        });

        setTimeout(() => {
          expect(component.pendingChangesCount).toBe(0);
          done();
        }, 100);
      }, 100);
    });

    it('should subscribe to Git status on initialization', (done) => {
      // Emit a value after component init
      gitStatusSubject.next({
        isDirty: true,
        currentBranch: 'master',
        added: ['a.json', 'b.json'],
        modified: ['c.json', 'd.json'],
        removed: [],
        untracked: ['e.json', 'f.json', 'g.json'],
        commitsAhead: 0,
        commitsBehind: 0,
        hasRemoteTracking: true
      });

      setTimeout(() => {
        expect(component.pendingChangesCount).toBe(7);
        done();
      }, 100);
    });
  });

  describe('User Selection', () => {
    it('should have initial user', () => {
      expect(component.currentUser).toBe('testUser');
    });

    it('should call userService.setCurrentUser when onUserChange is called', () => {
      component.currentUser = 'userB';
      component.onUserChange();

      expect(userService.setCurrentUser).toHaveBeenCalledWith('userB');
    });
  });

  describe('Swagger Link', () => {
    it('should use relative URL for swagger that will be proxied to backend', () => {
      expect(component.swaggerUrl).toBe('/swagger');
    });
  });
});
