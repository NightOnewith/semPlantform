$(function() {
  var yingyezhiz = [];
  var fileUrl="";
  var regParams={}
   //用户名与账户验证	
   jQuery.validator.addMethod('passwordNeed', function(value, element, param) {
        //todo待验证
        var reg = /(?!^[0-9]+$)(?!^[a-zA-Z]+$)(?!^[^a-zA-Z0-9]+$)^.{6,20}$/;
        if (!reg.test(value)) {
            return false;
        }
        return true;
    }, "请输入{0}-{1}位字母、数字或符号");
    
    jQuery.validator.addMethod('phone', function(value, element, param) {
        var ref = /^1[3|4|5|7|8]\d{9}$/;
        if (!ref.test(value)) {
            return false;
        }
        return true;
    }, "请输入正确的手机号码");
    
    //数字验证
    jQuery.validator.addMethod('amount', function(value, element, param) {
        var ref = /^[0-9]*$/;
        if (!ref.test(value)) {
            return false;
        }
        return true;
    }, "请输入正确的格式");
    
     //  邮箱验证
    jQuery.validator.addMethod('regemail', function(value, element, param) {
        var ref = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!ref.test(value)) {
            return false;
        }
        return true;
    }, "请输入正确的邮箱格式");
    
  
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
           
        }
    });
  
   jQuery('#crumbs-second').validate({
    		debug:true,
        rules: {
            firmname: {
                required: true
            },
            introduce:{
            	   required: true
            },
            yyelicenseid:{
            	   required: true
            },
            legalname:{
               required: true
            },
            time:{
               required: true
            },
            fund:{
               required: true,
               amount:true
            },
            address:{
            	  required: true
            },
            linkname:{
            	  required: true
            },
            linkphone: {
                required: true,
                phone: true
            },
            email: {
                email:true
            },
            researchers:{
            	    required: true,
            	    amount:true
            },
            sellers:{
                required: true,
                amount:true
            },
            servicePhone:{
            	    required: true,
            	    phone: true
            },
            serviceMail:{
            	    required: true,
            	    regemail:true
            },
            serviceWechat:{
            	    required: true
            },
            serviceMicroblog:{
            	    required: true
            }
        },
        messages: {
            firmname: {
                required: "请输入公司全称"
            },
            introduce:{
            	    required: "请输入公司简介"
            },
            yyelicenseid:{
            	   required: "请输入证件号"
            },
            legalname:{
               required: "请输入法人姓名"
            },
            time:{
               required: "请输入公司注册时间"
            },
            fund:{
               required: "请输入公司注册资金"
            },
            address:{
            	  required: "请填写详细地址"
            },
            linkname: {
                required: "请输入联系人"
            },
            linkphone: {
                required: "请输入联系人手机号码",
                phone: "手机号码格式不正确"
            },
            email: {
                email:"请输入正确的邮箱格式"
            },
            researchers:{
            	    required: "请输入研发人数"
            },
            sellers:{
            	    required: "请输入销售人数"
            },
            servicePhone:{
            	    required: "请输入售后电话"
            },
            serviceMail:{
            	    required: "请输入售后邮箱"
            },
            serviceWechat:{
            	    required: "请输入售后微信"
            },
            serviceMicroblog:{
            	    required: "请输入售后微博"
            }
            
        }
        
    });
   var isuser=false;
     //判断输入用户名是否存在
   function isUsername(){
    $('input[name="username"]').on('blur',function(){
    	    var val=$(this).val();
    	    var _this=$(this);
    	     $.ajax({
    	     	type:"get",
    	     	url:config.checkUserName + '?userName='+ val,
    	     	success:function(response){
    	     		if(response.resultCode ==0){   	
    	     		  $('#username-error').show().html(response.resultMsg);
    	     		  isuser=false;
    	     	    }else{
    	     	  	  $('.username-error').hide();
    	     	  	  isuser=true;
    	     	  }
    	     	}    	     	
    	     })  	     
     })
    }
   isUsername();
	//日期
	$(".form_datetime").datetimepicker({
		language:  'zh-CN',  //日期
		minView: "month",//设置只显示到月份
        format : "yyyy-mm-dd",//日期格式
        autoclose:true,//选中关闭
        todayBtn: true,//今日按钮
		pickerPosition: "bottom-left"
	});
	
	//字符串中提取数字
	function getNum(text){
		var valNum = text.replace(/[^0-9]/ig,""); 
		return valNum;
	}
	
	//文件上传
    var url = config.uploadFile,
        uploadButton = $('<button/>')
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
        
       function uploadDingz(el, widata) {
        $(el).fileupload({
                url: url,
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
                    if (!index) {
                        node
                            .append(uploadButton.clone(true).data(data));
                    }
                    node.appendTo(data.context);
                });
            }).on('fileuploadprocessalways', function(e, data) {
                var index = data.index,
                    file = data.files[index],
                    node = $(data.context.children()[index]);
                if (file.preview) {
                    node
                        .prepend(file.preview);
                }
                if (file.error) {
                    node
                        .append($('<span class="text-danger"/>').text(file.error));
                }
                if (index + 1 === data.files.length) {
                    data.context.find('button')
                        .text('上传')
                        .prop('disabled', !!data.files.error);
                }
            }).on('fileuploaddone', function(e, data) {
                if (data.result.resultCode == "1") {
                    $(e.target).closest("li").attr("status", "success");
                	   fileUrl = data.result.data.fileName;
                	   widata[0]=fileUrl;
                    var link = $('<a>')
                        .attr('target', '_blank')
                      // .prop('href', config.realhost + config.scaContext + data.result.params);
                   // widata[0] = config.realhost + config.scaContext + data.result.params;
                    $(data.context.children('p').remove('button'))
                        .append('<span style="color: red;display:block;">上传成功</span>');
                    data.context.closest('.filesList-ui').siblings('.error-text').hide();
                } else if (data.result.resultCode != "1") {
                    var error = $('<span class="text-danger"/>').text("上传失败");
                    $(data.context.children())
                        .append(error);
                }
            }).on('fileuploadfail', function(e, data) {
                $(e.target).closest("li").attr("status", "fail");
                $.each(data.files, function(index) {
                    var error = $('<span class="text-danger"/>').text('文件上传失败.');
                    $(data.context.children()[index])
                        .append(error);
                });
            }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');
    }
     uploadDingz('#file-01', yingyezhiz);
     
     
     $('.next-cufirst').on('click', function(event) {
            event.preventDefault();
            $("#crumbs-first").validate();
            var cformValt = $("#crumbs-first").valid();
            if (cformValt&&isuser) {
                $('.curm-0').hide();
                $('.curm-1').show();
            }
            else if(!isuser){
            	  $('#username-error').show().html('用户名已使用');
            }
        })
     
     $('.dropdown-menu').delegate('li', 'click', function(event) {
        event.preventDefault();
        var xzc = $(this).parent().siblings('.dropdown-toggle').children('.xz-content');
        var txt = $(this).find('a').text();
        xzc.val(txt);
        xzc.attr('data-id', $(this).attr('data-id'));
        xzc.trigger('keyup')
      })
    
    $('.lijiregister').on('click', function(event) {
            event.preventDefault();
            $("#crumbs-second").validate();
            var cformValt = $("#crumbs-second").valid();
            if (cformValt) {
                tijiaoForm();
            }
        })
     
    function tijiaoForm(){
       	var peoplenum = getNum($('input[name="peopleNum"]').val());
    	     regParams = {
		    "providName":  $('input[name="firmname"]').val(),  
		    "phoneNum": $('input[name="linkphone"]').val(), 
		    "mail": $('input[name="email"]').val(), 
		    "password": $('input[name="password"]').val(), 
		    "address": $('input[name="address"]').val(), 
		    "description": $('textarea').val(), 
		    "businessLicence": $('input[name="yyelicenseid"]').val(),
		    "businessLicenceUrl": yingyezhiz[0], 
		    "registrationTime": $('input[name="time"]').val()+' '+'00:00:00', //注册时间 格式yyyy-MM-dd HH:mm:ss
		    "registeredCapital": $('input[name="fund"]').val(), //注册资金
		    "linkman": $('input[name="linkname"]').val(), 
		    "employeeNumber": peoplenum,//员工个数 根据需求从1开始，具体开发的时候再沟通 
		    "developerNumber": $('input[name="researchers"]').val(), //研发个数 同上
		    "salerNumber": $('input[name="sellers"]').val(), //销售个数 同上
		    "industryType": $('input[name="industry"]').attr('data-id'), //所属行业 
		    "servicePhone": $('input[name="servicePhone"]').val(), 
		    "serviceMail": $('input[name="serviceMail"]').val(), 
		    "serviceWechat": $('input[name="serviceWechat"]').val(), 
		    "serviceMicroblog": $('input[name="serviceMicroblog"]').val(), 
		    "providUserName": $('input[name="username"]').val(), 
		    "legalPerson": $('input[name="legalname"]').val(), 
		    "website": $('input[name="website"]').val()
		}
    	     $.post(config.regist,regParams,function(response){
    			if (response.resultCode == '1') {
    				  alert(response.resultMsg);
                         //提交成功
                    $('.curm-1').hide();
                    $('.curm-2').show();
                    $('.username-layout').html($('input[name="firmname"]').val());
                } else {
                   alert(response.resultMsg);
                   return;
                }
    		});
    };
     
})