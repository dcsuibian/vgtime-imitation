package com.dcsuibian.vgtimeimitation.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class TopicComment {
    private Long id;
    @JsonIgnore
    private Topic topic;
    private User user;
    private String content;
    private Instant createTime;
    private Long replyCount; // 回复数。如果是主评论，则为其下的回复数；对于非主评论，没有意义，故为null
    private TopicComment parent; // 父评论。如果是主评论，则为null
    private TopicComment replyTo; // 回复的评论。如果是主评论，则为null
}
