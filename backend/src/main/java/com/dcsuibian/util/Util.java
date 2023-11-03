package com.dcsuibian.util;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

public class Util {
    public static <T, R> List<R> batchConvert(Iterable<T> iterable, Function<T, R> converter) {
        List<R> list = new ArrayList<>();
        for (var item : iterable) {
            list.add(converter.apply(item));
        }
        return list;
    }
}
