<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html>

<head>
    <jsp:include page="../public/buyerHead.jsp"></jsp:include>
</head>

<body>
<div class="main">

    <jsp:include page="../public/buyerTopMenu.jsp"></jsp:include>

    <div class="perscenter-ui">
        <!-- ngIf: withMenu -->
        <div class="main-layout ng-scope" ng-if="withMenu">
            <div class="wrapper">
                <div class="content-layout">

                    <jsp:include page="../public/buyerLeftMenu.jsp"></jsp:include>

                    <div ng-view="" class="ng-scope">
                        <div class="person-details personal myapppersonal ng-scope">
                            <div class="require-details dingdan-details">
                                <form id="queryProduct" method="post"
                                      action="${ctx}/myOrderPageController/getMyProductAppDtos">
                                    <div class="search-reqname">
                                        <input type="text" name="productName" id="productName" placeholder="请输入商品名称"
                                               ng-model="myApps.name" class="ng-pristine ng-valid">
                                        <button type="submit">搜索</button>
                                    </div>
                                </form>
                                <div class="">
                                    <div class="tit clearfix">
                                        <h1 class="fl">我的商品</h1>
                                    </div>


                                    <div class="myAppItem clearfix" style="position: relative;">
                                        <div class="appImg fl">
                                            <img src="${myProductAppDto.picsUrl}" width="100px" height="100px"
                                                 style="margin-top: 0px">
                                        </div>
                                        <div class="mainItem fl">
                                            <p class="buyPClass">产品名称</p>

                                            <p class="buyPClass">销售属性：白色}</p>

                                            <p class="buyPClass">商品价格：100元</p>

                                            <p class="appInfo">该商品共5个</p>
                                        </div>
                                        <div style="position: absolute;right: 10px;bottom: 10px;color: #999;">
                                            <a style="color: #36a8ff;">买家名称</a>
                                        </div>
                                    </div>
                                    <div class="myAppItem clearfix" style="position: relative;">
                                        <div class="appImg fl">
                                            <img src="${myProductAppDto.picsUrl}" width="100px" height="100px"
                                                 style="margin-top: 0px">
                                        </div>
                                        <div class="mainItem fl">
                                            <p class="buyPClass">产品名称</p>

                                            <p class="buyPClass">销售属性：白色}</p>

                                            <p class="buyPClass">商品价格：100元</p>

                                            <p class="appInfo">该商品共5个</p>
                                        </div>
                                        <div style="position: absolute;right: 10px;bottom: 10px;color: #999;">
                                            <a style="color: #36a8ff;">买家名称</a>
                                        </div>
                                    </div>
                                    <div class="myAppItem clearfix" style="position: relative;">
                                        <div class="appImg fl">
                                            <img src="${myProductAppDto.picsUrl}" width="100px" height="100px"
                                                 style="margin-top: 0px">
                                        </div>
                                        <div class="mainItem fl">
                                            <p class="buyPClass">产品名称</p>

                                            <p class="buyPClass">销售属性：白色}</p>

                                            <p class="buyPClass">商品价格：100元</p>

                                            <p class="appInfo">该商品共5个</p>
                                        </div>
                                        <div style="position: absolute;right: 10px;bottom: 10px;color: #999;">
                                            <a style="color: #36a8ff;">卖家名称</a>
                                        </div>
                                    </div>

                                    <div class="pagination-layout">
                                        <div class="pagination">
                                            <ul class="pagination-sm pagination ng-isolate-scope ng-pristine ng-valid"
                                                total-items="bigTotalItems" ng-model="bigCurrentPage" max-size="maxSize"
                                                boundary-links="true" rotate="false" items-per-page="10"
                                                ng-change="pageChanged()">
                                                <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"
                                                    class="ng-scope disabled">
                                                    <a href="" ng-click="selectPage(1)" class="ng-binding">最前</a>
                                                </li>
                                                <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"
                                                    class="ng-scope disabled">
                                                    <a href="" ng-click="selectPage(page - 1)"
                                                       class="ng-binding">前一页</a>
                                                </li>
                                                <li ng-repeat="page in pages track by $index"
                                                    ng-class="{active: page.active}" class="ng-scope active">
                                                    <a href="" ng-click="selectPage(page.number)"
                                                       class="ng-binding">1</a>
                                                </li>
                                                <li ng-if="directionLinks" ng-class="{disabled: noNext()}"
                                                    class="ng-scope disabled">
                                                    <a href="" ng-click="selectPage(page + 1)"
                                                       class="ng-binding">下一页</a>
                                                </li>
                                                <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"
                                                    class="ng-scope disabled">
                                                    <a href="" ng-click="selectPage(totalPages)"
                                                       class="ng-binding">最后</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<jsp:include page="../public/footer.jsp"></jsp:include>
<jsp:include page="../public/buyerBottom.jsp"></jsp:include>

</body>

</html>