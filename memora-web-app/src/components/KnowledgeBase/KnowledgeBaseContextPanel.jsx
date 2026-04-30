const KnowledgeBaseContextPanel = ({
  styles,
  knowledgeBase,
  documents,
  selectedDocument,
  canWriteKnowledgeBase,
  canManageKnowledgeBase,
}) => {
  const folderCount = documents.filter((item) => item.docType === 'FOLDER').length
  const documentCount = documents.filter((item) => item.docType === 'DOC').length
  const capabilitySummary = [
    canWriteKnowledgeBase ? '可编辑' : '只读访问',
    canManageKnowledgeBase ? '可管理知识库' : '无管理权限',
  ].join(' · ')

  return (
    <aside className={styles.contextPanel}>
      <details className={styles.syncDisclosure} open>
        <summary className={styles.syncDisclosureSummary}>
          <div className={styles.syncSummaryMain}>
            <span className={styles.syncSummaryEyebrow}>知识库上下文</span>
            <strong className={styles.syncSummaryTitle}>当前工作区以阅读、编辑和目录整理为主</strong>
            <span className={styles.syncSummaryMeta}>{capabilitySummary}</span>
            <span className={styles.syncSummaryHint}>
              {knowledgeBase.description?.trim() || '当前知识库还没有补充说明，可在知识库设置中完善描述。'}
            </span>
          </div>
          <span className={styles.contextBadge}>{knowledgeBase.currentRole || 'UNKNOWN'}</span>
        </summary>

        <div className={styles.syncPanel}>
          <div className={styles.panelHeader}>
            <div>
              <h2>当前概览</h2>
              <span className={styles.panelHint}>这里展示知识库边界、内容规模和当前节点信息。</span>
            </div>
          </div>

          <div className={styles.syncList}>
            <article className={styles.syncItem}>
              <div className={styles.syncTop}>
                <span>知识库信息</span>
                <span className={styles.contextBadge}>{knowledgeBase.permissionRestricted ? '独立权限' : '继承租户权限'}</span>
              </div>
              <div className={styles.syncMessage}>{knowledgeBase.name}</div>
              <div className={styles.syncMeta}>
                <span className={styles.metaPill}>{documentCount} 篇文档</span>
                <span className={styles.metaPill}>{folderCount} 个目录</span>
              </div>
            </article>
            <article className={styles.syncItem}>
              <div className={styles.syncTop}>
                <span>当前节点</span>
                <span className={styles.contextBadge}>{selectedDocument?.docType === 'FOLDER' ? '目录' : '文档'}</span>
              </div>
              <div className={styles.syncMessage}>
                {selectedDocument?.title || '当前还没有选中文档节点。'}
              </div>
              <div className={styles.syncMeta}>
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
