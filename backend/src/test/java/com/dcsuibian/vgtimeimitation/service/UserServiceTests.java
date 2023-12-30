package com.dcsuibian.vgtimeimitation.service;

import com.dcsuibian.vgtimeimitation.entity.User;
import com.dcsuibian.vgtimeimitation.exception.BusinessException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTests {
    @Autowired
    private UserService userService;

    @Test
    void testLogin() {
        User user = userService.login("10000008855", "password");
        assertNotNull(user);
        assertEquals("10000008855", user.getPhoneNumber());
        BusinessException e = assertThrows(BusinessException.class, () -> userService.login("10000008855", "password1"));
        assertEquals("用户名或密码错误", e.getMessage());
    }
}
