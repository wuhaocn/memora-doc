#!/bin/bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
# shellcheck source=lib/gradle-env.sh
source "$PROJECT_ROOT/scripts/lib/gradle-env.sh"

if [ "${MEMORA_BUILD_WITH_TESTS:-0}" = "1" ]; then
    memora_exec_gradle clean build "$@"
else
    memora_exec_gradle clean build -x test "$@"
fi
