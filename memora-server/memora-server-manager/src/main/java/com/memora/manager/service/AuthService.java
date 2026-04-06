package com.memora.manager.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.memora.common.exception.BusinessException;
import com.memora.manager.dto.AuthLoginDTO;
import com.memora.manager.entity.Tenant;
import com.memora.manager.entity.TenantMember;
import com.memora.manager.mapper.TenantMapper;
import com.memora.manager.mapper.TenantMemberMapper;
import com.memora.manager.support.CurrentAccessContext;
import com.memora.manager.vo.AuthSessionVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
    private static final String DEMO_PASSWORD = "123456";
    private static final List<DemoAccount> DEMO_ACCOUNTS = List.of(
        new DemoAccount("admin", 1L, 1L),
        new DemoAccount("editor", 1L, 2L),
        new DemoAccount("reviewer", 1L, 3L),
        new DemoAccount("viewer", 1L, 4L)
    );

    private final TenantMapper tenantMapper;
    private final TenantMemberMapper tenantMemberMapper;
    private final CurrentAccessContext currentAccessContext;

    public AuthSessionVO login(AuthLoginDTO dto) {
        if (!DEMO_PASSWORD.equals(dto.getPassword())) {
            throw new BusinessException(401, "用户名或密码错误");
        }

        DemoAccount account = DEMO_ACCOUNTS.stream()
            .filter(item -> item.username().equalsIgnoreCase(dto.getUsername()))
            .findFirst()
            .orElseThrow(() -> new BusinessException(401, "用户名或密码错误"));

        return buildSession(account.tenantId(), account.userId(), account.username());
    }

    public AuthSessionVO getCurrentSession() {
        Long tenantId = currentAccessContext.getCurrentTenantId();
        Long userId = currentAccessContext.getCurrentUserId();
        String username = resolveUsername(userId);

        return buildSession(tenantId, userId, username);
    }

    private AuthSessionVO buildSession(Long tenantId, Long userId, String username) {
        if (tenantId == null || userId == null) {
            throw new BusinessException(401, "当前会话无效");
        }

        Tenant tenant = tenantMapper.selectById(tenantId);
        if (tenant == null || tenant.getStatus() == null || tenant.getStatus() == 0) {
            throw new BusinessException(404, "当前租户不存在");
        }

        LambdaQueryWrapper<TenantMember> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(TenantMember::getTenantId, tenantId)
            .eq(TenantMember::getUserId, userId)
            .eq(TenantMember::getStatus, 1)
            .last("LIMIT 1");
        TenantMember member = tenantMemberMapper.selectOne(queryWrapper);
        if (member == null) {
            throw new BusinessException(403, "当前用户不属于该租户");
        }

        AuthSessionVO session = new AuthSessionVO();
        session.setUsername(username != null ? username : "user-" + member.getUserId());
        session.setUserId(member.getUserId());
        session.setTenantId(member.getTenantId());
        session.setDisplayName(member.getDisplayName());
        session.setRole(member.getRole());
        session.setTenantName(tenant.getName());
        session.setTenantSlug(tenant.getSlug());
        session.setIndustry(tenant.getIndustry());
        session.setPlanName(tenant.getPlanName());
        session.setAccessToken(currentAccessContext.buildDemoAccessToken(member.getTenantId(), member.getUserId()));
        return session;
    }

    private String resolveUsername(Long userId) {
        return DEMO_ACCOUNTS.stream()
            .filter(item -> item.userId().equals(userId))
            .map(DemoAccount::username)
            .findFirst()
            .orElse("user-" + userId);
    }

    private record DemoAccount(String username, Long tenantId, Long userId) {
    }
}
