package com.memora.manager.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.memora.manager.entity.Tag;
import org.apache.ibatis.annotations.Mapper;

/**
 * 标签Mapper
 */
@Mapper
public interface TagMapper extends BaseMapper<Tag> {
}