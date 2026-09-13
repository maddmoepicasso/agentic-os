@echo off
setlocal
cd /d "%~dp0"
where herdr >nul 2>nul
if errorlevel 1 (
  echo Herdr is not installed yet.
  echo Install it with:
  echo powershell -ExecutionPolicy Bypass -c "irm https://herdr.dev/install.ps1 ^| iex"
  pause
  exit /b 1
)
herdr