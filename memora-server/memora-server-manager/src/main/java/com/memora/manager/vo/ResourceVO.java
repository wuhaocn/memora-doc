package com.memora.manager.vo;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 资源视图对象
 */
@Data
public class ResourceVO {
    private Long id;
    
    private String name;
    
    private String description;
    
    private String type; // material, copywriting, prompt
    
    private String content;
    
    private String contentUrl;
    
    private String contentType;
    
    private Long userId;
    
    private Integer status;
    
    private Integer isPublic;
    
    private Integer viewCount;
    
    private Integer downloadCount;
    
    private Integer sortOrder;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    private List<TagVO> tags; // 资源关联的标签
}