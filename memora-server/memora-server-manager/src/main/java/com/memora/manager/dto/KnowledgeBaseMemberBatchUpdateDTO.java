package com.memora.manager.dto;

import jakarta.validation.Valid;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class KnowledgeBaseMemberBatchUpdateDTO {
    private List<@Valid KnowledgeBaseMemberItemDTO> members = new ArrayList<>();
}
