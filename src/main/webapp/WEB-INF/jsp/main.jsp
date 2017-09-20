<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
	<jsp:include page="public/head.jsp"></jsp:include>
</head>

<body class="index">

	<jsp:include page="public/menu.jsp"></jsp:include>

	<div id="page-container">
		<div id="container">
			<!-- 轮播图片 -->
			<div id="myCarousel" class="carousel slide">
				<div id="bannerdiv" class="carousel-inner">
					<div class="item active">
						<img src="${ctx}/tempFiles/1489455799290.png" alt="First slide" class="imgClass" style="height: 400px !important;">
					</div>
					<div class="item">
						<img src="${ctx}/tempFiles/1489717008053.png" alt="First slide" class="imgClass" style="height: 400px !important;">
					</div>
					<div class="item">
						<img src="${ctx}/tempFiles/1489455784435.png" alt="First slide" class="imgClass" style="height: 400px !important;">
					</div>
				</div>
				<!-- 轮播（Carousel）指标 -->
				<div class="hd">
					<ol id="bannerol" class="carousel-indicators clearfix onClass">
						<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
						<li data-target="#myCarousel" data-slide-to="1"></li>
						<li data-target="#myCarousel" data-slide-to="2"></li>
					</ol>
				</div>
			</div>

			<div class="wrapper wrapper_menu">
				<div class="index_products_tit">推荐产品</div>
				<div id="hotdiv" class="con clearfix">
					<div class="item fl">
						<img  class="home-item-img" src="${ctx}/tempFiles/1496209504176.jpg"><br>
						<div class="title ng-binding">小米手机</div>
						<button type="button" class="b2Btn btn" onclick="productDetail()">查看详情</button>
					</div>
					<div class="item fl">
						<img  class="home-item-img" src="${ctx}/tempFiles/1496209504176.jpg"><br>
						<div class="title ng-binding">三枪内裤</div>
						<button type="button" class="b2Btn btn" onclick="productDetail()">查看详情</button>
					</div>
					<div class="item fl">
						<img  class="home-item-img" src="${ctx}/tempFiles/1496209504176.jpg"><br>
						<div class="title ng-binding">华为软件</div>
						<button type="button" class="b2Btn btn" onclick="productDetail()">查看详情</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<jsp:include page="public/footerBefore.jsp"></jsp:include>
	<jsp:include page="public/footer.jsp"></jsp:include>
	<jsp:include page="public/bottom.jsp"></jsp:include>

</body>
</html>