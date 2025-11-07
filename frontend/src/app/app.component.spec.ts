import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WorkflowStateService } from './services/workflow-state.service';
import { UserService } from './services/user.service';
import { GitStateService } from './services/git-state.service';
import { ProgramStateService } from './services/program-state.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let userService: jest.Mocked<UserService>;
  let programStateService: jest.Mocked<ProgramStateService>;

  beforeEach(async () => {
    const gitStateServiceMock = {
      gitStatus$: new BehaviorSubject(null).asObservable(),
      commits$: new BehaviorSubject([]).asObservable(),
      branches$: new BehaviorSubject([]).asObservable(),
      lastPushedCommit$: new BehaviorSubject(null).asObservable(),
      refresh: jest.fn()
    } as unknown as jest.Mocked<GitStateService>;

    const workflowStateServiceMock = {
      refresh: jest.fn()
    } as unknown as jest.Mocked<WorkflowStateService>;

    const userServiceMock = {
      currentUser$: new BehaviorSubject<string>('testUser').asObservable(),
      getCurrentUser: jest.fn().mockReturnValue('testUser'),
      getAvailableUsers: jest.fn().mockReturnValue(['userA', 'userB', 'userC']),
      setCurrentUser: jest.fn()
    } as unknown as jest.Mocked<UserService>;

    const programStateServiceMock = {
      programs$: new BehaviorSubject([]).asObservable(),
      currentProgramId$: new BehaviorSubject('default').asObservable(),
      getCurrentProgramId: jest.fn().mockReturnValue('default'),
      loadPrograms: jest.fn(),
      isInProgramContext: jest.fn().mockReturnValue(false)
    } as unknown as jest.Mocked<ProgramStateService>;

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: GitStateService, useValue: gitStateServiceMock },
        { provide: WorkflowStateService, useValue: workflowStateServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: ProgramStateService, useValue: programStateServiceMock }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService) as jest.Mocked<UserService>;
    programStateService = TestBed.inject(ProgramStateService) as jest.Mocked<ProgramStateService>;

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with current user', () => {
      expect(component.currentUser).toBe('testUser');
    });

    it('should load programs on init', () => {
      expect(programStateService.loadPrograms).toHaveBeenCalledWith('testUser');
    });
  });

  describe('User Selection', () => {
    it('should have available users', () => {
      expect(component.availableUsers).toEqual(['userA', 'userB', 'userC']);
    });

    it('should call userService.setCurrentUser when onUserChange is called', () => {
      component.onUserChange('userB');
      expect(userService.setCurrentUser).toHaveBeenCalledWith('userB');
    });

    it('should reload programs when user changes', () => {
      component.onUserChange('userB');
      expect(programStateService.loadPrograms).toHaveBeenCalledWith('userB');
    });
  });

  describe('Program Context', () => {
    it('should check if in program context', () => {
      expect(programStateService.isInProgramContext).toHaveBeenCalled();
    });
  });
});
