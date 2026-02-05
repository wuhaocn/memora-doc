-- 知识库表
CREATE TABLE IF NOT EXISTS knowledge_base (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(500),
  cover VARCHAR(255),
  user_id BIGINT NOT NULL,
  status TINYINT DEFAULT 1,
  is_public TINYINT DEFAULT 0,
  document_count INT DEFAULT 0,
  view_count INT DEFAULT 0,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_kb_user_id ON knowledge_base(user_id);
CREATE INDEX IF NOT EXISTS idx_kb_status ON knowledge_base(status);
CREATE INDEX IF NOT EXISTS idx_kb_created_at ON knowledge_base(created_at);

-- 文档表
CREATE TABLE IF NOT EXISTS document (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content CLOB,
  content_text CLOB,
  knowledge_base_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  parent_id BIGINT DEFAULT 0,
  status TINYINT DEFAULT 1,
  is_public TINYINT DEFAULT 0,
  view_count INT DEFAULT 0,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_base(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_doc_kb_id ON document(knowledge_base_id);
CREATE INDEX IF NOT EXISTS idx_doc_user_id ON document(user_id);
CREATE INDEX IF NOT EXISTS idx_doc_parent_id ON document(parent_id);
CREATE INDEX IF NOT EXISTS idx_doc_created_at ON document(created_at);

-- 文档版本表
CREATE TABLE IF NOT EXISTS document_version (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  document_id BIGINT NOT NULL,
  version INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content CLOB,
  content_text CLOB,
  user_id BIGINT NOT NULL,
  remark VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (document_id) REFERENCES document(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_version_doc_id ON document_version(document_id);
CREATE INDEX IF NOT EXISTS idx_version_version ON document_version(version);

-- 资源表
CREATE TABLE IF NOT EXISTS resource (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description VARCHAR(500),
  type VARCHAR(50) NOT NULL,
  content CLOB,
  content_url VARCHAR(500),
  content_type VARCHAR(100),
  user_id BIGINT NOT NULL,
  status TINYINT DEFAULT 1,
  is_public TINYINT DEFAULT 0,
  view_count INT DEFAULT 0,
  download_count INT DEFAULT 0,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_resource_user_id ON resource(user_id);
CREATE INDEX IF NOT EXISTS idx_resource_type ON resource(type);
CREATE INDEX IF NOT EXISTS idx_resource_status ON resource(status);
CREATE INDEX IF NOT EXISTS idx_resource_created_at ON resource(created_at);

-- 标签表
CREATE TABLE IF NOT EXISTS tag (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  user_id BIGINT NOT NULL,
  status TINYINT DEFAULT 1,
  resource_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tag_user_id ON tag(user_id);
CREATE INDEX IF NOT EXISTS idx_tag_name ON tag(name);
CREATE INDEX IF NOT EXISTS idx_tag_status ON tag(status);

-- 资源标签关联表
CREATE TABLE IF NOT EXISTS resource_tag (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  resource_id BIGINT NOT NULL,
  tag_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resource_id) REFERENCES resource(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS uk_resource_tag ON resource_tag(resource_id, tag_id);
CREATE INDEX IF NOT EXISTS idx_rt_resource_id ON resource_tag(resource_id);
CREATE INDEX IF NOT EXISTS idx_rt_tag_id ON resource_tag(tag_id);

-- 资源使用记录表
CREATE TABLE IF NOT EXISTS resource_usage (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  resource_id BIGINT NOT NULL,
  document_id BIGINT,
  knowledge_base_id BIGINT,
  user_id BIGINT NOT NULL,
  usage_type VARCHAR(50),
  usage_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resource_id) REFERENCES resource(id) ON DELETE CASCADE,
  FOREIGN KEY (document_id) REFERENCES document(id) ON DELETE SET NULL,
  FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_base(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_usage_resource_id ON resource_usage(resource_id);
CREATE INDEX IF NOT EXISTS idx_usage_document_id ON resource_usage(document_id);
CREATE INDEX IF NOT EXISTS idx_usage_user_id ON resource_usage(user_id);

