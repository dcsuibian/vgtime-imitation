package com.dcsuibian.repository;

import com.dcsuibian.po.UserPo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class UserPoRepositoryTests {
    @Autowired
    private UserPoRepository poRepository;

    @Test
    void findAllTest() {
        List<UserPo> all = poRepository.findAll();
        System.out.println(all);
    }
}
