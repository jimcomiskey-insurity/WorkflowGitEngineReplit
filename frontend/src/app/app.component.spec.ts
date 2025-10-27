import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WorkflowStateService } from './services/workflow-state.service';
import { UserService } from './services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let workflowStateService: jest.Mocked<WorkflowStateService>;
  let userService: jest.Mocked<UserService>;
  let pendingChangesCountSubject: BehaviorSubject<number>;

  beforeEach(async () => {
    pendingChangesCountSubject = new BehaviorSubject<number>(0);

    const workflowStateServiceMock = {
      pendingChangesCount$: pendingChangesCountSubject.asObservable(),
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
        { provide: WorkflowStateService, useValue: workflowStateServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

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
    it('should update pending changes count when WorkflowStateService emits new value', (done) => {
      pendingChangesCountSubject.next(3);

      setTimeout(() => {
        expect(component.pendingChangesCount).toBe(3);
        done();
      }, 100);
    });

    it('should reactively update when pending changes count changes', (done) => {
      // Start with 0
      expect(component.pendingChangesCount).toBe(0);

      // Update to 5
      pendingChangesCountSubject.next(5);

      setTimeout(() => {
        expect(component.pendingChangesCount).toBe(5);

        // Update to 0 again
        pendingChangesCountSubject.next(0);

        setTimeout(() => {
          expect(component.pendingChangesCount).toBe(0);
          done();
        }, 100);
      }, 100);
    });

    it('should subscribe to pendingChangesCount$ on initialization', (done) => {
      // Emit a value after component init
      pendingChangesCountSubject.next(7);

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
});
