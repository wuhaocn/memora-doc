#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${PROJECT_ROOT}"

echo "[1/2] Sync project-level shared skill projections"
node scripts/tools/sync-share-skills.js --project-only

echo "[2/2] Check shared skills for absolute paths"
node scripts/tools/check-no-absolute-skill-paths.js

echo "Shared skill checks passed."
