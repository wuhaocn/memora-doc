package com.memora.manager.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("knowledge_base_member")
public class KnowledgeBaseMember {
    @TableId(type = IdType.AUTO)
    private Long id;

    private Long knowledgeBaseId;

    private Long tenantId;

    private Long userId;

    private String role;

    private Integer status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
