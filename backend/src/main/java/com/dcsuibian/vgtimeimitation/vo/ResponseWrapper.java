package com.dcsuibian.vgtimeimitation.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseWrapper<T> {
    private T result;
    private String message;
    private int code;
    private long timestamp = System.currentTimeMillis();

    public ResponseWrapper(T result, String message, int code) {
        this.result = result;
        this.message = message;
        this.code = code;
    }

    public static <T> ResponseWrapper<T> build(T result, String message, int code) {
        return new ResponseWrapper<T>(result, message, code);
    }

}
