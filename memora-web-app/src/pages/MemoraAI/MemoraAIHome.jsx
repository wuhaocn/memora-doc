import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Space } from '@arco-design/web-react'
import { IconRobot, IconMessage, IconImage, IconBook } from '@arco-design/web-react/icon'
import styles from './MemoraAIHome.module.css'

const MemoraAIHome = () => {
  const navigate = useNavigate()

  const features = [
    {
      title: '智能问答',
      description: '基于文档内容的智能问答，支持多轮对话和上下文理解',
      icon: <IconMessage />,
      color: '#667085',
      path: '/memora-ai/qna'
    },
    {
      title: '文档可视化',
      description: '将文档内容转换为可视化图表，帮助理解和记忆',
      icon: <IconImage />,
      color: '#3563E9',
      path: '/memora-ai/visualization'
    },
    {
      title: '智能出题',
      description: '基于文档内容生成各种类型的题目，支持自定义配置',
      icon: <IconBook />,
      color: '#10B981',
      path: '/memora-ai/questions'
    }
  ]

  const handleFeatureClick = (path) => {
    navigate(path)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <IconRobot className={styles.logo} />
          MemoraAI 智能助手
        </h1>
        <p className={styles.subtitle}>你的智能学习伙伴，帮助你更高效地学习和工作</p>
      </div>

      <div className={styles.features}>
        {features.map((feature, index) => (
          <Card
            key={index}
            className={styles.featureCard}
            hoverable
            onClick={() => handleFeatureClick(feature.path)}
          >
            <div className={styles.featureIcon} style={{ backgroundColor: feature.color + '20' }}>
              <span className={styles.icon} style={{ color: feature.color }}>
                {feature.icon}
              </span>
            </div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDesc}>{feature.description}</p>
            <Button type="primary" size="small" className={styles.featureButton}>
              开始使用
            </Button>
          </Card>
        ))}
      </div>

      <div className={styles.info}>
        <h2>使用说明</h2>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div className={styles.infoItem}>
            <h3>1. 智能问答</h3>
            <p>在智能问答页面，你可以输入关于文档的问题，AI会基于文档内容给你回答。你可以选择特定的知识库或文档，让AI更准确地回答你的问题。</p>
          </div>
          <div className={styles.infoItem}>
            <h3>2. 文档可视化</h3>
            <p>在文档可视化页面，你可以选择一个文档，AI会将文档内容转换为可视化图表，如知识图谱、文档结构等，帮助你更好地理解文档内容。</p>
          </div>
          <div className={styles.infoItem}>
            <h3>3. 智能出题</h3>
            <p>在智能出题页面，你可以选择知识点、题目类型、难度和数量，AI会基于文档内容生成相应的题目，帮助你测试和巩固知识。</p>
          </div>
        </Space>
      </div>
    </div>
  )
}

export default MemoraAIHome