import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import styles from './Layout.module.css'

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className={styles.layout}>
      <Header onToggleSidebar={() => setSidebarCollapsed((value) => !value)} />
      <div className={styles.shell}>
        <Sidebar collapsed={sidebarCollapsed} />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
