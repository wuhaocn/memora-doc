package com.memora.manager.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.memora.common.exception.BusinessException;
import com.memora.manager.dto.KnowledgeBaseCreateDTO;
import com.memora.manager.dto.KnowledgeBaseUpdateDTO;
import com.memora.manager.entity.KnowledgeBase;
import com.memora.manager.entity.Tenant;
import com.memora.manager.mapper.KnowledgeBaseMapper;
import com.memora.manager.mapper.TenantMapper;
import com.memora.manager.support.CurrentAccessContext;
import com.memora.manager.support.SlugUtils;
import com.memora.manager.support.TenantAccessService;
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

@Service
@RequiredArgsConstructor
public class KnowledgeBaseService extends ServiceImpl<KnowledgeBaseMapper, KnowledgeBase> {
    private final KnowledgeBaseMapper knowledgeBaseMapper;
    private final TenantMapper tenantMapper;
    private final CurrentAccessContext currentAccessContext;
    private final TenantAccessService tenantAccessService;

    @Transactional(rollbackFor = Exception.class)
    public KnowledgeBaseVO create(KnowledgeBaseCreateDTO dto) {
        Long tenantId = resolveAccessibleTenantId(dto.getTenantId());
        ensureTenantExists(tenantId);
        tenantAccessService.requireEditor(tenantId);

        KnowledgeBase knowledgeBase = new KnowledgeBase();
        BeanUtils.copyProperties(dto, knowledgeBase);
        knowledgeBase.setTenantId(tenantId);
        knowledgeBase.setUserId(dto.getUserId() == null ? currentAccessContext.getCurrentUserId() : dto.getUserId());
        knowledgeBase.setSlug(resolveKnowledgeBaseSlug(dto.getName(), dto.getSlug()));
        knowledgeBase.setStatus(1);
        knowledgeBase.setIsPublic(dto.getIsPublic() == null ? 0 : dto.getIsPublic());
        knowledgeBase.setSourceType(StringUtils.hasText(dto.getSourceType()) ? dto.getSourceType() : "MANUAL");
        knowledgeBase.setSyncEnabled(dto.getSyncEnabled() == null ? 0 : dto.getSyncEnabled());
        knowledgeBase.setSyncStatus(knowledgeBase.getSyncEnabled() == 1 ? "IDLE" : "DISABLED");
        knowledgeBase.setDocumentCount(0);
        knowledgeBase.setViewCount(0);
        knowledgeBase.setSortOrder(0);
        knowledgeBase.setCreatedAt(LocalDateTime.now());
        knowledgeBase.setUpdatedAt(LocalDateTime.now());
        if (knowledgeBase.getSyncEnabled() == 1) {
            knowledgeBase.setLastSyncAt(LocalDateTime.now());
        }

        this.save(knowledgeBase);
        return convertToVO(knowledgeBase);
    }

    @Transactional(rollbackFor = Exception.class)
    public KnowledgeBaseVO update(Long id, KnowledgeBaseUpdateDTO dto) {
        KnowledgeBase knowledgeBase = getAccessibleEntity(id);
        tenantAccessService.requireKnowledgeBaseManageAccess(knowledgeBase);

        if (StringUtils.hasText(dto.getName())) {
            knowledgeBase.setName(dto.getName());
            if (!StringUtils.hasText(dto.getSlug())) {
                knowledgeBase.setSlug(resolveKnowledgeBaseSlug(dto.getName(), null));
            }
        }
        if (StringUtils.hasText(dto.getSlug())) {
            knowledgeBase.setSlug(resolveKnowledgeBaseSlug(knowledgeBase.getName(), dto.getSlug()));
        }
        if (dto.getDescription() != null) {
            knowledgeBase.setDescription(dto.getDescription());
        }
        if (dto.getCover() != null) {
            knowledgeBase.setCover(dto.getCover());
        }
        if (dto.getSourceType() != null) {
            knowledgeBase.setSourceType(dto.getSourceType());
        }
        if (dto.getSyncEnabled() != null) {
            knowledgeBase.setSyncEnabled(dto.getSyncEnabled());
            knowledgeBase.setSyncStatus(dto.getSyncEnabled() == 1 ? "IDLE" : "DISABLED");
        }
        if (dto.getLocalRootPath() != null) {
            knowledgeBase.setLocalRootPath(dto.getLocalRootPath());
        }
        if (dto.getIsPublic() != null) {
            knowledgeBase.setIsPublic(dto.getIsPublic());
        }
        knowledgeBase.setUpdatedAt(LocalDateTime.now());
        this.updateById(knowledgeBase);
        return convertToVO(knowledgeBase);
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(Long id) {
        KnowledgeBase knowledgeBase = getAccessibleEntity(id);
        tenantAccessService.requireKnowledgeBaseManageAccess(knowledgeBase);
        knowledgeBase.setStatus(0);
        knowledgeBase.setUpdatedAt(LocalDateTime.now());
        this.updateById(knowledgeBase);
    }

    public KnowledgeBaseVO getById(Long id) {
        KnowledgeBase knowledgeBase = getAccessibleEntity(id);
        tenantAccessService.requireKnowledgeBaseReadAccess(knowledgeBase);
        return convertToVO(knowledgeBase);
    }

    public IPage<KnowledgeBaseVO> list(Integer page, Integer size, String keyword, Long tenantId, Long userId) {
        Page<KnowledgeBase> pageParam = new Page<>(page, size);
        Long accessibleTenantId = resolveAccessibleTenantId(tenantId);
        tenantAccessService.requireTenantMember(accessibleTenantId);
        List<KnowledgeBase> accessibleKnowledgeBases = listAccessibleKnowledgeBases(keyword, accessibleTenantId, userId);
        IPage<KnowledgeBaseVO> voPage = buildKnowledgeBasePage(page, size, accessibleKnowledgeBases);
        return voPage;
    }

    public List<KnowledgeBaseVO> listByTenantId(Long tenantId) {
        Long accessibleTenantId = resolveAccessibleTenantId(tenantId);
        tenantAccessService.requireTenantMember(accessibleTenantId);
        return listAccessibleKnowledgeBases(null, accessibleTenantId, null).stream().map(this::convertToVO).collect(Collectors.toList());
    }

    public List<KnowledgeBaseVO> listByUserId(Long userId) {
        Long currentTenantId = currentAccessContext.getCurrentTenantId();
        tenantAccessService.requireTenantMember(currentTenantId);
        return listAccessibleKnowledgeBases(null, currentTenantId, userId).stream().map(this::convertToVO).collect(Collectors.toList());
    }

    public KnowledgeBaseStatsVO getStats(Long tenantId, Long userId) {
        Long accessibleTenantId = resolveAccessibleTenantId(tenantId);
        tenantAccessService.requireTenantMember(accessibleTenantId);
        List<KnowledgeBase> list = listAccessibleKnowledgeBases(null, accessibleTenantId, userId);

        KnowledgeBaseStatsVO statsVO = new KnowledgeBaseStatsVO();
        statsVO.setTotalCount(list.size());
        statsVO.setPublicCount(list.stream().filter(item -> item.getIsPublic() != null && item.getIsPublic() == 1).count());
        statsVO.setPrivateCount(list.stream().filter(item -> item.getIsPublic() == null || item.getIsPublic() == 0).count());
        statsVO.setTotalDocumentCount(list.stream().mapToLong(item -> item.getDocumentCount() == null ? 0 : item.getDocumentCount()).sum());
        statsVO.setTotalViewCount(list.stream().mapToLong(item -> item.getViewCount() == null ? 0 : item.getViewCount()).sum());

        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        statsVO.setRecent7DaysCount(list.stream()
            .filter(item -> item.getCreatedAt() != null && item.getCreatedAt().isAfter(sevenDaysAgo))
            .count());
        return statsVO;
    }

    @Transactional(rollbackFor = Exception.class)
    public String generateShareLink(Long id, Integer expireDays) {
        KnowledgeBase knowledgeBase = getAccessibleEntity(id);
        tenantAccessService.requireKnowledgeBaseManageAccess(knowledgeBase);
        String token = knowledgeBase.getSlug() + "-" + knowledgeBase.getId() + "-" + System.currentTimeMillis();
        return "/public/knowledge-bases/" + knowledgeBase.getId() + "?token=" + token + "&expireDays=" + expireDays;
    }

    public KnowledgeBaseVO getByShareToken(String shareToken) {
        if (!StringUtils.hasText(shareToken) || !shareToken.contains("-")) {
            throw new BusinessException(400, "无效的分享链接");
        }

        String[] parts = shareToken.split("-");
        Long knowledgeBaseId = Long.parseLong(parts[parts.length - 2]);
        KnowledgeBase knowledgeBase = getActiveEntity(knowledgeBaseId);
        knowledgeBase.setViewCount((knowledgeBase.getViewCount() == null ? 0 : knowledgeBase.getViewCount()) + 1);
        this.updateById(knowledgeBase);
        return convertToVO(knowledgeBase, false);
    }

    @Transactional(rollbackFor = Exception.class)
    public KnowledgeBaseVO setPublicStatus(Long id, Integer isPublic) {
        KnowledgeBase knowledgeBase = getAccessibleEntity(id);
        tenantAccessService.requireKnowledgeBaseManageAccess(knowledgeBase);
        knowledgeBase.setIsPublic(isPublic);
        knowledgeBase.setUpdatedAt(LocalDateTime.now());
        this.updateById(knowledgeBase);
        return convertToVO(knowledgeBase);
    }

    private LambdaQueryWrapper<KnowledgeBase> buildActiveQuery(String keyword, Long tenantId, Long userId) {
        LambdaQueryWrapper<KnowledgeBase> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(KnowledgeBase::getStatus, 1);

        if (tenantId != null) {
            queryWrapper.eq(KnowledgeBase::getTenantId, tenantId);
        }
        if (userId != null) {
            queryWrapper.eq(KnowledgeBase::getUserId, userId);
        }
        if (StringUtils.hasText(keyword)) {
            queryWrapper.and(wrapper -> wrapper
                .like(KnowledgeBase::getName, keyword)
                .or()
                .like(KnowledgeBase::getDescription, keyword));
        }
        return queryWrapper;
    }

    private List<KnowledgeBase> listAccessibleKnowledgeBases(String keyword, Long tenantId, Long userId) {
        LambdaQueryWrapper<KnowledgeBase> queryWrapper = buildActiveQuery(keyword, tenantId, userId);
        queryWrapper.orderByAsc(KnowledgeBase::getSortOrder).orderByDesc(KnowledgeBase::getUpdatedAt);
        return tenantAccessService.filterReadableKnowledgeBases(this.list(queryWrapper));
    }

    private IPage<KnowledgeBaseVO> buildKnowledgeBasePage(Integer page, Integer size, List<KnowledgeBase> accessibleKnowledgeBases) {
        int fromIndex = Math.max((page - 1) * size, 0);
        int toIndex = Math.min(fromIndex + size, accessibleKnowledgeBases.size());
        List<KnowledgeBaseVO> pageRecords = fromIndex >= accessibleKnowledgeBases.size()
            ? List.of()
            : accessibleKnowledgeBases.subList(fromIndex, toIndex).stream().map(this::convertToVO).collect(Collectors.toList());

        Page<KnowledgeBaseVO> voPage = new Page<>(page, size, accessibleKnowledgeBases.size());
        voPage.setRecords(pageRecords);
        return voPage;
    }

    private KnowledgeBase getActiveEntity(Long id) {
        KnowledgeBase knowledgeBase = super.getById(id);
        if (knowledgeBase == null || knowledgeBase.getStatus() == null || knowledgeBase.getStatus() == 0) {
            throw new BusinessException(404, "知识库不存在");
        }
        return knowledgeBase;
    }

    private KnowledgeBase getAccessibleEntity(Long id) {
        KnowledgeBase knowledgeBase = getActiveEntity(id);
        if (!knowledgeBase.getTenantId().equals(currentAccessContext.getCurrentTenantId())) {
            throw new BusinessException(403, "无权访问该知识库");
        }
        return knowledgeBase;
    }

    private Long resolveAccessibleTenantId(Long tenantId) {
        Long currentTenantId = currentAccessContext.getCurrentTenantId();
        if (tenantId != null && !tenantId.equals(currentTenantId)) {
            throw new BusinessException(403, "无权访问当前租户数据");
        }
        return currentTenantId;
    }

    private void ensureTenantExists(Long tenantId) {
        Tenant tenant = tenantMapper.selectById(tenantId);
        if (tenant == null || tenant.getStatus() == null || tenant.getStatus() == 0) {
            throw new BusinessException(404, "租户不存在");
        }
    }

    private String resolveKnowledgeBaseSlug(String name, String slug) {
        return StringUtils.hasText(slug) ? SlugUtils.toSlug(slug) : SlugUtils.toSlug(name);
    }

    private KnowledgeBaseVO convertToVO(KnowledgeBase knowledgeBase) {
        return convertToVO(knowledgeBase, true);
    }

    private KnowledgeBaseVO convertToVO(KnowledgeBase knowledgeBase, boolean includePermissionContext) {
        KnowledgeBaseVO vo = new KnowledgeBaseVO();
        BeanUtils.copyProperties(knowledgeBase, vo);
        if (includePermissionContext) {
            String currentRole = tenantAccessService.getKnowledgeBaseRole(knowledgeBase);
            vo.setCurrentRole(currentRole);
            vo.setCanWrite(tenantAccessService.canWriteKnowledgeBase(currentRole));
            vo.setCanManage(tenantAccessService.canManageKnowledgeBase(currentRole));
            vo.setPermissionRestricted(tenantAccessService.hasKnowledgeBaseRestrictions(knowledgeBase.getId()));
        }
        return vo;
    }
}
