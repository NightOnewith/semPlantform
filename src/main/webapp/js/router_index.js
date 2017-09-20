var app = angular.module("myApp", ['ui.bootstrap', 'ngRoute']);

var transform = function (data) {
    return $.param(data);
};

var httpConfig = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    transformRequest: transform
};

var Calculate = {
    add: function (num1, num2) {
        var r1, r2, m;
        try {
            r1 = num1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = num2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return Math.round(num1 * m + num2 * m) / m;
    },

    sub: function (num1, num2) {
        var r1, r2, m, n;
        try {
            r1 = num1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = num2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return parseFloat((Math.round(num1 * m - num2 * m) / m).toFixed(n));
    },

    mul: function (num1, num2) {
        var m = 0, s1 = num1.toString(), s2 = num2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {
        }
        try {
            m += s2.split(".")[1].length
        } catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },

    div: function (num1, num2) {
        var t1, t2, r1, r2;
        try {
            t1 = num1.toString().split('.')[1].length;
        } catch (e) {
            t1 = 0;
        }
        try {
            t2 = num2.toString().split(".")[1].length;
        } catch (e) {
            t2 = 0;
        }
        r1 = Number(num1.toString().replace(".", ""));
        r2 = Number(num2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    }
};

app.run(['$rootScope', '$http', '$location', function ($rootScope, $http, $location) {

    $rootScope.isLogin = false;

    _ob.sub("user-info", function () {
        $rootScope.$apply(function () {
            if(!$.cookie("tiped")) {
                $http.get(config.centerinfo).success(function(res) {
                    if(res.resultCode === "1") {
                        if(res.object.provider.status !== "2") {
                            $rootScope.jumpLink = "/user-mgr/second-period/percenter.html#/providerReSubmit";
                            $rootScope.jumpLinkOrder = "/user-mgr/second-period/percenter.html#/providerReSubmit";
                        }
                        if(res.object.provider.status === "1" && res.object.provider.userType === "5") {
                            layer.confirm("您的资料审核不通过,是否立即重新申请?", function() {
                                layer.closeAll();
                                location.href = "/user-mgr/second-period/percenter.html#/providerReSubmit";
                                $.cookie("tiped", "true", {
                                    expires: 100
                                });
                            }, function() {
                                $.cookie("tiped", "true", {
                                    expires: 100
                                });
                                layer.closeAll();
                            });
                        }
                    }
                }).error(function(ex) {});
            }
        });
    });

    $rootScope.checkLogin = function (next) {
        $http.get(config.isLogin, {
            cache: false
        })
            .success(function (data) {
                $rootScope.isLogin = data.resultCode == 1;
                if($rootScope.isLogin) {
                    $(".logined-show").removeClass("hide").addClass("show");
                    $(".logined-hide").removeClass("show").addClass("hide");
                    $http.get(config.userInfo, {
                        cache: false
                    })
                        .success(function (data) {
                            if (data.resultCode == 1) {
                                $rootScope.myInfo = data.data;
                                switch (data.data.userType) {
                                    case 3:
                                        $rootScope.userType = "buyer";
                                        $http.get(config.getLoginInfo)
                                            .success(function(res) {
                                                if(res.resultCode === "1") {
                                                    $rootScope.shoppingCar = res.object.shoppingCar;
                                                    $rootScope.applications = res.object.applications;
                                                } else if(res.resultMsg) {
                                                    layer.alert(res.resultMsg);
                                                }
                                            })
                                            .error(function(ex) {});
                                        $rootScope.jumpLink = "/user-mgr/second-period/percenter.html#/buyerOrder/all";
                                        $rootScope.jumpLinkOrder = "/user-mgr/second-period/percenter.html#/buyerOrder/all";
                                        break;
                                    case 5:
                                        $rootScope.userType = "seller";
                                        $rootScope.jumpLink = "/user-mgr/second-period/percenter.html#/";
                                        $rootScope.jumpLinkOrder = "/user-mgr/second-period/percenter.html#/sellerOrderCenter";
                                        //  提示卖家认证信息
                                        break;
                                }
                                if (next && next.templateUrl === "account.html") {
                                    $rootScope.acnshow();
                                }
                            } else {
                            }
                        })
                        .error(function () {
                            console.log("服务器异常，请稍候再试");
                        });

                    $http.get(config.notPay, {
                        cache: false
                    })
                        .success(function (data) {
                            if (data.resultCode == 1) {
                                $rootScope.notPay = data.data
                            } else if(data.resultCode != -1) {
                                console.log(data.resultMsg);
                            }
                        })
                        .error(function () {
                            console.log("服务器异常，请稍候再试");
                        });
                } else {
                    $(".logined-show").removeClass("show").addClass("hide");
                    $(".logined-hide").removeClass("hide").addClass("show");
                }
            })
            .error(function () {
                console.log("服务器异常，请稍候再试");
            });
    };

    //应用超市八大块
    $http({
        url: config.productPreview,
        method: "POST"
    }).success(function(response) {
        if (response.resultCode=="1") {

            // $rootScope.productPreview = response.object;
            $rootScope.productPreview = [];
            angular.forEach(response.object, function (item) {
                if (item.sort && item.sort != null) {
                    $rootScope.productPreview.push(item);
                }
            });
        } else {
            $rootScope.productPreview = null;
            alert("产品加载异常："+response.resultMsg);
        }
    }).error(function(response) {
        $rootScope.productPreview = null;
        alert("产品加载异常");
    });

    //前往产品列表
    $rootScope.toProdList = function(prodTypeCd) {
        if (prodTypeCd==7) {
            window.location.href = "#/marketMenu";
        } else {
            window.location.href = "#/productList/" + prodTypeCd;
        }
    };

    //$rootScope.checkLogin();

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        console.log("run 运行");
        document.getElementsByTagName('body')[0].scrollTop = 0;

        var sliceIndex = 0,
        	maxLen = 0;

        $rootScope.topView = "common";

        $rootScope.isLogin = false;
        $(".logined-show").removeClass("show").addClass("hide");
        $(".logined-hide").removeClass("hide").addClass("show");

        $rootScope.loginSrc = config.host + config.portals + 'org/index';

        $rootScope.getSrc = config.host + config.portals + '/org/personalCenter';


        $rootScope.checkLogin(next);

        $rootScope.logout = function () {
            $http.get(config.toLogout)
                .success(function (data) {
                    $rootScope.isLogin = false;
                    $.removeCookie("tiped");
                    window.location.href = config.host + config.portals + "logout";
                    // location.href = config.host + config.portals;
                });
        };

    });

    $rootScope.$on("$routeChangeSuccess", function () {
        $(".alert_info").hide();
        $(window).scrollTop(0);
    });

}]);
app.factory("httpInterceotpr",["$rootScope" ,"$q" ,function($rootScope, $q) {
    return {
      request: function(config) {
        $rootScope.loading = true;
        return config;
      },
     requestError: function(rejection) {
        $rootScope.loading = false;
        return $q.reject(rejection);
      },
      response: function(response) {
        $rootScope.loading = false;
        if(response && response.data.resultCode === "-1") {
            $.removeCookie("tiped");
            // location.href = config.indexPath;
        }
        return response;
      },
     responseError: function(rejection) {
         if(rejection.status == 302) {
             // location.reload();
         }
        $rootScope.loading = false;
        return $q.reject(rejection);
      }
    };
}]);

app.config(['$routeProvider', '$locationProvider', "$httpProvider", function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            controller: 'homeCtrl',
            templateUrl: 'home.html'
        })
        .when("/cloud-resource/service", {
            controller: "cloudResourceServiceCtrl",
            templateUrl: "cloud-resource-service.html"
        })
        .when('/marketMenu', {
            controller: 'marketMenuCtrl',
            templateUrl: 'marketMenu.html'
        })
        .when("/productAdvantage", {
            controller: "productAdvantageCtrl",
            templateUrl: "productAdvantage.html"
        })
        .when("/thirdLevel", {
            controller: "thirdLevelCtrl",
            templateUrl: "thirdLevel.html"
        })
        .when("/fouthLevel", {
            controller: "fouthLevelCtrl",
            templateUrl: "fouthLevel.html"
        })
        .when("/fouthLevel/detail", {
            controller: "fouthLevelCtrl",
            templateUrl: "fouthLevel-detail.html"
        })
        .when("/fouthLevel/sunshine-buy", {
            controller: "fouthLevelCtrl",
            templateUrl: "fouthLevel-sunshine-buy.html"
        })
        .when("/solution", {
            controller: "solutionCtrl",
            templateUrl: "solution.html"
        })
        .when("/goverEnterprise", {
            controller: "goverEnterpriseCtrl",
            templateUrl: "goverEnterprise.html"
        })
        .when("/e/commerce", {
            controller: "eCommerceCtrl",
            templateUrl: "e-commerce.html"
        })
        .when("/detailOne", {
            controller: "detailOneCtrl",
            templateUrl: "detailOne.html"
        })
        .when("/detailTwo", {
            controller: "detailOneCtrl",
            templateUrl: "detailTwo.html"
        })
        .when("/detailThree", {
            controller: "detailOneCtrl",
            templateUrl: "detailThree.html"
        })
        .when("/detailFour", {
            controller: "detailOneCtrl",
            templateUrl: "detailFour.html"
        })
        .when("/detailFive", {
            controller: "detailOneCtrl",
            templateUrl: "detailFive.html"
        })
        .when("/detail/:id", {
            controller: "detailOneCtrl",
            templateUrl: "detail-common.html"
        })
        .when("/helpCenter", {
            controller: "helpCenterCtrl",
            templateUrl: "helpCenter.html"
        })
        .when("/helpUser", {
            controller: "helpCenterCtrl",
            templateUrl: "personal-user.htm"
        })
        .when("/helpAdmin", {
            controller: "helpCenterCtrl",
            templateUrl: "admin.htm"
        })
        .when("/introducePlantform", {
            controller: "helpCenterCtrl",
            templateUrl: "interduce.htm"
        })
        .when("/introducePatener", {
            controller: "helpCenterCtrl",
            templateUrl: "patener.htm"
        })
        .when("/noOmpetence", {
            controller: "",
            templateUrl: "no-ompetence.html"
        })
        .when("/productList/:prodTypeCd", {
            controller: "productListCtrl",
            templateUrl: "productList.html"
        })
        .when("/serviceDetail/:portletId", {
            controller: "serviceDetailCtrl",
            templateUrl: "serviceDetail.html"
        })
        .when("/preview", {
            controller: "previewDetailCtrl",
            templateUrl: "preview.html"
        })
        .when("/aboutUs", {
            templateUrl: "aboutUs.html"
        })
        .otherwise({
            redirectTo: '/'
        });
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    $httpProvider.defaults.headers.get["Cache-Control"] = "no-cache";
    $httpProvider.defaults.headers.get["Pragma"] = "no-cache";
    //$httpProvider.interceptors.push("httpInterceotpr");
}]);