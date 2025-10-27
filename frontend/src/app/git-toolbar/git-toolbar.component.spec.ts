import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GitToolbarComponent } from './git-toolbar.component';
import { GitStateService } from '../services/git-state.service';
import { GitEventService } from '../services/git-event.service';
import { UserService } from '../services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, BehaviorSubject, Subject } from 'rxjs';
import { GitStatus } from '../services/git.service';

describe('GitToolbarComponent', () => {
  let component: GitToolbarComponent;
  let fixture: ComponentFixture<GitToolbarComponent>;
  let gitStateService: jest.Mocked<GitStateService>;
  let gitEventService: GitEventService;
  let gitStatusSubject: BehaviorSubject<GitStatus | null>;
  let branchesSubject: BehaviorSubject<string[]>;

  const mockGitStatus: GitStatus = {
    isDirty: false,
    added: [],
    modified: [],
    removed: [],
    untracked: [],
    currentBranch: 'master',
    commitsAhead: 0,
    commitsBehind: 0,
    hasRemoteTracking: true
  };

  beforeEach(async () => {
    gitStatusSubject = new BehaviorSubject<GitStatus | null>(mockGitStatus);
    branchesSubject = new BehaviorSubject<string[]>(['master', 'feature-1']);

    const gitStateServiceMock = {
      gitStatus$: gitStatusSubject.asObservable(),
      branches$: branchesSubject.asObservable(),
      switchBranch: jest.fn(),
      push: jest.fn(),
      pull: jest.fn(),
      refreshManually: jest.fn()
    } as unknown as jest.Mocked<GitStateService>;

    const userServiceMock = {
      currentUser$: of('testUser'),
      getCurrentUser: jest.fn().mockReturnValue('testUser')
    } as unknown as jest.Mocked<UserService>;

    await TestBed.configureTestingModule({
      imports: [GitToolbarComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: GitStateService, useValue: gitStateServiceMock },
        { provide: UserService, useValue: userServiceMock },
        GitEventService
      ]
    }).compileComponents();

    gitStateService = TestBed.inject(GitStateService) as jest.Mocked<GitStateService>;
    gitEventService = TestBed.inject(GitEventService);

    fixture = TestBed.createComponent(GitToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load git status on init', (done) => {
      setTimeout(() => {
        expect(component.gitStatus).toBeTruthy();
        expect(component.selectedBranch).toBe('master');
        done();
      }, 100);
    });

    it('should load branches on init', (done) => {
      setTimeout(() => {
        expect(component.branches).toEqual(['master', 'feature-1']);
        done();
      }, 100);
    });
  });

  describe('Branch Dropdown Synchronization', () => {
    it('should update selectedBranch when GitEventService emits branch-switch event', (done) => {
      component.selectedBranch = 'master';
      
      gitEventService.emitBranchSwitch('feature-1');

      setTimeout(() => {
        expect(component.selectedBranch).toBe('feature-1');
        done();
      }, 100);
    });

    it('should emit branch-switch event when onBranchChange is called', (done) => {
      component.selectedBranch = 'feature-1';
      gitStateService.switchBranch.mockReturnValue(of(void 0));

      gitEventService.events$.subscribe((event) => {
        if (event.type === 'branch-switch') {
          expect(event.branchName).toBe('feature-1');
          done();
        }
      });

      component.onBranchChange();
    }, 10000);

    it('should not call switchBranch if selectedBranch is the same as current branch', () => {
      component.selectedBranch = 'master';
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'master',
        commitsAhead: 0,
        commitsBehind: 0,
        hasRemoteTracking: true
      };

      component.onBranchChange();

      expect(gitStateService.switchBranch).not.toHaveBeenCalled();
    });
  });

  describe('Push Button Behavior', () => {
    it('should disable push button when on master branch', () => {
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'master',
        commitsAhead: 1,
        commitsBehind: 0,
        hasRemoteTracking: true
      };

      expect(component.canPush).toBe(false);
    });

    it('should enable push button when on feature branch with commits ahead', () => {
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'feature-1',
        commitsAhead: 1,
        commitsBehind: 0,
        hasRemoteTracking: true
      };

      expect(component.canPush).toBe(true);
    });

    it('should enable push button for new branch without remote tracking', () => {
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'feature-1',
        commitsAhead: 0,
        commitsBehind: 0,
        hasRemoteTracking: false
      };

      expect(component.canPush).toBe(true);
    });
  });

  describe('User Change Handling', () => {
    it('should subscribe to GitStateService observables when component initializes', (done) => {
      setTimeout(() => {
        expect(component.gitStatus).toBeTruthy();
        expect(component.branches).toEqual(['master', 'feature-1']);
        expect(component.selectedBranch).toBe('master');
        done();
      }, 100);
    });

    it('should update when GitStateService emits new git status', (done) => {
      const newStatus: GitStatus = {
        isDirty: true,
        added: ['test.ts'],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'feature-1',
        commitsAhead: 1,
        commitsBehind: 0,
        hasRemoteTracking: true
      };

      gitStatusSubject.next(newStatus);

      setTimeout(() => {
        expect(component.gitStatus).toEqual(newStatus);
        expect(component.selectedBranch).toBe('feature-1');
        done();
      }, 100);
    });
  });
});
