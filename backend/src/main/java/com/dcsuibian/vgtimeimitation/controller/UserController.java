package com.dcsuibian.vgtimeimitation.controller;

import com.dcsuibian.vgtimeimitation.service.UserService;
import com.dcsuibian.vgtimeimitation.vo.RegisterVo;
import com.dcsuibian.vgtimeimitation.vo.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseWrapper<Void> register(@RequestBody RegisterVo registerVo) {
        userService.register(registerVo.getPhoneNumber(), registerVo.getPassword(), registerVo.getVerificationCode());
        return ResponseWrapper.build(null, "注册成功", 201);
    }
}
