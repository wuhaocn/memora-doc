#!/bin/bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RELEASE_DIR="$PROJECT_ROOT/release"
BACKEND_RELEASE_DIR="$RELEASE_DIR/backend"
WEB_RELEASE_DIR="$RELEASE_DIR/web"

"$PROJECT_ROOT/scripts/backend-build.sh"

cd "$PROJECT_ROOT/memora-web-app"
npm run build

rm -rf "$RELEASE_DIR"
mkdir -p "$BACKEND_RELEASE_DIR" "$WEB_RELEASE_DIR"

cp "$PROJECT_ROOT/memora-server/memora-server-start/build/libs/"*.jar "$BACKEND_RELEASE_DIR/"
cp "$PROJECT_ROOT/start-backend.sh" "$BACKEND_RELEASE_DIR/"
cp "$PROJECT_ROOT/memora-server/memora-server-start/src/main/resources/application.yml" "$BACKEND_RELEASE_DIR/"
cp -R "$PROJECT_ROOT/memora-web-app/dist/." "$WEB_RELEASE_DIR/"

echo "发布产物目录: $RELEASE_DIR"
echo "后端产物: $BACKEND_RELEASE_DIR"
echo "前端产物: $WEB_RELEASE_DIR"
