package com.memora.manager.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.memora.manager.entity.ResourceTag;
import org.apache.ibatis.annotations.Mapper;

/**
 * 资源标签关联Mapper
 */
@Mapper
public interface ResourceTagMapper extends BaseMapper<ResourceTag> {
}