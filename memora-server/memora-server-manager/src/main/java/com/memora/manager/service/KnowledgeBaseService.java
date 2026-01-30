package com.memora.manager.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.memora.common.exception.BusinessException;
import com.memora.manager.dto.KnowledgeBaseCreateDTO;
import com.memora.manager.dto.KnowledgeBaseUpdateDTO;
import com.memora.manager.entity.KnowledgeBase;
import com.memora.manager.mapper.KnowledgeBaseMapper;
import com.memora.manager.vo.KnowledgeBaseStatsVO;
import com.memora.manager.vo.KnowledgeBaseVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 知识库服务
 */
@Service
@RequiredArgsConstructor
public class KnowledgeBaseService extends ServiceImpl<KnowledgeBaseMapper, KnowledgeBase> {
    
    private final KnowledgeBaseMapper knowledgeBaseMapper;
    
    /**
     * 创建知识库
     */
    @Transactional(rollbackFor = Exception.class)
    public KnowledgeBaseVO create(KnowledgeBaseCreateDTO dto) {
        KnowledgeBase knowledgeBase = new KnowledgeBase();
        BeanUtils.copyProperties(dto, knowledgeBase);
        knowledgeBase.setStatus(1);
        knowledgeBase.setIsPublic(0);
        knowledgeBase.setDocumentCount(0);
        knowledgeBase.setViewCount(0);
        knowledgeBase.setSortOrder(0);
        knowledgeBase.setCreatedAt(LocalDateTime.now());
        knowledgeBase.setUpdatedAt(LocalDateTime.now());
        
        this.save(knowledgeBase);
        
        return convertToVO(knowledgeBase);
    }
    
    /**
     * 更新知识库
     */
    @Transactional(rollbackFor = Exception.class)
    public KnowledgeBaseVO update(Long id, KnowledgeBaseUpdateDTO dto) {
        KnowledgeBase knowledgeBase = super.getById(id);
        if (knowledgeBase == null) {
            throw new BusinessException(404, "知识库不存在");
        }
        if (knowledgeBase.getStatus() == 0) {
            throw new BusinessException(400, "知识库已删除");
        }
        
        if (StringUtils.hasText(dto.getName())) {
            knowledgeBase.setName(dto.getName());
        }
        if (dto.getDescription() != null) {
            knowledgeBase.setDescription(dto.getDescription());
        }
        if (dto.getCover() != null) {
            knowledgeBase.setCover(dto.getCover());
        }
        knowledgeBase.setUpdatedAt(LocalDateTime.now());
        
        this.updateById(knowledgeBase);
        
        return convertToVO(knowledgeBase);
    }
    
    /**
     * 删除知识库（软删除）
     */
    @Transactional(rollbackFor = Exception.class)
    public void delete(Long id) {
        KnowledgeBase knowledgeBase = super.getById(id);
        if (knowledgeBase == null) {
            throw new BusinessException(404, "知识库不存在");
        }
        
        knowledgeBase.setStatus(0);
        knowledgeBase.setUpdatedAt(LocalDateTime.now());
        this.updateById(knowledgeBase);
    }
    
    /**
     * 根据ID获取知识库
     */
    public KnowledgeBaseVO getById(Long id) {
        KnowledgeBase knowledgeBase = super.getById(id);
        if (knowledgeBase == null || knowledgeBase.getStatus() == 0) {
            throw new BusinessException(404, "知识库不存在");
        }
        return convertToVO(knowledgeBase);
    }
    
    /**
     * 分页查询知识库列表
     */
    public IPage<KnowledgeBaseVO> list(Integer page, Integer size, String keyword, Long userId) {
        Page<KnowledgeBase> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<KnowledgeBase> queryWrapper = new LambdaQueryWrapper<>();
        
        queryWrapper.eq(KnowledgeBase::getStatus, 1);
        
        if (userId != null) {
            queryWrapper.eq(KnowledgeBase::getUserId, userId);
        }
        
        if (StringUtils.hasText(keyword)) {
            queryWrapper.and(wrapper -> wrapper
                .like(KnowledgeBase::getName, keyword)
                .or()
                .like(KnowledgeBase::getDescription, keyword)
            );
        }
        
        queryWrapper.orderByDesc(KnowledgeBase::getCreatedAt);
        
        IPage<KnowledgeBase> result = this.page(pageParam, queryWrapper);
        
        IPage<KnowledgeBaseVO> voPage = new Page<>(result.getCurrent(), result.getSize(), result.getTotal());
        voPage.setRecords(result.getRecords().stream()
            .map(this::convertToVO)
            .collect(Collectors.toList()));
        
        return voPage;
    }
    
    /**
     * 获取用户的知识库列表（不分页）
     */
    public List<KnowledgeBaseVO> listByUserId(Long userId) {
        LambdaQueryWrapper<KnowledgeBase> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(KnowledgeBase::getUserId, userId)
            .eq(KnowledgeBase::getStatus, 1)
            .orderByDesc(KnowledgeBase::getCreatedAt);
        
        List<KnowledgeBase> list = this.list(queryWrapper);
        return list.stream()
            .map(this::convertToVO)
            .collect(Collectors.toList());
    }
    
    /**
     * 转换为VO
     */
    private KnowledgeBaseVO convertToVO(KnowledgeBase knowledgeBase) {
        KnowledgeBaseVO vo = new KnowledgeBaseVO();
        BeanUtils.copyProperties(knowledgeBase, vo);
        return vo;
    }
    
    /**
     * 获取知识库统计信息
     */
    public KnowledgeBaseStatsVO getStats(Long userId) {
        KnowledgeBaseStatsVO statsVO = new KnowledgeBaseStatsVO();
        
        LambdaQueryWrapper<KnowledgeBase> baseQuery = new LambdaQueryWrapper<>();
        baseQuery.eq(KnowledgeBase::getStatus, 1);
        if (userId != null) {
            baseQuery.eq(KnowledgeBase::getUserId, userId);
        }
        
        // 总知识库数量
        long totalCount = this.count(baseQuery);
        statsVO.setTotalCount(totalCount);
        
        // 公开知识库数量
        long publicCount = this.count(baseQuery.clone().eq(KnowledgeBase::getIsPublic, 1));
        statsVO.setPublicCount(publicCount);
        
        // 私有知识库数量
        long privateCount = this.count(baseQuery.clone().eq(KnowledgeBase::getIsPublic, 0));
        statsVO.setPrivateCount(privateCount);
        
        // 总文档数量和总浏览次数
        List<KnowledgeBase> list = this.list(baseQuery);
        int totalDocumentCount = 0;
        int totalViewCount = 0;
        for (KnowledgeBase kb : list) {
            totalDocumentCount += kb.getDocumentCount();
            totalViewCount += kb.getViewCount();
        }
        statsVO.setTotalDocumentCount(totalDocumentCount);
        statsVO.setTotalViewCount(totalViewCount);
        
        // 最近7天创建的知识库数量
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        long recent7DaysCount = this.count(baseQuery.clone().ge(KnowledgeBase::getCreatedAt, sevenDaysAgo));
        statsVO.setRecent7DaysCount(recent7DaysCount);
        
        return statsVO;
    }
    
    /**
     * 生成知识库分享链接
     */
    @Transactional(rollbackFor = Exception.class)
    public String generateShareLink(Long id, Integer expireDays) {
        KnowledgeBase knowledgeBase = super.getById(id);
        if (knowledgeBase == null || knowledgeBase.getStatus() == 0) {
            throw new BusinessException(404, "知识库不存在");
        }
        
        // 生成分享token（这里简化实现，实际应该使用更安全的方式）
        String shareToken = "share_" + id + "_" + System.currentTimeMillis();
        
        // TODO: 存储分享信息到数据库
        // 这里可以创建一个分享记录，包含知识库ID、分享token、过期时间等信息
        
        // 构建分享链接
        String shareLink = "/shared/knowledge-base?token=" + shareToken;
        
        return shareLink;
    }
    
    /**
     * 根据分享token获取知识库
     */
    public KnowledgeBaseVO getByShareToken(String shareToken) {
        // TODO: 从数据库中查询分享记录
        // 验证token是否有效，是否过期
        
        // 简化实现：从token中提取知识库ID
        String[] parts = shareToken.split("_");
        if (parts.length < 3) {
            throw new BusinessException(400, "无效的分享链接");
        }
        
        Long id = Long.parseLong(parts[1]);
        KnowledgeBase knowledgeBase = super.getById(id);
        if (knowledgeBase == null || knowledgeBase.getStatus() == 0) {
            throw new BusinessException(404, "知识库不存在");
        }
        
        // 增加浏览次数
        knowledgeBase.setViewCount(knowledgeBase.getViewCount() + 1);
        this.updateById(knowledgeBase);
        
        return convertToVO(knowledgeBase);
    }
    
    /**
     * 设置知识库公开状态
     */
    @Transactional(rollbackFor = Exception.class)
    public KnowledgeBaseVO setPublicStatus(Long id, Integer isPublic) {
        KnowledgeBase knowledgeBase = super.getById(id);
        if (knowledgeBase == null || knowledgeBase.getStatus() == 0) {
            throw new BusinessException(404, "知识库不存在");
        }
        
        knowledgeBase.setIsPublic(isPublic);
        knowledgeBase.setUpdatedAt(LocalDateTime.now());
        this.updateById(knowledgeBase);
        
        return convertToVO(knowledgeBase);
    }
}

