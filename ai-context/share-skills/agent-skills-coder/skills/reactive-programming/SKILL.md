---
name: reactive-programming
description: 用于Spring WebFlux响应式编程开发，实现响应式API和处理高并发请求
---

# reactive-programming

## 描述
根据IMS-AIS项目的技术栈，用于Spring WebFlux响应式编程开发，实现响应式API和处理高并发请求。该技能将帮助开发者遵循响应式编程的最佳实践，确保API的高性能、高可靠性和可扩展性。

## 使用场景
当需要开发响应式API、处理高并发请求、实现异步非阻塞服务时，使用此技能可以确保开发符合项目规范和最佳实践。

## 指令
1. **响应式API设计**：
   - 设计基于Spring WebFlux的响应式API
   - 使用Functional Endpoints或Annotated Controllers
   - 实现响应式数据处理

2. **异步非阻塞编程**：
   - 使用Reactor Core的Mono和Flux
   - 实现异步服务调用
   - 处理背压（Backpressure）

3. **响应式数据访问**：
   - 使用R2DBC进行响应式数据库访问
   - 实现响应式缓存
   - 处理响应式事务

4. **响应式安全**：
   - 实现响应式认证和授权
   - 处理响应式会话管理
   - 实现响应式CSRF保护

5. **响应式测试**：
   - 使用StepVerifier测试响应式流
   - 测试响应式控制器
   - 测试响应式服务

## 参数
- `task_type`: 任务类型，可选值为 `api-design`、`async-programming`、`data-access`、`security`、`testing`，必填
- `api_path`: API路径，当task_type为api-design时必填
- `request_type`: 请求类型，如 `GET`、`POST` 等，当task_type为api-design时必填
- `response_type`: 响应类型，如 `Mono<BaseResponse>`、`Flux<Item>` 等，当task_type为api-design时必填
- `reactor_type`: Reactor类型，可选值为 `Mono`、`Flux`，当task_type为async-programming时必填
- `database_type`: 数据库类型，可选值为 `r2dbc`、`mongodb` 等，当task_type为data-access时必填

## 示例

### 输入示例
```
调用 reactive-programming 技能，设计一个响应式API，路径为 /v3/internal/agent/template/create.json，请求类型为 POST，响应类型为 Mono<BaseResponse>
```

### 输出示例
```java
package com.rcloud.template.internal.http.controller;

import com.rcloud.http.flux.starter.controller.BaseController;
import com.rcloud.http.flux.starter.model.BaseResponse;
import com.rcloud.http.flux.starter.model.RequestContext;
import com.rcloud.template.internal.http.model.CreateTemplateRequest;
import com.rcloud.template.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

/**
 * 模板控制器
 * 处理内部模板API请求
 */
@RestController
@RequestMapping("/v3/internal/agent/template")
public class TemplateController extends BaseController {

    @Autowired
    private TemplateService templateService;

    /**
     * 创建模板
     * POST /v3/internal/agent/template/create.json
     */
    @PostMapping("/create.json")
    public Mono<BaseResponse> createTemplate(@RequestBody Mono<CreateTemplateRequest> requestMono, ServerWebExchange exchange) {
        return requestMono
            .doOnNext(request -> request.validate())
            .flatMap(request -> templateService.createTemplate(request, getRequestContext(exchange)))
            .doOnError(error -> logger.error("创建模板失败: {}", error.getMessage(), error));
    }
}
```

## 最佳实践

1. **遵循响应式编程原则**：使用异步非阻塞编程模型
2. **使用Mono和Flux正确**：Mono用于0或1个元素，Flux用于0到N个元素
3. **处理背压**：使用Reactor的背压机制处理数据流
4. **实现响应式异常处理**：使用onErrorResume、onErrorReturn等操作符
5. **避免阻塞调用**：不在响应式链中使用阻塞操作
6. **使用响应式数据访问**：使用R2DBC或响应式MongoDB等
7. **实现适当的日志记录**：使用SLF4J和MDC进行日志记录
8. **测试响应式流**：使用StepVerifier测试响应式流
9. **监控响应式服务**：监控响应式服务的性能和吞吐量
10. **实现超时处理**：为响应式调用设置适当的超时时间
