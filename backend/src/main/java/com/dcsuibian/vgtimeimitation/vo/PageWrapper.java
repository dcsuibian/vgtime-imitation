package com.dcsuibian.vgtimeimitation.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PageWrapper<T> {
    private List<T> data; // 页内容
    private long pageNumber; // 当前页码
    private long pageSize; // 每页记录数
    private long total; // 总记录数

    public PageWrapper(List<T> data, long pageNumber, long pageSize, long total) {
        this.data = data;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.total = total;
    }

    public long getTotalPages() {
        return 0 == total % pageSize ? total / pageSize : total / pageSize + 1;
    }

    public static <T> PageWrapper<T> build(List<T> data, long pageNumber, long pageSize, long total) {
        return new PageWrapper<>(data, pageNumber, pageSize, total);
    }
}
