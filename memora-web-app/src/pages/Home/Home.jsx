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
  const canCreateKnowledgeBase = ['OWNER', 'ADMIN', 'EDITOR'].includes(currentUser.role)

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

  const openKnowledgeBase = (knowledgeBaseId) => {
    navigate(`/kb/${knowledgeBaseId}`)
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
  const knowledgeBaseMap = new Map((dashboard?.knowledgeBases || []).map((item) => [item.id, item]))
  const recentDocuments = dashboard?.recentDocuments || []
  const lastEditedDocument = recentDocuments[0] || null
  const lastEditedKnowledgeBase = lastEditedDocument ? knowledgeBaseMap.get(lastEditedDocument.knowledgeBaseId) : null

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
          <p className={styles.eyebrow}>文档工作区</p>
          <h1 className={styles.title}>{dashboard.workspace.name}</h1>
          <p className={styles.description}>
            从最近文档继续编辑，需要新内容时再进入知识库整理。
          </p>
          <div className={styles.heroStats}>
            <span className={styles.heroStat}>知识库 {dashboard.knowledgeBaseCount}</span>
            <span className={styles.heroStat}>文档 {dashboard.documentCount}</span>
            <span className={styles.heroStat}>同步 {dashboard.syncEnabledKnowledgeBaseCount}</span>
          </div>
          {lastEditedDocument ? (
            <div className={styles.resumeCard}>
              <span className="ui-chip ui-chip-accent">上次编辑</span>
              <div className={styles.resumeTitle}>{lastEditedDocument.title}</div>
              <div className={styles.resumeMeta}>
                <span className="ui-chip">
                  {lastEditedKnowledgeBase?.name || `知识库 #${lastEditedDocument.knowledgeBaseId}`}
                </span>
                <span className="ui-chip">{dayjs(lastEditedDocument.updatedAt).format('MM-DD HH:mm')}</span>
              </div>
              <div className={styles.heroDocumentActions}>
                <button
                  type="button"
                  className={styles.heroDocumentPrimary}
                  onClick={() => navigate(`/docs/${lastEditedDocument.id}/edit`)}
                >
                  继续编辑
                </button>
                <button
                  type="button"
                  className={styles.heroDocumentSecondary}
                  onClick={() => navigate(`/docs/${lastEditedDocument.id}`)}
                >
                  阅读文档
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.resumeEmpty}>
              <strong>还没有最近文档</strong>
              <p>先新建知识库，再进入知识库写下第一篇文档。</p>
            </div>
          )}
        </div>
        <div className={styles.heroActions}>
          <span className={styles.heroActionsLabel}>快速开始</span>
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
              } else {
                openCreateModal()
              }
            }}
          >
            进入知识库
          </button>
        </div>
      </section>

      {feedback && (
        <section className={styles.metrics}>
          <div className={`${styles.feedback} ${feedback.type === 'error' ? styles.feedbackError : styles.feedbackSuccess}`}>
            {feedback.message}
          </div>
        </section>
      )}

      <section className={styles.contentGrid}>
        <div className={styles.mainColumn}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>最近文档</h2>
              <span>{recentDocuments.length} 篇</span>
            </div>
            <div className={styles.recentDocumentList}>
              {recentDocuments.length > 0 ? (
                recentDocuments.map((document, index) => {
                  const currentKnowledgeBase = knowledgeBaseMap.get(document.knowledgeBaseId)
                  return (
                    <article
                      key={document.id}
                      className={`${styles.recentDocumentItem} ${index === 0 ? styles.recentDocumentItemPrimary : ''}`}
                    >
                      <div className={styles.recentDocumentBody}>
                        {index === 0 && <span className="ui-chip ui-chip-accent">最近更新</span>}
                        <div className={styles.recentDocumentTitle}>{document.title}</div>
                        <div className={styles.recentDocumentMeta}>
                          <span className="ui-chip">
                            {currentKnowledgeBase?.name || `知识库 #${document.knowledgeBaseId}`}
                          </span>
                          <span className="ui-chip">{dayjs(document.updatedAt).format('MM-DD HH:mm')}</span>
                        </div>
                      </div>
                      <div className={styles.recentDocumentActions}>
                        <button
                          type="button"
                          className={styles.cardActionButton}
                          onClick={() => navigate(`/docs/${document.id}/edit`)}
                        >
                          继续编辑
                        </button>
                        <button
                          type="button"
                          className={styles.cardActionButton}
                          onClick={() => navigate(`/docs/${document.id}`)}
                        >
                          阅读文档
                        </button>
                      </div>
                    </article>
                  )
                })
              ) : (
                <div className={styles.emptyRecentDocuments}>
                  <strong>还没有最近文档</strong>
                  <p>先新建知识库，再进入知识库写下第一篇文档。</p>
                </div>
              )}
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>全部知识库</h2>
              <span>{knowledgeBases.length} 个</span>
            </div>
            <div className={styles.knowledgeToolbar}>
              <input
                className={styles.search}
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="搜索知识库名称"
              />
              <button
                type="button"
                className={styles.cardActionButton}
                onClick={openCreateModal}
                disabled={!canCreateKnowledgeBase}
              >
                新建知识库
              </button>
            </div>
            <div className={styles.knowledgeList}>
              {knowledgeBases.length > 0 ? (
                knowledgeBases.map((item) => (
                  <article
                    key={item.id}
                    className={styles.knowledgeRow}
                    onClick={() => openKnowledgeBase(item.id)}
                  >
                    <div className={styles.knowledgeRowMain}>
                      <div className={styles.knowledgeRowHead}>
                        <div className={styles.knowledgeTitle}>{item.name}</div>
                        <span className="ui-chip">{STATUS_LABELS[item.syncStatus] || item.syncStatus}</span>
                      </div>
                      <div className={styles.knowledgeMeta}>
                        <span className="ui-chip">{item.documentCount} 篇文档</span>
                        <span className="ui-chip">{item.syncEnabled ? '已连接同步' : '手工维护'}</span>
                        {item.lastSyncAt ? <span className="ui-chip">{dayjs(item.lastSyncAt).format('MM-DD HH:mm')}</span> : null}
                      </div>
                    </div>
                    <div className={styles.knowledgeActions}>
                      <button
                        type="button"
                        className={styles.cardActionButton}
                        onClick={(event) => {
                          event.stopPropagation()
                          openKnowledgeBase(item.id)
                        }}
                      >
                        进入知识库
                      </button>
                      <details className={styles.knowledgeMoreActions} onClick={(event) => event.stopPropagation()}>
                        <summary className={styles.cardActionButton}>更多</summary>
                        <div className={styles.knowledgeMoreMenu}>
                          <button
                            type="button"
                            className={styles.cardActionButton}
                            disabled={!item.canManage}
                            onClick={(event) => openEditModal(item, event)}
                          >
                            知识库设置
                          </button>
                          <button
                            type="button"
                            className={styles.cardActionButtonDanger}
                            disabled={!item.canManage}
                            onClick={(event) => handleDeleteKnowledgeBase(item, event)}
                          >
                            删除知识库
                          </button>
                        </div>
                      </details>
                    </div>
                  </article>
                ))
              ) : (
                <div className={styles.emptyRecentDocuments}>
                  <strong>没有匹配的知识库</strong>
                  <p>调整搜索词，或者直接新建知识库开始写作。</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className={styles.sideColumn}>
          <details className={styles.foldPanel}>
            <summary className={styles.foldSummary}>
              <div className={styles.foldSummaryMain}>
                <div className={styles.foldEyebrow}>低频信息</div>
                <h2>同步概览</h2>
                <span>{dashboard.pendingSyncJobCount} 个异常任务</span>
              </div>
              <span className={styles.foldHint}>按需查看</span>
            </summary>
            <div className={styles.timeline}>
              {(dashboard.recentSyncJobs || []).length > 0 ? (
                (dashboard.recentSyncJobs || []).map((job) => (
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
                ))
              ) : (
                <div className={styles.emptyRecentDocuments}>
                  <strong>暂无同步记录</strong>
                  <p>需要时再查看同步详情，默认不打扰文档主流程。</p>
                </div>
              )}
            </div>
          </details>

          <details className={styles.foldPanel}>
            <summary className={styles.foldSummary}>
              <div className={styles.foldSummaryMain}>
                <div className={styles.foldEyebrow}>低频信息</div>
                <h2>协作成员</h2>
                <span>{(dashboard.members || []).length} 人</span>
              </div>
              <span className={styles.foldHint}>按需查看</span>
            </summary>
            <div className={styles.memberList}>
              {(dashboard.members || []).length > 0 ? (
                (dashboard.members || []).map((member) => (
                  <div key={member.id} className={styles.memberItem}>
                    <div className={styles.memberAvatar}>{member.displayName.charAt(0)}</div>
                    <div>
                      <div className={styles.memberName}>{member.displayName}</div>
                      <div className={styles.memberMeta}>
                        {member.role} · {dayjs(member.lastActiveAt).format('MM-DD HH:mm')}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyRecentDocuments}>
                  <strong>暂无成员信息</strong>
                  <p>当前主流程只关注文档编辑，协作成员信息按需再展开查看。</p>
                </div>
              )}
            </div>
          </details>
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
