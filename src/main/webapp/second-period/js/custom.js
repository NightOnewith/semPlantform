"use strict";

var transform = function (data) {
    return $.param(data);
};

var httpConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    transformRequest: transform
};

myApp.service("Http", ["$rootScope", "$http", "$window", function ($rootScope, $http, $window) {
    return {

        /**
         * ajax二次封装
         * @param opt   配置项
         *      @attribute  url          String   Required
         *      @attribute  method       String   Optional
         *      @attribute  showLoading  Boolean  Optional
         *      @attribute  Data         Object   Optional
         *      @attribute  cfg          Object   Optional
         *      @attribute  success      Function Optional
         *      @attribute  error        Function Optional
         */
        request: function (opt) {
            if(config.isDebug && ("" + opt.method).toLowerCase() === "post") {
                opt.method = "get";
            }
            var cfg = {
                url: opt.url,
                method: (opt.method || "get").toUpperCase(),
                showLoading: opt.showLoading || true,
                data: {}.toString.call(opt.data) === "[object Object]" ? opt.data : {},
                cfg: {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    transformRequest: transform
                },
                success: opt.success || null,
                error: opt.error || null
            };

            if (cfg.showLoading) {
                $rootScope.loading = true;
            }
            if (cfg.method === "GET") {
                $http.get(cfg.url)
                    .success(function () {
                        if (cfg.showLoading) {
                            $rootScope.loading = false;
                        }
                        if (typeof cfg.success === "function") {
                            cfg.success.apply($window, [].slice.call(arguments, 0));
                        }
                    })
                    .error(function () {
                        if (cfg.showLoading) {
                            $rootScope.loading = false;
                        }
                        if (typeof cfg.error === "function") {
                            cfg.error.apply($window, [].slice.call(arguments, 0));
                        }
                    });
            } else if (cfg.method === "POST") {
                $http.post(cfg.url, cfg.data, cfg.cfg)
                    .success(function () {
                        if (cfg.showLoading) {
                            $rootScope.loading = false;
                        }
                        if (typeof cfg.success === "function") {
                            cfg.success.apply($window, [].slice.call(arguments, 0));
                        }
                    })
                    .error(function () {
                        if (cfg.showLoading) {
                            $rootScope.loading = false;
                        }
                        if (typeof cfg.error === "function") {
                            cfg.error.apply($window, [].slice.call(arguments, 0));
                        }
                    });
            }
        }
    };
}]);

myApp.run(function (paginationConfig) {
    paginationConfig.firstText = '最前';
    paginationConfig.previousText = '前一页';
    paginationConfig.nextText = '下一页';
    paginationConfig.lastText = '最后';
}).run(['$rootScope', '$http', '$location', function ($rootScope, $http, $location) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        var cardata = {"resultCode": "1", "resultMsg": "查询成", "object": "3"};

//     $http.get(config.getProductShelfInfo)
//		.success(function(data) {
        if (cardata.resultCode == 1) {
            $rootScope.carnum = cardata.object;
        }
//      }).error(function() {
//			console.log("服务器异常，请稍候再试");
//		});

        $rootScope.title = '';

        if (next.templateUrl === "buyerOrderDetail.html") {
            $rootScope.title = '买家中心-订单详情';
        } else if (next.templateUrl === "buyerOrderCenter.html") {
            $rootScope.title = '买家中心-订单中心';
        } else if (next.templateUrl === "buyerRubbish.html") {
            $rootScope.title = '买家中心-回收站';
        } else if (next.templateUrl === "favorites.html") {
            $rootScope.title = '收藏夹';
        } else if (next.templateUrl === "msgList.html") {
            $rootScope.title = '消息列表';
        } else if (next.templateUrl === "sellerCenter.html") {
            $rootScope.title = '卖家中心';
        } else if (next.templateUrl === "sellerOrderCenter.html") {
            $rootScope.title = '卖家中心-订单中心';
        } else if (next.templateUrl === "sellerOrderDetail.html") {
            $rootScope.title = '卖家中心-已卖出商品';
        } else if (next.templateUrl === "sellerSellingGoods.html") {
            $rootScope.title = '卖家中心-出售中的商品';
        } else if (next.templateUrl === "sellerSellingGoods.html") {
            $rootScope.title = '卖家中心-出售中的商品';
        } else if (next.templateUrl === "sellerEditGoods.html") {
            $rootScope.title = '卖家中心-编辑商品';
        } else if (next.templateUrl === "sellerDepot.html") {
            $rootScope.title = '卖家中心-仓库中的商品';
        } else if (next.templateUrl === "prodDetail.html") {
            $rootScope.title = '商品详情';
        } else if (next.templateUrl === "sellerStoreSet.html") {
            $rootScope.title = '卖家中心-店铺设置';
        }
    });
}]);

myApp.controller("homeCtrl", function ($scope, $http) {
    var data = {
        "resultCode": "1",
        "resultMsg": "查询成功",
        "object": [
            {
                "pageSize": 10,
                "currentPage": 1,
                "totalPages": 1,
                "totalRows": 6,
                "pageStartRow": 0,
                "pageEndRow": 6,
                "pagination": false,
                "hasNextPage": false,
                "hasPreviousPage": false,
                "sortName": null,
                "sortOrder": null,
                "pagedView": null,
                "pagedDiv": null
            },
            [
                {
                    "prodId": 40,
                    "providId": 1,
                    "prodTypeCd": 11,
                    "prodName": "网络接入",
                    "status": "1",
                    "description": "光宽带接入",
                    "createTime": "2016-10-24 00:00:00",
                    "onTime": "2016-10-24 00:00:00",
                    "offTime": "2099-12-30 00:00:00",
                    "url": null,
                    "shelfId": 1,
                    "style": "1",
                    "shelfstatus": "1",
                    "shelfSort": "1",
                    "downloadUrl": "www.baidu.com",
                    "transcat": "在线下单，先安装后付费",
                    "qa": "这是一个宽带接入的常见问题",
                    "trialTime": 3,
                    "saleCombiAttr": null,
                    "picsList": [],
                    "saleAttrList": [
                        {
                            "prodSaleAttrId": 75,
                            "prodId": 40,
                            "saleCombiAttr": 64,
                            "prodStockNum": null,
                            "price": 50,
                            "priceUnit": "元/月",
                            "saleAttrName": "端口",
                            "saleAttrValue": "20M",
                            "description": "套餐内包含1.5G手机流量（1G国+500M本地）；700分钟手机通话（300分钟国内主叫+400分钟本地主叫）。",
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": [
                                {
                                    "prodSaleAttrId": 76,
                                    "prodId": 40,
                                    "saleCombiAttr": 67,
                                    "prodStockNum": 1000,
                                    "price": 130,
                                    "priceUnit": "",
                                    "saleAttrName": "套餐",
                                    "saleAttrValue": "3个月",
                                    "description": null,
                                    "parentSaleCombiAttr": "64",
                                    "planSaleAttrs": []
                                },
                                {
                                    "prodSaleAttrId": 77,
                                    "prodId": 40,
                                    "saleCombiAttr": 68,
                                    "prodStockNum": 1000,
                                    "price": 200,
                                    "priceUnit": "",
                                    "saleAttrName": "套餐",
                                    "saleAttrValue": "5个月",
                                    "description": null,
                                    "parentSaleCombiAttr": "64",
                                    "planSaleAttrs": []
                                }
                            ]
                        },
                        {
                            "prodSaleAttrId": 78,
                            "prodId": 40,
                            "saleCombiAttr": 65,
                            "prodStockNum": null,
                            "price": 70,
                            "priceUnit": "元/月",
                            "saleAttrName": "端口",
                            "saleAttrValue": "50M",
                            "description": "套餐内包含1.5G手机流量（1G国+500M本地）；700分钟手机通话（300分钟国内主叫+400分钟本地主叫）。",
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": [
                                {
                                    "prodSaleAttrId": 79,
                                    "prodId": 40,
                                    "saleCombiAttr": 69,
                                    "prodStockNum": 998,
                                    "price": 400,
                                    "priceUnit": "",
                                    "saleAttrName": "套餐",
                                    "saleAttrValue": "6个月",
                                    "description": null,
                                    "parentSaleCombiAttr": "65",
                                    "planSaleAttrs": []
                                },
                                {
                                    "prodSaleAttrId": 80,
                                    "prodId": 40,
                                    "saleCombiAttr": 70,
                                    "prodStockNum": 994,
                                    "price": 900,
                                    "priceUnit": "",
                                    "saleAttrName": "套餐",
                                    "saleAttrValue": "12个月",
                                    "description": null,
                                    "parentSaleCombiAttr": "65",
                                    "planSaleAttrs": []
                                }
                            ]
                        },
                        {
                            "prodSaleAttrId": 81,
                            "prodId": 40,
                            "saleCombiAttr": 66,
                            "prodStockNum": null,
                            "price": 100,
                            "priceUnit": "元/月",
                            "saleAttrName": "端口",
                            "saleAttrValue": "100M",
                            "description": "套餐内包含1.5G手机流量（1G国+500M本地）；700分钟手机通话（300分钟国内主叫+400分钟本地主叫）。",
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": [
                                {
                                    "prodSaleAttrId": 82,
                                    "prodId": 40,
                                    "saleCombiAttr": 71,
                                    "prodStockNum": 888,
                                    "price": 1100,
                                    "priceUnit": null,
                                    "saleAttrName": "套餐",
                                    "saleAttrValue": "一年",
                                    "description": null,
                                    "parentSaleCombiAttr": "66",
                                    "planSaleAttrs": []
                                },
                                {
                                    "prodSaleAttrId": 83,
                                    "prodId": 40,
                                    "saleCombiAttr": 72,
                                    "prodStockNum": 666,
                                    "price": 1900,
                                    "priceUnit": null,
                                    "saleAttrName": "套餐",
                                    "saleAttrValue": "两年",
                                    "description": null,
                                    "parentSaleCombiAttr": "66",
                                    "planSaleAttrs": []
                                }
                            ]
                        }
                    ],
                    "page": null
                },
                {
                    "prodId": 41,
                    "providId": 1,
                    "prodTypeCd": 11,
                    "prodName": "平台功费",
                    "status": "1",
                    "description": "按中小企业接入云平台VIP账号",
                    "createTime": "2016-10-24 00:00:00",
                    "onTime": "2016-10-24 00:00:00",
                    "offTime": "2099-12-30 00:00:00",
                    "url": null,
                    "shelfId": 2,
                    "style": "2",
                    "shelfstatus": "1",
                    "shelfSort": "2",
                    "downloadUrl": "www.baidu.com",
                    "transcat": "",
                    "qa": "这是一个平台工费的常见问题",
                    "trialTime": 3,
                    "saleCombiAttr": null,
                    "picsList": [],
                    "saleAttrList": [
                        {
                            "prodSaleAttrId": 84,
                            "prodId": 41,
                            "saleCombiAttr": 73,
                            "prodStockNum": 9999,
                            "price": 0,
                            "priceUnit": null,
                            "saleAttrName": "套餐",
                            "saleAttrValue": "免费账户",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        },
                        {
                            "prodSaleAttrId": 85,
                            "prodId": 41,
                            "saleCombiAttr": 74,
                            "prodStockNum": 100,
                            "price": 100,
                            "priceUnit": "元/月",
                            "saleAttrName": "套餐",
                            "saleAttrValue": "2个账户+1个功能模块",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        },
                        {
                            "prodSaleAttrId": 86,
                            "prodId": 41,
                            "saleCombiAttr": 75,
                            "prodStockNum": 99,
                            "price": 150,
                            "priceUnit": "元/月",
                            "saleAttrName": "套餐",
                            "saleAttrValue": "2个账户+2个功能模块",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        },
                        {
                            "prodSaleAttrId": 87,
                            "prodId": 41,
                            "saleCombiAttr": 76,
                            "prodStockNum": 97,
                            "price": 200,
                            "priceUnit": "元/月",
                            "saleAttrName": "套餐",
                            "saleAttrValue": "4个账户+6个功能模块",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        },
                        {
                            "prodSaleAttrId": 88,
                            "prodId": 41,
                            "saleCombiAttr": 77,
                            "prodStockNum": 75,
                            "price": 300,
                            "priceUnit": "元/月",
                            "saleAttrName": "套餐",
                            "saleAttrValue": "8个账户+8个功能模块",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        }
                    ],
                    "page": null
                },
                {
                    "prodId": 42,
                    "providId": 1,
                    "prodTypeCd": 11,
                    "prodName": "铛铛",
                    "status": "1",
                    "description": "铛铛（DDANG）为企业独立构建的服务交互即时通讯平台，具备支撑企业私密、高效、安全的即时通讯服务。",
                    "createTime": "2016-10-24 00:00:00",
                    "onTime": "2016-10-24 00:00:00",
                    "offTime": "2099-12-30 00:00:00",
                    "url": null,
                    "shelfId": 3,
                    "style": "3",
                    "shelfstatus": "1",
                    "shelfSort": "3",
                    "downloadUrl": "www.baidu.com",
                    "transcat": "在线申请，在线支付或线下对接",
                    "qa": "这是一个铛铛的常见使用问题",
                    "trialTime": 1,
                    "saleCombiAttr": null,
                    "picsList": [],
                    "saleAttrList": [
                        {
                            "prodSaleAttrId": 89,
                            "prodId": 42,
                            "saleCombiAttr": 78,
                            "prodStockNum": 1000,
                            "price": 800,
                            "priceUnit": "元/年",
                            "saleAttrName": "版本",
                            "saleAttrValue": "普通版",
                            "description": "<100员工",
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        },
                        {
                            "prodSaleAttrId": 90,
                            "prodId": 42,
                            "saleCombiAttr": 79,
                            "prodStockNum": 999,
                            "price": 1000,
                            "priceUnit": "元/年",
                            "saleAttrName": "版本",
                            "saleAttrValue": "加强版",
                            "description": "≥100员工",
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        }
                    ],
                    "page": null
                },
                {
                    "prodId": 43,
                    "providId": 1,
                    "prodTypeCd": 11,
                    "prodName": "筷享生活",
                    "status": "1",
                    "description": "面向餐饮行业的订餐、预约、外卖等整体门店、连锁解决方案的SaaS软件",
                    "createTime": "2016-10-24 00:00:00",
                    "onTime": "2016-10-24 00:00:00",
                    "offTime": "2099-12-30 00:00:00",
                    "url": null,
                    "shelfId": 4,
                    "style": "4",
                    "shelfstatus": "1",
                    "shelfSort": "4",
                    "downloadUrl": "www.baidu.com",
                    "transcat": "在线申请，在线支付或线下对接",
                    "qa": "这是一个快想支付的常见使用问题",
                    "trialTime": 1,
                    "saleCombiAttr": null,
                    "picsList": [],
                    "saleAttrList": [
                        {
                            "prodSaleAttrId": 91,
                            "prodId": 43,
                            "saleCombiAttr": 80,
                            "prodStockNum": 9999,
                            "price": 3000,
                            "priceUnit": "元/年/店",
                            "saleAttrName": "版本",
                            "saleAttrValue": "普通版",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        },
                        {
                            "prodSaleAttrId": 92,
                            "prodId": 43,
                            "saleCombiAttr": 81,
                            "prodStockNum": 9999,
                            "price": 6000,
                            "priceUnit": "元/年/店",
                            "saleAttrName": "版本",
                            "saleAttrValue": "高级版",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        },
                        {
                            "prodSaleAttrId": 93,
                            "prodId": 43,
                            "saleCombiAttr": 82,
                            "prodStockNum": 9999,
                            "price": 40000,
                            "priceUnit": "元/年/店",
                            "saleAttrName": "版本",
                            "saleAttrValue": "完整版",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        }
                    ],
                    "page": null
                },
                {
                    "prodId": 44,
                    "providId": 1,
                    "prodTypeCd": 11,
                    "prodName": "9点优服",
                    "status": "1",
                    "description": "新一代成本低、安全高、跨行业、基于云部署的客服交互和管理平台。",
                    "createTime": "2016-10-24 00:00:00",
                    "onTime": "2016-10-24 00:00:00",
                    "offTime": "2099-12-30 00:00:00",
                    "url": null,
                    "shelfId": 5,
                    "style": "5",
                    "shelfstatus": "1",
                    "shelfSort": "5",
                    "downloadUrl": "www.baidu.com",
                    "transcat": "在线下单，在线支付或线下对接",
                    "qa": "这是一个九点有福的问题",
                    "trialTime": 0,
                    "saleCombiAttr": null,
                    "picsList": [],
                    "saleAttrList": [
                        {
                            "prodSaleAttrId": 94,
                            "prodId": 44,
                            "saleCombiAttr": 83,
                            "prodStockNum": 9999,
                            "price": 1000,
                            "priceUnit": "元/年/坐席",
                            "saleAttrName": "版本",
                            "saleAttrValue": "标准版",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        },
                        {
                            "prodSaleAttrId": 95,
                            "prodId": 44,
                            "saleCombiAttr": 84,
                            "prodStockNum": 9999,
                            "price": 3000,
                            "priceUnit": "元/年/坐席",
                            "saleAttrName": "版本",
                            "saleAttrValue": "专业版",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        },
                        {
                            "prodSaleAttrId": 96,
                            "prodId": 44,
                            "saleCombiAttr": 85,
                            "prodStockNum": 9999,
                            "price": 8000,
                            "priceUnit": "元/年/坐席",
                            "saleAttrName": "版本",
                            "saleAttrValue": "完整版",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        }
                    ],
                    "page": null
                },
                {
                    "prodId": 45,
                    "providId": 1,
                    "prodTypeCd": 11,
                    "prodName": "流量安全管理",
                    "status": "1",
                    "description": "具有流量管理、上网行为管理等功能台VIP账号",
                    "createTime": "2016-10-24 00:00:00",
                    "onTime": "2016-10-24 00:00:00",
                    "offTime": "2099-12-30 00:00:00",
                    "url": null,
                    "shelfId": 6,
                    "style": "6",
                    "shelfstatus": "1",
                    "shelfSort": "6",
                    "downloadUrl": "www.baidu.com",
                    "transcat": null,
                    "qa": "常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题",
                    "trialTime": null,
                    "saleCombiAttr": null,
                    "picsList": [],
                    "saleAttrList": [
                        {
                            "prodSaleAttrId": 97,
                            "prodId": 45,
                            "saleCombiAttr": 86,
                            "prodStockNum": 9999,
                            "price": 500,
                            "priceUnit": "元/端口/月",
                            "saleAttrName": "类型",
                            "saleAttrValue": "流量卫士CT-100基础型",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        },
                        {
                            "prodSaleAttrId": 98,
                            "prodId": 45,
                            "saleCombiAttr": 87,
                            "prodStockNum": 9999,
                            "price": 700,
                            "priceUnit": "元/端口/月",
                            "saleAttrName": "类型",
                            "saleAttrValue": "流量卫士CT-100标准型",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        },
                        {
                            "prodSaleAttrId": 99,
                            "prodId": 45,
                            "saleCombiAttr": 88,
                            "prodStockNum": 9999,
                            "price": 950,
                            "priceUnit": "元/端口/月",
                            "saleAttrName": "类型",
                            "saleAttrValue": "流量卫士CT-100增强型",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        },
                        {
                            "prodSaleAttrId": 100,
                            "prodId": 45,
                            "saleCombiAttr": 89,
                            "prodStockNum": 9999,
                            "price": 1050,
                            "priceUnit": "元/端口/月",
                            "saleAttrName": "类型",
                            "saleAttrValue": "流量卫士CT-500标准型",
                            "description": null,
                            "parentSaleCombiAttr": null,
                            "planSaleAttrs": []
                        }
                    ],
                    "page": null
                }
            ]
        ]
    }
    $scope.addBr = function (str) {
        var list = [16, 16];
        for (var i = 0; i < parseInt((str.length - 32) / 6) + 1; i++) {
            list.push(6);
        }

        var _list = [];
        for (var i = 0; i < list.length; i++) {
            if (i == 0) {
                _list.push(str.slice(0, 16))
            } else {
                var _num = 0;
                for (var j = 0; j < i + 1; j++) {
                    _num = parseInt(_num) + parseInt(list[j]);
                }

                _list.push(str.slice(_num - list[i], _num))
            }

        }
        var destr = _list.join('<br>');
        return destr;
    }
//	$http.get(config.getProductShelfInfo)
//		.success(function(data) {

    if (data.resultCode == 1) {
        $scope.productInfofirst = data.object[1][0];
        $scope.productInfosecond = data.object[1][1];
        $scope.productInfothird = data.object[1][2];
        $scope.productInfofouth = data.object[1][3];
        $scope.productInfofive = data.object[1][4];
        $scope.productInfosix = data.object[1][5];
        $scope.productInfothird.description = $scope.addBr($scope.productInfothird.description);
        $('#com_wordes').html($scope.productInfothird.description);
        console.log(data);
    }
//		})
//		.error(function() {
//			console.log("服务器异常，请稍候再试");
//		});
})
    .controller("buyerCtrl", function ($scope, $http) {
        $scope.filteredTodos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;

        $scope.makeTodos = function () {
            $scope.todos = [];
            for (var i = 1; i <= 1000; i++) {
                $scope.todos.push({
                    text: 'todo ' + i,
                    done: false
                });
            }
        };

        $scope.makeTodos();

        $scope.$watch('currentPage + numPerPage', function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                end = begin + $scope.numPerPage;

            $scope.filteredTodos = $scope.todos.slice(begin, end);
        });

        $scope.buyStatus = 3;

    })
    .controller("sellerCtrl", function ($scope, $http) {
    $('.datetimepickerstart').datetimepicker();
    $('.datetimepickerend').datetimepicker();
    $scope.sellerStatus = 1;

})
    .controller("favoritesCtrl", function ($scope, $http) {
    var data = {
        "resultCode": "1",
        "resultMsg": "查询成功",
        "object": [
            {
                "pageSize": 10,
                "currentPage": 1,
                "totalPages": 1,
                "totalRows": 2,
                "pageStartRow": 0,
                "pageEndRow": 2,
                "pagination": false,
                "hasNextPage": false,
                "hasPreviousPage": false,
                "sortName": null,
                "sortOrder": null,
                "pagedView": null,
                "pagedDiv": null
            },
            [
                {
                    "collectionId": 19,
                    "custId": 48,
                    "prodId": 1,
                    "price": 0.01,
                    "priceUnit": "元/月",
                    "prodStatus": null,
                    "status": 1,
                    "prodName": "采购管理系统",
                    "prodTypeCD": null,
                    "typeName": null,
                    "description": "采购管理系统",
                    "saleDescription": "描述描述描述描述描述描述",
                    "url": null,
                    "prodStockNum": null,
                    "saleCombiAttr": 1,
                    "picsUrl": "http://www.zcy365.com/files-test/mall/goods/pic/201512/1449628284499.jpg?t=0.22290061437524855",
                    "page": null
                },
                {
                    "collectionId": 12,
                    "custId": 48,
                    "prodId": 40,
                    "price": 50,
                    "priceUnit": "元/月",
                    "prodStatus": null,
                    "status": 1,
                    "prodName": "网络接入",
                    "prodTypeCD": null,
                    "typeName": null,
                    "description": "光宽带接入",
                    "saleDescription": "套餐内包含1.5G手机流量（1G国+500M0003本地）；700分钟手机通话（300分钟国内主叫+400分钟本地主叫）。",
                    "url": null,
                    "prodStockNum": null,
                    "saleCombiAttr": 64,
                    "picsUrl": "图片的URL",
                    "page": null
                },

            ]
        ]
    }
//	$http.get(config.getCustCollection)
//		.success(function(data) {
    if (data.resultCode == 1) {
        $scope.collect = data.object[1];
        $scope.page = data.object[0];
        $scope.currentPage = $scope.page.currentPage;
        $scope.maxSize = $scope.page.pageSize;
        $scope.totalItems = $scope.page.totalRows;
    }
//    }).error(function() {
//			console.log("服务器异常，请稍候再试");
//		});


})
    .controller("msgListCtrl", function ($scope, $http) {
    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.makeTodos = function () {
        $scope.todos = [];
        for (var i = 1; i <= 1000; i++) {
            $scope.todos.push({
                text: 'todo ' + i,

            });
        }
    };

    $scope.makeTodos();

    $scope.$watch('currentPage + numPerPage', function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage),
            end = begin + $scope.numPerPage;

        $scope.filteredTodos = $scope.todos.slice(begin, end);
    });
})
    .controller("prodDetailCtrl", function ($scope, $http) {
    $(".prodDetail .sideBar >li")
        .mouseenter(function () {
            $(this).addClass('on')
        })
        .mouseleave(function () {
            $(this).removeClass('on')
        });

    $('.prodDetail .mainCon .productInfo .typeItem').click(function (event) {
        $('.prodDetail .mainCon .productInfo .typeItem').removeClass('on');
        $(this).addClass('on');
    })

    $(".slideTxtBox").slide();
})
    .controller("editGoodsCtrl", function ($scope, $http) {
    $(function () {
        var url = window.location.hostname === 'blueimp.github.io' ?
                '//jquery-file-upload.appspot.com/' : 'server/php/',
            uploadButton = $('<button/>')
                .addClass('btn btn-primary')
                .prop('disabled', true)
                .text('Processing...')
                .on('click', function () {
                    var $this = $(this),
                        data = $this.data();
                    $this
                        .off('click')
                        .text('Abort')
                        .on('click', function () {
                            $this.remove();
                            data.abort();
                        });
                    data.submit().always(function () {
                        $this.remove();
                    });
                });
        $('#fileupload').fileupload({
            url: url,
            dataType: 'json',
            autoUpload: false,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            maxFileSize: 999000,
            // Enable image resizing, except for Android and Opera,
            // which actually support image resizing, but fail to
            // send Blob objects via XHR requests:
            disableImageResize: /Android(?!.*Chrome)|Opera/
                .test(window.navigator.userAgent),
            previewMaxWidth: 110,
            previewMaxHeight: 110,
            previewCrop: true
        }).on('fileuploadadd', function (e, data) {
            if ($('#files div').length < 5) {
                data.context = $('<div/>').appendTo('#files');
            } else {
                alert('最多上传5张照片')
            }
            $.each(data.files, function (index, file) {
                var node = $('<p/>');
                if (!index) {
                    node
                        .append(uploadButton.clone(true).data(data));
                }
                node.appendTo(data.context);
            });
        }).on('fileuploadprocessalways', function (e, data) {
            var index = data.index,
                file = data.files[index],
                node = $(data.context.children()[index]);
            if (file.preview) {
                node
                    .prepend('<br>')
                    .prepend(file.preview);
            }
            if (file.error) {
                node
                    .append('<br>')
                    .append($('<span class="text-danger"/>').text(file.error));
            }
            if (index + 1 === data.files.length) {
                data.context.find('button')
                    .text('Upload')
                    .prop('disabled', !!data.files.error);
            }
        }).on('fileuploadprogressall', function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }).on('fileuploaddone', function (e, data) {
            $.each(data.result.files, function (index, file) {
                if (file.url) {
                    var link = $('<a>')
                        .attr('target', '_blank')
                        .prop('href', file.url);
                    $(data.context.children()[index])
                        .wrap(link);
                } else if (file.error) {
                    var error = $('<span class="text-danger"/>').text(file.error);
                    $(data.context.children()[index])
                        .append(error);
                }
            });
        }).on('fileuploadfail', function (e, data) {
            $.each(data.files, function (index) {
                var error = $('<span class="text-danger"/>').text('File upload failed.');
                $(data.context.children()[index])
                    .append(error);
            });
        }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');

        //wangEditor
        var editor = new wangEditor('editor-trigger');

        // 上传图片
        editor.config.uploadImgUrl = '/upload';

        editor.create();
    });

})
    .controller("storeSetCtrl", function ($scope, $http) {
    $(function () {
        var url = window.location.hostname === 'blueimp.github.io' ?
                '//jquery-file-upload.appspot.com/' : 'server/php/',
            uploadButton = $('<button/>')
                .addClass('btn btn-primary')
                .prop('disabled', true)
                .text('Processing...')
                .on('click', function () {
                    var $this = $(this),
                        data = $this.data();
                    $this
                        .off('click')
                        .text('Abort')
                        .on('click', function () {
                            $this.remove();
                            data.abort();
                        });
                    data.submit().always(function () {
                        $this.remove();
                    });
                });
        $('#fileupload').fileupload({
            url: url,
            dataType: 'json',
            autoUpload: false,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            maxFileSize: 999000,
            // Enable image resizing, except for Android and Opera,
            // which actually support image resizing, but fail to
            // send Blob objects via XHR requests:
            disableImageResize: /Android(?!.*Chrome)|Opera/
                .test(window.navigator.userAgent),
            previewMaxWidth: 110,
            previewMaxHeight: 110,
            previewCrop: true
        }).on('fileuploadadd', function (e, data) {
            //限制上传一个
            $('#files').html('');
            data.context = $('<div/>').appendTo('#files');
            $.each(data.files, function (index, file) {
                var node = $('<p/>');
                if (!index) {
                    node
                        .append(uploadButton.clone(true).data(data));
                }
                node.appendTo(data.context);
            });
        }).on('fileuploadprocessalways', function (e, data) {
            var index = data.index,
                file = data.files[index],
                node = $(data.context.children()[index]);
            if (file.preview) {
                node
                    .prepend('<br>')
                    .prepend(file.preview);
            }
            if (file.error) {
                node
                    .append('<br>')
                    .append($('<span class="text-danger"/>').text(file.error));
            }
            if (index + 1 === data.files.length) {
                data.context.find('button')
                    .text('Upload')
                    .prop('disabled', !!data.files.error);
            }
        }).on('fileuploadprogressall', function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }).on('fileuploaddone', function (e, data) {
            $.each(data.result.files, function (index, file) {
                if (file.url) {
                    var link = $('<a>')
                        .attr('target', '_blank')
                        .prop('href', file.url);
                    $(data.context.children()[index])
                        .wrap(link);
                } else if (file.error) {
                    var error = $('<span class="text-danger"/>').text(file.error);
                    $(data.context.children()[index])
                        .append(error);
                }
            });
        }).on('fileuploadfail', function (e, data) {
            $.each(data.files, function (index) {
                var error = $('<span class="text-danger"/>').text('File upload failed.');
                $(data.context.children()[index])
                    .append(error);
            });
        }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');

        //wangEditor
        var editor = new wangEditor('editor-trigger');

        // 上传图片
        editor.config.uploadImgUrl = '/upload';

        editor.create();
    });

})
    .controller("carCtrl", function ($scope, $http) {
    $scope.yxqtxt = "3个月";
    $scope.zhtxt = "5个";

    //显示套餐
    $('.update_ico').on('click', function () {
        $(this).parent('.tbl-1').addClass('on');
    })

    //选择套餐
    $('.package_pop_wrap span').on('click', function () {
        var isact = $(this).hasClass('active');
        isact ? $(this).removeClass('active') : $(this).addClass('active');
        $(this).siblings('span').removeClass('active');
        var _this = $(this);
        if ($('.package_pop_yxq span.active').text() != '' && $('.package_pop_zh span.active').text() != '') {
            _this.parents('.package_pop').find('.pop_btn .sure_btn').removeClass('butn');
        } else {
            _this.parents('.package_pop').find('.pop_btn .sure_btn').addClass('butn');
        }
    })

    $scope.sureBtn = function () {
        if ($('.package_pop_yxq span.active').text() == '' || $('.package_pop_zh span.active').text() == '') {
            return;
        }
        $scope.yxqtxt = $('.package_pop_yxq span.active').text();
        $scope.zhtxt = $('.package_pop_zh span.active').text();
        $('.tbl-1').removeClass('on');
    }
    $scope.closeBtn = function () {
        $('.package_pop_wrap span').removeClass('active');
        $('.tbl-1').removeClass('on');
    }

    /*吸底*/
    var innerObj = document.getElementById("inner");

    var topObj = getTop(innerObj);

    window.onscroll = function () {

        var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (bodyScrollTop < topObj) {

            innerObj.style.position = "fixed";

            innerObj.style.bottom = "0px";

            innerObj.style.marginBottom = "0px";

        } else {

            innerObj.style.position = "static";

            innerObj.style.marginBottom = "50px";

        }

    }

    function getTop(e) {
        var liheight = $('.moyig-ui').length * 205;
        var offset = e.offsetTop + liheight - 600;
        if (e.offsetParent != null) offset += getTop(e.offsetParent);
        return offset;
    }

})

//  买家订单详情
    .controller("orderDetailCtrl", ["$scope", "$http", function ($scope, $http) {
        "use strict";
        $scope.filteredTodos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;

        $scope.makeTodos = function () {
            $scope.todos = [];
            for (var i = 1; i <= 1000; i++) {
                $scope.todos.push({
                    text: 'todo ' + i,
                    done: false
                });
            }
        };

        $scope.makeTodos();

        $scope.$watch('currentPage + numPerPage', function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                end = begin + $scope.numPerPage;

            $scope.filteredTodos = $scope.todos.slice(begin, end);
        });

        $scope.buyStatus = 1;
    }])

    //  卖家中心订单详情
    .controller("sellerOrderCtrl", ["$scope", "Http", "$routeParams", function ($scope, Http, $routeParams) {
        var orderSeq = $routeParams.orderSeq;

        Http.request({
            url: config.sellerOrderDetail(orderSeq),
            method: "POST",
            success: function (res) {
                if(res.resultCode === "1") {
                    $scope.orderDetail = res.object[0];
                    $scope.orderDetail.quantity = ("" + $scope.orderDetail.quantityOne);
                    if($scope.orderDetail.unitOne !== null) {
                        $scope.orderDetail.quantity += ("个" +  $scope.orderDetail.unitOne);
                    }
                    if($scope.orderDetail.quantityTwo !== null) {
                        $scope.orderDetail.quantity += $scope.orderDetail.quantityTwo;
                    }
                    if($scope.orderDetail.unitTwo !== null) {
                        $scope.orderDetail.quantity += ("个" + $scope.orderDetail.quantityTwo);
                    }

                    $scope.orderDetail.createTime = Common.getDate($scope.orderDetail.orderSeq.substr(0, $scope.orderDetail.orderSeq.length - 4));
                } else {
                    layer.alert("请求失败,请刷新页面重试!");
                }
            },
            error: function (ex) {
                layer.alert("请求失败,请刷新页面重试!");
            }
        });
    }]);
