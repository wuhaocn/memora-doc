#!/bin/bash

# 后端项目启动脚本

# 项目根目录
PROJECT_ROOT="/Users/wuhao/data/ai/memora-agent-studio/memora-server"

# 切换到项目根目录
cd "$PROJECT_ROOT" || {
    echo "错误：无法切换到项目目录 $PROJECT_ROOT"
    exit 1
}

# 检查是否安装了Gradle
echo "检查Gradle是否安装..."
if ! command -v gradle &> /dev/null; then
    echo "错误：未安装Gradle，无法构建和启动项目。"
    echo "请先安装Gradle，然后再运行此脚本。"
    echo "安装方法："
    echo "1. 使用Homebrew: brew install gradle"
    echo "2. 或从官网下载：https://gradle.org/releases/"
    exit 1
fi

echo "Gradle已安装，版本：$(gradle --version | grep -A1 "Gradle" | tail -n1)"

# 先构建项目
echo "开始构建项目..."
gradle clean build -x test
if [ $? -ne 0 ]; then
    echo "错误：项目构建失败"
    exit 1
fi

# 检查memora-server-start模块是否构建成功
if [ ! -d "memora-server-start/build" ]; then
    echo "错误：memora-server-start模块构建失败，无法启动服务"
    exit 1
fi

echo "项目构建成功，开始启动后端服务..."

# 启动后端服务
gradle :memora-server-start:bootRun

if [ $? -ne 0 ]; then
    echo "错误：后端服务启动失败"
    exit 1
fi