#!/bin/bash

# Deploy to Hostinger (sync dist to divinginasia.com/public_html)

set -e

echo "🔨 Building production bundle..."
npm run build

echo "📁 Syncing to Hostinger public_html..."
rsync -av --delete dist/ divinginasia.com/public_html/

echo "✅ Hostinger deployment complete!"
echo "🌐 Visit https://www.divinginasia.com to verify"
