package com.memora.manager.vo;

import lombok.Data;

@Data
public class WorkspaceVO {
    private Long id;

    private String name;

    private String slug;

    private String industry;

    private String planName;

    private Long ownerUserId;

    private Long activeMemberCount;
}
