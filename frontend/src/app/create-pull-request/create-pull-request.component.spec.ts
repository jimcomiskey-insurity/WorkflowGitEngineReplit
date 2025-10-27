import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePullRequestComponent } from './create-pull-request.component';
import { PullRequestService } from '../services/pull-request.service';
import { GitStateService } from '../services/git-state.service';
import { UserService } from '../services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';
import { GitStatus } from '../services/git.service';

describe('CreatePullRequestComponent', () => {
  let component: CreatePullRequestComponent;
  let fixture: ComponentFixture<CreatePullRequestComponent>;
  let pullRequestService: jest.Mocked<PullRequestService>;
  let gitStateService: jest.Mocked<GitStateService>;
  let gitStatusSubject: BehaviorSubject<GitStatus | null>;
  let branchesSubject: BehaviorSubject<string[]>;

  const cleanGitStatus: GitStatus = {
    isDirty: false,
    added: [],
    modified: [],
    removed: [],
    untracked: [],
    currentBranch: 'feature-1',
    commitsAhead: 0,
    commitsBehind: 0,
    hasRemoteTracking: true
  };

  const dirtyGitStatus: GitStatus = {
    isDirty: true,
    added: ['file.ts'],
    modified: [],
    removed: [],
    untracked: [],
    currentBranch: 'feature-1',
    commitsAhead: 0,
    commitsBehind: 0,
    hasRemoteTracking: true
  };

  const unpushedGitStatus: GitStatus = {
    isDirty: false,
    added: [],
    modified: [],
    removed: [],
    untracked: [],
    currentBranch: 'feature-1',
    commitsAhead: 2,
    commitsBehind: 0,
    hasRemoteTracking: true
  };

  const newBranchGitStatus: GitStatus = {
    isDirty: false,
    added: [],
    modified: [],
    removed: [],
    untracked: [],
    currentBranch: 'feature-new',
    commitsAhead: 0,
    commitsBehind: 0,
    hasRemoteTracking: false
  };

  beforeEach(async () => {
    gitStatusSubject = new BehaviorSubject<GitStatus | null>(cleanGitStatus);
    branchesSubject = new BehaviorSubject<string[]>(['main', 'master', 'feature-1']);

    const pullRequestServiceMock = {
      createPullRequest: jest.fn()
    } as unknown as jest.Mocked<PullRequestService>;

    const gitStateServiceMock = {
      gitStatus$: gitStatusSubject.asObservable(),
      branches$: branchesSubject.asObservable()
    } as unknown as jest.Mocked<GitStateService>;

    const userServiceMock = {
      getCurrentUser: jest.fn().mockReturnValue('testUser')
    } as unknown as jest.Mocked<UserService>;

    await TestBed.configureTestingModule({
      imports: [CreatePullRequestComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PullRequestService, useValue: pullRequestServiceMock },
        { provide: GitStateService, useValue: gitStateServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    pullRequestService = TestBed.inject(PullRequestService) as jest.Mocked<PullRequestService>;
    gitStateService = TestBed.inject(GitStateService) as jest.Mocked<GitStateService>;

    fixture = TestBed.createComponent(CreatePullRequestComponent);
    component = fixture.componentInstance;
    component.userId = 'testUser';
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load current branch from GitStateService', (done) => {
      setTimeout(() => {
        expect(component.sourceBranch).toBe('feature-1');
        done();
      }, 100);
    });

    it('should load available branches from GitStateService', (done) => {
      setTimeout(() => {
        expect(component.availableBranches).toContain('main');
        expect(component.availableBranches).toContain('master');
        expect(component.availableBranches).not.toContain('feature-1'); // Current branch excluded
        done();
      }, 100);
    });

    it('should set default target branch to main if available', (done) => {
      setTimeout(() => {
        expect(component.targetBranch).toBe('main');
        done();
      }, 100);
    });
  });

  describe('Validation - hasUncommittedChanges', () => {
    it('should return false when git status is clean', (done) => {
      gitStatusSubject.next(cleanGitStatus);

      setTimeout(() => {
        expect(component.hasUncommittedChanges).toBe(false);
        done();
      }, 100);
    });

    it('should return true when git status is dirty', (done) => {
      gitStatusSubject.next(dirtyGitStatus);

      setTimeout(() => {
        expect(component.hasUncommittedChanges).toBe(true);
        done();
      }, 100);
    });
  });

  describe('Validation - isBranchPushed', () => {
    it('should return true when branch has remote tracking and no commits ahead', (done) => {
      gitStatusSubject.next(cleanGitStatus);

      setTimeout(() => {
        expect(component.isBranchPushed).toBe(true);
        done();
      }, 100);
    });

    it('should return false when branch has commits ahead', (done) => {
      gitStatusSubject.next(unpushedGitStatus);

      setTimeout(() => {
        expect(component.isBranchPushed).toBe(false);
        done();
      }, 100);
    });

    it('should return false when branch has no remote tracking', (done) => {
      gitStatusSubject.next(newBranchGitStatus);

      setTimeout(() => {
        expect(component.isBranchPushed).toBe(false);
        done();
      }, 100);
    });
  });

  describe('Submit Button State - canSubmit', () => {
    beforeEach(() => {
      component.title = 'Test PR';
    });

    it('should be enabled when all conditions are met', (done) => {
      gitStatusSubject.next(cleanGitStatus);

      setTimeout(() => {
        expect(component.canSubmit).toBe(true);
        done();
      }, 100);
    });

    it('should be disabled when title is empty', (done) => {
      component.title = '';
      gitStatusSubject.next(cleanGitStatus);

      setTimeout(() => {
        expect(component.canSubmit).toBe(false);
        done();
      }, 100);
    });

    it('should be disabled when there are uncommitted changes', (done) => {
      gitStatusSubject.next(dirtyGitStatus);

      setTimeout(() => {
        expect(component.canSubmit).toBe(false);
        done();
      }, 100);
    });

    it('should be disabled when branch is not pushed', (done) => {
      gitStatusSubject.next(unpushedGitStatus);

      setTimeout(() => {
        expect(component.canSubmit).toBe(false);
        done();
      }, 100);
    });

    it('should be disabled when submitting', (done) => {
      gitStatusSubject.next(cleanGitStatus);
      component.isSubmitting = true;

      setTimeout(() => {
        expect(component.canSubmit).toBe(false);
        done();
      }, 100);
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      component.title = 'Test PR Title';
      component.description = 'Test description';
      component.sourceBranch = 'feature-1';
      component.targetBranch = 'main';
    });

    it('should create PR when all validations pass', (done) => {
      gitStatusSubject.next(cleanGitStatus);
      pullRequestService.createPullRequest.mockReturnValue(of({
        number: 1,
        title: 'Test PR Title',
        description: 'Test description',
        sourceBranch: 'feature-1',
        targetBranch: 'main',
        status: 'Open',
        author: 'testUser',
        createdDate: new Date().toISOString()
      }));

      setTimeout(() => {
        component.onSubmit();

        expect(pullRequestService.createPullRequest).toHaveBeenCalledWith('testUser', {
          title: 'Test PR Title',
          description: 'Test description',
          sourceBranch: 'feature-1',
          targetBranch: 'main'
        });
        done();
      }, 100);
    });

    it('should not create PR when there are uncommitted changes', (done) => {
      gitStatusSubject.next(dirtyGitStatus);
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation();

      setTimeout(() => {
        component.onSubmit();

        expect(pullRequestService.createPullRequest).not.toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith(
          'You have uncommitted changes. Please commit your changes before creating a pull request.'
        );
        alertSpy.mockRestore();
        done();
      }, 100);
    });

    it('should not create PR when branch is not pushed', (done) => {
      gitStatusSubject.next(unpushedGitStatus);
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation();

      setTimeout(() => {
        component.onSubmit();

        expect(pullRequestService.createPullRequest).not.toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith(
          'This branch has not been pushed to the remote repository. Please push your changes before creating a pull request.'
        );
        alertSpy.mockRestore();
        done();
      }, 100);
    });

    it('should not submit when title is empty', () => {
      component.title = '';
      component.onSubmit();

      expect(pullRequestService.createPullRequest).not.toHaveBeenCalled();
    });
  });
});
