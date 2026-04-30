import dayjs from 'dayjs'
import styles from './DocumentVersionList.module.css'

const DocumentVersionList = ({
  versions,
  loading,
  comparingVersionId,
  rollingBackVersionId,
  canRollback = true,
  onToggleCompare,
  onRollback,
  loadingMessage = '正在加载版本记录...',
  emptyMessage = '当前文档还没有可展示的历史版本。',
}) => {
  if (loading) {
    return <div className={styles.emptyState}>{loadingMessage}</div>
  }

  if (versions.length === 0) {
    return <div className={styles.emptyState}>{emptyMessage}</div>
  }

  return (
    <div className={styles.list}>
      {versions.map((version) => (
        <article key={version.id} className={styles.item}>
          <div className={styles.top}>
            <div className={styles.identity}>
              <strong className={styles.label}>v{version.version}</strong>
              <span className={styles.time}>{dayjs(version.createdAt).format('MM-DD HH:mm')}</span>
            </div>
            <div className={styles.actions}>
              <button
                type="button"
                className={`${styles.actionButton} ${comparingVersionId === version.id ? styles.actionButtonActive : ''}`}
                onClick={() => onToggleCompare(version.id)}
              >
                {comparingVersionId === version.id ? '收起对比' : '对比'}
              </button>
              <button
                type="button"
                className={styles.actionButton}
                disabled={!canRollback || rollingBackVersionId === version.id}
                onClick={() => onRollback(version.id)}
              >
                {rollingBackVersionId === version.id ? '回滚中...' : '回滚'}
              </button>
            </div>
          </div>
          <p className={styles.remark}>{version.remark || '自动快照'}</p>
          <div className={styles.meta}>
            <span>{version.format}</span>
            <span className={styles.metaDivider} aria-hidden="true" />
            <span>操作人 {version.userId}</span>
          </div>
          <div className={styles.preview}>
            {version.contentText || version.content || '当前版本未记录正文摘要。'}
          </div>
        </article>
      ))}
    </div>
  )
}

export default DocumentVersionList
