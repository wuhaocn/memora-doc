import React, { useState } from 'react'
import { Select, Tag, Button, Input, Space, Modal, Form, Message, Tooltip } from '@arco-design/web-react'
import { IconPlus, IconClose } from '@arco-design/web-react/icon'
import styles from './TagManager.module.css'

/**
 * 标签管理组件
 * @param {Object} props
 * @param {Array} props.selectedTags - 已选择的标签ID列表
 * @param {Function} props.onTagsChange - 标签变更回调
 * @param {Array} props.allTags - 所有可用标签
 */
const TagManager = ({
  selectedTags = [],
  onTagsChange,
  allTags = [],
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTagName, setNewTagName] = useState('')

  // 处理标签选择变更
  const handleTagChange = (values) => {
    onTagsChange && onTagsChange(values)
  }

  // 打开创建标签模态框
  const handleOpenCreateModal = () => {
    setShowCreateModal(true)
    setNewTagName('')
  }

  // 关闭创建标签模态框
  const handleCloseCreateModal = () => {
    setShowCreateModal(false)
  }

  // 创建新标签
  const handleCreateTag = () => {
    if (!newTagName.trim()) {
      Message.error('标签名称不能为空')
      return
    }

    // 检查标签是否已存在
    const existingTag = allTags.find((tag) => tag.name === newTagName.trim())
    if (existingTag) {
      Message.error('标签已存在')
      return
    }

    // 这里可以调用API创建新标签
    // 暂时模拟创建标签
    Message.success('标签创建成功')
    setShowCreateModal(false)
    setNewTagName('')
    
    // 注意：实际应用中，这里需要重新获取标签列表并更新selectedTags
  }

  return (
    <div className={styles.container}>
      <Select
        mode="multiple"
        allowCreate
        placeholder="请选择标签，或输入新标签名称回车创建"
        style={{ width: '100%' }}
        value={selectedTags}
        onChange={handleTagChange}
        options={allTags.map((tag) => ({
          label: (
            <Space size="mini">
              <Tag>{tag.name}</Tag>
            </Space>
          ),
          value: tag.id,
        }))}
        className={styles.select}
      />
      
      <div className={styles.actions}>
        <Tooltip content="创建新标签">
          <Button
            type="dashed"
            icon={<IconPlus />}
            onClick={handleOpenCreateModal}
          >
            新建标签
          </Button>
        </Tooltip>
      </div>

      {/* 创建标签模态框 */}
      <Modal
        title="创建新标签"
        open={showCreateModal}
        onOk={handleCreateTag}
        onCancel={handleCloseCreateModal}
      >
        <Form layout="vertical">
          <Form.Item
            label="标签名称"
            rules={[{ required: true, message: '请输入标签名称' }]}
          >
            <Input
              value={newTagName}
              onChange={setNewTagName}
              placeholder="请输入标签名称"
              maxLength={100}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TagManager
