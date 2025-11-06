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

### E2E Testing with NSwag API Client Generation

**Automated API client code generation:**
- NSwag.MSBuild automatically generates strongly-typed C# API clients from the backend's OpenAPI spec
- Configuration file: `backend.tests/WorkflowConfig.E2E.Tests/nswag.json`
- Auto-regeneration on every build keeps clients in sync with backend API
- Generated files:
  - `Generated/ApiClients.g.cs` - Strongly-typed API client methods
  - `Generated/Contracts.g.cs` - Request/response model classes
- Benefits: Compile-time safety, IntelliSense support, eliminates route guessing
- Usage: E2E tests use `IClient` interface with injected HttpClient for API calls

**Known limitations:**
- Backend OpenAPI annotations for 201 Created responses recently added
- Some tests may require workarounds for status code handling until regeneration completes

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

The frontend features a modern dark theme with a redesigned layout, including a persistent top header, sidebar navigation, a card-grid for workflows, and dedicated views for Version Control and Pending Changes. Key elements include workflow cards, a collapsible commit history, branch management dropdowns, and visual indicators for synchronization status and pending changes. The header includes an "API Docs" link that provides quick access to the backend's Swagger UI documentation in a new tab.

### Technical Implementations

**Frontend**:
- Built with Angular 20.3.6 (Standalone Components) using client-side routing and lazy-loaded components.
- **Centralized State Management**: Implements reactive state management using RxJS BehaviorSubjects via dedicated state services (`GitStateService`, `WorkflowStateService`, `AssetStateService`, `DataStoreStateService`) for automatic refresh and UI synchronization.
- **Monaco Editor Integration**: Rich text editor for XML, JSON, XSLT, and TXT files with syntax highlighting and vs-dark theme, loaded dynamically via `MonacoService` singleton to prevent duplicate initialization across components. Includes Monaco Diff Editor for comparisons, continuous auto-save with retry logic, and branch-aware editing.
- **Monaco Conflict Resolution**: Visual Git conflict editor with syntax highlighting, color-coded conflict blocks (red for current, blue for incoming). Provides "Accept All Current" and "Accept All Incoming" header buttons for quick resolution, plus manual editing capability. Supports multiple simultaneous conflict editors with proper resource cleanup.

**Backend**:
- Developed using ASP.NET Core 8.0 Web API, providing RESTful endpoints.
- **Split-File Persistence**: Workflows and assets are persisted using split-file structures for granular Git tracking (`workflow-list.json` + `workflows/{workflowId}.json`; `asset-list.json` + `assets/{assetId}.json` + `asset-files/{assetId}/{filename}`). Includes backward compatibility and automatic migration.
- **Asset File Storage**: Uploaded files stored in deterministic per-asset directories (`asset-files/{assetId}/`).
- Integrates LibGit2Sharp for all Git operations.
- Supports multi-user access through isolated, user-specific Git repositories.
- Employs RxJS `switchMap` and `merge` for data refreshing and multi-user data isolation.
- Includes Git status enrichment to identify changes at workflow, phase, task, and asset levels, including asset metadata and file content.
- **PR Comparison Fix**: Pull requests compare against remote branches (`origin/master`) for accurate commit counts.
- **Task Reordering Detection**: Git status enrichment properly detects task reordering within phases.
- **Commit SHA Tracking**: BranchComparison model includes `SourceCommitSha` and `TargetCommitSha` for precise commit comparisons.
- **Asset Diff Viewer Enhancements**: Handles renamed, added, and deleted assets in the diff viewer by resolving appropriate filenames per commit.

### Feature Specifications

-   **Workflow Management**: CRUD operations for workflows, including nested phases and tasks with dependencies, role assignments, duration estimates, and automation flags.
-   **Asset Management**: CRUD operations for assets with metadata and file upload capabilities. Supports rich text editing with Monaco Editor for various file types, continuous auto-save, and branch-aware content reloading.
-   **Data Store Management**: CRUD operations for data stores with hierarchical structure (DataStore > DataGroup > DataPoint). Supports 13 data point types (String, Integer, Decimal, Date, Email, Phone, URL, Money, Zipcode, Timestamp, Year, Yes-No, List of Strings). Features include a tree-based editor with expand/collapse navigation, context menus for adding nested groups and points, type selector modal, and detail forms with configuration options (Basic/List/Advanced modes, validation rules, default values).
-   **Pull Requests**: Full PR workflow including creation, viewing, filtering, branch comparison, merging, and closing. PRs are collaborative, stored in a shared global JSON file, and track commit SHAs. Asset file diffs are displayed using Monaco Diff Editor.
-   **Git Version Control**: Tracks changes, commits, and synchronizes with a central repository. Displays Git status, commit history, branch management (create, switch, push), and counts of commits ahead/behind. Includes visual change indicators, a Pending Changes View, master branch protection, and a commit reset feature.
-   **Conflict Resolution**: Monaco-based visual conflict resolution for asset file merge conflicts. Detects Git conflict markers, provides syntax highlighting with color-coded blocks, and offers one-click resolution via inline action buttons. Supports multiple simultaneous conflict editors.
-   **Repository Reset**: A testing utility to reset the entire system to its initial state.
-   **User Management**: Global user selector with session-based persistence, isolated Git repository clones per user, and real-time data refresh.

### System Design Choices

-   **Split-File Persistence**: Workflows, assets, and data stores use split-file structures for improved Git granularity, clearer history, easier conflict resolution, and explicit deletions. Data stores follow the pattern: `datastore-list.json` + `datastores/{datastoreId}.json`. Includes migration from legacy formats.
-   **Persistent Storage**: All runtime data is stored in `/home/runner/workflow-data/` for persistence across restarts and separation of application code from data.
-   **Multi-user Support**: Each user operates within an isolated Git repository cloned from a central one.
-   **API Integration**: Frontend communicates with the backend via Workflow Service, Asset Service, DataStore Service, and Git Service APIs.

## External Dependencies

### Backend Dependencies

-   **LibGit2Sharp (v0.31.0)**: For native Git operations.
-   **Microsoft.AspNetCore.OpenApi (v8.0.18)**: For OpenAPI specification generation.
-   **Swashbuckle.AspNetCore (v6.6.2)**: For Swagger UI integration.

### Frontend Dependencies

-   **Angular (v20.3.6)**: Core frontend framework.
-   **RxJS (v7.8.2)**: For reactive programming.
-   **Zone.js (v0.15.1)**: For change detection.
-   **Monaco Editor (v0.52.2)**: Rich text editor with syntax highlighting for code files.
-   **@monaco-editor/loader (v1.4.0)**: Monaco Editor loader for Angular integration.