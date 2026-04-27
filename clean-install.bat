@echo off
REM Clean install script for Windows

echo 🧹 Cleaning up old dependencies...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo 📦 Installing fresh dependencies...
call npm install

echo 🔍 Verifying installation...
npm list rolldown 2>nul | find "rolldown" >nul && (
  echo ✅ Rolldown installed successfully
) || (
  echo ⚠️ Rolldown verification inconclusive
)

echo ✅ Clean install complete!
echo.
echo Next steps:
echo 1. Test locally: npm run dev
echo 2. Build: npm run build
echo 3. Push to GitHub: git add package-lock.json && git commit -m "Clean npm install" && git push
