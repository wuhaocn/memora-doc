# 行业产品参考与设计取舍

## 1. 文档定位

本文档记录 Memora 当前设计判断所参考的行业产品。

它回答两个问题：

- 当前在线文档 / 知识库产品的主流能力边界是什么
- Memora 当前应该吸收什么，不应该过早做什么

说明：

- 本文档不是当前产品基线
- 当前基线以产品需求文档和技术架构文档为准
- 本文档只用于设计取舍和路线判断

---

## 2. 参考样本

本轮只选择与 Memora 最相关的 6 个样本：

- Notion
- Confluence
- Outline
- Docmost
- Slab
- AppFlowy

选择原因：

- Notion：代表通用工作区 + wiki 模型
- Confluence：代表企业知识治理基线
- Outline：代表现代团队知识库产品形态
- Docmost：代表开源协作文档 / 企业 wiki 基线
- Slab：代表知识库优先而不是协作优先
- AppFlowy：代表本地优先方向，可作为外围能力参考

---

## 3. 总体对照

| 产品 | 核心定位 | 内容结构 | 权限边界 | 阅读 / 发布 | 版本 / 协作 | 对 Memora 的启发 |
| --- | --- | --- | --- | --- | --- | --- |
| Notion | 通用工作区 | 页面、wiki、database | 空间、页面、分享粒度细 | 页面分享、公开发布、验证页 | 协作强、治理中等 | 灵活，但容易泛化过头 |
| Confluence | 企业知识库 | Space + page tree | 空间级、页面级治理 | 内部知识库、受控访问、外部知识库 | 历史、模板、治理强 | 企业治理基线最成熟 |
| Outline | 团队知识库 | Collection + nested docs | 团队、组、集合、文档 | 内部分享、公开文档、公开集合 | 版本、协作、搜索强 | 最接近现代知识库形态 |
| Docmost | 开源协作文档 | Workspace + space + page | 工作区、空间，企业版更细权限 | 页面公开分享 | 历史、评论、搜索、协作 | 开源路线下较好的知识库基线 |
| Slab | 知识库优先产品 | Topic + post | Topic / post 权限 | 内部和外部知识访问 | 搜索和发现性强 | 强提醒：搜索是主功能 |
| AppFlowy | 本地优先工作区 | Workspace + page | 工作区 / 协作权限 | 分享与发布持续增强 | 本地优先、多端同步 | 可作为未来外围能力参考 |

---

## 4. 业界共同结论

### 4.1 信息架构

主流产品几乎都采用“顶层容器 + 树状内容”模型。

常见形式：

- Workspace / Space / Page
- Team / Collection / Document
- Topic / Post

结论：

- Memora 当前的 `Tenant -> KnowledgeBase -> Document` 结构是合理的
- 没有必要为了显得更先进而强行转成无限自由的 block 平台

### 4.2 权限模型

主流企业产品通常先把权限放在空间、集合、知识库这类中层容器，再补页级例外。

结论：

- Memora 应继续把 `KnowledgeBase` 作为主权限边界
- 文档级权限应该作为例外增强，而不是主模型

### 4.3 阅读、分享、发布

业界通常明确区分三类入口：

- 内部阅读直达
- 受控分享 / 访客阅读
- 正式公开发布

结论：

- Memora 不能把阅读链接描述成分享或发布
- 直达阅读、受控阅读、公开发布必须拆开

### 4.4 搜索

知识库产品如果没有搜索，通常很难形成完整产品体验。

Confluence、Outline、Slab 都把搜索放在主入口位置。

结论：

- 搜索不是锦上添花
- 它是 Memora 从“可演示”走向“可使用”的关键能力

### 4.5 版本与恢复

主流知识库产品通常都会提供：

- 自动历史
- 可视化差异
- 恢复且不破坏原历史

结论：

- Memora 当前的快照与回滚方向是对的
- 下一步应补更清晰的 diff、版本点和操作原因

### 4.6 本地优先方向

多数在线知识库产品并不把本地目录同步作为主能力。  
AppFlowy 更接近本地优先，但重点在多端数据同步，而不是企业知识治理。

结论：

- 本地优先能力可以作为后续外围方向参考
- 但它不属于当前 Web 主线，不应影响当前产品收敛

---

## 5. 对 Memora 的设计取舍

### 5.1 当前应该吸收的

- 借鉴 Confluence 的企业治理思路
- 借鉴 Outline 的知识库产品形态与阅读体验
- 借鉴 Slab 的搜索优先思路
- 借鉴 AppFlowy 的本地优先产品思路

### 5.2 当前不应过早做的

- 扩成 Notion 式通用工作平台
- 在完整权限前先做外部分享
- 在没有 diff 与冲突模型前先做自动同步
- 在知识库主链路未稳前重新拉回 AI / 资源库 / 技能市场叙事

### 5.3 合理目标形态

Memora 更适合发展成：

`企业知识库 + 文档工作区`

而不是：

- 通用块编辑器平台
- 大而全协作办公套件
- AI 优先内容平台

---

## 6. 当前设计结论

结合业界产品，Memora 当前应坚持：

- 保留 `Tenant -> KnowledgeBase -> Document`
- 权限继续收敛到 `KnowledgeBase`
- 阅读入口与发布入口分离
- 搜索进入下一阶段高优先级
- 是否恢复本地同步方向，放到后续独立评估

---

## 7. 参考来源

以下是本轮整理时使用的主要官方来源。

### 7.1 Notion

- Notion Wikis: https://www.notion.com/product/wikis
- Notion Wikis and Verified Pages: https://www.notion.com/help/wikis-and-verified-pages
- Notion Sharing and Permissions: https://www.notion.com/help/sharing-and-permissions

### 7.2 Confluence

- Confluence Knowledge Base: https://www.atlassian.com/software/confluence/knowledge-base
- Confluence Guide: https://www.atlassian.com/software/confluence/resources/guides/best-practices/knowledge-base
- Atlassian Support: https://support.atlassian.com/

### 7.3 Outline

- Outline Product: https://www.getoutline.com/
- Outline Documentation: https://docs.getoutline.com/
- Outline Changelog, Document Permissions: https://www.getoutline.com/changelog/document-permissions
- Outline Changelog, Collection Sharing: https://www.getoutline.com/changelog/collection-sharing

### 7.4 Docmost

- Docmost Docs: https://docmost.com/docs/
- Docmost Spaces: https://docmost.com/docs/user-guide/spaces
- Docmost Page Permissions: https://docmost.com/docs/user-guide/pages/page-permissions

### 7.5 Slab

- Slab Knowledge Base: https://slab.com/solutions/knowledge-base/
- Slab Topic Permissions: https://help.slab.com/en/articles/2677456-topic-permissions
- Slab Search: https://help.slab.com/en/articles/3936158-searching-slab-content

### 7.6 AppFlowy

- AppFlowy Product: https://appflowy.com/
- AppFlowy Docs: https://docs.appflowy.io/docs
- AppFlowy Web Publish Update: https://appflowy.com/blog/AppFlowy_is_now_right_in_your_browser
