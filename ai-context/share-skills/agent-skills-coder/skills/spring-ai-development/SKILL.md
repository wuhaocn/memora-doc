---
name: spring-ai-development
description: 用于Spring AI开发，包括模型集成、提示工程、AI组件开发等
---

# spring-ai-development

## 描述
用于Spring AI开发，包括模型集成、提示工程、AI组件开发等。该技能将帮助开发者遵循统一的Spring AI开发规范，确保AI服务的一致性、可靠性和可维护性。

## 使用场景
当需要开发AI服务、集成LLM模型、设计AI组件时，使用此技能可以确保开发符合项目规范和最佳实践。

## 指令
1. **模型集成**：
   - 集成各种LLM模型（OpenAI、Ollama等）
   - 配置模型参数和选项
   - 实现模型提供者接口

2. **提示工程**：
   - 设计和优化AI提示
   - 实现提示模板
   - 处理提示变量和参数

3. **AI组件开发**：
   - 开发AI服务组件
   - 实现AI推理逻辑
   - 处理AI响应

4. **Spring AI配置**：
   - 配置Spring AI应用上下文
   - 配置模型连接和认证
   - 配置AI服务参数

5. **错误处理**：
   - 处理模型调用异常
   - 实现重试机制
   - 返回标准化错误响应

## 参数
- `task_type`: 任务类型，可选值为 `model-integration`、`prompt-engineering`、`ai-component`、`configuration`，必填
- `model_type`: 模型类型，可选值为 `openai`、`ollama`、`vertexai` 等，当task_type为model-integration时必填
- `component_name`: 组件名称，如 `ChatModelProvider`，当task_type为ai-component时必填
- `prompt_template`: 提示模板，当task_type为prompt-engineering时必填
- `configuration`: 配置参数，格式为JSON字符串，当task_type为configuration时必填

## 示例

### 输入示例
```
调用 spring-ai-development 技能，集成OpenAI模型，实现ChatModelProvider组件，组件名称为OpenAiChatModelProvider
```

### 输出示例
```java
package com.rcloud.ai.llm.provider.openai;

import com.rcloud.ai.llm.model.ChatModelProvider;
import com.rcloud.ai.llm.model.ModelOptions;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.ai.openai.api.ResponseFormat;
import org.springframework.ai.openai.api.ResponseFormat.Type;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * OpenAI 聊天模型提供者实现
 */
@Component
public class OpenAiChatModelProvider implements ChatModelProvider {

    @Value("${spring.ai.openai.api-key}")
    private String apiKey;

    @Value("${spring.ai.openai.base-url:https://api.openai.com/v1}")
    private String baseUrl;

    @Override
    public String getModelType() {
        return "openai";
    }

    @Override
    public ChatModel createChatModel(ModelOptions options) {
        // 创建OpenAI API客户端
        OpenAiApi openAiApi = new OpenAiApi(baseUrl, apiKey);
        
        // 配置模型选项
        OpenAiChatOptions chatOptions = OpenAiChatOptions.builder()
                .withModel(options.getModelName())
                .withTemperature(options.getTemperature())
                .withMaxTokens(options.getMaxTokens())
                .withResponseFormat(new ResponseFormat(Type.JSON_OBJECT))
                .build();
        
        // 创建并返回聊天模型
        return new org.springframework.ai.openai.OpenAiChatModel(openAiApi, chatOptions);
    }
}
```

## 最佳实践

1. **遵循Spring AI规范**：使用Spring AI的标准接口和组件
2. **实现模型提供者接口**：统一模型集成方式
3. **使用提示模板**：提高提示的可维护性和复用性
4. **实现错误处理**：优雅处理模型调用异常
5. **使用配置中心**：集中管理模型配置
6. **实现监控**：监控AI模型调用性能和成功率
7. **实现缓存**：缓存频繁使用的提示和响应
8. **遵循安全最佳实践**：保护API密钥和敏感数据
