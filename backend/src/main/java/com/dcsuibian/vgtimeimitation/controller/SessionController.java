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
        return ResponseWrapper.success(sessionVo);
    }

    @PostMapping
    public ResponseWrapper<SessionVo> login(HttpSession httpSession, @RequestBody LoginVo loginVo) {
        User user = userService.login(loginVo.getPhoneNumber(), loginVo.getPassword());
        SessionVo sessionVo = new SessionVo();
        sessionVo.setUser(user);
        httpSession.setAttribute("session", sessionVo); // 替换掉原来的SessionVo
        return ResponseWrapper.success(sessionVo, 201);
    }

    @DeleteMapping
    public ResponseWrapper<Void> logout(HttpSession httpSession) {
        httpSession.invalidate();
        return ResponseWrapper.success();
    }
}
