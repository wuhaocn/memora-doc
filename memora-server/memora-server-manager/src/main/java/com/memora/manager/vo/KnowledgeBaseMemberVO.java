package com.memora.manager.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class KnowledgeBaseMemberVO {
    private Long id;

    private Long knowledgeBaseId;

    private Long tenantId;

    private Long userId;

    private String displayName;

    private String role;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
