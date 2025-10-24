# Git Cleanup Instructions

## Problem

After building the solution, you're seeing generated files that should be ignored by `.gitignore`:
- Files in `backend/obj/` folder
- `*.feature.cs` files in `backend.tests/WorkflowConfig.E2E.Tests/Features/`
- `*.feature.ndjson` files in `obj/Debug/net8.0/Features/`
- NuGet generated files (`*.nuget.props`, `*.nuget.targets`, `project.assets.json`)

## Why is this happening?

These files were already tracked by Git **before** they were added to `.gitignore`. Once Git is tracking a file, adding it to `.gitignore` won't automatically stop tracking it.

## Solution

You need to remove these files from Git's tracking index while keeping them on your disk.

### Option 1: Use the Cleanup Scripts (Easiest)

**Windows (PowerShell):**
```powershell
.\clean-git-cache.ps1
```

**Mac/Linux:**
```bash
./clean-git-cache.sh
```

These scripts will:
1. Remove all build artifacts from Git tracking
2. Keep the files on your disk (they're needed for development)
3. Show you what to do next

### Option 2: Manual Commands

If you prefer to run the commands yourself:

```bash
# Remove obj and bin folders
git rm -r --cached backend/obj/
git rm -r --cached backend/bin/
git rm -r --cached backend.tests/WorkflowConfig.Api.Tests/obj/
git rm -r --cached backend.tests/WorkflowConfig.Api.Tests/bin/
git rm -r --cached backend.tests/WorkflowConfig.E2E.Tests/obj/
git rm -r --cached backend.tests/WorkflowConfig.E2E.Tests/bin/

# Remove generated .feature.cs files
git rm --cached backend.tests/WorkflowConfig.E2E.Tests/Features/*.feature.cs

# Check what will be removed
git status

# Commit the changes
git commit -m "Remove build artifacts from Git tracking"

# Push to remote
git push
```

## After Cleanup

Once you complete these steps:
1. ✅ Build artifacts will no longer show up in `git status`
2. ✅ The `.gitignore` file will work correctly
3. ✅ Future builds won't create uncommitted changes
4. ✅ Your repository will be cleaner and smaller

## Files That Will Be Ignored

After cleanup, these patterns will be automatically ignored:
- `bin/` and `obj/` folders (all build outputs)
- `*.feature.cs` (Reqnroll generated code-behind files)
- `*.feature.ndjson` (Reqnroll message files)
- `*.nuget.props` and `*.nuget.targets` (NuGet generated files)
- `project.assets.json` (NuGet dependency files)
- `.vs/` folder (Visual Studio user settings)
- `*.user` files (Visual Studio user preferences)
- Many more .NET build artifacts

## Verification

After running the cleanup and committing:
```bash
# Build the solution
dotnet build

# Check git status - should be clean!
git status
```

You should see: `nothing to commit, working tree clean`
