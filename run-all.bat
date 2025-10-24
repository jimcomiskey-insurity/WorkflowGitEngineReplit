@echo off
echo Starting Backend and Frontend...
echo.
echo Backend will start at: http://localhost:5000
echo Frontend will start at: http://localhost:4200
echo.
echo Two terminal windows will open.
echo Close those windows to stop the servers.
echo.

start "Backend API" cmd /k start-backend.bat
timeout /t 3 /nobreak >nul
start "Frontend" cmd /k start-frontend.bat

echo.
echo Both services are starting...
echo Wait for both to fully start before running tests or accessing the app.
echo.
pause
