package com.dcsuibian.vgtimeimitation.controller;

import com.dcsuibian.vgtimeimitation.entity.User;
import com.dcsuibian.vgtimeimitation.service.UserService;
import com.dcsuibian.vgtimeimitation.vo.LoginVo;
import com.dcsuibian.vgtimeimitation.vo.ResponseWrapper;
import com.dcsuibian.vgtimeimitation.vo.SessionVo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/session")
public class SessionController {
    private final UserService userService;

    @Autowired
    public SessionController(UserService userService) {
        this.userService = userService;
    }

    /**
     * 获取当前会话
     */
    @GetMapping
    public ResponseWrapper<SessionVo> get(HttpSession httpSession) {
        SessionVo sessionVo = (SessionVo) httpSession.getAttribute("session");
        if (null != sessionVo) {
            return ResponseWrapper.build(sessionVo, "已登录", 200);
        } else {
            return ResponseWrapper.build(null, "未登录", 400);
        }
    }

    @PostMapping
    public ResponseWrapper<SessionVo> login(HttpSession httpSession, @RequestBody LoginVo loginVo) {
        User user = userService.login(loginVo.getPhoneNumber(), loginVo.getPassword());
        SessionVo sessionVo = new SessionVo();
        sessionVo.setUser(user);
        httpSession.setAttribute("session", sessionVo);
        return ResponseWrapper.build(sessionVo, "登录成功", 201);
    }

    @DeleteMapping
    public ResponseWrapper<Void> logout(HttpSession httpSession) {
        httpSession.invalidate();
        return ResponseWrapper.build(null, "会话已销毁", 200);
    }
}
