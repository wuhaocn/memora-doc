package com.memora.manager.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.memora.common.result.Result;
import com.memora.manager.dto.KnowledgeBaseCreateDTO;
import com.memora.manager.dto.KnowledgeBaseMemberBatchUpdateDTO;
import com.memora.manager.dto.KnowledgeBaseUpdateDTO;
import com.memora.manager.service.DocumentService;
import com.memora.manager.service.KnowledgeBaseMemberService;
import com.memora.manager.service.KnowledgeBaseService;
import com.memora.manager.service.SyncJobService;
import com.memora.manager.vo.DocumentVO;
import com.memora.manager.vo.KnowledgeBaseMemberVO;
import com.memora.manager.vo.KnowledgeBaseStatsVO;
import com.memora.manager.vo.KnowledgeBaseVO;
import com.memora.manager.vo.SyncJobVO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/knowledge-bases")
@RequiredArgsConstructor
public class KnowledgeBaseController {
    private final KnowledgeBaseService knowledgeBaseService;
    private final KnowledgeBaseMemberService knowledgeBaseMemberService;
    private final DocumentService documentService;
    private final SyncJobService syncJobService;

    @PostMapping
    public Result<KnowledgeBaseVO> create(@Valid @RequestBody KnowledgeBaseCreateDTO dto) {
        return Result.success(knowledgeBaseService.create(dto));
    }

    @PutMapping("/{id}")
    public Result<KnowledgeBaseVO> update(@PathVariable Long id, @Valid @RequestBody KnowledgeBaseUpdateDTO dto) {
        return Result.success(knowledgeBaseService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        knowledgeBaseService.delete(id);
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result<KnowledgeBaseVO> getById(@PathVariable Long id) {
        return Result.success(knowledgeBaseService.getById(id));
    }

    @GetMapping("/{id}/members")
    public Result<List<KnowledgeBaseMemberVO>> listMembers(@PathVariable Long id) {
        return Result.success(knowledgeBaseMemberService.listMembers(id));
    }

    @PutMapping("/{id}/members")
    public Result<List<KnowledgeBaseMemberVO>> replaceMembers(
        @PathVariable Long id,
        @Valid @RequestBody KnowledgeBaseMemberBatchUpdateDTO dto) {
        return Result.success(knowledgeBaseMemberService.replaceMembers(id, dto));
    }

    @GetMapping
    public Result<IPage<KnowledgeBaseVO>> list(
        @RequestParam(defaultValue = "1") Integer page,
        @RequestParam(defaultValue = "20") Integer size,
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) Long tenantId,
        @RequestParam(required = false) Long userId) {
        return Result.success(knowledgeBaseService.list(page, size, keyword, tenantId, userId));
    }

    @GetMapping("/tenant/{tenantId}")
    public Result<List<KnowledgeBaseVO>> listByTenantId(@PathVariable Long tenantId) {
        return Result.success(knowledgeBaseService.listByTenantId(tenantId));
    }

    @GetMapping("/user/{userId}")
    public Result<List<KnowledgeBaseVO>> listByUserId(@PathVariable Long userId) {
        return Result.success(knowledgeBaseService.listByUserId(userId));
    }

    @GetMapping("/{id}/documents")
    public Result<Object> getDocuments(
        @PathVariable Long id,
        @RequestParam(required = false) Long parentId,
        @RequestParam(required = false) Integer page,
        @RequestParam(required = false) Integer size,
        @RequestParam(required = false) String keyword) {
        if (page != null && size != null) {
            return Result.success(documentService.list(page, size, keyword, id, parentId, null));
        }
        return Result.success(documentService.listByKnowledgeBaseId(id, parentId));
    }

    @GetMapping("/{id}/document-tree")
    public Result<List<DocumentVO>> getDocumentTree(@PathVariable Long id) {
        return Result.success(documentService.listTreeByKnowledgeBaseId(id));
    }

    @GetMapping("/{id}/sync-jobs")
    public Result<List<SyncJobVO>> getSyncJobs(@PathVariable Long id) {
        return Result.success(syncJobService.listByKnowledgeBaseId(id));
    }

    @PostMapping("/{id}/sync-jobs/trigger")
    public Result<SyncJobVO> triggerSync(@PathVariable Long id) {
        return Result.success(syncJobService.triggerKnowledgeBaseSync(id));
    }

    @GetMapping("/stats")
    public Result<KnowledgeBaseStatsVO> getStats(
        @RequestParam(required = false) Long tenantId,
        @RequestParam(required = false) Long userId) {
        return Result.success(knowledgeBaseService.getStats(tenantId, userId));
    }

    @PostMapping("/{id}/share")
    public Result<String> generateShareLink(@PathVariable Long id, @RequestParam(defaultValue = "7") Integer expireDays) {
        return Result.success(knowledgeBaseService.generateShareLink(id, expireDays));
    }

    @GetMapping("/shared")
    public Result<KnowledgeBaseVO> getByShareToken(@RequestParam String token) {
        return Result.success(knowledgeBaseService.getByShareToken(token));
    }

    @PutMapping("/{id}/public-status")
    public Result<KnowledgeBaseVO> setPublicStatus(@PathVariable Long id, @RequestParam Integer isPublic) {
        return Result.success(knowledgeBaseService.setPublicStatus(id, isPublic));
    }
}
