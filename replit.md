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
- Mock HttpClient using Jest mocks or Angular's HttpTestingController
- Test RxJS observables using marble testing or subscription patterns
- Use `fixture.detectChanges()` to trigger change detection in tests
- Mock route parameters and navigation for router-dependent components

## System Architecture

### UI/UX Decisions

The frontend features a modern dark theme with a redesigned layout, including a persistent top header, sidebar navigation, a card-grid for workflows, and dedicated views for Version Control and Pending Changes. Key elements include workflow cards, a collapsible commit history, branch management dropdowns, and visual indicators for synchronization status and pending changes.

### Technical Implementations

**Frontend**:
- Built with Angular 20.3.6 (Standalone Components) using client-side routing and lazy-loaded components.
- Utilizes RxJS for state management and asynchronous operations.
- Employs a service-based architecture and automatically refreshes data based on user selection.

**Backend**:
- Developed using ASP.NET Core 8.0 Web API, providing RESTful endpoints.
- Workflows are stored as JSON files in the filesystem for Git versioning.
- Integrates LibGit2Sharp for all Git operations.
- Supports multi-user access through isolated, user-specific Git repositories connected to a central repository.
- Employs RxJS `switchMap` and `merge` for data refreshing and multi-user data isolation.
- Includes Git status enrichment to identify changes at workflow, phase, and task levels.
- Tasks have unique `TaskId` for stable tracking, with legacy tasks receiving deterministic IDs.

### Feature Specifications

-   **Workflow Management**: CRUD operations for workflows, including nested phases and tasks with dependencies, role assignments, duration estimates, and automation flags.
-   **Pull Requests**: Full PR workflow including creation, viewing, filtering, branch comparison, merging, and closing. PRs are stored in a shared global JSON file, are collaborative, and track both source and target branch commit SHAs at creation.
-   **Git Version Control**: Tracks changes, commits, and synchronizes with a central repository. Displays Git status, commit history, branch management (create, switch, push), and counts of commits ahead/behind the remote. Includes visual change indicators for added, modified, and deleted items at all levels and a dedicated Pending Changes View for reviewing uncommitted modifications.
-   **Repository Reset**: A testing utility to reset the entire system to its initial state, deleting all user and central repositories and reinitializing with sample data.
-   **User Management**: Global user selector with session-based persistence, isolated Git repository clones per user, and real-time data refresh across components.

### System Design Choices

-   **File-based Storage**: Workflows are stored as JSON files for Git integration, human readability, and portability.
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