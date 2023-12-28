package com.dcsuibian.vgtimeimitation.repository;

import com.dcsuibian.vgtimeimitation.po.TopicPo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicPoRepository extends JpaRepository<TopicPo, Long> {
    Page<TopicPo> findByTypeAndStatusOrderByChangeTimeDesc(String type, String status, Pageable pageable);
}
