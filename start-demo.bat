@echo off
echo Starting FreelanceHub Demo...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd my-backend && node server.js"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd src && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul
