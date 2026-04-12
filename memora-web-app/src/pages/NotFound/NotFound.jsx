import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>页面不存在</p>
        <h1 className={styles.title}>404</h1>
        <p className={styles.description}>当前地址没有对应内容。可以先回到首页，再继续进入知识库或文档页面。</p>
        <div className={styles.actions}>
          <Link to="/" className={styles.primaryButton}>
            返回首页
          </Link>
        </div>
      </section>
    </div>
  )
}

export default NotFound
