# Local Development Setup Guide

This guide will help you set up and run the Insurance Workflow Configuration application on your Windows machine, including running all tests locally.

## Prerequisites

### Required Software

1. **Git for Windows** (2.40+)
   - Download: https://git-scm.com/download/win
   - Configure during installation:
     - Enable long paths support
     - Choose "Checkout Windows-style, commit Unix-style line endings"

2. **.NET 8.0 SDK**
   - Download: https://dotnet.microsoft.com/download/dotnet/8.0
   - Verify installation: `dotnet --version`

3. **Node.js 20.x LTS**
   - Download: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

4. **Google Chrome** (for E2E tests)
   - Download: https://www.google.com/chrome/
   - ChromeDriver is included in the project automatically

5. **Visual Studio 2022** (recommended) or VS Code
   - Community Edition is free: https://visualstudio.microsoft.com/

## Initial Git Configuration

Before cloning the repository, configure Git to avoid common Windows issues:

```powershell
# Open PowerShell as Administrator
git config --global core.longpaths true
git config --global core.autocrlf true
```

## Cloning the Repository

Clone to a **short path** to avoid Windows path length limitations:

```powershell
# Navigate to a short path
cd C:\

# Clone the repository
git clone <your-github-url> wf

# Navigate into the project
cd wf
```

**Important:** Avoid deep paths like `C:\Users\YourName\Documents\Visual Studio 2022\Projects\...`

## First-Time Setup

### 1. Restore Backend Dependencies

```powershell
cd backend
dotnet restore
dotnet build
cd ..
```

### 2. Install Frontend Dependencies

```powershell
cd frontend
npm install
cd ..
```

### 3. Restore Test Project Dependencies

```powershell
cd backend.tests\WorkflowConfig.Api.Tests
dotnet restore
cd ..\..

cd backend.tests\WorkflowConfig.E2E.Tests
dotnet restore
cd ..\..
```

## Running the Application

### Option 1: Using Visual Studio

1. Open `WorkflowConfig.sln` in Visual Studio
2. Set `WorkflowConfig.Api` as the startup project (right-click → Set as Startup Project)
3. Press `F5` to run the backend API
4. In a separate terminal, run the frontend:
   ```powershell
   cd frontend
   npm start
   ```

### Option 2: Using Command Line

#### Start Backend (Terminal 1)
```powershell
cd backend
dotnet run
```

The backend API will start at:
- **API**: http://localhost:5000
- **Swagger UI**: http://localhost:5000/swagger

#### Start Frontend (Terminal 2)
```powershell
cd frontend
npm start
```

The frontend will start at:
- **Application**: http://localhost:4200

### Option 3: Using Batch Scripts (Easiest)

We've provided convenient batch scripts:

```powershell
# Start backend only
start-backend.bat

# Start frontend only  
start-frontend.bat

# Start both (opens two terminal windows)
run-all.bat
```

## Running Tests

### Unit Tests

```powershell
# Run all unit tests
cd backend.tests\WorkflowConfig.Api.Tests
dotnet test

# Run with detailed output
dotnet test --verbosity normal

# Run specific test
dotnet test --filter "TestName"
```

### E2E Tests (Selenium)

**Prerequisites:**
- Both backend and frontend must be running
- Google Chrome must be installed

```powershell
# Make sure backend and frontend are running first!

# Run E2E tests
cd backend.tests\WorkflowConfig.E2E.Tests
dotnet test

# Run with detailed output
dotnet test --verbosity normal

# List all tests without running
dotnet test --list-tests
```

The E2E tests will:
- Launch Chrome in headless mode
- Test against http://localhost:4200
- Capture screenshots on failures (saved to project folder)

### Run All Tests from Visual Studio

1. Open **Test Explorer** (`Test` → `Test Explorer`)
2. Click **Run All Tests** (play button)
3. View results in real-time

You should see:
- **9 unit tests** from `WorkflowConfig.Api.Tests`
- **11 E2E tests** from `WorkflowConfig.E2E.Tests`

## Environment Configuration

The application uses these default ports:
- Backend API: `5000`
- Frontend: `4200`

To customize, set these environment variables before starting:

```powershell
# PowerShell
$env:ASPNETCORE_URLS = "http://localhost:8000"
$env:FRONTEND_PORT = "3000"

# Command Prompt
set ASPNETCORE_URLS=http://localhost:8000
set FRONTEND_PORT=3000
```

For E2E tests, you can override the URLs:

```powershell
$env:TEST_FRONTEND_URL = "http://localhost:4200"
$env:TEST_BACKEND_URL = "http://localhost:5000"
```

## Troubleshooting

### Git Clone Issues

**Problem:** "unable to checkout working tree" or files marked for deletion

**Solution:**
```powershell
# Re-configure Git
git config --global core.longpaths true
git config --global core.autocrlf true

# Delete the broken clone
cd C:\
rmdir /s /q wf

# Clone again to a short path
git clone <url> wf
```

### Node Modules Path Too Long

**Problem:** npm install fails with path length errors

**Solutions:**
1. Enable long paths in Windows:
   - Open Registry Editor as Administrator
   - Navigate to `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem`
   - Set `LongPathsEnabled` to `1`
   - Restart your computer

2. Or clone to a shorter path (recommended):
   ```powershell
   cd C:\
   git clone <url> wf
   ```

### Backend Won't Start - Port Already in Use

**Problem:** "Failed to bind to address http://localhost:5000"

**Solution:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (use PID from previous command)
taskkill /PID <pid> /F

# Or change the port
cd backend
dotnet run --urls "http://localhost:5001"
```

### Frontend Won't Start - Port 4200 in Use

**Problem:** Port 4200 is already in use

**Solution:**
```powershell
# Kill existing Angular dev server
taskkill /F /IM node.exe

# Or specify different port
ng serve --port 4201
```

### E2E Tests Fail - Chrome Version Mismatch

**Problem:** "session not created: This version of ChromeDriver only supports Chrome version X"

**Solution:**
```powershell
# Update ChromeDriver package to match your Chrome version
cd backend.tests\WorkflowConfig.E2E.Tests

# For Chrome 130
dotnet remove package Selenium.WebDriver.ChromeDriver
dotnet add package Selenium.WebDriver.ChromeDriver --version 130.0.6723.11600

# For Chrome 131
dotnet add package Selenium.WebDriver.ChromeDriver --version 131.0.6778.8500
```

Check your Chrome version: `chrome://version/`

### E2E Tests Fail - Frontend/Backend Not Running

**Problem:** "Connection refused" errors in test output

**Solution:**
```powershell
# Make sure BOTH services are running before tests
# Terminal 1:
cd backend
dotnet run

# Terminal 2:
cd frontend  
npm start

# Terminal 3 (after both are running):
cd backend.tests\WorkflowConfig.E2E.Tests
dotnet test
```

### Build Errors - Missing Dependencies

**Problem:** Build fails with missing package references

**Solution:**
```powershell
# Clean and restore everything
dotnet clean WorkflowConfig.sln
dotnet restore WorkflowConfig.sln
dotnet build WorkflowConfig.sln

# For frontend
cd frontend
rmdir /s /q node_modules
npm install
```

### Tests Not Discovered in Visual Studio

**Problem:** Test Explorer shows no tests

**Solution:**
1. Clean and rebuild the solution (`Build` → `Clean Solution`, then `Build` → `Rebuild Solution`)
2. Close and reopen Visual Studio
3. Delete these folders and rebuild:
   - `.vs` folder
   - All `bin` and `obj` folders

## Development Workflow

### Recommended Workflow

1. **Code in Visual Studio** - Full IntelliSense, debugging, refactoring
2. **Run backend from VS** - F5 to debug, breakpoints work
3. **Run frontend in terminal** - Auto-reloads on file changes
4. **Test frequently**:
   - Unit tests: Fast feedback on logic
   - E2E tests: Verify user workflows when making UI/API changes

### Hot Reload

- **Backend**: Changes require restart (`Ctrl+F5` to stop, `F5` to restart)
- **Frontend**: Auto-reloads when you save files
- **Tests**: Re-run after code changes

### Git Workflow

```powershell
# Check status
git status

# Create feature branch
git checkout -b feature/my-new-feature

# Make changes, then stage and commit
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin feature/my-new-feature
```

## Project Structure

```
C:\wf\
├── WorkflowConfig.sln           # Visual Studio solution
├── backend/                     # ASP.NET Core API
│   ├── Controllers/
│   ├── Services/
│   ├── Models/
│   └── WorkflowConfig.Api.csproj
├── backend.tests/
│   ├── WorkflowConfig.Api.Tests/      # Unit tests (xUnit)
│   └── WorkflowConfig.E2E.Tests/      # E2E tests (Reqnroll + Selenium)
├── frontend/                    # Angular application
│   ├── src/app/
│   └── package.json
├── start-backend.bat           # Convenience scripts
├── start-frontend.bat
└── run-all.bat
```

## Performance Tips

### Speed Up npm install

```powershell
# Use npm cache
npm cache verify

# Or use faster package manager
npm install -g pnpm
cd frontend
pnpm install  # Much faster than npm
```

### Speed Up .NET Builds

In Visual Studio:
- `Tools` → `Options` → `Projects and Solutions` → `Build and Run`
- Set "Maximum number of parallel project builds" to number of CPU cores

### Speed Up E2E Tests

```powershell
# Run specific test
dotnet test --filter "Create a new pull request"

# Run tests in parallel (if supported)
dotnet test --parallel
```

## Next Steps

Now that you're set up locally:

1. **Explore the code** - Open `WorkflowConfig.sln` in Visual Studio
2. **Run the app** - Use the batch scripts or VS
3. **Run tests** - Verify everything works (`dotnet test`)
4. **Make changes** - Edit code, run tests, iterate
5. **Review docs** - See `replit.md` for architecture details

## Getting Help

- **Architecture docs**: See `replit.md` for detailed system design
- **API docs**: Run backend and visit http://localhost:5000/swagger
- **Test examples**: Look at existing tests in `backend.tests/`

Happy coding! 🚀
