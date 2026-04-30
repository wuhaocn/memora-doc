# API 配置说明

## 基础地址

前端 `axios` 实例在 [axios.js](./src/services/http/axios.js) 中定义：

- 默认 `baseURL`: `http://localhost:8080`
- 接口路径统一由各 API 文件补全 `/api/v1/...`

如果需要通过环境变量覆盖，请使用：

```env
VITE_API_BASE_URL=http://localhost:8080
```

不要把 `/api/v1` 写进 `VITE_API_BASE_URL`，否则会和接口路径重复拼接。

---

## 当前会话方式

当前 Web 端走 demo 会话占位：

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/session`

登录成功后，本地会保存：

- `Authorization: Bearer demo:{tenantId}:{userId}`

请求拦截器会自动把 token 带到后端。

演示账号：

- `admin / 123456`

---

## 当前主要接口

### 工作台

- `GET /api/v1/workspaces/current/dashboard`

### 知识库

- `GET /api/v1/knowledge-bases`
- `GET /api/v1/knowledge-bases/tenant/{tenantId}`
- `GET /api/v1/knowledge-bases/user/{userId}`
- `GET /api/v1/knowledge-bases/{id}`
- `POST /api/v1/knowledge-bases`
- `PUT /api/v1/knowledge-bases/{id}`
- `DELETE /api/v1/knowledge-bases/{id}`
- `GET /api/v1/knowledge-bases/{id}/members`
- `PUT /api/v1/knowledge-bases/{id}/members`
- `GET /api/v1/knowledge-bases/{id}/documents`
- `GET /api/v1/knowledge-bases/{id}/document-tree`

### 文档

- `GET /api/v1/documents`
- `GET /api/v1/documents/knowledge-base/{knowledgeBaseId}`
- `GET /api/v1/documents/knowledge-base/{knowledgeBaseId}/tree`
- `GET /api/v1/documents/{id}`
- `POST /api/v1/documents`
- `PUT /api/v1/documents/{id}`
- `DELETE /api/v1/documents/{id}`
- `POST /api/v1/documents/batch-move`
- `POST /api/v1/documents/batch-delete`
- `PUT /api/v1/documents/sort`
- `GET /api/v1/documents/{id}/versions`
- `GET /api/v1/documents/versions/{versionId}`
- `POST /api/v1/documents/{id}/rollback/{versionId}`

---

## 响应格式

统一响应结构：

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

---

## 当前说明

1. 当前会话已从固定 `userId=1` 升级为 demo bearer token，会话由登录接口返回。
2. 前端统一通过拦截器处理 token 和错误响应。
3. 当前真实认证和组织身份体系仍未接入，这一层仍是占位实现。
4. 当前公开 API 只围绕 Web 主链路提供能力，不再暴露本地同步相关入口。
