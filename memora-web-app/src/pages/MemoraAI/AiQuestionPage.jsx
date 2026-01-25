import { useState } from 'react'
import { Button, Select, InputNumber, Card, Spin, Message, Table, Tag } from '@arco-design/web-react'
import { IconBook, IconRefresh, IconDownload } from '@arco-design/web-react/icon'
import { aiChatApi } from '../../services/api/aiChatApi'
import styles from './AiQuestionPage.module.css'

const { Option } = Select

const AiQuestionPage = () => {
  const [knowledgePoints, setKnowledgePoints] = useState(['文档系统', '知识库管理', '文档管理', '富文本编辑', 'AI辅助功能'])
  const [selectedKnowledgePoints, setSelectedKnowledgePoints] = useState([])
  const [questionType, setQuestionType] = useState('multiple-choice')
  const [difficulty, setDifficulty] = useState('medium')
  const [questionCount, setQuestionCount] = useState(5)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  const questionTypes = [
    { value: 'multiple-choice', label: '选择题' },
    { value: 'fill-in', label: '填空题' },
    { value: 'short-answer', label: '简答题' }
  ]

  const difficulties = [
    { value: 'easy', label: '简单' },
    { value: 'medium', label: '中等' },
    { value: 'hard', label: '困难' }
  ]

  // 生成题目
  const generateQuestions = async () => {
    try {
      setGenerating(true)
      setQuestions([])
      
      const response = await aiChatApi.generateQuestions({
        knowledgePoints: selectedKnowledgePoints.length > 0 ? selectedKnowledgePoints : knowledgePoints,
        questionType,
        difficulty,
        count: questionCount
      })

      if (response.code === 200) {
        setQuestions(response.data.questions)
        Message.success('题目生成成功')
      }
    } catch (error) {
      console.error('生成题目失败:', error)
      Message.error('生成题目失败')
    } finally {
      setGenerating(false)
    }
  }

  // 导出题目
  const exportQuestions = async () => {
    if (questions.length === 0) {
      Message.warning('请先生成题目')
      return
    }

    try {
      setLoading(true)
      const response = await aiChatApi.exportQuestions({
        questionSetId: Date.now().toString(),
        format: 'pdf'
      })

      if (response.code === 200) {
        Message.success('题目导出成功，开始下载')
        // 模拟下载
        setTimeout(() => {
          Message.info(`下载链接: ${response.data.downloadUrl}`)
        }, 500)
      }
    } catch (error) {
      console.error('导出题目失败:', error)
      Message.error('导出题目失败')
    } finally {
      setLoading(false)
    }
  }

  // 获取难度标签颜色
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'easy':
        return 'green'
      case 'medium':
        return 'orange'
      case 'hard':
        return 'red'
      default:
        return 'default'
    }
  }

  // 题目表格列配置
  const questionColumns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1
    },
    {
      title: '题目类型',
      dataIndex: 'type',
      key: 'type',
      render: (text) => {
        const type = questionTypes.find(t => t.value === text)
        return type ? type.label : text
      }
    },
    {
      title: '难度',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (text) => {
        const diff = difficulties.find(d => d.value === text)
        return (
          <Tag color={getDifficultyColor(text)}>
            {diff ? diff.label : text}
          </Tag>
        )
      }
    },
    {
      title: '题目内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      render: (text) => <div className={styles.questionContent}>{text}</div>
    },
    {
      title: '选项',
      dataIndex: 'options',
      key: 'options',
      render: (options) => {
        if (!options || options.length === 0) {
          return '-'
        }
        return (
          <div className={styles.optionsList}>
            {options.map((option, index) => (
              <div key={index} className={styles.optionItem}>
                {String.fromCharCode(65 + index)}. {option}
              </div>
            ))}
          </div>
        )
      }
    },
    {
      title: '答案',
      dataIndex: 'answer',
      key: 'answer',
      render: (answer, record) => {
        if (record.type === 'multiple-choice' && typeof answer === 'string') {
          return (
            <Tag color="blue">
              {answer}
            </Tag>
          )
        }
        return answer
      }
    },
    {
      title: '解析',
      dataIndex: 'explanation',
      key: 'explanation',
      ellipsis: true,
      render: (text) => <div className={styles.explanation}>{text}</div>
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <IconBook className={styles.icon} />
          智能出题
        </h1>
        <p className={styles.subtitle}>基于文档内容生成各种类型的题目，支持自定义配置</p>
      </div>

      <div className={styles.configSection}>
        <Card className={styles.configCard}>
          <h3 className={styles.sectionTitle}>配置选项</h3>
          <div className={styles.configGrid}>
            <div className={styles.configItem}>
              <div className={styles.configLabel}>知识点：</div>
              <Select
                mode="multiple"
                placeholder="选择知识点"
                style={{ width: 300 }}
                onChange={setSelectedKnowledgePoints}
                value={selectedKnowledgePoints}
              >
                {knowledgePoints.map((point, index) => (
                  <Option key={index} value={point}>
                    {point}
                  </Option>
                ))}
              </Select>
            </div>

            <div className={styles.configItem}>
              <div className={styles.configLabel}>题目类型：</div>
              <Select
                placeholder="选择题目类型"
                style={{ width: 200 }}
                onChange={setQuestionType}
                value={questionType}
              >
                {questionTypes.map((type) => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </div>

            <div className={styles.configItem}>
              <div className={styles.configLabel}>难度：</div>
              <Select
                placeholder="选择难度"
                style={{ width: 200 }}
                onChange={setDifficulty}
                value={difficulty}
              >
                {difficulties.map((diff) => (
                  <Option key={diff.value} value={diff.value}>
                    {diff.label}
                  </Option>
                ))}
              </Select>
            </div>

            <div className={styles.configItem}>
              <div className={styles.configLabel}>题目数量：</div>
              <InputNumber
                min={1}
                max={20}
                value={questionCount}
                onChange={setQuestionCount}
                style={{ width: 120 }}
              />
            </div>

            <div className={styles.configItem}>
              <Button
                type="primary"
                icon={<IconRefresh />}
                onClick={generateQuestions}
                loading={generating}
                style={{ width: 200 }}
              >
                生成题目
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className={styles.resultSection}>
        <Card className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <h3 className={styles.sectionTitle}>
              生成结果
              {questions.length > 0 && (
                <span className={styles.questionCount}>
                  （共 {questions.length} 题）
                </span>
              )}
            </h3>
            <Button
              icon={<IconDownload />}
              onClick={exportQuestions}
              loading={loading}
              disabled={questions.length === 0}
            >
              导出题目
            </Button>
          </div>
          <div className={styles.questionsContainer}>
            {generating ? (
              <div className={styles.loadingContainer}>
                <Spin size="large" />
                <p>正在生成题目...</p>
              </div>
            ) : questions.length > 0 ? (
              <Table
                columns={questionColumns}
                data={questions}
                rowKey="id"
                pagination={false}
                bordered
                scroll={{ x: 1200 }}
                className={styles.questionsTable}
              />
            ) : (
              <div className={styles.emptyResult}>
                <IconBook className={styles.emptyIcon} />
                <p>请配置选项并点击"生成题目"按钮</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AiQuestionPage