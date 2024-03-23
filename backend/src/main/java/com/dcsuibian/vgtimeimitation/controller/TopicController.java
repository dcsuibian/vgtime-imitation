package com.dcsuibian.vgtimeimitation.controller;

import com.dcsuibian.vgtimeimitation.entity.Topic;
import com.dcsuibian.vgtimeimitation.entity.TopicComment;
import com.dcsuibian.vgtimeimitation.qo.TopicQo;
import com.dcsuibian.vgtimeimitation.service.TopicCommentService;
import com.dcsuibian.vgtimeimitation.service.TopicService;
import com.dcsuibian.vgtimeimitation.vo.PageWrapper;
import com.dcsuibian.vgtimeimitation.vo.ResponseWrapper;
import com.dcsuibian.vgtimeimitation.vo.SessionVo;
import jakarta.servlet.http.HttpSession;
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

    @PostMapping
    public ResponseWrapper<Topic> add(@RequestBody Topic topic, HttpSession httpSession) {
        SessionVo sessionVo = (SessionVo) httpSession.getAttribute("session");
        topic.setAuthor(sessionVo.getUser());
        topic = topicService.add(topic);
        return ResponseWrapper.success(topic, 201);
    }

    @GetMapping
    public ResponseWrapper<PageWrapper<Topic>> get(
            @RequestParam(value = "authorId", required = false) Long authorId,
            @RequestParam(value = "editorId", required = false) Long editorId,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("pageSize") int pageSize
    ) {
        TopicQo qo = new TopicQo();
        qo.setAuthorId(authorId);
        qo.setEditorId(editorId);
        qo.setType(Topic.Type.fromCode(type));
        qo.setStatus(Topic.Status.fromCode(status));
        PageWrapper<Topic> page = topicService.get(qo, pageNumber, pageSize);
        return ResponseWrapper.success(page);
    }

    @GetMapping("/{id}")
    public ResponseWrapper<Topic> getById(@PathVariable("id") long id) {
        Topic topic = topicService.getById(id);
        if (null != topic) {
            return ResponseWrapper.success(topic);
        } else {
            return ResponseWrapper.fail("不存在这个topic", 404);
        }
    }

    @PostMapping("/{topicId}/comments")
    public ResponseWrapper<TopicComment> addComment(
            @PathVariable("topicId") long topicId,
            @RequestBody TopicComment topicComment,
            HttpSession httpSession
    ) {
        SessionVo sessionVo = (SessionVo) httpSession.getAttribute("session");
        Topic topic = topicComment.getTopic();
        if (null == topic) {
            topic = new Topic();
        }
        topic.setId(topicId);
        topicComment.setTopic(topic);
        topicComment.setUser(sessionVo.getUser());
        topicComment = topicCommentService.add(topicComment);
        return ResponseWrapper.success(topicComment, 201);
    }

    @GetMapping("/{topicId}/comments")
    public ResponseWrapper<PageWrapper<TopicComment>> getComments(
            @PathVariable("topicId") long topicId,
            @RequestParam(value = "parentId", required = false) Long parentId,
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("pageSize") int pageSize
    ) {
        PageWrapper<TopicComment> page = topicCommentService.getByTopicIdAndParentId(topicId, parentId, pageNumber, pageSize);
        return ResponseWrapper.success(page);
    }
}
