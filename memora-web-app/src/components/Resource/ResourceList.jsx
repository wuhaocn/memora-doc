import React from 'react'
import { Empty, Spin } from '@arco-design/web-react'
import ResourceCard from './ResourceCard'
import styles from './ResourceList.module.css'

/**
 * 资源列表组件
 * @param {Object} props
 * @param {Array} props.resources - 资源列表数据
 * @param {string} props.viewMode - 视图模式（card/list）
 * @param {Function} props.onEdit - 编辑回调
 * @param {Function} props.onDelete - 删除回调
 * @param {Function} props.onSelect - 选择回调
 * @param {boolean} props.loading - 加载状态
 */
const ResourceList = ({
  resources = [],
  viewMode = 'card',
  onEdit,
  onDelete,
  onSelect,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    )
  }

  if (resources.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <Empty description="暂无资源" />
      </div>
    )
  }

  return (
    <div className={`${styles.container} ${viewMode === 'list' ? styles.listView : styles.cardView}`}>
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          viewMode={viewMode}
          onEdit={() => onEdit && onEdit(resource)}
          onDelete={() => onDelete && onDelete(resource)}
          onClick={() => onSelect && onSelect(resource)}
        />
      ))}
    </div>
  )
}

export default ResourceList
