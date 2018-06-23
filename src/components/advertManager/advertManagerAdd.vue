<template>
	<div id="advertManagerAdd">
		<form id="advertManagerAddForm" action="/FlightDeliveryServer/FlightDeliveryServer/admanagement/createad" method="post" enctype="multipart/form-data">
		<dl>
			<div class="clearfix">
				<dt>版本名称：</dt>
				<dd><el-input v-model.trim="name" placeholder="请输入版位名称"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt>版位类型：</dt>
				<dd>
					<el-select v-model="type" placeholder="请选择">
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
				<dd><el-input v-model.trim="width" type="number" placeholder="请输入版位尺寸的宽"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt>版位尺寸（高：px）：</dt>
				<dd><el-input v-model.trim="height" type="number" placeholder="请输入版位尺寸的高"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt>版位描述：</dt>
				<dd><el-input v-model.trim="desc"  placeholder="请输入版位描述"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">文件上传：</dt>
				<dd class="pull-left">
					<el-upload
					  class="upload-btn"
					  action=""
					  >
					  <el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
				</dd>
			</div>
			<a class="btn-save" @click="addCoupon">保存</a>
		</dl>
		</form>
	</div>
</template>

<script type="text/ecmascript-6">
	import {phoneValidate, isEmpty} from '@/api/validate'
	export default {
		data () {
			return {
				name: '',
				type: '',
				width: '',
				height: '',
				desc: '',
				typeList: [
					{
						text: '图片轮换广播',
						value: 1
					}
				],
			}
		},
		methods: {
			addCoupon () {
				if (isEmpty(this.name)) {
					return this.$notify.error({
			          message: '请输入版位名称'
			        });
				}
				if (isEmpty(this.type)) {
					return this.$notify.error({
			          message: '请选择版位类型'
			        });
				}
				if (isEmpty(this.width)) {
					return this.$notify.error({
			          message: '请输入版位宽度'
			        });
				}
				if (isEmpty(this.height)) {
					return this.$notify.error({
			          message: '请输入版位高度'
			        });
				}
				if (isEmpty(this.desc)) {
					return this.$notify.error({
			          message: '请输入版位描述信息'
			        });
				}
				$("#advertManagerAddForm").submit();
// 				this.$ajax(this, {
// 					url: '/createAd',
// 					data: {
// 						name: this.name,
// 						type: this.type,
// 						width: this.width,
// 						height: this.height,
// 						desc: this.desc
// 					}
// 				}, 
// 				(result) => {
// 					this.$notify({
// 			          message: '新增广告版位成功',
// 			          type: 'success'
// 			        });
// //			        this.name = '';
// //					this.type = '';
// //					this.width = '';
// //					this.height = '';
// //					this.desc = '';
// 					this.$router.push({
// 						path: '/advertManager/query'
// 					});
// 				});
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