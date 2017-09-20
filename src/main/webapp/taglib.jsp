<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>
<%--<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>--%>


<%
    request.setAttribute("ctx", request.getContextPath());
    request.setAttribute("df", "yyyy-MM-dd HH:mm:ss");
%>

<script src="${ctx}/js/My97DatePicker/WdatePicker.js"></script>

<link rel="stylesheet" href="${ctx}/kindeditor/themes/default/default.css" />
<link rel="stylesheet" href="${ctx}/kindeditor/plugins/code/prettify.css" />
<script charset="utf-8" src="${ctx}/kindeditor/plugins/code/prettify.js"></script>
<script charset="utf-8" src="${ctx}/kindeditor/kindeditor.js"></script>
<script charset="utf-8" src="${ctx}/kindeditor/lang/zh_CN.js"></script>