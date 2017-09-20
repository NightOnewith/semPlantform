<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<jsp:include page="/taglib.jsp"></jsp:include>
<div ng-show="loading" class="loading-mask ng-hide">
    <div class="uil-ring-css" style="transform:scale(0.6);">
        <div></div>
    </div>
</div>

<div class="qq_contact">
    <div id="open_im" class="open-im"></div>
    <div class="im_main" id="im_main">
        <div id="close_im" class="close-im">
            <a href="javascript:void(0);" title="点击关闭">&nbsp;</a>
        </div>
        <a href="#" target="_blank" class="im-qq qq-a" title="在线QQ客服">
            <div class="qq-container"></div>
            <div class="qq-hover-c"><img class="img-qq" src="${ctx}/img/index/qq2.png"></div>
            <span> QQ在线咨询</span>
        </a>

        <div class="im-footer" style="position:relative">
            <div style="clear:both;width: 100%;font-size: 12px;text-align: center;padding-top: 5px;padding-bottom: 3px;background: #0484cd;color: #fff;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;margin-top: 2px;">咨询电话<br>0871-68891764</div>
        </div>
    </div>
</div>

<div id="header" class="fixed">
    <div class="login_tag clearfix">
        <div class="am_tag">
            <a href="#/introducePlantform" class="index_help">帮助中心</a>
            <span class="fl orange show" style="line-height:50px;margin-left:20px;">
                <a href="#" style="color:#6a6a6a;">我的商品</a>
            </span>
            <div class="notLoginBtns login-items fr">
                <span class="logined-show show">用户名：${sessionScope.useInfo.userAccount}</span>
                <a class="login logined-hide show" href="${ctx}/user/showLogin">你好，请登录</a>
                <a class="register logined-hide show" href="${ctx}/user/buyerRegister">用户注册</a>
                <a class="my-center logined-show orange show" href="${ctx}/seller/toSellerCenter">卖家个人中心</a>
                <a class="my-center logined-show orange show" href="${ctx}/buyer/toBuyerOrder">买家个人中心</a>
                <a class="index_menu logined-show my-order show">我的订单</a>
                <a class="my-order show" href="#">购物车<em>(2)</em></a>
                <a class="fr login logined-show personal logout show" href="#">退出</a>
            </div>
        </div>
    </div>

    <div class="wrapper clearfix">
        <a href="#" class="fl site-logo"></a>
        <ul class="fr index_content">
            <li class="focus">
                <a href="${ctx}/index/toMain">首页</a>
            </li>
            <li>
                <a href="${ctx}/index/toProductAdvantage">应用超市</a>
            </li>
            <li>
                <a href="${ctx}/index/toCloudResource">云资源服务</a>
            </li>
            <li>
                <a href="${ctx}/index/toCommerec">电子商务服务</a>
            </li>
            <li>
                <a href="${ctx}/index/toGover">政企服务</a>
            </li>
            <li>
                <a href="${ctx}/index/toSolution">解决方案</a>
            </li>
        </ul>
    </div>

</div>

<script src="${ctx}/js/jquery-1.11.2.min.js" type="text/javascript"></script>






