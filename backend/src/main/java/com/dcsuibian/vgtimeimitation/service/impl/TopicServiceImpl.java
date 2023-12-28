package com.dcsuibian.vgtimeimitation.service.impl;

import com.dcsuibian.vgtimeimitation.entity.Topic;
import com.dcsuibian.vgtimeimitation.entity.User;
import com.dcsuibian.vgtimeimitation.po.TopicPo;
import com.dcsuibian.vgtimeimitation.repository.TopicPoRepository;
import com.dcsuibian.vgtimeimitation.service.TopicService;
import com.dcsuibian.vgtimeimitation.service.UserService;
import com.dcsuibian.vgtimeimitation.vo.HomePageVo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static com.dcsuibian.vgtimeimitation.util.Util.*;

import java.util.*;

@Service

public class TopicServiceImpl implements TopicService {
    private final TopicPoRepository poRepository;
    private final UserService userService;

    @Autowired
    public TopicServiceImpl(
            TopicPoRepository poRepository,
            UserService userService
    ) {
        this.poRepository = poRepository;
        this.userService = userService;
    }

    @Override
    @Transactional
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
        fillUsersAndClearContent(result);
        return result;
    }

    @Override
    public Topic getById(long id) {
        Optional<TopicPo> optional = poRepository.findById(id);
        if (optional.isEmpty()) {
            return null;
        }
        Topic topic = TopicPo.convert(optional.get());
        topic.setAuthor(userService.getById(topic.getAuthor().getId()));
        if (topic.getAuthor().getId().equals(topic.getEditor().getId())) {
            topic.setEditor(topic.getAuthor());
        } else {
            topic.setEditor(userService.getById(topic.getEditor().getId()));
        }
        return topic;
    }

    private List<Topic> getTopicsByType(Topic.Type type, int size) {
        Pageable pageable = PageRequest.of(0, size);
        List<TopicPo> content = poRepository.findByTypeAndStatusOrderByChangeTimeDesc(type.getCode(), Topic.Status.PUBLISHED.getCode(), pageable).getContent();
        return batchConvert(content, TopicPo::convert);
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

    private void fillUsersAndClearContent(HomePageVo vo) {
        List<Topic> all = new ArrayList<>();
        all.addAll(vo.getNews());
        all.addAll(vo.getGuides());
        all.addAll(vo.getReviews());
        all.addAll(vo.getCultures());
        all.addAll(vo.getComics());
        Map<Long, User> userMap = new HashMap<>();
        for (var topic : all) {
            userMap.put(topic.getAuthor().getId(), null);
            userMap.put(topic.getEditor().getId(), null);
        }
        for (var userId : userMap.keySet()) {
            userMap.put(userId, userService.getById(userId));
        }
        for (var topic : all) {
            topic.setAuthor(userMap.get(topic.getAuthor().getId()));
            topic.setEditor(userMap.get(topic.getEditor().getId()));
            topic.setContent(null);
        }
    }
}
