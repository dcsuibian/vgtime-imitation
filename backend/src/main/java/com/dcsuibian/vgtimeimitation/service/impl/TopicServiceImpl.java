package com.dcsuibian.vgtimeimitation.service.impl;

import com.dcsuibian.vgtimeimitation.entity.Topic;
import com.dcsuibian.vgtimeimitation.entity.User;
import com.dcsuibian.vgtimeimitation.po.TopicPo;
import com.dcsuibian.vgtimeimitation.qo.TopicQo;
import com.dcsuibian.vgtimeimitation.repository.TopicPoRepository;
import com.dcsuibian.vgtimeimitation.service.TopicService;
import com.dcsuibian.vgtimeimitation.service.UserService;
import com.dcsuibian.vgtimeimitation.vo.HomePageVo;
import com.dcsuibian.vgtimeimitation.vo.PageWrapper;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service

public class TopicServiceImpl implements TopicService {
    private final TopicPoRepository poRepository;
    private final UserService userService;

    @Autowired
    public TopicServiceImpl(TopicPoRepository poRepository, UserService userService) {
        this.poRepository = poRepository;
        this.userService = userService;
    }

    @Override
    @Transactional
    public Topic add(Topic topic) {
        User author = topic.getAuthor();
        Instant now = Instant.now();
        topic.setCreateTime(now);
        topic.setUpdateTime(now);
        topic.setChangeTime(now);
        TopicPo po = TopicPo.convert(topic);
        po = poRepository.save(po);
        topic = TopicPo.convert(po);
        topic.setAuthor(author);
        return topic;
    }

    @Override
    public PageWrapper<Topic> get(TopicQo qo, int pageNumber, int pageSize) {
        Specification<TopicPo> spec = this.specification(qo);
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize); // PageRequest的页码从0开始
        PageWrapper<Topic> page = PageWrapper.of(poRepository.findAll(spec, pageable), TopicPo::convert);
        fillUsersAndClearContent(page.getData());
        return page;
    }

    @Override
    public Topic getById(long id) {
        Optional<TopicPo> optional = poRepository.findById(id);
        if (optional.isEmpty()) {
            return null;
        }
        Topic topic = TopicPo.convert(optional.get());
        fillUsersAndClearContent(topic);
        return topic;
    }

    @Override
    public HomePageVo getHomePage() {
        HomePageVo result = new HomePageVo();

        List<Topic> news = getTopicsByType(Topic.Type.NEWS, 16);
        result.setNews(news);
        List<Topic> guides = getTopicsByType(Topic.Type.GUIDE, 4);
        result.setGuides(guides);
        List<Topic> reviews = getTopicsByType(Topic.Type.REVIEW, 4);
        result.setReviews(reviews);
        List<Topic> cultures = getTopicsByType(Topic.Type.CULTURE, 4);
        result.setCultures(cultures);
        List<Topic> comics = getTopicsByType(Topic.Type.COMIC, 4);
        result.setComics(comics);
        List<Topic> hotNews = computeHotNews(guides, reviews, cultures, comics);
        result.setHotNews(hotNews);

        List<Topic> all = new ArrayList<>();
        all.addAll(news);
        all.addAll(guides);
        all.addAll(reviews);
        all.addAll(cultures);
        all.addAll(comics);
        fillUsersAndClearContent(all);
        return result;
    }

    private Specification<TopicPo> specification(TopicQo qo) {
        return (root, query, cb) -> {
            Path<String> typePath = root.get("type");
            Path<String> statusPath = root.get("status");
            Path<Long> authorIdPath = root.get("authorId");
            Path<Long> editorIdPath = root.get("editorId");
            Path<Long> changeTimePath = root.get("changeTime");

            Predicate predicate = cb.conjunction();
            if (null != qo.getType()) {
                predicate = cb.and(predicate, cb.equal(typePath, qo.getType().getCode()));
            }
            if (null != qo.getStatus()) {
                predicate = cb.and(predicate, cb.equal(statusPath, qo.getStatus().getCode()));
            }
            if (null != qo.getAuthorId()) {
                predicate = cb.and(predicate, cb.equal(authorIdPath, qo.getAuthorId()));
            }
            if (null != qo.getEditorId()) {
                predicate = cb.and(predicate, cb.equal(editorIdPath, qo.getEditorId()));
            }
            query.orderBy(cb.desc(changeTimePath));
            return predicate;
        };
    }

    private List<Topic> getTopicsByType(Topic.Type type, int size) {
        TopicQo qo = new TopicQo();
        qo.setType(type);
        return get(qo, 1, size).getData();
    }

    private List<Topic> computeHotNews(List<Topic> guides, List<Topic> reviews, List<Topic> cultures, List<Topic> comics) {
        List<Topic> topics = new ArrayList<>();
        topics.addAll(guides);
        topics.addAll(reviews);
        topics.addAll(cultures);
        topics.addAll(comics);
        topics.sort((a, b) -> b.getChangeTime().compareTo(a.getChangeTime()));
        return topics.subList(0, 5);
    }

    private void fillUsersAndClearContent(List<Topic> topics) {
        Map<Long, User> userMap = new HashMap<>();
        for (var topic : topics) {
            userMap.put(topic.getAuthor().getId(), null);
            if (null != topic.getEditor()) { // editor有可能为空
                userMap.put(topic.getEditor().getId(), null);
            }
        }
        for (var userId : userMap.keySet()) {
            userMap.put(userId, userService.getPublicById(userId));
        }
        for (var topic : topics) {
            topic.setAuthor(userMap.get(topic.getAuthor().getId()));
            if (null != topic.getEditor()) { // editor有可能为空
                topic.setEditor(userMap.get(topic.getEditor().getId()));
            }
            topic.setContent(null);
        }
    }

    private void fillUsersAndClearContent(Topic topic) {
        topic.setAuthor(userService.getPublicById(topic.getAuthor().getId()));
        if (null != topic.getEditor()) { // editor有可能为空
            if (topic.getAuthor().getId().equals(topic.getEditor().getId())) {
                topic.setEditor(topic.getAuthor());
            } else {
                topic.setEditor(userService.getPublicById(topic.getEditor().getId()));
            }
        }
    }
}
