@echo off
REM MindFlow Installation Script for Windows
REM Run this script to set up MindFlow quickly

echo.
echo ========================================
echo   Welcome to MindFlow Setup!
echo ========================================
echo.

REM Check Node.js
echo [1/5] Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed.
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=1 delims=." %%a in ('node -v') do set NODE_MAJOR=%%a
set NODE_MAJOR=%NODE_MAJOR:~1%
if %NODE_MAJOR% LSS 18 (
    echo [ERROR] Node.js version must be 18 or higher.
    node -v
    pause
    exit /b 1
)

node -v
echo [OK] Node.js detected
echo.

REM Install dependencies
echo [2/5] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed
echo.

REM Set up environment
echo [3/5] Setting up environment...
if not exist .env.local (
    copy .env.local.example .env.local
    echo [OK] Created .env.local file
    echo.
    echo ========================================
    echo   IMPORTANT: Configure API Key
    echo ========================================
    echo.
    echo Edit .env.local and add your OpenAI API key
    echo Get your key from: https://platform.openai.com/api-keys
    echo.
    notepad .env.local
    echo.
    echo Press any key after saving your API key...
    pause >nul
) else (
    echo [OK] .env.local already exists
)
echo.

REM Build check
echo [4/5] Testing build...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed. Please check errors above.
    pause
    exit /b 1
)
echo [OK] Build successful
echo.

REM Success message
echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the development server:
echo   npm run dev
echo.
echo Then open: http://localhost:3000
echo.
echo Documentation:
echo   - README.md       : Full documentation
echo   - QUICKSTART.md   : Quick start guide  
echo   - COMPONENTS.md   : Component reference
echo.
echo Happy coding! [heart]
echo.
pause
