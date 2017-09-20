<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
	<jsp:include page="public/head.jsp"></jsp:include>
</head>

<body class="index">

<jsp:include page="public/menu.jsp"></jsp:include>

<div>
	<div class="solution-container">
		<div id="banner">
			<div class="bd">
				<ul>
					<li>
						<img style="vertical-align: middle; width: 100%;" src="${ctx}/tempFiles/1489055567871.png">
					</li>
				</ul>
			</div>
			<div class="hd ng-hide">
				<ul class="clearfix" style="background: none">
					<li class="on">1</li>
				</ul>
			</div>
		</div>
		<div class="solution-container-center">
			<div>
				<div class="solution-part hot-solution clearfix">
					<div class="title-area">热门解决方案</div>
					<div class="icons-area">
						<ul id="hotsolutionul" class="ico-items">

							<li class="ico-item-each fl">
								<a class="link-item" target="_blank" href="https://www.baidu.com/">
									<em class="ico ico-first">
										<img src="${ctx}/tempFiles/1489238338059.png">
									</em>
									<em class="ico ico-second">
										<img src="${ctx}/tempFiles/1489238342725.png">
									</em>
									<h3 class="item-title">政企服务</h3>
									<p class="item-description ng-binding"></p>
								</a>
							</li>
							<li class="ico-item-each fl">
								<a class="link-item" target="_blank" href="https://www.baidu.com/">
									<em class="ico ico-first">
										<img src="${ctx}/tempFiles/1489238338059.png">
									</em>
									<em class="ico ico-second">
										<img src="${ctx}/tempFiles/1489238342725.png">
									</em>
									<h3 class="item-title">政企服务</h3>
									<p class="item-description"></p>
								</a>
							</li>


						</ul>
					</div>
				</div>
			</div>
			<div>
				<div class="solution-part custom-case clearfix">
					<div class="title-area ng-binding">客户案例</div>
					<div class="icons-area">
						<ul id="custul" class="custom-case-icons">

							<li class="ico-each fl">
								<a href="https://www.baidu.com/" target="_blank">
									<div>
										<img class="case-logo" src="${ctx}/tempFiles/1489238986732.jpg">
									</div>
								</a>
							</li>
							<li class="ico-each fl">
								<a href="https://www.baidu.com/" target="_blank">
									<div>
										<img class="case-logo" src="${ctx}/tempFiles/1489238986732.jpg">
									</div>
								</a>
							</li>

						</ul>
					</div>
				</div>
			</div>

			<div>
				<div class="solution-part pataner clearfix">
					<div class="title-area">合作伙伴</div>
					<div class="icons-area">
						<ul id="patanerul" class="custom-case-icons">
							<li class="ico-each fl">
								<a href="https://www.baidu.com/" target="_blank">
									<divs>
										<img class="case-logo" src="${ctx}/tempFiles/1489239426452.jpg">
									</divs>
								</a>
							</li>
							<li class="ico-each fl">
								<a href="https://www.baidu.com/" target="_blank">
									<div>
										<img class="case-logo" src="${ctx}/tempFiles/1489239426452.jpg">
									</div>
								</a>
							</li>
						</ul>
					</div>
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