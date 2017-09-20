package net.wanho.util;

import net.sf.json.util.PropertyFilter;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.ArrayUtils;

import java.util.Collection;
import java.util.Map;


public class JsonPropertyFilterUtils {
    public static PropertyFilter getDefaultPropertyFilter(final String[] ignoreProperty) {
        return new PropertyFilter() {
            @Override
            public boolean apply(Object o, String s, Object o1) {
                if (null == o1) {
                    return true;
                } else if (o1 instanceof Collection && CollectionUtils.isEmpty((Collection) o1)) {
                    return true;
                } else if (o1 instanceof Map && MapUtils.isEmpty((Map) o1)) {
                    return true;
                } else if (ArrayUtils.isNotEmpty(ignoreProperty) && ArrayUtils.contains(ignoreProperty, s)) {
                    return true;
                }


                return false;
            }
        };
    }
}
