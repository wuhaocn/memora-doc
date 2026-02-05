package com.memora.manager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.List;

/**
 * 更新资源DTO
 */
@Data
public class ResourceUpdateDTO {
    @NotBlank(message = "资源名称不能为空")
    @Size(max = 200, message = "资源名称长度不能超过200个字符")
    private String name;
    
    @Size(max = 500, message = "资源描述长度不能超过500个字符")
    private String description;
    
    private String content;
    
    private String contentUrl;
    
    private String contentType;
    
    private Integer isPublic; // 0:私有 1:公开
    
    private List<Long> tags; // 标签ID列表
}