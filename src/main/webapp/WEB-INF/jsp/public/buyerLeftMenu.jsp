<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<div class="shutiao-lt ng-scope" ng-if="userType == 'buyer'">
    <div class="head-ortrait">
        <div class="head-ortrait-mask"></div>
        <img id="org_img" src="${ctx}/files/mayun.png">
    </div>
    <div class="fabu-link"> 个人中心 </div>
    <div class="tree-obj">
        <ul class="tree-pent ng-scope" ng-if="myInfo.duty==0">
            <li class="canOpen on">
                <a href="${ctx}/buyer/toBuyerOrder" class="hover">我的订单</a>
            </li>
            <li>
                <a href="${ctx}/buyer/toMyApps">我的商品</a>
            </li>
            <li>
                <a href="${ctx}/buyer/toCar">购物车</a>
            </li>
            <li>
                <a href="${ctx}/buyer/toInfo">信息管理</a>
            </li>
            <li>
                <a href="${ctx}/buyer/toAccount">用户管理</a>
            </li>
        </ul>
    </div>
</div>



