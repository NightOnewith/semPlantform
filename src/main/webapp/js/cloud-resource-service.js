/**
 * 云资源服务
 */

"use strict";

var myApp = angular.module("myApp", ['ui.bootstrap'])
    .directive("imgScroller", function () {
        return {
            restrict: "A",
            link: function (scope, ele, attr) {
                ele = $(ele);
                var prev = ele.find("a.prev-btn"),
                    next = ele.find("a.next-btn"),
                    scroller = ele.find(".scroll-list"),
                    interal = null, left = 0, totalWidth;

                totalWidth = (scroller.find("li").eq(0).width() + 13) * scroller.find("li").length * 2;

                scroller.html(scroller.html() + scroller.html())
                    .css({
                        width: totalWidth
                    });

                interal = setInterval(function () {
                    left = parseInt(scroller.css("left"));
                    left = left - 2;
                    if((totalWidth / 2 + left) < 0) {
                        left = 0;
                    }
                    scroller.css({
                        left: left
                    });
                }, 30);

                ele.hover(function (e) {
                    clearInterval(interal);
                }, function (e) {
                    interal = setInterval(function () {
                        left = parseInt(scroller.css("left"));
                        left = left - 2;
                        if((totalWidth / 2 + left) < 0) {
                            left = 0;
                        }
                        scroller.css({
                            left: left
                        });
                    }, 30);
                });
            }
        };
    })
    .controller("cloudResourceServiceCtrl", ["$scope", "$http", function ($scope, $http) {
    }]);
