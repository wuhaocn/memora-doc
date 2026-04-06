export const KNOWLEDGE_BASES_CHANGED_EVENT = 'knowledge-bases-changed'

export const emitKnowledgeBasesChanged = () => {
  window.dispatchEvent(new CustomEvent(KNOWLEDGE_BASES_CHANGED_EVENT))
}
