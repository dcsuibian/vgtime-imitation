package com.dcsuibian.vgtimeimitation.service.impl;

import com.dcsuibian.vgtimeimitation.entity.TopicComment;
import com.dcsuibian.vgtimeimitation.exception.BusinessException;
import com.dcsuibian.vgtimeimitation.po.TopicCommentPo;
import com.dcsuibian.vgtimeimitation.repository.TopicCommentPoRepository;
import com.dcsuibian.vgtimeimitation.service.TopicCommentService;
import com.dcsuibian.vgtimeimitation.service.UserService;
import com.dcsuibian.vgtimeimitation.vo.PageWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class TopicCommentServiceImpl implements TopicCommentService {
    @Value("${vgtime-imitation.comment.enabled:true}")
    private boolean enabled;
    private final TopicCommentPoRepository poRepository;
    private final UserService userService;

    @Autowired
    public TopicCommentServiceImpl(TopicCommentPoRepository poRepository, UserService userService) {
        this.poRepository = poRepository;
        this.userService = userService;
    }

    public TopicComment getById(long id) {
        Optional<TopicCommentPo> optional = poRepository.findById(id);
        if (optional.isEmpty()) {
            return null;
        }
        TopicComment topicComment = TopicCommentPo.convert(optional.get());
        topicComment.setUser(userService.getPublicById(topicComment.getUser().getId()));
        return topicComment;
    }

    @Override
    public PageWrapper<TopicComment> getByTopicIdAndParentId(long topicId, Long parentId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize); // PageRequest的页码从0开始
        PageWrapper<TopicComment> page = PageWrapper.of(poRepository.findByTopicIdAndParentIdOrderByCreateTimeDesc(topicId, parentId, pageable), TopicCommentPo::convert);
        for (TopicComment comment : page.getData()) {
            comment.setUser(userService.getPublicById(comment.getUser().getId()));
            if (null != comment.getReplyTo()) {
                comment.setReplyTo(getById(comment.getReplyTo().getId()));
            }
        }
        return page;
    }

    @Override
    @Transactional
    public TopicComment add(TopicComment topicComment) {
        if (!enabled) {
            throw new BusinessException("根据相关法律法规，评论功能已关闭");
        }
        TopicCommentPo po = TopicCommentPo.convert(topicComment);
        po.setCreateTime(System.currentTimeMillis()); // 设置创建时间
        if (null == po.getParentId()) {
            // 判定为主评论
            po.setReplyCount(0L);
            po.setReplyTo(null);
        } else {
            // 判定为子评论
            po.setReplyCount(null);
            Optional<TopicCommentPo> optional = poRepository.findById(po.getParentId());
            if (optional.isEmpty()) {
                throw new RuntimeException("父评论不存在");
            }
            TopicCommentPo parentPo = optional.get();
            parentPo.setReplyCount(parentPo.getReplyCount() + 1);
            poRepository.save(parentPo);
        }
        po = poRepository.save(po);
        topicComment = TopicCommentPo.convert(po);
        topicComment.setUser(userService.getPublicById(topicComment.getUser().getId()));
        if (null != topicComment.getReplyTo()) {
            topicComment.setReplyTo(getById(topicComment.getReplyTo().getId()));
        }
        return topicComment;
    }
}
