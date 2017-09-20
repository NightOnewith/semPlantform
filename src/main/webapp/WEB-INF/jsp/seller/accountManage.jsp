<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

	<head>
		<jsp:include page="../public/sellerHead.jsp"></jsp:include>
	</head>

	<body>
		<div class="main">

			<jsp:include page="../public/sellerTopMenu.jsp"></jsp:include>

			<div class="perscenter-ui">
				<!-- ngIf: withMenu -->
				<div class="main-layout ng-scope" ng-if="withMenu">
					<div class="wrapper">
						<div class="content-layout">

							<!-- ngIf: userType == 'seller' -->
							<jsp:include page="../public/sellerLeftMenu.jsp"></jsp:include>
							<!-- end ngIf: userType == 'seller' -->

							<!-- ngIf: userType == 'buyer' -->
							<!-- ngView:  -->
							<div ng-view="" class="ng-scope">
								<div class="person-details ng-scope">
									<div class="require-details dingdan-details">
										<div class="text-slide">
											<div class="hd">
												<ul>
													<li class="on"><span>账号管理</span></li>

												</ul>
											</div>
											<div class="bd">
												<div class="register-layout">

														<ul class="reg">
															<li>
																<label class="fl"><span>*</span>头像:</label>
																<div class="avatar-ui fl">
																	<form id="formPhotos" action="${ctx}/updateSellerAccount/uploadFile" method="post" enctype="multipart/form-data">
																		<%-- <img id="imgSrc" alt="" ng-show="headPicUrl != '' &amp;&amp; headPicUrl != null" class="headPicUrl" src="${returnpath}">--%>
																		<img src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=9579eaa6fd36afc3110c38658319eb85/a1ec08fa513d2697cfd8af3b5ffbb2fb4316d849.jpg" name="photoUrl" id="photoUrl"/>
																		<div class="btn-two">
                                                                        <span class="btn btn-success fileinput-button">
                                                                         <i class="glyphicon glyphicon-plus"></i>
                                                                         <span>上传头像</span>
                                                                        <input id="userPhoto" type="file" name="uploadFile"  onchange="setImg()">
                                                                        </span>
																			<div class="filesList-ui"></div>
																			<div class="info-sm">仅支持JPG,GIF,PNG图片文件,且文件小于5M</div>
																		</div>
																	</form>
																</div>
															</li>

															<li>
																<form id="updateSellerAccount" class="ng-pristine ng-valid" method="post" action="${ctx}/updateSellerAccount/updatePassword">
																<ul class="modify_show on">
																	<li>
																		<label><span>*</span>旧密码:</label>
																		<div class="rits-ui short_input">
																			<input type="password" name="oldPassword" id="oldPassword" placeholder="" class="ng-pristine ng-valid">
																			<span style="margin-left: 10px;color: #B9B5B5;">若不填写旧密码则视为不修改密码</span>
																		</div>
																	</li>
																	<li>
																		<label><span>*</span>新密码:</label>
																		<div class="rits-ui short_input">
																			<input type="password" name="newPassword" id="newPassword" placeholder="" class="ng-pristine ng-valid">
																			<span></span>
																		</div>
																	</li>
																	<li>
																		<label><span>*</span>再次输入新密码:</label>
																		<div class="rits-ui short_input">
																			<input type="password" name="twoNewPassword" id="twoNewPassword" placeholder="" class="ng-pristine ng-valid" ng-model="password2">
																			<span></span>
																		</div>
																	</li>
																</ul>
																	<li class="re-10 button-link">
																		<label>1</label>
																		<div class="rits-ui">
																			<button type="button" onclick="pwdJudge()">保存修改</button>
																		</div>
																	</li>
																</form>
															</li>


														</ul>

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
		<jsp:include page="../public/sellerBottom.jsp"></jsp:include>

	<script type="text/javascript">

		function setImg(){
			//alert();
			$("#formPhotos").submit();

		}

		 function pwdJudge(){

			 var sellerUserInfoDto={};
			 sellerUserInfoDto.password=$("#oldPassword").val();
			 sellerUserInfoDto.userId=$("#userId").val();




			 $.ajax({ url: "${ctx}/updateSellerAccount/passwordJudge",
				      data:sellerUserInfoDto,
				      success: function(result){

						  if(result.resultCode=='1'){
                          $("#updateSellerAccount").submit();
						  }else if(result.resultCode=='2'){
                           alert("用户名原密码错误");
						  }else{
							  alert("输入有误");
						  }
					  }
			 });
		 }
	</script>
	</body>
</html>