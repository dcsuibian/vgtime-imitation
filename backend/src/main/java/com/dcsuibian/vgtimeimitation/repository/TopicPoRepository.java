package com.dcsuibian.vgtimeimitation.repository;

import com.dcsuibian.vgtimeimitation.po.TopicPo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TopicPoRepository extends JpaRepository<TopicPo, Long>, JpaSpecificationExecutor<TopicPo> {
}
