package com.memora.manager.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.memora.manager.entity.SyncJob;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SyncJobMapper extends BaseMapper<SyncJob> {
}
