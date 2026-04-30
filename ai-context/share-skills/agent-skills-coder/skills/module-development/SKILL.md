---
name: module-development
description: 按照项目的模块结构规范创建新模块，包括内部API和外部API模块
---

# module-development

## 描述
根据项目的模块结构规范创建新模块，支持内部API和外部API两种类型。该技能将帮助开发者按照统一的模块结构创建新模块，确保模块的一致性、可靠性和可维护性。

## 使用场景
当需要创建新模块时，使用此技能可以确保模块结构符合项目规范。

## 指令

1. **确定模块类型**：确定需要创建的模块类型（内部API模块或外部API模块）

2. **确定模块路径**：
   - 内部API模块：`/v3/internal/{module}`
   - 外部API模块：`/v3/user/{module}`

3. **创建目录结构**：
   - Controller 层：处理 HTTP 请求
   - Service 层：业务逻辑处理
   - DAO 层：数据访问
   - Model/DTO：数据传输对象
   - Config：配置类（如需要）

4. **生成基础代码**：
   - Controller：使用 `@RestController`，继承 `BaseController`（如适用）
   - Service：使用 `@Service`，实现业务接口
   - DAO：使用 `@Repository`，继承 `BaseDao`（如适用）
   - Model/DTO：使用 `Validatable` 接口，实现 `PropertyValidator`

5. **配置依赖**：
   - 更新 `build.gradle` 添加必要依赖
   - 配置模块间的依赖关系

6. **添加日志和异常处理**：
   - 使用项目统一的日志框架
   - 实现统一的异常处理

## 模块结构示例

### 内部API模块结构
```
module-name/
├── src/main/java/com/rcloud/module/
│   ├── controller/
│   │   └── ModuleController.java
│   ├── service/
│   │   ├── ModuleService.java
│   │   └── impl/
│   │       └── ModuleServiceImpl.java
│   ├── dao/
│   │   └── ModuleDao.java
│   ├── model/
│   │   ├── ModuleRequest.java
│   │   └── ModuleResponse.java
│   └── config/
│       └── ModuleConfig.java
└── build.gradle
```

### 外部API模块结构
类似内部API模块，但路径为 `/v3/user/{module}`

## 参数

- `module_name`: 模块名称（使用 kebab-case）
- `module_type`: 模块类型（`internal` 或 `external`）
- `description`: 模块描述

## 示例

### 输入示例
```
创建一个内部API模块 "user-management"，包含用户CRUD功能
```

### 输出示例
生成符合项目规范的模块结构，包括 Controller、Service、DAO、Model 等完整代码骨架
