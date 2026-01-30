package com.memora.manager.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.memora.common.result.Result;
import com.memora.manager.dto.DocumentCreateDTO;
import com.memora.manager.dto.DocumentSortDTO;
import com.memora.manager.dto.DocumentUpdateDTO;
import com.memora.manager.dto.SearchRequestDTO;
import com.memora.manager.entity.DocumentVersion;
import com.memora.manager.service.DocumentService;
import com.memora.manager.vo.DocumentVO;
import com.memora.manager.vo.DocumentVersionVO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public Result<DocumentVO> create(@Valid @RequestBody DocumentCreateDTO dto) {
        // TODO: 从鉴权中获取userId，暂时使用DTO中的userId
        if (dto.getUserId() == null) {
            dto.setUserId(1L); // 临时默认值
        }
        DocumentVO result = documentService.create(dto);
        return Result.success(result);
    }
    
    /**
     * 更新文档
     */
    @PutMapping("/{id}")
    public Result<DocumentVO> update(@PathVariable Long id, 
                                    @Valid @RequestBody DocumentUpdateDTO dto) {
        DocumentVO result = documentService.update(id, dto);
        return Result.success(result);
    }
    
    /**
     * 删除文档
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        documentService.delete(id);
        return Result.success();
    }
    
    /**
     * 获取文档详情
     */
    @GetMapping("/{id}")
    public Result<DocumentVO> getById(@PathVariable Long id) {
        DocumentVO result = documentService.getById(id);
        return Result.success(result);
    }
    
    /**
     * 分页查询文档列表
     */
    @GetMapping
    public Result<IPage<DocumentVO>> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long knowledgeBaseId,
            @RequestParam(required = false) Long parentId,
            @RequestParam(required = false) Long userId) {
        IPage<DocumentVO> result = documentService.list(page, size, keyword, knowledgeBaseId, parentId, userId);
        return Result.success(result);
    }
    
    /**
     * 获取知识库下的文档列表（不分页）
     */
    @GetMapping("/knowledge-base/{knowledgeBaseId}")
    public Result<List<DocumentVO>> listByKnowledgeBaseId(
            @PathVariable Long knowledgeBaseId,
            @RequestParam(required = false) Long parentId) {
        List<DocumentVO> result = documentService.listByKnowledgeBaseId(knowledgeBaseId, parentId);
        return Result.success(result);
    }
    
    /**
     * 更新文档排序
     */
    @PutMapping("/sort")
    public Result<Void> updateSortOrder(@RequestBody List<DocumentSortDTO> sortList) {
        return documentService.updateSortOrder(sortList);
    }
    
    /**
     * 获取文档版本列表
     */
    @GetMapping("/{id}/versions")
    public Result<List<DocumentVersionVO>> getVersions(@PathVariable Long id) {
        List<DocumentVersionVO> result = documentService.getVersions(id);
        return Result.success(result);
    }
    
    /**
     * 获取版本详情
     */
    @GetMapping("/versions/{versionId}")
    public Result<DocumentVersion> getVersionById(@PathVariable Long versionId) {
        DocumentVersion result = documentService.getVersionById(versionId);
        return Result.success(result);
    }
    
    /**
     * 回滚到指定版本
     */
    @PostMapping("/{id}/rollback/{versionId}")
    public Result<DocumentVO> rollbackToVersion(@PathVariable Long id, @PathVariable Long versionId) {
        DocumentVO result = documentService.rollbackToVersion(id, versionId);
        return Result.success(result);
    }
    
    /**
     * 高级搜索文档
     */
    @PostMapping("/search")
    public Result<IPage<DocumentVO>> advancedSearch(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestBody SearchRequestDTO searchRequest) {
        IPage<DocumentVO> result = documentService.advancedSearch(page, size, searchRequest);
        return Result.success(result);
    }
}

