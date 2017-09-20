package net.wanho.common;

import net.wanho.page.Page;

import java.io.Serializable;

public class Result implements Serializable {
    public static final String SUCCESS = "1";
    /**
     *
     */
    private static final long serialVersionUID = -2826837620802262488L;

    // 结果码 1:success; 0:fault
    private String resultCode;

    // 结果信息
    private String resultMsg;

    private Long prodId;
    // 可将返回对象已json格式放入返回
    private String params;

    private Page page;

    private Object object;

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public Result() {
        this.resultCode="1";
        this.resultMsg="请求成功";
    }

    public Result(String resultCode, String resultMsg) {
        super();
        this.resultCode = resultCode;
        this.resultMsg = resultMsg;
    }

    public Result(String resultCode, String resultMsg, String params) {
        this(resultCode,resultMsg);
        this.params = params;
    }

    public Result(String resultCode, String resultMsg, Object object) {
        super();
        this.resultCode = resultCode;
        this.resultMsg = resultMsg;
        this.object = object;
    }

    public Result(String resultCode, Page page, Object object) {
        super();
        this.resultCode = resultCode;
        this.page = page;
        this.object = object;
    }

    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }

    public String getResultMsg() {
        return resultMsg;
    }

    public void setResultMsg(String resultMsg) {
        this.resultMsg = resultMsg;
    }

    public Long getProdId() {
        return prodId;
    }

    public void setProdId(Long prodId) {
        this.prodId = prodId;
    }

    public String getParams() {
        return params;
    }

    public void setParams(String params) {
        this.params = params;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

}
