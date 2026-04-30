---
name: api-design
description: 设计符合规范的API，包括内部API和外部API，遵循开发流程和最佳实践
---

# api-design

## 描述
根据项目的API设计规范，设计符合要求的API，包括内部API和外部API。该技能将帮助开发者遵循统一的API设计原则，确保API的一致性、可靠性和可维护性。



### 最新API变化
- com-rcloud-model/com-rcloud-aiagent-model/http/dev/agents.http
- com-rcloud-model/com-rcloud-aiagent-model/http/dev/chat.http
- com-rcloud-model/com-rcloud-aiagent-model/http/dev/models.http
- com-rcloud-model/com-rcloud-aiagent-model/http/local/agents.http
- com-rcloud-model/com-rcloud-aiagent-model/http/local/chat.http
- com-rcloud-model/com-rcloud-aiagent-model/http/local/generate.http
- com-rcloud-model/com-rcloud-aiagent-model/http/local/messages.http
- com-rcloud-model/com-rcloud-aiagent-model/http/local/models.http
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/akka/AkkaActorUtils.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/akka/AkkaAdapter.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/akka/AkkaService.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/akka/AppClusterMapper.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/akka/SendMethod.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/code/HttpApiCode.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/code/api/ICode.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/configuration/ApolloRefreshConfiguration.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/configuration/ServerApiConfiguration.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/configuration/WebFluxServerConfig.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/constant/HttpHeader.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/container/FluxConfiguration.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/container/GlobalControllerExceptionHandler.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/controller/BaseController.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/controller/CheckController.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/exception/ServiceAPIError.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/exception/UnifyException.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/limit/DefaultLimit.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/limit/LimitModelContainer.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/limit/LimitProxy.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/limit/LimitResult.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/limit/LimitType.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/limit/LimitUtil.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/model/BaseResponse.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/model/ErrorResponse.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/model/RateLimitResponse.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/model/RequestContext.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/model/ResultWrapper.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/model/io/ValidateAble.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/spi/ExtendedAuthManager.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/spi/IExtendedAuthProvider.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/spi/impl/ExtendedAuthProviderNop.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/util/AppInfoDBCache.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/util/CheckParameterUtil.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/util/IpUtil.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/util/JacksonUtil.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/util/ParameterAsserts.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/util/PropertyValidator.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/util/RedisOperation.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/util/SpringContextHolder.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/util/TokenHelper.java
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
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/ChatbotController.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/ChatbotHttpAutoConfiguration.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/ChatbotIntegrationController.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/AgentConfig.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/AuthConfig.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/BaseChatbotInfo.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/BaseChatbotIntegration.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/ChatbotInfoDto.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/ChatbotInfoValidator.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/CreateChatbotInfoAPIReq.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/CreateChatbotIntegrationAPIReq.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/DeleteChatbotInfoAPIReq.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/DeleteChatbotIntegrationAPIReq.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/GetChatbotInfoAPIReq.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/GetChatbotInfoAPIResp.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/ListChatbotInfoAPIReq.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/ListChatbotInfoAPIResp.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/UpdateChatbotInfoAPIReq.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/model/UpdateChatbotIntegrationAPIReq.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/service/ChatbotIntegrationService.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/service/ChatbotService.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/service/ResponseHandlers.java
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
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/controller/ConvertMsgController.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/controller/GenerativeMessageController.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/controller/ImageController.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/controller/TTSController.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/controller/TranslationController.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/BaseConvertRequest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/BaseConvertResponse.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/CreateVoiceRequest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/CreateVoiceResponse.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/DeleteFileRequest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/DeleteVoiceRequest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/GenerationsImageRequest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/ImageParameters.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/ListVoiceRequest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/ListVoiceResponse.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/PublishMessageBase.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/PublishMessageResponse.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/PublishVoiceMessage.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/SpeechToTextRequest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/SpeechToTextResponse.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/TTSRequest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/TTSResponse.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/TextToImageResponse.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/TextTranslationRequest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/TextTranslationResponse.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/UpdateVoiceRequest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/model/Voice.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/service/ConvertMsgService.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/service/MessageService.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/service/TTSService.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/service/TextToImageService.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/service/TranslationService.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/strategy/BaseStrategy.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/strategy/ConvertHttpStrategy.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/strategy/ConvertStrategyHttpFactory.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/strategy/STTHttpStrategy.java
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
- com-rcloud-model/com-rcloud-file-model/com.rcloud.file.http/src/main/java/com/rcloud/http/file/config/FileProperties.java
- com-rcloud-model/com-rcloud-file-model/com.rcloud.file.http/src/main/java/com/rcloud/http/file/controller/FileController.java
- com-rcloud-model/com-rcloud-file-model/com.rcloud.file.http/src/main/java/com/rcloud/http/file/model/UploadResponse.java
- com-rcloud-model/com-rcloud-file-model/com.rcloud.file.http/src/main/java/com/rcloud/http/file/service/UploadService.java
- com-rcloud-model/com-rcloud-file-model/com.rcloud.file.http/src/test/java/com/rcloud/http/file/controller/FileControllerTest.java
- com-rcloud-model/com-rcloud-file-model/com.rcloud.file.http/src/test/java/com/rcloud/http/file/service/UploadServiceTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/main/java/com/rcloud/http/historymsg/controller/HistoryMsgController.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/main/java/com/rcloud/http/historymsg/controller/MessageSummaryController.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/main/java/com/rcloud/http/historymsg/entity/HistoryMsg.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/main/java/com/rcloud/http/historymsg/entity/HistoryMsgResponse.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/main/java/com/rcloud/http/historymsg/entity/MsgSummaryInput.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/main/java/com/rcloud/http/historymsg/entity/PublishStreamResponse.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/main/java/com/rcloud/http/historymsg/entity/QueryHistoryMsgInput.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/main/java/com/rcloud/http/historymsg/entity/SummarizeMessageInput.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/main/java/com/rcloud/http/historymsg/entity/SummarizeMessageResponse.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/main/java/com/rcloud/http/historymsg/service/HistoryMsgService.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/main/java/com/rcloud/http/historymsg/service/MessageSummaryService.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/test/java/com/rcloud/http/historymsg/BaseTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/test/java/com/rcloud/http/historymsg/HistoryHttpApplicationPlugin.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/test/java/com/rcloud/http/historymsg/HistoryHttpApplicationSimple.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/test/java/com/rcloud/http/historymsg/controller/HistoryMsgControllerTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/test/java/com/rcloud/http/historymsg/entity/QueryHistoryMsgInputTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/test/java/com/rcloud/http/historymsg/service/HistoryMsgServiceTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/HttpAutoConfiguration.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/ProxyChatController.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/model/PropertyValidator.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/model/ProxyChatInfo.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/model/ProxyChatQueryListRequest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/model/ProxyChatQueryListResponse.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/model/ProxyChatStartRequest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/model/ProxyChatStopRequest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/model/Validatable.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/service/ProxyChatService.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/service/akka/AkkaServiceWrapper.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/service/impl/CSMessageBuilder.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/service/impl/ProxyChatResponseHandler.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/service/impl/ProxyChatServiceImpl.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/ProxyChatControllerWebTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/TestApplication.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/model/ProxyChatInfoTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/model/ProxyChatQueryListRequestTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/model/ProxyChatQueryListResponseTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/model/ProxyChatStartRequestTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/model/ProxyChatStopRequestTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/test/java/com/rcloud/proxychat/http/service/impl/ProxyChatServiceImplTest.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/main/java/com/rcloud/http/relation/controller/RelationController.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/main/java/com/rcloud/http/relation/entity/RelationMsg.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/main/java/com/rcloud/http/relation/entity/RelationOut.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/main/java/com/rcloud/http/relation/entity/RelationQryParam.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/main/java/com/rcloud/http/relation/entity/RelationResponse.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/main/java/com/rcloud/http/relation/service/RelationService.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/test/java/com/rcloud/relation/http/RelationHttpApplicationSimple.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/test/java/com/rcloud/relation/http/controller/RelationControllerTest.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/test/java/com/rcloud/relation/http/service/RelationServiceTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/main/java/com/rcloud/http/stream/controller/StreamController.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/main/java/com/rcloud/http/stream/entity/PublishStreamResponse.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/main/java/com/rcloud/http/stream/entity/SSEChunk.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/main/java/com/rcloud/http/stream/entity/StreamMessage.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/main/java/com/rcloud/http/stream/service/AkkaStreamAdapter.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/main/java/com/rcloud/http/stream/service/StreamService.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/main/java/com/rcloud/http/stream/utils/JsonStreamUtil.java
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
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.internal.http/src/main/java/com/rcloud/template/internal/http/TemplateBuiltinController.java
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.internal.http/src/main/java/com/rcloud/template/internal/http/TemplateController.java
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.internal.http/src/main/java/com/rcloud/template/internal/http/autoconfigure/TemplateAutoConfiguration.java
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.internal.http/src/main/java/com/rcloud/template/internal/http/model/CreateTemplateRequest.java
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.internal.http/src/main/java/com/rcloud/template/internal/http/model/DeleteTemplateRequest.java
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.internal.http/src/main/java/com/rcloud/template/internal/http/model/GetTemplateRequest.java
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.internal.http/src/main/java/com/rcloud/template/internal/http/model/GetTemplateResponse.java
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.internal.http/src/main/java/com/rcloud/template/internal/http/model/QueryTemplateBuiltinResponse.java
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.internal.http/src/main/java/com/rcloud/template/internal/http/model/QueryTemplateRequest.java
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.internal.http/src/main/java/com/rcloud/template/internal/http/model/QueryTemplateResponse.java
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.internal.http/src/main/java/com/rcloud/template/internal/http/model/TemplateResponse.java
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.internal.http/src/main/java/com/rcloud/template/internal/http/model/UpdateTemplateRequest.java

### 最新控制器变化
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/controller/BaseController.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/main/java/com/rcloud/http/flux/starter/controller/CheckController.java
- com-rcloud-model/com-rcloud-boot-model/com.rcloud.http.flux.api.model/src/test/java/com/rcloud/http/flux/starter/controller/BaseControllerTest.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/ChatbotController.java
- com-rcloud-model/com-rcloud-chatbot-model/com.rcloud.chatbot.http/src/main/java/com/rcloud/http/chatbot/ChatbotIntegrationController.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/controller/ConvertMsgController.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/controller/GenerativeMessageController.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/controller/ImageController.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/controller/TTSController.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/main/java/com/rcloud/http/convert/controller/TranslationController.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/controller/ConvertMsgControllerErrorTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/controller/ConvertMsgControllerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/controller/GenerativeMessageControllerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/controller/ImageControllerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/controller/TTSControllerTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/controller/TTSControllerValidateErrorTest.java
- com-rcloud-model/com-rcloud-convert-model/com.rcloud.convert.http/src/test/java/com/rcloud/http/convert/controller/TranslationControllerTest.java
- com-rcloud-model/com-rcloud-file-model/com.rcloud.file.http/src/main/java/com/rcloud/http/file/controller/FileController.java
- com-rcloud-model/com-rcloud-file-model/com.rcloud.file.http/src/test/java/com/rcloud/http/file/controller/FileControllerTest.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/main/java/com/rcloud/http/historymsg/controller/HistoryMsgController.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/main/java/com/rcloud/http/historymsg/controller/MessageSummaryController.java
- com-rcloud-model/com-rcloud-historymsg-model/com.rcloud.historymsg.http/src/test/java/com/rcloud/http/historymsg/controller/HistoryMsgControllerTest.java
- com-rcloud-model/com-rcloud-proxychat-model/com.rcloud.proxychat.http/src/main/java/com/rcloud/proxychat/http/ProxyChatController.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/main/java/com/rcloud/http/relation/controller/RelationController.java
- com-rcloud-model/com-rcloud-relation-model/com.rcloud.relation.http/src/test/java/com/rcloud/relation/http/controller/RelationControllerTest.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/main/java/com/rcloud/http/stream/controller/StreamController.java
- com-rcloud-model/com-rcloud-stream-model/com.rcloud.stream.http/src/test/java/com/rcloud/http/stream/controller/StreamControllerTest.java
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.internal.http/src/main/java/com/rcloud/template/internal/http/TemplateBuiltinController.java
- com-rcloud-model/com-rcloud-template-model/com.rcloud.template.internal.http/src/main/java/com/rcloud/template/internal/http/TemplateController.java
- com-rcloud-quickmodel/com-rcloud-aidata-model/com.rcloud.log.http/src/main/java/com/rcloud/logdata/http/LogQueryController.java
- com-rcloud-quickmodel/com-rcloud-llm-model/com.rcloud.llm.http/src/main/java/com/rcloud/llm/http/controller/InternalChatController.java

更新时间: 2026-01-23T08:55:50.351Z

## 使用场景
当需要设计新的API时，包括内部系统间通信的API和暴露给外部客户端的API，使用此技能可以确保API设计符合项目规范。

## 指令
1. **识别API类型**：确定是内部API还是外部API
   - 内部API：用于系统内组件通信，基础路径为 `/v3/internal/agent/{module}`
   - 外部API：暴露给第三方客户端，基础路径为 `/v3/user/{module}`

2. **设计API路径**：
   - 遵循基础路径约定
   - 使用清晰的资源命名
   - 包含操作类型（如create、stop、query）
   - 文件后缀为 `.json`

3. **确定HTTP方法**：
   - 所有API使用POST方法
   - 根据操作类型设计请求/响应格式

4. **设计请求/响应格式**：
   - 内容类型为 `application/json`
   - 响应使用带有`code`、`message`和`data`字段的`BaseResponse`
   - 内部API使用NON_NULL响应策略

5. **设计认证机制**：
   - 内部API：使用系统级令牌认证
   - 外部API：使用API Key签名认证

6. **设计错误处理**：
   - 使用标准化错误码
   - 包含清晰的错误信息
   - 返回适当的HTTP状态码

7. **设计API模型**：
   - 创建请求/响应模型
   - 实现`Validatable`接口进行参数验证
   - 使用`PropertyValidator`进行参数校验

8. **设计数据库模型**：
   - 为API相关数据设计数据库表
   - 考虑索引优化
   - 设计适当的字段类型和约束

9. **生成API示例**：
   - 提供完整的请求/响应示例
   - 包含所有必要字段
   - 符合JSON格式规范

## 参数
- `api_type`: API类型，可选值为 `internal`（内部API）、`external`（外部API），必填
- `module_name`: 模块名称，如 `template`、`proxychat`，必填
- `api_operation`: API操作，如 `create`、`stop`、`query`，必填
- `resource_name`: 资源名称，如 `template`、`proxychat`，可选
- `request_fields`: 请求字段列表，格式为 `[{"name": "field1", "type": "string", "required": true, "description": "字段描述"}]`，必填
- `response_fields`: 响应字段列表，格式同上，必填
- `business_logic`: 业务逻辑描述，可选

## 示例

### 输入示例
```
调用 api-design skills，设计一个内部API，模块名称为 template，API操作为 create，资源名称为 template，请求字段包括 templateId（字符串，必填）、name（字符串，必填）、type（字符串，必填）、template（对象，必填），响应字段包括 code（整数）、message（字符串）
```

### 输出示例
```
# API设计规范

## 1. API基本信息

- **API类型**: 内部API
- **模块名称**: template
- **API路径**: /v3/internal/agent/template/create.json
- **HTTP方法**: POST
- **内容类型**: application/json
- **认证方式**: 系统级令牌

## 2. 请求格式

```json
{
  "templateId": "pt_public_summary_v1",
  "name": "公共摘要模板",
  "type": "prompt",
  "template": {
    "promptText": "请总结以下文本：{text}",
    "arguments": [
      {
        "name": "text",
        "description": "需要摘要的文本",
        "required": true
      }
    ]
  }
}
```

## 3. 响应格式

```json
{
  "code": 200,
  "message": "success"
}
```

## 4. 请求模型设计

```java
public class CreateTemplateRequest implements Validatable {
  
  @JsonProperty("templateId")
  private String templateId;
  
  @JsonProperty("name")
  private String name;
  
  @JsonProperty("type")
  private String type;
  
  @JsonProperty("template")
  private Template template;
  
  @Override
  public void validate() throws UnifyException {
    PropertyValidator.of(templateId, "templateId", null)
      .required()
      .isString()
      .notBlank()
      .maxLength(64);
    
    // 其他字段验证...
  }
  
  // Getters and setters...
}
```

## 5. 数据库表设计

```sql
CREATE TABLE `CC_Template` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `templateId` varchar(64) NOT NULL COMMENT '模板ID',
  `name` varchar(255) NOT NULL COMMENT '模板名称',
  `type` varchar(32) NOT NULL COMMENT '模板类型',
  `template` json NOT NULL COMMENT '模板内容',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_templateId` (`templateId`)
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='模板表';
```

## 6. 最佳实践

- 保持API简洁且聚焦
- 使用清晰的命名约定
- 实现适当的参数验证
- 提供详细的API文档
- 考虑API的可扩展性
```