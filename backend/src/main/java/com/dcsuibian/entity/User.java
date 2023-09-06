package com.dcsuibian.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private Long id;
    private String name;
    private String password;
    private String role;
    private String phoneNumber;
    private String avatar;
    private String email;
    private String gender;
}
