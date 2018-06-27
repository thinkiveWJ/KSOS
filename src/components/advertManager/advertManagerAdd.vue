<template>
	<div id="advertManagerAdd">
		<!-- <iframe style="display:none" name="iframe"></iframe>
		<form id="advertManagerAddForm" target="iframe" action="/FlightDeliveryServer/FlightDeliveryServer/admanagement/createad" method="post" enctype="multipart/form-data"> -->
		<dl>
			<div class="clearfix">
				<dt>版本名称：</dt>
				<dd><el-input name="name" v-model.trim="imgUploadData.name" placeholder="请输入版位名称"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt>版位类型：</dt>
				<dd>
					<el-select v-model="imgUploadData.type" name="type" placeholder="请选择">
					    <el-option
					      v-for="item in typeList"
					      :key="item.value"
					      :label="item.text"
					      :value="item.value">
					    </el-option>
					</el-select>
				</dd>
			</div>
			<div class="clearfix">
				<dt>版位尺寸（宽：px）：</dt>
				<dd><el-input v-model.trim="imgUploadData.width" name="width" type="number" placeholder="请输入版位尺寸的宽"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt>版位尺寸（高：px）：</dt>
				<dd><el-input v-model.trim="imgUploadData.height" name="height" type="number" placeholder="请输入版位尺寸的高"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt>版位描述：</dt>
				<dd><el-input v-model.trim="imgUploadData.desc" name="desc"  placeholder="请输入版位描述"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">图片上传：</dt>
				<dd class="pull-left">
					<!-- <input type="file" name="image"/> -->
					<el-upload
					  ref="upload"
					  class="upload-btn"
					  :auto-upload="false"
					  action = "/FlightDeliveryServer/FlightDeliveryServer/admanagement/createad"
					  :limit='1' 
					  name = "image"
					  :data = "imgUploadData"
					  :file-list="imgList"
					  :on-error="uploadError"
					  :on-success="uploadSuccess"
					  :on-change="onChange"
					  >
					  <el-button size="small" type="primary">上传图片</el-button>
						<div class="el-upload__tip">只能上传jpg/png文件</div>
					</el-upload>
				</dd>
			</div>
			<a class="btn-save" @click="addCoupon">保存</a>
		</dl>
		<!-- </form> -->
	</div>
</template>

<script type="text/ecmascript-6">
	import {phoneValidate, isEmpty} from '@/api/validate'
	export default {
		data () {
			return {
				imgList: [],
				imgUploadData: {
					name: "",
					type: "",
					width: "",
					height: "",
					desc: ""
				},
				typeList: [
					{
						text: '图片轮换广播',
						value: 3
					}
				]
			}
		},
		methods: {
			onChange (event, file, fileList) {
				let filename = event['name']
				let filesize = event['size']
				let fileType = filename.split(".")[1]
				if(fileType !== 'jpg' && fileType !== 'png'){
					this.imgList = [];
					this.$notify.error({
			          message: '图片格式不正确'
					});
					this.$refs.upload.clearFiles();
					return false;
				}
			},
			uploadError (err, file, fileList) {
				this.$refs.upload.clearFiles();
			},
			uploadSuccess (response, file, fileList) {
				if(response['error_code'] !== 0){
					this.$refs.upload.clearFiles();
					return this.$notify.error({
						message: response['error_msg']
					});
				}
			},
			// 点击保存
			addCoupon () {
				if (isEmpty(this.imgUploadData.name)) {
					return this.$notify.error({
			          message: '请输入版位名称'
			        });
				}
				if (isEmpty(this.imgUploadData.type)) {
					return this.$notify.error({
			          message: '请选择版位类型'
			        });
				}
				if (isEmpty(this.imgUploadData.width)) {
					return this.$notify.error({
			          message: '请输入版位宽度'
			        });
				}
				if (isEmpty(this.imgUploadData.height)) {
					return this.$notify.error({
			          message: '请输入版位高度'
			        });
				}
				if (isEmpty(this.imgUploadData.desc)) {
					return this.$notify.error({
			          message: '请输入版位描述信息'
			        });
				}
				this.$refs.upload.submit();
			}
		}
		
	}
</script>

<style type="text/css" rel='stylesheet'>
#advertManagerAdd{
	padding: 30px 0;
}
#advertManagerAdd dl dt{
	float: left;
	line-height: 40px;
	text-align: right;
	padding-right: 15px;
	width: 40%;
}
#advertManagerAdd dl dd{
	float: left;
	line-height: 40px;
	width: 40%;
}
#advertManagerAdd .clearfix + .clearfix{
	margin-top: 15px;
}
#advertManagerAdd .btn-save{
	display: block;
	background: #69c72b;
	padding: 6px 12px;
	color: #fff;
	-webkit-border-radius: 3px;
	border-radius: 3px;
	margin: 15px auto;
	width: 40%;
	text-align: center;
	cursor: pointer;
	margin-left: 40%;
}
#advertManagerAdd .btn-save:hover{
	background: #69c00b;
}
#advertManagerAdd .el-upload.el-upload--text{
	width: 100%;
	position: relative;
}
#advertManagerAdd .el-upload.el-upload--text button{
	display: block;
	width: 100%;
}
#advertManagerAdd .el-upload.el-upload--text input[type='file']{
	display: none;
}
</style>