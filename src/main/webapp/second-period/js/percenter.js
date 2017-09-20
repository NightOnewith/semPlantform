"use strict";

var percenterApp = angular.module("percenterApp", ['ui.bootstrap', 'ngRoute']);

var _Math = {

	/**
	 * add method
	 * @param num1
	 * @param num2
	 * @returns {number}
	 */
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

		/**
		 * sub menthod
		 * @param num1
		 * @param num2
		 * @returns {Number}
		 */
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

		/**
		 * mul method
		 * @param num1
		 * @param num2
		 * @returns {number}
		 */
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

	/**
	 * div method
	 * @param num1
	 * @param num2
	 * @returns {number}
	 */
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

//订单状态转换
percenterApp.filter('orderStatusTransform', function () {
	return function (val) {
		switch (val) {
			case "-2" :
				return "永久删除";
			case "-1" :
				return "已删除";
			case "0" :
				return "待付款";
			case "1" :
				return "已支付（待处理）";
			case "2" :
				return "已退订";
			case "3" :
				return "试用已开通";
			case "4" :
				return "部分完成";
			case "5" :
				return "已完成";
			case "6" :
				return "交易关闭（超时）";
			case "7" :
				return "退订成功";
			case "8" :
				return "试用成功";
			case "9" :
				return "试用已处理";
		}
	};
})

percenterApp.factory('getUserList', ['$http', '$q', function($http, $q) {
	return function(params) {
		var defer = $q.defer();
		$http({
			method: "POST",
			url: config.getUserList,
			data: params
		}).success(function(data, status, headers, config) {
			defer.resolve(data);
		}).error(function(data, status, headers, config) {
			defer.reject(data);
		});
		return defer.promise;
	}
}]).factory('addOrgUser', ['$http', '$q', function($http, $q) {
	return function(params) {
		var defer = $q.defer();
		$http({
			method: "POST",
			url: config.addOrgUser,
			data: params
		}).success(function(data, status, headers, config) {
			defer.resolve(data);
		}).error(function(data, status, headers, config) {
			defer.reject(data);
		});
		return defer.promise;
	}
}]).factory('updateOrgUser', ['$http', '$q', function($http, $q) {
	return function(params) {
		var defer = $q.defer();
		$http({
			method: "POST",
			url: config.updateOrgUser,
			data: params
		}).success(function(data, status, headers, config) {
			defer.resolve(data);
		}).error(function(data, status, headers, config) {
			defer.reject(data);
		});
		return defer.promise;
	}
}]).factory('deleteUser', ['$http', '$q', function($http, $q) {
	return function(params) {
		var defer = $q.defer();
		$http({
			method: "POST",
			url: config.deleteUser,
			data: params
		}).success(function(data, status, headers, config) {
			defer.resolve(data);
		}).error(function(data, status, headers, config) {
			defer.reject(data);
		});
		return defer.promise;
	}
}]);

percenterApp.service("Http", ["$rootScope", "$http", "$window", function($rootScope, $http, $window) {

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
		request: function(opt) {
			if(config.isDebug && ("" + opt.method).toLowerCase() === "post") {
				opt.method = "get";
			}
			var cfg = {
				url: opt.url,
				method: (opt.method || "get").toUpperCase(),
				showLoading: opt.showLoading === false ? false : true,
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

			if(cfg.showLoading) {
				$rootScope.loading = true;
			}
			if(cfg.method === "GET") {
				$http.get(cfg.url)
					.success(function(res) {
						if(cfg.showLoading) {
							$rootScope.loading = false;
						}
						if(res.resultCode === "-1") {
							location.href = config.indexPath;
						} else if(typeof cfg.success === "function") {
							cfg.success.apply($window, [].slice.call(arguments, 0));
						}
					})
					.error(function() {
						if(cfg.showLoading) {
							$rootScope.loading = false;
						}
						if(typeof cfg.error === "function") {
							cfg.error.apply($window, [].slice.call(arguments, 0));
						}
					});
			} else if(cfg.method === "POST") {
				$http.post(cfg.url, cfg.data, cfg.cfg)
					.success(function() {
						if(cfg.showLoading) {
							$rootScope.loading = false;
						}
						if(typeof cfg.success === "function") {
							cfg.success.apply($window, [].slice.call(arguments, 0));
						}
					})
					.error(function() {
						if(cfg.showLoading) {
							$rootScope.loading = false;
						}
						if(typeof cfg.error === "function") {
							cfg.error.apply($window, [].slice.call(arguments, 0));
						}
					});
			}
		}
	};
}]);

percenterApp.service("scopeService", function() {
	return {
		safeApply: function ($scope, fn) {
			var phase = $scope.$root.$$phase;
			if (phase == "$apply" || phase == "$digest") {
				if (fn && typeof fn === 'function') {
					fn();
				}
			} else {
				$scope.$apply(fn);
			}
		},
	};
});

function uploadDingz(el, widata, $scope) {
	$(el).fileupload({
		url: $scope.url,
		dataType: 'json',
		autoUpload: false,
		acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
		maxFileSize: 999000,
		previewMaxWidth: 100,
		previewMaxHeight: 100,
		previewCrop: true,
	}).on('fileuploadadd', function(e, data) {
		var $this = $(this);
		//限制上传一个
		$this.parent().siblings('.filesList-ui').html('');
		data.context = $('<div/>').appendTo($this.parent().siblings('.filesList-ui'));
		$.each(data.files, function(index, file) {
			var node = $('<p/>')
				.append($('<span/>'));
			if(!index) {
				node
					.append('<br>')
					.append($scope.uploadButton.clone(true).data(data));
			}
			node.appendTo(data.context);
		});
	}).on('fileuploadprocessalways', function(e, data) {
		var index = data.index,
			file = data.files[index],
			node = $(data.context.children()[index]);
		if(file.preview) {
			node
				.prepend('<br>')
				.prepend(file.preview);
		}
		if(file.error) {
			node
				.append('<br>')
				.append($('<span class="text-danger"/>').text(file.error));
		}
		if(index + 1 === data.files.length) {
			data.context.find('button')
				.text('上传')
				.prop('disabled', !!data.files.error);
		}
	}).on('fileuploaddone', function(e, data) {
		if(data.result.resultCode == "1") {
			var link = $('<a>')
				.attr('target', '_blank');
			$scope.headPicId = data.result.data.fileId;
			$scope.headPicUrl = data.result.data.fileName;
			$('.headPicUrl').hide();
			$(data.context.children('p').remove('button'))
				.append('<span style="color: red;">上传成功</span>');
			data.context.closest('.filesList-ui').siblings('.error-text').hide();
		} else if(data.result.resultCode != "1") {
			var error = $('<span class="text-danger"/>').text("上传失败");
			$(data.context.children())
				.append('<br>')
				.append(error);
		}
	}).on('fileuploadfail', function(e, data) {
		$.each(data.files, function(index) {
			var error = $('<span class="text-danger"/>').text('文件上传失败.');
			$(data.context.children()[index])
				.append('<br>')
				.append(error);
		});
	}).prop('disabled', !$.support.fileInput)
		.parent().addClass($.support.fileInput ? undefined : 'disabled');
}

percenterApp.run(function(paginationConfig, $rootScope, $window, Http) {
	var hideHead = [
		"view/percent-buyerOrderDetail.html",
		"view/percent-sellerOrderDetail.html",
		"view/percent-sellerUploadGoods.html",
		"view/percent-sellerCopyGoods.html",
		"view/percent-sellerModifyGoods.html",
		"view/favorites.html"
	];

	paginationConfig.firstText = '最前';
	paginationConfig.previousText = '前一页';
	paginationConfig.nextText = '下一页';
	paginationConfig.lastText = '最后';

	$rootScope.isLogin = false;
	$rootScope.navClass = "sellerCenter";

	$rootScope.maskCtrl = function(show) {
		$rootScope.$apply(function() {
			$rootScope.loading = show || false;
		});
	};

	$rootScope.logout = function () {
		Http.request({
			url: config.toLogout,
			method: "GET",
			success: function(data) {
					$rootScope.isLogin = false;
				    $.removeCookie("tiped");
					window.location.href = config.host + config.portals + "logout";
			},
			error: function(data) {
				console.log("服务器异常，请稍候再试");
			}
		});
	};

	/**
	 * 检测用户是否登录
	 */
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		$rootScope.userType = "";

		$rootScope.withMenu = true;

		angular.forEach(hideHead, function(name) {
			if(next.templateUrl === name) {
				$rootScope.withMenu = false;
			}
		});

		//  判断用户是否登录
		Http.request({
			url: config.checkLogin,
			method: "GET",
			showLoading: false,
			success: function(res) {
				if(res.resultCode === "1") {
                     $rootScope.isLogin = true;
					//  判断获取用户信息
					Http.request({
						url: config.userInfo,
						method: "GET",
						showLoading: false,
						success: function(res) {
							if(res.resultCode === "1") {
								$rootScope.loginInfo = res.data;
								if(res.data.userType == 3) {
									$rootScope.userType = "buyer";
									Http.request({
										url: config.myInfo,
										method: "GET",
										showLoading: false,
										success: function(data) {
											if(data.resultCode == 1) {
												$rootScope.myInfo = data.data;
												$rootScope.headPicUrl = data.data.headPicUrl;
												if(next.templateUrl === "view/account.html") {
													$rootScope.acnshow();
												}
											} else {
												console.log(data.resultMsg);
											}
										},
										error: function() {
											console.log("服务器异常，请稍候再试");
										}
									});

								} else if(res.data.userType == 5) {
									$rootScope.userType = "seller";
									Http.request({
										url: config.sellerInfo(),
										success: function(res) {
                                            $rootScope.headPicUrl = res.object.provider.profileUrl;
											if(res.resultCode === "1" && res.object.provider instanceof Object && res.object.provider.status !== "2") {
												$rootScope.sellerType = "needReApply";
											} else if(res.resultCode !== "1" && res.resultMsg) {
												layer.alert(res.resultMsg);
											}
										},
										error: function(ex) {}
									});
								}
							}

							//  获取当前登录的用户信息
							Http.request({
								url: config.getLoginInfo,
								method: "GET",
								success: function(res) {
									if(res.resultCode === "1") {
										$rootScope.loginInfo = res.object;
									}
								},
								error: function(res) {}
							});

						},
						error: function() {

						}
					});
				} else {
					$window.location.href = config.loginRedirectURI;
				}
			},
			error: function(ex) {
				$window.location.href = config.loginRedirectURI;
			}
		});
	});

});

percenterApp.controller("carCtrl", function($scope, $rootScope, Http) {
	$rootScope.navClass = "car";
	$scope.showModifyModal = false;

    // 计算总价
    $scope.allprice = 0.00;
    $scope.totalSale = function () {
        $scope.allprice = 0.00;

        angular.forEach($scope.checkedgoods, function (g, i) {
            $scope.allprice = _Math.add($scope.allprice, g);
        });
    }

	/**
	 * 获取购物车数据
	 */
	$scope.getShopcar = function(isStockWarm, e) {
		if($(e.currentTarget).hasClass("on")) return;
		$(e.currentTarget).addClass("on").siblings("li").removeClass("on");
		$scope.shopcarInfo(isStockWarm);
	};

	$scope.shopcarInfo = function(isStockWarm) {
		$scope.isStockWarm = isStockWarm;
        $scope.carlist = [];
        $scope.checkedscid = [];
        $scope.checkedgoods = [];
        $scope.totalSale();
		Http.request({
			url: config.shopcart(isStockWarm),
			method: "GET",
			success: function(res) {
				if(res.resultCode === "1") {
					$scope.carlist = res.object;
                    angular.forEach($scope.carlist, function (car) {
                        car.prodSaleAttribute.total = _Math.mul(_Math.mul(car.prodSaleAttribute.price, car.quantity || 1), car.amounts || 1);
                        if(car.unitTwo === null) {
                            car.unitTwo = "";
                        }
                        if(car.unitOne === null) {
                            car.unitOne = "";
                        }
                    });
				} else if(res.resultMsg) {
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("网络异常!请刷新页面重试!");
			}
		})
	};
	
	//按商品名查询
	$scope.queryGoodData = function() {
		var queryStr = "?isStockWarm="+$scope.isStockWarm+"&product.prodName="+encodeURIComponent($scope.prodName)+ "&",
		    url;
		    
		url = config.queryshopcart + queryStr;

		url += "page.currentPage=" + ($scope.currentPage || 1);
		Http.request({
			url: url,
			method: "GET",
			success: function(res) {
				if(res.resultCode === "1") {
					$scope.carlist = res.object;
                    angular.forEach($scope.carlist, function (car) {
                        car.prodSaleAttribute.total = _Math.mul(_Math.mul(car.prodSaleAttribute.price, car.quantity || 1), car.amounts || 1);
                        if(car.unitTwo === null) {
                            car.unitTwo = "";
                        }
                        if(car.unitOne === null) {
                            car.unitOne = "";
                        }
                    });
				} else if(res.resultMsg) {
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("网络异常!请刷新页面重试!");
			}
		});
	}
	$scope.shopDel = function(status, scId) {
		Http.request({
			url: config.shopdel(status, scId),
			method: "GET",
			success: function(res) {
				if(res.resultCode === "1") {
					layer.alert("删除成功!", function() {
						location.reload();
					});
				} else if(res.resultMsg) {
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("网络异常!请刷新页面重试!");
			}
		});
	}

	$scope.shopcarInfo('0');
    
	$scope.carFlag=false;
	$scope.checkedgoods = [];
	$scope.checkedscid = [];
	/**
	 * 全选
	 */
	$scope.checkAll = function(c,v) {
		$scope.carFlag = !$scope.carFlag;
		if($scope.carFlag) {
            $scope.checkedgoods = [];
			angular.forEach($scope.carlist, function(item, _index) {
				$scope.checkedscid.push(item.scId);
				$scope.checkedgoods.push(item.prodSaleAttribute.total);
				item.checked = true;
			});
		} else {
			angular.forEach($scope.carlist, function(item, _index) {
				item.checked = false;
				$scope.checkedscid = [];
				$scope.checkedgoods = [];
			});
		}
		$scope.totalSale();
	}

	/**
	 * 单选
	 */
	$scope.checkOne= function (c) {
		c.checked = !c.checked;

		if(c.checked) {
			$scope.checkedscid.push(c.scId);
			$scope.checkedgoods.push(c.total);
		}else{
			var scid = c.scId,
				list=[];
			angular.forEach($scope.checkedscid, function(item, _index) {
				if(item !== scid) {
					list.push(item);
				}
			});
            $scope.checkedscid=list;
		}

        var pricelist = [];
        angular.forEach($scope.carlist, function(v, i) {
            if(v.checked) {
                pricelist.push(v.prodSaleAttribute.total);
            }
        });
        $scope.checkedgoods=pricelist;

		$scope.totalSale();
	};

	$scope.$watchCollection("checkedscid", function(newV) {
		if(newV.length && newV.length === $scope.carlist.length) {
			$scope.carFlag = true;
		} else {
			$scope.carFlag = false;
		}
		$scope.numitem = newV.length;
	});

	$scope.carSettle = function() {
        var urlQueryStr = "?",
            index = 0;

        if($scope.checkedgoods.length === 0) {
            layer.alert("请先选择要结算的商品!");
            return;
        }

        angular.forEach($scope.carlist, function (cart) {
            if(cart.checked) {
                urlQueryStr += "longList[" + index + "]=" + cart.scId + "&";
                index ++;
            }
        });

        urlQueryStr = urlQueryStr.replace(/\&$/, "");

		Http.request({
			url: config.shopCartCheck + urlQueryStr,
			method: "POST",
			success: function(response) {
				if (response.resultCode==1) {
					location.href = config.shopcounter + urlQueryStr;
				} else {
					layer.alert("购物车提交失败："+response.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("网络异常!请刷新页面重试!");
			}
		});
	};

	$scope.shopClean = function() {
		if($scope.carFlag) {
			Http.request({
				url: config.shopclean,
				method: "GET",
				success: function(res) {
					if(res.resultCode === "1") {
						layer.alert("数据清空成功!", function() {
							location.reload();
						});
					} else if(res.resultMsg) {
						layer.alert(res.resultMsg);
					}
				},
				error: function(ex) {
					layer.alert("网络异常!请刷新页面重试!");
				}
			});
		}else{
			layer.alert("没有全部选中");
		}
	}

	/**
	 * 查询可选套餐
	 */
	$scope.showMeal = function(scId) {
		Http.request({
			url: config.getShopCartChangePackge(scId),
			success: function(res) {
				if(res.resultCode === "1") {
					$scope.availablePackages = res.object;
					$scope.showModifyModal = true;
				} else if (res.resultMsg) {
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("获取可选套餐信息失败,请重试!");
			}
		});
	};

	//选择套餐
	$scope.selectMeal = function(e){
		var isact = $(e.currentTarget).hasClass('active');
		isact ? $(e.currentTarget).removeClass('active') : $(e.currentTarget).addClass('active');
		$(e.currentTarget).siblings('span').removeClass('active');
	};

	$scope.sureBtn = function() {
		$('.tbl-1').removeClass('on');
	};

	$scope.closeBtn = function() {
		$('.package_pop_wrap span').removeClass('active');
		$('.tbl-1').removeClass('on');
	};
	$(document).off("keyup.LimitNumber").on("keyup.LimitNumber", "")
});

//卖家中心
percenterApp.controller("sellerCenterCtrl", ["$scope", "$rootScope", "$routeParams", "$location", "Http", function($scope, $rootScope, $routeParams, $location, Http) {
	$rootScope.navClass = "sellerCenter";

	var status = "",
		statusMap = {
			all: 0,
			online: 1,
			offline: 5
		},
		tradeStatusMap = {
			"-1": "已删除",
			"-2": "已永久删除",
			"0": "待付款",
			"1": "待处理",
			"2": "退订订单",
			"3": "试用订单",
			"4": "部分完成",
			"5": "已完成",
			"6": "交易关闭",
			"7": "退订成功",
		};

	//  交易记录样式
	if($location.$$path.indexOf("/sellerTradeHistory") > -1) {
		$rootScope.navClass = "sellerTradeHistory";
	}

	/**
	 * 默认focus第一个
	 */
	$scope.focus = "";

	if($routeParams.status) {
		status = statusMap[$routeParams.status];
		$scope.focus = status;
	}

	/**
	 * 查询卖家中心接口
	 */
	$scope.queryInfo = function() {
		Http.request({
			url: config.sellerCenter,
			method: "GET",
			success: function(res) {
				if(res.resultCode == 1) {
					$scope.seller = res.object;
					$scope.sellerInfo = res.object.provider;
				} else if(res.resultMsg) {
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("网络异常!请刷新页面重试!");
			}
		});
	};

	$scope.queryInfo();

	/**
	 * 查询交易记录
	 */
	$scope.sellTrade = function(type, e) {
		$scope.focus = type;
		if($(e.currentTarget).hasClass('focus')) return;
		$(e.currentTarget).addClass('focus').siblings('li').removeClass('focus');
		$scope.tradeInfo(type);
	};

	/**
	 * 查询交易记录信息
	 * @param type
	 */
	$scope.tradeInfo = function(type) {
		Http.request({
			url: config.sellerTrade,
			method: "POST",
			data: {
				tdStatus: type,
			},
			success: function(res) {
				if(res.resultCode == 1) {
					$scope.trade = res.object;
					angular.forEach($scope.trade, function(trade) {
						trade.statusStr = tradeStatusMap[trade.tdStatus];
					});

				} else if(res.resultMsg) {
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("网络异常!请刷新页面重试!");
			}
		});

	};

	$scope.tradeInfo(0);



	$scope.changeTime = function(time) {
		if(time === null) {
			return Common.getDate();
		}
		return Common.getDate(time);
	};

	/**
	 * 提现
	 */
	$scope.withdraw = function() {
		layer.alert("暂不支持此功能!敬请期待!");
	};

}]);

//  交易记录
percenterApp.controller("tradeHistoryCtrl", ["$scope", "$rootScope", "Http", "$timeout", function($scope, $rootScope, Http, $timeout) {

	$rootScope.navClass = "sellerTradeHistory";

	$scope.changeTime = function(time) {
		if(time === null) {
			return Common.getDate();
		}
		return Common.getDate(time);
	};
	//日期
	$(".form_datetime").datetimepicker({
		language:  'zh-CN',  //日期
		minView: "month",//设置只显示到月份
		format : "yyyy-mm-dd",//日期格式
		autoclose:true,//选中关闭
		todayBtn: true,//今日按钮
		pickerPosition: "bottom-left"
	});

	$("#startTime").on("change", function() {

		$scope.timeStart = $("#startTime").val();

	});
	$("#endTime").on("change", function() {

		$scope.timeEnd = $("#endTime").val();

	});
	var tradeStatusMap = {
			"-1": "已删除",
			"-2": "已永久删除",
			"0": "待付款",
			"1": "已支付（待处理）",
			"2": "退订订单",
			"3": "试用订单",
			"4": "部分完成",
			"5": "已完成",
			"6": "交易关闭",
			"7": "退订成功",
		},
		tradetdMap = {
			"已删除":"-1",
			"已永久删除":"-2",
			"待付款": "0",
			"已支付（待处理）": "1",
			"退订订单": "2",
			"试用订单": "3",
			"部分完成": "4",
			"已完成": "5",
			"交易关闭": "6",
			"退订成功": "7",
		};


	//显示总交易记录

	$scope.allTradeinfo=function(){
		Http.request({
			url: config.sellerTrade,
			method: "POST",
			data: {
				tdStatus: '',
			},
			success: function(res) {
				if(res.resultCode == 1) {
					$scope.trade = res.object;
					angular.forEach($scope.trade, function(trade) {
						trade.statusStr = tradeStatusMap[trade.tdStatus];
					});
					$scope.pageInfo = res.page;
					$scope.currentPage = $scope.pageInfo.currentPage;
					$scope.bigTotalItems = $scope.pageInfo.totalRows;
					$scope.pageSize = $scope.pageInfo.pageSize;
				} else if(res.resultMsg) {
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("网络异常!请刷新页面重试!");
			}
		});
	}

	$scope.allTradeinfo();

	//查询交易记录
	$scope.queryTrades = function() {

		var params = {
				prodName: $scope.prodName,
				timeStart: $scope.timeStart,
				timeEnd: $scope.timeEnd,
				tdStatus: tradetdMap[$scope.tdStatus],
				orderSeq: $scope.orderSeq
			},
			queryString = "";

		for(var i in params) {
			if(params.hasOwnProperty(i) && params[i]) {
				queryString += i + "=" + encodeURIComponent(params[i]) + "&";
			}
		}
		queryString = "&" + queryString.replace(/\&$/, "");
		Http.request({
			url: config.sellerTrade +'?'+ queryString,
			success: function(res) {
				if(res.resultCode === "1") {
					$scope.trade = res.object;
					angular.forEach($scope.trade, function(trade) {
						trade.statusStr = tradeStatusMap[trade.tdStatus];
					});
					$scope.pageInfo = res.page;
					$scope.currentPage = $scope.pageInfo.currentPage;
					$scope.bigTotalItems = $scope.pageInfo.totalRows;
					$scope.pageSize = $scope.pageInfo.pageSize;
				} else if(res.resultMsg) {
					$scope.trade = [];
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("网络异常!请刷新页面重试!");
			}
		});
	};
	var keys = [
		"prodName",
		"timeStart",
		"timeEnd",
		"tdStatus",
		"orderSeq"
	]
	//清空过滤条件
	$scope.clearCondition = function(){

		angular.forEach(keys, function(key) {
			$scope[key] = "";
		});
		$("#startTime").val("");
		$("#endTime").val("");
	}

	$scope.pageChanged = function() {
	    $timeout(function () {
            $scope.currentPage = $(".pagination .active a").text();
            Http.request({
                url: config.sellerTrade + '?page=' + $scope.currentPage,
                method: "GET",
                success: function(res) {
                    if(res.resultCode == 1) {
                        $scope.trade = res.object;
                        angular.forEach($scope.trade, function(trade) {
                            trade.statusStr = tradeStatusMap[trade.tdStatus];
                        });
                        $scope.pageInfo = res.page;
                        $scope.pageSize = $scope.pageInfo.pageSize;
                    } else if(res.resultMsg) {
                        layer.alert(res.resultMsg);
                    }
                }
            });
        }, 100);
	};
}]);

//  消息列表
percenterApp.controller("messageListCtrl", ["$scope", "$rootScope", "Http", function($scope, $rootScope, Http) {
	$rootScope.navClass = "sellerMessageList";

	layer.alert("暂不支持此功能!敬请期待!");
}]);

// 信息管理
percenterApp.controller("infoManangeCtrl", ["$scope", "$rootScope", "Http", function($scope, $rootScope, Http) {
	$rootScope.navClass = "infoManange";

	$scope.manageMap = [{
		id: 1,
		title: "应用软件"
	}, {
		id: 2,
		title: "管理软件"
	}, {
		id: 3,
		title: "行业软件"
	}, {
		id: 4,
		title: "安全防护软件"
	}, {
		id: 5,
		title: "多媒体软件"
	}, {
		id: 6,
		title: "办公软件"
	}, {
		id: 7,
		title: "云服务"
	}];
	$scope.industryType = "1";
	$scope.industryStr = "应用软件";

	$scope.selectType = function(id) {
		$scope.industryType = "" + id;
		angular.forEach($scope.manageMap, function(item) {
			if(item.id === id) {
				$scope.industryStr = item.title;
			}
		});
	};

	/**
	 * 查询卖家信息
	 */
	Http.request({
		url: config.sellerInfo(),
		method: "GET",
		success: function(res) {
			if(res.resultCode === "1") {
				$scope.info = res.object;
				$scope.website = $scope.info.provider.website;
				$scope.address = $scope.info.provider.address;
                $scope.linkman = $scope.info.provider.linkman;
                $scope.phoneNum = $scope.info.provider.phoneNum;
                $scope.mail = $scope.info.provider.mail;
                $scope.developerNumber = $scope.info.provider.developerNumber;
                $scope.salerNumber = $scope.info.provider.salerNumber;
                $scope.selectType($scope.info.provider.industryStr);
                $scope.servicePhone = $scope.info.provider.servicePhone;
                $scope.serviceMail = $scope.info.provider.serviceMail;
                $scope.serviceWechat = $scope.info.provider.serviceWechat;
                $scope.serviceMicroblog = $scope.info.provider.serviceMicroblog;
			} else if(res.resultMsg) {
				layer.alert(res.resultMsg);
			}
		},
		error: function(ex) {
			layer.alert("获取用户信息失败!请刷新页面重试!");
		}
	});

	/**
	 * 保存修改
	 */
	$scope.saveupdate = function() {
		var tip = "",
			post = {};

		//  公司地址验证
		// if(!$scope.address) {
		// 	tip = "公司地址不能为空!";
		// }

		//  联系人非空验证
		// if(tip === "" && !$scope.linkman) {
		// 	tip = "联系人不能为空!";
		// }

		//  手机号
		// if(tip === "" && !Common.check("mobile", $scope.phoneNum)) {
		// 	tip = "联系人手机号格式不正确!";
		// }

		//  研发人数验证
		// if(tip === "" && !Common.check("digital", $scope.developerNumber)) {
		// 	tip = "研发人数不正确!";
		// }

		//  销售人数验证
		// if(tip === "" && !Common.check("digital", $scope.salerNumber)) {
		// 	tip = "销售人数不正确!";
		// }

		//  售后电话
		// if(tip === "" && !Common.check("mobile", $scope.servicePhone)) {
		// 	tip = "售后电话不正确!";
		// }

		//  售后邮箱
		// if(tip === "" && !Common.check("mail", $scope.serviceMail)) {
		// 	tip = "售后邮箱不正确!";
		// }

		//  售后微信
		// if(tip === "" && !$scope.serviceWechat) {
		// 	tip = "售后微信不能为空!";
		// }

		//  售后微博
		// if(tip === "" && !Common.check("url", $scope.serviceMicroblog)) {
		// 	tip = "售后微博不正确!应为网站格式!";
		// }

		// if(tip !== "") {
		// 	layer.alert(tip);
		// 	return;
		// }

		post.providId = $scope.info.provider.providId;
		post.phoneNum = $scope.phoneNum;
		post.mail = $scope.mail;
		post.address = $scope.address;
		post.linkman = $scope.linkman;
		post.employeeNumber = $scope.employeeNumber || 1;
		post.developerNumber = $scope.developerNumber;
		post.salerNumber = $scope.salerNumber;
		post.industryType = $scope.industryType == "undefined" ? 1 : $scope.industryType;
		post.servicePhone = $scope.servicePhone;
		post.serviceMail = $scope.serviceMail;
		post.serviceWechat = $scope.serviceWechat;
		post.serviceMicroblog = $scope.serviceMicroblog;
		post.website = $scope.website;

		Http.request({
			url: config.editProviderInfo(),
			method: "POST",
			data: post,
			success: function(res) {
				if(res.resultCode === "1") {
					layer.alert("修改成功!");
				} else if(res.resultMsg) {
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("修改失败!请重试!");
			}
		});
	};

}]);

//  资金管理
percenterApp.controller("financeManageListCtrl", ["$scope", "$rootScope", "Http", function($scope, $rootScope, Http) {
	$rootScope.navClass = "financeManagement";

	Http.request({
		url: config.sellerInfo(),
		method: "GET",
		success: function(res) {
			if(res.resultCode === "1") {
				$scope.sellerInfo = res.object;
			} else if(res.resultMsg) {
				layer.alert(res.resultMsg);
			}
		},
		error: function(ex) {
			layer.alert("网络异常!请刷新页面重试!");
		}
	});

	/**
	 * 提现
	 */
	$scope.withdraw = function() {
		layer.alert("暂不支持此功能!敬请期待!");
	};

	/**
	 * 转账
	 */
	$scope.transfer = function() {
		layer.alert("暂不支持此功能!敬请期待!");
	};

}]);

//  商品管理
percenterApp.controller("goodsManageCtrl", ["$scope", "$rootScope", "$routeParams", "Http", "$timeout", function($scope, $rootScope, $routeParams, Http, $timeout) {
	$rootScope.navClass = $routeParams.status;

	$scope.currentPage = 1;

	var keys = [
			"productName",
			"productSku",
			"productEntry",
			"productPriceLow",
			"productPriceUp",
			"productSellCountLow",
			"productSellCountUp"
		],
		statusMap = {
            allGoods: "",
			unCommittedGoods: "0",
			committedGoods: "1",
			noCommittedGoods: "3",
			deletedGoods: "-1",
            refuseGoods: "2"
		},
		url = config.getAllProductByStaus + "?page.currentPage=" + $scope.currentPage;

	if(statusMap[$routeParams.status] != "") {
		url += "&status=" + statusMap[$routeParams.status];
	}

	Http.request({
		url: url,
		success: function(res) {
			if(res.resultCode === "1") {
				$scope.pageInfo = res.page;
				$scope.goodList = res.object;
				angular.forEach($scope.goodList, function(good, index) {
					var tmp;

					if(good.saleAttrList.length) {
						if(good.saleAttrList[0].planSaleAttrs.length) {
							tmp = good.saleAttrList[0].planSaleAttrs[0];
						} else {
							tmp = good.saleAttrList[0];
						}
					}

					for(var i in tmp) {
						if(tmp.hasOwnProperty(i)) {
							good[i] = tmp[i];
						}
					}
					good.checkedAttr = false;
					$scope.goodList[index] = good;
					angular.forEach($scope.goodList[index].picsList, function(pic) {
						switch(pic.picType) {
							case 1:
								$scope.goodList[index].mainPicURI = pic.picsUrl;
								break;
							default:
								break;
						}
					});
				});
			} else if(res.resultMsg) {
				layer.alert(res.resultMsg);
			}
		},
		error: function(ex) {
			layer.alert("网络异常!请刷新页面重试!");
		}
	});

	$scope.refuseReason = function (id) {
        Http.request({
            url: config.queryProductUnProvalReson + '?prodId=' + id,
            success: function(res) {
                if(res.resultCode === "1") {
                    layer.alert(res.object.description);
                } else if(res.resultMsg) {
                    layer.alert(res.resultMsg);
                }
            },
            error: function(ex) {
                layer.alert("网络异常!请刷新页面重试!");
            }
        });
    };

	$scope.setPage = function(pageNo) {
		$scope.currentPage = pageNo;
	};

	/**
	 * 商品全选
	 */
	$scope.checkAll = function() {
		$scope.allChecked = !$scope.allChecked;
		angular.forEach($scope.goodList, function(item) {
			item.checkedAttr = $scope.allChecked;
		});
	};

	$scope.changeTime = function(time) {
		if(time === null) {
			return Common.getDate();
		}
		return Common.getDate(time);
	};

	/**
	 * 清空过滤条件
	 */
	$scope.clearCondition = function() {
		angular.forEach(keys, function(key) {
			$scope[key] = "";
		});
	};

	$scope.pageChanged = function() {
		$timeout(function() {
			$scope.currentPage = $(".pagination .active a").text();
			$scope.queryGoods();
		}, 100);
	};

	/**
	 * 查询商品
	 */
	$scope.queryGoods = function() {
		url = url.split("?")[0];

        if(statusMap[$routeParams.status] != "") {
            url += "?status=" + statusMap[$routeParams.status];
        }
		url = url + (url.indexOf("?") > -1 ? "&" : "?") + "page.currentPage=" + $scope.currentPage;
		var params = {
                prodName: $scope.productName,
                prodId: $scope.productSku,
                prodTypeCd: $scope.productEntry,
				totalSaleBegin: $scope.productSellCountLow,
				totalSaleEnd: $scope.productSellCountUp,
				priceBegin: $scope.productPriceLow,
				priceEnd: $scope.productPriceUp
			},
			queryString = "";
		for(var i in params) {
			if(params.hasOwnProperty(i) && params[i]) {
				queryString += i + "=" + encodeURIComponent(params[i]) + "&";
			}
		}
		queryString = "&" + queryString.replace(/\&$/, "");
		Http.request({
			url: url + queryString,
			success: function(res) {
				if(res.resultCode === "1") {
					$scope.pageInfo = res.page;
					$scope.goodList = res.object;
					angular.forEach($scope.goodList, function(good, index) {
						var tmp;

						if(good.saleAttrList.length) {
							if(good.saleAttrList[0].planSaleAttrs.length) {
								tmp = good.saleAttrList[0].planSaleAttrs[0];
							} else {
								tmp = good.saleAttrList[0];
							}
						}

						for(var i in tmp) {
							if(tmp.hasOwnProperty(i)) {
								good[i] = tmp[i];
							}
						}
						good.checkedAttr = false;
						$scope.goodList[index] = good;
						angular.forEach($scope.goodList[index].picsList, function(pic) {
							switch(pic.picType) {
								case 1:
									$scope.goodList[index].mainPicURI = pic.picsUrl;
									break;
								default:
									break;
							}
						});
					});
				} else if(res.resultMsg) {
					$scope.goodList = [];
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("网络异常!请刷新页面重试!");
			}
		});
	};
	/**
	 * 批量删除
	 */
	$scope.batchDelProds = function() {
		var ids = [],
			url = config.batchDelProds,
			queryString = "?";
		angular.forEach($scope.goodList, function(item) {
			if(item.checkedAttr) {
				ids.push(item.prodId);
			}
		});
		if(ids.length === 0) {
			layer.alert("请先选择要删除的商品!");
			return;
		}
		angular.forEach(ids, function(id, index) {
			queryString += "longList[" + index + "]=" + id + "&";
		});
		queryString.replace(/\&$/, "");
		Http.request({
			url: url + queryString,
			success: function (res) {
				if(res.resultCode === "1") {
					layer.alert("批量删除商品成功!", function() {
						$scope.$apply(function() {
							$scope.queryGoods();
						});
					});
				} else if (res.resultMsg) {
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("网络异常!请重试!");
			}
		});
	};

	/**
	 * 提交审批
	 * @param id
	 */
	$scope.submitToApproval = function(id) {
		Http.request({
			url: config.submitToApproval(id),
			success: function(res) {
				if(res.resultCode === "1") {
					layer.alert("提交成功!", function() {
						location.reload();
					});
				} else if(res.resultMsg) {
					layer.alert(res.resultMsg);
				}
			},
			error: function() {
				layer.alert("网络异常,请重试!");
			}
		});
	};

	/**
	 * 提交申请下架
	 * @param id
	 */
	$scope.submitToUnShelve = function(id) {
		Http.request({
			url: config.submitToUnShelve(id),
			success: function(res) {
				if(res.resultCode === "1") {
					layer.alert("提交成功!", function() {
						location.reload();
					});
				} else if(res.resultMsg) {
					layer.alert(res.resultMsg);
				}
			},
			error: function() {
				layer.alert("网络异常,请重试!");
			}
		});
	};

	/**
	 * 删除商品
	 * @param id
	 */
	$scope.deleteGood = function(id) {
		Http.request({
			url: config.batchDelProds + "?longList[0]=" + id,
			method: "GET",
			success: function(res) {
				if(res.resultCode === "1") {
					layer.alert("删除成功!", function() {
						location.reload();
					});
				} else if(res.resultMsg) {
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("网络异常,请重试!");
			}
		});
	};

}]);

//  卖家账号管理
percenterApp.controller("accountManangeCtrl", ["$scope", "$rootScope", "Http", function($scope, $rootScope, Http) {
	$rootScope.navClass = "accountManange";

    var userPhoto = [];

    $scope.url = config.uploadFile;
    $scope.uploadButton = $('<button/>')
        .addClass('btn btn-primary')
        .prop('disabled', true)
        .text('Processing...')
        .on('click', function(events) {
            events.preventDefault();
            events.stopPropagation();
            var $this = $(this),
                data = $this.data();
            $this
                .off('click')
                .text('终止')
                .on('click', function() {
                    $this.remove();
                    data.abort();
                });
            data.submit().always(function() {
                $this.remove();
            });
        });

    uploadDingz($("#userPhoto"), userPhoto, $scope);

    Http.request({
        url: config.sellerInfo(),
        method: "GET",
        success: function(response) {
            if (response.resultCode=="1") {
                $scope.providId = response.object.provider.providId;
            } else {
                layer.alert(response.resultMsg);
            }
        },
        error: function(ex) {
            layer.alert("获取用户信息失败!请刷新页面重试!");
        }
    });

	/**
	 * 保存修改
	 */
	$scope.saveChanges = function() {
        var modifyPassword = false;
        if($scope.password) {
			if($scope.password==null || $scope.password=="") {
				layerOpen2("请输入旧密码!");
				return;
			}
			if($scope.password1==null || $scope.password1=="") {
				layerOpen2("请输入新密码!");
				return;
			}
			if($scope.password1.length < 6 || !/^[a-zA-Z0-9]*([a-zA-Z][0-9]|[0-9][a-zA-Z])[a-zA-Z0-9]*$/.test($scope.password1)) {
				layerOpen2('密码强度弱[密码长度须超过6位且不能为纯数字或字母]');
				return;
			}
			if($scope.password == $scope.password1) {
				layerOpen2('新密码不能和旧密码一样');
				return;
			}
            if($scope.password2==null || $scope.password2=="") {
				layerOpen2("请确认新密码!");
                return;
            }
			if($scope.password1 != $scope.password2) {
				layerOpen2('两次密码不一致');
				return;
			}
			modifyPassword = true;
        }

        //  发送修改请求
        Http.request({
            url: config.changeProviderInfo,
            method: "POST",
            data: {
                providId: $scope.providId,
                profileUrl: $scope.headPicUrl || $rootScope.headPicUrl,
                updatePwd: modifyPassword,
                password: $scope.password,
                password1: $scope.password1,
                password2: $scope.password2
            },
            success: function(res) {
                if(res.resultCode === "1") {
                    layer.alert("账号修改成功", function() {
						location.reload();
                    });
                } else if (res.resultMsg) {
                    layer.alert(res.resultMsg);
                }
            }
        });
	};

}]);

//  订单中心
percenterApp.controller("sellerOrderCenterCtrl", ["$scope", "$rootScope", "$timeout", "Http", function($scope, $rootScope, $timeout, Http) {
	$rootScope.navClass = "sellerOrderCenter";
	$scope.startTime = "";
	$scope.endTime = "";
	$scope.currentPage = 1;

	//  日期选择器
	$(".datetimepickerstart, .datetimepickerend").datetimepicker({
		language: "zh-CN",
		minView: "month",//设置只显示到月份
		format : "yyyy-mm-dd hh:ii:ss",//日期格式
		autoclose: true,
	});

	//  初始订单状态
	$scope.status = "";
	$scope.pageChanged = function() {
		$timeout(function() {
			$scope.currentPage = $(".pagination .active a").text();
			$scope.queryOrderData();
            $scope.queryOrderCounts();
		}, 100);
	};

	/**
	 * 查询卖家中心订单接口
	 */
	$scope.queryOrderData = function() {
		var post = {
            "product.prodName": $scope.productName,
			startTime: $scope.startTime,
			endTime: $scope.endTime,
			custName: $scope.customerNickname,
			orderSeqGroup: $scope.orderId,
			status: $scope.status
		}, queryStr = "?", url;
		if($scope.status === "threeMonthAgo") {
			post.threeMonthAgo = "1";
		} else if($scope.status === "") {
			post.nearlyThreeMonth = "1";
		}
		for(var i in post) {
			if(post.hasOwnProperty(i) && post[i]) {
				queryStr += i + "=" + encodeURIComponent(post[i]) + "&";
			}
		}

		url = config.sellerOrderCenter + queryStr;

		url += "page.currentPage=" + ($scope.currentPage || 1);
		Http.request({
			url: url,
			method: "GET",
			data: post,
			success: function(res) {
				if(res.resultCode === "1") {
					$scope.pageInfo = res.page;
					$scope.pageCenter = res.object;
					angular.forEach($scope.pageCenter, function(order) {
						order.checked = false;
					});

					$scope.currentPage = $scope.pageInfo.currentPage;
				} else if(res.resultMsg) {
					$scope.pageCenter = [];
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("网络异常!请刷新页面重试!");
			}
		});
	};

    $("#startTime").on("change", function() {

		$scope.startTime = $("#startTime").val();

	});
	$("#endTime").on("change", function() {

		$scope.endTime = $("#endTime").val();

	});

	/**
	 * 查询订单统计
	 */
	$scope.queryOrderCounts = function() {
	    var url = config.sellerOrderStatus,
            params = {
                "product.prodName": $scope.productName,
                startTime: $scope.startTime,
                endTime: $scope.endTime,
                custName: $scope.customerNickname,
                orderSeqGroup: $scope.orderId
            },
            queryString = "";

        for (var i in params) {
            if(params.hasOwnProperty(i) && params[i]) {
                queryString += i + "=" + encodeURIComponent(params[i]) + "&";
            }
        }

        if(queryString.length) {
            url += "?" + queryString.replace(/\&$/, "");
        }

		Http.request({
			url: url,
			method: "GET",
			success: function(res) {
				if(res.resultCode === "1") {
					angular.forEach(res.object, function(item) {
						switch(item.status) {
							//  待付款
							case "0":
								$scope.waitPay = item.num;
								break;

							//  待处理
							case "1":
								$scope.waitProcess = item.num;
								break;

							//  已完成
							case "5":
								$scope.done = item.num;
								break;
						}
					});
				} else if(res.resultMsg) {
                    $scope.waitPay = "0";
                    $scope.waitProcess = "0";
                    $scope.done = "0";
					layer.alert(res.resultMsg);
				}
			},
			error: function() {
				layer.alert("网络异常!请刷新页面重试!");
			}
		});
	};

    $scope.queryOrder = function () {
        $scope.queryOrderData();
        $scope.queryOrderCounts();
    };
	
	/**
	 * 导出/下载历史订单
	 */
	$scope.exportHistoryOrder = function(e) {
		$(e.currentTarget).attr('href',config.exportOrdersToExcel);
	};

	$scope.queryOrderData();
	$scope.queryOrderCounts();

	/**
	 * 状态选择
	 */
	$scope.$watch("status", function(newV, oldV) {
		if(newV !== oldV) {
			$scope.currentPage = 1;
			$scope.queryOrderData();
			$scope.queryOrderCounts();
		}
	});

	$scope.allChecked = false;
	//勾选单个订单
	$scope.checkOneOrder = function(order) {
		order.checked=!order.checked;
		var notCheckedExist = false;
		for (var n=0;n<$scope.pageCenter.length;n++) {
			if (!$scope.pageCenter[n].checked) {
				notCheckedExist = true;
				break;
			}
		}
		if (notCheckedExist) {
			$scope.allChecked = false;
		} else {
			$scope.allChecked = true;
		}
	};
	//勾选全部订单
	$scope.checkAll = function() {
		var notCheckedExist = false;
		for (var n=0;n<$scope.pageCenter.length;n++) {
			if (!$scope.pageCenter[n].checked) {
				notCheckedExist = true;
				break;
			}
		}
		//存在未勾选的则全部重新勾选
		if (notCheckedExist) {
			$scope.allChecked = true;
			angular.forEach($scope.pageCenter, function(order) {
				order.checked = true;
			});
		}
		//已全选则全部取消
		else {
			$scope.allChecked = false;
			angular.forEach($scope.pageCenter, function(order) {
				order.checked = false;
			});
		}
	};

	//单个处理试用已开通的订单
	$scope.confirmTrial = function(orderSeqGroup) {
		var url = config.batchOperaTrialOrder + "?stringList[0]=" + orderSeqGroup;
		Http.request({
			url: url,
			method: "POST",
			success: function(response) {
				if (response.resultCode==1) {
					layer.alert("处理成功");
				} else {
					layer.alert("处理失败：" + response.resultMsg);
				}
				$scope.currentPage = 1;
				$scope.queryOrderData();
				$scope.queryOrderCounts();
				$scope.allChecked = false;
			},
			error: function(e) {
				layer.alert("处理异常：" + e);
			}
		});
	};

	//批量处理试用已开通的订单
	$scope.batchConfirmTrial = function() {
		var url = config.batchOperaTrialOrder;
		var noOrder2Deal = true;
		angular.forEach($scope.pageCenter, function(order, i) {
			if (order.checked) {
				noOrder2Deal = false;
				if (i==0) {
					url += "?";
				} else {
					url += "&";
				}
				url += "stringList["+i+"]="+order.orderSeqGroup;
			}
		});
		if (noOrder2Deal) {
			layer.alert("请先选择要处理的订单");
			return;
		}
		Http.request({
			url: url,
			method: "POST",
			success: function(response) {
				if (response.resultCode==1) {
					layer.alert("处理成功");
				} else {
					layer.alert("处理失败：" + response.resultMsg);
				}
				$scope.currentPage = 1;
				$scope.queryOrderData();
				$scope.queryOrderCounts();
				$scope.allChecked = false;
			},
			error: function(e) {
				layer.alert("处理异常：" + e);
			}
		});
	};


}]);

/**
 * 订单列表控
 */
percenterApp.controller("buyerCtrl", ["$scope", "$rootScope", "Http", "$routeParams", "$timeout", function($scope, $rootScope, Http, $routeParams, $timeout) {
	var orderStatusMap = {
		all: "allOrders",
		payed: "payedOrders",
		needPay: "needPayOrders"
	},
    orderStatusPostMap = {
        allOrders: "",
        payedOrders: "1",
        needPayOrders: "0"
    };

    $scope.startTime = "";
	$scope.endTime = "";

	//  日期选择器
	$(".datetimepickerstart, .datetimepickerend").datetimepicker({
		language: "zh-CN",
		minView: "month",//设置只显示到月份
		format : "yyyy-mm-dd hh:ii:ss",//日期格式
		autoclose: true,
	});

	$rootScope.navClass = orderStatusMap[$routeParams.status] || "allOrders";

	$scope.getStatus = function(status, e) {
		if($(e.currentTarget).hasClass("on")) return;
		$(e.currentTarget).addClass("on").siblings("li").removeClass("on");
		$scope.getTotal(status);
	};
	$scope.getTotal = function(status) {

		if(status === undefined) {
            status = orderStatusPostMap[$rootScope.navClass] || "";
		}

		$(".order-status" + status).addClass("on").siblings("li").removeClass("on");

		Http.request({
			url: config.orderQuery + '?order.status=' + status,
			method: "GET",
			success: function(data) {
				if(data.resultCode === "1") {
					$scope.orderList = data.object;
                    angular.forEach($scope.orderList, function(order) {
                        order.rows = order.packages[0].cells.length;
                    });

					$scope.maxSize = data.page.pageSize;
					$scope.bigTotalItems = data.page.totalRows;
					$scope.bigCurrentPage = data.page.currentPage;
					$scope.status = status;

					angular.forEach($scope.orderList, function(item) {
						item.checked = false;
					});

				} else if(data.resultMsg) {
					$scope.orderList = [];
					layer.alert(data.resultMsg);
					$scope.status = status;
				}
			},
			error: function(ex) {
				layer.alert("获取订单信息失败!请刷新页面重试!");
			}
		});

	};

	$scope.deleteOrder = function(orderSeqGroup,status){
		layer.confirm('您确定要删除该订单吗？', {
				btn: ['确定', '取消'] //按钮
			},function(){
				Http.request({
					url: config.editOrders(orderSeqGroup,status),
					method: "GET",
					success: function(data) {
						if(data.resultCode === "1") {
							layer.alert("删除成功!", function() {
								location.reload();
							});

						} else if(data.resultMsg) {
							layer.alert(data.resultMsg);
						}
					},
					error: function(ex) {
						layer.alert("获取订单信息失败!请刷新页面重试!");
					}
				});
	   });
	}
    
    /**
	 * 查询买家中心订单接口
	 */

	$scope.queryOrderData = function() {
		var post = {
			"product.prodName":$scope.prodName,
			startTime: $scope.startTime,
			endTime: $scope.endTime,
			orderSeq: $scope.orderId,
		}, queryStr = "?", url;
		
		for(var i in post) {
			if(post.hasOwnProperty(i) && post[i]) {
				queryStr += i + "=" + encodeURIComponent(post[i]) + "&";
			}
		}

		url = config.orderQuery + queryStr;

		url += "page.currentPage=" + ($scope.currentPage || 1);
		Http.request({
			url: url,
			method: "GET",
			data: post,
			success: function(data) {
				if(data.resultCode === "1") {
					$scope.orderList = data.object;
                    angular.forEach($scope.orderList, function(order) {
                        order.rows = order.packages[0].cells.length;
                    });

					$scope.maxSize = data.page.pageSize;
					$scope.bigTotalItems = data.page.totalRows;
					$scope.bigCurrentPage = data.page.currentPage;
				} else if(data.resultMsg) {
					$scope.orderList = [];
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("网络异常!请刷新页面重试!");
			}
		});
	};
	$("#startTime").on("change", function() {

		$scope.startTime = $("#startTime").val();

	});
	$("#endTime").on("change", function() {

		$scope.endTime = $("#endTime").val();

	});

    $scope.query = function () {

    }

	var keys = [
	    "prodName",
		"startTime",
		"endTime",
		"orderId"
	]
	//清空过滤条件
	$scope.clearCondition = function(){

		angular.forEach(keys, function(key) {
			$scope[key] = "";
		});
		$("#startTime").val("");
		$("#endTime").val("");
	}
	
	$scope.setPage = function(pageNo) {
		$scope.bigCurrentPage = pageNo;
	};

	$scope.pageChanged = function() {
	    $timeout(function () {
            $scope.bigCurrentPage = $(".pagination .active a").text();
            Http.request({
                url: config.orderQuery + '?page.currentPage=' + $scope.bigCurrentPage + '&order.status=' + $scope.status,
                method: "GET",
                success: function(data) {
                    if(data.resultCode == 1) {
                        $scope.orderList = data.object;
                        $scope.maxSize = data.page.pageSize;
                        $scope.bigTotalItems = data.page.totalRows;
                        $scope.bigCurrentPage = data.page.currentPage;
                    } else if(data.resultMsg) {
                        $scope.orderList = [];
                        layer.alert(data.resultMsg);
                    }
                }
            });
        }, 100);
	};

	$scope.getTotal();

}]);

/**
 * 订单回收站
 */
percenterApp.controller("buyerRubbishCtrl", ["$scope", "$rootScope", "Http", "$routeParams", "$timeout", function($scope, $rootScope, Http, $routeParams, $timeout) {

	$scope.buyRubbish = function() {
		Http.request({
			url: config.queryUnusualOrders,
			method: "GET",
			success: function(data) {
				if(data.resultCode === "1") {
					$scope.orderList = data.object;
					$scope.maxSize = data.page.pageSize;
					$scope.bigTotalItems = data.page.totalRows;
					$scope.bigCurrentPage = data.page.currentPage;
				} else if(data.resultMsg) {
					$scope.orderList = [];
					layer.alert(data.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("获取订单信息失败!请刷新页面重试!");
			}
		});
	}
	$scope.buyRubbish();

	$scope.checkFlag = false;
	$scope.x=false;
	$scope.arrId=[];
	$scope.checkedlist = [];
	var flag='';
	var str='';

	/**
	 * 全选
	 */
	$scope.checkrubAll = function(c,v) {
		$scope.checkFlag = !$scope.checkFlag;
		$scope.checkedlist = [];
		if($scope.checkFlag) {
			angular.forEach($scope.orderList, function(item, _index) {
				$scope.checkedlist.push(item.orderSeqGroup);
				item.checked = true;
			});
		} else {
			angular.forEach($scope.orderList, function(item, _index) {
				item.checked = false;
			});
		}
	}


	/**
	 * 单选
	 */
	$scope.checkOne= function (o) {
		o.checked = !o.checked;
		if(o.checked) {
			$scope.checkedlist.push(o.orderSeqGroup);
		} else {
			var orderSeq = o.orderSeqGroup,
				list = [];
			angular.forEach($scope.checkedlist, function(item, _index) {
				if(item !== orderSeq) {
					list.push(item);
				}
			});
			$scope.checkedlist = list;
		}
	};

	$scope.$watchCollection("checkedlist", function(newV) {
		if(newV.length && newV.length === $scope.orderList.length) {
			$scope.checkFlag = true;
		} else {
			$scope.checkFlag = false;
		}
	});

	$scope.batchDelete = function() {

		if($scope.checkedlist[0]==""||$scope.checkedlist.length==0) {
			layer.alert("请至少选中一条订单再删除！")
			return;
		}

		var queryString = "";
		angular.forEach($scope.checkedlist,function(g,i){
			queryString += 'stringList['+ i +']=' + g + '&';
		});
		queryString.replace(/\&$/, "");
		Http.request({
			url: config.batchDel+'?' + queryString,
			method: "GET",
			success: function(data) {
				if(data.resultCode === "1") {
					layer.alert("删除成功!", function() {
						location.reload();
					});
				} else if(data.resultMsg) {
					layer.alert(data.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("获取订单信息失败!请刷新页面重试!");
			}
		});
	}
	$scope.batchRestore = function() {

		if($scope.checkedlist[0]==""||$scope.checkedlist.length==0){
			layer.alert("请至少选中一条订单再还原！")
			return;
		};

		var queryString = "";
		angular.forEach($scope.checkedlist,function(g,i){
			queryString += 'stringList['+ i +']=' + g + '&';
		});
		queryString.replace(/\&$/, "");
		Http.request({
			url: config.batchRestore+'?' + queryString,
			method: "GET",
			success: function(data) {
				if(data.resultCode === "1") {
					layer.alert("还原成功!", function() {
						location.reload();
					});
				} else if(data.resultMsg) {
					layer.alert(data.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("获取订单信息失败!请刷新页面重试!");
			}
		});
	}
	$scope.deleteorderEver = function(id){
		Http.request({
			url: config.batchDel+'?stringList[0]='+id,
			method: "GET",
			success: function(data) {
				if(data.resultCode === "1") {
					layer.alert("删除成功!", function() {
						location.reload();
					});
				} else if(data.resultMsg) {
					layer.alert(data.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("获取订单信息失败!请刷新页面重试!");
			}
		});
	}
	$scope.returnorderEver = function(id){
		Http.request({
			url: config.batchRestore+'?stringList[0]='+id,
			method: "GET",
			success: function(data) {
				if(data.resultCode === "1") {
					layer.alert("还原成功!", function() {
						location.reload();
					});
				} else if(data.resultMsg) {
					layer.alert(data.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("获取订单信息失败!请刷新页面重试!");
			}
		});
	}
	$scope.setPage = function(pageNo) {
		$scope.bigCurrentPage = pageNo;
	};
	$scope.pageChanged = function() {
	    $timeout(function () {
            $scope.bigCurrentPage = $(".pagination .active a").text();
            Http.request({
                url: config.queryUnusualOrders + "?page.currentPage=" + $scope.bigCurrentPage,
                method: "GET",
                success: function(data) {
                    if(data.resultCode == 1) {
                        $scope.orderList = data.object;
                        $scope.maxSize = data.page.pageSize;
                        $scope.bigTotalItems = data.page.totalRows;
                        $scope.bigCurrentPage = data.page.currentPage;
                    } else if(data.resultMsg) {
                        layer.alert(data.resultMsg);
                    }
                }
            });
        }, 100);
	};
}]);

/**
 * 买家订单详情
 */
percenterApp.controller("orderDetailCtrl", ["$scope", "$routeParams", "Http", function($scope, $routeParams, Htttp) {

	var orderSeq = $routeParams.orderSeq,
		tmp;

	$scope.showLeft = false;

	Htttp.request({
		url: config.buyerOrderDetail(orderSeq),
		method: "POST",
		success: function(res) {
			if(res.resultCode === "1") {
				$scope.orderDetail = res.object[0];
				angular.forEach($scope.orderDetail.orderDetailDtoList, function(order) {

					tmp = ("" + order.quantityOne);

					if(order.unitOne !== null) {
						tmp += ("个" + order.unitOne);
					}

					if(order.quantityTwo !== null) {
						tmp += order.quantityTwo;
					}

					if(order.unitTwo !== null) {
						tmp += ("个" + order.unitTwo);
					}

					order.priceStr = ("" + order.price) + order.priceUnit;

					order.quantity = tmp;
				});

				$scope.orderDetail.tradeTypeStr = $scope.orderDetail.tradeType === 0 ? "线上交易" : "线下交易";
			} else if(res.resultMsg) {
				layer.alert(res.resultMsg);
			}
		},
		error: function(ex) {
			layer.alert("网络异常!请刷新页面重试!");
		}
	});

}]);

/**
 * 卖家中心订单详情
 */
percenterApp.controller("sellerOrderCtrl", ["$scope", "Http", "$routeParams", function($scope, Http, $routeParams) {
	var orderSeq = $routeParams.orderSeq;

	Http.request({
		url: config.sellerOrderDetail(orderSeq),
		method: "POST",
		success: function(res) {
			if(res.resultCode === "1") {
				$scope.orderDetail = res.object[0];
				$scope.orderDetail.quantity = ("" + $scope.orderDetail.quantityOne);
				if($scope.orderDetail.unitOne !== null) {
					$scope.orderDetail.quantity += ("个" + $scope.orderDetail.unitOne);
				}
				if($scope.orderDetail.quantityTwo !== null) {
					$scope.orderDetail.quantity += $scope.orderDetail.quantityTwo;
				}
				if($scope.orderDetail.unitTwo !== null) {
					$scope.orderDetail.quantity += ("个" + $scope.orderDetail.unitTwo);
				}
			} else if(res.resultMsg) {
				layer.alert(res.resultMsg);
			}
		},
		error: function(ex) {
			layer.alert("请求失败,请刷新页面重试!");
		}
	});
}]);

/**
 * 收藏
 */
percenterApp.controller("favoritesCtrl", function($scope, $http) {
	layer.alert("暂不支持此功能!敬请期待!");
    $('.pagination-layout').hide()
	return;
	var data = {
		"resultCode": "1",
		"resultMsg": "查询成功",
		"object": [{
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
			[{
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
			}, {
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
	if(data.resultCode == 1) {
		$scope.collect = data.object[1];
		$scope.page = data.object[0];
		$scope.currentPage = $scope.page.currentPage;
		$scope.maxSize = $scope.page.pageSize;
		$scope.totalItems = $scope.page.totalRows;
	}
	//    }).error(function() {
	//			console.log("服务器异常，请稍候再试");
	//		});

});

function layerOpen2(msg) {
	layer.open({
		icon: 2,
		title: '提示',
		content: msg
	});
}

function layerOpen1(msg) {
	layer.open({
		icon: 1,
		title: '提示',
		content: msg
	});
}

//买家中心应用
percenterApp.controller("myAppsCtrl", function($scope, $rootScope, $http, $log, $timeout) {
	$rootScope.navClass = "myApps";

	$scope.account = [];

	//页面刷新，加载应用列表
	$http.get(config.appQuery)
		.success(function(data) {
			if(data.resultCode == 1) {
				$scope.appList = data;
				$scope.maxSize = $scope.appList.page.pageSize;
				$scope.bigTotalItems = $scope.appList.page.totalRows;
				$scope.bigCurrentPage = $scope.appList.page.currentPage;
			} else {
				//alert(data.resultMsg);
			}
		})
		.error(function() {
			console.log("服务器异常，请稍候再试");

		}).then(function() {

	});

	$scope.setPage = function(pageNo) {
		$scope.bigCurrentPage = pageNo;
	};

	$scope.pageChanged = function() {
	    $timeout(function () {
            $scope.bigCurrentPage = $(".pagination .active a").text();
            $http.get(config.appQuery + '??page.currentPage=' + $scope.bigCurrentPage)
                .success(function(data) {
                    if(data.resultCode == 1) {
                        $scope.appList = data;
                    } else {
                        layerOpen2(data.resultMsg);
                    }
                })
                .error(function() {
                    console.log("服务器异常，请稍候再试");
                });
        }, 100);
	};

	//查找应用
	$scope.findApp = function() {
		if($scope.myApps.name == '' || $scope.myApps.name == null) {
			$scope.myApps.name = '';
		}
		$http.get(config.appQuery + '?prodName=' + $scope.myApps.name)
			.success(function(data) {
				if(data.resultCode == 1) {
					$scope.appList = data
				} else {
					layerOpen2(data.resultMsg);
				}
			})
			.error(function() {
				console.log("服务器异常，请稍候再试");
			});
	};

	$scope.mask = false;
	$scope.userWindow = false;
	$scope.renewalsWindow = false;

	//打开账号管理弹窗
	$scope.userManage = function(recordId, prodId, prodSaleAttId, prodName) {
		$scope.recordId = recordId;
		$scope.prodId = prodId;
		$scope.prodSaleAttId = prodSaleAttId;
		$scope.prodName = prodName;
		$http.get(config.childAccount + '/' + recordId)
			.success(function(data) {
				if(data.resultCode == 1) {
					$scope.childList = data;
				} else {
					layerOpen2(data.resultMsg);
				}
			})
			.error(function() {
				console.log("服务器异常，请稍候再试");
			});
		$scope.mask = true;
		$scope.userWindow = true;
		$scope.renewalsWindow = false;
	};

	//打开选择用户列表
	$scope.openList = function(prodId, prodSaleAttId) {
		$http.get(config.selectList + '/' + $scope.recordId)
			.success(function(data) {
				if(data.resultCode == 1) {
					$scope.selectList = data.data;
					$scope.account.selectedAccount = $scope.selectList[0];
				} else {
					layerOpen2(data.resultMsg);
				}
			})
			.error(function() {
				console.log("服务器异常，请稍候再试");
			});
	};

	//确认绑定账号
	$scope.confirmAccount = function(userId, certificateId) {

		if(userId == '' || userId == null) {
			$scope.inputParams = {
				"certificateId": certificateId
			};
		} else {
			$scope.inputParams = {
				"certificateId": certificateId,
				"userId": userId //如果不为空则认为是绑定操作，如果为空则认为是解绑操作
			};
		}

		$http.post(config.bindAndUnbind, $scope.inputParams, httpConfig)
			.success(function(data) {
				if(data.resultCode == 1) {
					layerOpen1(data.resultMsg);
					//刷新绑定数据
					$http.get(config.childAccount + '/' + $scope.recordId)
						.success(function(data) {
							if(data.resultCode == 1) {
								$scope.childList = data
							} else {
								layerOpen2(data.resultMsg);
							}
						})
						.error(function() {
							console.log("服务器异常，请稍候再试");
						});
					$('.accountSelect').hide();
				} else {
					layerOpen2(data.resultMsg);
				}
			})
			.error(function() {
				console.log("服务器异常，请稍候再试");
			});
	};

	$scope.renewals = function() {
		$scope.mask = true;
		$scope.userWindow = false;
		$scope.renewalsWindow = true;
	};

	$scope.close = function() {
		$scope.mask = false;
		$scope.userWindow = false;
		$scope.renewalsWindow = false;
	};

	$('.userWindow ').on('click', '.bind', function(event) {
		// Act on the event
		$('.accountSelect').hide();
		$(this).siblings('.accountSelect').show();
	});

	$('.userWindow ').on('click', '.closeWin', function(event) {
		// Act on the event
		$(this).parents('.accountSelect').hide();
	});

	$('.text-slide .hd li').click(function() {
		$('.text-slide .hd li').removeClass('on');
		$(this).addClass('on');
	});

	$(function() {

		$('.loginBtns .fl').hover(
			function() {
				$(this).toggleClass('on')
			}
		);

	})
})

//买家企业信息
percenterApp.controller("msgInfoCtrl", function($scope, $rootScope, $http) {
	$rootScope.navClass = "info";

	$scope.info = [];

	$scope.findApp = function() {
		if($scope.myApps.name == null) {
			$scope.myApps.name == '';
		}
		$http.get(config.appQuery + '?prodName=' + $scope.myApps.name)
			.success(function(data) {
				if(data.resultCode == 1) {
					$scope.appList = data;
				} else {
					layerOpen2(data.resultMsg);
				}
			})
			.error(function() {
				console.log("服务器异常，请稍候再试");
			});
	};

	//获取地区数据
	$scope.area_Id = "";
	$http.post(config.queryAreas, httpConfig)
		.success(function(response) {
			$http.post(config.getOrgInFlat, httpConfig)
				.success(function(data) {
					if(data.resultCode == 1) {
						$scope.info = data.data;
						$scope.orginfo = $scope.info.orgInfo;
						$scope.orgproid = $scope.orginfo.orgProperty;
						if($scope.orgproid == 1) {
							$('input[name="firmnature"]').val("企业");
						}
						if($scope.orgproid == 2) {
							$('input[name="firmnature"]').val("事业单位");
						}
						if($scope.orgproid == 3) {
							$('input[name="firmnature"]').val("社会团体");
						}
						if($scope.orgproid == 4) {
							$('input[name="firmnature"]').val("个体商户");
						}
						if($scope.orgproid == 5) {
							$('input[name="firmnature"]').val("民办非企业");
						}
						if($scope.orgproid == 9) {
							$('input[name="firmnature"]').val("其他");
						}

						$scope.arealist = response;
						angular.forEach($scope.arealist, function(area, i) {
							$scope.nodes = area.nodes;
							angular.forEach($scope.nodes, function(node, i) {
								if(node.id == $scope.orginfo.areaCounty) {

									$scope.selectsecond = node.name;

									$scope.area_Id = $scope.orginfo.areaCounty;
									if(area.id == node.pId) {
										$scope.selectfirst = area.name;
									}
								}

							})
						})
					} else {
						//layerOpen2(response.resultMsg);
					}
				})
				.error(function() {
					console.log("服务器异常，请稍候再试");
				});

		})
		.error(function() {
			console.log("服务器异常，请稍候再试");
		});

	$scope.saveupdate = function() {

		$scope.parames = {
			"orgId": $scope.info.orgId
		}
		console.log($('input[name="firmnature"]').data("id"));
		$scope.parames['orgInfo.orgProperty'] = $scope.orgproid;
		$scope.parames['orgInfo.areaCounty'] = $scope.area_Id;
		$scope.parames['orgInfo.address'] = $scope.orginfo.address;

		$http.post(config.updateOrgInFlat, $scope.parames, httpConfig)
			.success(function(response) {
				if(response.resultCode == 1) {
					layerOpen1(response.resultMsg);
				} else {
					layerOpen2(response.resultMsg);
				}
			})
			.error(function() {
				console.log("服务器异常，请稍候再试");
			});
	}

	$scope.selectFirstOne = function(x) {
		$scope.selectfirst = x.name;
		$scope.secondList = x.nodes;
		$('input[name="selectsecond"]').val("");
		$("#selectcounties-error").show();
		$scope.area_Id = "";
	}

	$scope.selectSec = function(y) {
		$scope.selectsecond = y.name;

		$scope.area_Id = y.id;
		$("#selectcounties-error").hide();
	}

	$('.dropdown-menucity').delegate('li', 'click', function(event) {
		event.preventDefault();
		var xzc = $(this).parent().siblings('.dropdown-toggle').children('.xz-content');
		xzc.val($(this).text());
		xzc.attr('data-id', $(this).attr('data-id'));
	});
	$('#orgPropertyId').delegate('li', 'click', function(event) {
		event.preventDefault();
		var xzc = $(this).parent().siblings('.dropdown-toggle').children('.xz-content');
		xzc.val($(this).text());
		xzc.attr('data-id', $(this).attr('data-id'));
		$scope.orgproid = $(this).attr('data-id');
		if($(this).parent().attr("name") == "orgPropertyId") {
			$scope.orgPropertyId = $(this).attr('data-id');
		}

	});

})

//买家账户信息
percenterApp.controller("accountCtrl", function($scope, $http, $rootScope) {

	$rootScope.navClass = "account";

	$scope.account = [];

	$('.dropdown-menu').on('click', 'li', function(event) {
		event.preventDefault();
		var xzc = $(this).parent().siblings('.dropdown-toggle').children('.xz-content');
		xzc.val($(this).find('a').text());
		$scope.account.sex = $(this).find('a').attr('sex');
		$scope.account.sextype = $(this).find('a').attr('sextype')
	});

	$rootScope.acnshow = function() {
		$scope.account.username = $rootScope.myInfo.userName;
		if($rootScope.myInfo.sex == true) {
			$scope.account.sex = '男';
			$scope.account.sextype = 'true';
		} else if($rootScope.myInfo.sex == false) {
			$scope.account.sex = '女';
			$scope.account.sextype = 'false';
		}
		$scope.headPicId = $rootScope.myInfo.headPicId;
		$scope.headPicUrl = $rootScope.myInfo.headPicUrl;

	}
	var userPhoto = [];
	//文件上传
	$scope.url = config.uploadFile;
	$scope.uploadButton = $('<button/>')
		.addClass('btn btn-primary')
		.prop('disabled', true)
		.text('Processing...')
		.on('click', function(events) {
			events.preventDefault();
			events.stopPropagation();
			var $this = $(this),
				data = $this.data();
			$this
				.off('click')
				.text('终止')
				.on('click', function() {
					$this.remove();
					data.abort();
				});
			data.submit().always(function() {
				$this.remove();
			});
		});

	$('.modify-btn').on("click", function() {
		if($(this).hasClass('on')) {
			$scope.updatePwd = false;
			$(this).removeClass('on');
			$(this).html('修改');
			$(this).siblings('.modify_show').removeClass('on');
		} else {
			$scope.updatePwd = true;
			$(this).addClass('on');
			$(this).html('不修改');
			$(this).siblings('.modify_show').addClass('on');
		}
	});
	$scope.saveChanges = function() {

		if($scope.updatePwd) {
			if($scope.account.password == '' || $scope.account.password == null) {
				layerOpen2('请输入旧密码');
				return;
			}
			if($scope.account.password1 == '' || $scope.account.password1 == null) {
				layerOpen2('请输入新密码');
				return;
			}
			if($scope.account.password1.length < 6 || !/^[a-zA-Z0-9]*([a-zA-Z][0-9]|[0-9][a-zA-Z])[a-zA-Z0-9]*$/.test($scope.account.password1)) {
				layerOpen2('密码强度弱[密码长度须超过6位且不能为纯数字或字母]');
				return;
			}
			if($scope.account.password2 == '' || $scope.account.password2 == null) {
				layerOpen2('请确认新密码');
				return;
			}
			if($scope.account.password1 != $scope.account.password2) {
				layerOpen2('两次密码不一致');
				return;
			}
		}
		if($scope.account.sex == '' || $scope.account.sex == null) {

			layerOpen2('请选择性别');
			return;
		}
		if($scope.account.username == '' || $scope.account.username == null) {

			layerOpen2('请输入姓名');
			return;
		}
		if($scope.headPicId == '' || $scope.headPicId == null) {

			layerOpen2('请上传头像');
			return;
		}
		if($scope.headPicUrl == '' || $scope.headPicUrl == null) {

			layerOpen2('请上传头像');
			return;
		}


		$scope.params = {
			"password": $scope.account.password, //旧密码
			"password1": $scope.account.password1, //新密码
			"password2": $scope.account.password2,
			"sex": $scope.account.sextype, //0为女，1为男
			"updatePwd": $scope.updatePwd, //为true表示修改密码，为false表示不修改密码
			"userName": $scope.account.username,
			"headPicId": $scope.headPicId,
			"headPicUrl": $scope.headPicUrl
		};

		$http.post(config.updateOrgUser, $scope.params, httpConfig)
			.success(function(data) {

				if(data.resultCode == 1) {
					layer.alert("账号修改成功", function(){
						location.reload();
					});
				} else {
					layerOpen2(data.resultMsg);
				}
			})
			.error(function() {
				console.log("服务器异常，请稍候再试");
			});
	};

	uploadDingz('#userPhoto', userPhoto, $scope);

})

//买家子账户信息

percenterApp.controller('childUserManageCtrl', ['$scope', '$rootScope', '$http', 'getUserList', 'addOrgUser', 'updateOrgUser', 'deleteUser',
	function($scope, $rootScope, $http, getUserList, addOrgUser, updateOrgUser, deleteUser) {

		$rootScope.navClass = "childUserManage";
		//展示新增子用户
		$scope.showAdd = function() {
			$scope.user2add = {
				sysUserName: "",
				password: "",
				userName: "",
				cellPhone: ""
			};
			$("#updateChildUser").hide();
			$("#addChildUser").show();
		};

		function checkPhone() {
			var phone = $('input[name="phone"]').eq(1).val();
			if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
				$("#phone-error").show();
				return false;
			} else {
				return true;
			}
		}

		function checkPhone2() {
			var phone = $('input[name="phone"]').eq(0).val();
			if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
				$("#phone-error2").show();
				return false;
			} else {
				return true;
			}
		}
        
        function checkPhone3() {
            var phone = $('input[name="userName"]').eq(1).val();
            if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
                $("#name-error").show();
                return false;
            } else {
                return true;
            }
        }
        function checkPhone4() {
            var phone = $('input[name="userName"]').eq(0).val();
            if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
                $("#name-error2").show();
                return false;
            } else {
                return true;
            }
        }
        
		//新增子用户提交
		$scope.addUser = function() {
			if(checkPhone3()&&checkPhone()) {
				$("#phone-error").hide();
				$("#name-error").hide();
				addOrgUser($scope.user2add).then(function(response) {
					if(response.resultCode != 1) {
						layerOpen2(response.resultMsg);
						return;
					}
					$("#addChildUser").hide();
					// layerOpen1(response.resultMsg);
					$scope.getUserList(1);
				});
			}
		};

		//展示修改子用户信息
		$scope.showUpdate = function(el) {

			var userId = el.user.userId;
			$.each($scope.userList, function(i, userInfo) {
				if(userInfo.userId == userId) {
					$scope.user2update = userInfo;
					return false;
				}
			});
			$("#addChildUser").hide();
			$("#updateChildUser").show();
		};

		//修改子用户信息提交
		$scope.updateUser = function() {
			var params = {
				"userId": $scope.user2update.userId,
				"sysUserName": $scope.user2update.sysUserName,
				"password": $scope.user2update.password,
				"userName": $scope.user2update.userName,
				"cellPhone": $scope.user2update.cellPhone
			}
			if(checkPhone4()&&checkPhone2()) {
				$("#phone-error2").hide();
				$("#name-error2").hide();
				addOrgUser(params).then(function(response) {
					if(response.resultCode != 1) {
						layerOpen2(response.resultMsg);
						return;
					}
					$("#updateChildUser").hide();
					layerOpen1(response.resultMsg);
					$scope.getUserList(1);
				});
			}
		};

		//软删除子用户
		$scope.deleteUser = function(el) {

			layer.confirm('您确定要删除该子用户信息吗？', {
				btn: ['确定', '取消'] //按钮
			}, function() {
				var params = {
					userId: el.user.userId
				};
				deleteUser(params).then(function(response) {
					if(response.resultCode != 1) {
						layerOpen2(response.resultMsg);
						return;
					}
					layerOpen1(response.resultMsg);
					$scope.getUserList(1);
				});
			}, function() {

			});
		};

		//取消新增/修改用户操作
		$scope.cancelOperate = function() {
			$(".register-layout").hide();
		};

		//分页函数
		function Pages(jqid, num_entries, items_per_page, pageselectCallback) {
			this.lockpaginaton = false;
			this.pageselectCallback = pageselectCallback;
			this.initPagination = function() {
				var that = this;
				$(jqid).pagination(num_entries, {
					num_edge_entries: 1, //边缘页数
					num_display_entries: 4, //主体页数
					callback: that.pageselectCallback,
					link_to: "javascript:void(0)",
					items_per_page: items_per_page, //每页显示10项,
					prev_text: "<上一页",
					next_text: "下一页>"
				});
			}
		}

		//查询子用户列表
		$scope.getUserList = function(pageNo) {
			var params = {
				page: pageNo,
				rows: 5
			};
			getUserList(params).then(function(response) {
				if(response.resultCode != 1) {
					alert(response.resultMsg);
					return;
				}
				$scope.userList = response.data;

				if(pageNo == 1) {
					var pagination = new Pages('#pagination', response.page.totalRows, 5, function(page_index, jq) {
						if(this.lockpaginaton) {
							$scope.getUserList(page_index + 1);
						}
						this.lockpaginaton = true;
					});
					pagination.initPagination(); //初始化
				}
			});
		};

		//初始化加载第一页子用户信息
		$scope.getUserList(1);

	}
]);

//	服务商资料重新提交审核
percenterApp.controller("providerReSubmitCtrl", ["$scope", "$rootScope", "Http", "scopeService", function($scope, $rootScope, Http, scopeService) {

	$rootScope.navClass = "infoManange";

	$scope.manageMap = [{
		id: 1,
		title: "应用软件"
	}, {
		id: 2,
		title: "管理软件"
	}, {
		id: 3,
		title: "行业软件"
	}, {
		id: 4,
		title: "安全防护软件"
	}, {
		id: 5,
		title: "多媒体软件"
	}, {
		id: 6,
		title: "办公软件"
	}, {
		id: 7,
		title: "云服务"
	}];

	$scope.industryType = "1";
	$scope.industryStr = "应用软件";

	$scope.selectType = function(id) {
		$scope.industryType = "" + id;
		angular.forEach($scope.manageMap, function(item) {
			if(item.id === id) {
				$scope.industryStr = item.title;
			}
		});
	};

	//	文件上传
	$("#file-01").ajaxfileupload({
		action: config.uploadFile,
		onComplete: function(res) {
			if (res.resultCode === "1") {
                scopeService.safeApply(function() {
                    $scope.businessLicenceUrl = res.data.fileName;
                });
			}
			$rootScope.maskCtrl(false);
		},
		onStart: function() {
			$rootScope.maskCtrl(true);
		},
		onCancel: function() {
			console.log('no file selected');
		}
	});

	$("[name='time']").datetimepicker({
		autoclose: true,
		language: "zh-CN"
	}).on("change", function () {
        $scope.registrationTime = $("[name='time']").val();
    });

	/**
	 * 查询卖家信息
	 */
	Http.request({
		url: config.sellerInfo(),
		method: "GET",
		success: function(res) {
			if(res.resultCode === "1") {
			    var resp;
				$scope.info = res.object;
                resp = res.object.provider;
                $scope.address = resp.address || "";
                $scope.registeredCapital = resp.registeredCapital || "";
                $scope.providName = resp.providName || "";
                $scope.description = resp.description || "";
                $scope.businessLicence = resp.businessLicence || "";
                $scope.businessLicenceUrl = resp.businessLicenceUrl || "";
                $scope.legalPerson = resp.legalPerson || "";
                $scope.phoneNum = resp.phoneNum || "";
                $scope.mail = resp.mail || "";
                $scope.registrationTime = resp.registrationTime || "";
                $scope.linkman = resp.linkman;
                $scope.employeeNumber = resp.employeeNumber || "";
                $scope.developerNumber = resp.developerNumber || "";
                $scope.salerNumber = resp.salerNumber || "";
                $scope.industryType = resp.industryType || 1;
                $scope.servicePhone = resp.servicePhone || "";
                $scope.serviceMail = resp.serviceMail || "";
                $scope.serviceWechat = resp.serviceWechat || "";
                $scope.serviceMicroblog = resp.serviceMicroblog || "";
                $scope.website = resp.website || "";
				Http.request({
					url: config.lastFailAuditRecord($scope.info.provider.providId),
					success: function(res) {
						if(res.resultCode === "1" && res.object instanceof Object && res.object.description) {
							$scope.unPassDes = res.object.description || "";
                            if(res.object.description.length) {
                                layer.alert(res.object.description);
                            }
						} else if (res.resultCode !== "1" && res.resultMsg) {
							layer.alert(res.resultMsg);
						}
					},
					error: function(ex) {
						layer.alert("网络异常!请刷新页面重试!");
					}
				});
			} else if(res.resultMsg) {
				layer.alert(res.resultMsg);
			}
		},
		error: function(ex) {
			layer.alert("获取用户信息失败!请刷新页面重试!");
		}
	});

	/**
	 * 保存修改
	 */
	$scope.saveupdate = function() {
		var tip = "",
			post = {};

		//  商家名称非空验证
		if(!$scope.providName) {
			tip = "商家名称不能为空!";
		}

		//  商家简介非空验证
		if(tip === "" && !$scope.description) {
			tip = "商家简介不能为空!";
		}

		//	法人不能为空
		if(tip === "" && !$scope.legalPerson) {
			tip = "法人不能为空!";
		}

		//	营业执照文件地址
		if(tip === "" && !$scope.businessLicenceUrl) {
			tip = "请先上传营业执照文件";
		}

		//	营业执照号
		if(tip === "" && !$scope.businessLicence) {
			tip = "营业执照号不能为空";
		}

		//	注册资金
		if(tip === "" && isNaN(parseFloat($scope.registeredCapital))) {
			tip = "注册资金格式不正确";
		}

		//  手机号
		if(tip === "" && !Common.check("mobile", $scope.phoneNum)) {
			tip = "联系人手机号格式不正确!";
		}

		//  研发人数验证
		if(tip === "" && !Common.check("digital", $scope.developerNumber)) {
			tip = "研发人数不正确!";
		}

		//  销售人数验证
		if(tip === "" && !Common.check("digital", $scope.salerNumber)) {
			tip = "销售人数不正确!";
		}

		//  售后电话
		if(tip === "" && !Common.check("mobile", $scope.servicePhone)) {
			tip = "售后电话不正确!";
		}

		//	员工人数验证
		if(tip === "" && !Common.check("digital", $scope.developerNumber)) {
			tip = "研发人数不正确!";
		}

		//	销售人数验证
		if(tip === "" && !Common.check("digital", $scope.salerNumber)) {
			tip = "销售人数不正确!";
		}

		//  售后邮箱
		if(tip === "" && !Common.check("mail", $scope.serviceMail)) {
			tip = "售后邮箱不正确!";
		}

		//  售后微信
		if(tip === "" && !$scope.serviceWechat) {
			tip = "售后微信不能为空!";
		}

		//  售后微博
		if(tip === "" && !Common.check("url", $scope.serviceMicroblog)) {
			tip = "售后微博不正确!应为网站格式!";
		}

		if(tip !== "") {
			layer.alert(tip);
			return;
		}

		post.providId = $scope.info.provider.providId;
		post.providName = $scope.providName;
		post.description = $scope.description;
		post.businessLicence = $scope.businessLicence;
		post.businessLicenceUrl = $scope.businessLicenceUrl;
		post.legalPerson = $scope.legalPerson;
		post.phoneNum = $scope.phoneNum;
		post.mail = $scope.mail;
		post.address = $scope.address;
		post.registeredCapital = $scope.registeredCapital;
		post.registrationTime = $("[name='time']").val() + ":00";
		post.linkman = $scope.linkman;
		post.employeeNumber = $scope.employeeNumber || 1;
		post.developerNumber = $scope.developerNumber;
		post.salerNumber = $scope.salerNumber;
		post.industryType = $scope.industryType == "undefined" ? 1 : $scope.industryType;
		post.servicePhone = $scope.servicePhone;
		post.serviceMail = $scope.serviceMail;
		post.serviceWechat = $scope.serviceWechat;
		post.serviceMicroblog = $scope.serviceMicroblog;
		post.website = $scope.website;

		Http.request({
			url: config.updateProviderInfo,
			method: "POST",
			data: post,
			success: function(res) {
				if(res.resultCode === "1") {
					layer.alert("修改成功!", function() {
						location.reload();
					});
				} else if(res.resultMsg) {
					layer.alert(res.resultMsg);
				}
			},
			error: function(ex) {
				layer.alert("修改失败!请重试!");
			}
		});
	};
}]);
