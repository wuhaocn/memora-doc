package com.memora.manager.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 资源标签关联实体
 */
@Data
@TableName("resource_tag")
public class ResourceTag {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private Long resourceId;
    
    private Long tagId;
    
    private LocalDateTime createdAt;
}