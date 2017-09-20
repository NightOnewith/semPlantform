var config = config || {};

config.host = "/";
config.portals = 'user-mgr/'; //门户入口
config.mall = 'mall-web/'; //商城入口

// 应用超市列表
config.counterSelectProd = config.host + config.mall + "orders/counterSelectProd";//计算价格
config.createNewOrder = config.host + config.mall + "orders/createNewOrder";//立即购买
config.createTrialOrders = config.host + config.mall + "orders/createTrialOrders";//立即试用
config.checkTrialOrders = config.host + config.mall + "orders/checkTrialOrders";//检查是否可以试用
config.createShopCart = config.host + config.mall + "orders/shopcart/createShopCart";//加入购物车

//应用超市八大块
config.productPreview = config.host + config.mall + "prod/allProductType?status=1";

// 订购页面
config.shopCartCheck = config.host + config.mall + "orders/shopCartChcek";//购物车校验
config.prodDetails = config.host + config.mall + "prod/getProductShelfInfo"; // 订购接口
//config.prodDetails = "http://localhost:63342/app/json/1.json";

config.queryOnStockProdList = config.host + config.mall + "prod/queryOnStockProdList?status=1";//查询上架产品列表

//商城接口
config.orderQuery = config.host + config.mall + "orders/queryOrderList"; //订单查询
config.getProductShelfInfo = config.host + config.mall + "prod/getProductShelfInfo";	//	商品查询

//公用接口
config.uploadFile = config.host + config.portals + "common/uploadPic";//上传图片
config.queryAreas = config.host + config.portals + "common/getAreaTreeJson";//获取地区
config.indexPath = config.host + config.portals + "app/index.html";		//	未登录跳转

//组织机构接口
config.appQuery = config.host + config.portals + "org/records"; //应用查询
config.msgInfo = config.host + config.portals + "org/updateOrgInFlat"; //企业信息
config.myInfo = config.host + config.portals + "org/getOrgUser"; //个人信息
config.notPay = config.host + config.portals + "org/getWaitingPayRecords"; //未购买记录
config.childAccount = config.host + config.portals + 'org/getOrgCertificateInfos'; //拼接子账户
config.selectList = config.host + config.portals + 'org/getUnBindedOrgUsers'; //获取绑定列表
config.bindAndUnbind = config.host + config.portals + 'org/bindOrgCertificateUser'; //获取绑定列表
config.updateOrgUser = config.host + config.portals + 'org/updateOrgUser'; //获取绑定列表
config.updateOrgInFlat = config.host + config.portals + 'org/updateOrgInFlat';//修改企业信息
config.getOrgInFlat = config.host + config.portals + "org/getOrgInFlat";//获取企业信息
config.buyRecords= config.host + config.portals + "org/buyed-records";//获取ERP购买模块

//用户接口
config.isLogin = config.host + config.portals + 'user/isLogin'; //判断是否登陆
config.getLoginInfo = config.host + config.mall + "login/getLoginInfo";  //  获取当前登录的用户信息
config.regist = config.host + config.portals + "user/regist";//注册
config.checkUserName = config.host + config.portals + "user/checkUserName";//验证用户名称是否存在
config.getUserList = config.host + config.portals + 'org/getChildOrgUsers'; //查询当前用户下子用户列表
config.addOrgUser = config.host + config.portals + 'org/addOrUpdateChildOrgUser'; //新增子用户
config.deleteUser = config.host + config.portals + 'org/lockChildOrgUser'; //软删除用户
config.userInfo = config.host + config.portals + "user/getUserInfo.do";//获取当前用户信息
config.buyAgain = config.host + config.portals + "user/buyAgain";//购买
config.toLogout = config.host + config.mall + "logout";//商城退出
config.centerinfo = config.host + config.mall + "providers/center/info";	//	卖家信息

//  解决方案
config.pageUrl = function (pageName) {
    return config.host + config.mall + "system/config/page/pageCode?pageCode=" + pageName;
};

/**
 * 单位详情
 */
config.getUntisDetail = function(saleCombiAttr) {
	return config.host + config.mall + "prod/getUntisDetail?saleCombiAttr=" + saleCombiAttr;
}

config.queryServiceDetail = function(portletId) {
    return config.host + config.mall + "system/config/portlet?portletId=" + portletId;
}
