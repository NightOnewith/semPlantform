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
				<div class="main-layout">
					<div class="wrapper">
						<form id="frm" class="bs-example form-horizontal" action="${ctx}/sellerOrders" method="post">
							<div class="content-layout">

							<jsp:include page="../public/sellerLeftMenu.jsp"></jsp:include>
							<div ng-view="" class="ng-scope">
								<div class="order bg_color order-center-new">
									<div class="wrapper_pc">
										<div class="order_query">
											<ul class="clearfix">
												<li><label>商品名称：</label>
													<input type="text" id="prodName" name="prodName" value="华为8">
												</li>
												<li>
													<label>成交时间:</label>

													<input type="text"
														   onclick="WdatePicker({el:'startTime', dateFmt:'yyyy-MM-dd HH:mm:ss'})"
														   name="startTime" id="startTime"
														   value="2017-01-21" placeholder="开始时间" readonly/>

												</li>
												<li>
													<label>成交时间:</label>

													<input type="text"
														   onclick="WdatePicker({el:'endTime', dateFmt:'yyyy-MM-dd HH:mm:ss'})"
														   name="endTime" id="endTime"
														   value="2017-02-21" placeholder="结束时间" readonly/>


												</li>
												<li><label>买家昵称：</label>
													<input type="text" id="custName" name="custName"
														   value="店小二">
												</li>
												<li>
													<label>买家单号：</label>
													<input type="text" id="ordersSeqGroup" name="ordersSeqGroup" value="012212">
												</li>
												<li>
													<label>商家单号：</label>
													<input type="text" id="orderSeq" name="orderSeq" value="123">
												</li>
											</ul>
											<div class="btn clearfix">
												<a href="javascript:" class="search_order"
												   onclick="queryOrders()">搜索订单</a>
												<a href="javascript:" class="derived_order"
												   onclick="getHistoryOrders()">导出/下载历史订单</a>
											</div>
										</div>
										<div class="text-slide">
											<input type="hidden" id="serachFlag" name="serachFlag">
											<div class="hd">
												<ul>
													<li id="liflag0">
														<span onclick="changeserachFlag(0)"> 近3个月订单
															<em>(10)</em></span>
														</span>
													</li>
													<li id="liflag1">
														<span onclick="changeserachFlag(1)">等待买家付款
                            								<em>(20)</em>
                       									</span>
													</li>
													<li id="liflag2">
														<span onclick="changeserachFlag(2)">等待发货
															<em>(20)</em>
                       									 </span>
													</li>
													<li id="liflag3">
														<span onclick="changeserachFlag(3)">已完成订单
                            								<em>(20)</em>
                        								</span>
													</li>
													<li id="liflag4" onclick="changeserachFlag(4)">
														<span>三个月前订单
															<em>(50)</em>
														</span>
													</li>
												</ul>
											</div>
											<div class="bd">
												<ul>
													<li>
														<table cellspacing="0" cellpadding="0" class="tablesorter" id="tablesorter">
															<thead>
																<tr>
																	<th class="tbl-0"
																		style="pointer-events:none;text-align:left;text-indent:228px;width: 750px;">
																		<div>商品</div>
																	</th>
																	<th class="tbl-1">
																		<div>销售属性</div>
																	</th>
																	<th class="tbl-1">
																		<div>价格</div>
																	</th>
																	<th class="tbl-2">
																		<div>买家</div>
																	</th>
																	<th class="tbl-2">
																		<div>详情</div>
																	</th>
																</tr>

															</thead>

																<tbody>
																<tr>
																	<td colspan="6">
																		<table cellspacing="0" cellpadding="0" class="moyig-ui">
																			<tbody>
																				<tr class="head-tr">
																					<td colspan="6">
																						<div class="fl">
																							<span>买家单号：455613</span><span>商家单号：122323</span>
																							<span>买家电话：138878995</span>
																						</div>
																					</td>
																				</tr>

																					<tr class="content-tr"
																						style="border-bottom: 1px solid #e8e8e8;">
																						<td>
																							<div class="check-box"
																								 style="height: 27px;"></div>
																						</td>
																						<td class="tbl-0">
																							<div class="goods clearfix">
																								<img class="fl"
																									 src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=9579eaa6fd36afc3110c38658319eb85/a1ec08fa513d2697cfd8af3b5ffbb2fb4316d849.jpg">
																								<div class="goods_detail fl">
																									<h3>dell游侠</h3>
																									<p>一款不粗的电脑</p>
																								</div>
																							</div>
																						</td>
																						<td class="tbl-1">
																							<div>
																								<em>黑色，500g</em>
																							</div>
																						</td>
																						<td class="tbl-1">
																							<div>
																								<em><fmt:formatNumber value='1000'
																										type='CURRENCY'></fmt:formatNumber>/个</em>
																							</div>
																						</td>
																						<td class="tbl-2"
																							rowspan="1">
																							<p>
																								<font>大灰狼</font>
																							</p>
																						</td>
																						<td class="tbl-2"
																							rowspan="2">
																							<div>
																								<p>
																									<a target="_blank"
																									   class="view-order clearfix"
																									   href="${ctx}/sellerOrders/getOrderDetail/${SellerOrdersDto.orderSeq}">订单详情</a>
																								</p>
																							</div>
																						</td>
																					</tr>

																					<tr class="content-tr"
																						style="border-bottom: 1px solid #e8e8e8;">
																						<td>
																							<div class="check-box"
																								 style="height: 27px;"></div>
																						</td>
																						<td class="tbl-0">
																							<div class="goods clearfix">
																								<img class="fl"
																									 src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=9579eaa6fd36afc3110c38658319eb85/a1ec08fa513d2697cfd8af3b5ffbb2fb4316d849.jpg">
																								<div class="goods_detail fl">
																									<h3>苹果手机9</h3>
																									<p>爆款</p>
																								</div>
																							</div>

																						</td>
																						<td class="tbl-1">
																							<div>
																								<em>白色，128g</em>
																							</div>
																						</td>
																						<td class="tbl-1">
																							<div>
																								<em>
																									<fmt:formatNumber
																											value='5555'
																											type='CURRENCY'></fmt:formatNumber>/个</em>
																							</div>
																						</td>
																					</tr>

																				<tr>
																					<td colspan="6">
																						<table cellspacing="0" cellpadding="0" class="moyig-ui">
																							<tbody>
																							<tr class="head-tr">
																								<td colspan="6">
																									<div class="fl">
																										<span>买家单号：01020</span><span>商家单号：20120</span>
																										<span>买家电话：138888888</span>
																									</div>
																								</td>
																							</tr>

																								<tr class="content-tr"
																									style="border-bottom: 1px solid #e8e8e8;">
																									<td>
																										<div class="check-box"
																											 style="height: 27px;"></div>
																									</td>
																									<td class="tbl-0">
																										<div class="goods clearfix">
																											<img class="fl"
																												 src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=9579eaa6fd36afc3110c38658319eb85/a1ec08fa513d2697cfd8af3b5ffbb2fb4316d849.jpg">
																											<div class="goods_detail fl">
																												<h3>华为手机</h3>
																												<p>成功的标配</p>
																											</div>
																										</div>
																									</td>
																									<td class="tbl-1">
																										<div>
																											<em>5.5寸，256g</em>
																										</div>
																									</td>
																									<td class="tbl-1">
																										<div>
																											<em><fmt:formatNumber value='1000'
																																  type='CURRENCY'></fmt:formatNumber>/个</em>
																										</div>
																									</td>
																									<td class="tbl-2"
																										rowspan="1">
																										<p>
																											<font>小红帽</font>
																										</p>
																									</td>
																									<td class="tbl-2"
																										rowspan="2">
																										<div>
																											<p>
																												<a target="_blank"
																												   class="view-order clearfix"
																												   href="${ctx}/sellerOrders/getOrderDetail/${SellerOrdersDto.orderSeq}">订单详情</a>
																											</p>
																										</div>
																									</td>
																								</tr>
																							<tr class="content-tr"
																								style="border-bottom: 1px solid #e8e8e8;">
																								<td>
																									<div class="check-box"
																										 style="height: 27px;"></div>
																								</td>
																								<td class="tbl-0">
																									<div class="goods clearfix">
																										<img class="fl"
																											 src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=9579eaa6fd36afc3110c38658319eb85/a1ec08fa513d2697cfd8af3b5ffbb2fb4316d849.jpg">
																										<div class="goods_detail fl">
																											<h3>苹果手机9</h3>
																											<p>爆款</p>
																										</div>
																									</div>

																								</td>
																								<td class="tbl-1">
																									<div>
																										<em>白，256g</em>
																									</div>
																								</td>
																								<td class="tbl-1">
																									<div>
																										<em>
																											<fmt:formatNumber
																													value='5555'
																													type='CURRENCY'></fmt:formatNumber>/个</em>
																									</div>
																								</td>
																							</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
															<%--</c:forEach>--%>
														</table>

													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						</form>
					</div>
				</div>
			</div>

		</div>

		<jsp:include page="../public/footer.jsp"></jsp:include>
		<jsp:include page="../public/sellerBottom.jsp"></jsp:include>

		<script type="text/javascript">
			$(function () {
				if (0 == ${resultCode}) {
					alert(${message});
				} else {
					var liflagid = 'liflag' + ${sellerOrdersDto.serachFlag};
					$("#" + liflagid + "").attr("class", "on");
					$("#serachFlag").val(${sellerOrdersDto.serachFlag});
				}
			});

		</script>
		<script type="text/javascript">
			function changeserachFlag(value) {
				$("#serachFlag").val(value);
				queryOrders();
			}

			function queryOrders() {
				$("#frm").attr("action", "${ctx}/sellerOrders");
				$("#frm").submit();
			}

			function getHistoryOrders() {
				$("#frm").attr("action", "${ctx}/sellerOrders/historyOrders");
				$("#frm").submit();
			}
		</script>
	</body>

</html>