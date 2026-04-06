package com.memora.manager.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.memora.common.exception.BusinessException;
import com.memora.manager.entity.KnowledgeBase;
import com.memora.manager.entity.SyncJob;
import com.memora.manager.mapper.KnowledgeBaseMapper;
import com.memora.manager.mapper.SyncJobMapper;
import com.memora.manager.support.CurrentAccessContext;
import com.memora.manager.support.TenantAccessService;
import com.memora.manager.vo.SyncJobVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SyncJobService extends ServiceImpl<SyncJobMapper, SyncJob> {
    private final SyncJobMapper syncJobMapper;
    private final KnowledgeBaseMapper knowledgeBaseMapper;
    private final DocumentService documentService;
    private final CurrentAccessContext currentAccessContext;
    private final TenantAccessService tenantAccessService;

    public List<SyncJobVO> listByKnowledgeBaseId(Long knowledgeBaseId) {
        KnowledgeBase knowledgeBase = getAccessibleKnowledgeBase(knowledgeBaseId);
        tenantAccessService.requireKnowledgeBaseReadAccess(knowledgeBase);
        LambdaQueryWrapper<SyncJob> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SyncJob::getKnowledgeBaseId, knowledgeBase.getId())
            .orderByDesc(SyncJob::getCreatedAt);
        return this.list(queryWrapper).stream().map(this::convertToVO).collect(Collectors.toList());
    }

    public List<SyncJobVO> listRecentByTenantId(Long tenantId, int limit) {
        LambdaQueryWrapper<SyncJob> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SyncJob::getTenantId, tenantId)
            .orderByDesc(SyncJob::getCreatedAt)
            .last("LIMIT " + limit);
        return this.list(queryWrapper).stream().map(this::convertToVO).collect(Collectors.toList());
    }

    @Transactional(rollbackFor = Exception.class)
    public SyncJobVO triggerKnowledgeBaseSync(Long knowledgeBaseId) {
        KnowledgeBase knowledgeBase = getAccessibleKnowledgeBase(knowledgeBaseId);
        tenantAccessService.requireKnowledgeBaseWriteAccess(knowledgeBase);
        if (knowledgeBase.getSyncEnabled() == null || knowledgeBase.getSyncEnabled() == 0) {
            throw new BusinessException(400, "该知识库未开启本地同步");
        }

        int changedCount = documentService.markLocalSyncDocumentsAsSynced(knowledgeBaseId);
        int scannedCount = (int) documentService.countActiveDocumentsByKnowledgeBaseId(knowledgeBaseId);

        SyncJob syncJob = new SyncJob();
        syncJob.setTenantId(knowledgeBase.getTenantId());
        syncJob.setKnowledgeBaseId(knowledgeBaseId);
        syncJob.setJobType("LOCAL_SCAN");
        syncJob.setTriggerType("MANUAL");
        syncJob.setLocalPath(knowledgeBase.getLocalRootPath());
        syncJob.setStatus("SUCCESS");
        syncJob.setScannedCount(scannedCount);
        syncJob.setChangedCount(changedCount);
        syncJob.setMessage(changedCount > 0 ? "本地目录已重新扫描，变更已经登记为线上最新版本。" : "已完成扫描，当前没有新增差异。");
        syncJob.setStartedAt(LocalDateTime.now());
        syncJob.setFinishedAt(LocalDateTime.now());
        syncJob.setCreatedAt(LocalDateTime.now());
        syncJobMapper.insert(syncJob);

        knowledgeBase.setSyncStatus("SYNCED");
        knowledgeBase.setLastSyncAt(LocalDateTime.now());
        knowledgeBase.setUpdatedAt(LocalDateTime.now());
        knowledgeBaseMapper.updateById(knowledgeBase);
        return convertToVO(syncJob);
    }

    private KnowledgeBase getAccessibleKnowledgeBase(Long knowledgeBaseId) {
        KnowledgeBase knowledgeBase = knowledgeBaseMapper.selectById(knowledgeBaseId);
        if (knowledgeBase == null || knowledgeBase.getStatus() == null || knowledgeBase.getStatus() == 0) {
            throw new BusinessException(404, "知识库不存在");
        }
        if (!knowledgeBase.getTenantId().equals(currentAccessContext.getCurrentTenantId())) {
            throw new BusinessException(403, "无权访问该知识库");
        }
        return knowledgeBase;
    }

    public SyncJobVO convertToVO(SyncJob syncJob) {
        SyncJobVO vo = new SyncJobVO();
        BeanUtils.copyProperties(syncJob, vo);
        return vo;
    }
}
