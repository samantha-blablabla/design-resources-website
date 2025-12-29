@echo off
echo ========================================
echo  SYNC CODE GIUA 2 MAY
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Pulling code moi nhat tu GitHub...
git pull origin main
echo.

echo [2/3] Commit tat ca thay doi...
git add .
git commit -m "Sync: Update from %COMPUTERNAME% at %date% %time%"
echo.

echo [3/3] Push len GitHub...
git push origin main
echo.

echo ========================================
echo  HOAN TAT! Code da dong bo.
echo ========================================
pause
