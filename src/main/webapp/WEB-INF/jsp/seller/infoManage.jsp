<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
													<li class="on"><span>信息管理</span></li>
												</ul>
											</div>
											<div class="bd">
												<div class="register-layout">
													<form id="qiyexinx" class="ng-pristine ng-valid" action="${ctx}/SellerInformation/updateSellerInformation" method="post" onsubmit="return toVaild()" >
														<ul class="reg">
															<li class="re-address">
																<label>公司网址:</label>
																<div class="rits-ui">
																	<input type="text" ng-model="website" name="webUrl" class="ng-pristine ng-valid" value="www.baidu.com">
																</div>
															</li>

															<li class="re-address">
																<label><span>*</span>公司地址:</label>
																<div class="rits-ui">
																	<input type="text" class="address ng-pristine ng-valid" name="companyAddress" ng-model="address" placeholder="请填写详细地址" value="浙江杭州">
																</div>
															</li>

															<li class="re-7">
																<label><span>*</span>联系人:</label>
																<div class="rits-ui">

																	<input type="text" name="linkman" ng-model="linkman" placeholder="请输入联系人姓名" class="ng-pristine ng-valid" value="马云">
																</div>
															</li>

															<li class="">
																<label><span>*</span>联系电话:</label>
																<div class="rits-ui">
																	<input type="text" name="phone" ng-model="phoneNum" placeholder="请输入联系人手机号" id="phone" class="ng-pristine ng-valid" value="1388888888">
																</div>
															</li>
															<li class="">
																<label>E-mail:</label>
																<div class="rits-ui">
																	<input type="text" name="email" ng-model="mail" id="email" placeholder="请输入邮箱" class="ng-pristine ng-valid" value="6444351@qq.com">
																</div>
															</li>
															<li class="re-people">
																<label><span>*</span>公司员工人数:</label>

																<div class="rits-ui cl-6">

																	<div class="peopleNum fl">
                                            							<input type="text" class="ng-pristine ng-valid"  name="employeeNum" id="employeeNum" value="500" data-id="0">
																	</div>

																	<div class="peopleNum fl">
																		<label class="fl"><span>*</span>研发人数:</label>
																		<input type="text" name="researchNum" ng-model="developerNumber" id="researchNum" class="ng-pristine ng-valid" value="200">
																	</div>
																	<div class="peopleNum fl">
																		<label class="fl"><span>*</span>销售人数:</label>
																		<input type="text" name="sellNum" ng-model="salerNumber" id="sellNum" class="ng-pristine ng-valid" value="100">
																	</div>

																</div>

															</li>

															<li class="">
																<label><span>*</span>产品所属行业:</label>
																<div class="rits-ui">
																	<div class="btn-group">

																		<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																			<%--<c:forEach items="${listSdd}" var="productsIndustryList">
																				<c:if test="${productsIndustryList.dId==companyInfo.dId}">
																					<input type="hidden" value="${companyInfo.dId}" id="hiddenProfession" name="profession"/>
																					<input class="xz-content ng-pristine ng-valid" id="industryNameValue"  readonly=""  value="${companyInfo.dValue}"> <span class="caret"></span>
																			</c:if>
																			</c:forEach>--%>
																			<input class="xz-content ng-pristine ng-valid" id="industryNameValue"  readonly=""  value="服装"> <span class="caret"></span>
																		</button>
																		<ul class="dropdown-menu">
																			<%--<c:forEach items="${listSdd}" var="productsIndustryList">--%>
																				<li ng-repeat="item in manageMap" data-id="2" ng-click="selectType(item.id)" class="ng-scope" >
																					<a href="javascript:;" ng-bind="item.title" class="ng-binding" id="${productsIndustryList.dId}" onclick="chooseIndusttry(this)">电器</a>
																				</li>
																				<li ng-repeat="item in manageMap" data-id="2" ng-click="selectType(item.id)" class="ng-scope" >
																					<a href="javascript:;" ng-bind="item.title" class="ng-binding" id="${productsIndustryList.dId}" onclick="chooseIndusttry(this)">家具</a>
																				</li>
																				<li ng-repeat="item in manageMap" data-id="2" ng-click="selectType(item.id)" class="ng-scope" >
																					<a href="javascript:;" ng-bind="item.title" class="ng-binding" id="${productsIndustryList.dId}" onclick="chooseIndusttry(this)">手机</a>
																				</li>
																				<li ng-repeat="item in manageMap" data-id="2" ng-click="selectType(item.id)" class="ng-scope" >
																					<a href="javascript:;" ng-bind="item.title" class="ng-binding" id="${productsIndustryList.dId}" onclick="chooseIndusttry(this)">玩具</a>
																				</li>
																			<%--</c:forEach>--%>

																		</ul>
																	</div>
																</div>
															</li>
															<li class="re-afterservice">
																<label><span>*</span>售后联系方式:</label>
																<div class="rits-ui">
																	<span>电话</span>
																	<input type="text" name="afterPhone" ng-model="servicePhone" id="afterPhone" class="ng-pristine ng-valid" value="0258945428">
																</div>
																<div class="rits-ui">
																	<span>邮箱</span>
																	<input type="text" name="mail" ng-model="serviceMail" id="mail" class="ng-pristine ng-valid" value="64435@qq.com">
																</div>
																<div class="rits-ui">
																	<span>微信</span>
																	<input type="text" name="weixin" ng-model="serviceWechat" class="ng-pristine ng-valid" value="weixin">
																</div>
																<div class="rits-ui">
																	<span>微博</span>
																	<input type="text" name="blog" ng-model="serviceMicroblog" class="ng-pristine ng-valid" value="weibo">
																</div>
															</li>
															<li class="re-10 button-link">
																<label>1</label>
																<div class="rits-ui">
																	<button type="submit" >保存修改</button>
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

			</div>

		</div>

		<jsp:include page="../public/footer.jsp"></jsp:include>
		<jsp:include page="../public/sellerBottom.jsp"></jsp:include>

	</body>
<script language="JavaScript">
	function chooseIndusttry(obj){
		var text=obj.innerHTML;
		$("#industryNameValue").val(text);
		$("#hiddenProfession").val(obj.id);
	}

	function toVaild(){
		var isMobile=/^1[3|4|5|8][0-9]\d{4,8}$/;
		if (!isMobile.test($("#phone").val())) {
			alert("请输入正确的电话号码");
			return false;
		}
		if (!isMobile.test($("#afterPhone").val())) {
			alert("请输入正确的电话号码");
			return false;
		}
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		if(!reg.test($("#mail").val())){
			alert("请输入合法的Email地址");//email
			return false;
		}
		if(!reg.test($("#email").val())){
			alert("请输入合法的Email地址");//email
			return false;
		}
		var regNum=/^(\+|-)?\d+$/;
		if(!regNum.test($("#employeeNum").val())){
			alert("公司员工数请输入数字");//email
			return false;
		}
		if(!regNum.test($("#researchNum").val())){
			alert("研发人数请输入数字");//email
			return false;
		}
		if(!regNum.test($("#sellNum").val())){
			alert("销售人数请输入数字");//email
			return false;
		}
		return true;
	}
</script>
</html>