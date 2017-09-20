<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

	<head>
		<jsp:include page="public/head.jsp"></jsp:include>
	</head>

	<body ng-controller="indexCtrl" class="index ng-scope">

		<jsp:include page="public/menu.jsp"></jsp:include>

		<!-- ngView:  -->
		<div ng-view="" id="page-container" class="ng-scope">
			<div ng-bind-html="html" style="padding-top: 150px;width: 1170px;margin: 0 auto;" class="ng-binding ng-scope">
				<p style="text-align:center;">
					<span style="font-size:24px;"><strong>E人E本行业解决方案</strong></span>
				</p>
				<p style="text-align:center;">
					<br>
				</p>
				<p style="text-align:center;">
					<img src="../../files/1489561421876.jpg" alt="">
					<img src="../../files/1489561434796.jpg" alt="">
					<img src="../../files/1489561443566.jpg" alt="">
					<img src="../../files/1489561449340.jpg" alt="">
				</p>
			</div>
		</div>

		<jsp:include page="public/footerBefore.jsp"></jsp:include>
		<jsp:include page="public/footer.jsp"></jsp:include>
		<jsp:include page="public/bottom.jsp"></jsp:include>

	</body>

</html>