import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import styles from './LoginPage.module.css'

const LoginPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, login, sessionLoading } = useAuth()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('123456')
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const from = location.state?.from || '/'

  if (!sessionLoading && isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setSubmitting(true)
      setErrorMessage('')
      await login({ username: username.trim(), password })
      navigate(from, { replace: true })
    } catch (error) {
      setErrorMessage(error?.message || '登录失败，请稍后重试')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.hero}>
          <p className={styles.eyebrow}>Memora 文档工作区</p>
          <h1 className={styles.title}>进入知识与文档工作台</h1>
          <p className={styles.description}>
            在同一个工作区里继续管理知识库、撰写文档、查看版本并分享内容。当前登录页保持轻量，只保留进入主流程所需的信息。
          </p>
          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <strong>知识库</strong>
              <span>继续进入最近使用的知识库</span>
            </div>
            <div className={styles.featureItem}>
              <strong>文档</strong>
              <span>从新建到编辑、阅读、分享一条线完成</span>
            </div>
            <div className={styles.featureItem}>
              <strong>版本</strong>
              <span>按需查看历史，不干扰当前写作流程</span>
            </div>
          </div>
          <div className={styles.demoTip}>
            <span className={styles.demoLabel}>演示账号</span>
            <strong>admin / 123456</strong>
            <span>登录后会直接进入文档工作区布局。</span>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <p className={styles.formEyebrow}>登录</p>
            <h2 className={styles.formTitle}>继续进入工作区</h2>
            <p className={styles.formDescription}>使用当前租户账号进入知识库与文档页面。</p>
          </div>
          <label className={styles.field}>
            <span>用户名</span>
            <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="请输入用户名" />
          </label>
          <label className={styles.field}>
            <span>密码</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="请输入密码"
            />
          </label>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          <button type="submit" className={styles.submitButton} disabled={submitting || sessionLoading}>
            {submitting ? '登录中...' : '进入工作区'}
          </button>
          <p className={styles.submitHint}>默认提供演示账号，后续可在这里接入真实认证。</p>
        </form>
      </section>
    </div>
  )
}

export default LoginPage
