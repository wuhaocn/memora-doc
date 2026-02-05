package com.memora.manager.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.memora.common.exception.BusinessException;
import com.memora.manager.dto.ResourceCreateDTO;
import com.memora.manager.dto.ResourceUpdateDTO;
import com.memora.manager.entity.Resource;
import com.memora.manager.entity.ResourceTag;
import com.memora.manager.entity.Tag;
import com.memora.manager.mapper.ResourceMapper;
import com.memora.manager.mapper.ResourceTagMapper;
import com.memora.manager.mapper.TagMapper;
import com.memora.manager.service.ResourceService;
import com.memora.manager.vo.ResourceVO;
import com.memora.manager.vo.TagVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 资源服务实现
 */
@Service
@RequiredArgsConstructor
public class ResourceServiceImpl extends ServiceImpl<ResourceMapper, Resource> implements ResourceService {
    
    private final ResourceMapper resourceMapper;
    private final TagMapper tagMapper;
    private final ResourceTagMapper resourceTagMapper;
    
    /**
     * 创建资源
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public ResourceVO create(ResourceCreateDTO dto) {
        Resource resource = new Resource();
        BeanUtils.copyProperties(dto, resource);
        resource.setStatus(1);
        resource.setViewCount(0);
        resource.setDownloadCount(0);
        resource.setSortOrder(0);
        resource.setCreatedAt(LocalDateTime.now());
        resource.setUpdatedAt(LocalDateTime.now());
        
        this.save(resource);
        
        // 处理标签关联
        if (dto.getTags() != null && !dto.getTags().isEmpty()) {
            saveResourceTags(resource.getId(), dto.getTags());
        }
        
        return convertToVO(resource);
    }
    
    /**
     * 更新资源
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public ResourceVO update(Long id, ResourceUpdateDTO dto) {
        Resource resource = super.getById(id);
        if (resource == null || resource.getStatus() == 0) {
            throw new BusinessException(404, "资源不存在");
        }
        
        BeanUtils.copyProperties(dto, resource);
        resource.setUpdatedAt(LocalDateTime.now());
        this.updateById(resource);
        
        // 先删除旧的标签关联，再添加新的
        LambdaQueryWrapper<ResourceTag> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(ResourceTag::getResourceId, id);
        resourceTagMapper.delete(queryWrapper);
        
        if (dto.getTags() != null && !dto.getTags().isEmpty()) {
            saveResourceTags(id, dto.getTags());
        }
        
        return convertToVO(resource);
    }
    
    /**
     * 删除资源
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void delete(Long id) {
        Resource resource = super.getById(id);
        if (resource == null) {
            throw new BusinessException(404, "资源不存在");
        }
        
        resource.setStatus(0);
        resource.setUpdatedAt(LocalDateTime.now());
        this.updateById(resource);
        
        // 删除标签关联
        LambdaQueryWrapper<ResourceTag> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(ResourceTag::getResourceId, id);
        resourceTagMapper.delete(queryWrapper);
    }
    
    /**
     * 获取资源详情
     */
    @Override
    public ResourceVO getById(Long id) {
        Resource resource = super.getById(id);
        if (resource == null || resource.getStatus() == 0) {
            throw new BusinessException(404, "资源不存在");
        }
        return convertToVO(resource);
    }
    
    /**
     * 分页获取资源列表
     */
    @Override
    public IPage<ResourceVO> list(Integer page, Integer size, String keyword, String type, Long tagId) {
        Page<Resource> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<Resource> queryWrapper = new LambdaQueryWrapper<>();
        
        queryWrapper.eq(Resource::getStatus, 1);
        
        if (StringUtils.hasText(type)) {
            queryWrapper.eq(Resource::getType, type);
        }
        
        if (StringUtils.hasText(keyword)) {
            queryWrapper.and(wrapper -> wrapper
                .like(Resource::getName, keyword)
                .or()
                .like(Resource::getDescription, keyword)
            );
        }
        
        queryWrapper.orderByDesc(Resource::getCreatedAt);
        
        IPage<Resource> result = this.page(pageParam, queryWrapper);
        
        IPage<ResourceVO> voPage = new Page<>(result.getCurrent(), result.getSize(), result.getTotal());
        voPage.setRecords(result.getRecords().stream()
            .map(this::convertToVO)
            .collect(Collectors.toList()));
        
        return voPage;
    }
    
    /**
     * 按类型获取资源
     */
    @Override
    public List<ResourceVO> listByType(String type) {
        LambdaQueryWrapper<Resource> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Resource::getStatus, 1)
            .eq(Resource::getType, type)
            .orderByDesc(Resource::getCreatedAt);
        
        List<Resource> list = this.list(queryWrapper);
        return list.stream()
            .map(this::convertToVO)
            .collect(Collectors.toList());
    }
    
    /**
     * 搜索资源
     */
    @Override
    public IPage<ResourceVO> search(Integer page, Integer size, String keyword, String type, Long tagId) {
        Page<Resource> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<Resource> queryWrapper = new LambdaQueryWrapper<>();
        
        queryWrapper.eq(Resource::getStatus, 1);
        
        if (StringUtils.hasText(type)) {
            queryWrapper.eq(Resource::getType, type);
        }
        
        if (StringUtils.hasText(keyword)) {
            queryWrapper.and(wrapper -> wrapper
                .like(Resource::getName, keyword)
                .or()
                .like(Resource::getDescription, keyword)
            );
        }
        
        queryWrapper.orderByDesc(Resource::getCreatedAt);
        
        IPage<Resource> result = this.page(pageParam, queryWrapper);
        
        IPage<ResourceVO> voPage = new Page<>(result.getCurrent(), result.getSize(), result.getTotal());
        voPage.setRecords(result.getRecords().stream()
            .map(this::convertToVO)
            .collect(Collectors.toList()));
        
        return voPage;
    }
    
    /**
     * 获取资源标签
     */
    @Override
    public List<TagVO> getResourceTags(Long resourceId) {
        LambdaQueryWrapper<ResourceTag> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(ResourceTag::getResourceId, resourceId);
        
        List<ResourceTag> resourceTags = resourceTagMapper.selectList(queryWrapper);
        if (resourceTags.isEmpty()) {
            return new ArrayList<>();
        }
        
        List<Long> tagIds = resourceTags.stream()
            .map(ResourceTag::getTagId)
            .collect(Collectors.toList());
        
        LambdaQueryWrapper<Tag> tagQueryWrapper = new LambdaQueryWrapper<>();
        tagQueryWrapper.in(Tag::getId, tagIds)
            .eq(Tag::getStatus, 1);
        
        List<Tag> tags = tagMapper.selectList(tagQueryWrapper);
        return tags.stream()
            .map(this::convertToTagVO)
            .collect(Collectors.toList());
    }
    
    /**
     * 关联资源到文档
     */
    @Override
    public void associateWithDocument(Long resourceId, Long documentId) {
        // 这里可以实现资源使用记录的创建
        // 暂时留空，后续可以添加resource_usage表的操作
    }
    
    /**
     * 保存资源标签关联
     */
    @Transactional(rollbackFor = Exception.class)
    private void saveResourceTags(Long resourceId, List<Long> tagIds) {
        for (Long tagId : tagIds) {
            // 验证标签是否存在
            Tag tag = tagMapper.selectById(tagId);
            if (tag != null && tag.getStatus() == 1) {
                ResourceTag resourceTag = new ResourceTag();
                resourceTag.setResourceId(resourceId);
                resourceTag.setTagId(tagId);
                resourceTag.setCreatedAt(LocalDateTime.now());
                resourceTagMapper.insert(resourceTag);
                
                // 更新标签的资源计数
                tag.setResourceCount(tag.getResourceCount() + 1);
                tagMapper.updateById(tag);
            }
        }
    }
    
    /**
     * 转换为资源VO
     */
    private ResourceVO convertToVO(Resource resource) {
        ResourceVO vo = new ResourceVO();
        BeanUtils.copyProperties(resource, vo);
        
        // 添加标签信息
        List<TagVO> tags = getResourceTags(resource.getId());
        vo.setTags(tags);
        
        return vo;
    }
    
    /**
     * 转换为标签VO
     */
    private TagVO convertToTagVO(Tag tag) {
        TagVO vo = new TagVO();
        BeanUtils.copyProperties(tag, vo);
        return vo;
    }
}