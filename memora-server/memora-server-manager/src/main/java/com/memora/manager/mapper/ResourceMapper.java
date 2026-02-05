package com.memora.manager.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.memora.manager.entity.Resource;
import org.apache.ibatis.annotations.Mapper;

/**
 * 资源Mapper
 */
@Mapper
public interface ResourceMapper extends BaseMapper<Resource> {
}