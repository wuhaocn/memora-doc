package com.memora.manager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class KnowledgeBaseMemberItemDTO {
    @NotNull(message = "知识库成员 userId 不能为空")
    private Long userId;

    @NotBlank(message = "知识库成员角色不能为空")
    private String role;
}
