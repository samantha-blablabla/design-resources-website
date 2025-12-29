@echo off
echo ========================================
echo  Khoi dong Development Server
echo ========================================
echo.

REM Change to project directory
cd /d "%~dp0"

echo Dang kiem tra Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js chua duoc cai dat hoac chua duoc them vao PATH!
    echo.
    echo Vui long:
    echo 1. Dong tat ca cua so VSCode/PowerShell
    echo 2. Mo lai VSCode/PowerShell moi
    echo 3. Chay lai file nay
    echo.
    echo Hoac cai Node.js tu: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo Node.js da san sang!
node --version
npm --version
echo.

echo Dang cai dat dependencies...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Khong the cai dat dependencies!
    echo Vui long kiem tra ket noi internet.
    echo.
    pause
    exit /b 1
)

echo.
echo Khoi dong dev server...
echo Website se mo tai: http://localhost:3000
echo.
echo Nhan Ctrl+C de dung server
echo.

call npm run dev

pause
