export const TYPE_LABELS = {
  FOLDER: '目录',
  DOC: '文档',
}

export const compareByTreeOrder = (left, right) => {
  const sortDiff = (left.sortOrder ?? 0) - (right.sortOrder ?? 0)
  if (sortDiff !== 0) {
    return sortDiff
  }
  return (left.path || '').localeCompare(right.path || '')
}

export const getSiblingDocuments = (documents, targetDocument) => {
  if (!targetDocument) {
    return []
  }
  return documents
    .filter((item) => (item.parentId ?? 0) === (targetDocument.parentId ?? 0))
    .sort(compareByTreeOrder)
}

export const reorderSiblingDocuments = (documents, draggedDocumentId, targetDocumentId, position) => {
  const orderedDocuments = [...documents].sort(compareByTreeOrder)
  const draggedIndex = orderedDocuments.findIndex((item) => item.id === draggedDocumentId)
  const targetIndex = orderedDocuments.findIndex((item) => item.id === targetDocumentId)

  if (draggedIndex < 0 || targetIndex < 0 || draggedDocumentId === targetDocumentId) {
    return null
  }

  const [draggedDocument] = orderedDocuments.splice(draggedIndex, 1)
  const nextTargetIndex = orderedDocuments.findIndex((item) => item.id === targetDocumentId)

  if (nextTargetIndex < 0) {
    return null
  }

  const insertIndex = position === 'after' ? nextTargetIndex + 1 : nextTargetIndex
  orderedDocuments.splice(insertIndex, 0, draggedDocument)
  return orderedDocuments
}

export const resolveDefaultParentId = (selectedDocument) => {
  if (!selectedDocument) {
    return 0
  }
  if (selectedDocument.docType === 'FOLDER') {
    return selectedDocument.id
  }
  return selectedDocument.parentId ?? 0
}

export const buildFolderOptions = (documents, currentDocument = null) => {
  const options = [{ id: 0, label: '根目录' }]
  const currentPath = currentDocument?.path || ''

  documents
    .filter((item) => item.docType === 'FOLDER')
    .filter((item) => {
      if (!currentDocument) {
        return true
      }
      if (item.id === currentDocument.id) {
        return false
      }
      if (currentDocument.docType === 'FOLDER' && currentPath && (item.path || '').startsWith(`${currentPath}/`)) {
        return false
      }
      return true
    })
    .forEach((item) => {
      options.push({
        id: item.id,
        label: `${item.title} (${item.path})`,
      })
    })

  return options
}

export const getDocumentByIdMap = (documents) => {
  return new Map(documents.map((item) => [item.id, item]))
}

export const getTopLevelSelectedDocuments = (documents, selectedIds) => {
  const selectedIdSet = new Set(selectedIds)
  const documentMap = getDocumentByIdMap(documents)

  return documents.filter((item) => {
    if (!selectedIdSet.has(item.id)) {
      return false
    }

    let parentId = item.parentId ?? 0
    while (parentId) {
      if (selectedIdSet.has(parentId)) {
        return false
      }
      const parent = documentMap.get(parentId)
      parentId = parent?.parentId ?? 0
    }
    return true
  })
}

export const buildBatchFolderOptions = (documents, selectedDocuments) => {
  const forbiddenFolderIds = new Set()

  selectedDocuments.forEach((item) => {
    if (item.docType === 'FOLDER') {
      forbiddenFolderIds.add(item.id)
      documents.forEach((candidate) => {
        if ((candidate.path || '').startsWith(`${item.path}/`)) {
          forbiddenFolderIds.add(candidate.id)
        }
      })
    }
  })

  return [{ id: 0, label: '根目录' }].concat(
    documents
      .filter((item) => item.docType === 'FOLDER' && !forbiddenFolderIds.has(item.id))
      .map((item) => ({
        id: item.id,
        label: `${item.title} (${item.path})`,
      }))
  )
}

export const resolveBatchMoveInitialParentId = (selectedDocuments) => {
  if (selectedDocuments.length === 0) {
    return 0
  }

  const parentId = selectedDocuments[0].parentId ?? 0
  return selectedDocuments.every((item) => (item.parentId ?? 0) === parentId) ? parentId : 0
}

export const validateBatchDeleteSelection = (documents, selectedIds) => {
  const selectedIdSet = new Set(selectedIds)

  for (const item of documents) {
    if (item.docType !== 'FOLDER' || !selectedIdSet.has(item.id)) {
      continue
    }

    const hasUnselectedDescendant = documents.some((candidate) => {
      if (candidate.id === item.id) {
        return false
      }
      if (!(candidate.path || '').startsWith(`${item.path}/`)) {
        return false
      }
      return !selectedIdSet.has(candidate.id)
    })

    if (hasUnselectedDescendant) {
      return `目录“${item.title}”仍有未选中的子节点，不能批量删除`
    }
  }

  return ''
}

export const buildInitialExpandedFolderIds = (documents, targetDocumentId = null) => {
  const expandedIds = new Set(
    documents
      .filter((item) => item.docType === 'FOLDER' && (item.parentId ?? 0) === 0)
      .map((item) => item.id)
  )

  if (!targetDocumentId) {
    return Array.from(expandedIds)
  }

  const documentMap = getDocumentByIdMap(documents)
  let currentDocument = documentMap.get(targetDocumentId) || null

  if (currentDocument?.docType === 'FOLDER') {
    expandedIds.add(currentDocument.id)
  }

  while (currentDocument?.parentId) {
    const parentDocument = documentMap.get(currentDocument.parentId) || null
    if (!parentDocument) {
      break
    }
    if (parentDocument.docType === 'FOLDER') {
      expandedIds.add(parentDocument.id)
    }
    currentDocument = parentDocument
  }

  return Array.from(expandedIds)
}

export const isTreeItemVisible = (item, documentMap, expandedFolderIdSet) => {
  let parentId = item.parentId ?? 0

  while (parentId) {
    if (!expandedFolderIdSet.has(parentId)) {
      return false
    }
    const parentDocument = documentMap.get(parentId)
    parentId = parentDocument?.parentId ?? 0
  }

  return true
}
