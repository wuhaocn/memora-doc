package com.memora.manager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 创建标签DTO
 */
@Data
public class TagCreateDTO {
    @NotBlank(message = "标签名称不能为空")
    @Size(max = 100, message = "标签名称长度不能超过100个字符")
    private String name;
    
    @Size(max = 255, message = "标签描述长度不能超过255个字符")
    private String description;
    
    @NotNull(message = "用户ID不能为空")
    private Long userId;
}