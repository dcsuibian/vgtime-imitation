package com.dcsuibian.vgtimeimitation.controller;

import com.dcsuibian.vgtimeimitation.entity.Topic;
import com.dcsuibian.vgtimeimitation.entity.TopicComment;
import com.dcsuibian.vgtimeimitation.service.TopicCommentService;
import com.dcsuibian.vgtimeimitation.service.TopicService;
import com.dcsuibian.vgtimeimitation.vo.PageWrapper;
import com.dcsuibian.vgtimeimitation.vo.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/topics")
public class TopicController {
    private final TopicService topicService;
    private final TopicCommentService topicCommentService;

    @Autowired
    public TopicController(TopicService topicService, TopicCommentService topicCommentService) {
        this.topicService = topicService;
        this.topicCommentService = topicCommentService;
    }

    @GetMapping("/{id}")
    public ResponseWrapper<Topic> getById(@PathVariable("id") long id) {
        Topic topic = topicService.getById(id);
        if (null != topic) {
            return ResponseWrapper.build(topic, "给你这个topic", 200);
        } else {
            return ResponseWrapper.build(null, "不存在这个topic", 404);
        }
    }

    @GetMapping("/{topicId}/comments")
    public ResponseWrapper<PageWrapper<TopicComment>> getComments(@PathVariable("topicId") long topicId, @RequestParam(value = "parentId",required = false) Long parentId, @RequestParam("pageNumber") int pageNumber, @RequestParam("pageSize") int pageSize) {
        PageWrapper<TopicComment> page = topicCommentService.getByTopicIdAndParentId(topicId, parentId, pageNumber, pageSize);
        return ResponseWrapper.build(page, "给你这个topic的评论", 200);
    }
}
