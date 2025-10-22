# Insurance Workflow Configuration System

## Overview

This is a full-stack application for managing insurance workflow configurations with version control capabilities. The system allows users to create, edit, and manage insurance workflows (such as New Business, Renewals, Endorsements) with multi-phase task structures. Each workflow consists of phases, which contain tasks with dependencies, role assignments, and automation flags. The application integrates Git version control to track changes, commit modifications, and synchronize with a central repository.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Angular 20.3.6 (Standalone Components)

The frontend is built using Angular's modern standalone component architecture, eliminating the need for NgModules. The application uses:

- **Routing**: Client-side routing with lazy-loaded components for better performance
- **State Management**: Component-level state with RxJS observables for async operations
- **HTTP Communication**: Angular's HttpClient for API interactions
- **Form Handling**: Two-way data binding with FormsModule for workflow editing

**Component Structure**:
- `AppComponent`: Root component with router outlet
- `WorkflowListComponent`: Displays all workflows and Git status, provides workflow management actions
- `WorkflowEditorComponent`: CRUD interface for creating/editing workflows with nested phases and tasks

**Key Design Decisions**:
- Standalone components chosen for simplified dependency management and better tree-shaking
- Lazy loading for routes to improve initial load time
- Service-based architecture separating business logic from presentation

### Backend Architecture

**Framework**: ASP.NET Core 8.0 Web API

The backend is a RESTful API built with ASP.NET Core, providing endpoints for workflow management and Git operations.

**Key Components**:
- **API Controllers**: Handle HTTP requests for workflows and Git operations
- **File-based Storage**: Workflows stored as JSON files in the filesystem
- **Git Integration**: LibGit2Sharp library for version control operations

**Configuration**:
- Development and production appsettings for environment-specific configuration
- Git repository paths configurable via `GitSettings` section:
  - `RepoBasePath`: User-specific repository storage
  - `CentralRepoPath`: Shared central repository

**Key Design Decisions**:
- File-based JSON storage for simplicity and Git-friendliness (easy to track changes)
- Multi-user support through userId-based repository isolation
- RESTful API design following standard HTTP conventions

### Data Storage Solutions

**Primary Storage**: File System (JSON)

Workflows are persisted as JSON files rather than in a traditional database. This architectural choice provides several benefits:

**Rationale**:
1. **Git Integration**: JSON files are easily versioned with Git, enabling full change history tracking
2. **Human Readability**: Configuration files can be manually reviewed and edited if needed
3. **Portability**: Simple backup, migration, and deployment strategies
4. **Simplicity**: No database setup or migrations required

**Structure**:
- Each workflow stored as a separate JSON file
- Sample data structure includes workflows with phases and tasks
- Tasks have dependencies, role assignments, duration estimates, and automation flags

**Trade-offs**:
- Limited query capabilities compared to relational databases
- Concurrent access requires file locking mechanisms
- Not suitable for high-volume transactional workloads
- Acceptable for configuration management use cases with moderate data volumes

### Authentication and Authorization

**Current State**: No authentication implemented

The application currently uses a default user identifier (`userId = 'default'`) for all operations. Role-based task assignments exist in the data model (Agent, Underwriter, System) but are not enforced by the application.

**Future Considerations**:
- User authentication would be required for production use
- Role-based authorization to restrict workflow editing
- User-specific Git commits with proper attribution

## External Dependencies

### Backend Dependencies

1. **LibGit2Sharp (v0.31.0)**: Native Git operations library
   - Provides Git repository management, commit, pull, push, and status operations
   - Includes native binaries for multiple platforms (Linux, macOS, Windows)
   
2. **Microsoft.AspNetCore.OpenApi (v8.0.18)**: OpenAPI specification generation
   - Enables automatic API documentation
   
3. **Swashbuckle.AspNetCore (v6.6.2)**: Swagger UI integration
   - Provides interactive API documentation and testing interface

### Frontend Dependencies

1. **Angular (v20.3.6)**: Complete frontend framework
   - Includes core, common, compiler, forms, router, platform-browser packages
   
2. **RxJS (v7.8.2)**: Reactive programming library
   - Handles asynchronous operations and event streams
   
3. **Zone.js (v0.15.1)**: Change detection mechanism for Angular

### Development Configuration

- **Frontend Port**: 5000 (configured to allow external access with host 0.0.0.0)
- **Backend Port**: 8000 (API base URL referenced in frontend services)
- **Git Repository Storage**: Configurable paths in appsettings.json

### API Integration Points

The frontend communicates with the backend through two main service interfaces:

1. **Workflow Service** (`/api/workflows`):
   - GET: Retrieve all workflows or specific workflow by key
   - POST: Create new workflows
   - PUT: Update existing workflows
   - DELETE: Remove workflows

2. **Git Service** (`/api/git`):
   - GET `/status`: Retrieve current Git repository status
   - POST `/commit`: Commit changes with author information
   - POST `/discard`: Discard pending changes
   - POST `/pull`: Pull changes from remote repository
   - POST `/push`: Push local commits to remote repository

All API calls include a `userId` query parameter for multi-tenant support.

## Recent Changes (October 22, 2025)

### Initial Implementation
- Created full-stack C#/Angular application with Git-based version control
- Implemented LibGit2Sharp integration for repository management
- Built workflow CRUD interface with multi-phase task structure
- Added Git status tracking and change management UI
- Initialized central repository with sample workflow data
- Fixed critical issue: Added EnsureUserRepository to automatically clone user repositories on first access

### Data Serialization Fix
- Fixed JSON property naming mismatch between backend and frontend
- Backend uses .NET's default camelCase JSON serialization
- Updated all Angular interfaces and templates from PascalCase to camelCase
- Application now successfully loads all 4 sample workflows (New Business, Endorsement, Cancel, Reinstatement)
- Fixed repository cloning issue by cleaning up partially created directories using Repository.IsValid() check

### Commit History Feature
- Added commit history display to show branch commit history
- UI includes collapsible commit history section with toggle button
- Displays commit details: SHA (short format), author, message, and formatted date
- Automatically refreshes commit history after successful commits
- Leveraged existing backend endpoint (/api/git/commits) and service method
- Added proper styling with hover effects and visual distinction for commits

### Data Folder Relocation (October 22, 2025)
- Moved Git repositories from backend/data/ to /home/runner/workflow-data/ to avoid nested repository issues
- Updated GitService to use IWebHostEnvironment for stable path resolution
- Configuration supports both relative and absolute paths:
  - Relative paths resolve from ContentRootPath for portability
  - Absolute paths are used directly for flexibility
- appsettings.json uses relative path: "../../workflow-data/" for development
- This prevents Git from tracking the runtime Git repositories within the codebase repository

### Push Functionality Fix (October 22, 2025)
- Fixed "Push to Remote" button that was not working due to incorrect remote URL
- Enhanced GitService to automatically correct remote URLs after data folder relocation
- Added automatic remote URL healing in EnsureUserRepository method
- Improved error handling in Push method with descriptive error messages
- Updated frontend to refresh commit history after successful push
- Verified end-to-end push functionality to central repository

### Commit Count Indicator (October 22, 2025)
- Added visual indicator showing number of commits ready to push
- Backend now calculates commits ahead of remote using LibGit2Sharp CommitFilter
- Push button enables only when there are commits to push (not just uncommitted changes)
- Red badge displays commit count next to "Push to Remote" button
- Badge appears/disappears dynamically based on unpushed commit status
- Fixes issue where button was disabled even with committed but unpushed changes

### Change Detection Fix (October 22, 2025)
- Fixed bug where push button state didn't update after committing without page refresh
- Refactored commit flow to use RxJS forkJoin for proper async coordination
- Now waits for both Git status and commit history to load before showing success alert
- Eliminates race conditions between commit completion and status refresh
- Removed unnecessary ChangeDetectorRef usage (relies on Angular's default change detection)
- Push button now immediately enables/disables based on commits ahead count without requiring page refresh

### Branch Management Feature (October 22, 2025)
- Added full branch creation and switching capabilities
- New "Branches" section displays all local and remote branches
- Visual indicator (blue dot) highlights the current active branch
- Create new branches through a dialog with input validation
- Switch between branches with a single click
- Automatic warning when switching branches with uncommitted changes
- After switching branches, automatically refreshes workflows, Git status, and commit history using forkJoin
- Consistent styling with existing UI components
- Backend endpoints already existed; frontend implementation completed

### New Branch Push Support (October 22, 2025)
- Fixed Push functionality to support pushing new branches to remote repository
- Changed from hardcoded "master" push to dynamically pushing current branch
- Automatically sets up upstream tracking for new branches on first push
- Added validation to ensure user is on a valid branch before pushing
- Uses proper refspec format for LibGit2Sharp: `refs/heads/<branch>:refs/heads/<branch>`
- Tested successfully: new branches are published to central repo with tracking configured
- Remote branches now appear in branch list after successful push (e.g., origin/feature/test-branch)
