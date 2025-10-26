import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GitToolbarComponent } from './git-toolbar.component';
import { GitService, GitStatus } from '../services/git.service';
import { UserService } from '../services/user.service';
import { GitEventService } from '../services/git-event.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';

describe('GitToolbarComponent', () => {
  let component: GitToolbarComponent;
  let fixture: ComponentFixture<GitToolbarComponent>;
  let gitService: jest.Mocked<GitService>;
  let userService: jest.Mocked<UserService>;
  let gitEventService: GitEventService;

  beforeEach(async () => {
    const gitServiceMock = {
      getStatus: jest.fn(),
      getBranches: jest.fn(),
      switchBranch: jest.fn(),
      push: jest.fn(),
      pull: jest.fn()
    } as unknown as jest.Mocked<GitService>;

    const userServiceMock = {
      currentUser$: of('testUser'),
      getCurrentUser: jest.fn().mockReturnValue('testUser')
    } as unknown as jest.Mocked<UserService>;

    await TestBed.configureTestingModule({
      imports: [GitToolbarComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: GitService, useValue: gitServiceMock },
        { provide: UserService, useValue: userServiceMock },
        GitEventService
      ]
    }).compileComponents();

    gitService = TestBed.inject(GitService) as jest.Mocked<GitService>;
    userService = TestBed.inject(UserService) as jest.Mocked<UserService>;
    gitEventService = TestBed.inject(GitEventService);

    gitService.getStatus.mockReturnValue(of({
      isDirty: false,
      added: [],
      modified: [],
      removed: [],
      untracked: [],
      currentBranch: 'master',
      commitsAhead: 0,
      commitsBehind: 0,
      hasRemoteTracking: true
    } as GitStatus));
    gitService.getBranches.mockReturnValue(of(['master', 'feature-1']));

    fixture = TestBed.createComponent(GitToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load git status on init', () => {
      expect(gitService.getStatus).toHaveBeenCalled();
      expect(component.gitStatus).toBeTruthy();
      expect(component.selectedBranch).toBe('master');
    });

    it('should load branches on init', () => {
      expect(gitService.getBranches).toHaveBeenCalled();
      expect(component.branches).toEqual(['master', 'feature-1']);
    });
  });

  describe('Branch Dropdown Synchronization', () => {
    it('should update selectedBranch when GitEventService emits branch-switch event', (done) => {
      component.selectedBranch = 'master';
      
      gitService.getStatus.mockReturnValue(of({
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'feature-1',
        commitsAhead: 0,
        commitsBehind: 0,
        hasRemoteTracking: true
      } as GitStatus));

      gitEventService.emitBranchSwitch('feature-1');

      setTimeout(() => {
        expect(component.selectedBranch).toBe('feature-1');
        done();
      }, 100);
    });

    it('should emit branch-switch event when onBranchChange is called', (done) => {
      component.selectedBranch = 'feature-1';
      gitService.switchBranch.mockReturnValue(of(void 0));

      gitEventService.events$.subscribe((event) => {
        if (event.type === 'branch-switch') {
          expect(event.branchName).toBe('feature-1');
          done();
        }
      });

      component.onBranchChange();
    });

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

      expect(gitService.switchBranch).not.toHaveBeenCalled();
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
    it('should reload git status and branches when component initializes', () => {
      expect(gitService.getStatus).toHaveBeenCalled();
      expect(gitService.getBranches).toHaveBeenCalled();
      expect(component.selectedBranch).toBe('master');
    });
  });
});
