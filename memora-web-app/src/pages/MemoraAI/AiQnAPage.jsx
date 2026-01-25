import { useState, useRef, useEffect } from 'react'
import { Input, Button, Avatar, Spin, Message, Select } from '@arco-design/web-react'
import { IconSend, IconRobot, IconUser, IconSearch } from '@arco-design/web-react/icon'
import { knowledgeBaseApi } from '../../services/api/knowledgeBaseApi'
import { aiChatApi } from '../../services/api/aiChatApi'
import styles from './AiQnAPage.module.css'

const { Option } = Select

const AiQnAPage = () => {
  const [knowledgeBases, setKnowledgeBases] = useState([])
  const [selectedKbId, setSelectedKbId] = useState(null)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: '你好！我是MemoraAI 智能助手，你可以问我关于文档的问题，我会尽力为你解答。',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingKb, setLoadingKb] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus()
    }
    loadKnowledgeBases()
  }, [])

  // 加载知识库列表
  const loadKnowledgeBases = async () => {
    try {
      setLoadingKb(true)
      const response = await knowledgeBaseApi.getKnowledgeBases({ page: 1, size: 20 })
      if (response.code === 200) {
        setKnowledgeBases(response.data?.records || [])
      }
    } catch (error) {
      console.error('加载知识库失败:', error)
      Message.error('加载知识库失败')
    } finally {
      setLoadingKb(false)
    }
  }

  const handleSend = async () => {
    if (!inputValue.trim() || loading) return

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setLoading(true)

    try {
      // 这里可以根据需要添加获取文档内容的逻辑
      // 目前使用空字符串作为文档内容
      const response = await aiChatApi.chat({
        message: userMessage.content,
        documentContent: '',
      })

      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.data?.content || response.content || '抱歉，我暂时无法回答这个问题。',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('AI对话失败:', error)
      Message.error('AI对话失败，请稍后重试')
      
      const errorMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: '抱歉，发生了错误，请稍后重试。',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatMessage = (content) => {
    // 简单的markdown格式化
    return content
      .split('\n')
      .map((line, index) => {
        if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
          return <div key={index} className={styles.listItem}>{line}</div>
        }
        return <div key={index}>{line || <br />}</div>
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <IconMessage className={styles.icon} />
          智能问答
        </h1>
        <p className={styles.subtitle}>基于文档内容的智能问答，支持多轮对话和上下文理解</p>
      </div>

      <div className={styles.kbSelector}>
        <div className={styles.selectorLabel}>选择知识库：</div>
        <Select
          placeholder="所有知识库"
          style={{ width: 300 }}
          loading={loadingKb}
          onChange={setSelectedKbId}
          value={selectedKbId}
        >
          {knowledgeBases.map((kb) => (
            <Option key={kb.id} value={kb.id}>
              {kb.name}
            </Option>
          ))}
        </Select>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
            >
              <div className={styles.messageAvatar}>
                {message.role === 'user' ? (
                  <Avatar size={32} style={{ backgroundColor: 'var(--color-primary-light-1)' }}>
                    <IconUser />
                  </Avatar>
                ) : (
                  <Avatar size={32} style={{ backgroundColor: 'var(--color-primary)' }}>
                    <IconRobot />
                  </Avatar>
                )}
              </div>
              <div className={styles.messageContent}>
                <div className={styles.messageText}>{formatMessage(message.content)}</div>
                <div className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <div className={styles.messageAvatar}>
                <Avatar size={32} style={{ backgroundColor: 'var(--color-primary)' }}>
                  <IconRobot />
                </Avatar>
              </div>
              <div className={styles.messageContent}>
                <Spin size="small" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputArea}>
          <Input.TextArea
            ref={inputRef}
            value={inputValue}
            onChange={setInputValue}
            onKeyPress={handleKeyPress}
            placeholder="输入你的问题... (Shift+Enter 换行)"
            autoSize={{ minRows: 1, maxRows: 4 }}
            className={styles.input}
            disabled={loading}
          />
          <Button
            type="primary"
            icon={<IconSend />}
            onClick={handleSend}
            loading={loading}
            disabled={!inputValue.trim()}
            className={styles.sendButton}
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AiQnAPage