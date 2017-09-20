<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
        <div class="main-layout">
            <div class="wrapper">
                <div class="content-layout">

                    <jsp:include page="../public/buyerLeftMenu.jsp"></jsp:include>

                    <form id="frm" class="bs-example form-horizontal" action="${ctx}/buyerOrders/listOrders"
                          method="post">
                        <div>
                            <div class="order percent-order" style="padding:0;">
                                <div class="order_query" style="margin-top:0;margin-bottom: 48px;">
                                    <ul class="clearfix" style="margin-left:15px;">
                                        <li>
                                            <label>商品名称：</label>
                                            <input type="text" id="prodName" name="prodName" value="产品名称">
                                        </li>
                                        <li>
                                            <label>订单编号：</label>
                                            <input type="text" id="orderSeq" name="orderSeq" value="订单编号">
                                        </li>
                                        <li><label>成交时间：</label>
                                            <input type="text"
                                                   onclick="WdatePicker({el:'startTime', dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                                                   name="startTime" id="startTime"
                                                   value="<fmt:formatDate value='${buyerOrdersDto.startTime}' pattern='${df}'/>"
                                                   placeholder="成交时间" readonly/>
                                            <font class="date-line"></font>
                                            <input type="text"
                                                   onclick="WdatePicker({el:'endTime', dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                                                   name="endTime" id="endTime"
                                                   value="<fmt:formatDate value='${buyerOrdersDto.endTime}' pattern='${df}'/>"
                                                   placeholder="结束时间" readonly/>
                                        </li>

                                    </ul>
                                    <div class="btn clearfix">
                                        <a href="javascript:;" class="search_order" onclick="queryOrders()">搜索订单</a>
                                        <a href="javascript:;" class="clear-condition"
                                           onclick="clearCondition()">清空条件</a>
                                    </div>
                                </div>

                                <div class="text-slide">
                                    <div class="hd">
                                        <ul>
                                            <input type="hidden" id="serachFlag" name="serachFlag">
                                            <li id="liflag0"><span onclick="changeserachFlag(0)">所有订单
														<em>(${buyerCountDto.allOrders})</em>
													</span></li>
                                            <li id="liflag1"><span onclick="changeserachFlag(1)">待付款
														<em>(${buyerCountDto.waitPay})</em>
													</span></li>
                                            <li id="liflag2"><span onclick="changeserachFlag(2)">已支付
														<em>(${buyerCountDto.isPay})</em>
													</span></li>
                                            <li id="liflag3"><span onclick="changeserachFlag(3)">交易完成
													<em>(${buyerCountDto.payFinal})</em>
													</span></li>
                                        </ul>
                                    </div>
                                    <div class="bd">
                                        <ul>
                                            <li>
                                                <table cellspacing="0" cellpadding="0" class="tablesorter"
                                                       id="tablesorter">
                                                    <thead>
                                                    <tr>
                                                        <th class="tbl-0"
                                                            style="pointer-events:none;text-align:left;text-indent:128px;">
                                                            <div>商品</div>
                                                        </th>
                                                        <th class="tbl-2">
                                                            <div></div>
                                                        </th>
                                                        <th class="tbl-1">
                                                            <div>价格</div>
                                                        </th>
                                                        <th class="tbl-1">
                                                            <div>交易状态</div>
                                                        </th>
                                                        <th class="tbl-3">
                                                            <div>操作</div>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td colspan="5">
                                                            <!-- ngRepeat: o in orderList -->
                                                                <table cellspacing="0" cellpadding="0" class="moyig-ui">
                                                                    <tbody>
                                                                    <tr class="head-tr">
                                                                        <td colspan="5">
                                                                            <div class="fl">
                                                                                <span></span> <span class="ng-binding">订单号：订单号1001</span>
                                                                                <span>中小企业平台</span>
                                                                                <span>电话：电话1</span>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                        <tr class="content-tr">
                                                                            <td class="tbl-0">
                                                                                <div class="goods clearfix">
                                                                                    <img class="fl"
                                                                                         src="${ordersDetailDto.picUrl}">

                                                                                    <div class="goods_detail fl">
                                                                                        <h3>产品名称2</h3>

                                                                                        <p>铲平描述2</p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td class="tbl-2"></td>
                                                                            <td class="tbl-1">
                                                                                <div>
                                                                                    <em>20元/个</em>
                                                                                </div>

                                                                            </td>
                                                                            <td class="tbl-1"
                                                                                rowspan="1">
                                                                                <p>
                                                                                    <font>试用订单</font>
                                                                                </p>
                                                                            </td>
                                                                            <td class="tbl-3"
                                                                                rowspan="1">
                                                                                <div>
                                                                                    <p>
                                                                                        <a class="btn clear"
                                                                                           href="/mall-web/orders/payForOrder?orderSeq=${ordersDetailDto.orderSeq}">立即付款</a>
                                                                                        <a class="view-order clearfix"
                                                                                           href="${ctx}/buyerOrders/getOrderDetail/${ordersDetailDto.orderSeq}">订单详情</a>
                                                                                    </p>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr class="content-tr"
                                                                            style="border-top: 1px solid #e8e8e8;">
                                                                            <td class="tbl-0">
                                                                                <div class="goods clearfix">
                                                                                    <img class="fl"
                                                                                         src="${ordersDetailDto.picUrl}">
                                                                                    <div class="goods_detail fl">
                                                                                        <h3>产品名称</h3>
                                                                                        <p>产品描述</p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td class="tbl-2"></td>
                                                                            <td class="tbl-1">
                                                                                <div>
                                                                                    <em>20元/个</em>
                                                                                </div>
                                                                            </td>
                                                                            <td class="tbl-1"
                                                                                rowspan="${fn:length(buyerOrdersDto.ordersDetailDtos)}">
                                                                                <p>
                                                                                    <font>试用订单</font>
                                                                                </p>
                                                                            </td>
                                                                            <td class="tbl-3"
                                                                                rowspan="${fn:length(buyerOrdersDto.ordersDetailDtos)}">
                                                                                <div>
                                                                                    <p>
                                                                                        <a class="btn clear"
                                                                                           href="/mall-web/orders/payForOrder?orderSeq=${ordersDetailDto.orderSeq}">立即付款</a>
                                                                                        <a class="view-order clearfix"
                                                                                           href="${ctx}/buyerOrders/getOrderDetail/${ordersDetailDto.orderSeq}">订单详情</a>
                                                                                    </p>
                                                                                </div>
                                                                            </td>

                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <!-- ngIf: orderList.length > 0 -->
                                                <div class="pagination-layout ng-scope" ng-if="orderList.length > 0">
                                                    <div class="pagination">
                                                        <!-- 这里显示分页 -->
                                                        <ul class="pagination-sm pagination ng-isolate-scope ng-pristine ng-valid"
                                                            total-items="bigTotalItems" ng-model="bigCurrentPage"
                                                            max-size="maxSize" boundary-links="true" rotate="false"
                                                            items-per-page="10" ng-change="pageChanged()">
                                                            <!-- ngIf: boundaryLinks -->
                                                            <li ng-if="boundaryLinks"
                                                                ng-class="{disabled: noPrevious()}"
                                                                class="ng-scope disabled">
                                                                <a href="" ng-click="selectPage(1)" class="ng-binding">最前</a>
                                                            </li>
                                                            <!-- end ngIf: boundaryLinks -->
                                                            <!-- ngIf: directionLinks -->
                                                            <li ng-if="directionLinks"
                                                                ng-class="{disabled: noPrevious()}"
                                                                class="ng-scope disabled">
                                                                <a href="" ng-click="selectPage(page - 1)"
                                                                   class="ng-binding">前一页</a>
                                                            </li>
                                                            <!-- end ngIf: directionLinks -->
                                                            <!-- ngRepeat: page in pages track by $index -->
                                                            <li ng-repeat="page in pages track by $index"
                                                                ng-class="{active: page.active}"
                                                                class="ng-scope active">
                                                                <a href="" ng-click="selectPage(page.number)"
                                                                   class="ng-binding">1</a>
                                                            </li>
                                                            <!-- end ngRepeat: page in pages track by $index -->
                                                            <!-- ngIf: directionLinks -->
                                                            <li ng-if="directionLinks" ng-class="{disabled: noNext()}"
                                                                class="ng-scope disabled">
                                                                <a href="" ng-click="selectPage(page + 1)"
                                                                   class="ng-binding">下一页</a>
                                                            </li>
                                                            <!-- end ngIf: directionLinks -->
                                                            <!-- ngIf: boundaryLinks -->
                                                            <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"
                                                                class="ng-scope disabled">
                                                                <a href="" ng-click="selectPage(totalPages)"
                                                                   class="ng-binding">最后</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<jsp:include page="../public/footer.jsp"></jsp:include>
<jsp:include page="../public/buyerBottom.jsp"></jsp:include>

<script type="text/javascript">
    $(function () {
        if (0 == ${resultCode}) {
            alert(${message});
        } else {
            var liflagid = 'liflag' + ${buyerOrdersDto.serachFlag};
            $("#" + liflagid + "").attr("class", "on");
            $("#serachFlag").val(${buyerOrdersDto.serachFlag});
        }
    });

</script>
<script type="text/javascript">
    function changeserachFlag(value) {
        $("#serachFlag").val(value);
        queryOrders();
    }

    function queryOrders() {
        $("#frm").attr("action", "${ctx}/buyerOrders/listOrders");
        $("#frm").submit();
    }
</script>
</body>
</html>