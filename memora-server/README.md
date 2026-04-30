# Memora Server

`memora-server` 是 Memora 的后端服务，当前职责聚焦为：

`多租户工作区 + 知识库 + 文档树 + 版本`

它不再是旧的单用户知识库 demo，也不再围绕资源库、AI 或技能系统展开。

---

## 当前职责

后端当前提供：

- 工作台聚合接口
- 会话占位与访问上下文解析
- 知识库管理
- 文档树管理
- 文档版本快照与回滚
- 初始化种子数据

---

## 模块结构

```text
memora-server/
├── memora-server-common/   # 通用响应、异常、基础工具
├── memora-server-manager/  # 核心业务逻辑
└── memora-server-start/    # 应用启动、配置、数据库脚本、测试
```

### 模块说明

#### `memora-server-common`

提供：

- 统一响应结构
- 业务异常
- 通用基础工具

#### `memora-server-manager`

当前核心服务包括：

- `WorkspaceController / WorkspaceService`
- `KnowledgeBaseController / KnowledgeBaseService`
- `DocumentController / DocumentService`

#### `memora-server-start`

提供：

- Spring Boot 启动入口
- `application.yml`
- `schema.sql`
- `data.sql`
- 集成测试

---

## 核心模型

当前主模型：

- `Tenant`
- `TenantMember`
- `KnowledgeBase`
- `KnowledgeBaseMember`
- `Document`
- `DocumentVersion`

数据库脚本：

- [schema.sql](./memora-server-start/src/main/resources/db/schema.sql)
- [data.sql](./memora-server-start/src/main/resources/db/data.sql)

---

## 接口范围

### 工作台

- `GET /api/v1/workspaces/current/dashboard`

### 认证与会话

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/session`

### 知识库

- `POST /api/v1/knowledge-bases`
- `PUT /api/v1/knowledge-bases/{id}`
- `DELETE /api/v1/knowledge-bases/{id}`
- `GET /api/v1/knowledge-bases`
- `GET /api/v1/knowledge-bases/tenant/{tenantId}`
- `GET /api/v1/knowledge-bases/user/{userId}`
- `GET /api/v1/knowledge-bases/{id}`
- `GET /api/v1/knowledge-bases/{id}/members`
- `PUT /api/v1/knowledge-bases/{id}/members`
- `GET /api/v1/knowledge-bases/{id}/documents`
- `GET /api/v1/knowledge-bases/{id}/document-tree`

### 文档

- `POST /api/v1/documents`
- `PUT /api/v1/documents/{id}`
- `DELETE /api/v1/documents/{id}`
- `POST /api/v1/documents/batch-move`
- `POST /api/v1/documents/batch-delete`
- `PUT /api/v1/documents/sort`
- `GET /api/v1/documents`
- `GET /api/v1/documents/{id}`
- `GET /api/v1/documents/knowledge-base/{knowledgeBaseId}`
- `GET /api/v1/documents/knowledge-base/{knowledgeBaseId}/tree`
- `GET /api/v1/documents/{id}/versions`
- `GET /api/v1/documents/versions/{versionId}`
- `POST /api/v1/documents/{id}/rollback/{versionId}`

---

## 本地运行

### 启动

```bash
./start-backend.sh
```

### 验证

```bash
./scripts/backend-test.sh
```

### 构建

```bash
./scripts/backend-build.sh
```

如果需要绕过 wrapper，强制改用系统 Gradle：

```bash
MEMORA_GRADLE_CMD=gradle ./scripts/backend-test.sh
```

也可以直接从 IDE 启动：

- `com.memora.MemoraApplication`

### 开发数据库

默认开发环境使用 H2 内存库：

- JDBC URL: `jdbc:h2:mem:memora_doc`
- 用户名：`sa`
- 密码：空

H2 控制台：

- `http://localhost:8080/h2-console`

---

## 已知环境问题

当前本地环境已知问题：

- `./start-backend.sh`、`./scripts/backend-test.sh`、`./scripts/backend-build.sh` 都会优先使用仓库内的 `./gradlew`
- 如需临时切换到系统 Gradle，可通过 `MEMORA_GRADLE_CMD=gradle` 覆盖
- 使用 wrapper 时，脚本会默认把 `GRADLE_USER_HOME` 设置到仓库内，减少对用户主目录写权限的依赖
- 如果本地没有已缓存的 wrapper 分发包，仍然依赖可访问的 Gradle 下载源
- 当前机器上的后端测试仍可能受 macOS aarch64 的 Gradle native 库问题阻塞

这些属于环境问题，不是当前主业务逻辑回归。

---

## 当前实现状态

### 已实现

- 多租户基础模型
- 统一 `CurrentAccessContext`
- 工作台聚合接口
- 知识库核心模型
- 知识库成员权限接口
- 文档树核心模型
- 版本快照与回滚
- demo 登录接口
- bearer token 会话占位
- 面向企业知识库场景的种子数据

### 未实现

- 真实认证上下文
- 生产级权限系统
- 完整协作编辑模型
- 更完整的回归覆盖

### 当前会话策略

后端控制器已不再硬编码 tenant 或 user，主业务链路统一从 `CurrentAccessContext` 解析当前主体。

当前 demo 登录账号：

- `admin / 123456`

返回 token 形式：

- `Authorization: Bearer demo:{tenantId}:{userId}`

除 `POST /api/v1/auth/login` 外，主流程接口都要求有效 bearer token。

### 当前测试覆盖

仓库已具备在线文档主流程的最小集成测试基线，包括：

- 工作台接口
- 知识库创建
- 文档树查询
- 跨租户拒绝
- 角色拒绝
- 知识库级权限覆盖
- 知识库成员权限接口
- bearer token 会话场景

测试文件：

- [OnlineDocumentApiIntegrationTest.java](./memora-server-start/src/test/java/com/memora/OnlineDocumentApiIntegrationTest.java)

---

## 技术边界

后端当前仍有意保持单体结构。

原因：

- 领域模型仍在收敛
- 当前最高优先级仍是把主流程做稳
