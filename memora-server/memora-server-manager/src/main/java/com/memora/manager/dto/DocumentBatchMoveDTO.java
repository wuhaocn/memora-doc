package com.memora.manager.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class DocumentBatchMoveDTO {
    @NotEmpty(message = "批量移动的文档列表不能为空")
    private List<Long> documentIds;

    @NotNull(message = "目标父级不能为空")
    private Long parentId;
}
