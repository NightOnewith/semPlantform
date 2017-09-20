//var myApp = angular.module("myApp", ['ui.bootstrap']);
//var transform = function(data) {
//  return $.param(data);
//};
//var httpConfig = {
//  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
//  transformRequest: transform
//};
app.directive("imgScroller", ["$timeout", function ($timeout) {
    return {
        restrict: "A",
        link: function (scope, ele, attr) {
            $timeout(function () {
                if (scope.$last === true) {
                    var ele = $(ele).parent().parent().parent();
                    var prev = ele.find("a.prev-btn"),
                        next = ele.find("a.next-btn"),
                        scroller = ele.find(".scroll-list"),
                        interal = null, left = 45, totalWidth;

                    totalWidth = (scroller.find("li").eq(0).width() + 13) * scroller.find("li").length * 2;

                    scroller.html(scroller.html() + scroller.html())
                        .css({
                            "width": totalWidth
                        });

                    interal = setInterval(function () {
                        left = parseInt(scroller.css("left"));
                        left = left - 2;
                        if ((totalWidth / 2 + left) < 100) {
                            left = 45;
                        }
                        scroller.css({
                            left: left
                        });
                    }, 30);

                    prev.click(function () {
                        left = parseInt(scroller.css("left"));
                        left = left - 200;
                        if ((totalWidth / 2 + left) < 0) {
                            left = -totalWidth / 2 + 125;
                        }
                        scroller.css({
                            "-webkit-transition": "left 0.2s",
                            "-moz-transition": "left 0.2s",
                            "-ms-transition": "left 0.2s",
                            "-o-transition": "left 0.2s",
                            "transition": "left 0.2s",
                            "left": left
                        });
                        setTimeout(function () {
                            scroller.css({
                                "-webkit-transition": "left 0",
                                "-moz-transition": "left 0s",
                                "-ms-transition": "left 0s",
                                "-o-transition": "left 0s",
                                "transition": "left 0s"
                            });
                        }, 200);
                    });

                    next.click(function () {
                        left = parseInt(scroller.css("left"));
                        left = left + 200;
                        if (left > 0) {
                            left = 45;
                        }
                        scroller.css({
                            "-webkit-transition": "left 0.2s",
                            "-moz-transition": "left 0.2s",
                            "-ms-transition": "left 0.2s",
                            "-o-transition": "left 0.2s",
                            "transition": "left 0.2s",
                            left: left
                        });
                        setTimeout(function () {
                            scroller.css({
                                "-webkit-transition": "left 0",
                                "-moz-transition": "left 0s",
                                "-ms-transition": "left 0s",
                                "-o-transition": "left 0s",
                                "transition": "left 0s"
                            });
                        }, 200);
                    });

                    ele.hover(function (e) {
                        clearInterval(interal);
                    }, function (e) {
                        interal = setInterval(function () {
                            left = parseInt(scroller.css("left"));
                            left = left - 2;
                            if ((totalWidth / 2 + left) < 100) {
                                left = 45;
                            }
                            scroller.css({
                                left: left
                            });
                        }, 30);
                    });
                }
            }, 0);
        }
    };
}]);

app.directive("onFinishRender", function ($timeout) {
    return {
        restrict: "A",
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit("onFinishRender");
                });
            }
        }
    }
});

app.directive("countCtrl", function () {
    return {
        restrict: "E",
        template: "<div class='count-control'>" +
        "<a href='javascript:;' class='reduce-count'></a>" +
        "<input class='count-input-filed' value='1' />" +
        "<a href='javascript:;' class='add-count'></a>" +
        "</div>",
        link: function (scope, ele, attr) {
            ele = $(ele);

            var addBtn = ele.find("a.add-count"),
                reduceBtn = ele.find("a.reduce-count"),
                input = ele.find("input.count-input-filed"),
                bind = attr.bind,
                maxCount = scope[attr.maxCount] || attr.maxCount,
                callback = typeof scope[attr.callback] === "function" ? scope[attr.callback] : function () {
                },
                current = input.val(),
                index = ele.closest(".menu-item").attr("index"),
                marketMenu;

            if (current) {
                scope[bind] = current;
                callback();
            }

            if (index) {
                marketMenu = scope.marketMenu[index];
                callback(marketMenu, bind);
            }

            /**
             * 添加数量点击事件
             */
            addBtn.off("click").on("click", function (e) {
                current = parseInt(input.val());
                current = current + 1;
                if (current <= maxCount) {
                    input.val(current);
                    scope[bind] = current;
                    callback();
                }

                if (index) {
                    marketMenu = scope.marketMenu[index];
                    callback(marketMenu, bind);
                }
            });

            /**
             * 减少按钮点击事件
             */
            reduceBtn.off("click").on("click", function (e) {
                current = parseInt(input.val());
                current = current - 1;
                if (current > 0) {
                    input.val(current);
                    scope[bind] = current;
                    callback();
                }

                if (index) {
                    marketMenu = scope.marketMenu[index];
                    callback(marketMenu, bind);
                }
            });

            /**
             * 输入框输入事件
             */
            input.on("keyup", function (e) {
                current = input.val();
                if (!/^\d+$/.test(current)) {
                    current = parseInt(current);
                    if (isNaN(current)) {
                        current = 0;
                    }
                    input.val(current);
                }
                scope[bind] = current;
                callback();

                if (index) {
                    marketMenu = scope.marketMenu[index];
                    callback(marketMenu, bind);
                }
            });

            scope.$watch(bind, function(newV) {
                input.val(newV);
                callback();
            });
        }
    };
});

//时间毫秒转yyyy-MM-dd HH:mm:ss
app.filter('timemiliFormat', function () {
    return function (val) {
        var time = new Date(parseInt(val));
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var date = time.getDate();
        if (date < 10) {
            date = "0" + date;
        }
        var hour = time.getHours();
        if (hour < 10) {
            hour = "0" + hour;
        }
        var minute = time.getMinutes();
        if (minute < 10) {
            minute = "0" + minute;
        }
        var second = time.getSeconds();
        if (second < 10) {
            second = "0" + second;
        }
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    };
});

//长文本美化
app.filter('longTextBeautify', function () {
    return function (text, limitLength) {
        if (text.length > limitLength) {
            text = text.substring(0, limitLength-1) + "..";
        }
        return text;
    };
});

app.controller("indexCtrl", function ($rootScope, $scope, $http) {

    $scope.initScroll = function () {
        if ($(document).scrollTop() != 0) {
            $(".login_tag").stop().animate({"height": 0}, 400);
            $("#header").addClass("shadow");
        }
        var scrollHideFlag = true;
        $(window).scroll(function () {
            if (scrollHideFlag && $(document).scrollTop() != 0) {
                scrollHideFlag = false;
                $(".login_tag").stop().animate({"height": 0}, 400, function () {
                    scrollHideFlag = true;
                    $("#header").addClass("shadow");
                });
            }

            if ($(document).scrollTop() == 0) {
                scrollHideFlag = false;
                $(".login_tag").stop().animate({"height": "50px"}, 400, function () {
                    scrollHideFlag = true;
                    $("#header").removeClass("shadow");
                });
            }

        });
    }

    $('#close_im').bind('click', function () {
        $('#main-im').css("height", "0");
        $('#im_main').hide();
        $('#open_im').show();
    });
    $('#open_im').bind('click', function () {
        $('#main-im').css("height", "272");
        $('#im_main').show();
        $(this).hide();
    });
    $('.go-top').bind('click', function () {
        $(window).scrollTop(0);
    });

    //  加载滚动样式
    $scope.initScroll();

    // 鼠标移动到菜单触发事件
    $scope.showMenu = function (e) {
//      $(e.target).addClass("focus");
        $(e.target).find(".alert_info").show();
        $(e.target).siblings().find(".alert_info").hide();
//      if($(e.target).find(".alert_info").hasClass("alert_6")) {
//          return;
//      }
//      $(e.target).find(".alert_info").css({"left":-parseInt($(e.target).find(".alert_info").width())/2 + "px"})
//      $(e.target).find(".alert_arrow").css({"left":parseInt($(e.target).find(".alert_info").width())/2 + "px"});
    }


    $scope.hideMenu = function (num, e) {
        if (num == 1) {
            $(e.target).find(".alert_info").hide();
        } else {
            $(e.target).closest(".alert_info").hide();
        }
//      $(e.target).removeClass("focus");
    }
})
    .controller("homeCtrl", ["$rootScope", "$scope", "$http", function ($rootScope, $scope, $http) {

        $rootScope.focus = 0;

        $http.post(config.pageUrl("SY")).success(function (response) {
            if (response.resultCode==1) {
                //轮播图
                $("#banner .bd img").width($(window).width());
                $scope.carousels = response.object.carousels;
                setTimeout(function () {
                    $('#banner').slide({
                        slideCell: "#banner",
                        titCell: ".hd ul",
                        mainCell: ".bd ul",
                        autoPlay: true,
                        autoPage: true,
                        interTime: 4000,
                        switchLoad: "_src"
                    });
                }, 1000);
                //畅销产品
                $scope.well_sell = [];
                if (response.object.modules!=null) {
                    for (var n=0;n<response.object.modules.length;n++) {
                        if (response.object.modules[n].moduleCode=="TJCP") {
                            $scope.moduleName = response.object.modules[n].moduleName;
                            $scope.well_sell = response.object.modules[n].portlets;
                            break;
                        }
                    }
                }
            } else {
                alert("畅销产品加载失败：" + response.resultMsg);
            }
        }).error(function (e) {
            alert("畅销产品加载异常：" + e);
        });

        //前往详情页
        $scope.toDetail = function (p) {
            if (p.contentSource == 0) {
                return;
            } else if (p.contentSource == 1) {
                window.open(p.linksUrl);
            } else if (p.contentSource == 2) {
                window.open("#/serviceDetail/" + p.portletId + "?menuId=" + $rootScope.focus);
            }
        };


        /*$scope.entermall = function() {
         window.location.href = config.host + config.portals + 'mall/index.html'
         };
         $scope.enterb2b= function() {
         window.location.href = config.host + config.portals + 'third/login/36/64'
         };*/
        $scope.changeMyInfo = function () {
            window.location.href = 'personalCenter.html#'
        };

        $('#erp_buy').on('click', function () {
            $('.erp_moudle').show();
            showMask();
        })
        $('#b2b_buy').on('click', function () {
            $('.b2b_moudle').show();
            showMask();
        })

        $('.modal_close_btn').on('click', function () {
            $('.erp_moudle').hide();
            $('.b2b_moudle').hide();
            hideMask();
        })
        $(".index .buy_moudle ul li .buy_moudle_top").on('click', function () {
            $(this).parent('li').toggleClass('on');
            var ison = $(this).parent('li').hasClass('on');
            ison ? $(this).parent('li').find('button').attr('disabled', false) : $(this).parent('li').find('button').attr('disabled', true);
        })

        $scope.erpModule = function () {
            $scope.buyParams = {};
            var records = [];
            if ($(".li-bd1").hasClass('on')) {
                var libtn1 = $('.li-bd1').find('.buy_moudle_bottom .btn-group button');
                records.push({
                    prodId: 1,
                    prodName: '采购管理系统',
                    prodSaleAttrId: '1',
                    quantity: libtn1.find('input[name="erpnum"]').data('id'),
                    expiryDate: libtn1.find('input[name="erpyxq"]').data('id')
                });
            }
            if ($(".li-bd2").hasClass('on')) {
                var libtn2 = $('.li-bd2').find('.buy_moudle_bottom .btn-group button');
                records.push({
                    prodId: 2,
                    prodName: '销售管理系统',
                    prodSaleAttrId: '2',
                    quantity: libtn2.find('input[name="erpnum"]').data('id'),
                    expiryDate: libtn2.find('input[name="erpyxq"]').data('id')
                });
            }
            if ($(".li-bd3").hasClass('on')) {
                var libtn3 = $('.li-bd3').find('.buy_moudle_bottom .btn-group button');
                records.push({
                    prodId: 3,
                    prodName: '财务管理系统',
                    prodSaleAttrId: '3',
                    quantity: libtn3.find('input[name="erpnum"]').data('id'),
                    expiryDate: libtn3.find('input[name="erpyxq"]').data('id')
                });
            }
            if ($(".li-bd4").hasClass('on')) {
                var libtn4 = $('.li-bd4').find('.buy_moudle_bottom .btn-group button');
                records.push({
                    prodId: 4,
                    prodName: '成本管理系统',
                    prodSaleAttrId: '4',
                    quantity: libtn4.find('input[name="erpnum"]').data('id'),
                    expiryDate: libtn4.find('input[name="erpyxq"]').data('id')
                });
            }
            if ($(".li-bd5").hasClass('on')) {
                var libtn5 = $('.li-bd5').find('.buy_moudle_bottom .btn-group button');
                records.push({
                    prodId: 5,
                    prodName: '设备管理系统',
                    prodSaleAttrId: '5',
                    quantity: libtn5.find('input[name="erpnum"]').data('id'),
                    expiryDate: libtn5.find('input[name="erpyxq"]').data('id')
                });
            }
            if ($(".li-bd6").hasClass('on')) {
                var libtn6 = $('.li-bd6').find('.buy_moudle_bottom .btn-group button');
                records.push({
                    prodId: 6,
                    prodName: '固定资产管理系统',
                    prodSaleAttrId: '6',
                    quantity: libtn6.find('input[name="erpnum"]').data('id'),
                    expiryDate: libtn6.find('input[name="erpyxq"]').data('id')
                });
            }
            if ($(".li-bd7").hasClass('on')) {
                var libtn7 = $('.li-bd7').find('.buy_moudle_bottom .btn-group button');
                records.push({
                    prodId: 7,
                    prodName: '生产管理系统',
                    prodSaleAttrId: '7',
                    quantity: libtn7.find('input[name="erpnum"]').data('id'),
                    expiryDate: libtn7.find('input[name="erpyxq"]').data('id')
                });
            }
            if ($(".li-bd8").hasClass('on')) {
                var libtn8 = $('.li-bd8').find('.buy_moudle_bottom .btn-group button');
                records.push({
                    prodId: 8,
                    prodName: '质量管理系统',
                    prodSaleAttrId: '8',
                    quantity: libtn8.find('input[name="erpnum"]').data('id'),
                    expiryDate: libtn8.find('input[name="erpyxq"]').data('id')
                });
            }
            if ($(".li-bd9").hasClass('on')) {
                var libtn9 = $('.li-bd9').find('.buy_moudle_bottom .btn-group button');
                records.push({
                    prodId: 9,
                    prodName: '能耗管理系统',
                    prodSaleAttrId: '9',
                    quantity: libtn9.find('input[name="erpnum"]').data('id'),
                    expiryDate: libtn9.find('input[name="erpyxq"]').data('id')
                });
            }

            for (var i = 0; i < records.length; i++) {
                $scope.buyParams['records[' + i + '].prodId'] = records[i].prodId;
                $scope.buyParams['records[' + i + '].prodName'] = records[i].prodName;
                $scope.buyParams['records[' + i + '].prodSaleAttrId'] = records[i].prodSaleAttrId;
                $scope.buyParams['records[' + i + '].quantity'] = records[i].quantity;
                $scope.buyParams['records[' + i + '].expiryDate'] = records[i].expiryDate;
            }

            $http.get(config.isLogin)
                .success(function (data) {
                    $scope.isLogin = data.resultCode == 1;
                    if ($scope.isLogin) {
                        $http.post(config.buyAgain, $scope.buyParams, httpConfig)
                            .success(function (data) {
                                if (data.resultCode == 1) {
                                    alert(data.resultMsg);
                                    location.reload();
                                }
                            })
                            .error(function () {
                                alert("服务器异常，请稍候再试");
                            });
                    }
                    else {
                        alert('请先登录');
                    }
                })
                .error(function () {
                    alert("服务器异常，请稍候再试");
                });
        }

        $scope.b2bModule = function () {
            $scope.buyParams = {};
            var records = [];
            if ($(".li-bd10").hasClass('on')) {
                var libtn10 = $('.li-bd10').find('.buy_moudle_bottom .btn-group button');
                records.push({
                    prodId: 36,
                    prodName: 'B2B',
                    prodSaleAttrId: '64',
                    quantity: libtn10.find('input[name="erpnum"]').data('id'),
                    expiryDate: libtn10.find('input[name="erpyxq"]').data('id')
                });
            }
            for (var i = 0; i < records.length; i++) {
                $scope.buyParams['records[' + i + '].prodId'] = records[i].prodId;
                $scope.buyParams['records[' + i + '].prodName'] = records[i].prodName;
                $scope.buyParams['records[' + i + '].prodSaleAttrId'] = records[i].prodSaleAttrId;
                $scope.buyParams['records[' + i + '].quantity'] = records[i].quantity;
                $scope.buyParams['records[' + i + '].expiryDate'] = records[i].expiryDate;
            }

            $http.get(config.isLogin)
                .success(function (data) {
                    $scope.isLogin = data.resultCode == 1;
                    if ($scope.isLogin) {
                        $http.post(config.buyAgain, $scope.buyParams, httpConfig)
                            .success(function (data) {
                                if (data.resultCode == 1) {
                                    alert(data.resultMsg);
                                    location.reload();
                                }
                            })
                            .error(function () {
                                alert("服务器异常，请稍候再试");
                            });
                    }
                    else {
                        alert('请先登录');
                    }
                })
                .error(function () {
                    alert("服务器异常，请稍候再试");
                });
        }
        /* 创建全屏透明背景层*/
        function showMask() {
            if ($(".mask").length > 0) {
                $(".mask").show();
                return;
            }
            $('<div class="mask"></div>').appendTo("body").css({
                'width': $(document).width(),
                'height': $(document).height(),
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'z-index': 1,
                'opacity': 0.7,
                'filter': 'Alpha(Opacity = 70)',
                'backgroundColor': '#000'
            });
        }

        /* 隐藏全屏透明背景层 */
        function hideMask() {
            if ($(".mask").length > 0) {
                $(".mask").hide();
                return;
            }
        }

        $('.dropdown-menu').delegate('li', 'click', function (event) {
            event.preventDefault();
            var xzc = $(this).parent().siblings('.dropdown-toggle').children('.xz-content');
            xzc.val($(this).find('a').html());
            xzc.attr('data-id', $(this).attr('data-id'));
        });

    }])
    .controller("marketMenuCtrl", function ($rootScope, $scope, $http) {
        var data, tmp;
        $scope.marketMenu = [];
        $http.get(config.queryOnStockProdList + "&prodTypeCd=7")
            .success(function (res) {
                if (res.resultCode == 1) {
                    data = res.object;
                    angular.forEach(data, function (item) {
                        $scope.marketMenu.push({
                            src: item.url,
                            title: item.prodName,
                            content: item.saleAttrList[0].description,
                            probation: item.trialTime,
                            price: item.saleAttrList[0].price + " " + item.saleAttrList[0].priceUnit,
                            saleAttr: item.saleAttrList[0],
                            link: "#/detail/" + item.prodId,
                            checked: false,
                            id: item.prodId,
                            year: 0,
                            num: 0,
                            total: "0.00",
                            prodPicsList: item.prodPicsList
                        });
                    });

                    angular.forEach($scope.marketMenu, function (item, index) {
                        angular.forEach(item.prodPicsList, function (item) {
                            if (item.picType == 1) {
                                $scope.marketMenu[index].src = item.picsUrl;
                            }
                        });
                    });
                }
            })
            .error(function (ex) {
            });

        $scope.checkHole = false;

        $scope.checkAll = function () {
            angular.forEach($scope.marketMenu, function (menu) {
                menu.checked = !$scope.checkHole;
                if (menu.checked && !(menu.unit instanceof Array)) {
                    $http.get(config.getUntisDetail(menu.saleAttr.saleCombiAttr)).success(function (res) {
                        if (res.resultCode === "1") {
                            menu.unit = res.object;
                        }
                    }).error(function (ex) {
                    });
                }
            });
        };

        $scope.checkOne = function (index) {
            var cur = $scope.marketMenu[index];
            $scope.marketMenu[index].checked = !$scope.marketMenu[index].checked;
            if (!$scope.marketMenu[index].checked) {
                $scope.marketMenu[index].num = 0;
                $scope.marketMenu[index].year = 0;

                if (Number($scope.marketMenu[index].total) > 0) {
                    $scope.tt = Calculate.sub($scope.tt, cur.total);
                }

                $scope.marketMenu[index].total = "0.00";
            }

            if (cur.checked && !(cur.unit instanceof Array)) {
                $http.get(config.getUntisDetail(cur.saleAttr.saleCombiAttr)).success(function (res) {
                    if (res.resultCode === "1") {
                        cur.unit = res.object;
                    }
                }).error(function (ex) {
                });
            }
        }

        $scope.getSale = function (m) {
            if (m.year == 0 || m.num == 0) {
                m.total = "0.00";
                $scope.totalSale();
                return;
            }
            var obj = {
                "shopCount[0].prodId": m.id,
                "shopCount[0].saleCombiAttr": m.id,
                "shopCount[0].quantity": m.year,
                "shopCount[0].amount": m.num
            };
            $http.post(config.counterSelectProd, obj, httpConfig).success(function (response) {
                m.total = response.object;
                $scope.totalSale();
                $scope.changeList();
            });
        }

        // 计算总价
        $scope.tt = 0.00;
        $scope.totalSale = function () {
            $scope.tt = 0.00;
            angular.forEach($scope.marketMenu, function (g, i) {
                if (g.checked) {
                    $scope.tt = Calculate.add($scope.tt, parseFloat(g.total));
                }
            });
        }

        $scope.selectYear = function (x, m) {
            if (x.length == 0) {
                x = 0;
                m.total = "0.00";
            }
            m.year = x;
            $scope.getSale(m);

        }

        $scope.selectNum = function (y, m) {
            if (y.length == 0) {
                y = 0;
                m.total = "0.00";
            }
            m.num = y;
            $scope.getSale(m);
        }

        $scope.cList = [];
        $scope.changeList = function () {
            $scope.cList = [];
            angular.forEach($scope.marketMenu, function (g, i) {
                if (g.checked && (g.year != 0 && g.num != 0)) {
                    $scope.cList.push(g);
                }
            });
        }

        $scope.callback = function (menu, bind) {

            prodId = $("[name='orders[0].order.prodId']").val();
            prodSaleAttrId = $("[name='orders[0].order.prodSaleAttrId']").val()
            if ($scope.x && $scope.x != $scope.sYears) {
                $scope.sYears = $scope.x;
                $scope.selectYear($scope.x, prodId, prodSaleAttrId);
            }
            if ($scope.y && $scope.y != $scope.sNum) {
                $scope.sNum = $scope.y;
                $scope.selectNum($scope.y, prodId, prodSaleAttrId);
            }
        };

        $scope.buyNow = function () {
            if (!$rootScope.isLogin) {
                window.location.href = config.host + "user-mgr/org/index";
                return;
            }
            if ($rootScope.userType === "seller") {
                location.hash = "noOmpetence";
                return;
            }
            if ($scope.cList.length == 0) {
                return;
            }
            $("#buyForm").attr("action", config.createNewOrder);
            document.getElementById("buyForm").submit();
            /*var obj = {};
             $(".bm_menu").find("li").each(function(i,g) {
             obj["orders[" + i + "].order.prodId"] = $(this).attr("proid");
             obj["orders[" + i + "].order.prodSaleAttrId"] = $(this).attr("proid");
             obj["orders[" + i + "].order.quantity"] = $(this).attr("yid");
             obj["orders[" + i + "].order.amounts"] = $(this).attr("nid");
             });*/
            /*$http.post(config.createNewOrder,obj, httpConfig).success(function (response) {
             if(response.resultCode != 1) {
             return;
             }
             alert(response.resultMsg);
             });*/
        }

        $scope.tryNow = function () {
            if (!$rootScope.isLogin) {
                window.location.href = config.host + "user-mgr/org/index";
                return;
            }
            if ($rootScope.userType === "seller") {
                location.hash = "noOmpetence";
                return;
            }
            var obj = {};
            angular.forEach($scope.cList, function (g, i) {
                obj["orders[" + i + "].order.prodId"] = g.id;
                obj["orders[" + i + "].order.saleCombiAttr"] = g.id;
                obj["orders[" + i + "].order.quantity"] = g.year;
                obj["orders[" + i + "].order.amounts"] = g.num;
            });

            $http.post(config.checkTrialOrders, obj, httpConfig).success(function (response) {
                if (response.resultCode != 1) {
                    layer.alert(response.resultMsg);
                    return;
                }
                $("#tryForm").attr("action", config.createTrialOrders);
                document.getElementById("tryForm").submit();
            });


            /*var obj = {};
             $(".bm_menu").find("li").each(function(i,g) {
             obj["orders[" + i + "].order.prodId"] = $(this).attr("proid");
             obj["orders[" + i + "].order.prodSaleAttrId"] = $(this).attr("proid");
             });
             $http.post(config.createTrialOrders,obj, httpConfig).success(function (response) {
             if(response.resultCode != 1) {
             return;
             }
             alert(response.resultMsg);
             });*/
        }

        $scope.$watchCollection("marketMenu", function (newV, oldV) {

        });

    })
    .controller("cloudResourceServiceCtrl", ["$rootScope", "$scope", "$http", function ($rootScope, $scope, $http) {
        $rootScope.focus = 3;

        $scope.$on("onFinishRender", function () {
            $("#scroller li.scroll-item").each(function () {
                initScroller(this);
            });
        });

        function initScroller(el) {
            var ele = $(el).parent().parent().parent();
            var prev = ele.find("a.prev-btn"),
                next = ele.find("a.next-btn"),
                scroller = ele.find(".scroll-list"),
                interal = null, left = 45, totalWidth;

            totalWidth = (scroller.find("li").eq(0).width() + 13) * scroller.find("li").length * 2;

            scroller.html(scroller.html() + scroller.html())
                .css({
                    "width": totalWidth
                });

            interal = setInterval(function () {
                left = parseInt(scroller.css("left"));
                left = left - 2;
                if ((totalWidth / 2 + left) < 100) {
                    left = 45;
                }
                scroller.css({
                    left: left
                });
            }, 30);

            prev.click(function () {
                left = parseInt(scroller.css("left"));
                left = left - 200;
                if ((totalWidth / 2 + left) < 0) {
                    left = -totalWidth / 2 + 125;
                }
                scroller.css({
                    "-webkit-transition": "left 0.2s",
                    "-moz-transition": "left 0.2s",
                    "-ms-transition": "left 0.2s",
                    "-o-transition": "left 0.2s",
                    "transition": "left 0.2s",
                    "left": left
                });
                setTimeout(function () {
                    scroller.css({
                        "-webkit-transition": "left 0",
                        "-moz-transition": "left 0s",
                        "-ms-transition": "left 0s",
                        "-o-transition": "left 0s",
                        "transition": "left 0s"
                    });
                }, 200);
            });

            next.click(function () {
                left = parseInt(scroller.css("left"));
                left = left + 200;
                if (left > 0) {
                    left = 45;
                }
                scroller.css({
                    "-webkit-transition": "left 0.2s",
                    "-moz-transition": "left 0.2s",
                    "-ms-transition": "left 0.2s",
                    "-o-transition": "left 0.2s",
                    "transition": "left 0.2s",
                    left: left
                });
                setTimeout(function () {
                    scroller.css({
                        "-webkit-transition": "left 0",
                        "-moz-transition": "left 0s",
                        "-ms-transition": "left 0s",
                        "-o-transition": "left 0s",
                        "transition": "left 0s"
                    });
                }, 200);
            });

            ele.hover(function (e) {
                clearInterval(interal);
            }, function (e) {
                interal = setInterval(function () {
                    left = parseInt(scroller.css("left"));
                    left = left - 2;
                    if ((totalWidth / 2 + left) < 100) {
                        left = 45;
                    }
                    scroller.css({
                        left: left
                    });
                }, 30);
            });
        }

        $('#banner .bd img').width($(window).width());

        setTimeout(function () {
            $('#banner').slide({
                slideCell: "#banner",
                titCell: ".hd ul",
                mainCell: ".bd ul",
                autoPlay: true,
                autoPage: true,
                interTime: 4000,
                switchLoad: "_src"
            });
        }, 1000);
        //主体区块

        $http.post(config.pageUrl("YZYFW")).success(function (response) {

            if (response.resultCode == 1) {
                //轮播图
                $scope.sliders = response.object.carousels;
                setTimeout(function () {
                    $('#banner').slide({
                        slideCell: "#banner",
                        titCell: ".hd ul",
                        mainCell: ".bd ul",
                        autoPlay: true,
                        autoPage: true,
                        interTime: 4000,
                        switchLoad: "_src"
                    });
                }, 1000);
                //主体区块
                $scope.modules = response.object.modules;
            } else {
                alert("云资源服务加载失败：" + response.resultMsg);
            }
        }).error(function (e) {
            alert("云资源服务加载异常：" + e);
        });

        //前往详情页
        $scope.toDetail = function (p) {
            if (p.contentSource == 0) {
                return;
            } else if (p.contentSource == 1) {
                window.open(p.linksUrl);
            } else if (p.contentSource == 2) {
                window.open("#/serviceDetail/" + p.portletId + "?menuId=" + $rootScope.focus);
            }
        };

    }])
    .controller("productAdvantageCtrl", function ($rootScope, $scope) {
        $rootScope.focus = 1;
        //$(".advantage_box_circle").mouseover(function () {
        //    $(this).addClass('animated swing');
        //});
        //$(".advantage_box_circle").mouseleave(function () {
        //    $(this).removeClass('animated swing');
        //});
        $scope.toProdList = function(prodTypeCd) {
            if (prodTypeCd==7) {
                window.location.href = "#/marketMenu";
            } else {
                window.location.href = "#/productList/" + prodTypeCd;
            }
        };

    })
    .controller("thirdLevelCtrl", function ($scope, $http) {

    })
    .controller("solutionCtrl", ["$rootScope", "$scope", "$http", function ($rootScope, $scope, $http) {
        $rootScope.focus = 6;

        $('#banner .bd img').width($(window).width());

        $http.post(config.pageUrl("JJFA")).success(function (res) {
            $scope.carousels = res.object.modules;
            $scope.sliders = res.object.carousels;

            setTimeout(function () {
                // 滑动滚屏
                $('#banner').slide({
                    slideCell: "#banner",
                    titCell: ".hd ul",
                    mainCell: ".bd ul",
                    autoPlay: true,
                    autoPage: true,
                    interTime: 4000,
                    switchLoad: "_src"
                });
            }, 3000);
        }).error(function (ex) {
        });

        $scope.showContent = function (id) {
            window.open("#/serviceDetail/" + id + "?menuId=" + $rootScope.focus);
        }
    }])
    .controller("eCommerceCtrl", ["$rootScope", "$scope", function ($rootScope, $scope) {
        $rootScope.focus = 2;
    }])
    .controller("fouthLevelCtrl", function ($scope, $http) {
        $('.prodDetail .mainCon .productInfo .typeItem').click(function (event) {
            $('.prodDetail .mainCon .productInfo .typeItem').removeClass('on');
            $(this).addClass('on');
        });
    })
    .controller("goverEnterpriseCtrl", function ($rootScope, $scope, $http) {
        $rootScope.focus = 5;
        $('.govSlide').slide();
        $(".fair-item").each(function () {
            $(this).hover(function () {
                $(this).css({
                    zIndex: 100
                }).siblings(".fair-item").css({
                    zIndex: 0
                }).end().addClass("hover");
            }, function () {
                $(this).css({
                    zIndex: 0
                }).removeClass("hover");
            });
        });

        $http.post(config.pageUrl("ZQFW")).success(function (response) {
            if (response.resultCode == 1) {
                //模块
                $scope.modules = response.object.modules;
                //轮播
                $scope.sliders = response.object.carousels;
                setTimeout(function () {
                    $('#banner').slide({
                        slideCell: "#banner",
                        titCell: ".hd ul",
                        mainCell: ".bd ul",
                        autoPlay: true,
                        autoPage: true,
                        interTime: 4000,
                        switchLoad: "_src"
                    });
                }, 1000);
            } else {
                alert("政企服务加载失败：" + response.resultMsg);
            }
        }).error(function (e) {
            alert("政企服务加载异常：" + e);
        });

        //前往详情
        $scope.toDetail = function (p) {
            if (p.contentSource == 0) {
                return;
            } else if (p.contentSource == 1) {
                window.open(p.linksUrl);
            } else if (p.contentSource == 2) {
                window.open("#/serviceDetail/" + p.portletId + "?menuId=" + $rootScope.focus);
            }
        };

    })
    .controller("detailOneCtrl", function ($scope, $rootScope, $routeParams, $http, $sce) {

        $scope.prodId = $routeParams.id;
        $scope.isERP = false;

        if ($scope.prodId >= 1 && $scope.prodId <= 9) {
            $scope.type = "simple";
            $scope.isERP = true;
        } else {
            $scope.type = "complex";
        }

        /**
         * 商品详情
         */
        $http.get(config.getProductShelfInfo + "?prodId=" + $scope.prodId)
            .success(function (res) {
                if (res.resultCode == "1") {
                    $scope.goodDetail = res.object[0].productShelfDTOList[0];
                    $scope.goodDetail.mainPic = "";
                    $scope.goodDetail.subPics = [];
                    angular.forEach($scope.goodDetail.picsList, function (pic) {
                        switch (pic.picType) {
                            case 1:
                                $scope.goodDetail.mainPic = pic.picsUrl;
                                break;
                            case 2:
                                $scope.goodDetail.subPics.push(pic.picsUrl);
                                break;
                        }
                    });
                    angular.forEach($scope.goodDetail.saleAttrList, function (attr, index) {
                        switch (index) {
                            case 0:
                                attr.checked = true;
                                $scope.goodDetail.current = attr;
                                $scope.prodSaleAttrId = attr.prodSaleAttrId;

                                $http.get(config.getUntisDetail($scope.goodDetail.current.saleCombiAttr)).success(function (res) {
                                    if (res.resultCode === "1") {
                                        $scope.unit = res.object;
                                        if ($scope.unit.length === 1) {
                                            $scope.unit[0].detUnit =  $scope.unit[0].detUnit + "/件";
                                            $scope.type = "simple";
                                        }
                                    }
                                }).error(function (ex) {
                                });

                                var obj = {
                                    "shopCount[0].prodId": $scope.prodId,
                                    "shopCount[0].saleCombiAttr": $scope.goodDetail.current.saleCombiAttr,
                                    "shopCount[0].quantity": $scope.sYears,
                                    "shopCount[0].amount": $scope.sNum
                                };
                                $http.post(config.counterSelectProd, obj, httpConfig).success(function (response) {
                                    $scope.total = response.object;
                                });

                                break;
                            default:
                                attr.checked = false;
                                break;
                        }
                    });
                    //详情html
                    $scope.detailDesc = $sce.trustAsHtml($scope.goodDetail.url);
                }
            });
        $scope.sYears = 0;
        $scope.sNum = 0;
        $scope.total = "0.00"
        $scope.chooseType = function (index) {
            angular.forEach($scope.goodDetail.saleAttrList, function (attr, _index) {
                if (_index === index) {
                    $scope.goodDetail.current = attr;
                    attr.checked = true;
                } else {
                    attr.checked = false;
                }
            });
        };

        $scope.selectYear = function (x, id, attid) {
            if (x.length == 0) {
                x = 0;
            }
            $scope.sYears = x;
            $scope.getSale(id, attid);
        }

        $scope.selectNum = function (y, id, attid) {
            if (y.length == 0) {
                y = 0;
            }
            $scope.sNum = y;
            $scope.getSale(id, attid);
        }

        $scope.sid = "";
        $scope.sattid = "";

        $scope.initId = function (num) {
        }

        $scope.getSale = function (id, attid) {
            if (!$scope.goodDetail) {
                return;
            }
            if ($scope.sYears == 0 || $scope.sNum == 0) {
                $scope.total = "0.00";
                return;
            }
            var obj = {
                "shopCount[0].prodId": $scope.prodId,
                "shopCount[0].saleCombiAttr": $scope.goodDetail.current.saleCombiAttr,
                "shopCount[0].quantity": $scope.sYears,
                "shopCount[0].amount": $scope.sNum
            };
            $http.post(config.counterSelectProd, obj, httpConfig).success(function (response) {
                $scope.total = response.object;
            });
        }

        $scope.buyNow = function () {
            if (!$rootScope.isLogin) {
                window.location.href = config.host + "user-mgr/org/index";
                return;
            }
            if ($rootScope.userType === "seller") {
                location.hash = "noOmpetence";
                return;
            }
            if ($scope.sYears == 0 || $scope.sNum == 0) {
                return;
            }

            var requestUrl = config.shopCartCheck
                + "?productList[0].prodId=" + $scope.prodId
                + "&productList[0].saleAttrId=" + $scope.goodDetail.current.saleCombiAttr
                + "&productList[0].quantity=" + $("#buyForm").find("[name='orders[0].order.quantity']").val();
            $http.post(requestUrl).success(function (response) {
                if (response.resultCode==1) {
                    $("#buyForm").find("[name='orders[0].order.prodId']").val($scope.prodId);
                    $("#buyForm").find("[name='orders[0].order.saleCombiAttr']").val($scope.goodDetail.current.saleCombiAttr);
                    $("#buyForm").attr("action", config.createNewOrder);
                    document.getElementById("buyForm").submit();
                } else {
                    layer.alert("购买失败："+response.resultMsg);
                }
            }).error(function (e) {
                layer.alert("网络异常!请刷新页面重试!");
            });
        };

        //试用
        $scope.trialSuccess = false;
        $scope.tryNow = function () {
            if (!$rootScope.isLogin) {
                window.location.href = config.host + "user-mgr/org/index";
                return;
            }
            if ($rootScope.userType === "seller") {
                location.hash = "noOmpetence";
                return;
            }
            var obj = {
                "orders[0].order.prodId": $scope.prodId,
                "orders[0].order.saleCombiAttr": $scope.goodDetail.current.saleCombiAttr
            };

            $http.post(config.checkTrialOrders, obj, httpConfig).success(function (response) {
                if (response.resultCode != 1) {
                    layer.alert(response.resultMsg);
                    return;
                }

                //$("#tryForm").find("[name='orders[0].order.prodId']").val($scope.prodId);
                //$("#tryForm").find("[name='orders[0].order.saleCombiAttr']").val($scope.goodDetail.current.saleCombiAttr);
                //$("#tryForm").attr("action", config.createTrialOrders);
                //document.getElementById("tryForm").submit();

                $http.post(config.createTrialOrders, obj, httpConfig).success(function (response) {
                    if (response.resultCode==1) {
                        $scope.trialSuccess = true;
                    } else {
                        layer.alert(response.resultMsg);
                    }
                });
            });
        };

        $scope.createCar = function () {
            if (!$rootScope.isLogin) {
                window.location.href = config.host + "user-mgr/org/index";
                return;
            }

            var obj = {
                "prodId": $scope.prodId,
                "saleCombiAttr": $scope.goodDetail.current.saleCombiAttr,
                "quantity": $scope.sYears
            };
            if ($scope.type !== "simple") {
                obj["amounts"] = $scope.sNum;
            }
            var url = config.createShopCart + "?";
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    url += i + "=" + encodeURI(obj[i]) + "&";
                }
            }
            url = url.replace(/\&$/, "");
            $http.get(url).success(function (response) {
                if (response.resultCode == 1) {
                    layer.alert("成功加入购物车！");
                } else {
                    layer.alert(response.resultMsg);
                    return;
                }
            });
        }
        var prodId = $("[name='orders[0].order.prodId']").val(),
            prodSaleAttrId = $("[name='orders[0].order.prodSaleAttrId']").val();

        /**
         * 数量发生改变
         */
        $scope.callback = function () {
            prodId = $("[name='orders[0].order.prodId']").val();
            prodSaleAttrId = $("[name='orders[0].order.prodSaleAttrId']").val()
            if ($scope.x && $scope.x != $scope.sYears) {
                $scope.sYears = $scope.x;
                $scope.selectYear($scope.x, prodId, prodSaleAttrId);
            }
            if ($scope.y && $scope.y != $scope.sNum) {
                $scope.sNum = $scope.y;
                $scope.selectNum($scope.y, prodId, prodSaleAttrId);
            }
        };

        $scope.$watch("sYears * sNum", function (newV) {
            if ($scope.type === "simple") {
                return;
            }
            if ($scope.goodDetail && newV > $scope.goodDetail.current.prodStockNum) {
                $scope.y = 1;
                $scope.x = 1;
                $scope.sYears = 1;
                $scope.sNum = 1;
            }
        });

        $scope.$watch("sYears", function(newV) {
            if ($scope.type !== "simple") {
                return;
            }
            if ($scope.goodDetail && newV > $scope.goodDetail.current.prodStockNum) {
                $scope.x = 1;
                $scope.sYears = 1;
                prodId = $("[name='orders[0].order.prodId']").val();
                prodSaleAttrId = $("[name='orders[0].order.prodSaleAttrId']").val();
                $scope.selectYear($scope.x, prodId, prodSaleAttrId);
            }
        });

    })
    .controller("helpCenterCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {
        $rootScope.topView = "helpCenter";
    }])
    .controller("productListCtrl", ["$scope", "$routeParams", "$timeout", "$http", function ($scope, $routeParams, $timeout, $http) {

        //产品类型
        $scope.prodTypeCd = $routeParams.prodTypeCd;
        //当前页
        $scope.currentPage = 1;
        //总条目数
        $scope.totalCount = 0;

        //分页查询产品列表
        $scope.queryOnStockProdList = function () {
            var requestUrl = config.queryOnStockProdList + "&page.currentPage=" + $scope.currentPage;
            if ($scope.prodTypeCd != null && $scope.prodTypeCd != "") {
                requestUrl += "&prodTypeCd=" + $scope.prodTypeCd;
            }

            $http({
                url: requestUrl,
                method: "POST"
            }).success(function (response) {
                if (response.resultCode == "1") {
                    $scope.prodList = [];
                    angular.forEach(response.object, function (item) {
                        var p = {};
                        p.prodId = item.prodId;
                        var prodPicsList = item.prodPicsList;
                        for (var i=0;i<prodPicsList.length;i++) {
                            if (prodPicsList[i].picType==1) {
                                p.imgUrl = prodPicsList[i].picsUrl;
                                break;
                            }
                        }
                        p.name = item.prodName;
                        p.desc = item.saleAttrList[0].description;
                        p.probation = item.trialTime;
                        p.price = item.saleAttrList[0].price;
                        p.priceUnit = item.saleAttrList[0].priceUnit;
                        $scope.prodList.push(p);
                    });
                    $scope.totalCount = response.page.totalRows;
                } else {
                    alert("产品列表获取失败：" + response.resultMsg);
                }
            }).error(function (response) {
                alert("产品列表加载异常");
            });
        };

        //翻页查询
        $scope.changePageQuery = function () {
            $timeout(function () {
                $scope.prodList = [];
                $scope.currentPage = $(".pagination .active a").text();
                $scope.queryOnStockProdList();
            }, 100);
        };

        //切换产品类型
        $scope.changeTypeQuery = function () {
            $scope.prodList = [];
            $scope.currentPage = 1;
            $scope.queryOnStockProdList();
        };

        //初始化查询
        $scope.queryOnStockProdList();

    }])
    .controller("previewDetailCtrl", ["$scope", "$routeParams", "$timeout", "$http", "$sce", function ($scope, $routeParams, $timeout, $http, $sce) {
        var detail = JSON.parse(localStorage.getItem("detail-info")),
        // var detail = {"status":-2,"joindescriptiob":"产品待上架，详情拨打","joinurl":"https://www.google.com.hk/webhp?hl=zh-CN","prodName":"asdasdasd","prodTypeCd":null,"description":"asdasdasdasd","transcat":"在线申请，在线支付或线下对接","downloadUrl":null,"qa":null,"trialTime":"无试用","picsList":[{"picsUrl":"http://10.20.16.172:8180/files/20173/1488445791770.png","picType":1},{"picsUrl":"http://10.20.16.172:8180/files/20173/1488445798351.png","picType":2}],"saleAttrList":[{"prodStockNum":"1111","prodStockWarn":"21312","price":"1111","priceUnit":"元","saleAttrName":"ada","saleAttrValue":"111","description":"1adasd"}],"prodId":130,"providId":25,"groupId":"93","shelfId":null,"groupName":"asdasdasd","templeType":"1","isJoin":1},
            hasDeepList = false, units = [], tmp;

        angular.forEach(detail.saleAttrList, function (item) {
            if (item.planSaleAttrs && item.planSaleAttrs.length) {
                hasDeepList = true;
            }
        });

        $scope.goodDetail = {
            prodName: detail.prodName,
            description: detail.description,
            qa: detail.qa || "",
            downloadUrl: detail.downloadUrl || "",
            saleAttrList: detail.saleAttrList,
            hasDeepList: hasDeepList,
            current: hasDeepList ? detail.saleAttrList[0].planSaleAttrs[0] : detail.saleAttrList[0],
            mainPic: "",
            subPics: [],
            detailDesc: $sce.trustAsHtml(detail.url) || "",
            isJoin: detail.isJoin,
            joindescriptiob: detail.joindescription,
            joinurl: detail.joinurl,
            units: []
        };

        if ($scope.goodDetail.current.priceUnit.indexOf("/") > -1) {
            tmp = $scope.goodDetail.current.priceUnit.split("/");
            if (tmp.length == 2) {
                units = tmp;
            } else {
                units = [tmp[0] + "/" + tmp[1], tmp[2]];
            }
        } else {
            units = [$scope.goodDetail.current.priceUnit];
        }

        $scope.goodDetail.units = units;

        angular.forEach(detail.picsList, function (pic) {
            if (pic.picType == 1) {
                $scope.goodDetail.mainPic = pic.picsUrl;
            } else {
                $scope.goodDetail.subPics.push(pic.picsUrl);
            }
        });

    }])
    .controller("serviceDetailCtrl", ["$rootScope", "$scope", "$routeParams", "$http", "$sce", function ($rootScope, $scope, $routeParams, $http, $sce) {
        $rootScope.focus = $routeParams.menuId || 1;
        $http.post(config.queryServiceDetail($routeParams.portletId)).success(function (response) {
            if (response.resultCode == 1) {
                $scope.html = $sce.trustAsHtml(response.object.moduleContent);
            } else {
                alert("详情获取失败：" + response.resultMsg);
            }
        }).error(function (e) {
            alert("详情获取异常：" + e);
        });
    }]);