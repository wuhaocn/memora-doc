package com.memora.manager.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 标签实体
 */
@Data
@TableName("tag")
public class Tag {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String name;
    
    private String description;
    
    private Long userId;
    
    private Integer status; // 1:正常 0:删除
    
    private Integer resourceCount;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}