package com.memora.manager.dto;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 搜索请求DTO
 */
@Data
public class SearchRequestDTO {
    
    /**
     * 搜索关键词
     */
    private String keyword;
    
    /**
     * 知识库ID
     */
    private Long knowledgeBaseId;
    
    /**
     * 父文档ID
     */
    private Long parentId;
    
    /**
     * 用户ID
     */
    private Long userId;
    
    /**
     * 创建开始时间
     */
    private LocalDateTime startCreatedAt;
    
    /**
     * 创建结束时间
     */
    private LocalDateTime endCreatedAt;
    
    /**
     * 更新开始时间
     */
    private LocalDateTime startUpdatedAt;
    
    /**
     * 更新结束时间
     */
    private LocalDateTime endUpdatedAt;
    
    /**
     * 排序字段
     */
    private String orderBy;
    
    /**
     * 排序方向
     */
    private String orderDirection;
}
