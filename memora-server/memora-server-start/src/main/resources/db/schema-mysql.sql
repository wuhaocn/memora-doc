-- MySQL 数据库表结构（当前多租户在线文档主链路基线）

CREATE TABLE IF NOT EXISTS `tenant` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `slug` VARCHAR(120) NOT NULL,
  `industry` VARCHAR(120),
  `plan_name` VARCHAR(60),
  `owner_user_id` BIGINT NOT NULL,
  `status` TINYINT DEFAULT 1,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='租户表';

CREATE UNIQUE INDEX `uk_tenant_slug` ON `tenant` (`slug`);
CREATE INDEX `idx_tenant_owner_user_id` ON `tenant` (`owner_user_id`);

CREATE TABLE IF NOT EXISTS `tenant_member` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `tenant_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `display_name` VARCHAR(120) NOT NULL,
  `role` VARCHAR(40) NOT NULL,
  `status` TINYINT DEFAULT 1,
  `joined_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `last_active_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_tenant_member_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenant`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='租户成员表';

CREATE UNIQUE INDEX `uk_tenant_member` ON `tenant_member` (`tenant_id`, `user_id`);
CREATE INDEX `idx_tenant_member_tenant_id` ON `tenant_member` (`tenant_id`);

CREATE TABLE IF NOT EXISTS `knowledge_base` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `tenant_id` BIGINT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(120) NOT NULL,
  `description` VARCHAR(500),
  `cover` VARCHAR(255),
  `user_id` BIGINT NOT NULL,
  `status` TINYINT DEFAULT 1,
  `document_count` INT DEFAULT 0,
  `view_count` INT DEFAULT 0,
  `sort_order` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_knowledge_base_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenant`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='知识库表';

CREATE UNIQUE INDEX `uk_kb_tenant_slug` ON `knowledge_base` (`tenant_id`, `slug`);
CREATE INDEX `idx_kb_tenant_id` ON `knowledge_base` (`tenant_id`);
CREATE INDEX `idx_kb_user_id` ON `knowledge_base` (`user_id`);
CREATE INDEX `idx_kb_status` ON `knowledge_base` (`status`);
CREATE INDEX `idx_kb_created_at` ON `knowledge_base` (`created_at`);

CREATE TABLE IF NOT EXISTS `knowledge_base_member` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `knowledge_base_id` BIGINT NOT NULL,
  `tenant_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `role` VARCHAR(30) NOT NULL,
  `status` TINYINT DEFAULT 1,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_kb_member_kb` FOREIGN KEY (`knowledge_base_id`) REFERENCES `knowledge_base`(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_kb_member_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenant`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='知识库成员权限表';

CREATE UNIQUE INDEX `uk_kb_member_user` ON `knowledge_base_member` (`knowledge_base_id`, `user_id`);
CREATE INDEX `idx_kb_member_kb_id` ON `knowledge_base_member` (`knowledge_base_id`);
CREATE INDEX `idx_kb_member_user_id` ON `knowledge_base_member` (`user_id`);

CREATE TABLE IF NOT EXISTS `document` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `tenant_id` BIGINT NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(160) NOT NULL,
  `doc_type` VARCHAR(30) DEFAULT 'DOC',
  `format` VARCHAR(30) DEFAULT 'MARKDOWN',
  `content` LONGTEXT,
  `content_text` LONGTEXT,
  `summary` VARCHAR(500),
  `knowledge_base_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `parent_id` BIGINT DEFAULT 0,
  `path` VARCHAR(500) NOT NULL,
  `depth` INT DEFAULT 0,
  `version_no` INT DEFAULT 1,
  `status` TINYINT DEFAULT 1,
  `view_count` INT DEFAULT 0,
  `sort_order` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_document_kb` FOREIGN KEY (`knowledge_base_id`) REFERENCES `knowledge_base`(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_document_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenant`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文档表';

CREATE UNIQUE INDEX `uk_doc_kb_path` ON `document` (`knowledge_base_id`, `path`);
CREATE INDEX `idx_doc_kb_id` ON `document` (`knowledge_base_id`);
CREATE INDEX `idx_doc_tenant_id` ON `document` (`tenant_id`);
CREATE INDEX `idx_doc_user_id` ON `document` (`user_id`);
CREATE INDEX `idx_doc_parent_id` ON `document` (`parent_id`);
CREATE INDEX `idx_doc_created_at` ON `document` (`created_at`);

CREATE TABLE IF NOT EXISTS `document_version` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `document_id` BIGINT NOT NULL,
  `version` INT NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `format` VARCHAR(30) DEFAULT 'MARKDOWN',
  `content` LONGTEXT,
  `content_text` LONGTEXT,
  `user_id` BIGINT NOT NULL,
  `remark` VARCHAR(255),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_document_version_doc` FOREIGN KEY (`document_id`) REFERENCES `document`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文档版本表';

CREATE INDEX `idx_version_doc_id` ON `document_version` (`document_id`);
CREATE INDEX `idx_version_version` ON `document_version` (`version`);
