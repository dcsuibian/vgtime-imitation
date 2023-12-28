package com.dcsuibian.vgtimeimitation.vo;

import com.dcsuibian.vgtimeimitation.entity.Topic;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class HomePageVo {
    private List<Topic> hotNews; // 热点新闻
    private List<Topic> news; // 新闻资讯
    private List<Topic> guides; // 攻略资料
    private List<Topic> reviews; // 深度评测
    private List<Topic> cultures; // 游戏文化
    private List<Topic> comics; // 动漫时光
}
