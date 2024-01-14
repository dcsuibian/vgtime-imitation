package com.dcsuibian.vgtimeimitation.controller;

import com.dcsuibian.vgtimeimitation.exception.BusinessException;
import com.dcsuibian.vgtimeimitation.vo.ResponseWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    public ResponseWrapper<Void> handleBusinessException(BusinessException e) {
        log.debug("全局异常处理中心：{}", e.getMessage());
        return ResponseWrapper.build(null, e.getMessage(), e.getCode());
    }

    @ExceptionHandler(Exception.class)
    public ResponseWrapper<Void> handleException(Exception e) {
        String message = null != e.getMessage() ? e.getMessage() : e.getClass().getName();
        log.warn("全局异常处理中心：{}", message, e);
        return ResponseWrapper.build(null, message, 500);
    }
}
