@echo off
echo ========================================
echo PUSH Build Fix Len GitHub
echo ========================================
echo.

echo [1/4] Them cac thay doi...
git add .

echo [2/4] Commit...
git commit -m "Fix: Exclude supabase from TypeScript build"

echo [3/4] Kiem tra remote...
git remote -v

echo [4/4] Push len GitHub...
git push

echo.
if %errorlevel% equ 0 (
    echo ========================================
    echo THANH CONG!
    echo ========================================
    echo.
    echo Vercel se tu dong rebuild trong 1-2 phut.
    echo Kiem tra status tai:
    echo https://github.com/samantha-blablabla/design-resources-website
    echo.
) else (
    echo ========================================
    echo CO LOI XAY RA
    echo ========================================
    echo Vui long kiem tra Git da cai dat chua.
    echo.
)

pause
