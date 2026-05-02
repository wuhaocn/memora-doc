# Memora Web App

`memora-web-app` 是 Memora 的 Web 管理台。它当前不是一个全能协作套件，而是：

`继续写作入口 + 专用知识库工作区 + 阅读 / 编辑双模式`

---

## 当前职责

Web 端当前提供：

- 当前租户工作台与最近编辑文档入口
- 知识库进入、创建与基础管理
- 知识库内文档树浏览与维护
- 独立文档阅读页与编辑页
- 版本查看、回滚与阅读链接复制
- 知识库级权限管理

当前不以这些目标为主：

- 实时协同编辑
- 完整成熟的编辑器体验
- AI 优先工作流
- 资源库优先工作流

---

## 页面结构

```text
memora-web-app/
├── src/
│   ├── components/
│   │   └── Layout/                  # 全局布局、头部、知识库侧栏
│   ├── pages/
│   │   ├── Home/                    # 工作台首页
│   │   ├── Document/                # 独立阅读页与编辑页
│   │   ├── KnowledgeBase/           # 知识库详情页
│   │   └── NotFound/                # 404 页面
│   ├── contexts/                    # 当前会话上下文
│   ├── hooks/                       # 页面级编排与状态控制
│   ├── router/                      # 主路由
│   ├── services/
│   │   ├── api/                     # 后端 API 封装
│   │   └── http/                    # Axios 实例
│   ├── styles/                      # 全局样式
│   └── utils/                       # 富文本清洗与纯工具
```

当前主路由：

- `/login`
- `/`
- `/kb/:id`
- `/docs/:documentId`
- `/docs/:documentId/edit`

---

## 关键文件

### 布局与导航

- [Layout.jsx](./src/components/Layout/Layout.jsx)
- [Header.jsx](./src/components/Layout/Header.jsx)
- [Sidebar.jsx](./src/components/Layout/Sidebar.jsx)
- [AuthContext.jsx](./src/contexts/AuthContext.jsx)

### 页面

- [Home.jsx](./src/pages/Home/Home.jsx)
- [DocumentReaderPage.jsx](./src/pages/Document/DocumentReaderPage.jsx)
- [DocumentEditorPage.jsx](./src/pages/Document/DocumentEditorPage.jsx)
- [KnowledgeBaseDetail.jsx](./src/pages/KnowledgeBase/KnowledgeBaseDetail.jsx)
- [KnowledgeBaseTreePanel.jsx](./src/components/KnowledgeBase/KnowledgeBaseTreePanel.jsx)
- [KnowledgeBaseDocumentPanel.jsx](./src/components/KnowledgeBase/KnowledgeBaseDocumentPanel.jsx)
- [KnowledgeBaseContextPanel.jsx](./src/components/KnowledgeBase/KnowledgeBaseContextPanel.jsx)

### 页面控制与工具

- [useKnowledgeBaseDetailController.js](./src/hooks/useKnowledgeBaseDetailController.js)
- [knowledgeBaseTree.js](./src/utils/knowledgeBaseTree.js)
- [documentContent.js](./src/utils/documentContent.js)

### API

- [workspaceApi.js](./src/services/api/workspaceApi.js)
- [knowledgeBaseApi.js](./src/services/api/knowledgeBaseApi.js)
- [documentApi.js](./src/services/api/documentApi.js)
- [authApi.js](./src/services/api/authApi.js)
- [axios.js](./src/services/http/axios.js)

---

## 当前产品与体验方向

最新 UI 阶段记录：

- [workspace-ui-status-2026-04-29.md](./docs/workspace-ui-status-2026-04-29.md)

说明：

- 该文件用于记录最近一轮 Web 收口结果。
- 当前 Web 的 canonical 范围仍以仓库根 README 和 `doc/` 文档为准。

当前方向是：

- 优先继续编辑，而不是优先管理面板
- 采用知识工作区布局，而不是运营后台布局
- 使用轻量上下文顶栏，而不是大 Hero
- 三栏结构：左侧文档树、中间文档舞台、右侧上下文面板
- 阅读与编辑共用纸面感中心舞台
- 蓝灰白工作区视觉
- 高频动作占主 CTA，低频信息默认收起

### 工作台首页重点

- 上次编辑文档快捷入口
- 最近文档
- 轻量概览条
- 知识库入口列表
- 默认折叠的成员信息

### 知识库详情页重点

- 紧凑的知识库上下文栏，可展开描述
- 左侧文档树支持展开收起与轻量批量动作
- 中央阅读舞台突出标题与主操作
- 文件夹节点引导下一步动作，而不是空白预览
- 版本信息按需展开
- 右侧上下文面板只展示知识库与当前节点信息
- 支持阅读专注模式

### 文档编辑页重点

- 只保留标题、保存状态与高频动作
- 编辑页不再保留知识库侧栏
- 继续沿用轻量顶部栏风格
- 主动作包括：返回知识库、阅读文档、复制阅读链接、查看版本

### 文档阅读页重点

- 只展示阅读所需信息
- 提供返回知识库、复制阅读链接、继续编辑
- 阅读页始终是独立路由，不强制绕回知识库

---

## 交互规则

### 页面角色

- 工作台首页是继续工作的入口，不是管理后台首页
- 知识库详情页是文档工作区，不是后端详情页
- 编辑页只服务编辑
- 阅读页只服务阅读，并继续受当前认证会话控制

### 命名口径

- 进入知识库使用 `Enter Knowledge Base`
- 创建知识库和文档统一使用 `New`
- 文档正文查看使用 `Read Document`
- 文档主动作使用 `Continue Editing / Copy Reading Link / View Versions`
- 返回工作区使用 `Back to Knowledge Base`

### 低频信息

- 版本、成员、权限默认按需展示
- 只有核心工作流动作占用主按钮位
- 弹窗和抽屉沿用产品语言，不使用后台接口式措辞

---

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

默认后端地址：

- `http://localhost:8080`

Axios 基础配置：

- [axios.js](./src/services/http/axios.js)

当前 demo 会话 token 形式：

- `Authorization: Bearer demo:{tenantId}:{userId}`

demo 账号：

- `admin / 123456`

说明：

- 上述账号和 token 仅用于当前演示与联调，不代表正式认证方案。

前端启动后会调用：

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/session`

---

## 环境说明

在当前机器上，Web 端已经通过：

- `npm run lint`
- `npm run build`

如果跨 CPU 架构复用依赖，需要重新执行 `npm install`，避免 `esbuild` 平台不匹配。
