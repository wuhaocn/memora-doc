const STORAGE_KEY = 'memora-last-knowledge-base-id'

export const rememberKnowledgeBase = (knowledgeBaseId) => {
  if (!knowledgeBaseId) {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, String(knowledgeBaseId))
}

export const getRememberedKnowledgeBaseId = () => {
  const value = window.localStorage.getItem(STORAGE_KEY)
  if (!value) {
    return null
  }

  const numericValue = Number(value)
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : null
}

export const clearRememberedKnowledgeBase = () => {
  window.localStorage.removeItem(STORAGE_KEY)
}
