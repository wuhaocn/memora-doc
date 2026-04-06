import { Link, useLocation } from 'react-router-dom'
import { IconFolder, IconSync } from '@arco-design/web-react/icon'
import { useAuth } from '../../contexts/AuthContext'
import { useKnowledgeBaseNavigation } from '../../hooks/useKnowledgeBaseNavigation'
import styles from './Sidebar.module.css'

const Sidebar = ({ collapsed }) => {
  const location = useLocation()
  const { currentUser } = useAuth()
  const { knowledgeBases } = useKnowledgeBaseNavigation(currentUser.tenantId, {
    errorMessage: '加载知识库失败',
  })

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.panel}>
        <div className={styles.panelLabel}>当前租户</div>
        <div className={styles.panelTitle}>{currentUser.tenantName}</div>
        {!collapsed && <div className={styles.panelMeta}>多租户在线文档与知识管理</div>}
      </div>

      <div className={styles.sectionTitle}>知识库</div>
      <div className={styles.list}>
        {knowledgeBases.map((kb) => (
          <Link
            key={kb.id}
            to={`/kb/${kb.id}`}
            className={`${styles.item} ${location.pathname === `/kb/${kb.id}` ? styles.active : ''}`}
          >
            <div className={styles.itemIcon}>
              <IconFolder />
            </div>
            {!collapsed && (
              <div className={styles.itemContent}>
                <div className={styles.itemTitle}>{kb.name}</div>
                <div className={styles.itemMeta}>
                  <span>{kb.documentCount} 篇文档</span>
                  <span className={`${styles.syncDot} ${styles[`sync${kb.syncStatus || 'IDLE'}`]}`} />
                  <span>{kb.syncStatus || 'IDLE'}</span>
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>

      {!collapsed && (
        <div className={styles.footer}>
          <div className={styles.footerTitle}>
            <IconSync />
            <span>同步原则</span>
          </div>
          <p className={styles.footerText}>
            本地目录用于批量导入与增量更新，线上知识库仍然是统一发布面，避免多副本失控。
          </p>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
