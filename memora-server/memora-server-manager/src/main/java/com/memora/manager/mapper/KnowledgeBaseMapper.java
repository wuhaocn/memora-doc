package com.memora.manager.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.memora.manager.entity.KnowledgeBase;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

/**
 * 知识库Mapper
 */
@Mapper
public interface KnowledgeBaseMapper extends BaseMapper<KnowledgeBase> {
    
    /**
     * 增加文档数量
     */
    @Update("UPDATE knowledge_base SET document_count = document_count + 1 WHERE id = #{id}")
    void incrementDocumentCount(@Param("id") Long id);
    
    /**
     * 减少文档数量
     */
    @Update("UPDATE knowledge_base SET document_count = document_count - 1 WHERE id = #{id}")
    void decrementDocumentCount(@Param("id") Long id);

    @Update("UPDATE knowledge_base SET document_count = #{documentCount}, updated_at = CURRENT_TIMESTAMP WHERE id = #{id}")
    void updateDocumentCount(@Param("id") Long id, @Param("documentCount") long documentCount);
}
