<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>

	<head>
		<jsp:include page="../public/sellerHead.jsp"></jsp:include>
	</head>

	<body>
		<div class="main">

			<jsp:include page="../public/sellerTopMenu.jsp"></jsp:include>

			<div class="perscenter-ui">
				<!-- ngIf: withMenu -->
				<!-- ngIf: !withMenu -->
				<!-- ngView:  -->
				<div ng-if="!withMenu">
					<div class="order order-detail-new seller-detail-new grey">
						<div class="wrapper">
							<div class="text-slide">
								<div class="orderStatus">
									<div class="order-status-part order-status-part-padding">
										当前订单状态：
										<span id="orderStatus0" class="status">待付款</span>
									</div>
									<div class="order-status-part">
										<div class="notice">小微企业商城提醒您：<span class="red">交易成功后，如果买家提出售后要求，请积极与买家协商，做好售后服务。</span></div>
									</div>
								</div>
								<div class="bd orderInfo">
									<div class="tit">订单信息</div>
									<div class="con">
										<div class="sellerTit">
											卖家信息
										</div>
										<div class="arrow"></div>
										<div class="infoSection clearfix" style="text-align: left;">
											<div class="item fl">
												联系人：<span
													class="sellerName">联系人姓名</span>
											</div>

											<div class="item fl">
												联系电话：<span
													class="sellerPhone">联系电话</span>
											</div>

											<div class="item fl">
												地址：<span
													class="sellerPhone">地址</span>
											</div>
										</div>
										<ul>
											<li>
												<table cellspacing="0" cellpadding="0" class="tablesorter" id="tablesorter">
													<thead>
														<tr>
															<th class="tbl-0" style="pointer-events:none;">
																<div>商品</div>
															</th>
															<th class="tbl-1">
																<div>属性</div>
															</th>
															<th class="tbl-2">
																<div>价格</div>
															</th>
															<th class="tbl-3">
																<div>数量</div>
															</th>
															<th class="tbl-4">
																<div>订单状态</div>
															</th>
														</tr>
													</thead>
													<tbody class="moyig-ui">
														<tr class="content-tr">
															<td class="tbl-0">
																<div class="goods clearfix">
																	<img class="fl" src="${ordersDetail.picUrl}">
																	<div class="goods_detail fl">
																		<h3>产品名称</h3>
																	</div>
																</div>
															</td>
															<td class="tbl-1">
																<div>
																	<p>产品属性</p>
																	</div>
															</td>
															<td class="tbl-2">
																<div>
																	<em>100</em>
																</div>
															</td>
															<td class="tbl-3" style="border-right: 1px solid #e8e8e8">
																<p>
																	<font>5个</font>
																</p>
															</td>
															<td class="tbl-4" rowspan="3">
																<p>
																	<span id="orderStatus1" class="status ng-binding"> </span>
																</p>
															</td>
														</tr>
														<tr class="content-tr">
															<td class="tbl-0">
																<div class="goods clearfix">
																	<img class="fl" src="${ordersDetail.picUrl}">

																	<div class="goods_detail fl">
																		<h3>产品名称2</h3>
																	</div>
																</div>
															</td>
															<td class="tbl-1">
																<div>
																	<p>产品属性2</p>
																</div>
															</td>
															<td class="tbl-2">
																<div>
																	<em>200</em>
																</div>
															</td>
															<td class="tbl-3" style="border-right: 1px solid #e8e8e8">
																<p>
																	<font>6个</font>
																</p>
															</td>
														</tr>
													</tbody>
												</table>
											</li>
										</ul>
										<div class="infoSection clearfix" style="margin-top: 30px">
											<div class="fr clearfix">
												<div  style="font-size: 16px;color: #333333;text-align: right"></div>
												<div  class="price-info"></div>
											</div>
										</div>
										<div class="infoSection clearfix" style="margin-top: 30px">
											<div class="fl infoOne">
												<div>
													买家订单编号：
													<span class="storeName">买家订单编号</span>
												</div>
												<div>
													下单时间：
													<span class="storeName">2017-6-12</span>
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
		<jsp:include page="../public/sellerBottom.jsp"></jsp:include>

		<script type="application/javascript">
			var prodStatus = {
				"0": "未支付",
				"1": "已支付",
				"2": "已发货",
				"4": "确认收货",
				"5": "删除",
				"6": "申请退货",
				"7": "退货成功"
			};
			var orderStatus = {
				"0": "等待付款",
				"1": "等待发货",
				"2": "等待签收",
				"4": "订单完成",
				"5": "删除订单",
				"6": "买家申请退货",
				"7": "退货成功"
			};

			var moneyStatus = {
				"0": "应收价格",
				"1": "已收价格",
				"2": "已收价格",
				"4": "已收价格",
				"5": "删除订单",
				"6": "待退价格",
				"7": "已退价格"
			};

			$(function () {
				$("#orderStatus0").text(prodStatus[${sellerOrdersDto.status}]);
				$("#orderStatus1").text(prodStatus[${sellerOrdersDto.status}]);
				$("#orderStatus2").text(prodStatus[${sellerOrdersDto.status}]);
				$("#orderStatus3").html(moneyStatus[${sellerOrdersDto.status}] + ":<span class='red orange ng-binding'><fmt:formatNumber
																			value='${sellerOrdersDto.totalMoney}'
																			type='CURRENCY'></fmt:formatNumber></span>");

			});
		</script>
	</body>
</html>