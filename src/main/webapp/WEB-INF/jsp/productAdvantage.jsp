<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

	<head>
		<jsp:include page="public/head.jsp"></jsp:include>
	</head>

	<body ng-controller="indexCtrl" class="index ng-scope">

		<jsp:include page="public/menu.jsp"></jsp:include>

		<div ng-view="" id="page-container" class="ng-scope">
			<div class="advantage" >
				<section >
					<div class="section-main-img" >
						<h3>电子产品</h3>
						<div class="type-desc">
							<img src="${ctx}/tempFiles/1489726707628.png">
							<p>电子产品主要包括：电话、电视机、影碟机（VCD、 SVCD、DVD）、录像机、摄录机、收音机、收录机、组合音箱、激光唱机（CD）、电脑、移动通信产品等。因早期产品主要以电子管为基础原件故名电子产品。</p>
						</div>
						<div class="type-prod">
							<a class="prod-item"
							   href="${ctx}/index/toProductDetail">
								<img src="${ctx}/tempFiles/1489559173709.jpg">
								<span>小米手机</span>
							</a>
							<a class="prod-item"
							   href="${ctx}/index/toProductDetail">
								<img src="${ctx}/tempFiles/1489559173709.jpg">
								<span>苹果手机</span>
							</a>
							<a class="prod-item"
							   href="${ctx}/index/toMarketMenu">
								<span>...更多</span>
							</a>
						</div>
					</div>
				</section>

				<section >
					<div class="section-main-img" >
						<h3>服装类</h3>
						<div class="type-desc">
							<img src="${ctx}/tempFiles/1489726707628.png">
							<p>对现在社会来说，服装已经是每个人装饰自己，保护自己，能给自己和家人的必用品，不仅仅为穿，还是一个身份、一种生活态度、一个展示个人魅力的表现。</p>
						</div>
						<div class="type-prod">
							<a class="prod-item"
							   href="${ctx}/index/toProductDetail">
								<img src="${ctx}/tempFiles/1489559173709.jpg">
								<span>三枪内库</span>
							</a>
						</div>
					</div>
				</section>
			</div>
		</div>
		<jsp:include page="public/footerBefore.jsp"></jsp:include>
		<jsp:include page="public/footer.jsp"></jsp:include>
		<jsp:include page="public/bottom.jsp"></jsp:include>

	</body>
</html>