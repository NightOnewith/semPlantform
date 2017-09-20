<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
							<div ng-view="" class="ng-scope">
								<div class="bg_color percent-seller percent-seller-finance-manage ng-scope">
									<div class="manage-top">
										<div class="account-part account-remain">
											<p class="item-title">
												账户余额
											</p>
											<p class="item-mount">
												<span id="sanp01" class="ng-binding"><fmt:formatNumber
														value="100"
														type="CURRENCY"></fmt:formatNumber></span>
												<a onclick="changeValue('sanp01',1)" href="javascript:"
												   class="hide-btn"></a>
											</p>
											<div class="operate-btn">
												<a class="withdraw-btn" ng-click="withdraw()" href="javascript:">提现</a>
											</div>
										</div>
										<div class="account-part trade-amount">
											<p class="item-title">
												交易额
											</p>
											<p class="item-mount">
												<span id="sanp02" class="ng-binding"><fmt:formatNumber
														value="450"
														type="CURRENCY"></fmt:formatNumber></span>
												<a onclick="changeValue('sanp02',2)" href="javascript:"
												   class="hide-btn"></a>
											</p>
											<a href="#/sellerTradeHistory/all" class="link-btn">交易记录</a>
										</div>
									</div>
									<div class="manage-bottom">
										<div class="account-part online-trade-amount">
											<p class="item-title">
												已到账
											</p>
											<p class="item-mount">
												<span id="sanp03" class="ng-binding"><fmt:formatNumber
														value="220"
														type="CURRENCY"></fmt:formatNumber></span>
												<a onclick="changeValue('sanp03',3)" href="javascript:"
												   class="hide-btn"></a>
											</p>
											<a href="#/sellerTradeHistory/all" class="link-btn">交易记录</a>
										</div>
										<div class="account-part trade-amount offline-trade-amount">
											<p class="item-title">
												未到账
											</p>
											<p class="item-mount">
												<span id="sanp04" class="ng-binding"><fmt:formatNumber
														value="100"
														type="CURRENCY"></fmt:formatNumber></span>
												<a onclick="changeValue('sanp04',4)" href="javascript:"
												   class="hide-btn"></a>
											</p>
											<a href="#/sellerTradeHistory/offline" class="link-btn">交易记录</a>
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