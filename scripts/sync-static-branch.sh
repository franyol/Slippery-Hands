#!/usr/bin/env bash
set -e

SOURCE_BRANCH="main"
TARGET_BRANCH="static"
FOLDER="static"

echo "📦 Switching to $SOURCE_BRANCH..."
git checkout "$SOURCE_BRANCH"
git pull origin "$SOURCE_BRANCH"

echo "🌿 Ensuring target branch exists locally..."
git fetch origin "$TARGET_BRANCH" || true

if git show-ref --verify --quiet "refs/remotes/origin/$TARGET_BRANCH"; then
  git checkout -B "$TARGET_BRANCH" "origin/$TARGET_BRANCH"
else
  git checkout -B "$TARGET_BRANCH"
fi

echo "🧹 Cleaning working tree..."
git rm -rf . >/dev/null 2>&1 || true

echo "📥 Checking out only $FOLDER from $SOURCE_BRANCH..."
git checkout "$SOURCE_BRANCH" -- "$FOLDER"

echo "📝 Creating commit..."
git add .
git commit -m "Sync static folder from $SOURCE_BRANCH - $(date '+%Y-%m-%d %H:%M:%S')"

echo "🚀 Force pushing to $TARGET_BRANCH..."
git push origin "$TARGET_BRANCH" --force

echo "✅ Done!"
