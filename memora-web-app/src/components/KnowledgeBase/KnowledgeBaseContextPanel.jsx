const KnowledgeBaseContextPanel = ({
  styles,
  knowledgeBase,
  documents,
  selectedDocument,
  canWriteKnowledgeBase,
  canManageKnowledgeBase,
  roleLabels,
}) => {
  const folderCount = documents.filter((item) => item.docType === 'FOLDER').length
  const documentCount = documents.filter((item) => item.docType === 'DOC').length
  const capabilitySummary = [
    canWriteKnowledgeBase ? '可编辑' : '只读访问',
    canManageKnowledgeBase ? '可管理知识库' : '无管理权限',
  ].join(' · ')
  const currentRoleLabel = roleLabels?.[knowledgeBase.currentRole] || knowledgeBase.currentRole || '未知角色'
  const selectedDocumentTypeLabel = selectedDocument
    ? selectedDocument.docType === 'FOLDER'
      ? '目录'
      : '文档'
    : '未选择'

  return (
    <aside className={styles.contextPanel}>
      <details className={styles.contextDisclosure} open>
        <summary className={styles.contextDisclosureSummary}>
          <div className={styles.contextSummaryMain}>
            <span className={styles.contextSummaryEyebrow}>知识库上下文</span>
            <strong className={styles.contextSummaryTitle}>当前工作区以阅读、编辑和目录整理为主</strong>
            <span className={styles.contextSummaryMeta}>{capabilitySummary}</span>
            <span className={styles.contextSummaryHint}>
              {knowledgeBase.description?.trim() || '当前知识库还没有补充说明，可在知识库设置中完善描述。'}
            </span>
          </div>
          <span className={styles.contextBadge}>{currentRoleLabel}</span>
        </summary>

        <div className={styles.contextCard}>
          <div className={styles.panelHeader}>
            <div>
              <h2>当前概览</h2>
              <span className={styles.panelHint}>这里展示知识库边界、内容规模和当前节点信息。</span>
            </div>
          </div>

          <div className={styles.contextList}>
            <article className={styles.contextItem}>
              <div className={styles.contextItemTop}>
                <span>知识库信息</span>
                <span className={styles.contextBadge}>{knowledgeBase.permissionRestricted ? '独立权限' : '继承租户权限'}</span>
              </div>
              <div className={styles.contextMessage}>{knowledgeBase.name}</div>
              <div className={styles.contextMeta}>
                <span className={styles.metaPill}>{documentCount} 篇文档</span>
                <span className={styles.metaPill}>{folderCount} 个目录</span>
              </div>
            </article>
            <article className={styles.contextItem}>
              <div className={styles.contextItemTop}>
                <span>当前节点</span>
                <span className={styles.contextBadge}>{selectedDocumentTypeLabel}</span>
              </div>
              <div className={styles.contextMessage}>
                {selectedDocument?.title || '当前还没有选中文档节点。'}
              </div>
              <div className={styles.contextMeta}>
                <span className={styles.metaPill}>{canWriteKnowledgeBase ? '允许编辑' : '仅允许阅读'}</span>
                <span className={styles.metaPill}>{canManageKnowledgeBase ? '允许管理' : '不可管理'}</span>
              </div>
            </article>
          </div>
        </div>
      </details>
    </aside>
  )
}

export default KnowledgeBaseContextPanel
