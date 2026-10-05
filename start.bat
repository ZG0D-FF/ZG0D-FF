@echo off
setlocal
title JARVIS Local Server - Port 8005
cd /d "%~dp0"

echo ===================================================
echo   JARVIS LOCAL WEB SERVER (PORT 8005)
echo ===================================================
echo.
echo Serving root: %CD%
echo.
echo Core Pages:
echo   - http://localhost:8005/index.html
echo   - http://localhost:8005/dashboard.html
echo   - http://localhost:8005/notes.html
echo.
echo Academic Modules:
echo   - http://localhost:8005/AIML/AIML.html
echo   - http://localhost:8005/cysec/cysec.html
echo   - http://localhost:8005/ADC/ADC.html
echo   - http://localhost:8005/Java/JAVA1.html
echo   - http://localhost:8005/Digital_Logic/index_digital_logic.html
echo   - http://localhost:8005/Digital_Bharat/digital-bharat-explorer.html
echo   - http://localhost:8005/TinyML/tinyml_notes.html
echo.
echo Opening browser at http://localhost:8005/index.html ...
start http://localhost:8005/index.html
echo.
echo Press Ctrl+C in this terminal to stop the server.
echo ===================================================
echo.

python -m http.server 8005
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Failed to start Python HTTP server.
    echo Make sure Python is installed and added to your PATH.
    pause
)
