package com.memora.manager.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.memora.common.result.Result;
import com.memora.manager.dto.DocumentCreateDTO;
import com.memora.manager.dto.DocumentUpdateDTO;
import com.memora.manager.service.DocumentService;
import com.memora.manager.vo.DocumentVO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

/**
 * 文档控制器
 */
@RestController
@RequestMapping("/api/v1/documents")
@RequiredArgsConstructor
public class DocumentController {
    
    private final DocumentService documentService;
    
    /**
     * 创建文档
     */
    @PostMapping
    public Mono<Result<DocumentVO>> create(@Valid @RequestBody DocumentCreateDTO dto) {
        // TODO: 从鉴权中获取userId，暂时使用DTO中的userId
        if (dto.getUserId() == null) {
            dto.setUserId(1L); // 临时默认值
        }
        return Mono.fromSupplier(() -> documentService.create(dto))
                .map(Result::success);
    }
    
    /**
     * 更新文档
     */
    @PutMapping("/{id}")
    public Mono<Result<DocumentVO>> update(@PathVariable Long id, 
                                    @Valid @RequestBody DocumentUpdateDTO dto) {
        return Mono.fromSupplier(() -> documentService.update(id, dto))
                .map(Result::success);
    }
    
    /**
     * 删除文档
     */
    @DeleteMapping("/{id}")
    public Mono<Result<Void>> delete(@PathVariable Long id) {
        return Mono.fromRunnable(() -> documentService.delete(id))
                .thenReturn(Result.success());
    }
    
    /**
     * 获取文档详情
     */
    @GetMapping("/{id}")
    public Mono<Result<DocumentVO>> getById(@PathVariable Long id) {
        return Mono.fromSupplier(() -> documentService.getById(id))
                .map(Result::success);
    }
    
    /**
     * 分页查询文档列表
     */
    @GetMapping
    public Mono<Result<IPage<DocumentVO>>> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long knowledgeBaseId,
            @RequestParam(required = false) Long parentId,
            @RequestParam(required = false) Long userId) {
        return Mono.fromSupplier(() -> documentService.list(page, size, keyword, knowledgeBaseId, parentId, userId))
                .map(Result::success);
    }
    
    /**
     * 获取知识库下的文档列表（不分页）
     */
    @GetMapping("/knowledge-base/{knowledgeBaseId}")
    public Mono<Result<List<DocumentVO>>> listByKnowledgeBaseId(
            @PathVariable Long knowledgeBaseId,
            @RequestParam(required = false) Long parentId) {
        return Mono.fromSupplier(() -> documentService.listByKnowledgeBaseId(knowledgeBaseId, parentId))
                .map(Result::success);
    }
}

