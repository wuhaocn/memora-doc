#!/bin/bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=scripts/lib/gradle-env.sh
source "$PROJECT_ROOT/scripts/lib/gradle-env.sh"

memora_exec_gradle :memora-server-start:bootRun
