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
			<div class="goverEnterprise ng-scope">

				<!-- 轮播图片 -->
				<div id="banner" ng-show="sliders.length>0" class="">
					<div class="bd" style="text-align: center">
						<ul>
							<li ng-repeat="slide in sliders">
								<img style="vertical-align: middle;" src="${ctx}/tempFiles/1489145804633.png">
							</li>
						</ul>
					</div>
				</div>

				<div class="wrapper clearfix">
					<div>
						<div class="gover_left fl">
							<div class="govr_search clearfix">

							</div>
							<div class="gover_fair clearfix">
								<ul>
									<li class="fair-item fair_01">
										<span class="fair-container">
											<a class="fair-inner" href="http://www.baidu.com"
											   target="_blank"></a></span>
									</li>
									<li class="fair-item fair_02">
										<span class="fair-container">
                              				<a class="fair-inner" href="http://www.baidu.com" target="_blank"></a>
                          				</span>
									</li>
									<li class="fair-item fair_03">
										<span class="fair-container">
                                			<a class="fair-inner" href="http://www.baidu.com" target="_blank"></a>
                          				</span>
									</li>
									<li class="fair-item fair_04">
										<span class="fair-container">
                                			<a class="fair-inner" href="http://www.baidu.com" target="_blank"></a>
                          				</span>
									</li>
									<li class="fair-item fair_05">
										<span class="fair-container">
                                			<a class="fair-inner" href="http://www.baidu.com" target="_blank"></a>
                          				</span>
									</li>
									<li class="fair-item fair_06">
										<span class="fair-container">
                                			<a class="fair-inner" href="http://www.baidu.com" target="_blank"></a>
                          				</span>
									</li>
								</ul>
							</div>
						</div>

					</div>
					<!-- end ngRepeat: m in modules -->
					<div>
						<div class="gover_right fr ng-scope">
							<div class="gover_right_notify">
								<div class="gover_notify_tit">通知公告</div>
								<ul id="noticeul">

									<li>
										<p>习近平到新疆代表团参加审议</p>
										<div class="li_det">
											<span>2017-02-09 20:38:21</span>
											<a href="https://www.baidu.com/" target="_blank">查看详情</a>
										</div>
									</li>
									<li>
										<p>论IT的未来发展</p>
										<div class="li_det">
											<span>2017-02-09 20:38:21</span>
											<a href="https://www.baidu.com/" target="_blank">查看详情</a>
										</div>
									</li>
									<li>
										<p>70年产权续期问题</p>
										<div class="li_det">
											<span>2017-02-09 20:38:21</span>
											<a href="https://www.baidu.com/" target="_blank">查看详情</a>
										</div>
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