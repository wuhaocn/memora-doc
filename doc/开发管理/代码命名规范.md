# 代码命名规范

## 1. 前端（React）命名规范

### 1.1 基本原则
- **可读性优先**：命名应清晰、简洁、易于理解
- **一致性**：在整个项目中保持命名风格统一
- **语义化**：命名应反映变量、函数或组件的功能

### 1.2 组件命名
- **组件名**：使用 PascalCase（大驼峰命名法）
  - 示例：`UserProfile.jsx`, `LoginForm.jsx`
- **文件命名**：与组件名保持一致，使用 PascalCase
  - 示例：`UserProfile.jsx` 对应 `UserProfile` 组件
- **目录命名**：使用 kebab-case（短横线命名法）
  - 示例：`src/components/user-profile/`

### 1.3 变量与函数命名
- **变量名**：使用 camelCase（小驼峰命名法）
  - 示例：`userName`, `isLoggedIn`, `documentList`
- **函数名**：使用 camelCase，动词开头
  - 示例：`fetchData()`, `handleClick()`, `validateForm()`
- **常量**：使用 UPPER_SNAKE_CASE（全大写+下划线）
  - 示例：`API_URL`, `MAX_COUNT`, `DEFAULT_TIMEOUT`

### 1.4 Hooks 命名
- **自定义 Hooks**：以 `use` 开头，使用 camelCase
  - 示例：`useAuth()`, `useDocument()`
- **内置 Hooks**：遵循 React 官方命名规范
  - 示例：`useState()`, `useEffect()`, `useContext()`

### 1.5 CSS 命名
- **CSS 文件**：与组件名保持一致，使用 PascalCase + `.module.css`
  - 示例：`UserProfile.module.css`
- **CSS 类名**：使用 kebab-case
  - 示例：`.user-profile`, `.btn-primary`, `.card-header`

### 1.6 API 与服务命名
- **API 函数**：使用 camelCase，动词开头
  - 示例：`getUser()`, `createDocument()`, `updateProfile()`
- **服务模块**：使用 camelCase，以 `Api` 或 `Service` 结尾
  - 示例：`userApi.js`, `documentService.js`

### 1.7 路由命名
- **路由路径**：使用 kebab-case
  - 示例：`/user-profile`, `/document-list`
- **路由组件**：使用 PascalCase
  - 示例：`UserProfilePage.jsx`, `DocumentListPage.jsx`

## 2. 后端（Java Spring Boot）命名规范

### 2.1 基本原则
- **遵循 Java 命名规范**：符合 Oracle 官方 Java 命名规范
- **Spring Boot 最佳实践**：遵循 Spring Boot 社区最佳实践
- **语义化**：命名应反映类、方法、变量的功能

### 2.2 包命名
- **包名**：全部小写，使用域名倒置作为前缀
  - 示例：`com.memora.manager`, `com.memora.config`
- **模块包名**：根据功能模块划分
  - 示例：`com.memora.manager.controller`, `com.memora.manager.service`

### 2.3 类命名
- **类名**：使用 PascalCase
  - 示例：`UserService`, `DocumentController`
- **接口名**：使用 PascalCase，可选择性添加 `I` 前缀
  - 示例：`IUserService`, `IDocumentRepository`
- **抽象类名**：使用 PascalCase，添加 `Abstract` 前缀
  - 示例：`AbstractService`, `AbstractController`

### 2.4 方法命名
- **方法名**：使用 camelCase，动词开头
  - 示例：`getUserById()`, `createDocument()`, `updateProfile()`
- **查询方法**：使用 `find`, `get`, `query` 等前缀
  - 示例：`findUserByEmail()`, `getAllDocuments()`
- **修改方法**：使用 `create`, `update`, `delete` 等前缀
  - 示例：`createUser()`, `updateDocument()`, `deleteUser()`

### 2.5 变量命名
- **变量名**：使用 camelCase
  - 示例：`userName`, `documentId`, `pageSize`
- **常量**：使用 UPPER_SNAKE_CASE
  - 示例：`MAX_PAGE_SIZE`, `DEFAULT_TIMEOUT`, `API_VERSION`
- **成员变量**：使用 camelCase，不推荐使用 `m` 前缀
  - 示例：`private String userName;`, `private Long documentId;`

### 2.6 DTO/VO/POJO 命名
- **DTO**：使用 PascalCase，添加 `DTO` 后缀
  - 示例：`UserDTO`, `DocumentCreateDTO`
- **VO**：使用 PascalCase，添加 `VO` 后缀
  - 示例：`UserVO`, `DocumentVO`
- **POJO/Entity**：使用 PascalCase，直接命名实体
  - 示例：`User`, `Document`, `KnowledgeBase`

### 2.7 接口与实现类命名
- **接口名**：使用 PascalCase
  - 示例：`UserService`, `DocumentRepository`
- **实现类名**：使用 PascalCase，添加 `Impl` 后缀
  - 示例：`UserServiceImpl`, `DocumentRepositoryImpl`

### 2.8 配置类命名
- **配置类名**：使用 PascalCase，添加 `Config` 后缀
  - 示例：`WebConfig`, `MyBatisPlusConfig`, `SecurityConfig`

### 2.9 异常类命名
- **异常类名**：使用 PascalCase，添加 `Exception` 后缀
  - 示例：`BusinessException`, `ValidationException`

### 2.10 控制器命名
- **控制器类名**：使用 PascalCase，添加 `Controller` 后缀
  - 示例：`UserController`, `DocumentController`
- **API 路径**：使用 kebab-case
  - 示例：`/api/v1/users`, `/api/v1/documents/{id}`

## 3. 数据库命名规范

### 3.1 表命名
- **表名**：使用 snake_case（小写+下划线），复数形式
  - 示例：`users`, `documents`, `knowledge_bases`

### 3.2 字段命名
- **字段名**：使用 snake_case（小写+下划线）
  - 示例：`user_id`, `document_title`, `created_at`

### 3.3 索引命名
- **索引名**：使用 `idx_` 前缀 + snake_case
  - 示例：`idx_user_id`, `idx_created_at`

### 3.4 外键命名
- **外键名**：使用 `fk_` 前缀 + snake_case
  - 示例：`fk_user_id`, `fk_document_id`

## 4. 检查工具

### 4.1 前端检查工具
- **ESLint**：配置 ESLint 规则检查命名规范
- **Prettier**：统一代码格式
- **EditorConfig**：保持编辑器配置一致

### 4.2 后端检查工具
- **Checkstyle**：检查 Java 代码命名规范
- **SonarQube**：代码质量和命名规范检查
- **IntelliJ IDEA**：内置代码检查功能

## 5. 代码审查

- 定期进行代码审查，重点检查命名规范
- 建立团队命名规范文档，确保所有成员遵守
- 使用自动化工具进行持续集成检查

## 6. 例外情况

- 对于第三方库或框架的命名约定，优先遵循其官方规范
- 对于历史遗留代码，逐步迁移至新的命名规范
- 在特殊情况下，可以根据实际需求调整命名规范，但需团队一致同意

## 7. 版本控制

- 本规范版本：1.0.0
- 最后更新：2026-01-25
- 适用范围：DocStudio 项目前后端代码