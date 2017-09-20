var transform = function(data) {
    return $.param(data);
};

var httpConfig = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    transformRequest: transform
};

percenterApp.config(['$routeProvider', '$locationProvider',function($routeProvider,$locationProvider) {
    $routeProvider
        .when('/car', {
            controller: 'carCtrl',
            templateUrl: 'view/percent-car.html'
        })
        .when('/buyerOrder', { //买家订单
            controller: 'buyerCtrl',
            templateUrl: 'view/percent-order.html'
        })
        .when('/buyerOrder/:status', {//买家订单垃圾箱
            controller: 'buyerCtrl',
            templateUrl: 'view/percent-order.html'
        })
        .when('/buyerOrderRubbish', {
            controller: 'buyerRubbishCtrl',
            templateUrl: 'view/percent-orderRubbish.html'
        })
        .when('/myApps', { //买家应用
            controller: 'myAppsCtrl',
            templateUrl: 'view/myApps.html'
        })
        .when('/info', { //企业信息
            controller: 'msgInfoCtrl',
            templateUrl: 'view/info.html'
        })
        .when('/account', {//买家账户信息
            controller: 'accountCtrl',
            templateUrl: 'view/account.html'
        })
        .when('/child', {//买家子账户信息
            controller: 'childUserManageCtrl',
            templateUrl: 'view/childUserManage.html'
        })
        .when('/sellerCenter', {                //  卖家中心
            controller: 'sellerCenterCtrl',
            templateUrl: 'view/percent-sellerCenter.html'
        })
        .when("/sellerTradeHistory", {          //  交易记录
            controller: "tradeHistoryCtrl",
            templateUrl: "view/percent-sellerTradeHistory.html"
        })

        .when("/sellerTradeHistory/:status", {    //  交易记录(all: 所有, online: 在线, offline: 离线)
            controller: "tradeHistoryCtrl",
            templateUrl: "view/percent-sellerTradeHistory.html"
        })

        .when("/sellerMessageList", {           //  消息列表
            controller: "messageListCtrl",
            templateUrl: "view/percent-sellerMessageList.html"
        })

         .when("/infoManange", {       //信息管理
            controller: "infoManangeCtrl",
            templateUrl: "view/percent-info.html"
        })

        .when("/financeManagement", {           //  资金管理
            controller: "financeManageListCtrl",
            templateUrl: "view/percent-financeManage.html"
        })

        .when("/accountManange", {    //账号管理
            controller: "accountManangeCtrl",
            templateUrl: "view/percent-account.html"
        })

        .when("/goodsManagement/:status", {  //  商品管理(allGoods:所有商品, unCommittedGoods: 待上架商品, committedGoods: 已上架商品, deletedGoods: 已删除商品)
            controller: "goodsManageCtrl",
            templateUrl: "view/percent-goodsManage.html"
        })

        .when("/sellerOrderCenter", {                //  订单中心
            controller: "sellerOrderCenterCtrl",
            templateUrl: "view/percent-sellerOrderCenter.html"
        })
        .when("/orderDetail/:orderSeq", {         //  订单详情
            controller: "orderDetailCtrl",
            templateUrl: "view/percent-buyerOrderDetail.html"
        })
        .when("/seller/order/:orderSeq", {   //  卖家中心订单详情
            controller: "sellerOrderCtrl",
            templateUrl: "view/percent-sellerOrderDetail.html"
        })
        .when('/sellerUploadGoods', {       //卖家上传商品
            controller: 'editGoodsCtrl',
            templateUrl: 'view/percent-sellerUploadGoods.html'
        })
        .when('/sellerCopyGoods/:id', {       //卖家复制商品
            controller: 'copyGoodsCtrl',
            templateUrl: 'view/percent-sellerCopyGoods.html'
        })
        .when('/sellerModifyGoods/:id', {       //卖家修改商品
            controller: 'modifyGoodsCtrl',
            templateUrl: 'view/percent-sellerModifyGoods.html'
        })
        .when('/favorites', {               //  收藏
            controller: "favoritesCtrl",
            templateUrl: 'view/favorites.html'
        })
        .when("/providerReSubmit", {        //  服务商资料重新审核
            controller: 'providerReSubmitCtrl',
            templateUrl: 'view/percent-info-resubmit.html'
        })
        .otherwise({
            redirectTo: '/sellerCenter'
        });
}]);