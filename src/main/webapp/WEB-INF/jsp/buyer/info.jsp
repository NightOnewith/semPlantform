<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
	<jsp:include page="../public/buyerHead.jsp"></jsp:include>
</head>

<body>
<div class="main">

	<jsp:include page="../public/buyerTopMenu.jsp"></jsp:include>

	<div class="perscenter-ui">
		<!-- ngIf: withMenu -->
		<div class="main-layout ng-scope" ng-if="withMenu">
			<div class="wrapper">
				<div class="content-layout">

					<!-- ngIf: userType == 'buyer' -->
					<jsp:include page="../public/buyerLeftMenu.jsp"></jsp:include>
					<!-- end ngIf: userType == 'buyer' -->

					<!-- ngView:  -->
					<div ng-view="" class="ng-scope">
						<div class="person-details myapppersonal ng-scope">
							<div class="require-details dingdan-details">
								<div class="text-slide">
									<div class="hd">
										<ul>
											<li class="on"><span>信息管理</span></li>

										</ul>
									</div>
									<div class="bd">
										<div class="register-layout">
											<form id="formPhotos" >
												<ul class="reg">
													<li>
														<label class="fl"><span>*</span>头像:</label>

														<div class="avatar-ui fl">
															<img src="${sessionScope.customerInfo.photoUrl}" id="infoImg"/>
															<div class="btn-two">
                                                                        <span class="btn btn-success fileinput-button">
                                                                         <i class="glyphicon glyphicon-plus"></i>
                                                                         <span>上传头像</span>
																			<input type="file"  name="uploadFile" id="userPhoto" onchange="setImg(this)">
                                                                        </span>
																<div class="filesList-ui"></div>
																<div class="info-sm">仅支持JPG,GIF,PNG图片文件,且文件小于5M</div>
															</div>

														</div>
													</li>
												</ul>
											</form>

											<form id="qiyexinx" class="ng-pristine ng-valid" action="${ctx}/customer/customerUpdate" method="post" onsubmit="return validate()"  >
												<input type="hidden" value="${sessionScope.customerInfo.photoUrl}" name="photoUrl" id="photoUrl"/>
												<ul class="reg">
													<li class="">
														<label><span>*</span>姓名:</label>
														<div class="rits-ui">
															<input type="hidden" name="customerId" value="${sessionScope.customerInfo.customerId}"/>
															<input type="text" class="address ng-pristine ng-valid" name="name" value="${sessionScope.customerInfo.name}" >
														</div>
													</li>

													<li>
														<label><span>*</span>性别:</label>
														<div class="rits-ui">
															<div class="btn-group">
																<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																	<c:if test='${sessionScope.customerInfo.sex=="0"}'>
																		<input class="xz-content ng-pristine ng-valid"  id="sex" value="男"  readonly="" > <span class="caret"></span>
																	</c:if>
																	<c:if test='${sessionScope.customerInfo.sex=="1"}'>
																		<input class="xz-content ng-pristine ng-valid"  id="sex" value="女"  readonly="" > <span class="caret"></span>
																	</c:if>
																	<input type="hidden" name="sex" id="sexHidden" value="${sessionScope.customerInfo.sex}"/>
																</button>
																<ul class="dropdown-menu">
																	<li data-id="0">
																		<a  onclick="chooseSex('0')" >男</a>
																	</li>
																	<li data-id="1">
																		<a   onclick="chooseSex('1')">女</a>
																	</li>
																</ul>
															</div>
														</div>
													</li>
													<li class="">
														<label><span>*</span>手机号码:</label>
														<div class="rits-ui">
															<%--<font ng-bind="info.sysUserName" class="ng-binding">${customer.phone}</font>--%>
															<input type="text" class="address ng-pristine ng-valid" name="phone" id="phone" value="${sessionScope.customerInfo.phone}" >
														</div>
													</li>
													<li class="">
														<label><span>*</span>地址:</label>
														<div class="rits-ui">
															<%--<font ng-bind="info.sysUserName" class="ng-binding">${customer.address}</font>--%>
															<input type="text" class="address ng-pristine ng-valid" name="address" value="${sessionScope.customerInfo.address}"  >
														</div>
													</li>

													<li class="re-10 button-link">
														<label>1</label>
														<div class="rits-ui">
															<input type="submit" ></input>
														</div>
													</li>
												</ul>
											</form>
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
<jsp:include page="../public/buyerBottom.jsp"></jsp:include>
<script>
	//图片预览
	function setImg(obj){
		var formData = new FormData($("#formPhotos")[0]);
		$.ajax({
			url: '${ctx}/sellerUploadGoods/uploadFile',
			type: 'POST',
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function(data) {
				if(data.resultCode == 0){
					alert("文件上传失败");
				}else{
					$("#infoImg").attr('src',data.object);
					$("#photoUrl").val(data.object);
				}
			},
			error: function() {
				alert("请求失败！");
			}
		});
	}

	function chooseSex(sexValue){
		if(sexValue=='0'){
			$("#sex").val('男');
			document.getElementById("sexHidden").value=sexValue;
		}else if(sexValue=='1'){
			$("#sex").val('女');
			document.getElementById("sexHidden").value=sexValue;

		}

	}
	function validate(){
		var isMobile=/^1[3|4|5|8][0-9]\d{4,8}$/;
		if (!isMobile.test($("#phone").val())) {
			alert("请输入正确的电话号码");
			return false;
		}
		return true;
	}
</script>

</body>

</html>