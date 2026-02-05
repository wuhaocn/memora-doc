package com.memora.manager.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 资源实体
 */
@Data
@TableName("resource")
public class Resource {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String name;
    
    private String description;
    
    private String type; // material, copywriting, prompt
    
    private String content;
    
    private String contentUrl;
    
    private String contentType;
    
    private Long userId;
    
    private Integer status; // 1:正常 0:删除
    
    private Integer isPublic; // 0:私有 1:公开
    
    private Integer viewCount;
    
    private Integer downloadCount;
    
    private Integer sortOrder;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}