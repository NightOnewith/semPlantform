<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
	<jsp:include page="../public/sellerHead.jsp"></jsp:include>
</head>
<body>
<div class="main">
	<form></form>
	<jsp:include page="../public/sellerTopMenu.jsp"></jsp:include>

	<div class="perscenter-ui">
		<div ng-if="!withMenu">
			<div class="editgoods grey edit-goods-new">
				<div class="wrapper">
					<h2>商品基本信息</h2>
					<div class="edit_list">
						<label>商品名称：</label>
						<input type="text"  class="wlong goods-title" id="productName" name="productName">
					</div>
					<div class="edit_list">
						<label>销售元素：</label>
						<input type="text" ng-model="sale_combi_attr" class="wlong goods-title" id="elementName" name="elementName">
						<button class="btn" id="confirmElementId" >确定元素</button>
					</div>
					<div class="edit_list" >
						<label>销售元素属性：</label>
						<div id="saleElementAttrDivId">


						</div>
					</div>
					<div class="edit_list clear" ></div>
					<div class="types-list" id="type-list">
						<div class="type-item" id="default-type">
							<div class="type-rules">
								<div class="type-tiles-title">
									<span class="title-7">销售属性<em class="must"></em></span>
									<span class="title-2">销售属性值<em class="must"></em></span>
									<span class="title-3">商品库存<em class="must"></em></span>
									<span class="title-4">警示库存<em class="must"></em></span>
									<span class="title-5">价格<em class="must"></em></span>
									<span class="title-1">销售属性描述<em class="must"></em></span>
									<span class="title-8">操作</span>
								</div>
								<div id="div_template2Id">



								</div>
								<span class="ctrl-btn hide-btn"></span>
								<span class="ctrl-btn open-btn"></span>
							</div>
						</div>
					</div>
					<div class="edit_list">
						<label>产品类型：</label>
						<select class="wmid" id="prodTypeCd" name="prodTypeCd">

							<c:forEach items="${listProductTypeCd}" var="productTypeCd">
								<option value="${productTypeCd.productTypeId}">${productTypeCd.name}</option>
							</c:forEach>
							<%--<option value="0">请选择产品类型</option>
                            <option value="1">人事管理</option>
                            <option value="2">财务管理</option>
                            <option value="3">生产/供应链</option>
                            <option value="4">营销服务</option>
                            <option value="5">办公协调</option>
                            <option value="6">大数据服务</option>
                            <option value="7">ERP</option>--%>
						</select>
					</div>
					<div class="edit_list">
						<label>商品介绍：</label>
						<textarea class="wlong ng-pristine" id="description" name="description"></textarea>
					</div>
				</div>
				<div class="wrapper">
					<h2>商品图片</h2>
					<form  id="formPhotos">
						<div class="edit_list" id="picType1">
							<label>商品缩略图：</label>
							<div class="edit_up upload-preview-pic">
								<div class="edit_up_img preview-pic">
									<div class="upimg_bg_wrap">
										<div class="upimg_bg">
											<img src="" id="produPic"/>
											<input type="file"  name="uploadFile" id="${returnpath}" onchange="setImg(this)">
										</div>
									</div>
									<div class="edit_up_btn">
										<div class="fl">
											<p class="clearfix"><i>提示：</i>1.本地上传图片大小不能超过 3M 。<br>2.缩略图尺寸建议：90*90px。</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
					<div class="edit_list" id="picUrl">
						<label>商品详情：</label>

						<textarea id="addProdRichEditor" name="addProdRichEditor" cols="30" rows="16" style="width: 932px; height: 200px; "></textarea>
					</div>
					<div class="edit_btn edit_btn_yellow">
						<button type="button" class="qx_btn" ng-click="cancelSubmit()">取消</button>
						<button type="button" class="qx_btn" ng-click="preview()">预览</button>
						<button type="button" class="up_btn" onclick="submit()">上传</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<jsp:include page="../public/footer.jsp"></jsp:include>
<jsp:include page="../public/sellerBottom.jsp"></jsp:include>

<script id="template1" type="text/x-jquery-tmpl">
			<div class="clear">
				<label style="background: no-repeat;">${'${'}}：</label>
				<input type="text"  class="wlong goods-title">
			</div>
    	</script>

<script id="template2" type="text/x-jquery-tmpl">
    		<ul class="type-rules-container">
				<li class="type-rules-item">
					<label class="rule-7" id="label_template3Id" name="select">
					</label>
					<label class="rule-2" name="saleCombtAttr">
						<input class="text"  data-limit="string" readOnly>
					</label>
					<label class="rule-3" name="prodStockNum">
						<input class="text" data-limit="int">
					</label>
					<label class="rule-4" name="prodStockWarn">
						<input class="text"  data-limit="int">
					</label>
					<label class="rule-5" name="price" >
						<input class="text" data-limit="float">
					</label>
					<label class="rule-1" name="saleAttr">
						<input class="text" data-limit="string" >
					</label>
					<label class="rule-8">
						<a href="javascript:;" onClick="deleteModule(this)" class="remove-one-rule"></a>
						<a href="javascript:;" onClick="addModule()" class="add-one-rule"></a>
					</label>
				</li>
			</ul>
    	</script>

<script type="application/javascript">
	$(function(){
		kedit(KindEditor);
	});
	function kedit(K){
		window.editor = K.create('textarea[name="addProdRichEditor"]', {
			cssPath : '${ctx}/kindeditor/plugins/code/prettify.css',
			uploadJson : '${ctx}/kindeditor/jsp/upload_json.jsp',
			fileManagerJson : '${ctx}/kindeditor/jsp/file_manager_json.jsp',
			allowFileManager : true,
			afterBlur: function(){this.sync();},
			afterCreate : function() {
				var self = this;
				K.ctrl(document, 13, function() {
					self.sync();
				});
				K.ctrl(self.edit.doc, 13, function() {
					self.sync();
				});
			}
		});
		prettyPrint();
	}
</script>

<script>

	//确定元素按钮生成销售元素属性
	$(function(){
		$("#confirmElementId").click(function(){
			var elements = $(this).prev().val().split(/[，,]/);
			$("#saleElementAttrDivId").empty();
			if(elements.length==1 && elements[0]=="" ){
				return;
			}
			if(elements.length>3){
				alert("最多只能输入三个元素！");
				return;
			}
			$('#template1').tmpl(elements).appendTo('#saleElementAttrDivId');
			var $button=$("<button>",{
				class:"btn",
				text:"确定",
				onClick:"showTable()"
			});
			$("#saleElementAttrDivId").append($button);
		});
	});


	function showTable(){
		$("#div_template2Id").empty();
		$('#template2').tmpl().appendTo("#div_template2Id");
		var divsLength=$("#saleElementAttrDivId").find("div").length;
		for(var i=0;i<divsLength;i++){
			var attrValue=$("#saleElementAttrDivId").find("div").eq(i).find("input").val().split(/[，,]/);
			var $select=$("<select >",{
				class:"options",
				style:"width: 31%; margin-right: 5px;",
				onchange:"chooseElement(this)"
			})
			$.each(attrValue,function(i,e){
				var $option=$("<option>",{
					text:e
				})
				$select.append($option);
			});
			$select.appendTo("#label_template3Id");
		}

		//默认给属性框赋值
		var productSaleAttrs=[];
		$("#label_template3Id").find("select option:selected").each(function(){
			productSaleAttrs.push($(this).text());
		});
		$("#div_template2Id").find("ul").find("li").find("label[name='saleCombtAttr']").find("input").val(productSaleAttrs.join(","));

	}

	function chooseElement(obj) {
		var productSaleAttr = [];
		var selectLength = obj.parentNode.getElementsByTagName('select');
		var productSaleAttrs = [];
		for(var k = 0; k < selectLength.length; k++) {
			productSaleAttr.push(obj.parentNode.getElementsByTagName('select')[k].value);
		}
		obj.parentNode.parentNode.getElementsByTagName('label')[1].getElementsByTagName('input')[0].value=productSaleAttr.join(",");
	}

	/*"+"号按钮触发事件*/
	function addModule(){
		var module=$("#div_template2Id").find("ul").eq(0).prop("outerHTML");
		$("#div_template2Id").append(module);
	}

	/*"-"号按钮触发事件*/
	function deleteModule(obj){
		if($("#div_template2Id").find("ul").length<2){
			return;
		}
		obj.parentNode.parentNode.parentNode.remove()
	}

</script>

<script>
	//图片预览
	function setImg(obj){
		var formData = new FormData($("#formPhotos")[0]);
		$.ajax({
			url: '${ctx}/sellerUploadGoods/uploadFile',
			type: 'POST',
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function(data) {
				if(data.resultCode == 0){
					alert("文件上传失败");
				}else{
					$("#produPic").attr('src',data.object);
					//alert(data.object);
				}
			},
			error: function() {
				alert("请求失败！");
			}
		});
	}

	var listProductSaleAttr=new Array();//销售属性
	var saleElementArr = new Array();//属性值array
	var productSale = new Object();

	//取数据方法
	var obj=new Object();
	var arrElementName=new Array();
	function getProductValue(){
		obj.productName=$("#productName").val();
		var elements=$("#elementName").val();
		arrElementName=elements.split(/[，,]/);//元素arry
		$("#div_template2Id").find("ul").each(function(i,e){
			productSale.saleAttr=$(this).find("li").find("label[name='saleAttr']").find("input").val();
			productSale.prodStockNum=$(this).find("li").find("label[name='prodStockNum']").find("input").val();
			productSale.prodStockWarn=$(this).find("li").find("label[name='prodStockWarn']").find("input").val();
			productSale.price=$(this).find("li").find("label[name='price']").find("input").val();
			productSale.saleCombiAttr=$(this).find("li").find("label[name='saleCombtAttr']").find("input").val();

			if(productSale!=null&&productSale!=""&&productSale!="undefined"){
				listProductSaleAttr.push(productSale);
			}
		})
		return true;
	}
	//取出所有的数据源
	function joinJson() {
		getProductValue();
		var obj = new Object();
		obj.productName = $("#productName").val();
		obj.produPic=$("#produPic").val();
		obj.description=$("#description").val();
		obj.detailInfo=$("#addProdRichEditor").val();
		obj.productSaleAttrs = listProductSaleAttr;//销售属性
		obj.productTypeCd=$("#prodTypeCd option:selected").val();
		obj.produPic=$("#produPic").attr("src");
		var arryElement = new Array();//元素数组
		for (var i = 0; i < arrElementName.length; i++) {
			var arrElementAttr = new Array();//属性数组
			var elementObj = new Object();//元素对象
			elementObj.elementName = arrElementName[i];
			for (var j = 0; j < saleElementArr.length; j++) {
				var arr = saleElementArr[i].split(/[，,]/);
				for (var m = 0; m < arr.length; m++) {
					var elementAttrObj = new Object();//元素对象属性
					elementAttrObj.attrName = arr[m];
					arrElementAttr.push(elementAttrObj);
				}
				break;
			}
			elementObj.productElementAttrList = arrElementAttr;
			arryElement.push(elementObj);
		}
		obj.productSaleElement = arryElement;//销售元素
		return obj;

	}
	function submit(){
		var prodStockNum= $("#div_template2Id").find("ul").find("li").find("label[name='prodStockNum']").find("input").val();
		var prodStockWarn= $("#div_template2Id").find("ul").find("li").find("label[name='prodStockWarn']").find("input").val();
		var regNum=/^(\+|-)?\d+$/;
		if(!regNum.test(prodStockNum)){
			alert("库存请输入数字");
			return false;
		}
		if(!regNum.test(prodStockWarn)){
			alert("警示库存请输入数字");
			return false;
		}
		if(prodStockNum<prodStockWarn){
			alert("库存不能小于警示库存");
			return false;
		}
		$.ajax({
			type : 'post',
			dataType :'json',
			url : '${ctx}/sellerUploadGoods/sellerUploadGoodsAdd',
			data : JSON.stringify(joinJson()),
			cache : false,
			sync : true,
			success : function(data) {
				if(data.resultCode == 0){
					alert("文件上传失败");
				}
			},
			error : function() {
				alert("请求失败");
				return false;
			}
		});

	}

</script>

</body>

</html>