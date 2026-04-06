package com.memora.manager.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("sync_job")
public class SyncJob {
    @TableId(type = IdType.AUTO)
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
