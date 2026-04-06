package com.memora.manager.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SyncJobVO {
    private Long id;

    private Long tenantId;

    private Long knowledgeBaseId;

    private String jobType;

    private String triggerType;

    private String localPath;

    private String status;

    private Integer scannedCount;

    private Integer changedCount;

    private String message;

    private LocalDateTime startedAt;

    private LocalDateTime finishedAt;

    private LocalDateTime createdAt;
}
