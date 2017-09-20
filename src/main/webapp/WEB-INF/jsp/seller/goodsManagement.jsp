<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
				<div class="main-layout" ng-if="withMenu">
					<div class="wrapper">
						<div class="content-layout">
							<jsp:include page="../public/sellerLeftMenu.jsp"></jsp:include>

							<div>
								<div class="bg_color percent-seller percent-seller-goods">
									<div class="goods-status">
										<ul class="status-btn">
											<li class="fl status-btn-each on">
												<a href="#/goodsManagement/allGoods">全部商品</a>
											</li>
											<li class="fl status-btn-each">
												<a href="#/goodsManagement/unCommittedGoods">待上架商品</a>
											</li>
											<li class="fl status-btn-each">
												<a href="#/goodsManagement/committedGoods">已上架商品</a>
											</li>
											<li class="fl status-btn-each">
												<a href="#/goodsManagement/noCommittedGoods">已下架商品</a>
											</li>
											<li class="fl status-btn-each">
												<a href="#/goodsManagement/refuseGoods">审批未通过商品</a>
											</li>
											<li class="fl status-btn-each">
												<a href="#/goodsManagement/deletedGoods">已删除商品</a>
											</li>
										</ul>
									</div>
									<div class="top-filter">
										<div class="filter-row">
											<label class="filter-item">商品名称：<input class="filter-input-filed " type="text"></label>
										</div>
										<div class="filter-row">
											<label class="filter-item">商品价格：<input class="filter-input-filed filter-input-filed-small" type="text">
												<span class="split-line"></span><input class="filter-input-filed filter-input-filed-small" type="text">
            								</label>
											<label class="filter-item">总销量：<input class="filter-input-filed filter-input-filed-small" type="text">
												<span class="split-line"></span>
                								<input class="filter-input-filed filter-input-filed-small"  type="text">
            								</label>
										</div>
										<div class="filter-btn">
											<a href="javascript:;" class="search-goods">搜索商品</a>
											<a href="javascript:;" class="clear-condition">清空条件</a>
										</div>
										<div class="goods-table">
											<table>
												<thead class="table-head">
													<tr class="goods-description">
														<td style="text-align: left;text-indent: 150px;">
															商品
														</td>
													</tr>
													<tr class="goods-price">
														<td>
															价格
														</td>
													</tr>
													<tr class="goods-store">
														<td>
															库存
															<i class="ico up"></i>
														</td>
													</tr>
													<tr class="goods-sale-count">
														<td>
															总销量
															<i class="ico"></i>
														</td>
													</tr>
													<tr class="goods-publish-time">
														<td>
															发布时间
															<i class="ico"></i>
														</td>
													</tr>
													<tr class="goods-operate">
														<td>
															操作
														</td>
													</tr>
												</thead>
											</table>
											<div class="goods-list-container">
												<table class="goods-list">
													<tbody>

														<tr class="goods-info-row">
															<td class="goods-info-detail">
																<div>
																	<div class="select-ico">
																	</div>
																	<div class="preview-pic">
																		<img  width="108" height="108" style="border: 1px solid #ddd;" src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=9579eaa6fd36afc3110c38658319eb85/a1ec08fa513d2697cfd8af3b5ffbb2fb4316d849.jpg">
																	</div>
																	<div class="goods-name">
																		<h2>采购管理系统</h2>
																		<h3 style="color: #777;">科学管理</h3>
																		<p >实现对企业采购活动执行过程的科学管理。</p>
																	</div>
																</div>
															</td>
															<td class="goods-price-detail"><fmt:formatNumber value="10" type="CURRENCY"></fmt:formatNumber></td>
															<td class="goods-store-detail">
																<div class="edit-store">
																	<p>999</p>
																</div>
															</td>
															<td class="goods-sale-detail">
																<p class="none" >9</p>
															</td>
															<td class="goods-publish-time-detail" >2010-10-20</td>
															<td class="goods-edit-detail">
																<div class="edit-btns">
																	<a href="#" class="delete-good" >下架</a>
																	<a class="delete-good" href="#">复制</a>
																</div>
															</td>
														</tr>
														<tr class="goods-info-row">
															<td class="goods-info-detail">
																<div>
																	<div class="select-ico">
																	</div>
																	<div class="preview-pic">
																		<img  width="108" height="108" style="border: 1px solid #ddd;" src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=9579eaa6fd36afc3110c38658319eb85/a1ec08fa513d2697cfd8af3b5ffbb2fb4316d849.jpg">
																	</div>
																	<div class="goods-name">
																		<h2>小米手机p9</h2>
																		<h3 style="color: #777;">红色，16g</h3>
																		<p >爆款手机</p>
																	</div>
																</div>
															</td>
															<td class="goods-price-detail"><fmt:formatNumber value="999" type="CURRENCY"></fmt:formatNumber></td>
															<td class="goods-store-detail">
																<div class="edit-store">
																	<p>500</p>
																</div>
															</td>
															<td class="goods-sale-detail">
																<p class="none" >10</p>
															</td>
															<td class="goods-publish-time-detail" >2008-10-12</td>
															<td class="goods-edit-detail">
																<div class="edit-btns">
																	<a href="#" class="delete-good" >下架</a>
																	<a class="delete-good" href="#">复制</a>
																</div>
															</td>
														</tr>
														<tr class="goods-info-row">
															<td class="goods-info-detail">
																<div>
																	<div class="select-ico">
																	</div>
																	<div class="preview-pic">
																		<img  width="108" height="108" style="border: 1px solid #ddd;" src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=9579eaa6fd36afc3110c38658319eb85/a1ec08fa513d2697cfd8af3b5ffbb2fb4316d849.jpg">
																	</div>
																	<div class="goods-name">
																		<h2>苹果9</h2>
																		<h3 style="color: #777;">黑色,256g</h3>
																		<p >爆款手机，样式不错</p>
																	</div>
																</div>
															</td>
															<td class="goods-price-detail"><fmt:formatNumber value="20" type="CURRENCY"></fmt:formatNumber></td>
															<td class="goods-store-detail">
																<div class="edit-store">
																	<p>999</p>
																</div>
															</td>
															<td class="goods-sale-detail">
																<p class="none" >10</p>
															</td>
															<td class="goods-publish-time-detail" >2017-01-01</td>
															<td class="goods-edit-detail">
																<div class="edit-btns">
																	<a href="#" class="delete-good" >下架</a>
																	<a class="delete-good" href="#">复制</a>
																</div>
															</td>
														</tr>
														<tr class="goods-info-row">
															<td class="goods-info-detail">
																<div>
																	<div class="select-ico">
																	</div>
																	<div class="preview-pic">
																		<img  width="108" height="108" style="border: 1px solid #ddd;" src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=9579eaa6fd36afc3110c38658319eb85/a1ec08fa513d2697cfd8af3b5ffbb2fb4316d849.jpg">
																	</div>
																	<div class="goods-name">
																		<h2>dell游侠</h2>
																		<h3 style="color: #777;">黑，500g</h3>
																		<p >是一款不错的游戏本</p>
																	</div>
																</div>
															</td>
															<td class="goods-price-detail"><fmt:formatNumber value="20" type="CURRENCY"></fmt:formatNumber></td>
															<td class="goods-store-detail">
																<div class="edit-store">
																	<p>200</p>
																</div>
															</td>
															<td class="goods-sale-detail">
																<p class="none" >20</p>
															</td>
															<td class="goods-publish-time-detail" >2010-05-20</td>
															<td class="goods-edit-detail">
																<div class="edit-btns">
																	<a href="#" class="delete-good" >下架</a>
																	<a class="delete-good" href="#">复制</a>
																</div>
															</td>
														</tr>

													</tbody>
												</table>
											</div>

											<%--分页样式--%>
											<div class="pagination-layout">
												<div class="pagination">
													<ul class="pagination" total-items="pageInfo.totalRows" max-size="10" boundary-links="true">
														<li>
															<a href="">最前</a>
														</li>
														<li class="disabled">
															<a href="">前一页</a>
														</li>
														<li   class="active">
															<a href="">1</a>
														</li>
														<li >
															<a href="">2</a>
														</li>
														<li>
															<a href="">下一页</a>
														</li>
														<li  >
															<a href="">最后</a>
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
			</div>
		</div>

		<jsp:include page="../public/footer.jsp"></jsp:include>
		<jsp:include page="../public/sellerBottom.jsp"></jsp:include>

	</body>
</html>