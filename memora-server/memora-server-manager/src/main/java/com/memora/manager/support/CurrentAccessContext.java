package com.memora.manager.support;

import com.memora.common.exception.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class CurrentAccessContext {
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String DEMO_TOKEN_PREFIX = "demo:";

    public Long getCurrentTenantId() {
        return requireAccessTokenPayload().tenantId();
    }

    public Long getCurrentUserId() {
        return requireAccessTokenPayload().userId();
    }

    public String buildDemoAccessToken(Long tenantId, Long userId) {
        return DEMO_TOKEN_PREFIX + tenantId + ":" + userId;
    }

    private AccessTokenPayload requireAccessTokenPayload() {
        AccessTokenPayload tokenPayload = resolveAccessTokenPayload();
        if (tokenPayload == null) {
            throw new BusinessException(401, "当前请求未携带有效会话");
        }
        return tokenPayload;
    }

    private AccessTokenPayload resolveAccessTokenPayload() {
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        if (!(attributes instanceof ServletRequestAttributes servletAttributes)) {
            return null;
        }

        HttpServletRequest request = servletAttributes.getRequest();
        String authorization = request.getHeader(AUTHORIZATION_HEADER);
        if (authorization == null || authorization.isBlank() || !authorization.startsWith(BEARER_PREFIX)) {
            return null;
        }

        String token = authorization.substring(BEARER_PREFIX.length()).trim();
        if (!token.startsWith(DEMO_TOKEN_PREFIX)) {
            return null;
        }

        String[] parts = token.substring(DEMO_TOKEN_PREFIX.length()).split(":");
        if (parts.length != 2) {
            return null;
        }

        try {
            return new AccessTokenPayload(Long.parseLong(parts[0]), Long.parseLong(parts[1]));
        } catch (NumberFormatException ex) {
            return null;
        }
    }

    private record AccessTokenPayload(Long tenantId, Long userId) {
    }
}
