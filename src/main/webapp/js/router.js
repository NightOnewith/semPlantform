var personalApp = angular.module("personalApp", ['ui.bootstrap', 'ngRoute']);

var transform = function (data) {
    return $.param(data);
};

var httpConfig = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    transformRequest: transform
};

personalApp.run(['$rootScope', '$http', '$location', function ($rootScope, $http, $location) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {

        $rootScope.isLogin = false;

        $http.get(config.isLogin)
            .success(function (data) {
                if (data.resultCode == 1) {
                    $rootScope.isLogin = true;
                }
                if ($rootScope.isLogin) {
                    $http.get(config.myInfo)
                        .success(function (data) {
                            if (data.resultCode == 1) {
                                $rootScope.myInfo = data.data;
                                if (next.templateUrl === "account.html") {
                                    $rootScope.acnshow();
                                }

                            } else {
                                console.log(data.resultMsg);
                            }
                        })
                        .error(function () {
                            console.log("服务器异常，请稍候再试");
                        });

                    $http.get(config.notPay)
                        .success(function (data) {
                            if (data.resultCode == 1) {
                                $rootScope.notPay = data.data
                            } else {
                                console.log(data.resultMsg);
                            }
                        })
                        .error(function () {
                            console.log("服务器异常，请稍候再试");
                        });
                }
            })
            .error(function () {
                console.log("服务器异常，请稍候再试");
            });
    });
}]);

personalApp.config(['$routeProvider', '$locationProvider', "$httpProvider", function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            controller: 'accountCtrl',
            templateUrl: 'account.html'
        })
        .when('/child', {
            controller: 'childUserManageCtrl',
            templateUrl: 'childUserManage.html'
        })
        .when('/info', {
            controller: 'msgInfo',
            templateUrl: 'info.html'
        })
        .when('/myApps', {
            controller: 'myAppsCtrl',
            templateUrl: 'myApps.html'
        })
        .when('/order', {
            controller: 'orderCtrl',
            templateUrl: 'order.html'
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
}]);