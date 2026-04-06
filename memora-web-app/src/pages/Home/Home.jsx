import { useDeferredValue, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { useAuth } from '../../contexts/AuthContext'
import KnowledgeBaseFormModal from '../../components/KnowledgeBase/KnowledgeBaseFormModal'
import { knowledgeBaseApi } from '../../services/api/knowledgeBaseApi'
import { workspaceApi } from '../../services/api/workspaceApi'
import { emitKnowledgeBasesChanged } from '../../utils/knowledgeBaseEvents'
import styles from './Home.module.css'

const STATUS_LABELS = {
  SYNCED: '已同步',
  PENDING: '待同步',
  DISABLED: '未启用',
  IDLE: '空闲',
}

const ROLE_LABELS = {
  OWNER: '所有者',
  ADMIN: '管理员',
  EDITOR: '编辑者',
  REVIEWER: '审核者',
  VIEWER: '只读',
}

const Home = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [modalMode, setModalMode] = useState('create')
  const [editingKnowledgeBase, setEditingKnowledgeBase] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [modalError, setModalError] = useState('')
  const [feedback, setFeedback] = useState(null)
  const deferredKeyword = useDeferredValue(keyword)
  const canCreateKnowledgeBase = ['OWNER', 'EDITOR'].includes(currentUser.role)

  const loadDashboard = async () => {
    try {
      setLoading(true)
      const response = await workspaceApi.getCurrentDashboard()
      if (response.code === 200) {
        setDashboard(response.data)
      }
    } catch (error) {
      console.error('加载工作台失败', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [currentUser.id, currentUser.tenantId])

  const openCreateModal = () => {
    setModalMode('create')
    setEditingKnowledgeBase(null)
    setModalError('')
    setModalOpen(true)
  }

  const openEditModal = (knowledgeBase, event) => {
    event.stopPropagation()
    setModalMode('edit')
    setEditingKnowledgeBase(knowledgeBase)
    setModalError('')
    setModalOpen(true)
  }

  const handleSubmitKnowledgeBase = async (formData) => {
    try {
      setSubmitting(true)
      setModalError('')
      if (modalMode === 'create') {
        const response = await knowledgeBaseApi.createKnowledgeBase({
          ...formData,
          tenantId: currentUser.tenantId,
        })
        const createdKnowledgeBaseId = response?.data?.id
        setFeedback({ type: 'success', message: `知识库“${formData.name}”已创建` })
        setModalOpen(false)
        await loadDashboard()
        emitKnowledgeBasesChanged()
        if (createdKnowledgeBaseId) {
          navigate(`/kb/${createdKnowledgeBaseId}`)
        }
        return
      } else if (editingKnowledgeBase) {
        await knowledgeBaseApi.updateKnowledgeBase(editingKnowledgeBase.id, formData)
        setFeedback({ type: 'success', message: `知识库“${formData.name}”已更新` })
      }
      setModalOpen(false)
      await loadDashboard()
      emitKnowledgeBasesChanged()
    } catch (error) {
      console.error('保存知识库失败', error)
      setModalError(error?.message || '保存知识库失败，请稍后重试')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteKnowledgeBase = async (knowledgeBase, event) => {
    event.stopPropagation()
    if (!window.confirm(`确认删除知识库“${knowledgeBase.name}”吗？`)) {
      return
    }

    try {
      await knowledgeBaseApi.deleteKnowledgeBase(knowledgeBase.id)
      await loadDashboard()
      emitKnowledgeBasesChanged()
      setFeedback({ type: 'success', message: `知识库“${knowledgeBase.name}”已删除` })
    } catch (error) {
      console.error('删除知识库失败', error)
      setFeedback({ type: 'error', message: error?.message || '删除知识库失败，请稍后重试' })
    }
  }

  const knowledgeBases = (dashboard?.knowledgeBases || []).filter((item) => {
    if (!deferredKeyword.trim()) {
      return true
    }
    const search = deferredKeyword.toLowerCase()
    return item.name.toLowerCase().includes(search) || (item.description || '').toLowerCase().includes(search)
  })

  if (loading) {
    return <div className={styles.state}>正在加载工作台...</div>
  }

  if (!dashboard) {
    return <div className={styles.state}>当前工作台不可用</div>
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Workspace Dashboard</p>
          <h1 className={styles.title}>{dashboard.workspace.name}</h1>
          <p className={styles.description}>
            面向 {dashboard.workspace.industry} 场景的在线文档系统，统一管理多租户知识资产、文档树和本地文件同步任务。
          </p>
        </div>
        <div className={styles.heroActions}>
          <input
            className={styles.search}
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="搜索知识库或业务主题"
          />
          <button
            type="button"
            className={styles.primaryButton}
            onClick={openCreateModal}
            disabled={!canCreateKnowledgeBase}
          >
            新建知识库
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => {
              if (knowledgeBases[0]) {
                navigate(`/kb/${knowledgeBases[0].id}`)
              }
            }}
          >
            进入知识库
          </button>
        </div>
      </section>

      <section className={styles.metrics}>
        {feedback && (
          <div className={`${styles.feedback} ${feedback.type === 'error' ? styles.feedbackError : styles.feedbackSuccess}`}>
            {feedback.message}
          </div>
        )}
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>知识库</span>
          <strong className={styles.metricValue}>{dashboard.knowledgeBaseCount}</strong>
          <span className={styles.metricHint}>按租户统一编排</span>
        </article>
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>在线文档</span>
          <strong className={styles.metricValue}>{dashboard.documentCount}</strong>
          <span className={styles.metricHint}>目录 + 文档树管理</span>
        </article>
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>已启用同步</span>
          <strong className={styles.metricValue}>{dashboard.syncEnabledKnowledgeBaseCount}</strong>
          <span className={styles.metricHint}>对接本地项目目录</span>
        </article>
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>活跃成员</span>
          <strong className={styles.metricValue}>{dashboard.workspace.activeMemberCount}</strong>
          <span className={styles.metricHint}>多角色协作</span>
        </article>
      </section>

      <section className={styles.contentGrid}>
        <div className={styles.mainColumn}>
          <div className={styles.sectionHeader}>
            <h2>知识库矩阵</h2>
            <span>{knowledgeBases.length} 个结果</span>
          </div>
          <div className={styles.knowledgeGrid}>
            {knowledgeBases.map((item) => (
              <article
                key={item.id}
                className={styles.knowledgeCard}
                onClick={() => navigate(`/kb/${item.id}`)}
              >
                <div className={styles.knowledgeHeader}>
                  <div>
                    <div className={styles.knowledgeTitle}>{item.name}</div>
                    <div className={styles.knowledgeSlug}>/{item.slug}</div>
                  </div>
                  <span className={styles.statusTag}>{STATUS_LABELS[item.syncStatus] || item.syncStatus}</span>
                </div>
                <p className={styles.knowledgeDescription}>{item.description}</p>
                <div className={styles.knowledgeMeta}>
                  <span>{item.documentCount} 篇文档</span>
                  <span>{item.syncEnabled ? '已启用同步' : '手工维护'}</span>
                  <span>{ROLE_LABELS[item.currentRole] || item.currentRole || '未知角色'}</span>
                  <span>{item.permissionRestricted ? '已启用 KB 权限限制' : '继承租户权限'}</span>
                  <span>{item.lastSyncAt ? `同步于 ${dayjs(item.lastSyncAt).format('MM-DD HH:mm')}` : '尚未同步'}</span>
                </div>
                <div className={styles.knowledgeActions}>
                  <button
                    type="button"
                    className={styles.cardActionButton}
                    disabled={!item.canManage}
                    onClick={(event) => openEditModal(item, event)}
                  >
                    编辑
                  </button>
                  <button
                    type="button"
                    className={styles.cardActionButtonDanger}
                    disabled={!item.canManage}
                    onClick={(event) => handleDeleteKnowledgeBase(item, event)}
                  >
                    删除
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className={styles.sideColumn}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>最近同步</h2>
              <span>{dashboard.pendingSyncJobCount} 个异常任务</span>
            </div>
            <div className={styles.timeline}>
              {(dashboard.recentSyncJobs || []).map((job) => (
                <article key={job.id} className={styles.timelineItem}>
                  <div className={styles.timelineStatus}>{job.status}</div>
                  <div className={styles.timelineBody}>
                    <div className={styles.timelineTitle}>{job.localPath}</div>
                    <p className={styles.timelineText}>{job.message}</p>
                    <span className={styles.timelineMeta}>
                      扫描 {job.scannedCount} / 变更 {job.changedCount} / {dayjs(job.createdAt).format('MM-DD HH:mm')}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>协作角色</h2>
              <span>{dashboard.members.length} 人</span>
            </div>
            <div className={styles.memberList}>
              {(dashboard.members || []).map((member) => (
                <div key={member.id} className={styles.memberItem}>
                  <div className={styles.memberAvatar}>{member.displayName.charAt(0)}</div>
                  <div>
                    <div className={styles.memberName}>{member.displayName}</div>
                    <div className={styles.memberMeta}>
                      {member.role} · {dayjs(member.lastActiveAt).format('MM-DD HH:mm')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <KnowledgeBaseFormModal
        mode={modalMode}
        open={modalOpen}
        initialValues={editingKnowledgeBase}
        submitting={submitting}
        errorMessage={modalError}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitKnowledgeBase}
      />
    </div>
  )
}

export default Home
