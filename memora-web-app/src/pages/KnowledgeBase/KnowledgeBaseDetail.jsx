import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import DocumentActionModal from '../../components/Document/DocumentActionModal'
import DocumentBatchMoveModal from '../../components/Document/DocumentBatchMoveModal'
import DocumentReadLinkDrawer from '../../components/Document/DocumentReadLinkDrawer'
import KnowledgeBaseContextPanel from '../../components/KnowledgeBase/KnowledgeBaseContextPanel'
import KnowledgeBaseFormModal from '../../components/KnowledgeBase/KnowledgeBaseFormModal'
import KnowledgeBaseDocumentPanel from '../../components/KnowledgeBase/KnowledgeBaseDocumentPanel'
import KnowledgeBasePermissionModal from '../../components/KnowledgeBase/KnowledgeBasePermissionModal'
import KnowledgeBaseTreePanel from '../../components/KnowledgeBase/KnowledgeBaseTreePanel'
import { PAGE_STATUS, useKnowledgeBaseDetailController } from '../../hooks/useKnowledgeBaseDetailController'
import styles from './KnowledgeBaseDetail.module.css'

const ROLE_LABELS = {
  OWNER: '所有者',
  ADMIN: '管理员',
  EDITOR: '编辑者',
  REVIEWER: '审核者',
  VIEWER: '只读',
}

const KnowledgeBaseDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useAuth()
  const controller = useKnowledgeBaseDetailController({
    id,
    currentUser,
    navigate,
    locationState: location.state,
  })

  const {
    pageStatus,
    pageErrorMessage,
    knowledgeBase,
    documents,
    selectedDocument,
    search,
    setSearch,
    editing,
    setEditing,
    submitting,
    modalError,
    setModalError,
    feedback,
    documentModalOpen,
    setDocumentModalOpen,
    documentModalMode,
    documentModalType,
    documentModalInitialValues,
    documentModalError,
    setDocumentModalError,
    documentSubmitting,
    batchMode,
    selectedDocumentIds,
    batchMoveOpen,
    setBatchMoveOpen,
    batchMoveSubmitting,
    batchMoveError,
    setBatchMoveError,
    batchDeleting,
    draggingDocumentId,
    dragOverDocumentId,
    dragOverPosition,
    dragSorting,
    expandedFolderIdSet,
    treePanelCollapsed,
    setTreePanelCollapsed,
    focusMode,
    scrolled,
    knowledgeBaseInfoVisible,
    setKnowledgeBaseInfoVisible,
    readLinkOpen,
    setReadLinkOpen,
    permissionModalOpen,
    setPermissionModalOpen,
    permissionMembers,
    permissionAssignments,
    permissionLoading,
    permissionSubmitting,
    permissionError,
    setPermissionError,
    visibleDocuments,
    safeSelectedDocumentContent,
    canMoveUp,
    canMoveDown,
    documentModalFolderOptions,
    selectedDocumentIdSet,
    topLevelSelectedDocuments,
    batchFolderOptions,
    batchMoveInitialParentId,
    canWriteKnowledgeBase,
    canManageKnowledgeBase,
    dragSortEnabled,
    shouldRenderRichPreview,
    compactKnowledgeBaseDescription,
    hasActiveSearch,
    treePanelStatusText,
    treeHintText,
    hasFolderNodes,
    selectedFolderDocumentCount,
    selectedFolderDirectoryCount,
    loadData,
    handleSaveKnowledgeBase,
    openPermissionModal,
    handleSubmitPermissions,
    clearBatchSelection,
    handleToggleBatchMode,
    clearDragState,
    toggleFolderExpanded,
    expandAllFolders,
    collapseToTopLevelFolders,
    handleTreeItemKeyDown,
    handleOpenEditorPage,
    handleToggleFocusMode,
    openCreateDocumentModal,
    openEditDocumentModal,
    handleSubmitDocument,
    handleDeleteDocument,
    handleReorderDocument,
    handleBatchMove,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleBatchDelete,
    handleDeleteKnowledgeBase,
    toggleDocumentSelection,
    setSelectedDocumentId,
  } = controller

  if (pageStatus === PAGE_STATUS.LOADING) {
    return <div className={styles.state}>正在加载知识库...</div>
  }

  if (pageStatus !== PAGE_STATUS.READY || !knowledgeBase) {
    const stateTitleMap = {
      [PAGE_STATUS.FORBIDDEN]: '当前会话无权访问该知识库',
      [PAGE_STATUS.NOT_FOUND]: '当前知识库不存在',
      [PAGE_STATUS.ERROR]: '知识库详情暂时不可用',
    }

    return (
      <div className={styles.stateCard}>
        <h1>{stateTitleMap[pageStatus] || '知识库详情暂时不可用'}</h1>
        <p>{pageErrorMessage || '请返回工作台查看当前可访问的知识库。'}</p>
        <div className={styles.stateActions}>
          <button type="button" className={styles.primaryButton} onClick={() => navigate('/')}>
            返回工作台
          </button>
          <button type="button" className={styles.secondaryButton} onClick={() => loadData({ resetState: true })}>
            重新加载
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.page} ${scrolled ? styles.pageScrolled : ''}`}>
      <KnowledgeBaseTreePanel
        styles={styles}
        feedback={feedback}
        knowledgeBase={knowledgeBase}
        roleLabels={ROLE_LABELS}
        compactKnowledgeBaseDescription={compactKnowledgeBaseDescription}
        knowledgeBaseInfoVisible={knowledgeBaseInfoVisible}
        setKnowledgeBaseInfoVisible={setKnowledgeBaseInfoVisible}
        canWriteKnowledgeBase={canWriteKnowledgeBase}
        canManageKnowledgeBase={canManageKnowledgeBase}
        setModalError={setModalError}
        setEditing={setEditing}
        openPermissionModal={openPermissionModal}
        handleDeleteKnowledgeBase={handleDeleteKnowledgeBase}
        focusMode={focusMode}
        treePanelCollapsed={treePanelCollapsed}
        scrolled={scrolled}
        treePanelStatusText={treePanelStatusText}
        search={search}
        setSearch={setSearch}
        hasFolderNodes={hasFolderNodes}
        batchMode={batchMode}
        hasActiveSearch={hasActiveSearch}
        treeHintText={treeHintText}
        selectedDocumentIds={selectedDocumentIds}
        batchDeleting={batchDeleting}
        handleBatchDelete={handleBatchDelete}
        clearBatchSelection={clearBatchSelection}
        setBatchMoveError={setBatchMoveError}
        setBatchMoveOpen={setBatchMoveOpen}
        documents={documents}
        visibleDocuments={visibleDocuments}
        selectedDocument={selectedDocument}
        selectedDocumentIdSet={selectedDocumentIdSet}
        draggingDocumentId={draggingDocumentId}
        dragOverDocumentId={dragOverDocumentId}
        dragOverPosition={dragOverPosition}
        dragSortEnabled={dragSortEnabled}
        handleToggleBatchMode={handleToggleBatchMode}
        setTreePanelCollapsed={setTreePanelCollapsed}
        openCreateDocumentModal={openCreateDocumentModal}
        expandAllFolders={expandAllFolders}
        collapseToTopLevelFolders={collapseToTopLevelFolders}
        handleTreeItemKeyDown={handleTreeItemKeyDown}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        clearDragState={clearDragState}
        toggleDocumentSelection={toggleDocumentSelection}
        setSelectedDocumentId={setSelectedDocumentId}
        toggleFolderExpanded={toggleFolderExpanded}
        expandedFolderIdSet={expandedFolderIdSet}
      />

      <section
        className={[
          styles.contentGrid,
          focusMode ? styles.contentGridFocus : '',
          !focusMode && treePanelCollapsed ? styles.contentGridNoLeft : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <KnowledgeBaseDocumentPanel
          styles={styles}
          focusMode={focusMode}
          treePanelCollapsed={treePanelCollapsed}
          setTreePanelCollapsed={setTreePanelCollapsed}
          documents={documents}
          selectedDocument={selectedDocument}
          canWriteKnowledgeBase={canWriteKnowledgeBase}
          handleOpenEditorPage={handleOpenEditorPage}
          setReadLinkOpen={setReadLinkOpen}
          openCreateDocumentModal={openCreateDocumentModal}
          openEditDocumentModal={openEditDocumentModal}
          navigate={navigate}
          handleToggleFocusMode={handleToggleFocusMode}
          canMoveUp={canMoveUp}
          dragSorting={dragSorting}
          handleReorderDocument={handleReorderDocument}
          canMoveDown={canMoveDown}
          handleDeleteDocument={handleDeleteDocument}
          selectedFolderDocumentCount={selectedFolderDocumentCount}
          selectedFolderDirectoryCount={selectedFolderDirectoryCount}
          shouldRenderRichPreview={shouldRenderRichPreview}
          safeSelectedDocumentContent={safeSelectedDocumentContent}
        />
        {!focusMode && (
          <KnowledgeBaseContextPanel
            styles={styles}
            knowledgeBase={knowledgeBase}
            documents={documents}
            selectedDocument={selectedDocument}
            canWriteKnowledgeBase={canWriteKnowledgeBase}
            canManageKnowledgeBase={canManageKnowledgeBase}
            roleLabels={ROLE_LABELS}
          />
        )}
      </section>

      <KnowledgeBaseFormModal
        mode="edit"
        open={editing}
        initialValues={knowledgeBase}
        submitting={submitting}
        errorMessage={modalError}
        onClose={() => {
          setModalError('')
          setEditing(false)
        }}
        onSubmit={handleSaveKnowledgeBase}
      />
      <DocumentActionModal
        open={documentModalOpen}
        mode={documentModalMode}
        docType={documentModalType}
        initialValues={documentModalInitialValues}
        folderOptions={documentModalFolderOptions}
        submitting={documentSubmitting}
        errorMessage={documentModalError}
        onClose={() => {
          setDocumentModalError('')
          setDocumentModalOpen(false)
        }}
        onSubmit={handleSubmitDocument}
      />
      <DocumentBatchMoveModal
        open={batchMoveOpen}
        selectedCount={topLevelSelectedDocuments.length}
        folderOptions={batchFolderOptions}
        submitting={batchMoveSubmitting}
        errorMessage={batchMoveError}
        initialParentId={batchMoveInitialParentId}
        onClose={() => {
          setBatchMoveError('')
          setBatchMoveOpen(false)
        }}
        onSubmit={handleBatchMove}
      />
      <DocumentReadLinkDrawer
        open={readLinkOpen}
        documentId={selectedDocument?.docType === 'DOC' ? selectedDocument.id : null}
        title={selectedDocument?.title || ''}
        onClose={() => setReadLinkOpen(false)}
      />
      <KnowledgeBasePermissionModal
        open={permissionModalOpen}
        loading={permissionLoading}
        members={permissionMembers}
        currentMembers={permissionAssignments}
        currentUserId={currentUser.id}
        submitting={permissionSubmitting}
        errorMessage={permissionError}
        onClose={() => {
          setPermissionError('')
          setPermissionModalOpen(false)
        }}
        onSubmit={handleSubmitPermissions}
      />
    </div>
  )
}

export default KnowledgeBaseDetail
