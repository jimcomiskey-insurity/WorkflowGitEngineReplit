# PowerShell script to remove build artifacts from Git tracking
# This script removes files that should be ignored but were previously committed

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Git Cache Cleanup for .NET Projects" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will remove build artifacts from Git tracking." -ForegroundColor Yellow
Write-Host "The files will remain on your disk but won't be tracked by Git anymore." -ForegroundColor Yellow
Write-Host ""

# Confirm with user
$confirmation = Read-Host "Do you want to continue? (yes/no)"
if ($confirmation -ne 'yes') {
    Write-Host "Operation cancelled." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Removing tracked files that should be ignored..." -ForegroundColor Green

# Remove all obj and bin folders from tracking
Write-Host "  - Removing bin/ and obj/ folders..." -ForegroundColor Gray
git rm -r --cached backend/bin/ 2>$null
git rm -r --cached backend/obj/ 2>$null
git rm -r --cached backend.tests/WorkflowConfig.Api.Tests/bin/ 2>$null
git rm -r --cached backend.tests/WorkflowConfig.Api.Tests/obj/ 2>$null
git rm -r --cached backend.tests/WorkflowConfig.E2E.Tests/bin/ 2>$null
git rm -r --cached backend.tests/WorkflowConfig.E2E.Tests/obj/ 2>$null

# Remove generated feature.cs files
Write-Host "  - Removing *.feature.cs files..." -ForegroundColor Gray
git rm --cached backend.tests/WorkflowConfig.E2E.Tests/Features/*.feature.cs 2>$null

# Remove NuGet files
Write-Host "  - Removing NuGet generated files..." -ForegroundColor Gray
git rm --cached **/*.nuget.props 2>$null
git rm --cached **/*.nuget.targets 2>$null
git rm --cached **/project.assets.json 2>$null

# Remove Visual Studio user files
Write-Host "  - Removing Visual Studio user files..." -ForegroundColor Gray
git rm --cached **/.vs/ 2>$null
git rm --cached **/*.user 2>$null

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cleanup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Review the changes: git status" -ForegroundColor White
Write-Host "  2. Commit the cleanup: git commit -m 'Remove build artifacts from Git tracking'" -ForegroundColor White
Write-Host "  3. Push to remote: git push" -ForegroundColor White
Write-Host ""
Write-Host "After this, build artifacts will no longer appear in Git!" -ForegroundColor Green
