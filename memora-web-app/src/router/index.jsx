import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import KnowledgeBaseDetail from '../pages/KnowledgeBase/KnowledgeBaseDetail'
import DocumentEdit from '../pages/Document/DocumentEdit'
import MemoraAIHome from '../pages/MemoraAI/MemoraAIHome'
import AiQnAPage from '../pages/MemoraAI/AiQnAPage'
import AiVisualizationPage from '../pages/MemoraAI/AiVisualizationPage'
import AiQuestionPage from '../pages/MemoraAI/AiQuestionPage'
import NotFound from '../pages/NotFound/NotFound'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/kb/:id" element={<KnowledgeBaseDetail />} />
      <Route path="/kb/:kbId/doc/:id" element={<DocumentEdit />} />
      <Route path="/kb/:kbId/doc/new" element={<DocumentEdit />} />
      <Route path="/memora-ai" element={<MemoraAIHome />} />
      <Route path="/memora-ai/qna" element={<AiQnAPage />} />
      <Route path="/memora-ai/visualization" element={<AiVisualizationPage />} />
      <Route path="/memora-ai/questions" element={<AiQuestionPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router

