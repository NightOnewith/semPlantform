
var helpApp = angular.module("helpApp", ['ui.bootstrap','ngRoute']);

var transform = function(data) {
    return $.param(data);
};

var httpConfig = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    transformRequest: transform
};

helpApp.run(['$rootScope', '$http', '$location' ,function($rootScope, $http, $location) {
    $rootScope.isLogin = false;

    $http.get(config.isLogin)
        .success(function(data) {
            if(data.resultCode == 1) {
                $rootScope.isLogin = true;
            }
        })
        .error(function() {
            console.log("服务器异常，请稍候再试");
        });
}]);

helpApp.config(['$routeProvider', '$locationProvider',function($routeProvider,$locationProvider) {
    $routeProvider
        .when('/', {
            controller: 'helpCtrl',
            templateUrl: 'help_cloudService.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);