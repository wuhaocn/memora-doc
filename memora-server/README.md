# Memora Server

`memora-server` 是 Memora 在线文档系统的后端服务，当前定位是：

`多租户工作区 + 知识库 + 文档树 + 版本 + 同步任务`

它不再是早期的“单用户知识库 demo”，也不再以资源库、AI、技能系统为当前主线。

---

## 当前职责

后端当前主要负责：

- 工作区工作台聚合
- 当前会话占位与上下文解析
- 知识库管理
- 文档树管理
- 文档版本快照与回滚
- 本地同步任务记录
- 基础种子数据初始化

---

## 模块结构

```text
memora-server/
├── memora-server-common/   # 公共能力：统一响应、异常等
├── memora-server-manager/  # 核心业务：工作区、知识库、文档、同步
└── memora-server-start/    # 启动模块与配置、数据库脚本
```

### 模块说明

#### `memora-server-common`

提供：

- 统一返回结构
- 业务异常
- 基础公共类

#### `memora-server-manager`

当前核心业务模块，包括：

- `WorkspaceController / WorkspaceService`
- `KnowledgeBaseController / KnowledgeBaseService`
- `DocumentController / DocumentService`
- `SyncJobService`

#### `memora-server-start`

提供：

- Spring Boot 启动入口
- `application.yml`
- `schema.sql`
- `data.sql`

---

## 当前核心模型

当前后端主模型包括：

- `Tenant`
- `TenantMember`
- `KnowledgeBase`
- `KnowledgeBaseMember`
- `Document`
- `DocumentVersion`
- `SyncJob`

数据库脚本：

- [schema.sql](./memora-server-start/src/main/resources/db/schema.sql)
- [data.sql](./memora-server-start/src/main/resources/db/data.sql)

---

## 当前接口范围

### 工作台

- `GET /api/v1/workspaces/current/dashboard`

### 认证与会话

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/session`

### 知识库

- `GET /api/v1/knowledge-bases`
- `GET /api/v1/knowledge-bases/tenant/{tenantId}`
- `GET /api/v1/knowledge-bases/{id}`
- `GET /api/v1/knowledge-bases/{id}/members`
- `PUT /api/v1/knowledge-bases/{id}/members`
- `GET /api/v1/knowledge-bases/{id}/document-tree`
- `GET /api/v1/knowledge-bases/{id}/sync-jobs`
- `POST /api/v1/knowledge-bases/{id}/sync-jobs/trigger`

### 文档

- `GET /api/v1/documents/{id}`
- `GET /api/v1/documents/knowledge-base/{knowledgeBaseId}`
- `GET /api/v1/documents/knowledge-base/{knowledgeBaseId}/tree`
- `GET /api/v1/documents/{id}/versions`
- `POST /api/v1/documents/{id}/rollback/{versionId}`

---

## 本地运行

### 启动方式

```bash
./gradlew :memora-server-start:bootRun
```

或从 IDE 直接启动：

- `com.memora.DocStudioApplication`

### 开发数据库

当前默认使用 H2 内存数据库：

- JDBC URL: `jdbc:h2:mem:doc_studio`
- 用户名: `sa`
- 密码: 留空

H2 控制台：

- `http://localhost:8080/h2-console`

---

## 当前已知环境问题

当前本地环境存在以下问题：

- `gradlew` 可能因网络限制无法拉取 wrapper 依赖
- 仓库自带 `gradle-8.5` 在部分机器上存在 native 兼容问题

这两个问题会导致“代码已更新但无法在当前环境完成完整编译验证”。

---

## 当前实现状态

### 已完成

- 多租户基础模型
- 统一 `CurrentAccessContext`
- 工作区工作台聚合接口
- 知识库管理主模型
- 知识库成员权限配置接口
- 文档树主模型
- 文档版本快照与回滚
- 同步任务模型与手动触发接口
- demo 登录接口
- bearer token 会话占位接口
- 基础种子数据重写

### 未完成

- 真实认证上下文
- 真实权限控制
- 文档完整编辑闭环
- 真实本地同步逻辑
- 更完整的回归测试集

### 当前上下文策略

当前后端已移除控制器内的硬编码用户 / 租户写法，统一从 `CurrentAccessContext` 获取上下文。

当前优先支持 demo 登录：

- `admin / 123456`

登录成功后返回：

- `Authorization: Bearer demo:{tenantId}:{userId}`

兼容保留：

- `X-User-Id`
- `X-Tenant-Id`

如果请求头缺失，会回退到开发默认值，用于本地联调与测试过渡。

### 当前测试状态

当前已补在线文档主链路的最小集成测试骨架，覆盖：

- 工作台接口
- 知识库创建
- 文档树查询
- 同步任务触发
- 跨租户拒绝
- 角色拒绝
- 知识库级权限覆盖
- 知识库成员权限配置 API
- bearer token 会话场景

测试文件：

- [OnlineDocumentApiIntegrationTest.java](./memora-server-start/src/test/java/com/memora/OnlineDocumentApiIntegrationTest.java)

当前在线文档主链路最小集成测试已经完成稳定执行验证，包括 bearer token 会话场景。

---

## 当前技术边界

当前后端仍然是单体服务，这是刻意选择。

原因：

- 当前领域模型仍在收敛
- 现阶段最重要的是把主链路做稳
- 还没有到拆分微服务的收益点

当前最重要的主链路是：

`租户 -> 知识库 -> 文档树 -> 版本 -> 同步`

---

## 推荐阅读顺序

如果你要继续看后端，建议顺序如下：

1. [根目录 README](../README.md)
2. [在线文档系统重构设计与计划](../doc/架构设计/在线文档系统重构设计与计划.md)
3. [在线文档系统技术架构与接口设计](../doc/架构设计/在线文档系统技术架构与接口设计.md)
4. [在线文档系统轻量化收敛评估](../doc/架构设计/在线文档系统轻量化收敛评估.md)
5. [WorkspaceService.java](./memora-server-manager/src/main/java/com/memora/manager/service/WorkspaceService.java)
6. [KnowledgeBaseService.java](./memora-server-manager/src/main/java/com/memora/manager/service/KnowledgeBaseService.java)
7. [DocumentService.java](./memora-server-manager/src/main/java/com/memora/manager/service/DocumentService.java)
