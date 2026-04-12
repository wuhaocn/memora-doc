# Memora Web UI 状态记录

更新日期：2026-04-12

## 当前阶段结论

`memora-web-app` 当前已经从“知识库后台详情页”明显收敛到“知识文档工作区”方向，页面主链路已稳定为：

`登录 -> 工作台 -> 进入知识库 -> 新建文档 -> 编辑 -> 阅读/分享 -> 查看版本`

这一轮重点不是补功能，而是连续多轮把界面节奏、文案和页面结构往飞书知识文档的使用方式靠拢。

## 本轮已完成

### 1. 页面结构已经收敛到文档工作区

- 登录页改成轻量工作区入口，不再像传统后台登录卡片。
- 工作台首页改成最近文档优先，知识库入口次级呈现。
- 知识库详情页改成左侧文档树、中部文档主舞台、右侧按需辅助栏。
- 文档阅读页和文档编辑页都切成独立页面，不再混在知识库详情页里。
- 404 页面已经替换为项目自定义页面，不再依赖 Arco 默认结果页。

### 2. 文案体系已经统一

当前主流程按钮和动作命名已经统一到以下集合：

- `进入知识库`
- `新建知识库`
- `新建文档`
- `新建目录`
- `继续编辑`
- `阅读文档`
- `分享文档`
- `查看版本`
- `返回知识库`
- `知识库设置`
- `访问权限`

已经清掉一批偏后台、偏英文或偏管理台的辅助标题和动作文案。

### 3. 视觉体系已经切到统一的蓝灰白工作区风格

- 页面背景、纸面正文、浮层、抽屉、侧栏已经统一为浅灰工作区底色 + 白色文档纸面。
- 主按钮、选中态、当前态、展开态统一使用蓝色高亮。
- 全局头部、知识库侧栏、首页卡片、知识库页 hero、阅读页和编辑页的顶条都已经减重。
- 版本列表、版本 diff、分享抽屉、知识库创建/整理/权限弹窗已经统一到同一套按钮 token。

### 4. 低频信息已经降级为按需查看

- 同步记录默认折叠。
- 协作成员默认折叠。
- 权限配置通过独立弹窗处理。
- 文档版本改成右侧按需展开抽屉，不再常驻占位。
- 知识库说明改成按需展开。

### 5. 文档编辑页已经修正为更稳定的顺序

- 编辑页头部、反馈提示、正文和版本抽屉已经统一到同一套版心逻辑。
- 未展开版本时使用窄版心；展开版本时自动切到宽版心。
- 编辑器工具条已经重新分组为结构工具、格式工具、插入工具，减少“按钮乱序感”。
- 编辑器底部动作区已补说明文案和独立操作区。

### 6. 表单与控件层已经统一

已补统一的全局 field token，并应用到：

- 知识库创建/设置弹窗
- 文档新建/整理弹窗
- 知识库权限配置弹窗

当前输入框、文本域、下拉、勾选、单选、禁用态、focus ring 都已经统一到一套规则。

### 7. 左侧文档树已经进一步减重

- 选中态更轻，不再像后台列表高亮块。
- 批量模式入口更弱化，只有需要时才突出。
- 目录层级线、目录展开符、勾选框、hover 态、当前项态都已统一。
- 搜索只按标题过滤，减少干扰。

## 当前仍然没完成的部分

### 1. 编辑器能力仍是基础版

- 还没有真正完善的高级编辑体验。
- 还没有协同编辑。
- Mermaid/图片等插入能力是可用但仍偏基础。

### 2. 权限和同步仍偏“基础入口”

- 权限异常反馈还可以更细。
- 同步冲突和同步异常的可视化仍不完整。
- 公开匿名分享仍未补完。

### 3. 搜索体系仍不完整

- 首页和知识库页的搜索仍是轻量版。
- 还没有跨知识库、跨文档的统一搜索。
- 还没有更细粒度过滤和排序。

## 已验证

本轮界面收敛过程中，当前工作区已反复通过以下验证：

- `git diff --check`
- `npm run lint`
- `npm run build`

截至 2026-04-12，最近一轮修改后的校验仍已通过。

## 建议的下一步

### 优先级最高

1. 继续细抠左侧文档树。
   重点看多层目录时的缩进、展开符、当前项、hover、批量态，进一步贴近飞书知识文档的轻量目录体验。

2. 继续收编辑页。
   重点看窄屏下工具条折行、顶部动作区优先级、右侧版本栏与正文区的对齐关系。

### 第二优先级

1. 把所有弹窗和抽屉继续飞书化。
   重点是字段分组、辅助说明、footer 节奏、单选/勾选的视觉反馈。

2. 补一轮全站实际走查。
   重点页面：
   - `/login`
   - `/`
   - `/kb/:id`
   - `/docs/:documentId`
   - `/docs/:documentId/edit`

### 功能层后续

1. 搜索和过滤体系
2. 更完整的权限反馈
3. 同步冲突和异常 UI
4. 更完整的版本能力
5. 公开分享能力

## 相关文件

本轮改动主要集中在这些页面和组件：

- `src/pages/Auth/LoginPage.jsx`
- `src/pages/Auth/LoginPage.module.css`
- `src/pages/Home/Home.jsx`
- `src/pages/Home/Home.module.css`
- `src/pages/KnowledgeBase/KnowledgeBaseDetail.jsx`
- `src/pages/KnowledgeBase/KnowledgeBaseDetail.module.css`
- `src/pages/Document/DocumentReaderPage.jsx`
- `src/pages/Document/DocumentReaderPage.module.css`
- `src/pages/Document/DocumentEditorPage.jsx`
- `src/pages/Document/DocumentEditorPage.module.css`
- `src/components/Document/DocumentRichEditor.jsx`
- `src/components/Document/DocumentRichEditor.module.css`
- `src/components/Document/DocumentVersionList.module.css`
- `src/components/Document/DocumentVersionDiff.module.css`
- `src/components/Document/DocumentShareDrawer.module.css`
- `src/components/Document/DocumentActionModal.module.css`
- `src/components/KnowledgeBase/KnowledgeBaseFormModal.module.css`
- `src/components/KnowledgeBase/KnowledgeBasePermissionModal.module.css`
- `src/components/Layout/Header.module.css`
- `src/components/Layout/Sidebar.module.css`
- `src/styles/global.css`
