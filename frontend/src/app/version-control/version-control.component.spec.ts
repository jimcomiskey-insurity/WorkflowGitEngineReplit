import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VersionControlComponent } from './version-control.component';
import { GitService, GitStatus } from '../services/git.service';
import { UserService } from '../services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('VersionControlComponent', () => {
  let component: VersionControlComponent;
  let fixture: ComponentFixture<VersionControlComponent>;
  let gitService: jest.Mocked<GitService>;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const gitServiceMock = {
      getStatus: jest.fn(),
      getCommits: jest.fn(),
      getBranches: jest.fn(),
      commit: jest.fn(),
      push: jest.fn(),
      pull: jest.fn()
    } as unknown as jest.Mocked<GitService>;

    const userServiceMock = {
      currentUser$: of('testUser'),
      getCurrentUser: jest.fn().mockReturnValue('testUser')
    } as unknown as jest.Mocked<UserService>;

    await TestBed.configureTestingModule({
      imports: [VersionControlComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: GitService, useValue: gitServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    gitService = TestBed.inject(GitService) as jest.Mocked<GitService>;
    userService = TestBed.inject(UserService) as jest.Mocked<UserService>;
    
    // Setup default responses
    gitService.getStatus.mockReturnValue(of({
      isDirty: false,
      added: [],
      modified: [],
      removed: [],
      untracked: [],
      currentBranch: 'master',
      commitsAhead: 0,
      commitsBehind: 0
    } as GitStatus));
    gitService.getCommits.mockReturnValue(of([]));
    gitService.getBranches.mockReturnValue(of(['master']));

    fixture = TestBed.createComponent(VersionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('isOnMasterBranch getter', () => {
    it('should return true when current branch is "master"', () => {
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

      expect(component.isOnMasterBranch).toBe(true);
    });

    it('should return true when current branch is "main"', () => {
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'main',
        commitsAhead: 0,
        commitsBehind: 0,
        hasRemoteTracking: true
      };

      expect(component.isOnMasterBranch).toBe(true);
    });

    it('should return true when current branch is "MASTER" (case insensitive)', () => {
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'MASTER',
        commitsAhead: 0,
        commitsBehind: 0,
        hasRemoteTracking: true
      };

      expect(component.isOnMasterBranch).toBe(true);
    });

    it('should return false when current branch is a feature branch', () => {
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'feature-branch',
        commitsAhead: 0,
        commitsBehind: 0,
        hasRemoteTracking: true
      };

      expect(component.isOnMasterBranch).toBe(false);
    });

    it('should return false when gitStatus is null', () => {
      component.gitStatus = null;

      expect(component.isOnMasterBranch).toBe(false);
    });
  });

  describe('canPush getter', () => {
    it('should return false when on master branch even with commits ahead', () => {
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'master',
        commitsAhead: 3,
        commitsBehind: 0,
        hasRemoteTracking: true
      };

      expect(component.canPush).toBe(false);
    });

    it('should return false when on main branch even with commits ahead', () => {
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'main',
        commitsAhead: 2,
        commitsBehind: 0,
        hasRemoteTracking: true
      };

      expect(component.canPush).toBe(false);
    });

    it('should return true when on feature branch with commits ahead', () => {
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'feature-branch',
        commitsAhead: 1,
        commitsBehind: 0,
        hasRemoteTracking: true
      };

      expect(component.canPush).toBe(true);
    });

    it('should return false when on feature branch with no commits ahead', () => {
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'feature-branch',
        commitsAhead: 0,
        commitsBehind: 0,
        hasRemoteTracking: true
      };
      component.commits = [];

      expect(component.canPush).toBe(false);
    });

    it('should return false when gitStatus is null', () => {
      component.gitStatus = null;

      expect(component.canPush).toBe(false);
    });

    it('should return false on tracked feature branch with history but no commits ahead', () => {
      // REGRESSION TEST: Ensure the button stays disabled when branch is up-to-date
      // Even though the branch has commit history, there are no commits to push
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'feature-branch',
        commitsAhead: 0,
        commitsBehind: 0,
        hasRemoteTracking: true
      };
      component.commits = [
        { sha: 'abc123', message: 'First commit', author: 'Test', date: '2025-01-01T00:00:00Z' },
        { sha: 'def456', message: 'Second commit', author: 'Test', date: '2025-01-02T00:00:00Z' }
      ];

      expect(component.canPush).toBe(false);
    });

    it('should return true on new branch without remote tracking that has commits', () => {
      // New feature: Allow push on new branches without remote tracking
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'feature-branch',
        commitsAhead: 0,
        commitsBehind: 0,
        hasRemoteTracking: false
      };
      component.commits = [
        { sha: 'abc123', message: 'First commit', author: 'Test', date: '2025-01-01T00:00:00Z' }
      ];

      expect(component.canPush).toBe(true);
    });

    it('should return false on new branch without remote tracking that has no commits', () => {
      // New branch with no commits should not allow push
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'feature-branch',
        commitsAhead: 0,
        commitsBehind: 0,
        hasRemoteTracking: false
      };
      component.commits = [];

      expect(component.canPush).toBe(false);
    });

    it('should return false on master branch without remote tracking even with commits', () => {
      // Master branch push should be blocked even if no remote tracking
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'master',
        commitsAhead: 0,
        commitsBehind: 0,
        hasRemoteTracking: false
      };
      component.commits = [
        { sha: 'abc123', message: 'First commit', author: 'Test', date: '2025-01-01T00:00:00Z' }
      ];

      expect(component.canPush).toBe(false);
    });
  });

  describe('hasCommitsToPush getter', () => {
    it('should return true when there are commits ahead', () => {
      component.gitStatus = {
        isDirty: false,
        added: [],
        modified: [],
        removed: [],
        untracked: [],
        currentBranch: 'feature-branch',
        commitsAhead: 2,
        commitsBehind: 0,
        hasRemoteTracking: true
      };

      expect(component.hasCommitsToPush).toBe(true);
    });

    it('should return false when there are no commits ahead', () => {
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

      expect(component.hasCommitsToPush).toBe(false);
    });
  });
});
