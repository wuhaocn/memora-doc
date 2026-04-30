#!/bin/bash

if [ -n "${MEMORA_GRADLE_LIB_SOURCED:-}" ]; then
    return 0
fi
MEMORA_GRADLE_LIB_SOURCED=1

MEMORA_PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
MEMORA_GRADLE_USER_HOME_DEFAULT="$MEMORA_PROJECT_ROOT/.gradle-user-home"

memora_resolve_gradle_cmd() {
    if [ -n "${MEMORA_GRADLE_CMD:-}" ]; then
        # shellcheck disable=SC2206
        MEMORA_GRADLE_CMD_ARRAY=(${MEMORA_GRADLE_CMD})
    elif [ -x "$MEMORA_PROJECT_ROOT/gradlew" ]; then
        MEMORA_GRADLE_CMD_ARRAY=("$MEMORA_PROJECT_ROOT/gradlew")
    elif command -v gradle >/dev/null 2>&1; then
        MEMORA_GRADLE_CMD_ARRAY=("gradle")
    else
        echo "错误：未找到可用的 Gradle 命令。"
        echo "请优先使用仓库内的 ./gradlew，或通过 MEMORA_GRADLE_CMD 指定可用命令。"
        exit 1
    fi

    if [ "${MEMORA_GRADLE_CMD_ARRAY[0]}" = "$MEMORA_PROJECT_ROOT/gradlew" ] && [ -z "${GRADLE_USER_HOME:-}" ]; then
        export GRADLE_USER_HOME="$MEMORA_GRADLE_USER_HOME_DEFAULT"
    fi
}

memora_print_gradle_context() {
    echo "项目目录: $MEMORA_PROJECT_ROOT"
    echo "Gradle 命令: ${MEMORA_GRADLE_CMD_ARRAY[*]}"
    echo "执行任务: $*"
    if [ -n "${GRADLE_USER_HOME:-}" ]; then
        echo "GRADLE_USER_HOME: $GRADLE_USER_HOME"
    fi
}

memora_exec_gradle() {
    memora_resolve_gradle_cmd
    memora_print_gradle_context "$@"
    cd "$MEMORA_PROJECT_ROOT"
    "${MEMORA_GRADLE_CMD_ARRAY[@]}" "$@"
}
