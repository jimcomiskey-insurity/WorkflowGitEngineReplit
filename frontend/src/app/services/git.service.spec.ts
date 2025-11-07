import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { GitService, GitStatus, CommitRequest, CommitInfo } from './git.service';
import { UserService } from './user.service';
import { ProgramStateService } from './program-state.service';

describe('GitService', () => {
  let service: GitService;
  let httpMock: HttpTestingController;
  let userServiceMock: jest.Mocked<UserService>;
  let programStateServiceMock: jest.Mocked<ProgramStateService>;

  const mockUserId = 'testUser';
  const mockProgramId = 'default';
  const mockGitStatus: GitStatus = {
    added: ['file1.txt'],
    modified: ['file2.txt'],
    removed: [],
    untracked: ['file3.txt'],
    currentBranch: 'main',
    isDirty: true,
    commitsAhead: 0,
    commitsBehind: 0,
    hasRemoteTracking: true
  };

  const mockCommitRequest: CommitRequest = {
    message: 'Test commit',
    authorName: 'Test User',
    authorEmail: 'test@example.com'
  };

  const mockCommitInfo: CommitInfo = {
    sha: 'abc123',
    message: 'Test commit',
    author: 'Test User',
    date: '2024-01-01T00:00:00Z'
  };

  beforeEach(() => {
    userServiceMock = {
      getCurrentUser: jest.fn().mockReturnValue(mockUserId)
    } as any;

    programStateServiceMock = {
      getCurrentProgramId: jest.fn().mockReturnValue(mockProgramId)
    } as any;

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        GitService,
        { provide: UserService, useValue: userServiceMock },
        { provide: ProgramStateService, useValue: programStateServiceMock }
      ]
    });

    service = TestBed.inject(GitService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('getStatus()', () => {
    it('should retrieve git status', (done) => {
      service.getStatus().subscribe({
        next: (status) => {
          expect(status).toEqual(mockGitStatus);
          expect(status.currentBranch).toBe('main');
          expect(status.isDirty).toBe(true);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/status`);
      expect(req.request.method).toBe('GET');
      req.flush(mockGitStatus);
    });

    it('should include userId and programId from service dependencies', () => {
      service.getStatus().subscribe();

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/status`);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalled();
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalled();
      req.flush(mockGitStatus);
    });
  });

  describe('commit()', () => {
    it('should create a commit', (done) => {
      service.commit(mockCommitRequest).subscribe({
        next: (result) => {
          expect(result).toBeTruthy();
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/commit`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockCommitRequest);
      req.flush({ success: true });
    });
  });

  describe('discard()', () => {
    it('should discard changes', (done) => {
      service.discard().subscribe({
        next: (result) => {
          expect(result).toBeTruthy();
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/discard`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({});
      req.flush({ success: true });
    });
  });

  describe('pull()', () => {
    it('should pull from remote', (done) => {
      service.pull().subscribe({
        next: (result) => {
          expect(result).toBeTruthy();
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/pull`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({});
      req.flush({ success: true });
    });
  });

  describe('push()', () => {
    it('should push to remote', (done) => {
      service.push().subscribe({
        next: (result) => {
          expect(result).toBeTruthy();
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/push`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({});
      req.flush({ success: true });
    });
  });

  describe('getBranches()', () => {
    it('should retrieve list of branches', (done) => {
      const mockBranches = ['main', 'develop', 'feature/test'];

      service.getBranches().subscribe({
        next: (branches) => {
          expect(branches).toEqual(mockBranches);
          expect(branches.length).toBe(3);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/branches`);
      expect(req.request.method).toBe('GET');
      req.flush(mockBranches);
    });
  });

  describe('createBranch()', () => {
    it('should create a new branch', (done) => {
      const branchName = 'feature/new-feature';

      service.createBranch(branchName).subscribe({
        next: (result) => {
          expect(result).toBeTruthy();
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/branches`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ branchName });
      req.flush({ success: true });
    });
  });

  describe('switchBranch()', () => {
    it('should switch to a different branch', (done) => {
      const branchName = 'develop';

      service.switchBranch(branchName).subscribe({
        next: (result) => {
          expect(result).toBeTruthy();
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/branches/switch`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ branchName });
      req.flush({ success: true });
    });
  });

  describe('getCommits()', () => {
    it('should retrieve commit history with default count', (done) => {
      const mockCommits = [mockCommitInfo];

      service.getCommits().subscribe({
        next: (commits) => {
          expect(commits).toEqual(mockCommits);
          expect(commits.length).toBe(1);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/commits?count=20`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCommits);
    });

    it('should retrieve commit history with custom count', (done) => {
      const mockCommits = [mockCommitInfo];

      service.getCommits(10).subscribe({
        next: (commits) => {
          expect(commits).toEqual(mockCommits);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/commits?count=10`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCommits);
    });
  });

  describe('getLastPushedCommit()', () => {
    it('should retrieve last pushed commit', (done) => {
      const mockLastCommit = { commitSha: 'abc123', message: 'Last commit' };

      service.getLastPushedCommit().subscribe({
        next: (commit) => {
          expect(commit).toEqual(mockLastCommit);
          expect(commit.commitSha).toBe('abc123');
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/last-pushed-commit`);
      expect(req.request.method).toBe('GET');
      req.flush(mockLastCommit);
    });

    it('should handle null last pushed commit', (done) => {
      const mockLastCommit = { commitSha: null };

      service.getLastPushedCommit().subscribe({
        next: (commit) => {
          expect(commit.commitSha).toBeNull();
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/last-pushed-commit`);
      req.flush(mockLastCommit);
    });
  });

  describe('resetToCommit()', () => {
    it('should reset to a specific commit', (done) => {
      const commitSha = 'abc123';

      service.resetToCommit(commitSha).subscribe({
        next: (result) => {
          expect(result).toBeTruthy();
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/reset-to-commit`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ commitSha });
      req.flush({ success: true });
    });
  });

  describe('resetAllRepositories()', () => {
    it('should reset all repositories (global endpoint)', (done) => {
      service.resetAllRepositories().subscribe({
        next: (result) => {
          expect(result).toBeTruthy();
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne('/api/git/reset');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({});
      req.flush({ success: true });
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP error on getStatus', (done) => {
      const errorMessage = 'Server error';

      service.getStatus().subscribe({
        next: () => done.fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Server Error');
          done();
        }
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/status`);
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });

    it('should handle error on commit', (done) => {
      service.commit(mockCommitRequest).subscribe({
        next: () => done.fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(400);
          done();
        }
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/commit`);
      req.flush('Commit failed', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('Service Integration', () => {
    it('should call UserService.getCurrentUser and ProgramStateService.getCurrentProgramId for scoped API calls', () => {
      userServiceMock.getCurrentUser.mockClear();
      programStateServiceMock.getCurrentProgramId.mockClear();

      service.getStatus().subscribe();
      httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/status`).flush(mockGitStatus);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalledTimes(1);
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalledTimes(1);

      service.commit(mockCommitRequest).subscribe();
      httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/commit`).flush({ success: true });
      expect(userServiceMock.getCurrentUser).toHaveBeenCalledTimes(2);
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalledTimes(2);

      service.getBranches().subscribe();
      httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/git/branches`).flush(['main']);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalledTimes(3);
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalledTimes(3);
    });

    it('should not call ProgramStateService for global endpoints', () => {
      userServiceMock.getCurrentUser.mockClear();
      programStateServiceMock.getCurrentProgramId.mockClear();

      service.resetAllRepositories().subscribe();
      httpMock.expectOne('/api/git/reset').flush({ success: true });
      
      expect(userServiceMock.getCurrentUser).not.toHaveBeenCalled();
      expect(programStateServiceMock.getCurrentProgramId).not.toHaveBeenCalled();
    });
  });
});
