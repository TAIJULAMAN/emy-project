@echo off
setlocal
cd /d "%~dp0"

where firebase >nul 2>nul
if errorlevel 1 (
  echo Firebase CLI is not installed or not on PATH.
  echo Install Firebase CLI, then run this file again.
  echo Project target: my-emy-db032
  exit /b 1
)

firebase deploy --project my-emy-db032 --only hosting,firestore:rules,firestore:indexes,functions
