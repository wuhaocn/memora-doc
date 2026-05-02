# Memora Web UI 状态记录

更新日期：2026-04-29

说明：

- 这是一份阶段性 UI 收口记录，不是产品或技术事实的 canonical 文档。
- 当前产品范围与技术边界以仓库根 README 和 `doc/` 下 canonical 文档为准。

## 当前阶段结论

`memora-web-app` 当前已经从“知识库后台详情页”明显收敛到“知识文档工作区”方向，页面主链路已稳定为：

`登录 -> 工作台 -> 进入知识库 -> 新建文档 -> 编辑 -> 复制阅读链接 -> 查看版本`

这一轮重点不是补功能，而是连续多轮把界面节奏、文案和页面结构往知识文档工作区的使用方式靠拢，同时清掉会误导成“公开分享”的旧口径。

## 本轮已完成

### 1. 页面结构已经收敛到文档工作区

- 登录页改成轻量工作区入口，不再像传统后台登录卡片。
- 工作台首页改成最近文档优先，知识库入口次级呈现。
- 知识库详情页改成左侧文档树、中部文档主舞台、右侧按需辅助栏。
- 知识库详情页已拆分为页面容器、树面板、文档面板、页面控制 Hook 和树纯工具函数。
- 文档阅读页和文档编辑页都切成独立页面，不再混在知识库详情页里。

### 2. 文案体系已经统一

当前主流程按钮和动作命名已经统一到以下集合：

- `进入知识库`
- `新建知识库`
- `新建文档`
- `新建目录`
- `继续编辑`
- `阅读文档`
- `复制阅读链接`
- `查看版本`
- `返回知识库`
- `知识库设置`
- `访问权限`

已经清掉一批偏后台、偏英文或把阅读入口误写成分享能力的辅助标题和动作文案。

### 3. 视觉体系已经切到统一的蓝灰白工作区风格

- 页面背景、纸面正文、浮层、抽屉、侧栏已经统一为浅灰工作区底色 + 白色文档纸面。
- 主按钮、选中态、当前态、展开态统一使用蓝色高亮。
- 全局头部、知识库侧栏、首页卡片、阅读页和编辑页的顶条都已经减重。
- 版本列表、版本 diff、阅读链接抽屉、知识库创建/整理/权限弹窗已经统一到同一套按钮 token。

### 4. 低频信息已经降级为按需查看

- 协作成员默认折叠。
- 权限配置通过独立弹窗处理。
- 文档版本改成右侧按需展开抽屉，不再常驻占位。
- 知识库说明改成按需展开。

### 5. 阅读和安全口径已经收敛

- 文档入口已经明确为“独立阅读页 + 当前登录态鉴权”。
- 富文本 HTML 已统一走 sanitize 处理，不再直接渲染不可信内容。
- 阅读链接只是当前登录态下的直达入口，不代表公开访问控制已经生产可用。

## 下一阶段待补的部分

### 1. 编辑器能力仍是基础版

- 还没有真正完善的高级编辑体验。
- 还没有协同编辑。
- Mermaid/图片等插入能力是可用但仍偏基础。

### 2. 权限仍偏“基础入口”

- 权限异常反馈还可以更细。
- 还没有真正的受控阅读入口和撤销/过期策略。

### 3. 轻量筛选之外的搜索体系仍未建设

- 首页和知识库页当前只有轻量筛选。
- 还没有跨知识库、跨文档的统一搜索。
- 还没有更细粒度过滤和排序。

## 已验证

当前这一轮收敛后，Web 端已完成：

- `npm run lint`
- `npm run build`

## 建议的下一步

### 优先级最高

1. 继续增强权限反馈和拒绝路径。
2. 继续收编辑页和版本侧栏的对齐与密度。
3. 继续完善阅读态、编辑态和权限态之间的状态反馈。

### 功能层后续

1. 搜索和过滤体系
2. 更完整的权限反馈
3. 更完整的版本能力
4. 受控阅读入口

## 相关文件

- `src/pages/Home/Home.jsx`
- `src/pages/KnowledgeBase/KnowledgeBaseDetail.jsx`
- `src/pages/Document/DocumentReaderPage.jsx`
- `src/pages/Document/DocumentEditorPage.jsx`
- `src/components/KnowledgeBase/KnowledgeBaseTreePanel.jsx`
- `src/components/KnowledgeBase/KnowledgeBaseDocumentPanel.jsx`
- `src/components/Document/DocumentReadLinkDrawer.jsx`
- `src/components/Document/DocumentVersionList.jsx`
- `src/components/Document/DocumentVersionDiff.jsx`
- `src/hooks/useKnowledgeBaseDetailController.js`
- `src/utils/knowledgeBaseTree.js`
- `src/utils/documentContent.js`
