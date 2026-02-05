package com.memora.manager.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.memora.manager.dto.ResourceCreateDTO;
import com.memora.manager.dto.ResourceUpdateDTO;
import com.memora.manager.entity.Resource;
import com.memora.manager.vo.ResourceVO;
import com.memora.manager.vo.TagVO;

import java.util.List;

/**
 * 资源服务接口
 */
public interface ResourceService extends IService<Resource> {
    /**
     * 创建资源
     */
    ResourceVO create(ResourceCreateDTO dto);
    
    /**
     * 更新资源
     */
    ResourceVO update(Long id, ResourceUpdateDTO dto);
    
    /**
     * 删除资源
     */
    void delete(Long id);
    
    /**
     * 获取资源详情
     */
    ResourceVO getById(Long id);
    
    /**
     * 分页获取资源列表
     */
    IPage<ResourceVO> list(Integer page, Integer size, String keyword, String type, Long tagId);
    
    /**
     * 按类型获取资源
     */
    List<ResourceVO> listByType(String type);
    
    /**
     * 搜索资源
     */
    IPage<ResourceVO> search(Integer page, Integer size, String keyword, String type, Long tagId);
    
    /**
     * 获取资源标签
     */
    List<TagVO> getResourceTags(Long resourceId);
    
    /**
     * 关联资源到文档
     */
    void associateWithDocument(Long resourceId, Long documentId);
}