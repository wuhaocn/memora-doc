import { NodeViewWrapper } from '@tiptap/react'
import { useState, memo } from 'react'
import { Button, Modal, Input, Message } from '@arco-design/web-react'
import { IconEdit, IconDelete } from '@arco-design/web-react/icon'
import MermaidRenderer from './MermaidRenderer'
import styles from './DiagramNode.module.css'

const DiagramNode = memo(({ node, updateAttributes, deleteNode, editor, getPos }) => {
  const { content, width, height } = node.attrs
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(content || '')
  const [previewContent, setPreviewContent] = useState(content || '')
  const [editWidth, setEditWidth] = useState(width || '100%')
  const [editHeight, setEditHeight] = useState(height || '400px')

  const handleEdit = (e) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }

    setIsEditing(true)
    setEditContent(content || '')
    setPreviewContent(content || '')
  }

  const handleContentChange = (newContent) => {
    setEditContent(newContent)
    clearTimeout(handleContentChange.timer)
    handleContentChange.timer = setTimeout(() => {
      setPreviewContent(newContent)
    }, 500)
  }

  const handleSave = () => {
    if (!editContent.trim()) {
      Message.warning('请输入图表内容')
      return
    }
    updateAttributes({
      content: editContent,
      diagramType: 'mermaid',
      width: editWidth,
      height: editHeight,
    })
    setIsEditing(false)
    Message.success('图表已更新')
  }

  const handleDelete = (e) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    
    if (!editor) {
      if (deleteNode) {
        deleteNode()
      }
      return
    }

    if (typeof getPos === 'function') {
      try {
        const pos = getPos()
        if (pos !== undefined && pos !== null && pos >= 0) {
          const from = pos
          const to = pos + node.nodeSize

          editor.chain()
            .focus()
            .deleteRange({ from, to })
            .run()
          return
        }
      } catch (error) {
        console.error('删除节点时出错:', error)
      }
    }

    try {
      editor.chain().focus().deleteNode('diagram').run()
    } catch (error) {
      console.error('删除节点失败:', error)
      Message.error('删除图表失败，请尝试选中后删除')
    }
  }

  return (
    <NodeViewWrapper className={styles.diagramWrapper} data-type="diagram">
      <div className={styles.diagramContainer} style={{ width, height }}>
        <div className={styles.diagramToolbar}>
          <span className={styles.diagramLabel}>Mermaid 图表</span>
          <div className={styles.diagramActions}>
            <Button
              type="text"
              size="small"
              icon={<IconEdit />}
              onClick={(e) => {
                e.stopPropagation()
                handleEdit(e)
              }}
            >
              编辑
            </Button>
            <Button
              type="text"
              size="small"
              icon={<IconDelete />}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                handleDelete(e)
              }}
            >
              删除
            </Button>
          </div>
        </div>
        <div className={styles.diagramContent}>
          <MermaidRenderer content={content || ''} />
        </div>
      </div>

      <Modal
        title="编辑图表"
        visible={isEditing}
        onOk={handleSave}
        onCancel={() => {
          setIsEditing(false)
          setPreviewContent(content || '')
        }}
        style={{ width: '95%', maxWidth: '1400px' }}
        okText="保存"
        cancelText="取消"
        className={styles.editModal}
      >
        <div className={styles.editForm}>
          <div className={styles.editContainer}>
            <div className={styles.editPanel}>
              <div className={styles.panelHeader}>
                <label>Mermaid 代码</label>
                <a
                  href="https://mermaid.js.org/intro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.helpLink}
                >
                  查看语法文档
                </a>
              </div>
              <Input.TextArea
                value={editContent}
                onChange={handleContentChange}
                placeholder="输入 Mermaid 代码，例如：&#10;graph TD&#10;  A[开始] --> B[处理]&#10;  B --> C[结束]"
                rows={20}
                style={{ fontFamily: 'monospace', fontSize: '14px' }}
                className={styles.codeEditor}
              />
            </div>
            <div className={styles.previewPanel}>
              <div className={styles.panelHeader}>
                <label>实时预览</label>
              </div>
              <div className={styles.previewContent}>
                <MermaidRenderer content={previewContent || editContent} />
              </div>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formItem}>
              <label>宽度</label>
              <Input
                value={editWidth}
                onChange={setEditWidth}
                placeholder="例如: 100% 或 800px"
              />
            </div>
            <div className={styles.formItem}>
              <label>高度</label>
              <Input
                value={editHeight}
                onChange={setEditHeight}
                placeholder="例如: 400px"
              />
            </div>
          </div>
        </div>
      </Modal>
    </NodeViewWrapper>
  )
})

DiagramNode.displayName = 'DiagramNode'

export default DiagramNode
