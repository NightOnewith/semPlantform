var __userData = null;
var __login_function = new Array();
var __logout_function = new Array();
function directUrl() {
	var list = ['mall-web','user-mgr'];
	$.each(list, function(i,l) {    
       var $iframe = $('<iframe/>', {
        	src: config.host + list[i] + "/islogin.jsp",
        	style: 'display: none;'
	    });
	    $iframe.appendTo('body');
	    $iframe.load(function() {
			ax(l);
			if(l === "mall-web") {
				console.log("开始请求卖家信息");
				_ob.pub("user-info");
			}
	    });
	});

}

function ax(str) {
	if(str != "user-mgr"){
		return;
	}
	$.ajax({
        type: 'POST',
        url: config.userInfo,
        dataType: "json",
        success: function(resultData) {
        	console.log("用户已登录");
			console.log(resultData);
			__userData = resultData.data;
			__executeLogin();
        },
        error: function(xhr, textStatus, errorThrown) {
        	if(xhr.status == 200 || xhr.status == 302) {
        		// 跳转登陆页
        		//alert("请登录");
				console.log("用户未登录");
				__executeLogout();
        	}
        },
        complete: function(xhr, textStatus) {
	        console.log(xhr.status);
	    } 
    });
}

function setLoginFunction(e){
	__login_function.push(e);
}
function setLogoutFunction(e){
	__logout_function.push(e);
}

function __executeLogin(){
	var _e = __login_function.pop();
	if(_e != null){
		_e(__userData);
	}
	setTimeout("__executeLogin()",100);
}

function __executeLogout(){
	var _e = __logout_function.pop();
	if(_e != null){
		_e(__userData);
	}
	setTimeout("__executeLogin()",100);
}


$(function() {directUrl();});
