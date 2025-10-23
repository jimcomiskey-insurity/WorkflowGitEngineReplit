# Insurance Workflow Configuration System

## Overview

This is a full-stack application for managing insurance workflow configurations with integrated Git version control. It enables users to create, edit, and manage insurance workflows (e.g., New Business, Renewals) that comprise multi-phase task structures with dependencies, role assignments, and automation flags. The system tracks changes, commits modifications, and synchronizes with a central Git repository, providing a robust solution for workflow configuration management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions

The frontend features a modern dark theme with a redesigned layout. It includes a sidebar navigation, a card-grid layout for workflows, and a dedicated Version Control view. Key UI elements include:
- Workflow cards displaying name, key, description, phase/task counts, and action buttons.
- Collapsible commit history display.
- Branch management via a dropdown selector with visual indicators for the active branch.
- Visual indicators for incoming (↓) and outgoing (↑) commits to show synchronization status.

### Technical Implementations

**Frontend**:
- Built with Angular 20.3.6 (Standalone Components) using client-side routing with lazy-loaded components.
- Utilizes RxJS observables for state management and asynchronous operations.
- Employs a service-based architecture to separate business logic from presentation.

**Backend**:
- Developed using ASP.NET Core 8.0 Web API, providing RESTful endpoints.
- Workflows are stored as JSON files in the filesystem, facilitating Git versioning.
- Integrates LibGit2Sharp for all Git operations.
- Supports multi-user access through isolated, user-specific Git repositories connected to a central repository.
- Employs RxJS `switchMap` and `merge` patterns for robust data refreshing and multi-user data isolation.
- Git status enrichment: Compares current workflows with last commit to identify added/modified/deleted items at workflow, phase, and task levels.

### Feature Specifications

- **Workflow Management**: CRUD operations for workflows, including nested phases and tasks with dependencies, role assignments, duration estimates, and automation flags.
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
- **User Management**: Session-based user selection with isolated Git repository clones for each user.

### System Design Choices

- **File-based Storage**: Workflows are stored as JSON files in the file system for simplified Git integration, human readability, and portability, accepting trade-offs in query capabilities and concurrent access limitations suitable for configuration management.
- **Multi-user Support**: Each user operates within their own isolated Git repository cloned from a central one, ensuring data separation and individual version control.
- **API Integration**: Frontend communicates with backend via Workflow Service (`/api/workflows`) for workflow CRUD and Git Service (`/api/git`) for version control operations.

## External Dependencies

### Backend Dependencies

- **LibGit2Sharp (v0.31.0)**: For native Git operations.
- **Microsoft.AspNetCore.OpenApi (v8.0.18)**: For OpenAPI specification generation.
- **Swashbuckle.AspNetCore (v6.6.2)**: For Swagger UI integration.

### Frontend Dependencies

- **Angular (v20.3.6)**: Core frontend framework.
- **RxJS (v7.8.2)**: For reactive programming.
- **Zone.js (v0.15.1)**: For change detection.