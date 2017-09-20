<%--
  Created by IntelliJ IDEA.
  User: sapling
  Date: 2017/6/3
  Time: 14:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="utf-8"/>
    <title>登录注册页面</title>
    <link href="${pageContext.request.contextPath}/assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/font-awesome.min.css"/>
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/ace.min.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/ace-rtl.min.css"/>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>

    <script type="text/javascript">
        $(function () {
            $("#registerMessage").html("<font color='green'>" + "${registerMessage}" + "</font>");
            $("#loginFailMessage").html("<font color='red'>" + "${loginFailMessage}" + "</font>");
            $("#oInfo").hide();
            $("#soInfo").hide();
            //卖家注册按钮事件
            $("#sellerBtn").click(function () {
                with ($("#sellerForm")[0]) {
                    var professionId = $("#pId option:selected").attr("id");
                    $("#profession").val(professionId);
                    method = "post";
                    action = "${pageContext.request.contextPath}/user/sellerRegister";
                    submit();
                }
            });
            //买家注册按钮事件
            $("#buyerBtn").click(function () {
                with ($("#buyerForm").get(0)) {
                    method = "post";
                    action = "${pageContext.request.contextPath}/user/buyerRegister";
                    submit();
                }
            });
            //用户登录按钮事件
            $("#userLoginBtn").click(function () {
                with ($("#userLoginForm")[0]) {
                    method = "post";
                    action = "${pageContext.request.contextPath}/user/goLogin";
                    submit();
                }
            });
        });

    </script>

</head>

<body class="login-layout">
<div class="main-container">
    <div class="main-content">
        <div class="row">
            <div class="col-sm-10 col-sm-offset-1">
                <div class="login-container">
                    <div class="center">
                        <h1>
                            <i class="icon-leaf green"></i>
                            <span class="red">中小微企业</span>
                            <span class="white">云服务平台</span>
                        </h1>
                        <h4 class="blue">&copy; Company</h4>
                    </div>

                    <div class="space-6"></div>

                    <div class="position-relative">
                        <div id="login-box" class="login-box visible widget-box no-border">
                            <div class="widget-body">
                                <div class="widget-main">
                                    <h4 class="header blue lighter bigger">
                                        <i class="icon-coffee green"></i>
                                        请输入你的信息：
                                    </h4>

                                    <div class="space-6"></div>

                                    <form id="userLoginForm">
                                        <fieldset>

                                            <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="userAccount" class="form-control"
                                                                   placeholder="userAccount" value="${user.userAccount}"/>
															<i class="icon-user"></i>
														</span>
                                            </label>
                                            <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" name="password" class="form-control"
                                                                   placeholder="Password" value="${user.password}"/>
															<i class="icon-lock"></i>
														</span>
                                            </label>


                                            <div class="space"></div>

                                            <div class="clearfix">
                                                <sapn id="loginFailMessage"></sapn>
                                                <span id="registerMessage"></span>
                                                <button type="button" id="userLoginBtn"
                                                        class="width-35 pull-right btn btn-sm btn-primary">
                                                    <i class="icon-key"></i>
                                                    登陆
                                                </button>
                                            </div>

                                            <div class="space-4"></div>
                                        </fieldset>
                                    </form>
                                </div>

                                <div class="toolbar clearfix">
                                    <div>
                                        <a href="#" onclick="show_box('forgot-box'); return false;"
                                           class="forgot-password-link">
                                            <i class="icon-arrow-left"></i>
                                            卖家注册
                                        </a>
                                    </div>

                                    <div>
                                        <a href="#" onclick="show_box('signup-box'); return false;"
                                           class="user-signup-link">
                                            买家注册
                                            <i class="icon-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--卖家注册-->
                        <div id="forgot-box" class="forgot-box widget-box no-border">
                            <div class="widget-body">
                                <div class="widget-main">
                                    <h4 class="header green lighter bigger">
                                        <i class="icon-group blue"></i>
                                        卖家注册
                                    </h4>

                                    <form id="sellerForm">
                                        <fieldset>
                                            <div id="uInfo">
                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="user.userAccount"
                                                                   class="form-control"
                                                                   placeholder="账户名"/>
															<i class="icon-user"></i>
														</span>
                                                </label>
                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="user.userName" class="form-control"
                                                                   placeholder="用户名"/>
															<i class="icon-user"></i>
														</span>
                                                </label>

                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" name="user.password"
                                                                   class="form-control"
                                                                   placeholder="密码"/>
															<i class="icon-lock"></i>
														</span>
                                                </label>

                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" class="form-control"
                                                                   placeholder="重复密码"/>
															<i class="icon-retweet"></i>
														</span>
                                                </label>


                                                <a id="next" href="javascript:void(0)">
                                                    <button type="button"
                                                            class="width-30 pull-right btn btn-sm btn-success">
                                                        <i class="icon-arrow-right"></i>
                                                        下一步
                                                    </button>
                                                </a>
                                            </div>
                                            <div id="oInfo">
                                                <label class="block clearfix">
                                                        <span class="block input-icon input-icon-right">
															<input type="text" name="seller.sellerName"
                                                                   class="form-control" placeholder="卖家名称"/>
														</span>
                                                </label>
                                                <label class="block clearfix">
                                                        <span class="block input-icon input-icon-right">
															<input type="text" name="company.companyName"
                                                                   class="form-control" placeholder="公司名称"/>
														</span>
                                                </label>

                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="company.webUrl"
                                                                   class="form-control" placeholder="公司网址"/>

														</span>
                                                </label>
                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="company.companyAddress"
                                                                   class="form-control" placeholder="公司地址"/>

														</span>
                                                </label>
                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="company.linkman"
                                                                   class="form-control" placeholder="联系人"/>

														</span>
                                                </label>
                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="company.companyPhone"
                                                                   class="form-control" placeholder="联系电话"/>

														</span>
                                                </label>
                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="company.email"
                                                                   class="form-control" placeholder="E-mail"/>

														</span>
                                                </label>
                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="company.employeeNum"
                                                                   class="form-control" placeholder="公司员工人数"/>

														</span>

														<span class="block input-icon input-icon-right">
															<input type="text" name="employeeComposition.researchNum"
                                                                   class="form-control"
                                                                   placeholder="研发人数"/>

														</span>
														<span class="block input-icon input-icon-right">
															<input type="text" name="employeeComposition.sellNum"
                                                                   class="form-control"
                                                                   placeholder="销售人数"/>

														</span>
                                                </label>
                                                <input id="profession" type="hidden" name="company.profession"/>
                                                <label class="block clearfix">
                                                    <font color="red">*</font>产品所属行业
                                                    <select id="pId">
                                                        <c:forEach items="${productsIndustryList}"
                                                                   var="productsIndustry">
                                                            <option id="${productsIndustry.productsIndustryId}">${productsIndustry.industryName}</option>
                                                        </c:forEach>
                                                    </select>
                                                </label>
                                                <label class="block clearfix">
                                                    <font color="red">*</font>售后联系方式：
                                                    <br>
														<span class="block input-icon input-icon-right">
															<input type="text" name="afterSale.afterPhone"
                                                                   class="form-control" placeholder="电话"/>

														</span><br>
                                              <span class="block input-icon input-icon-right">
															  <input type="text" name="afterSale.mail"
                                                                     class="form-control" placeholder="邮箱"/>

														</span><br>
                                               <span class="block input-icon input-icon-right">
														<input type="text" name="afterSale.weixin" class="form-control"
                                                               placeholder="微信"/>

														</span><br>
                                               <span class="block input-icon input-icon-right">
														<input type="text" name="afterSale.blog" class="form-control"
                                                               placeholder="微博"/>

														</span><br>
                                                </label>
                                                <label class="block">
                                                    <input type="checkbox" class="ace"/>
														<span class="lbl">
															I accept the
															User Agreement
														</span>
                                                </label>

                                                <div class="clearfix">
                                                    <a id="pre" href="javascript:void(0)">
                                                        <button type="button"
                                                                class="width-30 pull-left btn btn-sm btn-success">
                                                            <i class="icon-arrow-left"></i>
                                                            上一步
                                                        </button>
                                                    </a>
                                                    <button id="sellerBtn" type="button"
                                                            class="width-65 pull-right btn btn-sm btn-success">
                                                        注册
                                                        <i class="icon-arrow-right icon-on-right"></i>
                                                    </button>
                                                </div>

                                            </div>

                                        </fieldset>
                                    </form>
                                </div>
                                <div class="toolbar center">
                                    <a href="#" onclick="show_box('login-box'); return false;"
                                       class="back-to-login-link">
                                        <i class="icon-arrow-left"></i>
                                        返回登陆
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div id="signup-box" class="signup-box widget-box no-border">
                            <div class="widget-body">
                                <div class="widget-main">
                                    <h4 class="header green lighter bigger">
                                        <i class="icon-group blue"></i>
                                        买家注册
                                    </h4>

                                    <form id="buyerForm">
                                        <fieldset>

                                            <div id="suInfo">
                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="user.userAccount"
                                                                   class="form-control"
                                                                   placeholder="账户名"/>
															<i class="icon-user"></i>
														</span>
                                                </label>
                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="user.userName" class="form-control"
                                                                   placeholder="用户名"/>
															<i class="icon-user"></i>
														</span>
                                                </label>

                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" name="user.password"
                                                                   class="form-control"
                                                                   placeholder="密码"/>
															<i class="icon-lock"></i>
														</span>
                                                </label>

                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" class="form-control"
                                                                   placeholder="重复密码"/>
															<i class="icon-retweet"></i>
														</span>
                                                </label>
                                                <a id="snext" href="javascript:void(0)">
                                                    <button type="button"
                                                            class="width-30 pull-right btn btn-sm btn-success">
                                                        <i class="icon-arrow-right"></i>
                                                        下一步
                                                    </button>
                                                </a>
                                            </div>

                                            <div id="soInfo">

                                                <label class="block clearfix">
                                                        <span class="block input-icon input-icon-right">
															<input type="text" name="customer.name" class="form-control"
                                                                   placeholder="姓名"/>
                                                            <i class="icon-user"></i>
														</span>
                                                </label>
                                                <label class="block clearfix">
                                                        <span class="block input-icon input-icon-right">
															<input type="radio" name="customer.sex" value="0">男</input>
                                                            <input type="radio" name="customer.sex" value="1"
                                                                   style="margin-left: 30px">女</input>
														</span>
                                                </label>
                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="customer.phone"
                                                                   class="form-control" placeholder="手机"/>
                                                              <i class="icon-user"></i>
														</span>
                                                </label>
                                                <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="customer.address"
                                                                   class="form-control" class="form-control"
                                                                   placeholder="地址"/>
                                                              <i class="icon-user"></i>
														</span>
                                                </label>
                                                <label class="block">
                                                    <input type="checkbox" class="ace"/>
														<span class="lbl">
															I accept the
															User Agreement
														</span>
                                                </label>

                                                <div class="clearfix">
                                                    <a id="spre" href="javascript:void(0)">
                                                        <button type="button"
                                                                class="width-30 pull-left btn btn-sm btn-success">
                                                            <i class="icon-arrow-left"></i>
                                                            上一步
                                                        </button>
                                                    </a>
                                                    <button id="buyerBtn" type="button"
                                                            class="width-65 pull-right btn btn-sm btn-success">
                                                        注册
                                                        <i class="icon-arrow-right icon-on-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                                <div class="toolbar center">
                                    <a href="#" onclick="show_box('login-box'); return false;"
                                       class="back-to-login-link">
                                        <i class="icon-arrow-left"></i>
                                        返回登陆
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript">
    window.jQuery || document.write("<script src='${pageContext.request.contextPath}/assets/js/jquery-2.0.3.min.js'>" + "<" + "/script>");
</script>


<script type="text/javascript">
    if ("ontouchend" in document) document.write("<script src='${pageContext.request.contextPath}/assets/js/jquery.mobile.custom.min.js'>" + "<" + "/script>");
</script>


<script type="text/javascript">
    function show_box(id) {
        jQuery('.widget-box.visible').removeClass('visible');
        jQuery('#' + id).addClass('visible');
    }
</script>
<script type="text/javascript">

    $("#next").click(function () {

        $("#uInfo").hide();
        $("#oInfo").show();
    });

    $("#pre").click(function () {

        $("#uInfo").show();
        $("#oInfo").hide();
    });

    $("#snext").click(function () {

        $("#suInfo").hide();
        $("#soInfo").show();
    });

    $("#spre").click(function () {

        $("#suInfo").show();
        $("#soInfo").hide();
    });

</script>
<%--<div style="display:none">--%>
    <%--<script src='http://v7.cnzz.com/stat.php?id=155540&web_id=155540' language='JavaScript' charset='gb2312'></script>--%>
<%--</div>--%>
</body>

</html>
