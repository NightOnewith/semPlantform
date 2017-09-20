$(function () {
    var $scope = {uploadParams: {orgInfo: {}}};
    $scope.uploadParams.orgInfo.pics = [];
    var yingyezhiz = [];
    var suiwudengji = [];
    var zhuzjigou = [];
    var sanzhengheyi = [];
    var fileId = "";
    $scope.validatCode = false; //短信验证码验证
    jQuery.validator.addMethod('passwordNeed', function (value, element, param) {
        //todo待验证
        var reg = /(?!^[0-9]+$)(?!^[a-zA-Z]+$)(?!^[^a-zA-Z0-9]+$)^.{6,20}$/;
        if (!reg.test(value)) {
            return false;
        }

        return true;
    }, "请输入{0}-{1}位字母、数字或符号");

    jQuery.validator.addMethod('phone', function (value, element, param) {
        var ref = /^1[3|4|5|7|8]\d{9}$/;
        console.log(ref.test(value))
        if (!ref.test(value)) {
            return false;
        }
        return true;
    }, "请输入正确的手机号码");
    jQuery.validator.addMethod('selectnf', function (value, element, param) {
        if ($(element).attr('data-id') == '0') {
            return false;
        }
        if ($(element).attr('name') == 'selectcity' && $('[name="selectcounties"]').attr('data-id') == '0') {
            return false;
        }
        $('#selectcity-error').hide();
        return true;
    }, "请选择县区");
    jQuery('#crumbs-first').validate({
        debug: true,
        rules: {
            username: {
                required: true,
                phone: true
            },
            password: {
                required: true,
                passwordNeed: [6, 20]
            },
            confirm_password: {
                required: true,
                equalTo: "#password"
            },
            // vericode: {
            //     required: true,
            // },
            // notecode: {
            //     required: true,
            // }
        },
        messages: {
            username: {
                required: "请输入手机号码"
            },
            password: {
                required: "请输入密码"
            },
            confirm_password: {
                required: "请确认密码",
                equalTo: "两次密码输入不一致"
            },
            // vericode: {
            //     required: "请输入二维码"
            // },
            // notecode: {
            //     required: "请输入短信验证码"
            // }
        }
    });

    if ($('input[name="sanzhengsel"]').is("checked")) {
        var flag = true,
            fileFileds = $('[name="uploadfile"]');
        for (var i = 0, len = fileFileds.length; i < len; i++) {
            if ($(fileFileds[i]).closest("li").attr("status") !== "success") {
                flag = false;
                break;
            }
        }
        if (!flag) {
            layerOpen2("必须上传文件!");
            return;
        }
    }

    jQuery('#crumbs-second').validate({
        debug: true,
        submitHandler: function (form) {
            console.log("提交事件!");
            if (!$('.read-line .check-ui').hasClass('on')) {
                alert("请同意文件")
            }

            $scope.tijiaoForm();

        },
        rules: {
            firmname: {
                required: true
            },


            yyelicenseid: {
                required: $('[name="sanzhengsel"]').is("chekced")
            },


//         selectcity: {
//             selectnf: true
//         },
            selectcounties: {
                selectnf: true
            },
            // address: {
            //     required: true
            // },
            // telephone: {
            //     required: true
            // },


            industry: {
                selectnf: true
            },

            linkman: {
                required: true
            },

            linkphone: {
                required: true,
                phone: true
            },

            email: {
                email: true
            },


        },
        messages: {
            firmname: {
                required: "请输入企业全称"
            },
//         selectcity: {
//             selectnf: "请选择县区"
//         },
            selectcounties: {
                selectnf: "请选择县区"
            },

            // address: {
            //     required: "请输入详细的地址"
            // },
            // telephone: {
            //     required: "请输入电话号码"
            // },

            industry: {
                selectnf: "请选择行业"
            },

            linkman: {
                required: "请输入联系人"
            },
            linkphone: {
                required: "请输入联系人手机号码",
                phone: "手机号码格式不正确"
            },

            email: "请输入正确的邮箱"
        },
        errorPlacement: function (error, element) {
            var el = element.attr('name');
            if (el == 'selectcity' || el == 'selectcounties') {
                error.appendTo(element.closest('.rits-ui'))
            } else {
                error.appendTo(element.parent());
            }
        }
    });
    //判断输入用户名是否存在
    $('input[name="username"]').on('blur', function () {
        var val = $(this).val();
        var _this = $(this);
        $.ajax({
            type: "get",
            url: config.checkUserName + '?userName=' + val,
            success: function (response) {
                if (response.resultCode == 0) {
                    $('#username-error').show().html(response.resultMsg)
                } else {
                    $('.username-error').hide()
                }
            }
        })
    })
    $('.register-org .yanz-m').on('click', function () {
        if ($(this).hasClass('on')) {
            var m = 60; //设置间隔时间
            $(this).removeClass('on');
            $.ajax({
                type: "POST",
                url: config.getDuanxin,
                success: function (response) {
                    if (response.resultCode != "1") {
                        $scope.validatCode = false;
                        $('#notecode-error').text('短信验证码不正确').show()
                    } else {
                        $scope.validatCode = true;
                        $('#notecode-error').hide()
                    }
                }
            })
            var self = this;
            $(self).children('.text-nevn').children('i').text(m);
            var inter = setInterval(function () {
                m--;
                $(self).children('.text-nevn').children('i').text(m)
                if (m == 0) {
                    $(self).addClass('on');
                    clearInterval(inter);
                }
            }, 1000);
        }
    });
    $('.next-cufirst').on('click', function (event) {

        event.preventDefault();

        var val = $.trim($('input[name="username"]').val());

        if(!val) {
            layer.open({
                icon: 2,
                title: '提示',
                content: '用户名不能为空!'
            });
            return;
        }

        $("#crumbs-first").validate();
        var cformValt = $("#crumbs-first").valid();

        if (!$scope.validatCode) {
            $('#notecode-error').text('短信验证码不正确').show();
        } else {
            $('#notecode-error').hide();
        }

        $.ajax({
            type: "get",
            url: config.checkUserName + "?userName=" + val,
            xhrFields: {
                withCredentials: true
            },
            success: function (response) {
                if (response.resultCode == 0) {
                    layer.open({
                        icon: 2,
                        title: '提示',
                        content: response.resultMsg
                    });
                } else {
                    if (cformValt) {
                        $('.curm-0').hide();
                        $('.curm-1').show();
                        $scope.$apply(function () {
                            $scope.uploadParams.username = $('input[name="username"]').val(); //用户名
                            $scope.uploadParams.password = $('input[name="password"]').val(); //密码
                            $scope.uploadParams['password1'] = $('input[name="confirm_password"]').val(); //确认密码
                            $scope.uploadParams.code = $('input[name="notecode"]').val(); //短信验证码
                        });
                    }
                }
            }
        })
    })
    // $('.next-cusecon').on('click', function(event) {
    //     //todo
    // })
    $('.prev-cusecon').on('click', function (event) {
        event.preventDefault();
        $('.curm-0').show();
        $('.curm-1').hide();
    })
    //定义循环方法
    $scope.forEach = function (array, func) {
        if (!array) {
            return false;
        }
        for (var k = 0, length = array.length; k < length; k++) {
            func(array[k], k);
        }
    }
    $('.dropdown-menu').delegate('li', 'click', function (event) {
        event.preventDefault();
        var xzc = $(this).parent().siblings('.dropdown-toggle').children('.xz-content');
        xzc.val($(this).text());
        xzc.attr('data-id', $(this).attr('data-id'));
        var index = +$(this).attr('data-id') - 1;
        var indexi = +$(this).attr('data-i');
        if ($(this).parent().attr('id') == 'selectFirst') {
            $('#selectSecond').html('');
            $('input[name="selectcounties"]').attr('data-id', '0');
            $scope.forEach(arealist[indexi].nodes, function (lev, i) {
                $('#selectSecond').append("<li href='' data-id='" + lev.id + "'><a>" + lev.name + "</a></li>");
            });
        } else if ($(this).parent().attr('id') == 'selectSecond') {
            $scope.uploadParams.areaCounty = index;
            $('#selectcounties-error').hide();
        }
        xzc.trigger('keyup')
    })
    $('.read-line .check-ui').on('click', function () {
        $(this).toggleClass('on');
    })
    $('.checkbox-list').delegate('label input', 'change', function (event) {
        if ($(this).is(':checked')) {
            $(this).parent('label').addClass('on');
        } else {
            $(this).parent('label').removeClass('on');
        }
    });

    //获取地区数据
    var arealist = "";
    $.ajax({
        type: "POST",
        url: config.queryAreas,
        success: function (response) {
            arealist = response;
            var areaid = "";
            var areaname = "";
            $scope.forEach(arealist, function (area, i) {
                areaid = area.id;
                areaname = area.name;
                $('#selectFirst').append("<li href='' data-id='" + areaid + "' data-i='" + i + "'><a>" + areaname + "</a></li>");

            });
        }
    })


    //文件上传
    var url = config.uploadFile,
        uploadButton = $('<button/>')
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

    function uploadDingz(el, widata) {
        $(el).fileupload({
            url: url,
            dataType: 'json',
            autoUpload: false,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            maxFileSize: 10000000,
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
                    .text('上传')
                    .prop('disabled', !!data.files.error);
            }
        }).on('fileuploaddone', function (e, data) {
            if (data.result.resultCode == "1") {
                $(e.target).closest("li").attr("status", "success");
                fileId = data.result.data.fileId;
                widata[0] = fileId;
                var link = $('<a>')
                    .attr('target', '_blank')
                // .prop('href', config.realhost + config.scaContext + data.result.params);
                // widata[0] = config.realhost + config.scaContext + data.result.params;
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
            $(e.target).closest("li").attr("status", "fail");
            $.each(data.files, function (index) {
                var error = $('<span class="text-danger"/>').text('文件上传失败.');
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            });
        }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');
    }

    $('input[name="sanzhengsel"]').on('change', function () {
        if ($(this).is(':checked') && $(this).index() == "0") {
            $('.jihe-ui').addClass('off');
            $('.sanzheng-ui').removeClass('off');

        } else {
            $('.sanzheng-ui').addClass('off');
            $('.jihe-ui').removeClass('off');

        }
    })
    uploadDingz('#file-02', yingyezhiz);
    uploadDingz('#file-03', suiwudengji);
    uploadDingz('#file-04', zhuzjigou);
    uploadDingz('#file-05', sanzhengheyi);


    //服务类别
//  $('.server-list-check').click(function(){
//    	var isChecked = $(this).find('input[type="checkbox"]').is(':checked');
//      isChecked ? $('.server-moudle-all').show() : $('.server-moudle-all').hide();
//  })
//  $('.server-list-tit').click(function(){
//  	    var iserpChecked = $(this).find('input[type="checkbox"]').is(':checked');
//  	    var erpbtn = $(this).siblings('.btn-group').find('button');
//  	   iserpChecked ? erpbtn.attr("disabled",false):erpbtn.attr("disabled",true);
//  })
    //测试
    $scope.tijiaoForm = function () {

        $scope.uploadParams.userName = $('input[name="username"]').val(); //用户名
        $scope.uploadParams.password = $('input[name="password"]').val(); //密码
        $scope.uploadParams.password1 = $('input[name="confirm_password"]').val(); //确认密码
        $scope.uploadParams.userType = 3; //用户类型,机构

        $scope.uploadParams['orgInfo.orgName'] = $('input[name="firmname"]').val();
        $scope.uploadParams['orgInfo.areaCounty'] = $('input[name="selectcounties"]').attr('data-id');
        $scope.uploadParams['orgInfo.address'] = $('input[name="address"]').val();
        $scope.uploadParams['orgInfo.email'] = $('input[name="email"]').val();
        $scope.uploadParams['orgInfo.linkman'] = $('input[name="linkman"]').val();
        $scope.uploadParams['orgInfo.tel'] = $('input[name="telephone"]').val();
        $scope.uploadParams['orgInfo.cellPhone'] = $('input[name="linkphone"]').val();

        var pictures = [];

        if ($('.jihe-ui').hasClass('off')) {
            $scope.uploadParams['orgInfo.paperType'] = 1;
            $scope.uploadParams['orgInfo.orgCode'] = $('input[name="institutionalid"]').val();
            $scope.uploadParams['orgInfo.businessLicenseNo'] = $('input[name="yyelicenseid"]').val();
            $scope.uploadParams['orgInfo.taxRegistrationNo'] = $('input[name="taxPhotoid"]').val();
            if (!yingyezhiz[0] || !zhuzjigou[0] || !suiwudengji[0]) {
                layer.open({
                    icon: 2,
                    title: '提示',
                    content: '请勿漏传三证图片'
                });
                return;
            }
            if (!$scope.uploadParams['orgInfo.orgCode'] || !$scope.uploadParams['orgInfo.businessLicenseNo'] || !$scope.uploadParams['orgInfo.taxRegistrationNo']) {
                layer.open({
                    icon: 2,
                    title: '提示',
                    content: '企业营业执照号，组织机构代码证号，企业税务登记号都要填写'
                });
                return;
            }
            pictures.push({
                pictureId: yingyezhiz[0],
                pictureType: 1
            }, {
                pictureId: zhuzjigou[0],
                pictureType: 2
            }, {
                pictureId: suiwudengji[0],
                pictureType: 3
            })

            $scope.uploadParams['orgInfo.pics[0].pictureId'] = pictures[0].pictureId;
            $scope.uploadParams['orgInfo.pics[0].pictureType'] = pictures[0].pictureType;
            $scope.uploadParams['orgInfo.pics[1].pictureId'] = pictures[1].pictureId;
            $scope.uploadParams['orgInfo.pics[1].pictureType'] = pictures[1].pictureType;
            $scope.uploadParams['orgInfo.pics[2].pictureId'] = pictures[2].pictureId;
            $scope.uploadParams['orgInfo.pics[2].pictureType'] = pictures[2].pictureType;

        } else {
            $scope.uploadParams['orgInfo.paperType'] = 2;
            $scope.uploadParams['orgInfo.orgCode'] = $('input[name="sanzhengid"]').val();
            if (!sanzhengheyi[0]) {
                layer.open({
                    icon: 2,
                    title: '提示',
                    content: '请勿漏传三证合一图片'
                });
                return;
            }
            if (!$scope.uploadParams['orgInfo.orgCode']) {
                layer.open({
                    icon: 2,
                    title: '提示',
                    content: '组织机构代码证号必填'
                });
                return;
            }

            pictures.push({
                pictureId: sanzhengheyi[0],
                pictureType: 4
            })
            //$scope.uploadParams.businessLicenseUrl = sanzhengheyi.length == 0 ? "" : sanzhengheyi[0]; //三证URl
            $scope.uploadParams['orgInfo.pics[0].pictureId'] = pictures[0].pictureId;
            $scope.uploadParams['orgInfo.pics[0].pictureType'] = pictures[0].pictureType;
        }

        $scope.tojikouParams($scope.uploadParams);

    }
    $scope.tojikouParams = function (obj) {

        $.post(config.regist, obj, function (response) {
            if (response.resultCode == '0') {
                layer.open({
                    icon: 2,
                    title: '提示',
                    content: response.resultMsg
                });
            } else {
                $('.username-layout').text($scope.uploadParams.username)
                //提交成功
                $('.curm-1').hide();
                $('.curm-2').show();
                //window.location.href = ""
            }
        });
    }

//  $('.lijiregister').on('click', function() {
//      $('#yyelicense-error').hide();
//      $('#sanzheng-error').hide();
//      $('#institutional-error').hide();
//      $('#taxPhoto-error').hide();
//      if (yingyezhiz.length == 0) {
//          $('#yyelicense-error').show();
//      }
//      if (sanzhengheyi.length == 0) {
//          $('#sanzheng-error').show();
//      }
//      if (zhuzjigou.length == 0) {
//          $('#institutional-error').show();
//      }
//      if (suiwudengji.length == 0) {
//          $('#taxPhoto-error').show();
//      }
//      if (suiwudengji.length == 0) {
//          $('#taxPhoto-error').show();
//      }
//  })
})