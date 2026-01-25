import { useState, useEffect } from 'react'
import { Button, Select, Card, Spin, Message } from '@arco-design/web-react'
import { IconImage, IconRefresh, IconDownload } from '@arco-design/web-react/icon'
import { knowledgeBaseApi } from '../../services/api/knowledgeBaseApi'
import { documentApi } from '../../services/api/documentApi'
import { aiChatApi } from '../../services/api/aiChatApi'
import MermaidRenderer from '../../components/Editor/MermaidRenderer'
import styles from './AiVisualizationPage.module.css'

const { Option } = Select

const AiVisualizationPage = () => {
  const [knowledgeBases, setKnowledgeBases] = useState([])
  const [documents, setDocuments] = useState([])
  const [selectedKbId, setSelectedKbId] = useState(null)
  const [selectedDocId, setSelectedDocId] = useState(null)
  const [visualizationType, setVisualizationType] = useState('knowledge-graph')
  const [visualizationData, setVisualizationData] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingKb, setLoadingKb] = useState(true)
  const [loadingDocs, setLoadingDocs] = useState(false)
  const [currentDocument, setCurrentDocument] = useState(null)

  const visualizationTypes = [
    { value: 'knowledge-graph', label: '知识图谱' },
    { value: 'document-structure', label: '文档结构' },
    { value: 'relationship-diagram', label: '关系图' }
  ]

  useEffect(() => {
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

  // 加载知识库下的文档列表
  const loadDocuments = async (kbId) => {
    if (!kbId) {
      setDocuments([])
      setSelectedDocId(null)
      setCurrentDocument(null)
      return
    }

    try {
      setLoadingDocs(true)
      const response = await documentApi.getDocumentsByKnowledgeBaseId(kbId, { page: 1, size: 20 })
      if (response.code === 200) {
        setDocuments(response.data?.records || [])
        setSelectedDocId(null)
        setCurrentDocument(null)
      }
    } catch (error) {
      console.error('加载文档失败:', error)
      Message.error('加载文档失败')
    } finally {
      setLoadingDocs(false)
    }
  }

  // 加载文档详情
  const loadDocumentDetail = async (docId) => {
    if (!docId) {
      setCurrentDocument(null)
      return
    }

    try {
      setLoading(true)
      const response = await documentApi.getDocumentById(docId)
      if (response.code === 200) {
        setCurrentDocument(response.data)
      }
    } catch (error) {
      console.error('加载文档详情失败:', error)
      Message.error('加载文档详情失败')
    } finally {
      setLoading(false)
    }
  }

  // 生成可视化
  const generateVisualization = async () => {
    if (!selectedDocId) {
      Message.warning('请先选择一个文档')
      return
    }

    try {
      setLoading(true)
      const response = await aiChatApi.visualize({
        documentId: selectedDocId,
        visualizationType
      })

      if (response.code === 200) {
        setVisualizationData(response.data.visualizationData)
        Message.success('可视化生成成功')
      }
    } catch (error) {
      console.error('生成可视化失败:', error)
      Message.error('生成可视化失败')
    } finally {
      setLoading(false)
    }
  }

  // 处理知识库选择变化
  const handleKbChange = (kbId) => {
    setSelectedKbId(kbId)
    loadDocuments(kbId)
  }

  // 处理文档选择变化
  const handleDocChange = (docId) => {
    setSelectedDocId(docId)
    loadDocumentDetail(docId)
  }

  // 下载可视化
  const handleDownload = () => {
    if (!visualizationData) {
      Message.warning('请先生成可视化')
      return
    }

    // 创建下载链接
    const element = document.createElement('a')
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(visualizationData)}`)
    element.setAttribute('download', `visualization-${selectedDocId}-${Date.now()}.md`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    Message.success('下载成功')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <IconImage className={styles.icon} />
          智能问答
        </h1>
        <p className={styles.subtitle}>将文档内容转换为可视化图表，帮助理解和记忆</p>
      </div>

      <div className={styles.configSection}>
        <Card className={styles.configCard}>
          <h3 className={styles.sectionTitle}>配置选项</h3>
          <div className={styles.configRow}>
            <div className={styles.configItem}>
              <div className={styles.configLabel}>选择知识库：</div>
              <Select
                placeholder="请选择知识库"
                style={{ width: 200 }}
                loading={loadingKb}
                onChange={handleKbChange}
                value={selectedKbId}
              >
                {knowledgeBases.map((kb) => (
                  <Option key={kb.id} value={kb.id}>
                    {kb.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div className={styles.configItem}>
              <div className={styles.configLabel}>选择文档：</div>
              <Select
                placeholder="请选择文档"
                style={{ width: 200 }}
                loading={loadingDocs}
                onChange={handleDocChange}
                value={selectedDocId}
                disabled={!selectedKbId}
              >
                {documents.map((doc) => (
                  <Option key={doc.id} value={doc.id}>
                    {doc.title}
                  </Option>
                ))}
              </Select>
            </div>

            <div className={styles.configItem}>
              <div className={styles.configLabel}>可视化类型：</div>
              <Select
                placeholder="请选择可视化类型"
                style={{ width: 200 }}
                onChange={setVisualizationType}
                value={visualizationType}
              >
                {visualizationTypes.map((type) => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </div>

            <div className={styles.configItem}>
              <Button
                type="primary"
                icon={<IconRefresh />}
                onClick={generateVisualization}
                loading={loading}
                disabled={!selectedDocId}
              >
                生成可视化
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {currentDocument && (
        <div className={styles.documentSection}>
          <Card className={styles.documentCard}>
            <h3 className={styles.sectionTitle}>文档信息</h3>
            <div className={styles.documentInfo}>
              <div className={styles.docTitle}>{currentDocument.title}</div>
              <div className={styles.docMeta}>
                创建时间: {new Date(currentDocument.createdAt).toLocaleString()}
                <span className={styles.metaSeparator}>|</span>
                更新时间: {new Date(currentDocument.updatedAt).toLocaleString()}
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className={styles.resultSection}>
        <Card className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <h3 className={styles.sectionTitle}>可视化结果</h3>
            <Button
              icon={<IconDownload />}
              onClick={handleDownload}
              disabled={!visualizationData}
            >
              下载
            </Button>
          </div>
          <div className={styles.visualizationContainer}>
            {visualizationData ? (
              <div className={styles.visualizationContent}>
                <MermaidRenderer content={visualizationData} />
              </div>
            ) : (
              <div className={styles.emptyResult}>
            <IconImage className={styles.emptyIcon} />
            <p>请选择文档并点击"生成可视化"按钮</p>
          </div>
            )}
            {loading && (
              <div className={styles.loadingOverlay}>
                <Spin size="large" />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AiVisualizationPage