#!/usr/bin/env python3
"""
通过GitHub API获取Agent Skills列表并更新到指定目录
"""

import os
import requests
import markdown
from bs4 import BeautifulSoup

# 配置
GITHUB_REPO = "libukai/awesome-agent-skills"
GITHUB_API_URL = f"https://api.github.com/repos/{GITHUB_REPO}/contents/README.md"
OUTPUT_DIR = "/Users/wuhao/data/ai/doc-studio/doc/业界Skills"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "业界优秀Skills.md")

# GitHub API 认证（可选，用于提高速率限制）
# GITHUB_TOKEN = "your_github_token"
# HEADERS = {"Authorization": f"token {GITHUB_TOKEN}"}
HEADERS = {}

def get_github_file_content():
    """获取GitHub仓库中README.md的内容"""
    response = requests.get(GITHUB_API_URL, headers=HEADERS)
    if response.status_code == 200:
        import base64
        content = base64.b64decode(response.json()["content"]).decode("utf-8")
        return content
    else:
        print(f"Error fetching README.md: {response.status_code}")
        return None

def parse_skills_from_readme(content):
    """从README.md中解析技能列表"""
    # 简单的解析逻辑，根据实际README.md格式调整
    skills = []
    lines = content.split('\n')
    
    # 查找技能部分
    in_skills_section = False
    current_skill = {}
    
    for line in lines:
        line = line.strip()
        
        # 检测技能部分开始
        if "## 精选技能" in line or "## 推荐技能" in line:
            in_skills_section = True
            continue
        
        # 检测技能部分结束
        if in_skills_section and line.startswith("## ") and not line.startswith("### "):
            break
        
        # 解析技能项
        if in_skills_section:
            # 技能标题
            if line.startswith("- ") and "：" in line:
                if current_skill:
                    skills.append(current_skill)
                    current_skill = {}
                
                # 提取技能名称和描述
                skill_info = line[2:].split("：", 1)
                if len(skill_info) == 2:
                    current_skill["name"] = skill_info[0].strip()
                    current_skill["description"] = skill_info[1].strip()
            
            # 技能链接
            elif line.startswith("  - ") and "：" in line:
                link_info = line[4:].split("：", 1)
                if len(link_info) == 2 and current_skill:
                    current_skill["link"] = link_info[1].strip()
    
    # 添加最后一个技能
    if current_skill:
        skills.append(current_skill)
    
    return skills

def generate_markdown(skills):
    """生成Markdown文档"""
    markdown_content = "# 业界优秀 Skills 汇总\n\n"
    markdown_content += "本文档汇总了业界优秀的 Skills 资源，包括可下载的网站和项目。\n\n"
    markdown_content += "## 资源导航\n\n"
    markdown_content += "- **Agent Skills 终极指南**: [https://github.com/libukai/awesome-agent-skills](https://github.com/libukai/awesome-agent-skills)\n"
    markdown_content += "  - 包含快速入门、推荐技能、最新资讯与实战案例\n"
    markdown_content += "  - 由社区维护的综合性 Agent Skills 资源集合\n"
    markdown_content += "  - 提供了详细的教程、案例和实践指南\n\n"
    
    # 添加从GitHub获取的技能
    if skills:
        markdown_content += "## 从 Awesome Agent Skills 获取的技能\n\n"
        for i, skill in enumerate(skills, 1):
            markdown_content += f"### {i}. {skill.get('name', '未知技能')}\n\n"
            if skill.get('description'):
                markdown_content += f"**项目简介**: {skill['description']}\n\n"
            if skill.get('link'):
                markdown_content += f"**链接**: {skill['link']}\n\n"
    
    # 添加原有技能
    markdown_content += "## 其他优秀技能\n\n"
    markdown_content += "### 1. OpenClaw\n\n"
    markdown_content += "**项目简介**: OpenClaw 是一个开源的技能开发框架，提供了丰富的工具和库，用于构建智能助手和自动化工作流。\n\n"
    markdown_content += "**主要功能**:\n"
    markdown_content += "- 提供完整的技能开发框架\n"
    markdown_content += "- 支持多种语言和平台\n"
    markdown_content += "- 丰富的 API 和工具集\n"
    markdown_content += "- 社区活跃，持续更新\n\n"
    markdown_content += "**下载网站**:\n"
    markdown_content += "- GitHub: [https://github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)\n"
    markdown_content += "- 官方网站: [https://openclaw.io](https://openclaw.io)\n\n"
    
    return markdown_content

def main():
    """主函数"""
    # 确保输出目录存在
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # 获取README.md内容
    content = get_github_file_content()
    if not content:
        print("Failed to get README.md content")
        return
    
    # 解析技能列表
    skills = parse_skills_from_readme(content)
    print(f"Found {len(skills)} skills from GitHub")
    
    # 生成Markdown文档
    markdown_content = generate_markdown(skills)
    
    # 写入文件
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(markdown_content)
    
    print(f"Updated skills list to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
