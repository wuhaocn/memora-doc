package com.memora.manager.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TenantMemberVO {
    private Long id;

    private Long tenantId;

    private Long userId;

    private String displayName;

    private String role;

    private LocalDateTime joinedAt;

    private LocalDateTime lastActiveAt;
}
