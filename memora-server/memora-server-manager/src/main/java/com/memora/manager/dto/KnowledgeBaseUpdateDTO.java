package com.memora.manager.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 更新知识库DTO
 */
@Data
public class KnowledgeBaseUpdateDTO {
    @Size(max = 100, message = "知识库名称长度不能超过100个字符")
    private String name;

    @Size(max = 120, message = "知识库标识长度不能超过120个字符")
    private String slug;
    
    @Size(max = 500, message = "描述长度不能超过500个字符")
    private String description;
    
    private String cover;

    private String sourceType;

    private Integer syncEnabled;

    @Size(max = 500, message = "本地路径长度不能超过500个字符")
    private String localRootPath;

    private Integer isPublic;
}
