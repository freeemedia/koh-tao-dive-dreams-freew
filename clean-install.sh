#!/bin/bash
# Clean install script for macOS / Linux
set -e

echo "🧹 Cleaning up old dependencies..."
rm -rf node_modules package-lock.json

echo "📦 Installing fresh dependencies..."
npm install

echo "🔍 Verifying installation..."
if npm ls rolldown >/dev/null 2>&1; then
  echo "✅ Rolldown installed successfully"
else
  echo "⚠️ Rolldown verification inconclusive"
fi

echo "✅ Clean install complete!"

echo "Next steps:"
echo "1. Test locally: npm run dev"
echo "2. Build: npm run build"
echo "3. Push to GitHub: git add package-lock.json && git commit -m \"Clean npm install\" && git push origin rollback-to-commit-7b90f76"
