#!/usr/bin/env bash
set -e

# Config
SOURCE_BRANCH="main"
TARGET_BRANCH="static"
FOLDER="static"

echo "📦 Switching to $SOURCE_BRANCH..."
git checkout $SOURCE_BRANCH
git pull origin $SOURCE_BRANCH

echo "🌿 Checkout: $TARGET_BRANCH"
git checkout refs/heads/$TARGET_BRANCH

echo "🧹 Cleaning working tree..."
git rm -rf . >/dev/null 2>&1 || true

echo "📥 Checking out only $FOLDER from $SOURCE_BRANCH..."
git checkout $SOURCE_BRANCH -- $FOLDER

# echo "📁 Moving contents to root (optional but recommended for GH Pages-like usage)..."
# Uncomment if you want /static content to become repo root:
# mv static/* .
# rm -rf static

echo "📝 Creating commit..."
git add .
git commit -m "Sync static folder from $SOURCE_BRANCH - $(date '+%Y-%m-%d %H:%M:%S')"

echo "🚀 Force pushing to $TARGET_BRANCH..."
git push origin $TARGET_BRANCH --force

echo "✅ Done!"
