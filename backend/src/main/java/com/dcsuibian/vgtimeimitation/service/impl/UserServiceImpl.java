package com.dcsuibian.vgtimeimitation.service.impl;

import com.dcsuibian.vgtimeimitation.entity.User;
import com.dcsuibian.vgtimeimitation.exception.BusinessException;
import com.dcsuibian.vgtimeimitation.po.UserPo;
import com.dcsuibian.vgtimeimitation.repository.UserPoRepository;
import com.dcsuibian.vgtimeimitation.service.UserService;
import com.dcsuibian.vgtimeimitation.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserPoRepository poRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserPoRepository poRepository, PasswordEncoder passwordEncoder) {
        this.poRepository = poRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User getPublicById(long id) {
        Optional<UserPo> optional = poRepository.findById(id);
        if (optional.isEmpty()) {
            return null;
        }
        User user = UserPo.convert(optional.get());
        processForPublicAccess(user);
        return user;
    }

    @Override
    public User login(String phoneNumber, String password) {
        Optional<UserPo> optional = poRepository.findByPhoneNumber(phoneNumber);
        if (optional.isEmpty()) {
            throw new BusinessException("用户名或密码错误");
        }
        UserPo po = optional.get();
        if (!passwordEncoder.matches(password, po.getPassword())) {
            throw new BusinessException("用户名或密码错误");
        }
        User user = UserPo.convert(po);
        processForPrivateAccess(user);
        return user;
    }

    @Override
    @Transactional
    public User register(String phoneNumber, String password, String verificationCode) {
        if (!"1111".equals(verificationCode)) { // 本项目不接入短信服务，验证码固定为1111
            throw new BusinessException("验证码错误");
        }
        if (poRepository.existsByPhoneNumber(phoneNumber)) {
            throw new BusinessException("该手机号已被注册");
        }

        User user = new User();
        user.setPhoneNumber(phoneNumber);
        user.setPassword(passwordEncoder.encode(password));
        String name = null;
        int minLength = 7;
        int maxLength = 12; // 因为数据库中name字段长度为16，减去“手机用户”四个字，最多只能有12个字
        for (int length = minLength; length <= maxLength; length++) {
            for (int count = 0; count < 5; count++) { // 每个长度最多尝试5次
                String tempName = "手机用户" + Util.generateRandomNumber(length); // 生成随机用户名
                if (!poRepository.existsByName(tempName)) {
                    name = tempName;
                    break;
                }
            }
            if (null != name) {
                break;
            }
        }
        if (null == name) {
            throw new BusinessException("注册失败，无法生成用户名");
        }
        user.setName(name);
        user.setRole(User.Role.USER);
        user.setAvatar(null);
        user.setEmail(null);
        user.setGender(User.Gender.SECRET);
        poRepository.save(UserPo.convert(user)); // 保存用户信息

        Optional<UserPo> optional = poRepository.findByPhoneNumber(phoneNumber);
        if (optional.isEmpty()) { // 不太可能发生
            throw new BusinessException("注册失败，未知原因");
        }
        user = UserPo.convert(optional.get());
        processForPrivateAccess(user);
        return user;
    }

    private void processForPublicAccess(User user) {
        user.setPassword(null);
        user.setPhoneNumber(null);
        user.setEmail(null);
    }

    private void processForPrivateAccess(User user) {
        user.setPassword(null);
    }
}
