/**
 * 发布商品
 */

"use strict";

percenterApp.controller("editGoodsCtrl", ["$scope", "$rootScope", "$location", "Http", "scopeService", function ($scope, $rootScope, $location, Http, scopeService) {

    var intReg = /^\d{1,}$/,
        floatReg = /^\d{1,}(\.\d{1,})?$/,
        unitMap = {},
        hasError = false,
        transcatMap = {
            "1": "在线下单，先装后付",
            "2": "在线申请，在线支付或线下对接"
        },
        trialTimeMap = {
            "0": "无试用",
            "1": "试用1个月",
            "3": "试用3个月",
            "6": "试用6个月",
            "12": "试用1年"
        },
        val, valArr, $this, hasContain, index, type, $el, id;

    $scope.packages = [];

    /**
     * 获取单位信息
     */
    Http.request({
        url: config.getUnits,
        success: function(res) {
            if(res.resultCode === "1") {
                $(".rule-6 select").empty();
                angular.forEach(res.object, function(item) {
                    unitMap["" + item.ddId] = item.value;
                    $(".rule-6 select").append("<option value='" + item.ddId + "'>" + item.value + "</option>");
                });
            }
        }
    });

    /**
     * 添加分类
     */
    $scope.addPackage = function () {
        $scope.showAddPrompt = true;
        valArr = [];
        angular.forEach($scope.packages, function (packItem) {
            valArr.push(packItem.title + ";");
        });
        $("#packages-name").val(valArr.join(""));
    };

    /**
     * 隐藏添加分类弹窗
     */
    $scope.hidePackages = function () {
        $scope.showAddPrompt = false;
        $("#packages-name").val("");
    };

    $scope.cancelSubmit = function () {
        location.hash = "#/goodsManagement/allGoods";
    };
    
    /**
     * 删除一项
     * @param key
     */
    $scope.deleteOne = function (key) {
        index = -1;
        valArr = [];
        angular.forEach($scope.packages, function (packItem, packIndex) {
            if (packItem.id === key) {
                index = packIndex;
            } else {
                valArr.push(packItem.title + ";");
            }
        });
        if (index > -1) {
            scopeService.safeApply($scope, function () {
                $scope.packages.splice(index, 1);
            });
            $("#type-" + key).remove();
            $("#packages-name").val(valArr.join(""));
        }
    };

    /**
     * 确定添加分类
     */
    $scope.addPackages = function () {
        if ($scope.packages.length) {
            angular.forEach($scope.packages, function (packItem) {
                if (!packItem.added) {
                    id = "type-" + packItem.id;
                    $el = $("#package-tpl>div").clone();
                    $el.attr("id", id)
                        .find("span.name em").text(packItem.title);
                    $("#type-list").append($el);
                    packItem.added = true;
                }
            });
            $scope.showAddPrompt = false;
        }
    };

    /**
     * 提交商品数据
     */
    $scope.submit = function () {
        hasError = false;
        var tip = "",
            mainPics = [],
            attrList = [],
            tmp = {},
            post = {
                status: -3
            };

        //  商品名称验证
        if(!$scope.prodName) {
            tip = "商品名称不能为空!";
        }

        //  产品类型验证
        if(tip === "" && $("#prodTypeCd").val() === "0") {
            tip = "产品类型为必选项!";
        }

        //  商品介绍
        if(tip === "" && !$scope.description) {
            tip = "商品介绍不能为空!";
        }

        //  交易类型
        if(tip === "" && $("#transcat").val() === "0") {
            tip = "交易类型为必选项!";
        }

        //  提交缩略图
        if(tip === "" && $("#picType1 .uploaded-pic").length === 0) {
            tip = "请先上传商品缩略图!";
        }

        //  提交主图
        if(tip === "" && $("#picType2 .uploaded-pic").length === 0) {
            tip = "请先上传至少一种商品主图!";
        }

        //详情富文本
        if (tip === "" && (addProdRichEditor.html()==null || addProdRichEditor.html()=="")) {
            tip = "请编辑产品详情！";
        }

        if(tip !== "") {
            layer.alert(tip);
            return;
        }

        //  主图
        $("#picType2 .uploaded-pic").each(function(index, item) {
            if($(item).attr("src")) {
                mainPics.push($(item).attr("src"));
            }
        });

        //  商品分类
        if($scope.packages.length) {
            $("div.type-item").each(function(index, item) {
                if($(item).attr("id") && $(item).attr("id") !== "default-type") {
                    tmp = {
                        saleAttrName: "销售属性",
                        saleAttrValue: $.trim($(item).find("span.name").text()),
                        parentSaleCombiAttr: null,
                        planSaleAttrs: []
                    };
                    $(item).find("li.type-rules-item").each(function(ruleIndex, ruleItem) {
                        if(hasError === false ) {
                            $el = $(ruleItem);
                            if($el.find(".rule-3 input").val() === ""
                                || $el.find(".rule-4 input").val() === ""
                                || $el.find(".rule-5 input").val() === ""
                                || $el.find(".rule-1 input").val() === ""
                                || $el.find(".rule-2 input").val() === ""
                                || $el.find(".rule-7 input").val() === "") {
                                hasError = true;
                            }
                            tmp.planSaleAttrs.push({
                                prodStockNum: $el.find(".rule-3 input").val(),
                                prodStockWarn: $el.find(".rule-4 input").val(),
                                price: $el.find(".rule-5 input").val(),
                                priceUnit: unitMap[$el.find(".rule-6 select").val()],
                                saleAttrName: $el.find(".rule-1 input").val(),
                                saleAttrValue: $el.find(".rule-2 input").val(),
                                description: $el.find(".rule-7 input").val()
                            });
                        }
                    });
                    attrList.push(tmp);
                }
            });
        } else {
            $("div.type-item").each(function(index, item) {
                 if($(item).attr("id") === "default-type") {
                     $(item).find("li.type-rules-item").each(function(ruleIndex, ruleItem) {
                         if(hasError === false) {
                             $el = $(ruleItem);
                             if($el.find(".rule-3 input").val() === ""
                                 || $el.find(".rule-4 input").val() === ""
                                 || $el.find(".rule-5 input").val() === ""
                                 || $el.find(".rule-1 input").val() === ""
                                 || $el.find(".rule-2 input").val() === ""
                                 || $el.find(".rule-7 input").val() === "") {
                                 hasError = true;
                             }
                             tmp = {
                                 prodStockNum: $el.find(".rule-3 input").val(),
                                 prodStockWarn: $el.find(".rule-4 input").val(),
                                 price: $el.find(".rule-5 input").val(),
                                 priceUnit: unitMap[$el.find(".rule-6 select").val()],
                                 saleAttrName: $el.find(".rule-1 input").val(),
                                 saleAttrValue: $el.find(".rule-2 input").val(),
                                 description: $el.find(".rule-7 input").val()
                             };
                         }
                        attrList.push(tmp);
                    });
                }
            });
        }

        if(hasError || $("input.error").length) {
            layer.alert("你还有字段未填写,请检查!");
            hasError = false;
            return;
        }

        post.isJoin = $("#isJoin").val();
        post.joindescription = $.trim($("#connectName").val());
        post.joinurl = $.trim($("#connectUrl").val());

        post.prodName = $scope.prodName;
        post.prodTypeCd = $("#prodTypeCd").val();
        post.description = $scope.description;
        post.transcat = transcatMap[$("#transcat").val()];
        post.downloadUrl = $scope.downloadUrl;
        post.qa = $scope.qa;
        post.trialTime = $("#trialTime").val();
        post.picsList = [];
        post.picsList.push({
            picsUrl: $("#picType1 .uploaded-pic").eq(0).attr("src"),
            picType: 1
        });
        $.each(mainPics, function(index, item) {
            post.picsList.push({
                picsUrl: item,
                picType: 2
            });
        });
        post.saleAttrList = attrList;
        post.url = addProdRichEditor.html();

        post.supplierId = 1;// 暂无意义默认值
        post.sendType = 1;//暂无意义默认值

        Http.request({
            url: config.addProduct,
            method: "POST",
            data: {
                submitJson: JSON.stringify(post)
            },
            success: function(res) {
                if(res.resultCode === "1") {
                    layer.alert("商品上传成功!", function() {
                        layer.closeAll();
                        location.hash = "#/goodsManagement/allGoods";
                    });
                } else if (res.resultMsg) {
                    layer.alert(res.resultMsg);
                }
            },
            error: function() {
                layer.alert("网络异常,请稍后重试!");
            }
        });
    };

    /**
     * 预览
     */
    $scope.preview = function () {
        if (!("localStorage" in window)) {
            layer.alert("浏览器版本太旧,请用新版浏览器,推荐Chrome或者Firefox等浏览器!");
            return;
        }

        hasError = false;
        var tip = "",
            mainPics = [],
            attrList = [],
            tmp = {},
            post = {
                status: -3
            };

        //  商品名称验证
        if(!$scope.prodName) {
            tip = "商品名称不能为空!";
        }

        //  产品类型验证
        if(tip === "" && $("#prodTypeCd").val() === "0") {
            tip = "产品类型为必选项!";
        }

        //  商品介绍
        if(tip === "" && !$scope.description) {
            tip = "商品介绍不能为空!";
        }

        //  交易类型
        if(tip === "" && $("#transcat").val() === "0") {
            tip = "交易类型为必选项!";
        }

        //  提交缩略图
        if(tip === "" && $("#picType1 .uploaded-pic").length === 0) {
            tip = "请先上传商品缩略图!";
        }

        //  提交主图
        if(tip === "" && $("#picType2 .uploaded-pic").length === 0) {
            tip = "请先上传至少一种商品主图!";
        }

        //详情富文本
        if (tip === "" && (addProdRichEditor.html()==null || addProdRichEditor.html()=="")) {
            tip = "请编辑产品详情！";
        }

        if(tip !== "") {
            layer.alert(tip);
            return;
        }

        //  主图
        $("#picType2 .uploaded-pic").each(function(index, item) {
            if($(item).attr("src")) {
                mainPics.push($(item).attr("src"));
            }
        });

        //  商品分类
        if($scope.packages.length) {
            $("div.type-item").each(function(index, item) {
                if($(item).attr("id") && $(item).attr("id") !== "default-type") {
                    tmp = {
                        saleAttrName: "销售属性",
                        saleAttrValue: $.trim($(item).find("span.name").text()),
                        parentSaleCombiAttr: null,
                        planSaleAttrs: []
                    };
                    $(item).find("li.type-rules-item").each(function(ruleIndex, ruleItem) {
                        if(hasError === false ) {
                            $el = $(ruleItem);
                            if($el.find(".rule-3 input").val() === ""
                                || $el.find(".rule-4 input").val() === ""
                                || $el.find(".rule-5 input").val() === ""
                                || $el.find(".rule-1 input").val() === ""
                                || $el.find(".rule-2 input").val() === ""
                                || $el.find(".rule-7 input").val() === "") {
                                hasError = true;
                            }
                            tmp.planSaleAttrs.push({
                                prodStockNum: $el.find(".rule-3 input").val(),
                                prodStockWarn: $el.find(".rule-4 input").val(),
                                price: $el.find(".rule-5 input").val(),
                                priceUnit: unitMap[$el.find(".rule-6 select").val()],
                                saleAttrName: $el.find(".rule-1 input").val(),
                                saleAttrValue: $el.find(".rule-2 input").val(),
                                description: $el.find(".rule-7 input").val()
                            });
                        }
                    });
                    attrList.push(tmp);
                }
            });
        } else {
            $("div.type-item").each(function(index, item) {
                if($(item).attr("id") === "default-type") {
                    $(item).find("li.type-rules-item").each(function(ruleIndex, ruleItem) {
                        if(hasError === false) {
                            $el = $(ruleItem);
                            if($el.find(".rule-3 input").val() === ""
                                || $el.find(".rule-4 input").val() === ""
                                || $el.find(".rule-5 input").val() === ""
                                || $el.find(".rule-1 input").val() === ""
                                || $el.find(".rule-2 input").val() === ""
                                || $el.find(".rule-7 input").val() === "") {
                                hasError = true;
                            }
                            tmp = {
                                prodStockNum: $el.find(".rule-3 input").val(),
                                prodStockWarn: $el.find(".rule-4 input").val(),
                                price: $el.find(".rule-5 input").val(),
                                priceUnit: unitMap[$el.find(".rule-6 select").val()],
                                saleAttrName: $el.find(".rule-1 input").val(),
                                saleAttrValue: $el.find(".rule-2 input").val(),
                                description: $el.find(".rule-7 input").val()
                            };
                        }
                        attrList.push(tmp);
                    });
                }
            });
        }

        if(hasError || $("input.error").length) {
            layer.alert("你还有字段未填写,请检查!");
            hasError = false;
            return;
        }

        post.isJoin = $("#isJoin").val();
        post.joinDescription = $.trim($("#connectName").val());
        post.joinUrl = $.trim($("#connectUrl").val());

        post.prodName = $scope.prodName;
        post.prodTypeCd = $("#prodTypeCd").val();
        post.description = $scope.description;
        post.transcat = transcatMap[$("#transcat").val()];
        post.downloadUrl = $scope.downloadUrl;
        post.qa = $scope.qa;
        post.trialTime = $("#trialTime").val();
        post.picsList = [];
        post.picsList.push({
            picsUrl: $("#picType1 .uploaded-pic").eq(0).attr("src"),
            picType: 1
        });
        $.each(mainPics, function(index, item) {
            post.picsList.push({
                picsUrl: item,
                picType: 2
            });
        });
        post.saleAttrList = attrList;
        post.url = addProdRichEditor.html();

        post.supplierId = 1;// 暂无意义默认值
        post.sendType = 1;//暂无意义默认值

        if (post.isJoin==0) {
            layer.confirm("请选择该商品预览时的接入状态。", {
                btn: ["已接入", "未接入"]
            }, function() {
                layer.closeAll();
                post.isJoin = 1;
                localStorage.setItem("detail-info", JSON.stringify(post));
                window.open(config.host + config.portals + "app/#/preview");
            }, function() {
                layer.closeAll();
                post.isJoin = 0;
                localStorage.setItem("detail-info", JSON.stringify(post));
                window.open(config.host + config.portals + "app/#/preview");
            });
        } else {
            localStorage.setItem("detail-info", JSON.stringify(post));
            window.open(config.host + config.portals + "app/#/preview");
        }
    };

    /**
     * 输入框keyup事件
     */
    $("#packages-name").off().on("keyup", function (e) {
        $this = $(this);

        //  去除前分号
        val = $.trim($(this).val()).replace(/^\;/, "");

        if (val.length && /\;$/.test(val)) {

            if ($scope.packages.length >= 10) {
                layer.alert("您已经添加了10个套餐,请先删除一些再添加其他分类!");
                return;
            }

            valArr = val.split(";");

            $scope.$apply(function () {
                angular.forEach(valArr, function (valItem) {
                    valItem = ("" + valItem);
                    if (valItem) {
                        hasContain = false;
                        angular.forEach($scope.packages, function (packItem) {
                            if (valItem === packItem.title) {
                                hasContain = true;
                            }
                        });
                        if (!hasContain) {
                            $scope.packages.push({
                                title: valItem,
                                id: Common.randomKey()
                            });
                        }
                    }
                });
                valArr = [];
                angular.forEach($scope.packages, function (packItem) {
                    valArr.push(packItem.title + ";");
                });
                $this.val(valArr.join(""));
            });
        }
    });

    /**
     * 添加一条新规则
     */
    $(document).off("click.addRuleEdit").on("click.addRuleEdit", ".add-one-rule", function (e) {
        $(e.target).closest(".type-rules-container").append($("#rule-tpl li").clone());
    });

    /**
     * 删除一条新规则
     */
    $(document).off("click.deleteRuleEdit").on("click.deleteRuleEdit", ".remove-one-rule", function (e) {
        var target = $(e.target).closest(".type-rules-item");
        if (target.siblings(".type-rules-item").length === 0) {
            layer.alert("每个套餐至少保留一条规则!");
            return;
        }
        $(e.target).closest(".type-rules-item").remove();
    });

    /**
     * 类型限制
     */
    $(document).off("blur.dataLimitEdit").on("blur.dataLimitEdit", "input[data-limit]", function (e) {
        $this = $(this);
        type = $this.data("limit");
        val = $.trim($this.val());
        switch (type) {
            case "int":
                if(!intReg.test(val)) {
                    $this.addClass("error");
                }
                break;
            case "float":
                if(!floatReg.test(val)) {
                    $this.addClass("error");
                }
                break;
            default:
                if(val.length < 1) {
                    $this.addClass("error");
                }
                break;
        }
    }).on("focus","input[data-limit]", function () {
        $(this).removeClass("error");
    });

    /**
     * 删除
     */
    $(document).off("click.deleteTypeEdit").on("click.deleteTypeEdit", "a.delete-type", function (e) {
        $el = $(e.target).closest(".type-item");
        id = $el.attr("id").replace(/^type\-/, "");

        layer.confirm("您确定要删除此套餐吗?", {
            icon: 3,
            title: "确认"
        }, function(index) {
            $el.remove();
            $scope.deleteOne(id);
            layer.close(index);
        }, function(index) {
            layer.close(index);
        });
    });

    /**
     * 隐藏
     */
    $(document).off("click.hideItemEdit").on("click.hideItemEdit", "span.hide-btn", function (e) {
        $(e.target).closest(".type-item").addClass("hide-item");
    });

    /**
     * 显示
     */
    $(document).off("click.openBtnEdit").on("click.openBtnEdit", "span.open-btn", function (e) {
        $(e.target).closest(".type-item").removeClass("hide-item");
    });

    /**
     * 标题区域控制显示/隐藏
     */
    $(document).off("click.headCtrlEdit").on("click.headCtrlEdit", "div.type-tiles-title", function (e) {
        $el = $(e.target).closest(".type-item");
        $el[$el.hasClass("hide-item") ? "removeClass" : "addClass"]("hide-item");
    });

    /**
     * 文件上传
     */
    $("input[name='uploadfile']").each(function(index, item) {
        $(item).ajaxfileupload({
            action: config.uploadFile,
            onComplete: function(res) {
                if(res.resultCode === "1") {
                    $(item).parent().find("img").remove();
                    $(item).parent().append("<img class='uploaded-pic' src='" + res.data.fileName + "' />");
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
    });

}]);

var addProdRichEditor = null;

$(function(){

    KindEditor.ready(function (K) {
        addProdRichEditor = K.create('#addProdRichEditor', {
            cssPath: config.host + config.portals + 'second-period/js/lib/kindeditor/plugins/code/prettify.css',
            uploadJson: config.richUpload,
            fileManagerJson: config.richFileManager,
            resizeType: 1,
            items: [
                'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                'insertunorderedlist', '|', 'image', 'link','|',"fullscreen"],
            allowFileManager: true,
            fullscreenShortcut:true
        });
    });

});
