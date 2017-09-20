package net.wanho.datasource;


import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

/**
 * Created by Sam on 16/7/7.
 */
@Component
@Aspect
public class MultipleDataSourceAspectAdvice {
    public Object doAround(ProceedingJoinPoint jp) throws Throwable {
//        if (jp.getTarget() instanceof MySqlMapper) {
//            MultipleDataSource.setDataSourceKey("dataSourceCAS");
//        } else if (jp.getTarget() instanceof SqlServerMapper) {
//            MultipleDataSource.setDataSourceKey("dataSourceSCA");
//        }
        return jp.proceed();
    }
    @Before("execution(* net.wanho.mapper.*.*(..))")
    public Object doBefore(ProceedingJoinPoint jp) throws Throwable {
        System.out.println("TestServiceImpl.doBefore");
        System.out.println("TestServiceImpl.doBefore");
        System.out.println("TestServiceImpl.doBefore");
        System.out.println("TestServiceImpl.doBefore");
        System.out.println("TestServiceImpl.doBefore");
        System.out.println("TestServiceImpl.doBefore");
       /* if (jp.getTarget() instanceof OrgInfoMapper) {
            MultipleDataSource.setDataSourceKey("dataSourceSCA");
        } else if (jp.getTarget() instanceof SysUserMapper) {
            MultipleDataSource.setDataSourceKey("dataSourceCAS");
        } else if (jp.getTarget() instanceof ServiceOrgInfoMapper) {
            MultipleDataSource.setDataSourceKey("dataSourceSCA");
        } else if (jp.getTarget() instanceof OrgInFlatMapper) {
            MultipleDataSource.setDataSourceKey("dataSourceSCA");
        }*/

        MultipleDataSource.setDataSourceKey("dataSourceSCA");
        return jp.proceed();
    }
}
