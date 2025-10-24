@echo off
echo Starting Backend API...
echo.
echo Backend will start at: http://localhost:5000
echo Swagger UI will be at: http://localhost:5000/swagger
echo.
echo Press Ctrl+C to stop the backend
echo.

cd backend
dotnet run
