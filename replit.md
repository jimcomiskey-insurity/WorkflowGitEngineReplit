# Insurance Workflow Configuration System

## Overview

This is a full-stack application for managing insurance workflow configurations with integrated Git version control. It enables users to create, edit, and manage insurance workflows (e.g., New Business, Renewals) that comprise multi-phase task structures with dependencies, role assignments, and automation flags. The system tracks changes, commits modifications, and synchronizes with a central Git repository, providing a robust solution for workflow configuration management.

## User Preferences

Preferred communication style: Simple, everyday language.

### Testing Requirements

**Mandatory for all code changes:**
- Always write unit tests for new features and bug fixes
- Use xUnit as the testing framework for .NET backend code
- Follow AAA pattern (Arrange, Act, Assert) for test structure
- Target minimum 80% code coverage for new code
- Run all tests before marking tasks as complete
- Update existing tests when modifying functionality
- Include regression tests for critical bugs

**Test execution workflow:**
- Run `dotnet test` in the test project directory before deployment
- All tests must pass before marking work complete
- Use FluentAssertions for readable test assertions
- Use Moq for mocking dependencies in unit tests

**Test organization:**
- Unit tests: `backend.tests/WorkflowConfig.Api.Tests/`
- E2E tests: `backend.tests/WorkflowConfig.E2E.Tests/`
- Mirror the backend structure in test projects
- One test file per service/controller

### Frontend Testing Requirements

**Mandatory for all frontend code changes:**
- Always write unit tests for new components, services, and utilities
- Use Jest as the testing framework for Angular frontend code
- Use jest-preset-angular for Angular-specific Jest configuration
- Follow Describe/It/Expect pattern (similar to AAA: Arrange, Act, Assert)
- Target minimum 80% code coverage for new code
- Run all tests before marking tasks as complete
- Update existing tests when modifying functionality

**Frontend test execution workflow:**
- Run `npm test` in the frontend directory before deployment
- All tests must pass before marking work complete
- Use Jest's built-in mocking for dependencies and HTTP calls
- Use Angular's TestBed for component and service testing

**Frontend test organization:**
- Test files: Co-located with source files using `.spec.ts` suffix
- Component tests: Test rendering, user interactions, and bindings
- Service tests: Test business logic, HTTP calls, and RxJS streams
- Integration tests: Test component-service interactions
- Each component/service should have a corresponding `.spec.ts` file

**Frontend testing patterns:**
- Use `TestBed.configureTestingModule()` for Angular dependency injection
- Use `provideHttpClient()` and `provideHttpClientTesting()` providers (Angular 18+) instead of deprecated HttpClientTestingModule
- Mock HttpClient using Angular's HttpTestingController for HTTP request/response testing
- Test RxJS observables using marble testing or subscription patterns
- Use `fixture.detectChanges()` to trigger change detection in tests
- Mock route parameters and navigation for router-dependent components

**HTTP Testing Setup (Modern Angular 18+):**
```typescript
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

TestBed.configureTestingModule({
  providers: [
    provideHttpClient(),
    provideHttpClientTesting(),
    YourService
  ]
});
```

## System Architecture

### UI/UX Decisions

The frontend features a modern dark theme with a redesigned layout, including a persistent top header, sidebar navigation, a card-grid for workflows, and dedicated views for Version Control and Pending Changes. Key elements include workflow cards, a collapsible commit history, branch management dropdowns, and visual indicators for synchronization status and pending changes.

### Technical Implementations

**Frontend**:
- Built with Angular 20.3.6 (Standalone Components) using client-side routing and lazy-loaded components.
- **Centralized State Management**: Implements reactive state management using RxJS BehaviorSubjects via dedicated state services:
  - `GitStateService`: Manages Git state (status, commits, branches, lastPushedCommit) with automatic refresh after all Git operations
  - `WorkflowStateService`: Manages workflow state with automatic refresh on user changes, manual triggers, and Git events
  - All components subscribe to observable streams and automatically receive updates
  - Eliminates manual refresh logic across components
  - Ensures automatic synchronization - all UI components stay in sync with backend state changes
- Components use subscription-based architecture for automatic data updates without manual refresh calls
- State services use `shareReplay(1)` to provide cached, consistent data to all subscribers

**Backend**:
- Developed using ASP.NET Core 8.0 Web API, providing RESTful endpoints.
- **Split-File Persistence**: Workflows are persisted using a split-file structure for better Git tracking:
  - `workflow-list.json`: Contains ordered list of workflow Guid IDs
  - `workflows/{workflowId}.json`: Individual JSON file for each workflow
  - Each workflow has a unique `Guid Id` property for stable identification
  - Deleting a workflow removes both its entry from the list and its individual file
  - **Backward Compatibility**: System reads legacy `workflows.json` format and auto-migrates to split-file format on first write
- Integrates LibGit2Sharp for all Git operations.
- Supports multi-user access through isolated, user-specific Git repositories connected to a central repository.
- Employs RxJS `switchMap` and `merge` for data refreshing and multi-user data isolation.
- Includes Git status enrichment to identify changes at workflow, phase, and task levels.
- Tasks have unique `TaskId` for stable tracking, with legacy tasks receiving deterministic IDs.
- **PR Comparison Fix**: Pull requests now correctly compare against remote branches (origin/master) rather than local branches, ensuring accurate commit counts even when local master has unpushed changes. The `GetBranchCommitSha` method with `preferRemote=true` strictly uses remote tracking branches with branch name normalization to handle both "master" and "origin/master" inputs.
- **Task Reordering Detection**: Git status enrichment properly detects when tasks are reordered within a phase by comparing TaskIds at each position, with TaskName fallback for legacy data. Phases are automatically marked as "modified" when task count changes or tasks are reordered, ensuring accurate tracking in Pending Changes view.

### Feature Specifications

-   **Workflow Management**: CRUD operations for workflows, including nested phases and tasks with dependencies, role assignments, duration estimates, and automation flags.
-   **Pull Requests**: Full PR workflow including creation, viewing, filtering, branch comparison, merging, and closing. PRs are stored in a shared global JSON file, are collaborative, and track both source and target branch commit SHAs at creation.
-   **Git Version Control**: Tracks changes, commits, and synchronizes with a central repository. Displays Git status, commit history, branch management (create, switch, push), and counts of commits ahead/behind the remote. Includes visual change indicators for added, modified, and deleted items at all levels and a dedicated Pending Changes View for reviewing uncommitted modifications. **Master branch protection**: Direct pushes to 'master' or 'main' branches are blocked - users must create feature branches and use pull requests for changes. **Commit Reset**: Allows users to reset to the last pushed commit (remote tracking branch tip) with safety checks, using mixed reset mode to preserve working directory changes while undoing commits.
-   **Repository Reset**: A testing utility to reset the entire system to its initial state, deleting all user and central repositories and reinitializing with sample data.
-   **User Management**: Global user selector with session-based persistence, isolated Git repository clones per user, and real-time data refresh across components.

### System Design Choices

-   **Split-File Persistence**: Workflows use a split-file structure for improved Git granularity:
    -   **Benefits**: Individual workflow changes affect only that workflow's file, clearer Git history, easier conflict resolution, explicit deletions
    -   **Format**: `workflow-list.json` for ordered IDs + `workflows/{guid}.json` per workflow
    -   **Migration**: Automatic migration from legacy single-file format on first write operation
    -   **Write Optimization**: Files are only written when content actually changes, preventing unnecessary Git modifications and ensuring clean pending changes
    -   **Backward Compatibility**: All Git operations (merge, conflict resolution, status enrichment) support both legacy and new formats
-   **Persistent Storage**: All runtime data (user repositories, pull requests) is stored in `/home/runner/workflow-data/` to ensure data persistence across restarts, avoid nested Git repositories, and separate application code from runtime data.
-   **Multi-user Support**: Each user operates within an isolated Git repository cloned from a central one, ensuring data separation and individual version control.
-   **API Integration**: Frontend communicates with the backend via Workflow Service (`/api/workflows`) and Git Service (`/api/git`) APIs.

## External Dependencies

### Backend Dependencies

-   **LibGit2Sharp (v0.31.0)**: For native Git operations.
-   **Microsoft.AspNetCore.OpenApi (v8.0.18)**: For OpenAPI specification generation.
-   **Swashbuckle.AspNetCore (v6.6.2)**: For Swagger UI integration.

### Frontend Dependencies

-   **Angular (v20.3.6)**: Core frontend framework.
-   **RxJS (v7.8.2)**: For reactive programming.
-   **Zone.js (v0.15.1)**: For change detection.