import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { WorkflowService, Workflow, ProgramWorkflows, Phase, TaskItem } from './workflow.service';
import { UserService } from './user.service';
import { ProgramStateService } from './program-state.service';

describe('WorkflowService', () => {
  let service: WorkflowService;
  let httpMock: HttpTestingController;
  let userServiceMock: jest.Mocked<UserService>;
  let programStateServiceMock: jest.Mocked<ProgramStateService>;

  const mockUserId = 'testUser';
  const mockProgramId = 'default';
  const mockWorkflow: Workflow = {
    workflowName: 'Test Workflow',
    workflowKey: 'test-workflow',
    description: 'Test Description',
    phases: [
      {
        phaseName: 'Phase 1',
        phaseOrder: 1,
        tasks: [
          {
            taskId: 'task-1',
            taskName: 'Task 1',
            taskType: 'Manual',
            assignedRole: 'Developer',
            estimatedDurationHours: 2,
            dependencies: [],
            isAutomated: false
          }
        ]
      }
    ]
  };

  const mockProgramWorkflows: ProgramWorkflows = {
    workflows: [mockWorkflow]
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
        WorkflowService,
        { provide: UserService, useValue: userServiceMock },
        { provide: ProgramStateService, useValue: programStateServiceMock }
      ]
    });

    service = TestBed.inject(WorkflowService);
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

  describe('getWorkflows()', () => {
    it('should retrieve all workflows for current user', (done) => {
      service.getWorkflows().subscribe({
        next: (workflows) => {
          expect(workflows).toEqual(mockProgramWorkflows);
          expect(workflows.workflows.length).toBe(1);
          expect(workflows.workflows[0].workflowKey).toBe('test-workflow');
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProgramWorkflows);
    });

    it('should include userId and programId from service dependencies', () => {
      service.getWorkflows().subscribe();

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows`);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalled();
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalled();
      req.flush(mockProgramWorkflows);
    });

    it('should handle empty workflows list', (done) => {
      const emptyWorkflows: ProgramWorkflows = { workflows: [] };

      service.getWorkflows().subscribe({
        next: (workflows) => {
          expect(workflows.workflows).toEqual([]);
          expect(workflows.workflows.length).toBe(0);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows`);
      req.flush(emptyWorkflows);
    });
  });

  describe('getWorkflow()', () => {
    it('should retrieve a single workflow by key', (done) => {
      const workflowKey = 'test-workflow';

      service.getWorkflow(workflowKey).subscribe({
        next: (workflow) => {
          expect(workflow).toEqual(mockWorkflow);
          expect(workflow.workflowKey).toBe(workflowKey);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows/${workflowKey}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockWorkflow);
    });

    it('should include workflowKey in URL path', () => {
      const workflowKey = 'test-workflow';
      service.getWorkflow(workflowKey).subscribe();

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows/${workflowKey}`);
      expect(req.request.url).toContain(workflowKey);
      req.flush(mockWorkflow);
    });
  });

  describe('createWorkflow()', () => {
    it('should create a new workflow', (done) => {
      const newWorkflow: Workflow = {
        workflowName: 'New Workflow',
        workflowKey: 'new-workflow',
        description: 'New Description',
        phases: []
      };

      service.createWorkflow(newWorkflow).subscribe({
        next: (workflow) => {
          expect(workflow).toEqual(newWorkflow);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newWorkflow);
      req.flush(newWorkflow);
    });

    it('should send workflow data in request body', () => {
      service.createWorkflow(mockWorkflow).subscribe();

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows`);
      expect(req.request.body).toBe(mockWorkflow);
      req.flush(mockWorkflow);
    });
  });

  describe('updateWorkflow()', () => {
    it('should update an existing workflow', (done) => {
      const workflowKey = 'test-workflow';
      const updatedWorkflow: Workflow = {
        ...mockWorkflow,
        description: 'Updated Description'
      };

      service.updateWorkflow(workflowKey, updatedWorkflow).subscribe({
        next: (workflow) => {
          expect(workflow).toEqual(updatedWorkflow);
          expect(workflow.description).toBe('Updated Description');
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows/${workflowKey}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedWorkflow);
      req.flush(updatedWorkflow);
    });

    it('should include workflow key in URL path', () => {
      const workflowKey = 'specific-key';
      service.updateWorkflow(workflowKey, mockWorkflow).subscribe();

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows/${workflowKey}`);
      expect(req.request.url).toContain(workflowKey);
      req.flush(mockWorkflow);
    });
  });

  describe('deleteWorkflow()', () => {
    it('should delete a workflow by key', (done) => {
      const workflowKey = 'test-workflow';

      service.deleteWorkflow(workflowKey).subscribe({
        next: () => {
          expect(true).toBe(true);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows/${workflowKey}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should include userId and programId in delete request', () => {
      const workflowKey = 'test-workflow';
      service.deleteWorkflow(workflowKey).subscribe();

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows/${workflowKey}`);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalled();
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalled();
      req.flush(null);
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP error on getWorkflows', (done) => {
      const errorMessage = 'Server error';

      service.getWorkflows().subscribe({
        next: () => done.fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Server Error');
          done();
        }
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows`);
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });

    it('should handle 404 error on getWorkflow', (done) => {
      const workflowKey = 'non-existent';

      service.getWorkflow(workflowKey).subscribe({
        next: () => done.fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(404);
          done();
        }
      });

      const req = httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows/${workflowKey}`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('Service Integration', () => {
    it('should call UserService.getCurrentUser and ProgramStateService.getCurrentProgramId for all API calls', () => {
      userServiceMock.getCurrentUser.mockClear();
      programStateServiceMock.getCurrentProgramId.mockClear();

      service.getWorkflows().subscribe();
      httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows`).flush(mockProgramWorkflows);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalledTimes(1);
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalledTimes(1);

      service.getWorkflow('key').subscribe();
      httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows/key`).flush(mockWorkflow);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalledTimes(2);
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalledTimes(2);

      service.createWorkflow(mockWorkflow).subscribe();
      httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows`).flush(mockWorkflow);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalledTimes(3);
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalledTimes(3);

      service.updateWorkflow('key', mockWorkflow).subscribe();
      httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows/key`).flush(mockWorkflow);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalledTimes(4);
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalledTimes(4);

      service.deleteWorkflow('key').subscribe();
      httpMock.expectOne(`/api/users/${mockUserId}/programs/${mockProgramId}/workflows/key`).flush(null);
      expect(userServiceMock.getCurrentUser).toHaveBeenCalledTimes(5);
      expect(programStateServiceMock.getCurrentProgramId).toHaveBeenCalledTimes(5);
    });
  });
});
