package com.memora.manager.vo;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 知识库视图对象
 */
@Data
public class KnowledgeBaseVO {
    private Long id;

    private Long tenantId;
    
    private String name;

    private String slug;
    
    private String description;
    
    private String cover;
    
    private Long userId;
    
    private Integer status;
    
    private Integer isPublic;

    private String sourceType;

    private Integer syncEnabled;

    private String localRootPath;

    private String syncStatus;
    
    private Integer documentCount;
    
    private Integer viewCount;
    
    private Integer sortOrder;

    private String currentRole;

    private Boolean canWrite;

    private Boolean canManage;

    private Boolean permissionRestricted;

    private LocalDateTime lastSyncAt;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
