package com.memora;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = DocStudioApplication.class)
@AutoConfigureMockMvc
@Transactional
class OnlineDocumentApiIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void shouldReturnWorkspaceDashboardForMockHeaders() throws Exception {
        mockMvc.perform(get("/api/v1/workspaces/current/dashboard")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.workspace.id").value(1))
            .andExpect(jsonPath("$.data.workspace.name").value("华东制造知识中台"))
            .andExpect(jsonPath("$.data.knowledgeBases").isArray());
    }

    @Test
    void shouldReturnWorkspaceDashboardForBearerToken() throws Exception {
        mockMvc.perform(get("/api/v1/workspaces/current/dashboard")
                .header("Authorization", "Bearer demo:1:2"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.workspace.id").value(1))
            .andExpect(jsonPath("$.data.workspace.name").value("华东制造知识中台"))
            .andExpect(jsonPath("$.data.knowledgeBases").isArray());
    }

    @Test
    void shouldReturnCurrentAuthSessionForBearerToken() throws Exception {
        mockMvc.perform(get("/api/v1/auth/session")
                .header("Authorization", "Bearer demo:1:3"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.userId").value(3))
            .andExpect(jsonPath("$.data.tenantId").value(1))
            .andExpect(jsonPath("$.data.displayName").value("陈立"))
            .andExpect(jsonPath("$.data.role").value("REVIEWER"))
            .andExpect(jsonPath("$.data.tenantName").value("华东制造知识中台"))
            .andExpect(jsonPath("$.data.accessToken").value("demo:1:3"));
    }

    @Test
    void shouldLoginAsAdminWithDemoPassword() throws Exception {
        mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "username": "admin",
                      "password": "123456"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.username").value("admin"))
            .andExpect(jsonPath("$.data.userId").value(1))
            .andExpect(jsonPath("$.data.role").value("OWNER"))
            .andExpect(jsonPath("$.data.accessToken").value("demo:1:1"));
    }

    @Test
    void shouldAllowAdminLoginFlowToCreateKnowledgeBaseAndEditDocument() throws Exception {
        String loginResponse = mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "username": "admin",
                      "password": "123456"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andReturn()
            .getResponse()
            .getContentAsString();

        String accessToken = objectMapper.readTree(loginResponse).path("data").path("accessToken").asText();

        String knowledgeBaseResponse = mockMvc.perform(post("/api/v1/knowledge-bases")
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "name": "admin登录新建知识库",
                      "description": "验证 admin 登录后可创建知识库"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.userId").value(1))
            .andExpect(jsonPath("$.data.tenantId").value(1))
            .andReturn()
            .getResponse()
            .getContentAsString();

        long knowledgeBaseId = objectMapper.readTree(knowledgeBaseResponse).path("data").path("id").asLong();

        String documentResponse = mockMvc.perform(post("/api/v1/documents")
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "knowledgeBaseId": %d,
                      "parentId": 0,
                      "title": "admin登录新建文档",
                      "docType": "DOC",
                      "contentText": "首次创建正文"
                    }
                    """.formatted(knowledgeBaseId)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.userId").value(1))
            .andExpect(jsonPath("$.data.knowledgeBaseId").value((int) knowledgeBaseId))
            .andReturn()
            .getResponse()
            .getContentAsString();

        long documentId = objectMapper.readTree(documentResponse).path("data").path("id").asLong();

        mockMvc.perform(put("/api/v1/documents/{id}", documentId)
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "content": "# admin登录新建文档\\n已完成正文编辑",
                      "contentText": "admin登录新建文档 已完成正文编辑",
                      "summary": "验证 admin 登录后可编辑文档"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.id").value((int) documentId))
            .andExpect(jsonPath("$.data.versionNo").value(2))
            .andExpect(jsonPath("$.data.summary").value("验证 admin 登录后可编辑文档"));
    }

    @Test
    void shouldExposeAdminCreatedKnowledgeBaseAndEditedDocumentAcrossMainQueries() throws Exception {
        String loginResponse = mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "username": "admin",
                      "password": "123456"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andReturn()
            .getResponse()
            .getContentAsString();

        String accessToken = objectMapper.readTree(loginResponse).path("data").path("accessToken").asText();

        String knowledgeBaseResponse = mockMvc.perform(post("/api/v1/knowledge-bases")
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "name": "admin链路验证知识库",
                      "description": "验证 admin 主链路查询闭环"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.currentRole").value("OWNER"))
            .andExpect(jsonPath("$.data.canWrite").value(true))
            .andExpect(jsonPath("$.data.canManage").value(true))
            .andReturn()
            .getResponse()
            .getContentAsString();

        long knowledgeBaseId = objectMapper.readTree(knowledgeBaseResponse).path("data").path("id").asLong();

        String documentResponse = mockMvc.perform(post("/api/v1/documents")
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "knowledgeBaseId": %d,
                      "parentId": 0,
                      "title": "admin链路验证文档",
                      "docType": "DOC",
                      "contentText": "版本一正文"
                    }
                    """.formatted(knowledgeBaseId)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.versionNo").value(1))
            .andReturn()
            .getResponse()
            .getContentAsString();

        long documentId = objectMapper.readTree(documentResponse).path("data").path("id").asLong();

        mockMvc.perform(put("/api/v1/documents/{id}", documentId)
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "content": "# admin链路验证文档\\n版本二正文",
                      "contentText": "admin链路验证文档 版本二正文",
                      "summary": "主链路编辑后摘要"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.versionNo").value(2))
            .andExpect(jsonPath("$.data.summary").value("主链路编辑后摘要"));

        mockMvc.perform(get("/api/v1/documents/{id}", documentId)
                .header("Authorization", "Bearer " + accessToken))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.id").value((int) documentId))
            .andExpect(jsonPath("$.data.knowledgeBaseId").value((int) knowledgeBaseId))
            .andExpect(jsonPath("$.data.content").value("# admin链路验证文档\n版本二正文"))
            .andExpect(jsonPath("$.data.contentText").value("admin链路验证文档 版本二正文"))
            .andExpect(jsonPath("$.data.summary").value("主链路编辑后摘要"))
            .andExpect(jsonPath("$.data.versionNo").value(2));

        mockMvc.perform(get("/api/v1/documents/{id}/versions", documentId)
                .header("Authorization", "Bearer " + accessToken))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.length()").value(1))
            .andExpect(jsonPath("$.data[0].documentId").value((int) documentId))
            .andExpect(jsonPath("$.data[0].version").value(1))
            .andExpect(jsonPath("$.data[0].contentText").value("版本一正文"))
            .andExpect(jsonPath("$.data[0].remark").value("自动版本快照"));

        mockMvc.perform(get("/api/v1/knowledge-bases/{id}", knowledgeBaseId)
                .header("Authorization", "Bearer " + accessToken))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.id").value((int) knowledgeBaseId))
            .andExpect(jsonPath("$.data.documentCount").value(1))
            .andExpect(jsonPath("$.data.currentRole").value("OWNER"))
            .andExpect(jsonPath("$.data.canWrite").value(true))
            .andExpect(jsonPath("$.data.canManage").value(true));

        mockMvc.perform(get("/api/v1/knowledge-bases/{id}/document-tree", knowledgeBaseId)
                .header("Authorization", "Bearer " + accessToken))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data[*].id", Matchers.hasItem((int) documentId)))
            .andExpect(jsonPath("$.data[*].title", Matchers.hasItem("admin链路验证文档")));

        mockMvc.perform(get("/api/v1/workspaces/current/dashboard")
                .header("Authorization", "Bearer " + accessToken))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.workspace.id").value(1))
            .andExpect(jsonPath("$.data.knowledgeBases[*].id", Matchers.hasItem((int) knowledgeBaseId)))
            .andExpect(jsonPath("$.data.knowledgeBases[*].name", Matchers.hasItem("admin链路验证知识库")));
    }

    @Test
    void shouldCreateKnowledgeBaseUsingHeaderContextWhenBodyOmitsTenantAndUser() throws Exception {
        mockMvc.perform(post("/api/v1/knowledge-bases")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "name": "现场培训手册",
                      "description": "用于验证请求头上下文注入"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.tenantId").value(1))
            .andExpect(jsonPath("$.data.userId").value(2))
            .andExpect(jsonPath("$.data.name").value("现场培训手册"));
    }

    @Test
    void shouldReturnDocumentTreeForKnowledgeBase() throws Exception {
        mockMvc.perform(get("/api/v1/knowledge-bases/1/document-tree")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data").isArray())
            .andExpect(jsonPath("$.data[0].knowledgeBaseId").value(1))
            .andExpect(jsonPath("$.data[0].path").exists());
    }

    @Test
    void shouldTriggerSyncJobForSyncEnabledKnowledgeBase() throws Exception {
        mockMvc.perform(post("/api/v1/knowledge-bases/1/sync-jobs/trigger")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.knowledgeBaseId").value(1))
            .andExpect(jsonPath("$.data.status").value("SUCCESS"))
            .andExpect(jsonPath("$.data.localPath").value("/mnt/projects/delivery-docs"));
    }

    @Test
    void shouldCreateDocumentUsingHeaderContextWhenBodyOmitsUser() throws Exception {
        mockMvc.perform(post("/api/v1/documents")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "knowledgeBaseId": 1,
                      "parentId": 1,
                      "title": "现场交接记录",
                      "docType": "DOC",
                      "contentText": "用于记录交接事项"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.userId").value(2))
            .andExpect(jsonPath("$.data.parentId").value(1))
            .andExpect(jsonPath("$.data.path").value("/delivery-overview/现场交接记录"));
    }

    @Test
    void shouldRejectMovingFolderIntoItsOwnDescendant() throws Exception {
        String createResponse = mockMvc.perform(post("/api/v1/documents")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "knowledgeBaseId": 1,
                      "parentId": 1,
                      "title": "交付附录",
                      "docType": "FOLDER"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andReturn()
            .getResponse()
            .getContentAsString();

        JsonNode root = objectMapper.readTree(createResponse);
        long childFolderId = root.path("data").path("id").asLong();

        mockMvc.perform(put("/api/v1/documents/1")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "parentId": %d
                    }
                    """.formatted(childFolderId)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(400))
            .andExpect(jsonPath("$.message").value("目录不能移动到自己的子级目录下"));
    }

    @Test
    void shouldBatchMoveTopLevelSelectionWithoutMovingChildTwice() throws Exception {
        String folderResponse = mockMvc.perform(post("/api/v1/documents")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "knowledgeBaseId": 1,
                      "parentId": 1,
                      "title": "批量移动目录",
                      "docType": "FOLDER"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andReturn()
            .getResponse()
            .getContentAsString();

        long folderId = objectMapper.readTree(folderResponse).path("data").path("id").asLong();

        String childResponse = mockMvc.perform(post("/api/v1/documents")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "knowledgeBaseId": 1,
                      "parentId": %d,
                      "title": "批量移动子文档",
                      "docType": "DOC",
                      "contentText": "用于测试批量移动"
                    }
                    """.formatted(folderId)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andReturn()
            .getResponse()
            .getContentAsString();

        long childId = objectMapper.readTree(childResponse).path("data").path("id").asLong();

        mockMvc.perform(post("/api/v1/documents/batch-move")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "documentIds": [%d, %d],
                      "parentId": 0
                    }
                    """.formatted(folderId, childId)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200));

        mockMvc.perform(get("/api/v1/documents/%d".formatted(folderId))
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.parentId").value(0))
            .andExpect(jsonPath("$.data.path").value("/批量移动目录"));

        mockMvc.perform(get("/api/v1/documents/%d".formatted(childId))
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.parentId").value(folderId))
            .andExpect(jsonPath("$.data.path").value("/批量移动目录/批量移动子文档"));
    }

    @Test
    void shouldRejectBatchDeleteWhenFolderStillHasUnselectedDescendant() throws Exception {
        String folderResponse = mockMvc.perform(post("/api/v1/documents")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "knowledgeBaseId": 1,
                      "parentId": 1,
                      "title": "批量删除目录",
                      "docType": "FOLDER"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andReturn()
            .getResponse()
            .getContentAsString();

        long folderId = objectMapper.readTree(folderResponse).path("data").path("id").asLong();

        mockMvc.perform(post("/api/v1/documents")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "knowledgeBaseId": 1,
                      "parentId": %d,
                      "title": "批量删除子文档",
                      "docType": "DOC",
                      "contentText": "用于测试批量删除"
                    }
                    """.formatted(folderId)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200));

        mockMvc.perform(post("/api/v1/documents/batch-delete")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "documentIds": [%d]
                    }
                    """.formatted(folderId)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(400))
            .andExpect(jsonPath("$.message").value("目录“批量删除目录”仍有未选中的子节点，不能批量删除"));
    }

    @Test
    void shouldRejectCrossTenantKnowledgeBaseAndDocumentAccess() throws Exception {
        jdbcTemplate.update("""
            INSERT INTO tenant (id, name, slug, industry, plan_name, owner_user_id, status)
            VALUES (2, '华北交付中心', 'north-delivery-center', '工业制造', 'ENTERPRISE', 9, 1)
            """);
        jdbcTemplate.update("""
            INSERT INTO knowledge_base (
              id, tenant_id, name, slug, description, user_id, status, is_public, source_type,
              sync_enabled, local_root_path, sync_status, document_count, view_count, sort_order, last_sync_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            """, 101L, 2L, "北区交付库", "north-delivery", "租户 2 的知识库", 9L, 1, 0, "MANUAL", 1, "/mnt/north", "IDLE", 1, 0, 0);
        jdbcTemplate.update("""
            INSERT INTO document (
              id, tenant_id, title, slug, doc_type, format, content, content_text, summary,
              knowledge_base_id, user_id, parent_id, path, depth, source_type, source_path,
              sync_status, version_no, status, is_public, view_count, sort_order, published_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            """, 201L, 2L, "北区说明", "north-guide", "DOC", "MARKDOWN", "# 北区说明", "北区说明", "租户 2 文档", 101L, 9L, 0L, "/north-guide", 0, "MANUAL", null, "MANUAL", 1, 1, 0, 0, 0);
        jdbcTemplate.update("""
            INSERT INTO sync_job (
              tenant_id, knowledge_base_id, job_type, trigger_type, local_path, status,
              scanned_count, changed_count, message, started_at, finished_at, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            """, 2L, 101L, "LOCAL_SCAN", "MANUAL", "/mnt/north", "SUCCESS", 1, 0, "租户 2 同步任务");

        mockMvc.perform(get("/api/v1/knowledge-bases/101")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(403))
            .andExpect(jsonPath("$.message").value("无权访问该知识库"));

        mockMvc.perform(get("/api/v1/documents/201")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(403))
            .andExpect(jsonPath("$.message").value("无权访问该文档"));

        mockMvc.perform(get("/api/v1/knowledge-bases/101/sync-jobs")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(403))
            .andExpect(jsonPath("$.message").value("无权访问该知识库"));
    }

    @Test
    void shouldRejectCrossTenantKnowledgeBaseListOverride() throws Exception {
        mockMvc.perform(get("/api/v1/knowledge-bases")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "1")
                .param("tenantId", "2"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(403))
            .andExpect(jsonPath("$.message").value("无权访问当前租户数据"));
    }

    @Test
    void shouldRejectViewerWriteOperations() throws Exception {
        mockMvc.perform(post("/api/v1/documents")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "4")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "knowledgeBaseId": 1,
                      "parentId": 1,
                      "title": "只读用户新文档",
                      "docType": "DOC",
                      "contentText": "viewer should be rejected"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(403))
            .andExpect(jsonPath("$.message").value("当前知识库角色无写权限"));

        mockMvc.perform(post("/api/v1/knowledge-bases/1/sync-jobs/trigger")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "4"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(403))
            .andExpect(jsonPath("$.message").value("当前知识库角色无写权限"));
    }

    @Test
    void shouldRejectReviewerKnowledgeBaseManagementAndNonMemberAccess() throws Exception {
        mockMvc.perform(delete("/api/v1/knowledge-bases/1")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "3"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(403))
            .andExpect(jsonPath("$.message").value("当前知识库角色无管理权限"));

        mockMvc.perform(get("/api/v1/workspaces/current/dashboard")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "99"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(403))
            .andExpect(jsonPath("$.message").value("当前用户不属于该租户"));
    }

    @Test
    void shouldApplyKnowledgeBaseLevelPermissionsWhenConfigured() throws Exception {
        jdbcTemplate.update("""
            INSERT INTO knowledge_base (
              id, tenant_id, name, slug, description, user_id, status, is_public, source_type,
              sync_enabled, local_root_path, sync_status, document_count, view_count, sort_order, last_sync_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            """, 102L, 1L, "受限知识库", "restricted-kb", "用于测试知识库级权限", 1L, 1, 0, "MANUAL", 1, "/mnt/restricted", "IDLE", 0, 0, 9);
        jdbcTemplate.update("""
            INSERT INTO knowledge_base_member (knowledge_base_id, tenant_id, user_id, role, status)
            VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)
            """, 102L, 1L, 3L, "EDITOR", 1, 102L, 1L, 4L, "VIEWER", 1);

        mockMvc.perform(get("/api/v1/knowledge-bases/102")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(403))
            .andExpect(jsonPath("$.message").value("当前用户无权访问该知识库"));

        mockMvc.perform(post("/api/v1/documents")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "3")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "knowledgeBaseId": 102,
                      "parentId": 0,
                      "title": "知识库级授权文档",
                      "docType": "DOC",
                      "contentText": "reviewer with kb editor should pass"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.knowledgeBaseId").value(102))
            .andExpect(jsonPath("$.data.userId").value(3));

        mockMvc.perform(post("/api/v1/documents")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "4")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "knowledgeBaseId": 102,
                      "parentId": 0,
                      "title": "知识库级只读文档",
                      "docType": "DOC",
                      "contentText": "viewer should be rejected by kb role"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(403))
            .andExpect(jsonPath("$.message").value("当前知识库角色无写权限"));

        mockMvc.perform(get("/api/v1/knowledge-bases/tenant/1")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data[*].id", Matchers.not(Matchers.hasItem(102))));
    }

    @Test
    void shouldManageKnowledgeBaseMembersAndExposePermissionFlags() throws Exception {
        mockMvc.perform(put("/api/v1/knowledge-bases/1/members")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "members": [
                        { "userId": 1, "role": "OWNER" },
                        { "userId": 4, "role": "VIEWER" }
                      ]
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.length()").value(2))
            .andExpect(jsonPath("$.data[0].userId").value(1))
            .andExpect(jsonPath("$.data[0].displayName").value("王晨"))
            .andExpect(jsonPath("$.data[1].userId").value(4))
            .andExpect(jsonPath("$.data[1].displayName").value("赵敏"));

        mockMvc.perform(get("/api/v1/knowledge-bases/1/members")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.length()").value(2));

        mockMvc.perform(get("/api/v1/knowledge-bases/1")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "4"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.currentRole").value("VIEWER"))
            .andExpect(jsonPath("$.data.canWrite").value(false))
            .andExpect(jsonPath("$.data.canManage").value(false))
            .andExpect(jsonPath("$.data.permissionRestricted").value(true));

        mockMvc.perform(get("/api/v1/knowledge-bases/1")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(403))
            .andExpect(jsonPath("$.message").value("当前用户无权访问该知识库"));
    }

    @Test
    void shouldRejectKnowledgeBaseMemberUpdateByNonManager() throws Exception {
        mockMvc.perform(put("/api/v1/knowledge-bases/1/members")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "3")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "members": [
                        { "userId": 3, "role": "ADMIN" }
                      ]
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(403))
            .andExpect(jsonPath("$.message").value("当前知识库角色无管理权限"));
    }

    @Test
    void shouldClearKnowledgeBaseMemberRestrictions() throws Exception {
        jdbcTemplate.update("""
            INSERT INTO knowledge_base (
              id, tenant_id, name, slug, description, user_id, status, is_public, source_type,
              sync_enabled, local_root_path, sync_status, document_count, view_count, sort_order, last_sync_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            """, 103L, 1L, "待清理权限知识库", "permission-reset-kb", "用于测试清空知识库权限限制", 1L, 1, 0, "MANUAL", 0, null, "DISABLED", 0, 0, 10);
        jdbcTemplate.update("""
            INSERT INTO knowledge_base_member (knowledge_base_id, tenant_id, user_id, role, status)
            VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)
            """, 103L, 1L, 1L, "OWNER", 1, 103L, 1L, 4L, "VIEWER", 1);

        mockMvc.perform(put("/api/v1/knowledge-bases/103/members")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "members": []
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.length()").value(0));

        mockMvc.perform(get("/api/v1/knowledge-bases/103")
                .header("X-Tenant-Id", "1")
                .header("X-User-Id", "2"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.data.currentRole").value("EDITOR"))
            .andExpect(jsonPath("$.data.canWrite").value(true))
            .andExpect(jsonPath("$.data.canManage").value(false))
            .andExpect(jsonPath("$.data.permissionRestricted").value(false));
    }
}
