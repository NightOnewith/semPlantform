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
				<!-- ngIf: withMenu -->
				<div class="main-layout ng-scope" ng-if="withMenu">
					<div class="wrapper">
						<div class="content-layout">

							<jsp:include page="../public/sellerLeftMenu.jsp"></jsp:include>
							<div ng-view="" class="ng-scope">
								<div class="bg_color percent-seller percent-seller-new ng-scope">
									<div class="seller_center">
										<div class="center">
											<img src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/hhttps://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=9579eaa6fd36afc3110c38658319eb85/a1ec08fa513d2697cfd8af3b5ffbb2fb4316d849.jpg" class="img_pic">
											<div class="content">
												<div class="seller_number">
													<div class="info_menu">
														<span class="info_tit">商家名称：</span>
														<span class="info_con ng-binding"> 阿里巴巴</span>
													</div>
													<div class="info_menu">
														<span class="info_tit fl">商家资质：</span>
														<c:forEach begin="1" end="${sellerInfoDto.sellerAptitude}" step="1">
															<img src="second-period/img/order/gold.png" class="gold"/>
														</c:forEach>
														<%--<span class="info_con ng-binding"></span>--%>
													</div>
												</div>
												<div class="seller_number">
													<div class="info_menu">
														<img src="second-period/img/order/sell.png" class="sell_pic">
														<span class="num_info ng-binding">在售：10件</span>
													</div>
													<div class="info_menu">
														<img src="second-period/img/order/time.png" class="time_pic">
														<span class="num_info ng-binding">注册时间：2008-08-10</span>
													</div>
												</div>
											</div>
											<a href="#/accountManange" class="fr setting-btn">设置</a>
										</div>

										<div class="seller_manage">
											<div class="menu_1">
												<div class="menu_title">
													<img class="menu_pic" src="second-period/img/order/menu_logo_1.png">
													<span class="menu_title_name">商品管理</span>
												</div>
												<div class="menu_content">
													<ul>
														<li class="content content_1">
															<a href="#/sellerUploadGoods">
																<i></i> 发布商品
															</a>
														</li>
														<li class="content content_2">
															<a href="#/goodsManagement/committedGoods">
																<i></i> 已上架商品
															</a>
														</li>
														<li class="content content_3">
															<a href="#/sellerOrderCenter">
																<i></i> 订单中心
															</a>
														</li>
														<li class="content content_4">
															<a href="#/goodsManagement/unCommittedGoods">
																<i></i> 待上架商品
															</a>
														</li>
													</ul>
												</div>
											</div>
											<div class="menu_2">
												<div class="menu_title">
													<img class="menu_pic" src="second-period/img/order/menu_logo_2.png">
													<span class="menu_title_name">资金管理</span>
												</div>
												<div class="menu_content">
													<ul class="sale_content">
														<li class="sale_menu sale_menu_1"><span class="sale_tit">余额：</span>
															<span id="sanp01" class="sale ng-binding"><fmt:formatNumber
																	value="100"
																	type="CURRENCY"></fmt:formatNumber></span>
															<img class="sale_pic" src="second-period/img/order/eye.png"
																 alt="" onclick="changeValue('sanp01',1)">
															<a href="javascript:" class="sale_btn">提现</a>
														</li>
														<li class="sale_menu sale_menu_2"><span class="sale_tit">交易额：</span>
															<span id="sanp02" class="sale ng-binding"><fmt:formatNumber
																	value="100"
																	type="CURRENCY"></fmt:formatNumber></span>
															<img class="sale_pic" src="second-period/img/order/eye.png"
																 alt="" onclick="changeValue('sanp02',2)">
															<a href="" class="sale_record">交易记录</a>
														</li>
														<li class="sale_menu sale_menu_3"><span class="s_tit">已到账：</span>
															<span id="sanp03"
																  class="s_sale ng-binding"><fmt:formatNumber
																	value="500"
																	type="CURRENCY"></fmt:formatNumber></span>
															<img class="sale_pic" src="second-period/img/order/eye.png"
																 alt="" onclick="changeValue('sanp03',3)">
															<a href="" class="sale_record">交易记录</a>
														</li>
														<li class="sale_menu sale_menu_4">
															<span class="s_tit">未到账：</span>
															<span id="sanp04"
																  class="s_sale ng-binding"><fmt:formatNumber
																	value="200"
																	type="CURRENCY"></fmt:formatNumber></span>
															<img class="sale_pic" src="second-period/img/order/eye.png"
																 alt="" onclick="changeValue('sanp04',4)">
															<a href="" class="sale_record">交易记录</a>
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
				<!-- end ngIf: withMenu -->
				<!-- ngIf: !withMenu -->
			</div>
		</div>

		<jsp:include page="../public/footer.jsp"></jsp:include>
		<jsp:include page="../public/sellerBottom.jsp"></jsp:include>

		<script type="application/javascript">
			function changeValue(sapnStr, flag) {
				if ($("#" + sapnStr).text() == "*****") {
					if (flag == 1) {
						$("#" + sapnStr).text('<fmt:formatNumber value="${capital.balance}" type="CURRENCY"></fmt:formatNumber>');
					} else if (flag == 2) {
						$("#" + sapnStr).text('<fmt:formatNumber value="${capital.sumMoney}" type="CURRENCY"></fmt:formatNumber>');
					} else if (flag == 3) {
						$("#" + sapnStr).text('<fmt:formatNumber value="${capital.toAccount}" type="CURRENCY"></fmt:formatNumber>');
					} else if (flag == 4) {
						$("#" + sapnStr).text('<fmt:formatNumber value="${capital.notAccount}" type="CURRENCY"></fmt:formatNumber>');
					}

				} else {
					$("#" + sapnStr).text("*****");
				}

			}
		</script>
	</body>
</html>