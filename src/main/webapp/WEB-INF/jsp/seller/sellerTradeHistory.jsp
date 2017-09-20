<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>

	<head>
		<jsp:include page="../public/sellerHead.jsp"></jsp:include>
	</head>

	<body>
		<div class="main">

			<jsp:include page="../public/sellerTopMenu.jsp"></jsp:include>

			<div class="perscenter-ui">
				<div class="main-layout ng-scope" ng-if="withMenu">
					<div class="wrapper">
						<div class="content-layout">

							<jsp:include page="../public/sellerLeftMenu.jsp"></jsp:include>
							<form id="frm" class="bs-example form-horizontal" action="${ctx}/sellerCenter/tradeHistory"
								  method="post">
								<div ng-view="" class="ng-scope">
								<div class="bg_color percent-seller ng-scope">
									<div class="trade-history">
										<div class="percent-seller-goods">
											<div class="filter-row">
												<label class="filter-item">
													商品名称:
													<input id="prodName" name="prodName"
														   class="filter-input-filed ng-pristine ng-valid" type="text">
												</label>
												<label class="filter-item">
													订单号:
													<input id="orderSeq" name="orderSeq"
														   class="filter-input-filed ng-pristine ng-valid" type="text">
												</label>
												<label class="filter-item">
													交易状态:
													<select id="status" name="status"
															class="filter-input-filed ng-pristine ng-valid" type="text">
														<option value="">请选择订单状态</option>
														<option value="0">未支付</option>
														<option value="1">待发货</option>
														<option value="2">待签收</option>
														<option value="4">已确认收货</option>
														<option value="5">已删除订单</option>
														<option value="6">申请退货</option>
														<option value="7">退货成功</option>
													</select>
												</label>
											</div>
											<div class="filter-row">
												<label class="filter-item">
													开始时间:
													<input type="text"
														   onclick="WdatePicker({el:'startTime', dateFmt:'yyyy-MM-dd HH:mm:ss'})"
														   class="filter-input-filed" name="startTime"
														   id="startTime"
														   value="<fmt:formatDate value='${tradeHistoryDto.startTime}' pattern='${df}'/>"
														   readonly/>
												</label>

												<label class="filter-item">
													结束时间:
													<input type="text"
														   onclick="WdatePicker({el:'endTime', dateFmt:'yyyy-MM-dd HH:mm:ss'})"
														   class="filter-input-filed" name="endTime"
														   id="endTime"
														   value="<fmt:formatDate value='${tradeHistoryDto.endTime}' pattern='${df}'/>"
														   readonly/>
												</label>
											</div>

											<div class="filter-btn">
												<a href="javascript:" class="search-goods"
												   onclick="submitFrm()">搜索订单</a>
												<a href="javascript:" class="clear-condition" onclick="clearSearch()">清空条件</a>
											</div>
										</div>
										<table class="trade-history-list">
											<tbody>
												<tr class="trade-history-hd">
													<th>订单流水号</th>
													<th>商品名称</th>
													<th>销售属性</th>
													<th>商品成交价格</th>
													<th>查看</th>
													<th>交易状态</th>
												</tr>
													<tr class="item ng-scope">
														<td class="seq ng-binding"
															style="font-size:12px;">010101</td>
														<td class="product-name ng-binding">华为手机</td>
														<td class="product-name ng-binding">白，16g</td>
														<td class="price-info ng-binding" style="font-size:12px;">
															<fmt:formatNumber value="1500"
																			  type="CURRENCY"></fmt:formatNumber></td>
														<td class="order-detail">
															<a target="_blank"
															   href="${ctx}/sellerOrders/getOrderDetail/${history.orderSeq}">订单详情</a>
														</td>
														<td class="order-state complete ng-binding">
															未支付
														</td>
													</tr>
												<tr class="item ng-scope">
													<td class="seq ng-binding"
														style="font-size:12px;">01010102</td>
													<td class="product-name ng-binding">苹果9</td>
													<td class="product-name ng-binding">黑，128</td>
													<td class="price-info ng-binding" style="font-size:12px;">
														<fmt:formatNumber value="4500"
																		  type="CURRENCY"></fmt:formatNumber></td>
													<td class="order-detail">
														<a target="_blank"
														   href="${ctx}/sellerOrders/getOrderDetail/${history.orderSeq}">订单详情</a>
													</td>
													<td class="order-state complete ng-binding">
														已支付
													</td>
												</tr>
												<tr class="item ng-scope">
													<td class="seq ng-binding"
														style="font-size:12px;">01010522</td>
													<td class="product-name ng-binding">dell笔记本</td>
													<td class="product-name ng-binding">黑，500</td>
													<td class="price-info ng-binding" style="font-size:12px;">
														<fmt:formatNumber value="45000"
																		  type="CURRENCY"></fmt:formatNumber></td>
													<td class="order-detail">
														<a target="_blank"
														   href="${ctx}/sellerOrders/getOrderDetail/${history.orderSeq}">订单详情</a>
													</td>
													<td class="order-state complete ng-binding">
														已支付
													</td>
												</tr>


											</tbody>
										</table>

									</div>
								</div>
							</div>
							</form>
						</div>
					</div>
				</div>
				<!-- end ngIf: withMenu -->
				<!-- ngIf: !withMenu -->
			</div>

		</div>

		<jsp:include page="../public/footer.jsp"></jsp:include>
		<jsp:include page="../public/sellerBottom.jsp"></jsp:include>

		<script type="application/javascript">
			function submitFrm() {
				$("#frm").submit();
			}

			function clearSearch() {
				$("#prodName").val("");
				$("#orderSeq").val("");
				$("#status").val("");
				$("#startTime").val("");
				$("#endTime").val("");
			}
		</script>
	</body>

</html>