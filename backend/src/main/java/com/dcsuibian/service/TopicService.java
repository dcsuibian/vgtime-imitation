package com.dcsuibian.service;

import com.dcsuibian.entity.Topic;
import com.dcsuibian.vo.HomePageVo;

public interface TopicService {
    HomePageVo getHomePage();

    Topic getById(long id);
}
