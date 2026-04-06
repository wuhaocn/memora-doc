package com.memora.manager.vo;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 文档版本VO
 */
@Data
public class DocumentVersionVO {
    
    private Long id;
    
    private Long documentId;
    
    private Integer version;
    
    private String title;

    private String format;

    private String content;

    private String contentText;

    private String sourceType;
    
    private String remark;
    
    private Long userId;
    
    private LocalDateTime createdAt;
}
