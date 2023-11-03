package com.dcsuibian.repository;

import com.dcsuibian.po.TopicPo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TopicPoRepository extends JpaRepository<TopicPo, Long> {
    Page<TopicPo> findByTypeAndStatusOrderByChangeTimeDesc(String type, String status, Pageable pageable);
}
