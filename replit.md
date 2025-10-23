# Insurance Workflow Configuration System

## Overview

This is a full-stack application for managing insurance workflow configurations with integrated Git version control. It enables users to create, edit, and manage insurance workflows (e.g., New Business, Renewals) that comprise multi-phase task structures with dependencies, role assignments, and automation flags. The system tracks changes, commits modifications, and synchronizes with a central Git repository, providing a robust solution for workflow configuration management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions

The frontend features a modern dark theme with a redesigned layout. It includes a persistent top header, sidebar navigation, a card-grid layout for workflows, and dedicated views for Version Control and Pending Changes. Key UI elements include:
- **Top Header**: Persistent header bar across all pages containing the application title and user dropdown selector. Changing the user immediately refreshes all data across the application to reflect the selected user's repository state.
- Workflow cards displaying name, key, description, phase/task counts, and action buttons.
- Collapsible commit history display.
- Branch management via a dropdown selector with visual indicators for the active branch.
- Visual indicators for incoming (↓) and outgoing (↑) commits to show synchronization status.
- **Pending Changes view**: A dedicated interface showing all uncommitted changes grouped by workflow with filter tabs (All/Added/Modified/Deleted), collapsible phases, and change counts. The sidebar displays a real-time badge showing the total number of pending changes.

### Technical Implementations

**Frontend**:
- Built with Angular 20.3.6 (Standalone Components) using client-side routing with lazy-loaded components.
- Utilizes RxJS observables for state management and asynchronous operations.
- Employs a service-based architecture to separate business logic from presentation.
- All components subscribe to UserService.currentUser$ observable to automatically refresh data when the user changes via the top header dropdown.
- Components include AppComponent, WorkflowListComponent, VersionControlComponent, PendingChangesComponent, and PullRequestsComponent, all implementing reactive user context switching.

**Backend**:
- Developed using ASP.NET Core 8.0 Web API, providing RESTful endpoints.
- Workflows are stored as JSON files in the filesystem, facilitating Git versioning.
- Integrates LibGit2Sharp for all Git operations.
- Supports multi-user access through isolated, user-specific Git repositories connected to a central repository.
- Employs RxJS `switchMap` and `merge` patterns for robust data refreshing and multi-user data isolation.
- Git status enrichment: Compares current workflows with last commit to identify added/modified/deleted items at workflow, phase, and task levels.
- Task identification: Each task has a unique TaskId for stable tracking across edits, renames, and reordering. Legacy tasks without IDs receive deterministic IDs based on SHA256 hash of stable properties.

### Feature Specifications

- **Workflow Management**: CRUD operations for workflows, including nested phases and tasks with dependencies, role assignments, duration estimates, and automation flags.
- **Pull Requests**: Full pull request workflow for proposing and reviewing changes:
    - Create PRs from any branch to target branch
    - View all PRs with status filtering (Open/Merged/Closed/All)
    - Branch comparison showing workflow-level changes (added/modified/deleted workflows)
    - Merge PRs directly from the UI (performs Git merge + updates PR status)
    - Close PRs without merging
    - Detailed PR view with metadata, branch info, and change summary
    - Visual status indicators and change type badges
    - Automatic fetch before comparison and merge to ensure remote branches are visible
    - Pull requests stored in a shared global JSON file in persistent storage, visible to all users
    - PRs are collaborative: any user can view, review, and merge PRs created by others
    - Author field tracks who created each PR
    - **Commit tracking**: Both source and target branch commit SHAs are captured at PR creation time
        - Open PRs show current branch state (updates dynamically as new commits are pushed)
        - Merged PRs show historical snapshot comparing the exact commits at PR creation time
        - Ensures merged PRs display accurate commit counts and changes even after branches are merged or diverge
        - Addresses the issue where merged PRs would show "0 commits" after the merge completes
- **Git Version Control**:
    - Tracking of changes, committing modifications, and synchronization (pull/push) with a central repository.
    - Display of Git status, commit history (SHA, author, message, date).
    - Branch management: creation, switching between branches, and pushing new branches to the remote.
    - Automatic local tracking branch creation when switching to remote branches.
    - Displays counts of commits ahead/behind the remote repository.
    - **Visual Change Indicators**: Real-time Git status indicators showing added, modified, and deleted items:
        - **Added items**: Green left border with "+ Added" badge
        - **Modified items**: Blue left border with "Modified" badge  
        - **Deleted items**: Red left border with "Deleted" badge, strikethrough text, and disabled edit controls
        - Indicators shown at all levels: workflows, phases, and tasks
        - Backend compares current state with last committed version to detect changes
    - **Pending Changes View**: Dedicated interface for reviewing uncommitted changes before committing:
        - Groups changes by workflow with collapsible phase sections
        - Filter tabs for viewing all changes or filtering by type (Added/Modified/Deleted)
        - Displays change counts at workflow and phase levels
        - Shows detailed task information including type, role, duration, and dependencies
        - Real-time badge in sidebar navigation showing total pending changes count
        - Auto-refreshes count every 10 seconds to stay synchronized with workflow edits
        - Empty state when no uncommitted changes exist
    - **Repository Reset**: Testing utility to reset the entire system to initial state:
        - Deletes all user repositories and the central repository
        - Recreates central repository as a bare repository
        - Reinitializes with original sample data (4 workflows: New Business, Endorsement, Cancel, Reinstatement)
        - Users automatically receive fresh clones on next access
        - Accessible via red "Reset All Repositories" button on Version Control page
        - Includes confirmation dialog to prevent accidental resets
        - Automatically reloads the page after successful reset
- **User Management**: 
    - Global user selector in top header (always visible across all pages)
    - Session-based user selection with localStorage persistence
    - Isolated Git repository clones for each user
    - Real-time data refresh across all components when user changes
    - UserService manages current user state via BehaviorSubject/Observable pattern

### System Design Choices

- **File-based Storage**: Workflows are stored as JSON files in the file system for simplified Git integration, human readability, and portability, accepting trade-offs in query capabilities and concurrent access limitations suitable for configuration management.
- **Persistent Storage**: All runtime data (user repositories, pull requests) is stored in `/home/runner/workflow-data/` outside the Git repository to ensure:
    - Data persists across server restarts
    - No nested Git repositories (repositories stored outside application Git repo)
    - Clean separation between application code and runtime data
    - Storage paths:
        - User repositories: `/home/runner/workflow-data/user-repos/`
        - Central repository: `/home/runner/workflow-data/central-repo/`
        - Pull requests: `/home/runner/workflow-data/pull-requests/`
- **Multi-user Support**: Each user operates within their own isolated Git repository cloned from a central one, ensuring data separation and individual version control. Repositories persist across restarts with validation logging to track recreation events.
- **API Integration**: Frontend communicates with backend via Workflow Service (`/api/workflows`) for workflow CRUD and Git Service (`/api/git`) for version control operations.

## Local Development

### Visual Studio Solution

The project includes a complete Visual Studio solution file (`WorkflowConfig.sln`) at the root level that references:
- **Backend API** (`backend/WorkflowConfig.Api.csproj`)
- **Unit Tests** (`backend.tests/WorkflowConfig.Api.Tests/WorkflowConfig.Api.Tests.csproj`)
- **E2E Tests** (`backend.tests/WorkflowConfig.E2E.Tests/WorkflowConfig.E2E.Tests.csproj`)

To work locally:
1. Clone the repository to a short path (e.g., `C:\wf`) to avoid Windows path length issues
2. Open `WorkflowConfig.sln` in Visual Studio
3. Build the solution (`Ctrl+Shift+B`)
4. Run the backend from Visual Studio or via `dotnet run` in the `backend` folder
5. Run the frontend separately: `cd frontend && npm install && npm start`

### Git Configuration for Windows

When cloning to Windows, configure Git to handle long paths and line endings:
```bash
git config --global core.longpaths true
git config --global core.autocrlf true
```

## External Dependencies

### Backend Dependencies

- **LibGit2Sharp (v0.31.0)**: For native Git operations.
- **Microsoft.AspNetCore.OpenApi (v8.0.18)**: For OpenAPI specification generation.
- **Swashbuckle.AspNetCore (v6.6.2)**: For Swagger UI integration.

### Testing Infrastructure

#### Unit Tests
- **Test Framework**: xUnit with .NET 8.0
- **Test Location**: `backend.tests/WorkflowConfig.Api.Tests/`
- **Test Dependencies**:
    - xUnit (v2.5.3): Test framework
    - Moq (v4.20.72): Mocking library for dependencies
    - FluentAssertions (v6.12.0): Fluent assertion library for readable tests
    - Microsoft.AspNetCore.Hosting.Abstractions (v2.3.0): For IWebHostEnvironment mocking
- **Test Coverage**:
    - `PullRequestServiceTests`: Comprehensive tests for PR lifecycle including commit SHA tracking, status transitions, multi-user visibility
    - `GitServiceComparisonTests`: Documentation of expected behavior for branch comparisons (merged vs open PRs)
- **Key Regression Tests**:
    - `MergePullRequest_ShouldPreserveCommitShas`: Ensures merged PRs maintain their original commit SHAs to prevent "0 commits" bug
    - Tests validate that both source and target commit SHAs are stored at PR creation and preserved through merge
- **Running Unit Tests**: Execute `cd backend.tests/WorkflowConfig.Api.Tests && dotnet test` from project root

#### End-to-End Tests
- **Test Framework**: Reqnroll (BDD/Gherkin) + xUnit + Selenium WebDriver
- **Test Location**: `backend.tests/WorkflowConfig.E2E.Tests/`
- **Test Dependencies**:
    - Reqnroll (v3.2.0): BDD framework with Gherkin support
    - Reqnroll.xUnit (v3.2.0): xUnit integration for Reqnroll
    - xUnit (v2.8.1): Test runner
    - Selenium.WebDriver (v4.37.0): Browser automation
    - Selenium.WebDriver.ChromeDriver (v141.0.7390.12200): Chrome driver
    - Selenium.Support (v4.37.0): Selenium support utilities
    - FluentAssertions (v8.8.0): Fluent assertion library
- **Test Architecture**:
    - **Page Object Model**: Structured page objects for all major pages (WorkflowsPage, VersionControlPage, PullRequestsPage, HeaderComponent)
    - **BDD with Gherkin**: Human-readable feature files describing test scenarios
    - **Headless Chrome**: Tests run in headless mode for CI/CD compatibility
    - **Screenshot capture**: Automatic screenshots on test failures for debugging
- **Test Coverage**:
    - Pull request creation, viewing, filtering, and merging
    - Version control operations (commit, branch switching, push/pull)
    - Workflow management (create, edit, delete workflows)
    - Multi-user collaboration scenarios
- **Feature Files**:
    - `Features/PullRequests.feature`: PR lifecycle scenarios
    - `Features/VersionControl.feature`: Git operations scenarios
    - `Features/WorkflowManagement.feature`: Workflow CRUD scenarios
- **Running E2E Tests**: 
    - Start both frontend and backend servers
    - Execute `cd backend.tests/WorkflowConfig.E2E.Tests && dotnet test`
    - Tests run against http://localhost:4200 (frontend) and http://localhost:5000 (backend)

### Frontend Dependencies

- **Angular (v20.3.6)**: Core frontend framework.
- **RxJS (v7.8.2)**: For reactive programming.
- **Zone.js (v0.15.1)**: For change detection.