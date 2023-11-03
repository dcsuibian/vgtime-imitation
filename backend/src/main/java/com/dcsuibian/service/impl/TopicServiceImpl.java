package com.dcsuibian.service.impl;

import com.dcsuibian.entity.Topic;
import com.dcsuibian.entity.User;
import com.dcsuibian.po.TopicPo;
import com.dcsuibian.repository.TopicPoRepository;
import com.dcsuibian.service.TopicService;
import com.dcsuibian.service.UserService;
import com.dcsuibian.vo.HomePageVo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static com.dcsuibian.util.Util.*;

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
        List<Topic> news = getTopicsByType("新闻", 16);
        result.setNews(news);
        List<Topic> guides = getTopicsByType("攻略", 4);
        result.setGuides(guides);
        List<Topic> reviews = getTopicsByType("评测", 4);
        result.setReviews(reviews);
        List<Topic> cultures = getTopicsByType("文化", 4);
        result.setCultures(cultures);
        List<Topic> comics = getTopicsByType("漫画", 4);
        result.setComics(comics);
        List<Topic> hotNews = computeHotNews(guides, reviews, cultures, comics);
        result.setHotNews(hotNews);
        fillUsersAndClearContent(result);
        return result;
    }

    private List<Topic> getTopicsByType(String type, int size) {
        Pageable pageable = PageRequest.of(0, size);
        List<TopicPo> content = poRepository.findByTypeAndStatusOrderByChangeTimeDesc(type, "published", pageable).getContent();
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
        Map<Long, User> userMap=new HashMap<>();
        for (var topic : all) {
            userMap.put(topic.getAuthor().getId(),null);
            userMap.put(topic.getEditor().getId(),null);
        }
        for(var userId:userMap.keySet()){
            userMap.put(userId,userService.getById(userId));
        }
        for (var topic : all) {
            topic.setAuthor(userMap.get(topic.getAuthor().getId()));
            topic.setEditor(userMap.get(topic.getEditor().getId()));
            topic.setContent(null);
        }
    }
}
