package com.memora.manager.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.memora.common.result.Result;
import com.memora.manager.dto.KnowledgeBaseCreateDTO;
import com.memora.manager.dto.KnowledgeBaseUpdateDTO;
import com.memora.manager.service.DocumentService;
import com.memora.manager.service.KnowledgeBaseService;
import com.memora.manager.vo.DocumentVO;
import com.memora.manager.vo.KnowledgeBaseVO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

/**
 * 知识库控制器
 */
@RestController
@RequestMapping("/api/v1/knowledge-bases")
@RequiredArgsConstructor
public class KnowledgeBaseController {
    
    private final KnowledgeBaseService knowledgeBaseService;
    private final DocumentService documentService;
    
    /**
     * 创建知识库
     */
    @PostMapping
    public Mono<Result<KnowledgeBaseVO>> create(@Valid @RequestBody KnowledgeBaseCreateDTO dto) {
        // TODO: 从鉴权中获取userId，暂时使用DTO中的userId
        if (dto.getUserId() == null) {
            dto.setUserId(1L); // 临时默认值
        }
        return Mono.fromSupplier(() -> knowledgeBaseService.create(dto))
                .map(Result::success);
    }
    
    /**
     * 更新知识库
     */
    @PutMapping("/{id}")
    public Mono<Result<KnowledgeBaseVO>> update(@PathVariable Long id, 
                                          @Valid @RequestBody KnowledgeBaseUpdateDTO dto) {
        return Mono.fromSupplier(() -> knowledgeBaseService.update(id, dto))
                .map(Result::success);
    }
    
    /**
     * 删除知识库
     */
    @DeleteMapping("/{id}")
    public Mono<Result<Void>> delete(@PathVariable Long id) {
        return Mono.fromRunnable(() -> knowledgeBaseService.delete(id))
                .thenReturn(Result.success());
    }
    
    /**
     * 获取知识库详情
     */
    @GetMapping("/{id}")
    public Mono<Result<KnowledgeBaseVO>> getById(@PathVariable Long id) {
        return Mono.fromSupplier(() -> knowledgeBaseService.getById(id))
                .map(Result::success);
    }
    
    /**
     * 分页查询知识库列表
     */
    @GetMapping
    public Mono<Result<IPage<KnowledgeBaseVO>>> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long userId) {
        return Mono.fromSupplier(() -> knowledgeBaseService.list(page, size, keyword, userId))
                .map(Result::success);
    }
    
    /**
     * 获取用户的知识库列表（不分页）
     */
    @GetMapping("/user/{userId}")
    public Mono<Result<List<KnowledgeBaseVO>>> listByUserId(@PathVariable Long userId) {
        return Mono.fromSupplier(() -> knowledgeBaseService.listByUserId(userId))
                .map(Result::success);
    }
    
    /**
     * 获取知识库下的文档列表
     */
    @GetMapping("/{id}/documents")
    public Mono<Result<?>> getDocuments(
            @PathVariable Long id,
            @RequestParam(required = false) Long parentId,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String keyword) {
        return Mono.defer(() -> {
            if (page != null && size != null) {
                // 分页查询
                IPage<DocumentVO> result = documentService.list(
                    page, size, keyword, id, parentId, null);
                return Mono.just(Result.success(result));
            } else {
                // 不分页查询
                List<DocumentVO> list = documentService.listByKnowledgeBaseId(id, parentId);
                return Mono.just(Result.success(list));
            }
        });
    }
}

