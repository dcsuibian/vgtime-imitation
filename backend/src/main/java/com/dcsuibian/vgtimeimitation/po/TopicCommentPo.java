package com.dcsuibian.vgtimeimitation.po;

import com.dcsuibian.vgtimeimitation.entity.Topic;
import com.dcsuibian.vgtimeimitation.entity.TopicComment;
import com.dcsuibian.vgtimeimitation.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity(name = "topic_comment")
public class TopicCommentPo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long topicId;
    private Long userId;
    private String content;
    private Long createTime;
    private Long replyCount;
    private Long parentId;
    private Long replyTo;

    public static TopicCommentPo convert(TopicComment comment) {
        if (null == comment) return null;
        TopicCommentPo po = new TopicCommentPo();
        po.setId(comment.getId());
        po.setTopicId(null == comment.getTopic() ? null : comment.getTopic().getId());
        po.setUserId(null == comment.getUser() ? null : comment.getUser().getId());
        po.setContent(comment.getContent());
        po.setCreateTime(null == comment.getCreateTime() ? null : comment.getCreateTime().toEpochMilli());
        po.setReplyCount(comment.getReplyCount());
        po.setParentId(null == comment.getParent() ? null : comment.getParent().getId());
        po.setReplyTo(null == comment.getReplyTo() ? null : comment.getReplyTo().getId());
        return po;
    }

    public static TopicComment convert(TopicCommentPo po) {
        if (null == po) return null;
        TopicComment comment = new TopicComment();
        comment.setId(po.getId());
        if (null != po.getTopicId()) {
            Topic topic = new Topic();
            topic.setId(po.getTopicId());
            comment.setTopic(topic);
        }
        if (null != po.getUserId()) {
            User user = new User();
            user.setId(po.getUserId());
            comment.setUser(user);
        }
        comment.setContent(po.getContent());
        comment.setCreateTime(null == po.getCreateTime() ? null : Instant.ofEpochMilli(po.getCreateTime()));
        comment.setReplyCount(po.getReplyCount());
        if (null != po.getParentId()) {
            TopicComment parent = new TopicComment();
            parent.setId(po.getParentId());
            comment.setParent(parent);
        }
        if (null != po.getReplyTo()) {
            TopicComment replyTo = new TopicComment();
            replyTo.setId(po.getReplyTo());
            comment.setReplyTo(replyTo);
        }
        return comment;
    }
}
