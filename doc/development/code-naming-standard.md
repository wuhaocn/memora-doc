# 代码命名规范

## 1. 目的

本文档定义 Memora 当前代码库的命名规则，目标是让后端、前端、数据库和文档中的业务概念保持一致。

当前命名基线遵循在线文档主链路，不重新引入旧 `DocStudio` 口径。

---

## 2. 通用原则

- 可读性优先于缩写。
- 命名优先贴近业务语义，不使用模糊词。
- 同一概念在前后端尽量同名。
- 没有明确抽象收益时，不做框架化命名包装。

---

## 3. 前端命名

### 3.1 文件与组件

- React 组件文件使用 `PascalCase`。
- 页面组件使用 `XxxPage.jsx` 或当前已形成的页面命名模式。
- CSS Module 与组件同名，使用 `Xxx.module.css`。

示例：

- `DocumentEditorPage.jsx`
- `KnowledgeBasePermissionModal.jsx`
- `Header.module.css`

### 3.2 变量与函数

- 变量、函数、状态字段使用 `camelCase`。
- 事件处理函数使用 `handleXxx`。
- 布尔值使用 `is`、`has`、`can`、`should` 前缀。

示例：

- `selectedDocumentId`
- `handleSave`
- `canManageKnowledgeBase`
- `isReadLinkOpen`

### 3.3 Hook 与服务

- 自定义 Hook 使用 `useXxx`。
- API 模块使用 `xxxApi.js`。

示例：

- `useKnowledgeBaseNavigation`
- `documentApi.js`

### 3.4 路由

- 路由路径使用小写资源名与短横线风格。
- 知识库资源统一使用 `knowledge-bases`。

示例：

- `/api/v1/knowledge-bases`
- `/api/v1/documents`

---

## 4. 后端命名

### 4.1 包与类

- 包名全小写。
- 类名使用 `PascalCase`。
- Controller 使用 `XxxController`。
- Service 使用 `XxxService`。
- 配置类使用 `XxxConfig`。

示例：

- `com.memora.manager.controller`
- `KnowledgeBaseController`
- `TenantAccessService`
- `MyBatisPlusConfig`

### 4.2 方法

- 查询方法使用 `get`、`list`、`find`、`count`。
- 修改方法使用 `create`、`update`、`delete`、`replace`、`trigger`、`rollback`。
- 权限校验方法使用 `requireXxx`，表达“失败即抛错”。

示例：

- `getById`
- `listTreeByKnowledgeBaseId`
- `replaceMembers`
- `requireKnowledgeBaseWriteAccess`

### 4.3 DTO / VO / Entity

- 请求对象使用 `DTO` 后缀。
- 返回对象使用 `VO` 后缀。
- 持久化模型直接使用业务实体名。

示例：

- `DocumentCreateDTO`
- `WorkspaceDashboardVO`
- `KnowledgeBase`

### 4.4 常量

- 常量使用 `UPPER_SNAKE_CASE`。

示例：

- `DEMO_PASSWORD`
- `AUTHORIZATION_HEADER`

---

## 5. 业务词汇

### 5.1 当前 canonical 词汇

- `Tenant`：工作区顶层隔离单元
- `TenantMember`：租户成员
- `KnowledgeBase`：知识库容器
- `KnowledgeBaseMember`：知识库级权限覆盖成员
- `Document`：文档树节点，包含 `DOC` 和 `FOLDER`
- `DocumentVersion`：文档历史版本

### 5.2 不应继续扩散的历史词汇

- `DocStudio`
- 资源库主链路命名
- 技能市场主链路命名
- 本地同步主链路命名
- 用泛化 `resource`、`skill`、`library` 表达当前核心模型

---

## 6. 数据库命名

### 6.1 表名

- 表名使用 `snake_case`。
- 当前仓库以单数表名为准，没有明确收益时不要强改为复数。

示例：

- `tenant`
- `tenant_member`
- `knowledge_base`
- `knowledge_base_member`
- `document`
- `document_version`

### 6.2 字段名

- 字段名使用 `snake_case`。
- 外键字段使用 `{resource}_id`。
- 时间字段使用语义清晰的命名，如 `created_at`、`updated_at`、`published_at`。

### 6.3 索引名

- 普通索引使用 `idx_` 前缀。
- 唯一索引使用 `uk_` 前缀。

示例：

- `idx_doc_kb_id`
- `uk_kb_tenant_slug`

---

## 7. 文档与接口命名

- 文档标题优先使用明确业务名，不使用模糊总结标题。
- 当前行为使用现在时。
- 规划文档标题中应明确“计划”“评估”“取舍”等属性。
- API 路径与 README 文案使用同一资源名。

---

## 8. 例外处理

- 第三方库、框架、协议字段遵循其官方命名。
- 历史遗留命名可以渐进迁移，但新增代码不继续扩散旧词汇。
- 任何命名例外都必须有明确兼容原因，而不是个人偏好。
