package net.wanho.datasource;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;


public class MultipleDataSource extends AbstractRoutingDataSource {
    private static final ThreadLocal<String> dataSourceKey = new InheritableThreadLocal<String>();

    public static void setDataSourceKey(String dataSource) {
        dataSourceKey.set(dataSource);
    }

    @Override
    protected Object determineCurrentLookupKey() {
        return dataSourceKey.get();
    }


    public static void setDataSourceKey(Class cls){
        DataSources sources =(DataSources)cls.getAnnotation(DataSources.class);
        setDataSourceKey(sources.dataSourceName());
    }

}

