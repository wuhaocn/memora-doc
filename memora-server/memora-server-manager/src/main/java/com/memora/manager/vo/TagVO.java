package com.memora.manager.vo;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 标签视图对象
 */
@Data
public class TagVO {
    private Long id;
    
    private String name;
    
    private String description;
    
    private Long userId;
    
    private Integer status;
    
    private Integer resourceCount;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}