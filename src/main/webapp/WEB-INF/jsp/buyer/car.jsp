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
        <div class="main-layout">
            <div class="wrapper">
                <div class="content-layout">

                    <jsp:include page="../public/buyerLeftMenu.jsp"></jsp:include>

                    <div>
                        <div class="order percent-car" style="margin-top:0;padding-top:10px;">
                            <div class="order_query clearfix" style="margin-top:0;margin-bottom: 48px;">
                                <ul class="clearfix fl" style="margin-left:15px;padding-bottom: 0;">
                                    <li>
                                        <label>商品名：</label>
                                        <input type="text">
                                    </li>
                                </ul>
                                <div class="btn clearfix fl">
                                    <a href="javascript:;" class="search_order" style="margin-top:14px;">搜索</a>
                                </div>
                            </div>

                            <div class="text-slide">
                                <div class="hd">
                                    <ul>
                                        <li class="on"><span>所有商品</span></li>
                                        <li><span>库存紧张</span></li>
                                    </ul>
                                    <div class="settle_top">
                                        <span>已选商品合计：<i>￥0</i></span>
                                        <a class="settle_btn">结算</a>
                                    </div>
                                </div>
                                <div class="bd">
                                    <ul>
                                        <li>
                                            <table cellspacing="0" cellpadding="0" class="tablesorter" id="tablesorter">
                                                <thead>
                                                <tr class="car-tr">
                                                    <th class="tbl-0">
                                                        <div class="carall fl">
                                                            <input type="checkbox" class="allcheck">
                                                            <span>全选</span>
                                                        </div>
                                                        <div style="text-align: left;text-indent: 74px;">商品信息</div>
                                                    </th>
                                                    <th class="tbl-1">
                                                        <div>数量</div>
                                                    </th>
                                                    <th class="tbl-2">
                                                        <div>产品介绍</div>
                                                    </th>
                                                    <th class="tbl-3">
                                                        <div>资费</div>
                                                    </th>
                                                    <th class="tbl-4">
                                                        <div>操作</div>
                                                    </th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                <tr>
                                                    <td colspan="5">
                                                        <table cellspacing="0" cellpadding="0" class="moyig-ui">
                                                            <tbody>
                                                            <tr class="content-tr car-tr">
                                                                <td class="tbl-0">
                                                                    <input type="checkbox" class="singlecheck fl">

                                                                    <div class="goods clearfix">
                                                                        <img class="fl"
                                                                             src="http://222.221.10.132/files/201612/1481612307780.png">

                                                                        <div class="goods_detail fl">
                                                                            <h3>
                                                                                <a href="/user-mgr/app/index.html#/detail/36">阳光采购</a>
                                                                            </h3>

                                                                            <p>采用标准化的采购流程、商品寻源模式、供应商管理办法、采购廉洁
                                                                                规范等手段，对企业询比价、竞价、招投标以及供应商选择等活动进行监
                                                                                控管理，帮助企业提高采购质量、缩短采购周期、加强采购管控，最终实 现降本增效
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="tbl-1">
                                                                    <div class="car_package">
                                                                        <span class="yxqtxt">10个</span>
                                                                    </div>
                                                                </td>
                                                                <td class="tbl-2">
                                                                    <p>采用标准化的采购流程、商品寻源模式、供应商管理办法、采购廉洁
                                                                        规范等手段，对企业询比价、竞价、招投标以及供应商选择等活动进行监
                                                                        控管理，帮助企业提高采购质量、缩短采购周期、加强采购管控，最终实 现降本增效
                                                                    </p>
                                                                </td>
                                                                <td class="tbl-3">
                                                                    <div>
                                                                        <p>
                                                                            <em>￥0.01</em>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td class="tbl-4">
                                                                    <div>
                                                                        <p>
                                                                            <a class="del">删除</a>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="5">
                                                        <table cellspacing="0" cellpadding="0" class="moyig-ui">
                                                            <tbody>
                                                            <tr class="content-tr car-tr">
                                                                <td class="tbl-0">
                                                                    <input type="checkbox" class="singlecheck fl">

                                                                    <div class="goods clearfix">
                                                                        <img class="fl"
                                                                             src="http://222.221.10.132/files/201612/1481612307780.png">

                                                                        <div class="goods_detail fl">
                                                                            <h3>
                                                                                <a href="/user-mgr/app/index.html#/detail/36">阳光采购</a>
                                                                            </h3>

                                                                            <p>采用标准化的采购流程、商品寻源模式、供应商管理办法、采购廉洁
                                                                                规范等手段，对企业询比价、竞价、招投标以及供应商选择等活动进行监
                                                                                控管理，帮助企业提高采购质量、缩短采购周期、加强采购管控，最终实 现降本增效
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="tbl-1">
                                                                    <div class="car_package">
                                                                        <span class="yxqtxt">10个</span>
                                                                    </div>
                                                                </td>
                                                                <td class="tbl-2">
                                                                    <p>采用标准化的采购流程、商品寻源模式、供应商管理办法、采购廉洁
                                                                        规范等手段，对企业询比价、竞价、招投标以及供应商选择等活动进行监
                                                                        控管理，帮助企业提高采购质量、缩短采购周期、加强采购管控，最终实 现降本增效
                                                                    </p>
                                                                </td>
                                                                <td class="tbl-3">
                                                                    <div>
                                                                        <p>
                                                                            <em>￥0.01</em>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td class="tbl-4">
                                                                    <div>
                                                                        <p>
                                                                            <a class="del">删除</a>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="5">
                                                        <table cellspacing="0" cellpadding="0" class="moyig-ui">
                                                            <tbody>
                                                            <tr class="content-tr car-tr">
                                                                <td class="tbl-0">
                                                                    <input type="checkbox" class="singlecheck fl">

                                                                    <div class="goods clearfix">
                                                                        <img class="fl"
                                                                             src="http://222.221.10.132/files/201612/1481612307780.png">

                                                                        <div class="goods_detail fl">
                                                                            <h3>
                                                                                <a href="/user-mgr/app/index.html#/detail/36">阳光采购</a>
                                                                            </h3>

                                                                            <p>采用标准化的采购流程、商品寻源模式、供应商管理办法、采购廉洁
                                                                                规范等手段，对企业询比价、竞价、招投标以及供应商选择等活动进行监
                                                                                控管理，帮助企业提高采购质量、缩短采购周期、加强采购管控，最终实 现降本增效
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="tbl-1">
                                                                    <div class="car_package">
                                                                        <span class="yxqtxt">10个</span>
                                                                    </div>
                                                                </td>
                                                                <td class="tbl-2">
                                                                    <p>采用标准化的采购流程、商品寻源模式、供应商管理办法、采购廉洁
                                                                        规范等手段，对企业询比价、竞价、招投标以及供应商选择等活动进行监
                                                                        控管理，帮助企业提高采购质量、缩短采购周期、加强采购管控，最终实 现降本增效
                                                                    </p>
                                                                </td>
                                                                <td class="tbl-3">
                                                                    <div>
                                                                        <p>
                                                                            <em>￥0.01</em>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td class="tbl-4">
                                                                    <div>
                                                                        <p>
                                                                            <a class="del">删除</a>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="car_pay" id="inner">
                                <ul>
                                    <li class="car_pay_li01">
                                        <div class="carall fl">
                                            <input type="checkbox" class="allcheck">
                                            <span>全选</span>
                                        </div>
                                    </li>
                                    <li class="car_pay_li02">
                                        删除
                                    </li>
                                    <li class="car_pay_li05">
                                        <a class="settle_btn">结算</a>
                                    </li>
                                    <li class="car_pay_li04">
                                        合计：<strong>0</strong>
                                    </li>
                                    <li class="car_pay_li03">
                                        已选商品<strong>0</strong>件
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
<jsp:include page="../public/footer.jsp"></jsp:include>
<jsp:include page="../public/buyerBottom.jsp"></jsp:include>

</body>

</html>