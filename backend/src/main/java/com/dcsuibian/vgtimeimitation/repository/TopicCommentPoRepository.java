package com.dcsuibian.vgtimeimitation.repository;

import com.dcsuibian.vgtimeimitation.po.TopicCommentPo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicCommentPoRepository extends JpaRepository<TopicCommentPo, Long> {
    Page<TopicCommentPo> findByTopicIdAndParentIdOrderByCreateTimeDesc(long topicId, Long parentId, Pageable pageable);
}
