package com.dcsuibian.vgtimeimitation.service;

import com.dcsuibian.vgtimeimitation.entity.User;
import com.dcsuibian.vgtimeimitation.vo.PageWrapper;

public interface UserService {
    User getPublicById(long id);

    User getPrivateById(long id);

    PageWrapper<User> getPublic(int pageNumber, int pageSize);

    PageWrapper<User> getPrivate(int pageNumber, int pageSize);

    User login(String phoneNumber, String password);

    User register(String phoneNumber, String password, String verificationCode);

    User editPartially(User user);
}
