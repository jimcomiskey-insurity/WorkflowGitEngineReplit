# Insurance Workflow Configuration System

A full-stack application for managing insurance workflow configurations with integrated Git version control, pull request functionality, and multi-user support.

## Tech Stack

- **Backend**: ASP.NET Core 8.0 Web API
- **Frontend**: Angular 20.3.6 (Standalone Components)
- **Version Control**: LibGit2Sharp for Git operations
- **Testing**: xUnit, Reqnroll (BDD), Selenium WebDriver

## 🚀 Quick Start

Choose your development environment:

### Local Development (Windows)

**For complete step-by-step setup instructions, see [LOCAL_SETUP.md](./LOCAL_SETUP.md)**

Quick start:
```powershell
# 1. Configure Git for Windows
git config --global core.longpaths true
git config --global core.autocrlf true

# 2. Clone to short path
cd C:\
git clone <repository-url> wf
cd wf

# 3. Start everything
run-all.bat
```

Then visit http://localhost:4200

### Developing on Replit

**For Replit-based development:**
- Code is already cloned and configured
- Backend runs on port 5000
- Frontend runs on port 4200
- E2E tests run against the Replit environment

## Prerequisites

- .NET 8.0 SDK
- Node.js 20+
- Visual Studio 2022 (for local development) or Replit IDE
- Git (configured for long paths on Windows)
- Google Chrome (for running E2E tests)

## Building the Solution

### Local Development (Recommended)

**Option 1: Using Batch Scripts (Easiest)**
```powershell
# Start both backend and frontend
run-all.bat

# Or start individually
start-backend.bat
start-frontend.bat
```

**Option 2: Using Visual Studio**
1. Open `WorkflowConfig.sln`
2. Build solution (`Ctrl+Shift+B`)
3. Run backend (F5)
4. Run frontend in terminal: `cd frontend && npm start`

**Option 3: Using Command Line**
```powershell
# Terminal 1 - Backend
cd backend
dotnet run

# Terminal 2 - Frontend
cd frontend
npm install
npm start
```

### Running on Replit

The workflows are already configured - just start them in the Replit workspace.

## Application URLs

**Local Development:**
- Frontend: http://localhost:4200
- Backend API: http://localhost:5000
- Swagger UI: http://localhost:5000/swagger

**Replit:**
- URLs are dynamically assigned and shown in the webview

## Running Tests

### Unit Tests (9 tests - Run Anywhere)
```powershell
cd backend.tests\WorkflowConfig.Api.Tests
dotnet test
```

### E2E Tests (11 tests - Requires Running App)

**Local Development:**
```powershell
# Start both servers first!
run-all.bat

# Then in a new terminal:
cd backend.tests\WorkflowConfig.E2E.Tests
dotnet test
```

**On Replit:**
```bash
cd backend.tests/WorkflowConfig.E2E.Tests
dotnet test
```

**Note:** E2E tests run against localhost by default. To test against a different environment:
```powershell
$env:TEST_FRONTEND_URL = "https://your-app.replit.dev"
$env:TEST_BACKEND_URL = "https://your-app.replit.dev"
dotnet test
```

## Visual Studio Test Explorer

All tests appear in Test Explorer:
1. Open **Test → Test Explorer**
2. Click **Run All** to execute all 20 tests
3. Tests are organized by project:
   - **WorkflowConfig.Api.Tests** (9 unit tests)
   - **WorkflowConfig.E2E.Tests** (11 BDD scenarios)

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

- **[LOCAL_SETUP.md](./LOCAL_SETUP.md)** - Complete Windows setup guide with troubleshooting
- **[replit.md](./replit.md)** - Comprehensive architecture documentation:
  - System design decisions
  - UI/UX specifications  
  - API endpoints
  - Testing strategy
  - Multi-user support details

## Contributing

This project uses:
- **BDD testing** with Gherkin feature files
- **Page Object Model** for E2E tests
- **Unit testing** for backend services
- **FluentAssertions** for readable test assertions

## License

[Your License Here]
