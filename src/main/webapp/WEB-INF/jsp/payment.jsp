<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<jsp:include page="/taglib.jsp"></jsp:include>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<link rel="stylesheet" href="${ctx}/css/bootstrap.min.3.3.5.css" />
		<script type="text/javascript" src="${ctx}/js/jquery-3.0.0.js"></script>
		<script type="text/javascript" src="${ctx}/js/bootstrap-3.3.4.js"></script>
		<style>
			.body {
				position: absolute;
			}
			
			.pay_list {
				height: 300px;
			}
			
			li {
				border: 1px solid #ccc;
				width: 240px;
				height: 100px;
				line-height: 30px;
				text-align: left;
				padding: 17px 0 0 88px;
				margin: 30px 20px 0 0;
				box-sizing: border-box;
				position: relative;
				float: left;
				list-style: none;
			}
			
			li:hover {
				cursor: pointer;
			}
			
			h1,
			h3 {
				display: inline
			}
			
			.centerClass {
				text-align: center;
				height: 100px;
			}
			
			.active {
				border: 2px solid #337ab7;
				color: #337ab7;
			}
			
			body {
				text-align: center;
				margin: 15%;
				background-image: url(${ctx}/img/ZFB.jpg);
				background-size: cover;
			}
		</style>

	</head>

	<body>
		<div class="main">
			<div class="centerClass">
				<p>
					<h1>订单流水：</h1>
					<h3>20141213141516</h3></p>
				<p>
					<h1>支付金额：</h1>
					<h3>100 ￥</h3></p>
			</div>
			<div class="pay_list">
				<ul>
					<li class="pro_item">
						<div class="pro_name">支付宝</div>
						<div class="pro_type">即时到帐</div>
					</li>
					<li class="pro_item">
						<div class="pro_name">微信支付</div>
						<div class="pro_type">APP支付</div>
					</li>
					<li class="pro_item">
						<div class="pro_name">银联支付</div>
						<div class="pro_type">网银支付</div>
					</li>
					<li class="pro_item">
						<div class="pro_name">百度钱包</div>
						<div class="pro_type">APP支付</div>
					</li>
					<li class="pro_item">
						<div class="pro_name">快钱</div>
						<div class="pro_type">网银支付</div>
					</li>
				</ul>
			</div>

			<div class="centerClass">
				<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">支付按钮</button>
			</div>
		</div>

		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">是否确认支付</h4>
					</div>
					<div class="modal-body centerClass">
						<button type="button" class="btn-lg btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn-lg btn-primary" data-dismiss="modal">提交更改</button>
					</div>
				</div>
			</div>
		</div>

		<script>
			$(function() {
				$("li[class^='pro_item']").click(function() {
					$(this).siblings().removeClass("active");
					$(this).addClass("active");
				});
			});
		</script>
	</body>

</html>