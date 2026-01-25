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
    public Result<KnowledgeBaseVO> create(@Valid @RequestBody KnowledgeBaseCreateDTO dto) {
        // TODO: 从鉴权中获取userId，暂时使用DTO中的userId
        if (dto.getUserId() == null) {
            dto.setUserId(1L); // 临时默认值
        }
        KnowledgeBaseVO result = knowledgeBaseService.create(dto);
        return Result.success(result);
    }
    
    /**
     * 更新知识库
     */
    @PutMapping("/{id}")
    public Result<KnowledgeBaseVO> update(@PathVariable Long id, 
                                          @Valid @RequestBody KnowledgeBaseUpdateDTO dto) {
        KnowledgeBaseVO result = knowledgeBaseService.update(id, dto);
        return Result.success(result);
    }
    
    /**
     * 删除知识库
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        knowledgeBaseService.delete(id);
        return Result.success();
    }
    
    /**
     * 获取知识库详情
     */
    @GetMapping("/{id}")
    public Result<KnowledgeBaseVO> getById(@PathVariable Long id) {
        KnowledgeBaseVO result = knowledgeBaseService.getById(id);
        return Result.success(result);
    }
    
    /**
     * 分页查询知识库列表
     */
    @GetMapping
    public Result<IPage<KnowledgeBaseVO>> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long userId) {
        IPage<KnowledgeBaseVO> result = knowledgeBaseService.list(page, size, keyword, userId);
        return Result.success(result);
    }
    
    /**
     * 获取用户的知识库列表（不分页）
     */
    @GetMapping("/user/{userId}")
    public Result<List<KnowledgeBaseVO>> listByUserId(@PathVariable Long userId) {
        List<KnowledgeBaseVO> result = knowledgeBaseService.listByUserId(userId);
        return Result.success(result);
    }
    
    /**
     * 获取知识库下的文档列表
     */
    @GetMapping("/{id}/documents")
    public Result<Object> getDocuments(
            @PathVariable Long id,
            @RequestParam(required = false) Long parentId,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String keyword) {
        if (page != null && size != null) {
            // 分页查询
            IPage<DocumentVO> result = documentService.list(
                page, size, keyword, id, parentId, null);
            return Result.success(result);
        } else {
            // 不分页查询
            List<DocumentVO> list = documentService.listByKnowledgeBaseId(id, parentId);
            return Result.success(list);
        }
    }
}

