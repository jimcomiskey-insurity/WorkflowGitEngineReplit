# End-to-End Tests for Insurance Workflow Configuration

This project contains end-to-end tests using **Reqnroll** (Gherkin/BDD) and **Selenium WebDriver** with headless Chrome.

## Prerequisites

- .NET 8.0 SDK
- Chrome browser (ChromeDriver is included via NuGet)
- Both backend API and frontend must be running

## Running the Tests

### 1. Start the Application

Make sure both the backend and frontend servers are running:

```bash
# Terminal 1 - Backend API
cd backend && dotnet run

# Terminal 2 - Frontend
cd frontend && npm start
```

By default, the tests expect:
- **Frontend**: `http://localhost:5000`
- **Backend API**: `http://localhost:5264`

### 2. Run the E2E Tests

```bash
cd backend.tests/WorkflowConfig.E2E.Tests
dotnet test
```

### 3. Run with Visible Browser (Non-Headless)

To see the browser in action, modify `WebDriverFactory.cs`:

```csharp
var driver = WebDriverFactory.CreateChromeDriver(headless: false);
```

### 4. Configure Test URLs

Set environment variables to override default URLs:

```bash
export BASE_URL=http://localhost:5000
export BACKEND_URL=http://localhost:5264
dotnet test
```

## Test Structure

```
WorkflowConfig.E2E.Tests/
├── Features/                  # Gherkin feature files
│   ├── PullRequests.feature
│   ├── VersionControl.feature
│   └── WorkflowManagement.feature
├── StepDefinitions/          # Step implementations
│   ├── CommonSteps.cs
│   ├── PullRequestSteps.cs
│   ├── VersionControlSteps.cs
│   └── WorkflowSteps.cs
├── PageObjects/              # Page Object Model
│   ├── BasePage.cs
│   ├── WorkflowsPage.cs
│   ├── VersionControlPage.cs
│   ├── PullRequestsPage.cs
│   └── HeaderComponent.cs
└── Support/                  # Test infrastructure
    ├── WebDriverFactory.cs
    ├── TestHooks.cs
    └── TestConfiguration.cs
```

## Test Coverage

### Pull Requests
- Create new pull requests
- View PR details (title, branches, commit count)
- Merge pull requests
- Filter PRs by status (Open/Merged/Closed)

### Version Control
- View commit history
- Create and switch branches
- Commit workflow changes
- Push/Pull to/from remote
- Track sync status

### Workflow Management
- View workflow list
- Create new workflows
- Edit existing workflows
- Add phases and tasks
- Delete workflows

## Debugging Failed Tests

When a test fails:
1. **Screenshots** are automatically captured and saved to temp directory
2. **Check console output** for the screenshot path
3. **Browser logs** are captured for errors
4. **Review the feature file** to understand the scenario
5. **Check page selectors** in PageObjects if elements aren't found

## Notes

- Tests run in **headless mode** by default for CI/CD compatibility
- **Implicit waits** are set to 10 seconds
- **Page load timeout** is 30 seconds
- Tests use the **Page Object Model** pattern for maintainability
- Each scenario gets a fresh WebDriver instance (isolated tests)
