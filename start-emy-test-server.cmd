@echo off
setlocal
cd /d "%~dp0"
set "PORT=8001"
set "CANONICAL_PORT=8001"
set "EMY_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if exist "%EMY_NODE%" (
  "%EMY_NODE%" serve-linked-pages.cjs
) else (
  node serve-linked-pages.cjs
)
pause
