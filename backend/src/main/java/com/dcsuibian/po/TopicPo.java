package com.dcsuibian.po;

import com.dcsuibian.entity.Topic;
import com.dcsuibian.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity(name = "topic")
public class TopicPo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String summary;
    private String content;
    private String cover;
    private String type;
    private Long createTime;
    private Long updateTime;
    private String status;
    private Long changeTime;
    private Long authorId;
    private Long editorId;

    public static TopicPo convert(Topic topic) {
        if (null == topic) return null;
        TopicPo po = new TopicPo();
        po.setId(topic.getId());
        po.setTitle(topic.getTitle());
        po.setSummary(topic.getSummary());
        po.setContent(topic.getContent());
        po.setCover(topic.getCover());
        po.setType(topic.getType().getCode());
        po.setCreateTime(null == topic.getCreateTime() ? null : topic.getCreateTime().toEpochMilli());
        po.setUpdateTime(null == topic.getUpdateTime() ? null : topic.getUpdateTime().toEpochMilli());
        po.setStatus(topic.getStatus().getCode());
        po.setChangeTime(null == topic.getChangeTime() ? null : topic.getChangeTime().toEpochMilli());
        po.setAuthorId(null == topic.getAuthor() ? null : topic.getAuthor().getId());
        po.setEditorId(null == topic.getEditor() ? null : topic.getEditor().getId());
        return po;
    }

    public static Topic convert(TopicPo po) {
        if (null == po) return null;
        Topic topic = new Topic();
        topic.setId(po.getId());
        topic.setTitle(po.getTitle());
        topic.setSummary(po.getSummary());
        topic.setContent(po.getContent());
        topic.setCover(po.getCover());
        topic.setType(Topic.Type.fromCode(po.getType()));
        topic.setCreateTime(null == po.getCreateTime() ? null : Instant.ofEpochMilli(po.getCreateTime()));
        topic.setUpdateTime(null == po.getUpdateTime() ? null : Instant.ofEpochMilli(po.getUpdateTime()));
        topic.setStatus(Topic.Status.fromCode(po.getStatus()));
        topic.setChangeTime(null == po.getChangeTime() ? null : Instant.ofEpochMilli(po.getChangeTime()));
        if (null != po.getAuthorId()) {
            User author = new User();
            author.setId(po.getAuthorId());
            topic.setAuthor(author);
        }
        if (null != po.getEditorId()) {
            User editor = new User();
            editor.setId(po.getEditorId());
            topic.setEditor(editor);
        }
        return topic;
    }
}
