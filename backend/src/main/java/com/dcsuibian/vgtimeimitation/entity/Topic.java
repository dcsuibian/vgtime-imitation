package com.dcsuibian.vgtimeimitation.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
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
    private Type type;
    private Instant createTime;
    private Instant updateTime;
    private Status status;
    private Instant changeTime;

    public enum Type {
        NEWS("新闻"),
        GUIDE("攻略"),
        REVIEW("评测"),
        CULTURE("文化"),
        COMIC("漫画");
        private final String code;

        Type(String code) {
            this.code = code;
        }

        @JsonValue
        public String getCode() {
            return code;
        }

        @JsonCreator
        public static Type fromCode(String code) {
            for (Type type : Type.values()) {
                if (type.getCode().equals(code)) {
                    return type;
                }
            }
            throw new IllegalArgumentException("No such type: " + code);
        }
    }

    public enum Status {
        PUBLISHED("published"),
        DRAFT("draft");
        private final String code;

        Status(String code) {
            this.code = code;
        }

        @JsonValue
        public String getCode() {
            return code;
        }

        @JsonCreator
        public static Status fromCode(String code) {
            for (Status status : Status.values()) {
                if (status.getCode().equals(code)) {
                    return status;
                }
            }
            throw new IllegalArgumentException("No such status: " + code);
        }
    }
}
