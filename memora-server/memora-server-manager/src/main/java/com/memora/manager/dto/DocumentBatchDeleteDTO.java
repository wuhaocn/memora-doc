package com.memora.manager.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class DocumentBatchDeleteDTO {
    @NotEmpty(message = "批量删除的文档列表不能为空")
    private List<Long> documentIds;
}
