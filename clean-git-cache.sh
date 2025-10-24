#!/bin/bash
# Bash script to remove build artifacts from Git tracking
# This script removes files that should be ignored but were previously committed

echo "========================================"
echo "Git Cache Cleanup for .NET Projects"
echo "========================================"
echo ""
echo "This script will remove build artifacts from Git tracking."
echo "The files will remain on your disk but won't be tracked by Git anymore."
echo ""

# Confirm with user
read -p "Do you want to continue? (yes/no): " confirmation
if [ "$confirmation" != "yes" ]; then
    echo "Operation cancelled."
    exit 1
fi

echo ""
echo "Removing tracked files that should be ignored..."

# Remove all obj and bin folders from tracking
echo "  - Removing bin/ and obj/ folders..."
git rm -r --cached backend/bin/ 2>/dev/null || true
git rm -r --cached backend/obj/ 2>/dev/null || true
git rm -r --cached backend.tests/WorkflowConfig.Api.Tests/bin/ 2>/dev/null || true
git rm -r --cached backend.tests/WorkflowConfig.Api.Tests/obj/ 2>/dev/null || true
git rm -r --cached backend.tests/WorkflowConfig.E2E.Tests/bin/ 2>/dev/null || true
git rm -r --cached backend.tests/WorkflowConfig.E2E.Tests/obj/ 2>/dev/null || true

# Remove generated feature.cs files
echo "  - Removing *.feature.cs files..."
git rm --cached backend.tests/WorkflowConfig.E2E.Tests/Features/*.feature.cs 2>/dev/null || true

# Remove NuGet files (using find since bash doesn't support **)
echo "  - Removing NuGet generated files..."
find . -name "*.nuget.props" -exec git rm --cached {} \; 2>/dev/null || true
find . -name "*.nuget.targets" -exec git rm --cached {} \; 2>/dev/null || true
find . -name "project.assets.json" -exec git rm --cached {} \; 2>/dev/null || true

# Remove Visual Studio user files
echo "  - Removing Visual Studio user files..."
find . -name "*.user" -exec git rm --cached {} \; 2>/dev/null || true

echo ""
echo "========================================"
echo "Cleanup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "  1. Review the changes: git status"
echo "  2. Commit the cleanup: git commit -m 'Remove build artifacts from Git tracking'"
echo "  3. Push to remote: git push"
echo ""
echo "After this, build artifacts will no longer appear in Git!"
