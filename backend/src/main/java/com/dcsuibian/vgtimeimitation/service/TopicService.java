package com.dcsuibian.vgtimeimitation.service;

import com.dcsuibian.vgtimeimitation.entity.Topic;
import com.dcsuibian.vgtimeimitation.qo.TopicQo;
import com.dcsuibian.vgtimeimitation.vo.HomePageVo;
import com.dcsuibian.vgtimeimitation.vo.PageWrapper;

public interface TopicService {
    Topic add(Topic topic);

    PageWrapper<Topic> get(TopicQo qo, int pageNumber, int pageSize);

    Topic getById(long id);

    HomePageVo getHomePage();
}
