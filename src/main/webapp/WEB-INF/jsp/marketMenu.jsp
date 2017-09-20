<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

	<head>
		<jsp:include page="public/head.jsp"></jsp:include>
	</head>

	<body ng-controller="indexCtrl" class="index ng-scope">

		<jsp:include page="public/menu.jsp"></jsp:include>

		<div id="page-container" >
			<div id="container" class="market_menu">
				<div class="content">
					<div class="mm_tag">
						<a class="tag_1" href="#/">首页&gt;&gt;</a>
						<a class="tag_1" href="#/productAdvantage">应用超市&gt;&gt;</a>
						<span class="tag_2">电子产品</span></div>
					<table cellspacing="0" cellpadding="0" class="table_menu">
						<thead>
							<tr>
								<th class="tbl-0" width="65%" style="pointer-events:none;">
									<div>商品</div>
								</th>
								<th class="tbl-1" width="20%">
									<div>店铺</div>
								</th>
								<th class="tbl-2" width="15%">
									<div>详情</div>
								</th>
							</tr>
						</thead>
					</table>
					<ul class="goods-list goods-new" id="ul_template1">

						<li class="goods-item clear " style="width: 1168px;">
							<img class="menu_img fl" src="${ctx}/tempFiles/1496131116230.jpg">
							<div class="goods_detail fl" >
								<h3 class="goods-title" >苹果手机</h3>
								<p class="goods-description">
									<span >苹果，贵！不买！</span>
								</p>
							</div>
							<div class="fl price-area" style="width: 16%">
								<span class="sale orange">刘家小铺</span>
							</div>
							<div class="fl select-area">
								<a href="${ctx}/index/toProductDetail">查看详情</a>
							</div>
						</li>

						<li class="goods-item clear " style="width: 1168px;">
							<img class="menu_img fl" src="${ctx}/tempFiles/1496131116230.jpg">
							<div class="goods_detail fl" >
								<h3 class="goods-title" >小米手机</h3>
								<p class="goods-description">
									<span >小米手机，支持国产，像雷个致敬</span>
								</p>
							</div>
							<div class="fl price-area" style="width: 16%">
								<span class="sale orange">小米手机专卖店</span>
							</div>
							<div class="fl select-area">
								<a href="${ctx}/index/toProductDetail">查看详情</a>
							</div>
						</li>

						<li class="goods-item clear " style="width: 1168px;">
							<img class="menu_img fl" src="${ctx}/tempFiles/1496131116230.jpg">
							<div class="goods_detail fl" >
								<h3 class="goods-title" >联想电脑</h3>
								<p class="goods-description">
									<span >联想，走出国门的大品牌！</span>
								</p>
							</div>
							<div class="fl price-area" style="width: 16%">
								<span class="sale orange">联想旗舰店</span>
							</div>
							<div class="fl select-area">
								<a href="${ctx}/index/toProductDetail">查看详情</a>
							</div>
						</li>

					</ul>
				</div>
			</div>
		</div>

		<jsp:include page="public/footerBefore.jsp"></jsp:include>
		<jsp:include page="public/footer.jsp"></jsp:include>
		<jsp:include page="public/bottom.jsp"></jsp:include>

</html>