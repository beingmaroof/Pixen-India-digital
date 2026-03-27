@echo off
echo ========================================
echo Installing Pixen India Digital Dependencies
echo ========================================
echo.

echo Step 1: Installing npm packages...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Installation failed!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Run: npm run dev
echo 2. Open browser: http://localhost:3000
echo.
echo All TypeScript errors will be resolved now.
pause
