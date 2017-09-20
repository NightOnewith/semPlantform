<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<jsp:include page="/taglib.jsp"></jsp:include>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="${ctx}/css/bootstrap.min.3.3.5.css" />
		<title></title>
		<style>
			body {
				background: url(${ctx}/img/404.jpg);
				background-size: cover;
			}

			a{
				margin-top: 33%;
				margin-left: 61%;
			}
		</style>
	</head>

	<body>
		<a href="${ctx}/login" class="btn btn-primary  btn-lg">返回首页》》</a>
	</body>

</html>