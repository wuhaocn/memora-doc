import { useEffect, useState } from 'react'
import styles from './KnowledgeBaseFormModal.module.css'

const DEFAULT_FORM = {
  name: '',
  slug: '',
  description: '',
  sourceType: 'MANUAL',
  syncEnabled: false,
  localRootPath: '',
  isPublic: false,
}

const KnowledgeBaseFormModal = ({
  mode = 'create',
  open,
  initialValues,
  submitting = false,
  errorMessage = '',
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState(DEFAULT_FORM)
  const [localError, setLocalError] = useState('')

  useEffect(() => {
    if (!open) {
      return
    }

    setLocalError('')
    setForm({
      name: initialValues?.name || '',
      slug: initialValues?.slug || '',
      description: initialValues?.description || '',
      sourceType: initialValues?.sourceType || 'MANUAL',
      syncEnabled: Boolean(initialValues?.syncEnabled),
      localRootPath: initialValues?.localRootPath || '',
      isPublic: Boolean(initialValues?.isPublic),
    })
  }, [initialValues, open])

  if (!open) {
    return null
  }

  const handleChange = (key, value) => {
    if (localError) {
      setLocalError('')
    }

    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.name.trim()) {
      setLocalError('知识库名称不能为空')
      return
    }
    if (form.syncEnabled && !form.localRootPath.trim()) {
      setLocalError('启用本地同步时必须填写本地根目录')
      return
    }

    await onSubmit({
      name: form.name.trim(),
      slug: form.slug.trim() || undefined,
      description: form.description.trim(),
      sourceType: form.sourceType,
      syncEnabled: form.syncEnabled ? 1 : 0,
      localRootPath: form.syncEnabled ? form.localRootPath.trim() : '',
      isPublic: form.isPublic ? 1 : 0,
    })
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{mode === 'create' ? 'Create Knowledge Base' : 'Update Knowledge Base'}</p>
            <h2 className={styles.title}>{mode === 'create' ? '新建知识库' : '编辑知识库'}</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            关闭
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>名称</span>
            <input
              value={form.name}
              onChange={(event) => handleChange('name', event.target.value)}
              placeholder="例如：售后维保知识库"
              required
            />
          </label>

          <label className={styles.field}>
            <span>标识</span>
            <input
              value={form.slug}
              onChange={(event) => handleChange('slug', event.target.value)}
              placeholder="可选，不填则自动生成"
            />
          </label>

          <label className={styles.field}>
            <span>简介</span>
            <textarea
              value={form.description}
              onChange={(event) => handleChange('description', event.target.value)}
              rows={4}
              placeholder="描述知识库面向的业务场景、对象和维护方式"
            />
          </label>

          <div className={styles.grid}>
            <label className={styles.field}>
              <span>来源类型</span>
              <select
                value={form.sourceType}
                onChange={(event) => handleChange('sourceType', event.target.value)}
              >
                <option value="MANUAL">手工维护</option>
                <option value="LOCAL_SYNC">本地同步</option>
                <option value="HYBRID">混合模式</option>
              </select>
            </label>

            <label className={styles.switchField}>
              <span>公开访问</span>
              <input
                type="checkbox"
                checked={form.isPublic}
                onChange={(event) => handleChange('isPublic', event.target.checked)}
              />
            </label>
          </div>

          <label className={styles.switchField}>
            <span>启用本地同步</span>
            <input
              type="checkbox"
              checked={form.syncEnabled}
              onChange={(event) => handleChange('syncEnabled', event.target.checked)}
            />
          </label>

          <label className={styles.field}>
            <span>本地根目录</span>
            <input
              value={form.localRootPath}
              onChange={(event) => handleChange('localRootPath', event.target.value)}
              placeholder="/mnt/projects/knowledge-base"
              disabled={!form.syncEnabled}
            />
          </label>

          {(localError || errorMessage) && (
            <div className={styles.errorMessage}>{localError || errorMessage}</div>
          )}

          <div className={styles.footer}>
            <button type="button" className={styles.secondaryButton} onClick={onClose}>
              取消
            </button>
            <button type="submit" className={styles.primaryButton} disabled={submitting}>
              {submitting ? '提交中...' : mode === 'create' ? '创建知识库' : '保存变更'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default KnowledgeBaseFormModal
