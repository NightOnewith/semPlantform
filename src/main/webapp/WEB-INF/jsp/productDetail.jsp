<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%--<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>

	<head>
		<jsp:include page="public/head.jsp"></jsp:include>

		<style>
			#div_template1 div{
				height: 35px;
			}
			.liClass{
				float: left;
				margin: 0 2px 0 5px;
				display: block;
				padding: 3px 10px 3px 10px;
				border: 1px solid #999999;
			}
			.liSelected{
				border: 3px solid #f97802;
				color:  #f97802;

			}
			.liSelected {
				border: 3px solid #f97802;
				color: #f97802;
			}
		</style>
	</head>

	<body class="index">
		<jsp:include page="public/menu.jsp"></jsp:include>
		<div id="page-container">
			<div class="prodDetail">
				<div class="wrapper margin-wrapper">
					<div class="mainCon clearfix fouthlevel" style="width:1170px;margin: 0 auto;">
						<div class="productPhoto fl">
							<img  id="picsUrlId" src="${ctx}/tempFiles/1496210830044.jpg">
						</div>
						<div class="productInfo fl">
							<div class="productName item clearfix">
								<span class="" id="productNameId">小米手机</span>
							</div>
							<div class="productIntro item clearfix">
								<span class="itemName">产品介绍：</span>
								<span class="fl productIntro" id="productIntroId">性价比之王</span>
							</div>
							<div class="productTag item clearfix">
								<span class="itemName">库存：</span><span class="storage-number" id="prodStockNumId">100</span>
							</div>
							<div class="productPrice item clearfix">
								<span class="itemName">资费：</span>
								<span class="highlight orange" style="font-size: 18px">￥ </span>
								<span class="highlight orange" style="font-size: 18px" id="priceId">0.00</span>
							</div>

							<div id="div_template1">
								<div class="productPrice item clearfix">
									<span class="itemName">颜色：</span>
									<ul>
										<li class="liClass">黑色</li>
										<li class="liClass">白色</li>
										<li class="liClass">草木绿</li>
									</ul>
								</div>
								<div class="productPrice item clearfix">
									<span class="itemName">内存：</span>
									<ul>
										<li class="liClass">2G内存</li>
										<li class="liClass">4G内存</li>
										<li class="liClass">8G内存</li>
									</ul>
								</div>
								<div class="productPrice item clearfix">
									<span class="itemName">存储：</span>
									<ul>
										<li class="liClass">32G存储</li>
										<li class="liClass">64G存储</li>
										<li class="liClass">128G存储</li>
										<li class="liClass">256G存储</li>
									</ul>
								</div>
							</div>

							<div class="productType item clearfix">
								<span class="itemName">购买数量：</span>
								<div class="count-control">
									<a href="javascript:;" class="reduce-count"></a>
									<input class="count-input-filed" value="0">
									<a href="javascript:;" class="add-count"></a>
								</div>
								<span >个</span>
							</div>

							<div class="operateBtns">
								<%--订单表单提交--%>
								<form action="" id="buyForm" class="ng-pristine ng-valid">
									<input type="hidden" name="prodId" id="prodIdIputId">
									<input type="hidden" name="saleCombiAttr" id="saleCombiAttrIputId">
									<input type="hidden" name="quantity" id="quantityIputId">
								</form>
								<div class="buyNow btn fl" id="buyNowId">立即购买</div>
								<div class="addCart btn fl" id="createCarId">加入购物车</div>
							</div>
						</div>

						<div class="slideTxtBox clear">
							<div>
								<p>
									<br>
									<span style="font-family:'Microsoft YaHei';font-size:18px;"><strong>产品介绍：</strong></span>
								</p>
								<p>
									<br>
								</p>
								<p class="MsoNormal" id="detailInfoId">

								</p>
								<p class="MsoNormal">
									<span></span>
								</p>
								<br>
								<img src="${ctx}/tempFiles/1489559198459.jpg"><br>
								<p>
									<br>
								</p>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>

		<jsp:include page="public/footerBefore.jsp"></jsp:include>
		<jsp:include page="public/footer.jsp"></jsp:include>
		<jsp:include page="public/bottom.jsp"></jsp:include>

		<script>
			$(function(){
				/*购买的数量*/
				$("a[class='reduce-count']").click(function(){
					var  num=$("input[class='count-input-filed']").val();
					if(num <= 0){
						return;
					}
					$("input[class='count-input-filed']").val(parseInt(num)-1);
					$("#quantityIputId").val(parseInt(num)-1);

				});
				$("a[class='add-count']").click(function(){
					var num=$("input[class='count-input-filed']").val();
					if(num >= parseInt($("#prodStockNumId").text())){
						alert("购买已经超出库存");
						return;
					}
					$("input[class='count-input-filed']").val(parseInt(num)+1);
					$("#quantityIputId").val(parseInt(num)+1);
				});

				$("input[class='count-input-filed']").blur(function(){
					var num=$("input[class='count-input-filed']").val();
					if(num < 0){
						alert("购买数量不能为负");
						return;
					}
					if(num > parseInt($("#prodStockNumId").text())){
						alert("购买已经超出库存");
						return;
					}
				});
			});
		</script>

		<script>
			$(function(){
				var productSaleAttrArray=new Array;
				$.ajax({
					type: "get",
					url: "${ctx}/DetailDtos/getProdAllAttrDtos",
					async:false,
					success: function(data) {
						console.log(data.object[0]);
						$("#picsUrlId").attr("src",data.object[0].picsUrl);
						$("#productNameId").text(data.object[0].productName);
						$("#productIntroId").text(data.object[0].description);
						$("#detailInfoId").text(data.object[0].detailInfo);
						$("#prodIdIputId").val(data.object[0].productId);
						$.each(data.object[0].prodSaleElementDtos,function(index,ele){
							console.log(ele);
							var $div = $("<div>",{
								class:"productPrice item clearfix"
							});
							var $span = $("<span>",{
								class:"itemName",
								text:ele.elementName+"："
							});
							var $ul = $("<ul>");

							$.each(ele.productElementAttrs,function(i,e){
								var $li = $("<li>",{
									class:"liClass",
									text: e.attrName
								});
								$ul.append($li);
							});
							$div.append($span).append($ul);
							$("#div_template1").append($div);
						});

						$.each(data.object[0].productSaleAttrs,function(i,e){
							var productSaleAttrJson={};
							productSaleAttrJson.saleCombiAttr= e.saleCombiAttr.split(",");
							productSaleAttrJson.prodStockNum= e.prodStockNum;
							productSaleAttrJson.price= e.price;
							productSaleAttrJson.prodSaleAttrId= e.prodSaleAttrId;
							productSaleAttrArray.push(productSaleAttrJson);
						});
					},
					error: function() {
						alert("请求失败!");
					},
				});

			});
		</script>

		<script>
			$(function(){
				$("li[class^='liClass']").click(function() {
					$(this).addClass("liSelected");
					$(this).siblings().removeClass("liSelected");
					var arrtString = [];
					$("li[class='liClass liSelected']").each(function(i, e) {
						arrtString.push($(this).text());
					});
					console.log(arrtString);
					var saleAttrNameArray = [];
					$.each(productSaleAttrArray, function(i, e) {
						saleAttrNameArray.push(e.saleCombiAttr.sort().toString())
					});
					if($.inArray(arrtString.sort().toString(), saleAttrNameArray) != -1) {
						$.each(productSaleAttrArray, function(i, e) {
							if(e.saleCombiAttr.sort().toString() == arrtString.sort().toString()) {
								$("#prodStockNumId").text(e.prodStockNum);
								$("#priceId").text(e.price.toFixed(2));
								$("#saleCombiAttrIputId").val(e.prodSaleAttrId);
								$("#buyNowId").attr("onclick","buyNow()");
								$("#createCarId").attr("onclick","createCar()")
								$("#buyNowId").attr("disabled",false);
								$("#createCarId").attr("disabled",false);
								$("#buyNowId").removeClass("btnGreyClass");
								$("#createCarId").removeClass("btnGreyClass");
							}
						});
					} else {
						$("#prodStockNumId").text(0);
						$("#priceId").text(0.00);
						$("#buyNowId").removeAttr("onclick");
						$("#buyNowId").attr("disabled",true);
						$("#buyNowId").addClass("btnGreyClass");
						$("#createCarId").removeAttr("onclick");
						$("#createCarId").attr("disabled",true);
						$("#createCarId").addClass("btnGreyClass");
					}
				});

			});

		</script>

		<script>
			$(function(){
				$("#buyNowId").click(function(){
					location.href="${ctx}/index/toPayment"
				});
			});
		</script>

	</body>

</html>