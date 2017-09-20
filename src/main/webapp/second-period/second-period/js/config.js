"use strict";

var config = config || {};

config.isDebug = false;

//config.host = "http://10.20.16.172:8180/";
config.host = "/";
config.portals = 'user-mgr/'; //门户入口
config.mall = 'mall-web/'; //商城入口

// config.simulateURI = config.host + config.portals + "/second-period";
config.simulateURI = "";

config.loginRedirectURI = config.host + "cas-server/login?service=" + config.host + config.portals + "cas";

config.indexPath = config.host + config.portals + "app/index.html";		//	未登录的情况跳转地址

config.getProductShelfInfo = config.host + config.mall + "prod/getProductShelfInfo"; //商城首页逻辑框架
config.getShopCartNum = config.host + config.mall + "mall-web/orders/getShopCartNum";//获取购物车中商品条数
config.getCustCollection = config.host + config.mall+"/mall-web/collection/getCustCollection";//获取用户的收藏夹

config.sellerCenter = config.host + config.mall + "providers/center/info"; //卖家中心
config.sellerTrade = config.host + config.mall + "providers/center/trade"; //交易记录
config.sellergoodManager = config.host + config.mall + "prod/getProductShelfInfo"; //商品管理
config.sellerOrderCenter = config.host + config.mall + "/orders/getProviderOrderList";//卖家订单数据
config.sellerOrderStatus = config.host + config.mall + "/orders/getProviderOrderCount";//卖家订单状态
config.exportOrdersToExcel = config.host + config.mall + "/orders/exportOrdersToExcel"//导出卖家订单EXCEL

//商城接口
config.orderQuery = config.host + config.mall + "orders/queryOrderList"; //订单查询
config.queryUnusualOrders = config.host + config.mall +"orders/queryUnusualOrders"; //废单和超时订单
config.editOrders = function(orderSeqGroup,status){
	return config.host + config.mall +"orders/editOrders?orderSeqGroup="+orderSeqGroup+"&status="+status;//修改订单信息
};
config.batchOperaTrialOrder = config.host + config.mall + "orders/batchOperaTrialOrder";//批量更新试用订单状态
config.batchDel = config.host + config.mall +"orders/batchDel"; //批量永久删除		
config.batchRestore = config.host + config.mall +"orders/batchRestore"; //批量还原
config.exportOrdersToExcel = config.host + config.mall +"orders/exportOrdersToExcel" //导出卖家excel
config.toLogout = config.host + config.mall + "logout";//商城退出

//注册接口
config.regist= config.host + config.mall + "providers/addProviderInfo"; //合作伙伴注册
config.uploadFile = config.host + config.portals + "common/uploadPic";//上传图片
config.checkUserName = config.host + config.portals + "user/checkUserName";//验证用户名称是否存在


//  检测用户是否登录
config.checkLogin = config.host + config.portals + "user/isLogin";

//  获取买家用户信息
config.myInfo = config.host + config.portals + "org/getOrgUser";

// 买家应用查询
config.appQuery = config.host + config.portals + "org/records"; 

 //企业信息
config.msgInfo = config.host + config.portals + "org/updateOrgInFlat";

//获取企业信息
config.getOrgInFlat = config.host + config.portals + "org/getOrgInFlat";

//修改企业信息
config.updateOrgInFlat = config.host + config.portals + 'org/updateOrgInFlat';

//获取地区
config.queryAreas = config.host + config.portals + "common/getAreaTreeJson";

//  获取当前用户信息
config.userInfo = config.host + config.portals + "user/getUserInfo.do";

//  获取当前登录的用户信息
config.getLoginInfo = config.host + config.mall + "login/getLoginInfo";



/**买家子账户**/
config.childAccount = config.host + config.portals + 'org/getOrgCertificateInfos'; //拼接子账户
config.selectList = config.host + config.portals + 'org/getUnBindedOrgUsers';//获取绑定列表
config.bindAndUnbind = config.host + config.portals + 'org/bindOrgCertificateUser';//获取绑定列表
config.updateOrgUser = config.host + config.portals + 'org/updateOrgUser'; //获取绑定列表
config.getUserList = config.host + config.portals + 'org/getChildOrgUsers'; //查询当前用户下子用户列表
config.addOrgUser = config.host + config.portals + 'org/addOrUpdateChildOrgUser'; //新增子用户
config.deleteUser = config.host + config.portals + 'org/lockChildOrgUser'; //软删除用户

config.getUnits = config.host + config.mall + "prod/getUnits";     //  获取单位信息
config.addProduct = config.host + config.mall + "prod/addProduct";     //  提交商品

config.batchDelProds = config.host + config.mall + "prod/batchDelProds";    //  删除商品

config.editProduct = config.host + config.mall + "prod/editProduct";       //   修改商品保存
config.getAllProductByStaus = config.host + config.mall + "prod/getAllProductByStaus";    //    卖家视角的所有商品
config.updateProviderInfo = config.host + config.mall + "providers/updateProviderInfo";   //    重新提交卖家信息
config.queryProductUnProvalReson = config.host + config.mall + "prod/queryProductUnProvalReson";   //    重新提交卖家信息
config.changeProviderInfo = config.host + config.mall + "providers/changeProviderInfo";     //  合作伙伴账号管理

/**
 * 获取单位
 */
config.getUntisDetail = function(saleCombiAttr) {
    return config.host + config.mall + "prod/getUntisDetail?saleCombiAttr=" + saleCombiAttr;
};
/**
 * 查询可选套餐
 * @param   scId
 */
config.getShopCartChangePackge = function(scId) {
    return config.host + config.mall + "orders/shopcart/getShopCartChangePackge?scId=" + scId;
};
/**
 * 修改套餐保存
 * @param scId
 * @param saleCombiAttr
 * @param quantity
 * @param amounts
 */
config.packageChange = function(scId, saleCombiAttr, quantity, amounts) {
    return config.host + config.mall + "orders/shopcart/packageChange?scId=" + scId + "&saleCombiAttr=" + saleCombiAttr + "&quantity=" + quantity + "&amounts=" + amounts;
};
/**
 * 获取合作伙伴最后一次审核不通过记录
 * @param providerId
 */
config.lastFailAuditRecord = function(providerId) {
    return config.host + config.mall + "providers/lastFailAuditRecord/" + providerId;
};

/**
 * 商品详情
 * @param id
 */
config.getProductShelfInfo = function (id) {
    return config.host + config.mall + "prod/getProductShelfInfo?prodId=" + id;
};

/**
 * 提交审批
 * @param id
 * @return {string}
 */
config.submitToApproval = function (id) {
    return config.host + config.mall + "process/submitToApproval?prodId=" + id;
};

/**
 * 提交申请下架
 * @param id
 * @return {string}
 */
config.submitToUnShelve = function (id) {
    return config.host + config.mall + "process/submitToUnShelve?prodId=" + id;
};

/**
 * 买家订单详情
 * @param orderSeq
 * @return {string}
 */
config.buyerOrderDetail = function (orderSeq) {
    if(config.isDebug) {
        return"/simulator-data/buyer-order-detail.json";
    }
    return config.host + config.mall + "/orders/queryCustomerOrdersDetail/" + orderSeq;
};

/**
 * 卖家订单详情
 * @param orderSeq
 * @return {*}
 */
config.sellerOrderDetail = function (orderSeq) {
    if(config.isDebug) {
        return config.simulateURI + "/simulator-data/seller-order-detail.json";
    }
    return config.host + config.mall + "orders/queryProviderOrdersDetail/" + orderSeq;
};

/**
 * 合作伙伴信息管理
 */
config.editProviderInfo = function () {
    return config.host + config.mall + "providers/editProviderInfo";
};

/**
 * 卖家信息
 */
config.sellerInfo = function () {
    return config.host + config.mall + "providers/center/info";
};

/**
 * 购物车
 */
config.queryshopcart = config.host + config.mall + "orders/shopcart/get";//获取购物车数据

config.shopcart = function(isStockWarm){
	return config.host + config.mall + "orders/shopcart/get?isStockWarm="+isStockWarm;//获取购物车数据
}
config.shopclean = config.host + config.mall + "orders/shopcart/clean";//清空购物车数据

config.shopCartCheck = config.host + config.mall + "orders/shopCartChcek";//购物车校验
config.shopcounter = config.host + config.mall + "orders/shopcart/counter";//购物车计算价格

config.shopdel = function(status,scId){
	return config.host + config.mall + "orders/shopcart/"+status+"/"+scId; //删除或更新购物车商品
}

//富文本编辑上传文件
config.richUpload = config.host + config.mall + "file/fileUpload";
config.richFileManager = config.host + config.mall + "file/fileManager";