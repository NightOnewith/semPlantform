<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<jsp:include page="/taglib.jsp"></jsp:include>
<div ng-show="loading" class="loading-mask ng-hide">
    <div class="uil-ring-css" style="transform:scale(0.6);">
        <div></div>
    </div>
</div>


<div class="top">
    <div class="wrapper">
        <div class="fl">
            <span>用户：<em>bulk7901</em></span>
        </div>
        <div class="fr">
            <span><a class="logout">退出</a></span>
        </div>

        <div class="fr">
            <span><a href="${ctx}/login">首页</a></span>
            <span>联系客服</span>
            <span><a href="/user-mgr/app/index.html#/helpCenter">帮助中心</a></span>
        </div>
    </div>
</div>

<div class="header">
    <div class="wrapper">
        <h2 class="fl"><span>中小微企业商城</span><em>|</em><em>个人中心</em></h2>
    </div>
</div>






