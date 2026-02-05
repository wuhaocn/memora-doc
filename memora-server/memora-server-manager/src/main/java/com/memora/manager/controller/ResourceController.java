package com.memora.manager.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.memora.common.result.Result;
import com.memora.manager.dto.ResourceCreateDTO;
import com.memora.manager.dto.ResourceUpdateDTO;
import com.memora.manager.service.ResourceService;
import com.memora.manager.vo.ResourceVO;
import com.memora.manager.vo.TagVO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 资源控制器
 */
@RestController
@RequestMapping("/api/v1/resources")
@RequiredArgsConstructor
public class ResourceController {
    
    private final ResourceService resourceService;
    
    /**
     * 创建资源
     */
    @PostMapping
    public Result<ResourceVO> create(@Valid @RequestBody ResourceCreateDTO dto) {
        // TODO: 从鉴权中获取userId，暂时使用DTO中的userId
        if (dto.getUserId() == null) {
            dto.setUserId(1L); // 临时默认值
        }
        ResourceVO result = resourceService.create(dto);
        return Result.success(result);
    }
    
    /**
     * 更新资源
     */
    @PutMapping("/{id}")
    public Result<ResourceVO> update(@PathVariable Long id, 
                                    @Valid @RequestBody ResourceUpdateDTO dto) {
        ResourceVO result = resourceService.update(id, dto);
        return Result.success(result);
    }
    
    /**
     * 删除资源
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        resourceService.delete(id);
        return Result.success();
    }
    
    /**
     * 获取资源详情
     */
    @GetMapping("/{id}")
    public Result<ResourceVO> getById(@PathVariable Long id) {
        ResourceVO result = resourceService.getById(id);
        return Result.success(result);
    }
    
    /**
     * 分页获取资源列表
     */
    @GetMapping
    public Result<IPage<ResourceVO>> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Long tagId) {
        IPage<ResourceVO> result = resourceService.list(page, size, keyword, type, tagId);
        return Result.success(result);
    }
    
    /**
     * 按类型获取资源
     */
    @GetMapping("/type/{type}")
    public Result<List<ResourceVO>> listByType(@PathVariable String type) {
        List<ResourceVO> result = resourceService.listByType(type);
        return Result.success(result);
    }
    
    /**
     * 搜索资源
     */
    @GetMapping("/search")
    public Result<IPage<ResourceVO>> search(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Long tagId) {
        IPage<ResourceVO> result = resourceService.search(page, size, keyword, type, tagId);
        return Result.success(result);
    }
    
    /**
     * 获取资源标签
     */
    @GetMapping("/{id}/tags")
    public Result<List<TagVO>> getResourceTags(@PathVariable Long id) {
        List<TagVO> result = resourceService.getResourceTags(id);
        return Result.success(result);
    }
    
    /**
     * 关联资源到文档
     */
    @PostMapping("/{id}/associate/{documentId}")
    public Result<Void> associateWithDocument(@PathVariable Long id, 
                                             @PathVariable Long documentId) {
        resourceService.associateWithDocument(id, documentId);
        return Result.success();
    }
}