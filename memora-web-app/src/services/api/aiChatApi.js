// Mock AI Chat API
// 在实际项目中，这里应该调用真实的大模型API

const mockAIResponse = (message, documentContent) => {
  // 模拟AI响应延迟
  const delay = Math.random() * 1000 + 500

  return new Promise((resolve) => {
    setTimeout(() => {
      let response = ''

      // 简单的关键词匹配，模拟AI回复
      const lowerMessage = message.toLowerCase()

      if (lowerMessage.includes('你好') || lowerMessage.includes('hello')) {
        response = '你好！我是DeepTutor AI助手，很高兴为你服务。我可以帮助你：\n• 回答关于文档的问题\n• 生成内容建议\n• 优化文档结构\n• 翻译和改写文本\n• 生成可视化图表\n• 智能出题\n\n请告诉我你需要什么帮助？'
      } else if (lowerMessage.includes('总结') || lowerMessage.includes('摘要')) {
        if (documentContent) {
          const preview = documentContent.substring(0, 200)
          response = `根据文档内容，我为你总结如下：\n\n${preview}...\n\n这是一个简短的摘要。如果需要更详细的总结，请提供更多文档内容。`
        } else {
          response = '请先提供需要总结的文档内容。'
        }
      } else if (lowerMessage.includes('优化') || lowerMessage.includes('改进')) {
        response = '以下是一些文档优化建议：\n\n• 确保标题清晰明确\n• 使用段落分隔不同主题\n• 添加适当的标题层级（H1, H2, H3）\n• 使用列表来组织信息\n• 添加图表和示例来说明复杂概念\n• 保持语言简洁明了\n\n需要我帮你优化文档的某个部分吗？'
      } else if (lowerMessage.includes('翻译') || lowerMessage.includes('translate')) {
        response = '我可以帮你翻译文本。请告诉我：\n• 需要翻译的内容\n• 目标语言（如：英文、日文等）\n\n例如："请将这段文字翻译成英文：..."'
      } else if (lowerMessage.includes('生成') || lowerMessage.includes('写')) {
        if (lowerMessage.includes('流程图') || lowerMessage.includes('flowchart') || lowerMessage.includes('mermaid')) {
          // 生成 Mermaid 流程图
          let mermaidCode = ''
          if (lowerMessage.includes('登录') || lowerMessage.includes('登录流程')) {
            mermaidCode = `graph TD
    A[用户访问] --> B{是否已登录?}
    B -->|否| C[显示登录页面]
    B -->|是| D[进入主页]
    C --> E[输入用户名密码]
    E --> F{验证成功?}
    F -->|是| G[保存登录状态]
    F -->|否| H[显示错误信息]
    G --> D
    H --> C`
          } else if (lowerMessage.includes('注册') || lowerMessage.includes('注册流程')) {
            mermaidCode = `graph TD
    A[用户点击注册] --> B[填写注册信息]
    B --> C{信息是否完整?}
    C -->|否| D[提示补充信息]
    C -->|是| E[验证邮箱]
    D --> B
    E --> F{邮箱验证成功?}
    F -->|是| G[创建账户]
    F -->|否| H[提示验证失败]
    G --> I[注册成功]
    H --> E`
          } else if (lowerMessage.includes('订单') || lowerMessage.includes('下单')) {
            mermaidCode = `graph TD
    A[用户选择商品] --> B[加入购物车]
    B --> C[进入结算页面]
    C --> D[填写收货信息]
    D --> E[选择支付方式]
    E --> F[提交订单]
    F --> G{支付成功?}
    G -->|是| H[订单确认]
    G -->|否| I[支付失败]
    H --> J[开始发货]
    I --> E`
          } else {
            // 默认流程图
            mermaidCode = `graph TD
    A[开始] --> B{判断条件}
    B -->|条件1| C[处理A]
    B -->|条件2| D[处理B]
    C --> E[结果A]
    D --> F[结果B]
    E --> G[结束]
    F --> G`
          }
          response = `我为你生成了一个流程图，请使用以下 Mermaid 代码：\n\n\`\`\`mermaid\n${mermaidCode}\n\`\`\`\n\n你可以点击"插入流程图"按钮将这段代码插入到文档中。`
        } else if (lowerMessage.includes('可视化') || lowerMessage.includes('图表')) {
          // 生成可视化图表
          response = `我可以帮你生成多种类型的可视化图表。以下是一些示例：\n\n1. **流程图**：展示流程步骤和决策点\n2. **时序图**：展示事件的时间顺序\n3. **类图**：展示类之间的关系\n4. **状态图**：展示状态转换\n5. **ER图**：展示实体关系\n6. **甘特图**：展示项目进度\n\n请告诉我你需要的图表类型和主题，我会为你生成相应的可视化代码。`
        } else if (lowerMessage.includes('题目') || lowerMessage.includes('出题')) {
          // 生成题目
          response = `我可以帮你生成多种类型的题目。以下是一些示例：\n\n1. **选择题**：提供选项，选择正确答案\n2. **填空题**：填写空缺的内容\n3. **简答题**：简要回答问题\n4. **论述题**：详细论述某个主题\n5. **编程题**：编写代码解决问题\n\n请告诉我你需要的题目类型、主题、难度和数量，我会为你生成相应的题目集。`
        } else if (lowerMessage.includes('标题')) {
          response = '以下是一些标题建议：\n\n• 如何开始使用文档系统\n• 文档编辑最佳实践\n• 团队协作指南\n• 常见问题解答\n\n需要我根据你的主题生成更具体的标题吗？'
        } else if (lowerMessage.includes('大纲') || lowerMessage.includes('目录')) {
          response = '以下是一个文档大纲示例：\n\n1. 引言\n   1.1 背景\n   1.2 目标\n2. 主要内容\n   2.1 核心概念\n   2.2 实施步骤\n3. 总结\n   3.1 要点回顾\n   3.2 下一步行动\n\n需要我根据你的主题生成更具体的大纲吗？'
        } else {
          response = '我可以帮你生成内容。请告诉我：\n• 需要生成的内容类型（如：段落、列表、代码示例、流程图等）\n• 主题或关键词\n\n例如："请生成一个登录流程的流程图"或"请生成一段关于React的介绍"'
        }
      } else if (lowerMessage.includes('代码') || lowerMessage.includes('code')) {
        response = '我可以帮你生成代码示例。请告诉我：\n• 编程语言\n• 功能需求\n\n例如："请生成一个React组件的示例代码"'
      } else {
        // 默认回复
        response = `我理解你想了解"${message}"。\n\n作为DeepTutor AI助手，我可以帮助你：\n• 回答关于文档的问题\n• 生成和优化内容\n• 提供写作建议\n• 翻译文本\n• 生成代码示例\n• 生成可视化图表\n• 智能出题\n\n请告诉我更具体的需求，我会尽力帮助你！`
      }

      resolve({
        code: 200,
        data: {
          content: response,
        },
        message: 'success',
      })
    }, delay)
  })
}

export const aiChatApi = {
  /**
   * 发送聊天消息
   * @param {Object} params
   * @param {string} params.message - 用户消息
   * @param {string} params.documentContent - 当前文档内容（可选）
   * @returns {Promise}
   */
  chat: async ({ message, documentContent = '' }) => {
    // 在实际项目中，这里应该调用真实的大模型API
    // 例如：OpenAI API, Claude API, 或其他大模型服务
    
    try {
      // Mock实现
      const response = await mockAIResponse(message, documentContent)
      return response
    } catch (error) {
      console.error('AI Chat API Error:', error)
      throw error
    }
  },

  /**
   * 流式聊天（用于实时响应）
   * @param {Object} params
   * @param {string} params.message - 用户消息
   * @param {string} params.documentContent - 当前文档内容（可选）
   * @param {Function} params.onChunk - 接收数据块的回调函数
   * @returns {Promise}
   */
  chatStream: async ({ message, documentContent = '', onChunk }) => {
    // 在实际项目中，这里应该调用支持流式响应的大模型API
    // 例如：OpenAI Stream API
    
    try {
      const response = await mockAIResponse(message, documentContent)
      const content = response.data?.content || ''
      
      // 模拟流式输出
      const words = content.split('')
      for (let i = 0; i < words.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50))
        if (onChunk) {
          onChunk(words[i])
        }
      }
      
      return response
    } catch (error) {
      console.error('AI Chat Stream API Error:', error)
      throw error
    }
  },

  /**
   * 生成文档可视化
   * @param {Object} params
   * @param {string} params.documentId - 文档ID
   * @param {string} params.visualizationType - 可视化类型
   * @returns {Promise}
   */
  visualize: async ({ documentId, visualizationType }) => {
    // 在实际项目中，这里应该调用DeepTutor的可视化API
    
    try {
      // Mock实现
      const delay = Math.random() * 1000 + 500
      return new Promise((resolve) => {
        setTimeout(() => {
          let visualizationData = ''
          
          if (visualizationType === 'knowledge-graph') {
            visualizationData = `graph TD
    A[文档系统] --> B[知识库管理]
    A --> C[文档管理]
    A --> D[富文本编辑]
    A --> E[AI辅助功能]
    B --> F[创建知识库]
    B --> G[编辑知识库]
    B --> H[删除知识库]
    C --> I[创建文档]
    C --> J[编辑文档]
    C --> K[删除文档]
    E --> L[AI聊天]
    E --> M[可视化]
    E --> N[出题功能]`
          } else if (visualizationType === 'document-structure') {
            visualizationData = `graph TD
    A[文档标题] --> B[第一章]
    A --> C[第二章]
    A --> D[第三章]
    B --> E[1.1 小节]
    B --> F[1.2 小节]
    C --> G[2.1 小节]
    C --> H[2.2 小节]
    D --> I[3.1 小节]
    D --> J[3.2 小节]`
          } else {
            visualizationData = `graph TD
    A[主题] --> B[子主题1]
    A --> C[子主题2]
    A --> D[子主题3]
    B --> E[内容1]
    B --> F[内容2]
    C --> G[内容3]
    C --> H[内容4]
    D --> I[内容5]
    D --> J[内容6]`
          }
          
          resolve({
            code: 200,
            data: {
              id: Date.now().toString(),
              visualizationType,
              visualizationData,
              createdAt: new Date().toISOString(),
            },
            message: 'success',
          })
        }, delay)
      })
    } catch (error) {
      console.error('AI Visualization API Error:', error)
      throw error
    }
  },

  /**
   * 生成题目
   * @param {Object} params
   * @param {string[]} params.knowledgePoints - 知识点
   * @param {string} params.questionType - 题目类型
   * @param {string} params.difficulty - 难度
   * @param {number} params.count - 题目数量
   * @returns {Promise}
   */
  generateQuestions: async ({ knowledgePoints, questionType, difficulty, count }) => {
    // 在实际项目中，这里应该调用DeepTutor的题目生成API
    
    try {
      // Mock实现
      const delay = Math.random() * 1000 + 500
      return new Promise((resolve) => {
        setTimeout(() => {
          const questions = []
          
          for (let i = 0; i < count; i++) {
            let question = {
              id: Date.now() + i,
              type: questionType,
              difficulty,
              content: '',
              options: [],
              answer: '',
              explanation: '',
            }
            
            if (questionType === 'multiple-choice') {
              question.content = `关于文档系统的第${i + 1}题：以下哪项不是文档系统的核心功能？`
              question.options = [
                '文档编辑',
                '知识库管理',
                '视频聊天',
                'AI辅助功能'
              ]
              question.answer = '视频聊天'
              question.explanation = '文档系统的核心功能包括文档编辑、知识库管理和AI辅助功能，视频聊天不是文档系统的核心功能。'
            } else if (questionType === 'fill-in') {
              question.content = `文档系统支持____编辑功能。`
              question.answer = '富文本'
              question.explanation = '文档系统通常支持富文本编辑，允许用户添加格式、图片、表格等内容。'
            } else if (questionType === 'short-answer') {
              question.content = `简述文档系统的主要用途。`
              question.answer = '文档系统用于创建、编辑、管理和共享文档，支持团队协作和知识管理。'
              question.explanation = '文档系统的主要用途包括文档创建、编辑、管理、共享、团队协作和知识管理等。'
            }
            
            questions.push(question)
          }
          
          resolve({
            code: 200,
            data: {
              id: Date.now().toString(),
              knowledgePoints,
              questionType,
              difficulty,
              count,
              questions,
              createdAt: new Date().toISOString(),
            },
            message: 'success',
          })
        }, delay)
      })
    } catch (error) {
      console.error('AI Question Generation API Error:', error)
      throw error
    }
  },

  /**
   * 导出题目
   * @param {Object} params
   * @param {string} params.questionSetId - 题目集ID
   * @param {string} params.format - 导出格式
   * @returns {Promise}
   */
  exportQuestions: async ({ questionSetId, format }) => {
    // 在实际项目中，这里应该调用DeepTutor的题目导出API
    
    try {
      // Mock实现
      const delay = Math.random() * 500 + 300
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: 200,
            data: {
              downloadUrl: '#',
              fileName: `questions-${questionSetId}.${format}`,
            },
            message: 'success',
          })
        }, delay)
      })
    } catch (error) {
      console.error('AI Question Export API Error:', error)
      throw error
    }
  },
}

