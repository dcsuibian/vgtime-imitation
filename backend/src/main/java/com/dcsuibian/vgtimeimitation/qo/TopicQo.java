package com.dcsuibian.vgtimeimitation.qo;

import com.dcsuibian.vgtimeimitation.entity.Topic;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TopicQo {
    Long authorId;
    Long editorId;
    Topic.Type type;
    Topic.Status status;
}
