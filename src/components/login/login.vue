<template>
	<div id="login">
		<dl>
			<div class="clearfix">
				<dt>用户名：</dt>
				<dd><el-input v-model.trim="userName" placeholder="请输入用户名"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt>密码：</dt>
				<dd><el-input v-model.trim="password" type="password" placeholder="请输入密码"></el-input></dd>
			</div>
			<a class="btn-save" @click="login">登录</a>
		</dl>
	</div>
</template>

<script type="text/ecmascript-6">
	import {isEmpty} from '@/api/validate'
	import crypto from 'crypto'
	export default {
		data () {
			return {
				userName: '',
				password: ''
			}
		},
		methods: {
			login () {
				if (isEmpty(this.userName)) {
					return this.$notify.error({
			          message: '请输入用户名'
			        });
				}
				if (isEmpty(this.password)) {
					return this.$notify.error({
			          message: '请输入密码'
			        });
				}
				this.$ajax(this, {
					url: '/FlightDeliveryServer/usermanagement/rootlogin',
					data: {
						phone: this.userName,
						password: this.password
					}
				}, 
				(result) => {
					this.$router.push({
						path: '/menus'
					});
					//存储用户名以作显示
					this.$store.commit('setNickName', this.userName)
				});
			}
		}
	}
</script>

<style type="text/css" rel='stylesheet'>
#login{
	padding: 30px 0;
	margin-top: 200px;
}
#login dl dt{
	float: left;
	line-height: 40px;
	text-align: right;
	padding-right: 15px;
	width: 40%;
}
#login dl dd{
	float: left;
	line-height: 40px;
	width: 40%;
}
#login .clearfix + .clearfix{
	margin-top: 15px;
}
#login .btn-save{
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
#login .btn-save:hover{
	background: #69c00b;
}
#login .el-upload.el-upload--text{
	width: 100%;
	position: relative;
}
#login .el-upload.el-upload--text button{
	display: block;
	width: 100%;
}
#login .el-upload.el-upload--text input[type='file']{
	display: none;
}
</style>