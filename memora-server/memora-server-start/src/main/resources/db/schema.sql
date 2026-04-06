-- 租户表
CREATE TABLE IF NOT EXISTS tenant (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(120) NOT NULL,
  industry VARCHAR(120),
  plan_name VARCHAR(60),
  owner_user_id BIGINT NOT NULL,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS uk_tenant_slug ON tenant(slug);
CREATE INDEX IF NOT EXISTS idx_tenant_owner_user_id ON tenant(owner_user_id);

-- 租户成员表
CREATE TABLE IF NOT EXISTS tenant_member (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  tenant_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  display_name VARCHAR(120) NOT NULL,
  role VARCHAR(40) NOT NULL,
  status TINYINT DEFAULT 1,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_active_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenant(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS uk_tenant_member ON tenant_member(tenant_id, user_id);
CREATE INDEX IF NOT EXISTS idx_tenant_member_tenant_id ON tenant_member(tenant_id);

-- 知识库表
CREATE TABLE IF NOT EXISTS knowledge_base (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  tenant_id BIGINT NOT NULL,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) NOT NULL,
  description VARCHAR(500),
  cover VARCHAR(255),
  user_id BIGINT NOT NULL,
  status TINYINT DEFAULT 1,
  is_public TINYINT DEFAULT 0,
  source_type VARCHAR(30) DEFAULT 'MANUAL',
  sync_enabled TINYINT DEFAULT 0,
  local_root_path VARCHAR(500),
  sync_status VARCHAR(30) DEFAULT 'IDLE',
  document_count INT DEFAULT 0,
  view_count INT DEFAULT 0,
  sort_order INT DEFAULT 0,
  last_sync_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenant(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS uk_kb_tenant_slug ON knowledge_base(tenant_id, slug);
CREATE INDEX IF NOT EXISTS idx_kb_tenant_id ON knowledge_base(tenant_id);
CREATE INDEX IF NOT EXISTS idx_kb_user_id ON knowledge_base(user_id);
CREATE INDEX IF NOT EXISTS idx_kb_status ON knowledge_base(status);
CREATE INDEX IF NOT EXISTS idx_kb_created_at ON knowledge_base(created_at);

-- 知识库成员权限表
CREATE TABLE IF NOT EXISTS knowledge_base_member (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  knowledge_base_id BIGINT NOT NULL,
  tenant_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  role VARCHAR(30) NOT NULL,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_base(id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id) REFERENCES tenant(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS uk_kb_member_user ON knowledge_base_member(knowledge_base_id, user_id);
CREATE INDEX IF NOT EXISTS idx_kb_member_kb_id ON knowledge_base_member(knowledge_base_id);
CREATE INDEX IF NOT EXISTS idx_kb_member_user_id ON knowledge_base_member(user_id);

-- 文档表
CREATE TABLE IF NOT EXISTS document (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  tenant_id BIGINT NOT NULL,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(160) NOT NULL,
  doc_type VARCHAR(30) DEFAULT 'DOC',
  format VARCHAR(30) DEFAULT 'MARKDOWN',
  content CLOB,
  content_text CLOB,
  summary VARCHAR(500),
  knowledge_base_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  parent_id BIGINT DEFAULT 0,
  path VARCHAR(500) NOT NULL,
  depth INT DEFAULT 0,
  source_type VARCHAR(30) DEFAULT 'MANUAL',
  source_path VARCHAR(500),
  sync_status VARCHAR(30) DEFAULT 'MANUAL',
  version_no INT DEFAULT 1,
  status TINYINT DEFAULT 1,
  is_public TINYINT DEFAULT 0,
  view_count INT DEFAULT 0,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP NULL,
  FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_base(id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id) REFERENCES tenant(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS uk_doc_kb_path ON document(knowledge_base_id, path);
CREATE INDEX IF NOT EXISTS idx_doc_kb_id ON document(knowledge_base_id);
CREATE INDEX IF NOT EXISTS idx_doc_tenant_id ON document(tenant_id);
CREATE INDEX IF NOT EXISTS idx_doc_user_id ON document(user_id);
CREATE INDEX IF NOT EXISTS idx_doc_parent_id ON document(parent_id);
CREATE INDEX IF NOT EXISTS idx_doc_created_at ON document(created_at);

-- 文档版本表
CREATE TABLE IF NOT EXISTS document_version (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  document_id BIGINT NOT NULL,
  version INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  format VARCHAR(30) DEFAULT 'MARKDOWN',
  content CLOB,
  content_text CLOB,
  source_type VARCHAR(30) DEFAULT 'MANUAL',
  user_id BIGINT NOT NULL,
  remark VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (document_id) REFERENCES document(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_version_doc_id ON document_version(document_id);
CREATE INDEX IF NOT EXISTS idx_version_version ON document_version(version);

-- 同步任务表
CREATE TABLE IF NOT EXISTS sync_job (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  tenant_id BIGINT NOT NULL,
  knowledge_base_id BIGINT NOT NULL,
  job_type VARCHAR(30) DEFAULT 'LOCAL_SCAN',
  trigger_type VARCHAR(30) DEFAULT 'MANUAL',
  local_path VARCHAR(500),
  status VARCHAR(30) DEFAULT 'SUCCESS',
  scanned_count INT DEFAULT 0,
  changed_count INT DEFAULT 0,
  message VARCHAR(500),
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  finished_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenant(id) ON DELETE CASCADE,
  FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_base(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sync_job_tenant_id ON sync_job(tenant_id);
CREATE INDEX IF NOT EXISTS idx_sync_job_kb_id ON sync_job(knowledge_base_id);
CREATE INDEX IF NOT EXISTS idx_sync_job_created_at ON sync_job(created_at);
