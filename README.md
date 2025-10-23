# Insurance Workflow Configuration System

A full-stack application for managing insurance workflow configurations with integrated Git version control, pull request functionality, and multi-user support.

## Tech Stack

- **Backend**: ASP.NET Core 8.0 Web API
- **Frontend**: Angular 20.3.6 (Standalone Components)
- **Version Control**: LibGit2Sharp for Git operations
- **Testing**: xUnit, Reqnroll (BDD), Selenium WebDriver

## Getting Started

### Prerequisites

- .NET 8.0 SDK
- Node.js 20+
- Visual Studio 2022 (recommended) or VS Code
- Git

### Cloning the Repository (Windows)

To avoid path length issues and line ending problems when cloning to Windows:

```bash
# Configure Git first
git config --global core.longpaths true
git config --global core.autocrlf true

# Clone to a short path
cd C:\
git clone <repository-url> wf
cd wf
```

### Building the Solution

#### Option 1: Using Visual Studio
1. Open `WorkflowConfig.sln` in Visual Studio 2022
2. Build the solution (`Ctrl+Shift+B`)
3. Set `WorkflowConfig.Api` as the startup project
4. Press F5 to run

#### Option 2: Using Command Line
```bash
# Build the entire solution
dotnet build WorkflowConfig.sln

# Run the backend API
cd backend
dotnet run

# In a separate terminal, run the frontend
cd frontend
npm install
npm start
```

The application will be available at:
- Frontend: http://localhost:4200
- Backend API: http://localhost:5000
- Swagger UI: http://localhost:5000/swagger

### Running Tests

#### Unit Tests
```bash
cd backend.tests/WorkflowConfig.Api.Tests
dotnet test
```

#### End-to-End Tests
```bash
# Make sure both frontend and backend are running first
cd backend.tests/WorkflowConfig.E2E.Tests
dotnet test
```

## Project Structure

```
WorkflowConfig.sln                  # Visual Studio solution file
├── backend/                        # ASP.NET Core Web API
│   ├── Controllers/               # API controllers
│   ├── Services/                  # Business logic services
│   ├── Models/                    # Data models
│   └── WorkflowConfig.Api.csproj
├── backend.tests/
│   ├── WorkflowConfig.Api.Tests/  # Unit tests (xUnit + Moq)
│   └── WorkflowConfig.E2E.Tests/  # E2E tests (Reqnroll + Selenium)
├── frontend/                       # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── workflow-list/     # Workflow management
│   │   │   ├── version-control/   # Git operations
│   │   │   ├── pending-changes/   # Uncommitted changes view
│   │   │   └── pull-requests/     # PR management
│   └── package.json
└── replit.md                       # Detailed architecture documentation
```

## Key Features

- **Workflow Management**: Create and manage insurance workflows with phases and tasks
- **Git Version Control**: Full Git integration with commit, branch, push/pull operations
- **Pull Requests**: Create, review, and merge PRs with branch comparison
- **Multi-User Support**: Isolated Git repositories per user
- **Visual Change Tracking**: Real-time indicators for added/modified/deleted items
- **Pending Changes View**: Review all uncommitted changes before committing

## Documentation

See [replit.md](./replit.md) for comprehensive architecture documentation, including:
- System design decisions
- UI/UX specifications
- API endpoints
- Testing strategy
- Deployment considerations

## Contributing

This project uses:
- **BDD testing** with Gherkin feature files
- **Page Object Model** for E2E tests
- **Unit testing** for backend services
- **FluentAssertions** for readable test assertions

## License

[Your License Here]
