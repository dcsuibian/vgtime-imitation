package com.dcsuibian.vgtimeimitation.controller;

import com.dcsuibian.vgtimeimitation.entity.User;
import com.dcsuibian.vgtimeimitation.service.UserService;
import com.dcsuibian.vgtimeimitation.vo.PageWrapper;
import com.dcsuibian.vgtimeimitation.vo.RegisterVo;
import com.dcsuibian.vgtimeimitation.vo.ResponseWrapper;
import com.dcsuibian.vgtimeimitation.vo.SessionVo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        return ResponseWrapper.success(null, 201);
    }

    @GetMapping
    public ResponseWrapper<PageWrapper<User>> get(@RequestParam("pageNumber") int pageNumber, @RequestParam("pageSize") int pageSize, HttpSession httpSession) {
        PageWrapper<User> page;
        SessionVo sessionVo = (SessionVo) httpSession.getAttribute("session");
        if (null != sessionVo.getUser()) {
            User.Role role = sessionVo.getUser().getRole();
            if (role == User.Role.ADMIN || role == User.Role.EDITOR) {
                page = userService.getPrivate(pageNumber, pageSize);
            } else {
                page = userService.getPublic(pageNumber, pageSize);
            }
        } else {
            page = userService.getPublic(pageNumber, pageSize);
        }
        return ResponseWrapper.success(page);
    }
}
