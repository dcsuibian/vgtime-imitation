package com.dcsuibian.vgtimeimitation.service;

import com.dcsuibian.vgtimeimitation.entity.TopicComment;
import com.dcsuibian.vgtimeimitation.vo.PageWrapper;

public interface TopicCommentService {
    PageWrapper<TopicComment> getByTopicIdAndParentId(long topicId, Long parentId, int pageNumber, int pageSize);
}
