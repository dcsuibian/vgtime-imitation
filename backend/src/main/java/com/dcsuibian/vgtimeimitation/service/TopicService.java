package com.dcsuibian.vgtimeimitation.service;

import com.dcsuibian.vgtimeimitation.entity.Topic;
import com.dcsuibian.vgtimeimitation.vo.HomePageVo;

public interface TopicService {
    HomePageVo getHomePage();

    Topic getById(long id);
}
