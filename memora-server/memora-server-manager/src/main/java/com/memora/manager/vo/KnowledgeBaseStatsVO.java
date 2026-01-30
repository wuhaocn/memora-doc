package com.memora.manager.vo;

import lombok.Data;

/**
 * 知识库统计VO
 */
@Data
public class KnowledgeBaseStatsVO {
    
    /**
     * 总知识库数量
     */
    private long totalCount;
    
    /**
     * 公开知识库数量
     */
    private long publicCount;
    
    /**
     * 私有知识库数量
     */
    private long privateCount;
    
    /**
     * 总文档数量
     */
    private long totalDocumentCount;
    
    /**
     * 总浏览次数
     */
    private long totalViewCount;
    
    /**
     * 最近7天创建的知识库数量
     */
    private long recent7DaysCount;
}
