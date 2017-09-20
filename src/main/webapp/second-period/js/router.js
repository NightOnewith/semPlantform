var myApp = angular.module("myApp", ['ui.bootstrap','ngRoute'])

var transform = function(data) {
    return $.param(data);
};

var httpConfig = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    transformRequest: transform
};

myApp.config(['$routeProvider',function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'homeCtrl',
            templateUrl: 'home.html'
        })
        .when('/buyer', {
            controller: 'buyerCtrl',
            templateUrl: 'buyerOrderCenter.html'
        })
        .when('/buyerRubbish', {
            controller: 'buyerCtrl',
            templateUrl: 'buyerRubbish.html'
        })
        .when('/buyerOrderDetail', {
            controller: 'buyerCtrl',
            templateUrl: 'buyerOrderDetail.html'
        })
        .when('/sellerOrderCenter', {
            controller: 'sellerCtrl',
            templateUrl: 'sellerOrderCenter.html'
        })
        .when('/sellerOrderDetail', {
            controller: 'sellerCtrl',
            templateUrl: 'sellerOrderDetail.html'
        })
        .when('/favorites', {
            controller: 'favoritesCtrl',
            templateUrl: 'favorites.html'
        })
        .when('/msgList', {
            controller: 'msgListCtrl',
            templateUrl: 'msgList.html'
        })
        .when('/sellerSellingGoods', { //出售中的商品
            controller: 'sellerCtrl',
            templateUrl: 'sellerSellingGoods.html'
        })
        .when('/sellerEditGoods', {//卖家编辑商品
            controller: 'editGoodsCtrl',
            templateUrl: 'sellerEditGoods.html'
        })
        .when('/sellerpressGoods', {//卖家发布商品
            controller: 'editGoodsCtrl',
            templateUrl: 'sellerpressGoods.html'
        })
        .when('/sellerStoreSet', {//卖家店铺设置
            controller: 'storeSetCtrl',
            templateUrl: 'sellerStoreSet.html'
        })
        .when('/car', {//购物车
            controller: 'carCtrl',
            templateUrl: 'car.html'
        })
        .when('/sellerDepot', { // 仓库中的商品
            controller: 'sellerCtrl',
            templateUrl: 'sellerDepot.html'
        })
        .when('/sellerCenter', { // 卖家中心首页
            controller: 'sellerCtrl',
            templateUrl: 'sellerCenter.html'
        })
        .when('/myApp', { // 我的应用
            controller: 'myAppCtrl',
            templateUrl: 'myApp.html'
        })
        .when('/prodDetail/:prodId/:saleCombiAttr', { // 出售中的商品
            controller: 'prodDetailCtrl',
            templateUrl: 'prodDetail.html'
        })

        /**
         * 二期新路由部分
         */
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
        .otherwise({
            redirectTo: '/'
        });
}]);