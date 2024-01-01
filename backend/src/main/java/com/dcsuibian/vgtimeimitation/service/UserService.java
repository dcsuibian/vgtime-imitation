package com.dcsuibian.vgtimeimitation.service;

import com.dcsuibian.vgtimeimitation.entity.User;

public interface UserService {
    User getPublicById(long id);

    User login(String phoneNumber, String password);

    User register(String phoneNumber, String password, String verificationCode);
}
