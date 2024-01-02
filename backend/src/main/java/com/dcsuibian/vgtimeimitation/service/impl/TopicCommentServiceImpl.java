package com.dcsuibian.vgtimeimitation.service.impl;

import com.dcsuibian.vgtimeimitation.entity.TopicComment;
import com.dcsuibian.vgtimeimitation.po.TopicCommentPo;
import com.dcsuibian.vgtimeimitation.repository.TopicCommentPoRepository;
import com.dcsuibian.vgtimeimitation.service.TopicCommentService;
import com.dcsuibian.vgtimeimitation.service.UserService;
import com.dcsuibian.vgtimeimitation.util.Util;
import com.dcsuibian.vgtimeimitation.vo.PageWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopicCommentServiceImpl implements TopicCommentService {
    private final TopicCommentPoRepository poRepository;
    private final UserService userService;

    @Autowired
    public TopicCommentServiceImpl(TopicCommentPoRepository poRepository, UserService userService) {
        this.poRepository = poRepository;
        this.userService = userService;
    }

    @Override
    public PageWrapper<TopicComment> getByTopicIdAndParentId(long topicId, Long parentId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize); // PageRequest的页码从0开始
        Page<TopicCommentPo> page = poRepository.findByTopicIdAndParentIdOrderByCreateTimeDesc(topicId, parentId, pageable);
        List<TopicComment> data = Util.batchConvert(page.getContent(), TopicCommentPo::convert);
        for (TopicComment comment : data) {
            comment.setUser(userService.getPublicById(comment.getUser().getId()));
        }
        return PageWrapper.build(data, pageNumber, pageSize, page.getTotalElements());
    }
}
