package com.dcsuibian.service.impl;

import com.dcsuibian.entity.User;
import com.dcsuibian.po.UserPo;
import com.dcsuibian.repository.UserPoRepository;
import com.dcsuibian.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserPoRepository poRepository;

    @Autowired
    public UserServiceImpl(UserPoRepository poRepository) {
        this.poRepository = poRepository;
    }

    @Override
    public User getById(long id) {
        Optional<UserPo> optional = poRepository.findById(id);
        if (optional.isEmpty()) {
            return null;
        }
        User user = UserPo.convert(optional.get());
        user.setPassword(null);
        return user;
    }
}
