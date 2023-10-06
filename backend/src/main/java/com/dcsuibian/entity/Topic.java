package com.dcsuibian.entity;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class Topic {
    private Long id;
    private User author;
    private User editor;
    private String title;
    private String summary;
    private String content;
    private String cover;
    private String type;
    private Instant createTime;
    private Instant updateTime;
    private String status;
    private Instant changeTime;
}
