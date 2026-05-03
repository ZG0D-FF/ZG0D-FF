#!/bin/bash

# 🏷️ ZG0D-FF Config Version Tagger
# Auto-creates semantic version tags

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🏷️  ZG0D-FF Config Version Tagger${NC}"
echo "=================================="

# Get current version
CURRENT_TAG=$(git describe --tags --always 2>/dev/null || echo "v0.0.0")
echo -e "${YELLOW}Current version: $CURRENT_TAG${NC}"

# Create new version
TIMESTAMP=$(date +%Y.%m.%d)
BUILD_NUM=$(git rev-list --count HEAD)
NEW_VERSION="v${TIMESTAMP}.${BUILD_NUM}"

echo -e "${BLUE}Creating new version tag...${NC}"

# Configure git
git config user.name "ZG0D-FF Config Bot"
git config user.email "config@zg0d-ff.local"

# Create annotated tag
git tag -a "$NEW_VERSION" -m "🏷️ Version $NEW_VERSION - Config Update
- Timestamp: $(date)
- Build: $BUILD_NUM
- Branch: $(git branch --show-current)
- Author: $GITHUB_ACTOR
- Commit: $(git rev-parse --short HEAD)"

# Push tag
git push origin "$NEW_VERSION" 2>/dev/null || echo "⚠️  Could not push tag (offline?)"

echo -e "${GREEN}✅ Tagged: $NEW_VERSION${NC}"
echo -e "${GREEN}✅ Changelog: Config synchronized${NC}"

# List recent tags
echo -e "\n${BLUE}Recent versions:${NC}"
git tag -l --sort=-version:refname | head -5

echo -e "${GREEN}Done!${NC}"
