var getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$|#)");
    var hurl = window.location.search;
    hurl = hurl.replace(/%20/g, "+");
    var r = hurl.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};


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
    }).on('fileuploadadd', function (e, data) {
        var $this = $(this);
        //限制上传一个
        $this.parent().siblings('.filesList-ui').html('');
        data.context = $('<div/>').appendTo($this.parent().siblings('.filesList-ui'));
        $.each(data.files, function (index, file) {
            var node = $('<p/>')
                .append($('<span/>'));
            if (!index) {
                node
                    .append('<br>')
                    .append($scope.uploadButton.clone(true).data(data));
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
                .text('上传')
                .prop('disabled', !!data.files.error);
        }
    }).on('fileuploaddone', function (e, data) {
        if (data.result.resultCode == "1") {
            var link = $('<a>')
                .attr('target', '_blank');
            $scope.headPicId = data.result.data.fileId;
            $scope.headPicUrl = data.result.data.fileName;
            $('.headPicUrl').hide();
            $(data.context.children('p').remove('button'))
                .append('<span style="color: red;">上传成功</span>');
            data.context.closest('.filesList-ui').siblings('.error-text').hide();
        } else if (data.result.resultCode != "1") {
            var error = $('<span class="text-danger"/>').text("上传失败");
            $(data.context.children())
                .append('<br>')
                .append(error);
        }
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index) {
            var error = $('<span class="text-danger"/>').text('文件上传失败.');
            $(data.context.children()[index])
                .append('<br>')
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
}

personalApp.factory('getUserList', ['$http', '$q', function ($http, $q) {
    return function (params) {
        var defer = $q.defer();
        $http({
            method: "POST",
            url: config.getUserList,
            data: params
        }).success(function (data, status, headers, config) {
            defer.resolve(data);
        }).error(function (data, status, headers, config) {
            defer.reject(data);
        });
        return defer.promise;
    }
}]).factory('addOrgUser', ['$http', '$q', function ($http, $q) {
    return function (params) {
        var defer = $q.defer();
        $http({
            method: "POST",
            url: config.addOrgUser,
            data: params
        }).success(function (data, status, headers, config) {
            defer.resolve(data);
        }).error(function (data, status, headers, config) {
            defer.reject(data);
        });
        return defer.promise;
    }
}]).factory('updateOrgUser', ['$http', '$q', function ($http, $q) {
    return function (params) {
        var defer = $q.defer();
        $http({
            method: "POST",
            url: config.updateOrgUser,
            data: params
        }).success(function (data, status, headers, config) {
            defer.resolve(data);
        }).error(function (data, status, headers, config) {
            defer.reject(data);
        });
        return defer.promise;
    }
}]).factory('deleteUser', ['$http', '$q', function ($http, $q) {
    return function (params) {
        var defer = $q.defer();
        $http({
            method: "POST",
            url: config.deleteUser,
            data: params
        }).success(function (data, status, headers, config) {
            defer.resolve(data);
        }).error(function (data, status, headers, config) {
            defer.reject(data);
        });
        return defer.promise;
    }
}]);

personalApp.filter('getTime', function () {
    return function (input) {
        var arr = input.split(" ");
        return arr[1];
    }
});

personalApp.filter('sliceTime', function () {
    return function (input) {
        return input.slice(5);
    }
});

personalApp.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});

personalApp.run(function (paginationConfig, $http, $rootScope) {
    paginationConfig.firstText = '最前';
    paginationConfig.previousText = '前一页';
    paginationConfig.nextText = '下一页';
    paginationConfig.lastText = '最后';

    $rootScope.$on("$routeChangeStart", function(event, next, current) {
         $http.get(config.myInfo)
             .success(function (data) {
                 if (data.resultCode == 1) {
                     $rootScope.myInfo = data.data;
                 } else if(data.resultMsg) {
                     layer.alert(data.resultMsg);
                 }
             })
             .error(function () {
                 console.log("服务器异常，请稍候再试");
             });
    });

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
personalApp.controller("accountCtrl", function ($scope, $http, $rootScope) {

    $scope.account = [];

    $('.dropdown-menu').on('click', 'li', function (event) {
        event.preventDefault();
        var xzc = $(this).parent().siblings('.dropdown-toggle').children('.xz-content');
        xzc.val($(this).find('a').text());
        $scope.account.sex = $(this).find('a').attr('sex');
        $scope.account.sextype = $(this).find('a').attr('sextype')
    });

    $rootScope.acnshow = function () {
        $scope.account.username = $rootScope.myInfo.userName;
        if ($rootScope.myInfo.sex == true) {
            $scope.account.sex = '男';
            $scope.account.sextype = 'true';
        }
        else if ($rootScope.myInfo.sex == false) {
            $scope.account.sex = '女';
            $scope.account.sextype = 'false';
        }
        $scope.headPicId = $rootScope.myInfo.headPicId;
        $scope.headPicUrl = $rootScope.myInfo.headPicUrl;
//		if($scope.account.sex == 'false') {
//			
//		} else if($scope.account.sex == 'true') {
//			
//		} else {
//			$('.xz-content').val('')
//		}
    }
    var userPhoto = [];
    //文件上传
    $scope.url = config.uploadFile;
    $scope.uploadButton = $('<button/>')
        .addClass('btn btn-primary')
        .prop('disabled', true)
        .text('Processing...')
        .on('click', function (events) {
            events.preventDefault();
            events.stopPropagation();
            var $this = $(this),
                data = $this.data();
            $this
                .off('click')
                .text('终止')
                .on('click', function () {
                    $this.remove();
                    data.abort();
                });
            data.submit().always(function () {
                $this.remove();
            });
        });

    $('.modify-btn').on("click", function () {
        if ($(this).hasClass('on')) {
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
    $scope.saveChanges = function () {

        if ($scope.updatePwd) {
            if ($scope.account.password == '' || $scope.account.password == null) {
                layerOpen2('请输入旧密码');
                return;
            }
            if ($scope.account.password1 == '' || $scope.account.password1 == null) {
                layerOpen2('请输入新密码');
                return;
            }
            if ($scope.account.password1 != $scope.account.password2) {

                layerOpen2('两次密码不一致');
                return;
            }
        }
        if ($scope.account.sex == '' || $scope.account.sex == null) {

            layerOpen2('请选择性别');
            return;
        }
        if ($scope.account.username == '' || $scope.account.username == null) {

            layerOpen2('请输入姓名');
            return;
        }
        if ($scope.headPicId == '' || $scope.headPicId == null) {

            layerOpen2('请上传头像');
            return;
        }
        if ($scope.headPicUrl == '' || $scope.headPicUrl == null) {

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
            .success(function (data) {

                if (data.resultCode == 1) {
                    //layerOpen1(data.resultMsg);
                    location.reload();
                } else {
                    layerOpen2(data.resultMsg);
                }
            })
            .error(function () {
                console.log("服务器异常，请稍候再试");
            });
    };

    uploadDingz('#userPhoto', userPhoto, $scope);

}).controller("orderCtrl", function ($scope, $http) {

    $scope.setPage = function (pageNo) {
        $scope.bigCurrentPage = pageNo;
    };

    $scope.pageStatus = getQueryString('status');
    $scope.getTotal = function (status) {
        if (status === undefined) {
            status = "";
        }
        $http.get(config.orderQuery + '?order.status=' + status)
            .success(function (data) {
                $scope.orderList = []

                if (data.resultCode != 1) {
                    //layerOpen2(data.resultMsg);
                    return;
                }
                $scope.orderList = data.object[1];
                $scope.maxSize = data.object[0].pageSize;
                $scope.bigTotalItems = data.object[0].totalRows;
                $scope.bigCurrentPage = data.object[0].currentPage;
                $scope.status = status;
            })
            .error(function () {
                console.log("服务器异常，请稍候再试");
            });
    };

    $scope.getStatus = function (status, e) {
        if ($(e.currentTarget).hasClass("on")) return;
        $(e.currentTarget).addClass("on").siblings("li").removeClass("on");
        $scope.getTotal(status);
    };

    $scope.getTotal('');

    if ($scope.pageStatus == 'all' || $scope.pageStatus == '' || $scope.pageStatus == null) {
        $('.text-slide .hd li').removeClass('on');
        $scope.getTotal();
        $('.all').addClass('on');
    } else if ($scope.pageStatus == 0) {
        $('.text-slide .hd li').removeClass('on');
        $scope.getStatus($scope.pageStatus);
        $('.wait').addClass('on');
    } else if ($scope.pageStatus == 1) {
        $('.text-slide .hd li').removeClass('on');
        $scope.getStatus($scope.pageStatus);
        $('.already').addClass('on');
    }

    $scope.pageChanged = function () {
        $http.get(config.orderQuery + '?page.currentPage=' + $scope.bigCurrentPage + '&order.status=' + $scope.status)
            .success(function (data) {
                if (data.resultCode == 1) {
                    $scope.orderList = data.object[1];
                    $scope.maxSize = data.object[0].pageSize;
                    $scope.bigTotalItems = data.object[0].totalRows;
                    $scope.bigCurrentPage = data.object[0].currentPage;
                } else {
                    //layerOpen2(data.resultMsg);
                }
            })
            .error(function () {
                console.log("服务器异常，请稍候再试");
            });
    };

    $scope.order = [];

    $scope.getOrder = function () {
        if ($scope.order.num == '' || $scope.order.num == null) {
            // alert('请输入订单号');
            // return;
            $scope.order.num == '';
        }
        $http.get(config.orderQuery + '?orderSeq=' + $scope.order.num)
            .success(function (data) {
                if (data.resultCode == 1) {
                    $scope.orderList = data.object[1];
                    $scope.maxSize = data.object[0].pageSize;
                    $scope.bigTotalItems = data.object[0].totalRows;
                    $scope.bigCurrentPage = data.object[0].currentPage;
                } else {
                    //layerOpen2(data.resultMsg);
                }
            })
            .error(function () {
                console.log("服务器异常，请稍候再试");
            });
    };

//	$('.text-slide .hd li').click(function() {
//		$('.text-slide .hd li').removeClass('on');
//		$(this).addClass('on');
//	});

    $(function () {

        $('.loginBtns .fl').hover(
            function () {
                $(this).toggleClass('on')
            }
        );

    })
}).controller("myAppsCtrl", function ($scope, $http, $log) {

    $scope.account = [];

    //页面刷新，加载应用列表
    $http.get(config.appQuery)
        .success(function (data) {
            if (data.resultCode == 1) {
                $scope.appList = data;
                $scope.maxSize = $scope.appList.page.pageSize;
                $scope.bigTotalItems = $scope.appList.page.totalRows;
                $scope.bigCurrentPage = data.object[0].currentPage;
            } else {
                //alert(data.resultMsg);
            }
        })
        .error(function () {
            console.log("服务器异常，请稍候再试");

        }).then(function () {

    });


    $scope.setPage = function (pageNo) {
        $scope.bigCurrentPage = pageNo;
    };

    $scope.pageChanged = function () {
        $http.get(config.appQuery + 'page=' + $scope.bigCurrentPage)
            .success(function (data) {
                if (data.resultCode == 1) {
                    $scope.appList = data;
                } else {
                    layerOpen2(data.resultMsg);
                }
            })
            .error(function () {
                console.log("服务器异常，请稍候再试");
            });
    };

    //查找应用
    $scope.findApp = function () {
        if ($scope.myApps.name == '' || $scope.myApps.name == null) {
            $scope.myApps.name = '';
        }
        $http.get(config.appQuery + '?prodName=' + $scope.myApps.name)
            .success(function (data) {
                if (data.resultCode == 1) {
                    $scope.appList = data
                } else {
                    layerOpen2(data.resultMsg);
                }
            })
            .error(function () {
                console.log("服务器异常，请稍候再试");
            });
    };

    $scope.mask = false;
    $scope.userWindow = false;
    $scope.renewalsWindow = false;

    //打开账号管理弹窗
    $scope.userManage = function (recordId, prodId, prodSaleAttId, prodName) {
        $scope.recordId = recordId;
        $scope.prodId = prodId;
        $scope.prodSaleAttId = prodSaleAttId;
        $scope.prodName = prodName;
        $http.get(config.childAccount + '/' + recordId)
            .success(function (data) {
                if (data.resultCode == 1) {
                    $scope.childList = data;
                } else {
                    layerOpen2(data.resultMsg);
                }
            })
            .error(function () {
                console.log("服务器异常，请稍候再试");
            });
        $scope.mask = true;
        $scope.userWindow = true;
        $scope.renewalsWindow = false;
    };

    //打开选择用户列表
    $scope.openList = function (prodId, prodSaleAttId) {
        $http.get(config.selectList + '/' + $scope.recordId)
            .success(function (data) {
                if (data.resultCode == 1) {
                    $scope.selectList = data.data;
                    $scope.account.selectedAccount = $scope.selectList[0];
                } else {
                    layerOpen2(data.resultMsg);
                }
            })
            .error(function () {
                console.log("服务器异常，请稍候再试");
            });
    };

    //确认绑定账号
    $scope.confirmAccount = function (userId, certificateId) {

        if (userId == '' || userId == null) {
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
            .success(function (data) {
                if (data.resultCode == 1) {
                    layerOpen1(data.resultMsg);
                    //刷新绑定数据
                    $http.get(config.childAccount + '/' + $scope.recordId)
                        .success(function (data) {
                            if (data.resultCode == 1) {
                                $scope.childList = data
                            } else {
                                layerOpen2(data.resultMsg);
                            }
                        })
                        .error(function () {
                            console.log("服务器异常，请稍候再试");
                        });
                    $('.accountSelect').hide();
                } else {
                    layerOpen2(data.resultMsg);
                }
            })
            .error(function () {
                console.log("服务器异常，请稍候再试");
            });
    };

    $scope.renewals = function () {
        $scope.mask = true;
        $scope.userWindow = false;
        $scope.renewalsWindow = true;
    };

    $scope.close = function () {
        $scope.mask = false;
        $scope.userWindow = false;
        $scope.renewalsWindow = false;
    };

    $('.userWindow ').on('click', '.bind', function (event) {
        // Act on the event
        $('.accountSelect').hide();
        $(this).siblings('.accountSelect').show();
    });

    $('.userWindow ').on('click', '.closeWin', function (event) {
        // Act on the event
        $(this).parents('.accountSelect').hide();
    });

    $('.text-slide .hd li').click(function () {
        $('.text-slide .hd li').removeClass('on');
        $(this).addClass('on');
    });

    $(function () {

        $('.loginBtns .fl').hover(
            function () {
                $(this).toggleClass('on')
            }
        );

    })
}).controller("msgInfo", function ($scope, $http) {

    $scope.info = [];

    $scope.findApp = function () {
        if ($scope.myApps.name == null) {
            $scope.myApps.name == '';
        }
        $http.get(config.appQuery + '?prodName=' + $scope.myApps.name)
            .success(function (data) {
                if (data.resultCode == 1) {
                    $scope.appList = data;
                } else {
                    layerOpen2(data.resultMsg);
                }
            })
            .error(function () {
                console.log("服务器异常，请稍候再试");
            });
    };

    // $http.get(config.myInfo)
    //     .success(function (data) {
    //         if (data.resultCode == 1) {
    //             $scope.myInfo = data.data
    //         } else {
    //             alert(data.resultMsg);
    //         }
    //     })
    //     .error(function () {
    //         console.log("服务器异常，请稍候再试");
    //     });
    //
    // $http.get(config.notPay)
    //     .success(function (data) {
    //         if (data.resultCode == 1) {
    //             $scope.notPay = data.data
    //         } else {
    //             alert(data.resultMsg);
    //         }
    //     })
    //     .error(function () {
    //         console.log("服务器异常，请稍候再试");
    //     });

    //获取地区数据
    $scope.area_Id = "";
    $http.post(config.queryAreas, httpConfig)
        .success(function (response) {
            $http.post(config.getOrgInFlat, httpConfig)
                .success(function (data) {
                    if (data.resultCode == 1) {
                        $scope.info = data.data;
                        $scope.orginfo = $scope.info.orgInfo;
                        $scope.orgproid = $scope.orginfo.orgProperty;
                        if ($scope.orgproid == 1) {
                            $('input[name="firmnature"]').val("企业");
                        }
                        if ($scope.orgproid == 2) {
                            $('input[name="firmnature"]').val("事业单位");
                        }
                        if ($scope.orgproid == 3) {
                            $('input[name="firmnature"]').val("社会团体");
                        }
                        if ($scope.orgproid == 4) {
                            $('input[name="firmnature"]').val("个体商户");
                        }
                        if ($scope.orgproid == 5) {
                            $('input[name="firmnature"]').val("民办非企业");
                        }
                        if ($scope.orgproid == 9) {
                            $('input[name="firmnature"]').val("其他");
                        }

                        $scope.arealist = response;
                        angular.forEach($scope.arealist, function (area, i) {
                            $scope.nodes = area.nodes;
                            angular.forEach($scope.nodes, function (node, i) {
                                if (node.id == $scope.orginfo.areaCounty) {

                                    $scope.selectsecond = node.name;

                                    $scope.area_Id = $scope.orginfo.areaCounty;
                                    if (area.id == node.pId) {
                                        $scope.selectfirst = area.name;
                                    }
                                }

                            })
                        })
                    } else {
                        //layerOpen2(response.resultMsg);
                    }
                })
                .error(function () {
                    console.log("服务器异常，请稍候再试");
                });

        })
        .error(function () {
            console.log("服务器异常，请稍候再试");
        });

    $scope.saveupdate = function () {

        $scope.parames = {
            "orgId": $scope.info.orgId
        }
        console.log($('input[name="firmnature"]').data("id"));
        $scope.parames['orgInfo.orgProperty'] = $scope.orgproid;
        $scope.parames['orgInfo.areaCounty'] = $scope.area_Id;
        $scope.parames['orgInfo.address'] = $scope.orginfo.address;


        $http.post(config.updateOrgInFlat, $scope.parames, httpConfig)
            .success(function (response) {
                if (response.resultCode == 1) {
                    layerOpen1(response.resultMsg);
                } else {
                    layerOpen2(response.resultMsg);
                }
            })
            .error(function () {
                console.log("服务器异常，请稍候再试");
            });
    }

    $scope.selectFirstOne = function (x) {
        $scope.selectfirst = x.name;
        $scope.secondList = x.nodes;
        $('input[name="selectsecond"]').val("");
        $("#selectcounties-error").show();
        $scope.area_Id = "";
    }

    $scope.selectSec = function (y) {
        $scope.selectsecond = y.name;

        $scope.area_Id = y.id;
        $("#selectcounties-error").hide();
    }

    $('.dropdown-menucity').delegate('li', 'click', function (event) {
        event.preventDefault();
        var xzc = $(this).parent().siblings('.dropdown-toggle').children('.xz-content');
        xzc.val($(this).text());
        xzc.attr('data-id', $(this).attr('data-id'));
    });
    $('#orgPropertyId').delegate('li', 'click', function (event) {
        event.preventDefault();
        var xzc = $(this).parent().siblings('.dropdown-toggle').children('.xz-content');
        xzc.val($(this).text());
        xzc.attr('data-id', $(this).attr('data-id'));
        $scope.orgproid = $(this).attr('data-id');
        if ($(this).parent().attr("name") == "orgPropertyId") {
            $scope.orgPropertyId = $(this).attr('data-id');
        }

    });

    $('.text-slide .hd li').click(function () {
        $('.text-slide .hd li').removeClass('on');
        $(this).addClass('on');
    });

    $(function () {

        $('.loginBtns .fl').hover(
            function () {
                $(this).toggleClass('on')
            }
        );

    })
}).controller('childUserManageCtrl', ['$scope', '$http', 'getUserList', 'addOrgUser', 'updateOrgUser', 'deleteUser',
    function ($scope, $http, getUserList, addOrgUser, updateOrgUser, deleteUser) {
        //展示新增子用户
        $scope.showAdd = function () {
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
            if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
                $("#phone-error").show();
                return false;
            } else {
                return true;
            }
        }

        function checkPhone2() {
            var phone = $('input[name="phone"]').eq(0).val();
            if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
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
        $scope.addUser = function () {
            if (checkPhone()&&checkPhone3()) {
                $("#phone-error").hide();
                $("#name-error").hide();
                addOrgUser($scope.user2add).then(function (response) {
                    if (response.resultCode != 1) {
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
        $scope.showUpdate = function (el) {

            var userId = el.user.userId;
            $.each($scope.userList, function (i, userInfo) {
                if (userInfo.userId == userId) {
                    $scope.user2update = userInfo;
                    return false;
                }
            });
            $("#addChildUser").hide();
            $("#updateChildUser").show();
        };

        //修改子用户信息提交
        $scope.updateUser = function () {
            var params = {
                "userId": $scope.user2update.userId,
                "sysUserName": $scope.user2update.sysUserName,
                "password": $scope.user2update.password,
                "userName": $scope.user2update.userName,
                "cellPhone": $scope.user2update.cellPhone
            }
            if (checkPhone2()&&checkPhone4()) {
                $("#phone-error2").hide();
                $("#name-error2").hide();
                addOrgUser(params).then(function (response) {
                    if (response.resultCode != 1) {
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
        $scope.deleteUser = function (el) {

            layer.confirm('您确定要删除该子用户信息吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                var params = {
                    userId: el.user.userId
                };
                deleteUser(params).then(function (response) {
                    if (response.resultCode != 1) {
                        layerOpen2(response.resultMsg);
                        return;
                    }
                    layerOpen1(response.resultMsg);
                    $scope.getUserList(1);
                });
            }, function () {

            });
        };

        //取消新增/修改用户操作
        $scope.cancelOperate = function () {
            $(".register-layout").hide();
        };

        //分页函数
        function Pages(jqid, num_entries, items_per_page, pageselectCallback) {
            this.lockpaginaton = false;
            this.pageselectCallback = pageselectCallback;
            this.initPagination = function () {
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
        $scope.getUserList = function (pageNo) {
            var params = {
                page: pageNo,
                rows: 5
            };
            getUserList(params).then(function (response) {
                if (response.resultCode != 1) {
                    alert(response.resultMsg);
                    return;
                }
                $scope.userList = response.data;

                if (pageNo == 1) {
                    var pagination = new Pages('#pagination', response.page.totalRows, 5, function (page_index, jq) {
                        if (this.lockpaginaton) {
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
// $('.popup-body').parents('body').on("touchstart", function (e) {
//     startX = e.originalEvent.changedTouches[0].pageX,
//     startY = e.originalEvent.changedTouches[0].pageY;
// });
//
// //整体弹窗遮罩层
// $('.bg-mask').on('touchmove', function (e) {
//     moveEndY = e.originalEvent.changedTouches[0].pageY;
//     Y = moveEndY - startY;
//     //滚动区域的wrapper
//     if($('.popup-body').scrollTop() ==0 && Y>0){
//         e.preventDefault();
//         return false;
//     }
//     else if ($('.popup-body').scrollTop() + $('.popup-body').innerHeight() >= $('.popup-body')[0].scrollHeight && Y<0){
//         e.preventDefault();
//         return false;
//     }
// });