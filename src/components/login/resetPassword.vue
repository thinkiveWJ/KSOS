<template>
	<div id="resetPassword">
		<dl>
			<div class="clearfix">
				<dt>旧密码：</dt>
				<dd><el-input v-model.trim="oldPassword" type="password" placeholder="请输入旧密码"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt>新密码：</dt>
				<dd><el-input v-model.trim="password" type="password" placeholder="请输入新密码"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt>确认新密码：</dt>
				<dd><el-input v-model.trim="password2" type="password" placeholder="请输入确认新密码"></el-input></dd>
			</div>
			<a class="btn-save" @click="resetPassword">重置密码</a>
		</dl>
	</div>
</template>

<script type="text/ecmascript-6">
	import {isEmpty, isStrEqual} from '@/api/validate'
	export default {
		data () {
			return {
				oldPassword: '',
				password: '',
				password2: ''
			}
		},
		methods: {
			resetPassword () {
				if (isEmpty(this.oldPassword)) {
					return this.$notify.error({
			          message: '请输入旧密码'
			        });
				}
				if (isEmpty(this.password)) {
					return this.$notify.error({
			          message: '请输入新密码'
			        });
				}
				if (isEmpty(this.password2)) {
					return this.$notify.error({
			          message: '请输入确认新密码'
			        });
				}
				if (!isStrEqual(this.password, this.password2)) {
					return this.$notify.error({
			          message: '请输入两次一样的新密码'
			        });
				}
				this.$ajax(this, {
					url: '/resetPassword',
					data: {
						userName: this.userName,
						password: this.password
					}
				}, 
				(result) => {
					this.$router.push({
						path: '/menus'
					});
				});
			}
		}
	}
</script>

<style type="text/css" rel='stylesheet'>
#resetPassword{
	padding: 30px 0;
	margin-top: 200px;
}
#resetPassword dl dt{
	float: left;
	line-height: 40px;
	text-align: right;
	padding-right: 15px;
	width: 40%;
}
#resetPassword dl dd{
	float: left;
	line-height: 40px;
	width: 40%;
}
#resetPassword .clearfix + .clearfix{
	margin-top: 15px;
}
#resetPassword .btn-save{
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
#resetPassword .btn-save:hover{
	background: #69c00b;
}
#resetPassword .el-upload.el-upload--text{
	width: 100%;
	position: relative;
}
#resetPassword .el-upload.el-upload--text button{
	display: block;
	width: 100%;
}
#resetPassword .el-upload.el-upload--text input[type='file']{
	display: none;
}
</style>