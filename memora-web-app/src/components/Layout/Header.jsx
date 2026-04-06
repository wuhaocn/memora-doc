import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IconMenuFold, IconMenuUnfold, IconHome, IconFolder } from '@arco-design/web-react/icon'
import { Avatar } from '@arco-design/web-react'
import { useAuth } from '../../contexts/AuthContext'
import { useKnowledgeBaseNavigation } from '../../hooks/useKnowledgeBaseNavigation'
import { getRememberedKnowledgeBaseId } from '../../utils/knowledgeBaseRoute'
import styles from './Header.module.css'

const Header = ({ onToggleSidebar }) => {
  const location = useLocation()
  const { currentUser, logout } = useAuth()
  const { knowledgeBases } = useKnowledgeBaseNavigation(currentUser.tenantId, {
    errorMessage: '加载头部知识库导航失败',
  })

  const currentKnowledgeBaseRoute = useMemo(() => {
    if (location.pathname.startsWith('/kb/')) {
      return location.pathname
    }

    const rememberedKnowledgeBaseId = getRememberedKnowledgeBaseId()
    const rememberedKnowledgeBase = knowledgeBases.find((item) => item.id === rememberedKnowledgeBaseId)
    if (rememberedKnowledgeBase) {
      return `/kb/${rememberedKnowledgeBase.id}`
    }

    if (knowledgeBases[0]?.id) {
      return `/kb/${knowledgeBases[0].id}`
    }

    return '/'
  }, [knowledgeBases, location.pathname])

  const navItems = [
    { to: '/', label: '工作台', icon: <IconHome /> },
    { to: currentKnowledgeBaseRoute, label: '在线文档', icon: <IconFolder /> },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuButton} onClick={onToggleSidebar} type="button" aria-label="切换侧边栏">
          {location.pathname.startsWith('/kb/') ? <IconMenuFold /> : <IconMenuUnfold />}
        </button>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark}>M</span>
          <div>
            <div className={styles.brandName}>Memora Studio</div>
            <div className={styles.brandMeta}>{currentUser.tenantName}</div>
          </div>
        </Link>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const active = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith('/kb/')
          return (
            <Link key={item.to} to={item.to} className={`${styles.navLink} ${active ? styles.active : ''}`}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className={styles.right}>
        <div className={styles.workspaceBadge}>
          <span className={styles.workspaceLabel}>Plan</span>
          <span className={styles.workspaceValue}>{currentUser.planName || 'Enterprise'}</span>
        </div>
        <div className={styles.userCard}>
          <Avatar size={34} className={styles.avatar}>
            {currentUser.nickname.charAt(0)}
          </Avatar>
          <div>
            <div className={styles.userName}>{currentUser.nickname}</div>
            <div className={styles.userMeta}>
              {currentUser.username} / {currentUser.role}
            </div>
          </div>
        </div>
        <button type="button" className={styles.logoutButton} onClick={logout}>
          退出
        </button>
      </div>
    </header>
  )
}

export default Header
