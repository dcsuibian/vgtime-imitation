package com.dcsuibian.repository;

import com.dcsuibian.po.UserPo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPoRepository extends JpaRepository<UserPo, Long> {
}
