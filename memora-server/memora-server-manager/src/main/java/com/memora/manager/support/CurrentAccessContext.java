package com.memora.manager.support;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class CurrentAccessContext {
    private static final long FALLBACK_TENANT_ID = 1L;
    private static final long FALLBACK_USER_ID = 1L;
    private static final String TENANT_HEADER = "X-Tenant-Id";
    private static final String USER_HEADER = "X-User-Id";
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String DEMO_TOKEN_PREFIX = "demo:";

    public Long getCurrentTenantId() {
        AccessTokenPayload tokenPayload = resolveAccessTokenPayload();
        return tokenPayload != null ? tokenPayload.tenantId() : resolveLongHeader(TENANT_HEADER, FALLBACK_TENANT_ID);
    }

    public Long getCurrentUserId() {
        AccessTokenPayload tokenPayload = resolveAccessTokenPayload();
        return tokenPayload != null ? tokenPayload.userId() : resolveLongHeader(USER_HEADER, FALLBACK_USER_ID);
    }

    public String buildDemoAccessToken(Long tenantId, Long userId) {
        return DEMO_TOKEN_PREFIX + tenantId + ":" + userId;
    }

    private Long resolveLongHeader(String headerName, long fallbackValue) {
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        if (!(attributes instanceof ServletRequestAttributes servletAttributes)) {
            return fallbackValue;
        }

        HttpServletRequest request = servletAttributes.getRequest();
        String rawValue = request.getHeader(headerName);
        if (rawValue == null || rawValue.isBlank()) {
            return fallbackValue;
        }

        try {
            return Long.parseLong(rawValue);
        } catch (NumberFormatException ex) {
            return fallbackValue;
        }
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
