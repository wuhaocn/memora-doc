package com.memora.manager.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.memora.manager.entity.DocumentVersion;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * 文档版本Mapper
 */
@Mapper
public interface DocumentVersionMapper extends BaseMapper<DocumentVersion> {
    
    /**
     * 获取文档的最新版本号
     */
    @Select("SELECT MAX(version) FROM document_version WHERE document_id = #{documentId}")
    Integer getLatestVersion(@Param("documentId") Long documentId);
}
