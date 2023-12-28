package com.dcsuibian.vgtimeimitation.controller;

import com.dcsuibian.vgtimeimitation.service.TopicService;
import com.dcsuibian.vgtimeimitation.vo.HomePageVo;
import com.dcsuibian.vgtimeimitation.vo.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home-page")
public class HomePageController {
    private final TopicService topicService;

    @Autowired
    public HomePageController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping
    @ResponseBody
    public ResponseWrapper<HomePageVo> getHomePage() {
        HomePageVo result = topicService.getHomePage();
        return ResponseWrapper.build(result, "获取首页数据成功", 200);
    }

}
