---
name: test-generation
description: 根据项目的测试规范生成单元测试和集成测试代码，确保测试覆盖率达到80%+
---

# test-generation

## 描述
根据项目的测试规范生成各种类型的测试代码，包括单元测试和集成测试。该技能将帮助开发者生成符合项目测试规范的测试代码，提高测试覆盖率，确保代码质量和可靠性。



### 最新测试变化
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.client/src/test/java/com/rcloud/aiagent/client/AIAgentClientTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.client/src/test/java/com/rcloud/aiagent/client/adapter/AkkaClientAdapterTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.client/src/test/java/com/rcloud/aiagent/client/adapter/AkkaClientStreamAdapterTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.client/src/test/java/com/rcloud/aiagent/client/service/ChatServiceTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.data/src/test/java/com/rcloud/aiagent/data/entity/AgentConfigDefaultsTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.data/src/test/java/com/rcloud/aiagent/data/entity/AgentConfigTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.data/src/test/java/com/rcloud/aiagent/data/util/SqlQueryBuilderTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/AgentControllerTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/AgentUserRestrictionControllerTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/AiAgentApplication.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/ChatControllerTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/MessageControllerTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/model/AgentConfigTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/model/AgentCreateRequestTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/model/AgentUpdateRequestTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/model/ChatGenerateRequestTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/model/HookConfigTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/model/ListMessageRequestTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/model/validator/ComparisonConditionValidatorTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/model/validator/HookConditionValidatorFactoryTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/model/validator/IntentDetectionConditionValidatorTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/model/validator/PropertyValidatorTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/model/validator/WebhookActionValidatorTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/service/impl/AgentChatServiceImplTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/service/impl/AgentServiceImplTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/service/impl/AgentUserRestrictionServiceImplTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/service/impl/handler/AgentResponseHandlerTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/service/impl/handler/AgentUserRestrictionResponseHandlerTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/service/impl/handler/ChatGenerateResponseHandlerTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/java/com/rcloud/aiagent/service/impl/handler/MessageResponseHandlerTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.http/src/test/resources/application.properties
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.service/src/test/java/com/rcloud/aiagent/GeminiTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.service/src/test/java/com/rcloud/aiagent/OpenAiTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.service/src/test/java/com/rcloud/aiagent/ProductReviewAnalysisExample.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.service/src/test/java/com/rcloud/aiagent/StructuredOutputExample.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.service/src/test/java/com/rcloud/aiagent/config/model/KnowledgeAgentExample.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.service/src/test/java/com/rcloud/aiagent/data/util/PromptFormatterTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.service/src/test/java/com/rcloud/aiagent/service/agent/mapper/AgentMapperTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.service/src/test/java/com/rcloud/aiagent/service/chat/advisor/ReviewValidatorTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.service/src/test/java/com/rcloud/aiagent/service/chat/hook/HookExecutorSimpleTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.service/src/test/java/com/rcloud/aiagent/service/chat/hook/HookRegistryTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.service/src/test/java/com/rcloud/aiagent/service/chat/hook/action/StopReplyActionExecutorTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.service/src/test/java/com/rcloud/aiagent/service/chat/hook/condition/ComparisonEvaluatorTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.service/src/test/java/com/rcloud/aiagent/service/chat/hook/condition/ConditionEvaluationExceptionTest.java
- com-rcloud-model/com-rcloud-aiagent-model/com.rcloud.aiagent.service/src/test/java/com/rcloud/aiagent/service/chat/hook/condition/ConditionOutcomeTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/BaseTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/GlobalControllerExceptionHandlerTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/HttpApplication.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/HttpApplicationPlugin.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/akka/AkkaAdapterTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/code/HttpApiCodeTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/constant/HttpHeaderTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/container/GlobalControllerExceptionHandlerTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/controller/BaseControllerTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/exception/UnifyExceptionTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/limit/DefaultLimitTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/limit/LimitUtilTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/util/CheckParameterUtilTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/util/IpUtilTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/util/JacksonUtilTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/util/ParameterAssertsTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/util/PropertyValidatorTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/util/TokenHelperTest.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/resources/application.yml
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.internal.api.model/src/test/resources/application.yml
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/test/java/com/rcloud/http/chatbot/ChatbotControllerWebTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/test/java/com/rcloud/http/chatbot/ChatbotHttpApplicationPlugin.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/test/java/com/rcloud/http/chatbot/ChatbotHttpApplicationSimple.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/test/java/com/rcloud/http/chatbot/ChatbotIntegrationControllerWebTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/test/java/com/rcloud/http/chatbot/MockUtil.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/test/java/com/rcloud/http/chatbot/model/ChatbotInfoValidatorTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/test/java/com/rcloud/http/chatbot/model/CreateChatbotInfoAPIReqTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/test/java/com/rcloud/http/chatbot/model/CreateChatbotIntegrationAPIReqTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/test/java/com/rcloud/http/chatbot/model/ListChatbotInfoAPIReqTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/test/java/com/rcloud/http/chatbot/model/UpdateChatbotInfoAPIReqTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/test/java/com/rcloud/http/chatbot/model/UpdateChatbotIntegrationAPIReqTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/test/java/com/rcloud/http/chatbot/service/ChatbotIntegrationServiceTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/test/java/com/rcloud/http/chatbot/service/ChatbotServiceTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/test/resources/application.yml
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.modedefine/src/test/java/com/rcloud/chatbot/MockUtil.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.modedefine/src/test/java/com/rcloud/chatbot/client/ChatbotGroupMessageTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.modedefine/src/test/java/com/rcloud/chatbot/client/ChatbotPrivateMessageTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.modedefine/src/test/java/com/rcloud/chatbot/client/internal/ChatbotClientImplTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.modedefine/src/test/java/com/rcloud/chatbot/model/EventDataUtilTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.modedefine/src/test/java/com/rcloud/chatbot/model/MessageContentParserTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/ChatbotServiceApplicationPlugin.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/ChatbotServiceApplicationSimple.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/MockUtil.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/common/aggregator/MessageAggregatorDemo.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/common/aggregator/MessageAggregatorTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/common/aggregator/TimeWindowBufferTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/common/delayed/DelayedSchedulerTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/common/delayed/DelimiterSplitterTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/common/delayed/JsonSplitStrategyTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/common/delayed/JsonSplitterTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/example/CozeRequestExample.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/example/SelfCozeRequestExample.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/management/actor/CreateChatbotInfoActorTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/management/actor/CreateChatbotIntegrationActorTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/management/actor/DeleteChatbotInfoActorTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/management/actor/DeleteChatbotIntegrationActorTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/management/actor/GetChatbotInfoActorTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/management/actor/ListChatbotInfoActorTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/management/actor/UpdateChatbotInfoActorTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/management/actor/UpdateChatbotIntegrationActorTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/management/mapper/ChatbotInfoMapperTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/management/mapper/ChatbotIntegrationMapperTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/management/service/ChatbotInfoServiceTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/management/service/ChatbotIntegrationServiceTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/actor/ChatbotMessageActorTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/actor/ProxyChatMessageActorTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/AbstractTextMessageIntegrationProviderTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/IntegrationProviderFactoryTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/NoopIntegrationAdapterTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/aiagent/AIAgentBlockingRequestHandlerTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/aiagent/AIAgentIntegrationAdapterTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/aiagent/AIAgentStreamCallbackTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/aiagent/AIAgentStreamingRequestHandlerTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/aiagent/ConversationKeyTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/aiagent/RequestBuilderTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/coze/ConversationKeyTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/coze/CozeBlockingRequestHandlerTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/coze/CozeClientProviderTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/coze/CozeConversationCacheTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/coze/CozeIntegrationAdapterTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/coze/CozeRequestBuilderTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/coze/CozeStreamingRequestHandlerTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/dify/ChatStreamMessageCallbackTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/dify/DifyBlockingRequestHandlerTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/dify/DifyClientProviderTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/dify/DifyIntegrationAdapterTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/dify/DifyStreamingRequestHandlerTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/dify/RequestBuilderTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/dify/conversation/ConversationKeyTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/dify/conversation/DifyConversationCacheTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/sharded/ChatCompletionHandlerTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/sharded/ChatMessageHandlerTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/sharded/ChatStreamingHandlerTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/sharded/MessageClientTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/sharded/MessageContentFactoryTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/sharded/MessageHelperTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/util/MessageHelperTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/webhook/RequestBuilderTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/integration/webhook/WebhookIntegrationAdapterTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/service/ChatbotMessageServiceTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/service/IntegrationFilterTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/service/ProxyChatMessageServiceTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/service/dispatcher/ChatbotMessageDispatcherTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/service/dispatcher/ImmediateTimer.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/service/dispatcher/ManualTimer.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/service/dispatcher/MessageAggregationHelperTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.service/src/test/java/com/rcloud/chatbot/service/message/service/dispatcher/ProxyChatMessageDispatcherTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/BaseTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/ConvertHttpApplicationPlugin.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/ConvertHttpApplicationSimple.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/controller/ConvertMsgControllerErrorTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/controller/ConvertMsgControllerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/controller/GenerativeMessageControllerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/controller/ImageControllerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/controller/TTSControllerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/controller/TTSControllerValidateErrorTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/controller/TranslationControllerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/model/CreateVoiceRequestTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/model/DeleteVoiceRequestTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/model/ListVoiceRequestTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/model/PublishMessageModelsTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/model/TTSRequestTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/model/UpdateVoiceRequestTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/service/ConvertMsgServiceTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/service/MessageServiceTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/service/TTSServiceTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/service/TextToImageServiceTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/strategy/ConvertStrategyHttpFactoryTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/strategy/STTHttpStrategyTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.img.service/src/test/java/com/rcloud/convert/img/service/adapter/impl/AlibabaCloudImageAdapterTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.img.service/src/test/java/com/rcloud/convert/img/service/manager/ImageProviderManagerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.mt.service/src/test/java/com/rcloud/convert/mt/service/adapter/TranslationProviderEnumTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.mt.service/src/test/java/com/rcloud/convert/mt/service/adapter/impl/AlibabaCloudMTAdapterImplTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.mt.service/src/test/java/com/rcloud/convert/mt/service/adapter/impl/AlibabaCloudQwenMtAdapterImplTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.mt.service/src/test/java/com/rcloud/convert/mt/service/config/TransPropertiesTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.mt.service/src/test/java/com/rcloud/convert/mt/service/demo/Trans2Test.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.mt.service/src/test/java/com/rcloud/convert/mt/service/demo/TransTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.mt.service/src/test/java/com/rcloud/convert/mt/service/manager/TextTranslationManagerEdgeTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.mt.service/src/test/java/com/rcloud/convert/mt/service/manager/TextTranslationManagerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.mt.service/src/test/java/com/rcloud/convert/mt/service/manager/TranslationLanguageTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.mt.service/src/test/java/com/rcloud/convert/mt/service/manager/TranslationProviderManagerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.mt.service/src/test/java/com/rcloud/convert/mt/service/manager/TranslationRateControlManagerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.mt.service/src/test/java/com/rcloud/convert/mt/service/manager/TranslationResultEventHelperTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.mt.service/src/test/java/com/rcloud/convert/mt/service/util/MonitorUtilTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.mt.service/src/test/java/com/rcloud/convert/mt/service/util/TranslationCacheUtilsTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/BaseTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/ConvertMockUtils.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/actor/PrivateGenerateMsgActorTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/actor/UpConvertMsgActorTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/actor/voice/CreateVoiceActorTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/actor/voice/DeleteVoiceActorTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/actor/voice/ListVoiceActorTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/actor/voice/UpdateVoiceActorTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/manager/PrivateMessageSenderTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/strategy/MessageProcessStrategyFactoryTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/strategy/TextToImageStrategyTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/strategy/TextToSpeechStrategyTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/tts/CosyVoiceTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/tts/VoiceEnrollmentSampleCodes.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/util/AliTokenUtilTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.service/src/test/java/com/rcloud/convert/service/util/AliVoiceUtilTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.tts.service/src/test/java/com/rcloud/convert/tts/service/adapter/impl/AlibabaCloudTTSAdapterTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.tts.service/src/test/java/com/rcloud/convert/tts/service/manager/MonitorClientManagerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.tts.service/src/test/java/com/rcloud/convert/tts/service/manager/TTSProviderManagerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.tts.service/src/test/java/com/rcloud/convert/tts/service/util/AudioDurationUtilEdgeTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.tts.service/src/test/java/com/rcloud/convert/tts/service/util/AudioDurationUtilMp3Test.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.tts.service/src/test/java/com/rcloud/convert/tts/service/util/AudioDurationUtilTest.java
- com-rcloud-model/com-rcloud-file-model/com.rcloud.file.http/src/test/java/com/rcloud/http/file/controller/FileControllerTest.java
- com-rcloud-model/com-rcloud-file-model/com.rcloud.file.http/src/test/java/com/rcloud/http/file/service/UploadServiceTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com-rcloud-historymsg-service/src/test/java/com/rcloud/service/historymsg/test/HBaseGroupMemeberSnapshotTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com-rcloud-historymsg-service/src/test/java/com/rcloud/service/historymsg/test/HBaseHistoryMsgTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com-rcloud-historymsg-service/src/test/java/com/rcloud/service/historymsg/test/HBaseMarkDelTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com-rcloud-historymsg-service/src/test/java/com/rcloud/service/historymsg/test/HBaseMsgExtTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com-rcloud-historymsg-service/src/test/java/com/rcloud/service/historymsg/test/HBaseMsgReadStateDemo.java
- com-rcloud-model/com-rcloud-historymsg-model/com-rcloud-historymsg-service/src/test/java/com/rcloud/service/historymsg/test/HBaseMsgReadStateTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com-rcloud-historymsg-service/src/test/java/com/rcloud/service/historymsg/test/HBaseUserMsgTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com-rcloud-historymsg-service/src/test/java/com/rcloud/service/historymsg/test/mock/MockUtil.java
- com-rcloud-model/com-rcloud-historymsg-model/com-rcloud-historymsg-service/src/test/java/com/rcloud/service/historymsg/test/util/HsitoryMsgUtilTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/test/java/com/rcloud/http/historymsg/BaseTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/test/java/com/rcloud/http/historymsg/HistoryHttpApplicationPlugin.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/test/java/com/rcloud/http/historymsg/HistoryHttpApplicationSimple.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/test/java/com/rcloud/http/historymsg/controller/HistoryMsgControllerTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/test/java/com/rcloud/http/historymsg/entity/QueryHistoryMsgInputTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/test/java/com/rcloud/http/historymsg/service/HistoryMsgServiceTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/test/resources/application.yml
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.data/src/test/java/com/rcloud/proxychat/entity/UserProxyChatTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/ProxyChatControllerWebTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/TestApplication.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/model/ProxyChatInfoTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/model/ProxyChatQueryListRequestTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/model/ProxyChatQueryListResponseTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/model/ProxyChatStartRequestTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/model/ProxyChatStopRequestTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/service/impl/ProxyChatServiceImplTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/resources/META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/resources/application.properties
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.service/src/test/java/com/rcloud/proxychat/actor/ProxyChatQueryActorTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.service/src/test/java/com/rcloud/proxychat/actor/ProxyChatStartActorTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.service/src/test/java/com/rcloud/proxychat/actor/ProxyChatStopActorTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.service/src/test/java/com/rcloud/proxychat/service/MockUtil.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.service/src/test/java/com/rcloud/proxychat/service/ProxyChatServiceTest.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/test/java/com/rcloud/relation/http/RelationHttpApplicationSimple.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/test/java/com/rcloud/relation/http/controller/RelationControllerTest.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/test/java/com/rcloud/relation/http/service/RelationServiceTest.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/test/resources/application.yml
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/test/http/Stream.http
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/test/java/com/rcloud/http/stream/BaseTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/test/java/com/rcloud/http/stream/StreamHttpApplicationPlugin.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/test/java/com/rcloud/http/stream/StreamHttpApplicationSimple.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/test/java/com/rcloud/http/stream/client/OkTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/test/java/com/rcloud/http/stream/client/SendAndPullTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/test/java/com/rcloud/http/stream/controller/StreamControllerTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/test/java/com/rcloud/http/stream/entity/StreamMessageTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/test/java/com/rcloud/http/stream/service/AkkaStreamAdapterTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/test/java/com/rcloud/http/stream/service/StreamServiceTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/test/resources/application.yml
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.modedefine/src/test/java/com/rcloud/message/gen/StreamInfoModulesTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/BaseTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/LoggerConfigurationUtils.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/StreamServiceApplicationPlugin.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/StreamServiceApplicationSimple.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/actor/GetStreamActorTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/actor/SendStreamActorTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/actor/StreamTCActorTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/hbase/StreamHbaseClientTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/manager/dispatch/StreamDispatchManagerTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/manager/message/AuditStreamManagerTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/manager/message/GroupMessageSenderTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/manager/message/PrivateMessageSenderTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/manager/message/PublishMessageSenderTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/manager/message/SendMessageManagerTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/manager/storage/ChunkStorageManagerTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/manager/storage/CompleteStreamStorageImplTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.service/src/test/java/com/rcloud/stream/service/util/SingleThreadUtilTest.java
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.service/src/test/java/com/rcloud/template/service/MockUtil.java
- com-rcloud-model/com.rcloud.ai.core/src/test/java/com/rcloud/ai/util/MapUtilsTest.java

更新时间: 2026-01-23T08:55:50.369Z

## 使用场景
当需要为控制器、服务、数据访问层、模型类等核心组件编写测试代码时，使用此技能可以确保生成的测试代码符合项目的测试规范和最佳实践。

## 指令
1. **识别测试类型**：确定需要生成的测试类型
   - 单元测试（Unit Test）
   - 集成测试（Integration Test）
   - 控制器测试（Controller Test）
   - 服务测试（Service Test）
   - 数据访问层测试（DAO/Repository Test）
   - 模型测试（Entity/Model Test）

2. **生成测试结构**：
   - 根据测试类型生成相应的测试类结构
   - 包含必要的注解和断言
   - 实现基础的测试用例

3. **使用测试框架**：
   - 使用JUnit 5进行测试
   - 使用Mockito进行依赖模拟
   - 使用MockMvc测试控制器端点

4. **测试覆盖**：
   - 测试正常流程
   - 测试边界条件
   - 测试异常情况
   - 确保测试覆盖率达到80%+

5. **测试数据准备**：
   - 准备测试数据
   - 使用模拟数据或测试数据库
   - 清理测试数据

6. **测试断言**：
   - 使用assertj或JUnit 5的断言
   - 验证返回结果的正确性
   - 验证方法调用次数

## 参数
- `test_type`: 测试类型，可选值为 `unit`、`integration`、`controller`、`service`、`dao`、`model`，必填
- `class_name`: 被测试类名，如 `TemplateController`，必填
- `package_name`: 被测试类的包名，如 `com.rcloud.template.internal.http`，必填
- `test_package`: 测试类的包名，如 `com.rcloud.template.internal.http`，可选，默认值为 `被测试类的包名`
- `dependencies`: 需要模拟的依赖列表，格式为 `["dependency1", "dependency2"]`，可选
- `test_cases`: 测试用例列表，格式为 `[{"name": "testCase1", "description": "测试用例描述", "method": "method1"}]`，可选
- `include_mockmvc`: 是否包含MockMvc测试，布尔值，可选，默认值为 `false`（仅控制器测试有效）
- `include_db_test`: 是否包含数据库测试，布尔值，可选，默认值为 `false`（仅数据访问层测试有效）

## 示例

### 输入示例
```
调用 test-generation skills，生成一个控制器单元测试，被测试类名为 TemplateController，包名为 com.rcloud.template.internal.http，需要模拟的依赖包括 templateService，测试用例包括 createTemplate、getTemplate、updateTemplate、deleteTemplate，包含MockMvc测试
```

### 输出示例
```java
package com.rcloud.template.internal.http;

import com.rcloud.http.flux.starter.model.BaseResponse;
import com.rcloud.template.service.TemplateService;
import com.rcloud.template.internal.http.model.CreateTemplateRequest;
import com.rcloud.template.internal.http.model.GetTemplateRequest;
import com.rcloud.template.internal.http.model.UpdateTemplateRequest;
import com.rcloud.template.internal.http.model.DeleteTemplateRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import reactor.core.publisher.Mono;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * 模板控制器测试
 */
class TemplateControllerTest {

    @Mock
    private TemplateService templateService;

    @InjectMocks
    private TemplateController templateController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(templateController).build();
    }

    /**
     * 测试创建模板
     */
    @Test
    void testCreateTemplate() throws Exception {
        // 准备测试数据
        String requestBody = "{\"templateId\": \"pt_test\", \"name\": \"测试模板\", \"type\": \"prompt\", \"template\": {\"promptText\": \"测试模板\", \"arguments\": []}}";
        
        // 模拟服务层响应
        when(templateService.createTemplate(any(CreateTemplateRequest.class), any())).thenReturn(Mono.just(BaseResponse.success()));
        
        // 执行测试
        mockMvc.perform(post("/v3/internal/agent/template/create.json")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.message").value("success"));
    }

    /**
     * 测试获取模板
     */
    @Test
    void testGetTemplate() throws Exception {
        // 准备测试数据
        String requestBody = "{\"templateId\": \"pt_test\"}";
        
        // 模拟服务层响应
        when(templateService.getTemplate(any(GetTemplateRequest.class), any())).thenReturn(Mono.just(BaseResponse.success()));
        
        // 执行测试
        mockMvc.perform(post("/v3/internal/agent/template/get.json")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.message").value("success"));
    }

    /**
     * 测试更新模板
     */
    @Test
    void testUpdateTemplate() throws Exception {
        // 准备测试数据
        String requestBody = "{\"templateId\": \"pt_test\", \"name\": \"测试模板\", \"type\": \"prompt\", \"template\": {\"promptText\": \"测试模板\", \"arguments\": []}}";
        
        // 模拟服务层响应
        when(templateService.updateTemplate(any(UpdateTemplateRequest.class), any())).thenReturn(Mono.just(BaseResponse.success()));
        
        // 执行测试
        mockMvc.perform(post("/v3/internal/agent/template/update.json")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.message").value("success"));
    }

    /**
     * 测试删除模板
     */
    @Test
    void testDeleteTemplate() throws Exception {
        // 准备测试数据
        String requestBody = "{\"templateId\": \"pt_test\"}";
        
        // 模拟服务层响应
        when(templateService.deleteTemplate(any(DeleteTemplateRequest.class), any())).thenReturn(Mono.just(BaseResponse.success()));
        
        // 执行测试
        mockMvc.perform(post("/v3/internal/agent/template/delete.json")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.message").value("success"));
    }
}
```

## 测试类型示例

### 1. 服务测试（Service Test）

```java
package com.rcloud.template.service;

import com.rcloud.http.flux.starter.model.BaseResponse;
import com.rcloud.http.flux.starter.model.RequestContext;
import com.rcloud.template.internal.http.model.CreateTemplateRequest;
import com.rcloud.template.internal.http.model.GetTemplateRequest;
import com.rcloud.template.internal.http.model.UpdateTemplateRequest;
import com.rcloud.template.internal.http.model.DeleteTemplateRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * 模板服务测试
 */
class TemplateServiceTest {

    @InjectMocks
    private TemplateService templateService;

    // @Mock
    // private TemplateDataImpl templateData;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * 测试创建模板
     */
    @Test
    void testCreateTemplate() {
        // 准备测试数据
        CreateTemplateRequest request = new CreateTemplateRequest();
        request.setTemplateId("pt_test");
        request.setName("测试模板");
        request.setType("prompt");
        
        // 执行测试
        Mono<BaseResponse> result = templateService.createTemplate(request, new RequestContext());
        
        // 验证结果
        assertNotNull(result);
        BaseResponse response = result.block();
        assertNotNull(response);
        assertEquals(200, response.getCode());
        assertEquals("success", response.getMessage());
    }

    // 其他测试方法...
}
```

### 2. 请求模型验证测试（DTO Validation Test）

```java
package com.rcloud.template.internal.http.model;

import com.rcloud.http.flux.starter.exception.UnifyException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * 创建模板请求验证测试
 */
class CreateTemplateRequestValidationTest {

    /**
     * 测试必填字段验证
     */
    @Test
    void testRequiredFieldsValidation() {
        // 准备测试数据
        CreateTemplateRequest request = new CreateTemplateRequest();
        
        // 验证必填字段
        assertThrows(UnifyException.class, request::validate);
        
        // 设置部分必填字段
        request.setTemplateId("pt_test");
        assertThrows(UnifyException.class, request::validate);
        
        // 设置所有必填字段
        request.setName("测试模板");
        request.setType("prompt");
        request.setTemplate(new Template());
        
        // 验证通过
        request.validate();
    }

    /**
     * 测试字段长度验证
     */
    @Test
    void testFieldLengthValidation() {
        // 准备测试数据
        CreateTemplateRequest request = new CreateTemplateRequest();
        
        // 设置超长字段
        String longString = "a".repeat(500);
        request.setTemplateId(longString);
        request.setName("测试模板");
        request.setType("prompt");
        request.setTemplate(new Template());
        
        // 验证失败
        assertThrows(UnifyException.class, request::validate);
    }
}
```

## 最佳实践

1. **测试覆盖**：确保测试覆盖率达到80%+，覆盖核心功能和边界情况
2. **测试隔离**：每个测试用例应该独立运行，不依赖其他测试用例
3. **模拟依赖**：使用Mockito等框架模拟外部依赖，避免测试之间的耦合
4. **测试命名**：使用清晰的测试方法名称，描述测试的目的和预期结果
5. **测试数据**：使用有意义的测试数据，便于理解和维护
6. **断言清晰**：使用明确的断言，验证预期结果
7. **测试性能**：避免长时间运行的测试，影响开发效率

## 后续步骤

1. 运行生成的测试代码，确保测试通过
2. 添加更多的测试用例，提高测试覆盖率
3. 针对复杂业务逻辑编写更详细的测试
4. 定期运行测试，确保代码质量
5. 在CI/CD流程中集成测试，自动验证代码变更

## 测试覆盖率要求

- 核心业务逻辑：100%
- 控制器端点：100%
- 服务层：80%+
- 数据访问层：80%+
- 模型类：80%+
- 请求/响应模型：100%（验证逻辑）
