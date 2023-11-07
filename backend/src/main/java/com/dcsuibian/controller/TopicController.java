package com.dcsuibian.controller;

import com.dcsuibian.entity.Topic;
import com.dcsuibian.service.TopicService;
import com.dcsuibian.vo.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/topics")
public class TopicController {
    private final TopicService topicService;

    @Autowired
    public TopicController(TopicService topicService) {
        this.topicService = topicService;
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
}
