package com.dcsuibian.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private Long id;
    private String name;
    private String password;
    private Role role;
    private String phoneNumber;
    private String avatar;
    private String email;
    private Gender gender;

    public enum Role {
        ADMIN("管理员"),
        EDITOR("新闻编辑"),
        USER("普通用户");
        private final String code;

        Role(String code) {
            this.code = code;
        }

        @JsonValue
        public String getCode() {
            return code;
        }

        @JsonCreator
        public static Role fromCode(String code) {
            for (Role role : Role.values()) {
                if (role.getCode().equals(code)) {
                    return role;
                }
            }
            throw new IllegalArgumentException("No such role: " + code);
        }
    }

    public enum Gender {
        MALE("男"),
        FEMALE("女"),
        SECRET("保密");
        private final String code;

        Gender(String code) {
            this.code = code;
        }

        @JsonValue
        public String getCode() {
            return code;
        }

        @JsonCreator
        public static Gender fromCode(String code) {
            for (Gender gender : Gender.values()) {
                if (gender.getCode().equals(code)) {
                    return gender;
                }
            }
            throw new IllegalArgumentException("No such gender: " + code);
        }
    }
}
