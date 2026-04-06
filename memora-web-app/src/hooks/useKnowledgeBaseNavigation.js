import { useCallback, useEffect, useState } from 'react'
import { knowledgeBaseApi } from '../services/api/knowledgeBaseApi'
import { KNOWLEDGE_BASES_CHANGED_EVENT } from '../utils/knowledgeBaseEvents'

const knowledgeBaseCache = new Map()
const inflightRequests = new Map()

const fetchKnowledgeBases = async (tenantId) => {
  if (!tenantId) {
    return []
  }

  if (inflightRequests.has(tenantId)) {
    return inflightRequests.get(tenantId)
  }

  const request = knowledgeBaseApi.getKnowledgeBasesByTenantId(tenantId)
    .then((response) => {
      const knowledgeBases = response.code === 200 ? (response.data || []) : []
      knowledgeBaseCache.set(tenantId, knowledgeBases)
      return knowledgeBases
    })
    .catch((error) => {
      knowledgeBaseCache.set(tenantId, [])
      throw error
    })
    .finally(() => {
      inflightRequests.delete(tenantId)
    })

  inflightRequests.set(tenantId, request)
  return request
}

export const useKnowledgeBaseNavigation = (tenantId, options = {}) => {
  const { errorMessage = '加载知识库导航失败' } = options
  const [knowledgeBases, setKnowledgeBases] = useState(() => knowledgeBaseCache.get(tenantId) || [])

  const refreshKnowledgeBases = useCallback(async () => {
    if (!tenantId) {
      setKnowledgeBases([])
      return []
    }

    try {
      const nextKnowledgeBases = await fetchKnowledgeBases(tenantId)
      setKnowledgeBases(nextKnowledgeBases)
      return nextKnowledgeBases
    } catch (error) {
      console.error(errorMessage, error)
      setKnowledgeBases([])
      return []
    }
  }, [errorMessage, tenantId])

  useEffect(() => {
    if (!tenantId) {
      setKnowledgeBases([])
      return
    }

    const cachedKnowledgeBases = knowledgeBaseCache.get(tenantId)
    if (cachedKnowledgeBases) {
      setKnowledgeBases(cachedKnowledgeBases)
      return
    }

    refreshKnowledgeBases()
  }, [refreshKnowledgeBases, tenantId])

  useEffect(() => {
    const handleKnowledgeBaseChanged = () => {
      refreshKnowledgeBases()
    }

    window.addEventListener(KNOWLEDGE_BASES_CHANGED_EVENT, handleKnowledgeBaseChanged)
    return () => {
      window.removeEventListener(KNOWLEDGE_BASES_CHANGED_EVENT, handleKnowledgeBaseChanged)
    }
  }, [refreshKnowledgeBases])

  return {
    knowledgeBases,
    refreshKnowledgeBases,
  }
}
