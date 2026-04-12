import styles from './DocumentVersionDiff.module.css'

const DocumentVersionDiff = ({
  title = '版本对比',
  subtitle,
  rows,
  emptyMessage = '当前版本和历史版本内容一致。',
}) => {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2>{title}</h2>
        {subtitle ? <span>{subtitle}</span> : null}
      </div>
      <div className={styles.legend}>
        <span className={styles.sameLegend}>未变化</span>
        <span className={styles.addedLegend}>历史版本新增</span>
        <span className={styles.removedLegend}>当前版本新增</span>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>当前版本</span>
          <span>历史版本</span>
        </div>
        {rows.length > 0 ? (
          rows.map((row, index) => (
            <div key={`${row.type}-${index}`} className={styles.row}>
              <div className={`${styles.cell} ${styles[`cell${row.type}`]}`}>
                {row.currentLine || <span className={styles.emptyLine}>∅</span>}
              </div>
              <div className={`${styles.cell} ${styles[`cell${row.type}`]}`}>
                {row.targetLine || <span className={styles.emptyLine}>∅</span>}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>{emptyMessage}</div>
        )}
      </div>
    </div>
  )
}

export default DocumentVersionDiff
