package com.memora.manager.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.support.SFunction;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.memora.common.exception.BusinessException;
import com.memora.common.result.Result;
import com.memora.manager.dto.DocumentCreateDTO;
import com.memora.manager.dto.DocumentSortDTO;
import com.memora.manager.dto.DocumentUpdateDTO;
import com.memora.manager.dto.SearchRequestDTO;
import com.memora.manager.entity.Document;
import com.memora.manager.entity.DocumentVersion;
import com.memora.manager.entity.KnowledgeBase;
import com.memora.manager.mapper.DocumentMapper;
import com.memora.manager.mapper.DocumentVersionMapper;
import com.memora.manager.mapper.KnowledgeBaseMapper;
import com.memora.manager.vo.DocumentVO;
import com.memora.manager.vo.DocumentVersionVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 文档服务
 */
@Service
@RequiredArgsConstructor
public class DocumentService extends ServiceImpl<DocumentMapper, Document> {
    
    private final DocumentMapper documentMapper;
    private final KnowledgeBaseMapper knowledgeBaseMapper;
    private final DocumentVersionMapper documentVersionMapper;
    
    /**
     * 创建文档
     */
    @Transactional(rollbackFor = Exception.class)
    public DocumentVO create(DocumentCreateDTO dto) {
        // 验证知识库是否存在
        KnowledgeBase knowledgeBase = knowledgeBaseMapper.selectById(dto.getKnowledgeBaseId());
        if (knowledgeBase == null || knowledgeBase.getStatus() == 0) {
            throw new BusinessException(404, "知识库不存在");
        }
        
        Document document = new Document();
        BeanUtils.copyProperties(dto, document);
        document.setStatus(1);
        document.setIsPublic(0);
        document.setViewCount(0);
        document.setSortOrder(0);
        if (document.getParentId() == null) {
            document.setParentId(0L);
        }
        document.setCreatedAt(LocalDateTime.now());
        document.setUpdatedAt(LocalDateTime.now());
        
        this.save(document);
        
        // 更新知识库文档数量
        knowledgeBaseMapper.incrementDocumentCount(dto.getKnowledgeBaseId());
        
        return convertToVO(document);
    }
    
    /**
     * 更新文档
     */
    @Transactional(rollbackFor = Exception.class)
    public DocumentVO update(Long id, DocumentUpdateDTO dto) {
        Document document = super.getById(id);
        if (document == null) {
            throw new BusinessException(404, "文档不存在");
        }
        if (document.getStatus() == 0) {
            throw new BusinessException(400, "文档已删除");
        }
        
        // 创建文档版本
        createDocumentVersion(document, "自动保存版本");
        
        if (StringUtils.hasText(dto.getTitle())) {
            document.setTitle(dto.getTitle());
        }
        if (dto.getContent() != null) {
            document.setContent(dto.getContent());
        }
        if (dto.getContentText() != null) {
            document.setContentText(dto.getContentText());
        }
        document.setUpdatedAt(LocalDateTime.now());
        
        this.updateById(document);
        
        return convertToVO(document);
    }
    
    /**
     * 创建文档版本
     */
    @Transactional(rollbackFor = Exception.class)
    public void createDocumentVersion(Document document, String remark) {
        Integer latestVersion = documentVersionMapper.getLatestVersion(document.getId());
        Integer newVersion = latestVersion == null ? 1 : latestVersion + 1;
        
        DocumentVersion version = new DocumentVersion();
        version.setDocumentId(document.getId());
        version.setVersion(newVersion);
        version.setTitle(document.getTitle());
        version.setContent(document.getContent());
        version.setContentText(document.getContentText());
        version.setUserId(document.getUserId());
        version.setRemark(remark);
        version.setCreatedAt(LocalDateTime.now());
        
        documentVersionMapper.insert(version);
    }
    
    /**
     * 获取文档版本列表
     */
    public List<DocumentVersionVO> getVersions(Long documentId) {
        LambdaQueryWrapper<DocumentVersion> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(DocumentVersion::getDocumentId, documentId)
            .orderByDesc(DocumentVersion::getVersion);
        
        List<DocumentVersion> versions = documentVersionMapper.selectList(queryWrapper);
        return versions.stream()
            .map(this::convertToVersionVO)
            .collect(Collectors.toList());
    }
    
    /**
     * 获取版本详情
     */
    public DocumentVersion getVersionById(Long versionId) {
        return documentVersionMapper.selectById(versionId);
    }
    
    /**
     * 回滚到指定版本
     */
    @Transactional(rollbackFor = Exception.class)
    public DocumentVO rollbackToVersion(Long documentId, Long versionId) {
        Document document = super.getById(documentId);
        if (document == null || document.getStatus() == 0) {
            throw new BusinessException(404, "文档不存在");
        }
        
        DocumentVersion version = documentVersionMapper.selectById(versionId);
        if (version == null || !version.getDocumentId().equals(documentId)) {
            throw new BusinessException(404, "版本不存在");
        }
        
        // 创建当前版本的快照
        createDocumentVersion(document, "回滚前版本");
        
        // 回滚到指定版本
        document.setTitle(version.getTitle());
        document.setContent(version.getContent());
        document.setContentText(version.getContentText());
        document.setUpdatedAt(LocalDateTime.now());
        
        this.updateById(document);
        
        return convertToVO(document);
    }
    
    /**
     * 删除文档（软删除）
     */
    @Transactional(rollbackFor = Exception.class)
    public void delete(Long id) {
        Document document = super.getById(id);
        if (document == null) {
            throw new BusinessException(404, "文档不存在");
        }
        
        document.setStatus(0);
        document.setUpdatedAt(LocalDateTime.now());
        this.updateById(document);
        
        // 更新知识库文档数量
        knowledgeBaseMapper.decrementDocumentCount(document.getKnowledgeBaseId());
    }
    
    /**
     * 根据ID获取文档
     */
    public DocumentVO getById(Long id) {
        Document document = super.getById(id);
        if (document == null || document.getStatus() == 0) {
            throw new BusinessException(404, "文档不存在");
        }
        return convertToVO(document);
    }
    
    /**
     * 分页查询文档列表
     */
    public IPage<DocumentVO> list(Integer page, Integer size, String keyword, Long knowledgeBaseId, Long parentId, Long userId) {
        Page<Document> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<Document> queryWrapper = new LambdaQueryWrapper<>();
        
        queryWrapper.eq(Document::getStatus, 1);
        
        if (knowledgeBaseId != null) {
            queryWrapper.eq(Document::getKnowledgeBaseId, knowledgeBaseId);
        }
        
        if (parentId != null) {
            queryWrapper.eq(Document::getParentId, parentId);
        }
        
        if (userId != null) {
            queryWrapper.eq(Document::getUserId, userId);
        }
        
        if (StringUtils.hasText(keyword)) {
            queryWrapper.and(wrapper -> wrapper
                .like(Document::getTitle, keyword)
                .or()
                .like(Document::getContentText, keyword)
            );
        }
        
        queryWrapper.orderByDesc(Document::getCreatedAt);
        
        IPage<Document> result = this.page(pageParam, queryWrapper);
        
        IPage<DocumentVO> voPage = new Page<>(result.getCurrent(), result.getSize(), result.getTotal());
        voPage.setRecords(result.getRecords().stream()
            .map(this::convertToVO)
            .collect(Collectors.toList()));
        
        return voPage;
    }
    
    /**
     * 高级搜索文档
     */
    public IPage<DocumentVO> advancedSearch(Integer page, Integer size, SearchRequestDTO searchRequest) {
        Page<Document> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<Document> queryWrapper = new LambdaQueryWrapper<>();
        
        queryWrapper.eq(Document::getStatus, 1);
        
        // 关键词搜索
        if (StringUtils.hasText(searchRequest.getKeyword())) {
            queryWrapper.and(wrapper -> wrapper
                .like(Document::getTitle, searchRequest.getKeyword())
                .or()
                .like(Document::getContentText, searchRequest.getKeyword())
            );
        }
        
        // 知识库ID
        if (searchRequest.getKnowledgeBaseId() != null) {
            queryWrapper.eq(Document::getKnowledgeBaseId, searchRequest.getKnowledgeBaseId());
        }
        
        // 父文档ID
        if (searchRequest.getParentId() != null) {
            queryWrapper.eq(Document::getParentId, searchRequest.getParentId());
        }
        
        // 用户ID
        if (searchRequest.getUserId() != null) {
            queryWrapper.eq(Document::getUserId, searchRequest.getUserId());
        }
        
        // 创建时间范围
        if (searchRequest.getStartCreatedAt() != null) {
            queryWrapper.ge(Document::getCreatedAt, searchRequest.getStartCreatedAt());
        }
        if (searchRequest.getEndCreatedAt() != null) {
            queryWrapper.le(Document::getCreatedAt, searchRequest.getEndCreatedAt());
        }
        
        // 更新时间范围
        if (searchRequest.getStartUpdatedAt() != null) {
            queryWrapper.ge(Document::getUpdatedAt, searchRequest.getStartUpdatedAt());
        }
        if (searchRequest.getEndUpdatedAt() != null) {
            queryWrapper.le(Document::getUpdatedAt, searchRequest.getEndUpdatedAt());
        }
        
        // 排序
        if (StringUtils.hasText(searchRequest.getOrderBy())) {
            if ("asc".equals(searchRequest.getOrderDirection())) {
                queryWrapper.orderByAsc(getOrderField(searchRequest.getOrderBy()));
            } else {
                queryWrapper.orderByDesc(getOrderField(searchRequest.getOrderBy()));
            }
        } else {
            queryWrapper.orderByDesc(Document::getUpdatedAt);
        }
        
        IPage<Document> result = this.page(pageParam, queryWrapper);
        
        IPage<DocumentVO> voPage = new Page<>(result.getCurrent(), result.getSize(), result.getTotal());
        voPage.setRecords(result.getRecords().stream()
            .map(this::convertToVO)
            .collect(Collectors.toList()));
        
        return voPage;
    }
    
    /**
     * 获取排序字段
     */
    private SFunction<Document, ?> getOrderField(String orderBy) {
        switch (orderBy) {
            case "createdAt":
                return Document::getCreatedAt;
            case "updatedAt":
                return Document::getUpdatedAt;
            case "title":
                return Document::getTitle;
            case "viewCount":
                return Document::getViewCount;
            default:
                return Document::getUpdatedAt;
        }
    }
    
    /**
     * 获取知识库下的文档列表（不分页）
     */
    public List<DocumentVO> listByKnowledgeBaseId(Long knowledgeBaseId, Long parentId) {
        LambdaQueryWrapper<Document> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Document::getKnowledgeBaseId, knowledgeBaseId)
            .eq(Document::getStatus, 1);
        
        if (parentId != null) {
            queryWrapper.eq(Document::getParentId, parentId);
        } else {
            queryWrapper.eq(Document::getParentId, 0);
        }
        
        queryWrapper.orderByAsc(Document::getSortOrder)
            .orderByDesc(Document::getCreatedAt);
        
        List<Document> list = this.list(queryWrapper);
        return list.stream()
            .map(this::convertToVO)
            .collect(Collectors.toList());
    }
    
    /**
     * 转换为VO
     */
    private DocumentVO convertToVO(Document document) {
        DocumentVO vo = new DocumentVO();
        BeanUtils.copyProperties(document, vo);
        return vo;
    }
    
    /**
     * 转换为版本VO
     */
    private DocumentVersionVO convertToVersionVO(DocumentVersion version) {
        DocumentVersionVO vo = new DocumentVersionVO();
        BeanUtils.copyProperties(version, vo);
        return vo;
    }
    
    /**
     * 更新文档排序
     */
    @Transactional(rollbackFor = Exception.class)
    public Result<Void> updateSortOrder(@RequestBody List<DocumentSortDTO> sortList) {
        for (DocumentSortDTO sortItem : sortList) {
            Document document = super.getById(sortItem.getId());
            if (document != null && document.getStatus() == 1) {
                document.setSortOrder(sortItem.getSortOrder());
                document.setUpdatedAt(LocalDateTime.now());
                this.updateById(document);
            }
        }
        return Result.success();
    }
}

