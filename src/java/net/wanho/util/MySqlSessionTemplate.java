package net.wanho.util;

import net.wanho.datasource.MultipleDataSource;
import org.apache.ibatis.exceptions.PersistenceException;
import org.apache.ibatis.executor.BatchResult;
import org.apache.ibatis.reflection.ExceptionUtil;
import org.apache.ibatis.session.*;
import org.mybatis.spring.MyBatisExceptionTranslator;
import org.mybatis.spring.SqlSessionUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.support.PersistenceExceptionTranslator;
import org.springframework.util.Assert;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.sql.Connection;
import java.util.List;
import java.util.Map;

public class MySqlSessionTemplate implements SqlSession {
    private final SqlSessionFactory sqlSessionFactory;
    private final ExecutorType executorType;
    private final SqlSession sqlSessionProxy;
    private final PersistenceExceptionTranslator exceptionTranslator;

    public MySqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        this(sqlSessionFactory, sqlSessionFactory.getConfiguration().getDefaultExecutorType());
    }

    public MySqlSessionTemplate(SqlSessionFactory sqlSessionFactory, ExecutorType executorType) {
        this(sqlSessionFactory, executorType, new MyBatisExceptionTranslator(sqlSessionFactory.getConfiguration().getEnvironment().getDataSource(), true));
    }

    public MySqlSessionTemplate(SqlSessionFactory sqlSessionFactory, ExecutorType executorType, PersistenceExceptionTranslator exceptionTranslator) {
        Assert.notNull(sqlSessionFactory, "Property \'sqlSessionFactory\' is required");
        Assert.notNull(executorType, "Property \'executorType\' is required");
        this.sqlSessionFactory = sqlSessionFactory;
        this.executorType = executorType;
        this.exceptionTranslator = exceptionTranslator;
        this.sqlSessionProxy = (SqlSession)Proxy.newProxyInstance(SqlSessionFactory.class.getClassLoader(), new Class[]{SqlSession.class}, new MySqlSessionTemplate.SqlSessionInterceptor());
    }

    public SqlSessionFactory getSqlSessionFactory() {
        return this.sqlSessionFactory;
    }

    public ExecutorType getExecutorType() {
        return this.executorType;
    }

    public PersistenceExceptionTranslator getPersistenceExceptionTranslator() {
        return this.exceptionTranslator;
    }


    public void select(String statement, ResultHandler handler) {
        this.sqlSessionProxy.select(statement, handler);
    }

    @Override
    public Object selectOne(String statement) {
        return this.sqlSessionProxy.selectOne(statement);
    }

    @Override
    public Object selectOne(String statement, Object parameter) {
        return this.sqlSessionProxy.selectOne(statement,parameter);
    }

    @Override
    public List selectList(String statement) {
        return this.sqlSessionProxy.selectList(statement);
    }

    @Override
    public List selectList(String statement, Object parameter) {
        return this.sqlSessionProxy.selectList(statement,parameter);
    }

    @Override
    public List selectList(String statement, Object parameter, RowBounds rowBounds) {
        return this.sqlSessionProxy.selectList(statement,parameter,rowBounds);
    }

    @Override
    public Map selectMap(String statement, String mapKey) {
        return this.sqlSessionProxy.selectMap(statement,mapKey);
    }

    @Override
    public Map selectMap(String statement, Object parameter, String mapKey) {
        return this.sqlSessionProxy.selectMap(statement,parameter,mapKey);
    }

    @Override
    public Map selectMap(String statement, Object parameter, String mapKey, RowBounds rowBounds) {
        return this.sqlSessionProxy.selectMap(statement,parameter,mapKey,rowBounds);
    }

    public void select(String statement, Object parameter, ResultHandler handler) {
        this.sqlSessionProxy.select(statement, parameter, handler);
    }

    public void select(String statement, Object parameter, RowBounds rowBounds, ResultHandler handler) {
        this.sqlSessionProxy.select(statement, parameter, rowBounds, handler);
    }

    public int insert(String statement) {
        return this.sqlSessionProxy.insert(statement);
    }

    public int insert(String statement, Object parameter) {
        return this.sqlSessionProxy.insert(statement, parameter);
    }

    public int update(String statement) {
        return this.sqlSessionProxy.update(statement);
    }

    public int update(String statement, Object parameter) {
        return this.sqlSessionProxy.update(statement, parameter);
    }

    public int delete(String statement) {
        return this.sqlSessionProxy.delete(statement);
    }

    public int delete(String statement, Object parameter) {
        return this.sqlSessionProxy.delete(statement, parameter);
    }

    public <T> T getMapper(Class<T> type) {
        return this.getConfiguration().getMapper(type, this);
    }

    public void commit() {
        throw new UnsupportedOperationException("Manual commit is not allowed over a Spring managed SqlSession");
    }

    public void commit(boolean force) {
        throw new UnsupportedOperationException("Manual commit is not allowed over a Spring managed SqlSession");
    }

    public void rollback() {
        throw new UnsupportedOperationException("Manual rollback is not allowed over a Spring managed SqlSession");
    }

    public void rollback(boolean force) {
        throw new UnsupportedOperationException("Manual rollback is not allowed over a Spring managed SqlSession");
    }

    public void close() {
        throw new UnsupportedOperationException("Manual close is not allowed over a Spring managed SqlSession");
    }

    public void clearCache() {
        this.sqlSessionProxy.clearCache();
    }

    public Configuration getConfiguration() {
        return this.sqlSessionFactory.getConfiguration();
    }

    public Connection getConnection() {
        return this.sqlSessionProxy.getConnection();
    }

    public List<BatchResult> flushStatements() {
        return this.sqlSessionProxy.flushStatements();
    }

    private class SqlSessionInterceptor implements InvocationHandler {
        private SqlSessionInterceptor() {
        }

        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            SqlSession sqlSession = SqlSessionUtils.getSqlSession(MySqlSessionTemplate.this.sqlSessionFactory, MySqlSessionTemplate.this.executorType, MySqlSessionTemplate.this.exceptionTranslator);

            Object unwrapped;
            try {

                //多数据源切换
                //
                try {
                String queryMethod = String.valueOf(args[0]);
                if(queryMethod.indexOf("mapper")>0)
                {
                    String clazzName = queryMethod.substring(0, queryMethod.lastIndexOf("."));
                    MultipleDataSource.setDataSourceKey(Class.forName(clazzName));
                }
                } catch (Exception e){}

                Object t = method.invoke(sqlSession, args);
                if(!SqlSessionUtils.isSqlSessionTransactional(sqlSession, MySqlSessionTemplate.this.sqlSessionFactory)) {
                    sqlSession.commit(true);
                }

                unwrapped = t;
            } catch (Throwable var11) {
                unwrapped = ExceptionUtil.unwrapThrowable(var11);
                if(MySqlSessionTemplate.this.exceptionTranslator != null && unwrapped instanceof PersistenceException) {
                    DataAccessException translated = MySqlSessionTemplate.this.exceptionTranslator.translateExceptionIfPossible((PersistenceException)unwrapped);
                    if(translated != null) {
                        unwrapped = translated;
                    }
                }

                throw (Throwable)unwrapped;
            } finally {
                SqlSessionUtils.closeSqlSession(sqlSession, MySqlSessionTemplate.this.sqlSessionFactory);
            }

            return unwrapped;
        }
    }
}
