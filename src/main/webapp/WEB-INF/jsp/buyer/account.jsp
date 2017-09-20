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
											<li class="on"><span>用户管理</span></li>

										</ul>
									</div>
									<div class="bd">
										<div class="register-layout">
											<form id="lxirenxinx" class="ng-pristine ng-valid" action="${ctx}/buyer/updateBuyer" method="post">
												<ul class="reg">

													<li>
														<label><span>*</span>用户名:</label>
														<div class="rits-ui short_input">
															<%--<span ng-bind="myInfo.sysUserName" class="ng-binding">${userDto.userName}</span>--%>
															<input type="text" name="userName" placeholder="" value="${sessionScope.useInfo.userName}" readonly class="ng-pristine ng-valid" >
														</div>
													</li>
													<li>
														<label><span>*</span>用户账户:</label>
														<div class="rits-ui short_input">
															<input type="text" name="userAccount" placeholder="" value="${sessionScope.useInfo.userAccount}" readonly class="ng-pristine ng-valid" >
															<input type="hidden" name="salt" placeholder="" value="${sessionScope.useInfo.salt}" class="ng-pristine ng-valid"  >
															<input type="hidden" name="status" placeholder="" value="${sessionScope.useInfo.status}" class="ng-pristine ng-valid" >
															<span></span>
														</div>
													</li>
													<%--<li>
														&lt;%&ndash;<label><span>*</span>用户类型:</label>&ndash;%&gt;
														<div class="rits-ui short_input">
															&lt;%&ndash;<input type="text" name="userType" placeholder="" value="${sessionScope.useInfo.userType}" class="ng-pristine ng-valid" >&ndash;%&gt;

															<span></span>
														</div>
													</li>--%>

													<li>

														<ul >
															<li>
																<label><span>*</span>旧密码:</label>
																<div class="rits-ui short_input">
																	<input type="hidden" name="userId" value="${sessionScope.useInfo.userId}">
																	<input type="password" name="passwordOld" placeholder="" value="${sessionScope.useInfo.password}" readonly class="ng-pristine ng-valid" >
																	<span></span>
																</div>
															</li>
															<li>
																<label><span>*</span>新密码:</label>
																<div class="rits-ui short_input">
																	<input type="password" name="password" placeholder="" class="ng-pristine ng-valid" >
																	<span></span>
																</div>
															</li>
															<li>
																<label><span>*</span>再次输入新密码:</label>
																<div class="rits-ui short_input">
																	<input type="password" name="password2" placeholder="" class="ng-pristine ng-valid" >
																	<span></span>
																</div>
															</li>
														</ul>
													</li>
													<li class="re-10 button-link">
														<label>1</label>
														<div class="rits-ui">
															<button onclick="saveChanges()">保存修改</button>
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

</body>

</html>