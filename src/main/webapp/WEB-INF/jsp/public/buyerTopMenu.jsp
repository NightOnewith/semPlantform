<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<%--<link rel="stylesheet" href="${ctx}/second-period/css/bootstrap.min.3.3.5.css">--%>
<%--<script src="${ctx}/second-period/js/jquery-1.11.2.min.js" type="text/javascript"></script>--%>
<%--<script src="${ctx}/second-period/js/bootstrap.min.js"></script>--%>

<div ng-show="loading" class="loading-mask ng-hide">
    <div class="uil-ring-css" style="transform:scale(0.6);">
        <div></div>
    </div>
</div>

<div class="top">
    <div class="wrapper">
        <div class="fl">
            <span>用户：<em>15051817636</em></span>
        </div>
        <div class="fr">
            <span><a class="logout">退出</a></span>
        </div>
        <div class="fr">
            <span><a href="${ctx}/index/toMain">首页</a></span>
            <span><a href="${ctx}/myOrderPageController/toCarJsp">购物车</a></span>
            <span><a href="#" data-container="body" data-toggle="popover" data-placement="bottom"
                     data-content="电话：114/110/250" >联系客服</a></span>
            <span><a href="#" data-container="body" data-toggle="popover" data-placement="bottom"
                     data-content="你可以打架，也可以打滚，就是不能打折！">帮助中心</a></span>
        </div>
    </div>
</div>

<div class="header">
    <div class="wrapper">
        <h2 class="fl"><span>中小微企业商城</span><em>|</em><em>个人中心</em></h2>
    </div>
</div>
<%--<script>--%>
    <%--$(function () {--%>
        <%--$("[data-toggle='popover']").popover();--%>
    <%--});--%>
<%--</script>--%>