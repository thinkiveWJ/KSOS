<template>
	<div id="userManagerAdd">
		<dl>
			<!-- <div class="clearfix">
				<dt>用户名：</dt>
				<dd><el-input v-model.trim="userName" placeholder="请输入用户名"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt>身份：</dt>
				<dd>
					<el-select v-model="identityVal" placeholder="请选择" style="width:100%;">
					    <el-option
					      v-for="item in identity"
					      :key="item.value"
					      :label="item.text"
					      :value="item.value">
					    </el-option>
					</el-select>
				</dd>
			</div> -->
			<div class="clearfix">
				<dt>手机号：</dt>
				<dd><el-input v-model.trim="phone" placeholder="请输入手机号"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt>密码：</dt>
				<dd><el-input v-model.trim="password" type="password" placeholder="请输入密码的长度最少为6"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt>确认密码：</dt>
				<dd><el-input v-model.trim="password2" type="password" placeholder="请再次输入密码"></el-input></dd>
			</div>
			<a class="btn-save" @click="addUser">保存</a>
		</dl>
	</div>
</template>

<script type="text/ecmascript-6">
	import {phoneValidate, isEmpty} from '@/api/validate'
	export default {
		data () {
			return {
				// userName: '',
//				身份信息
				// identityVal: '',
				// identity: [
				// 	{
				// 		text: "委托人", 
				// 		value: 1
				// 	},
				// 	{
				// 		text: "捎件人",
				// 		value: 2
				// 	}
				// ],
				phone: '',
				password: '',
				password2: ''
			}
		},
		methods: {
			addUser () {
				// if (isEmpty(this.userName)) {
				// 	return this.$notify.error({
			    //       message: '请输入用户名'
			    //     });
				// }
				// if (isEmpty(this.identityVal)) {
				// 	return this.$notify.error({
			    //       message: '请选择身份'
			    //     });
				// }
				if (isEmpty(this.phone)) {
					return this.$notify.error({
			          message: '请输入手机号码'
			        });
				}
				if (!phoneValidate(this.phone)) {
					return this.$notify.error({
			          message: '请输入正确格式的手机号码'
			        });
				}
				if (isEmpty(this.password)) {
					return this.$notify.error({
			          message: '请输入密码'
			        });
				}
				if (isEmpty(this.password2)) {
					return this.$notify.error({
			          message: '请输入确认密码'
			        });
				}
				if (this.password2 !== this.password) {
					return this.$notify.error({
			          message: '请输入2次一样的密码'
			        });
				}
				this.$ajax(this, {
					url: '/FlightDeliveryServer/user/register',
					data: {
						userName: this.userName,
						identityVal: this.identityVal,
						phone: this.phone,
						password: this.password
					}
				}, 
				(result) => {
					this.$notify({
			          message: '新增用户成功',
			          type: 'success'
					});
					
//			        this.userName = '';
//					this.identityVal = '';
//					this.phone = '';
//					this.password = '';
//					this.password2 = '';
					console.log(this);
					this.$router.push({
						path: '/userManager/query'
					});
				});
			}
		}
	}
</script>

<style type="text/css" rel='stylesheet'>
#userManagerAdd{
	padding: 30px 0;
}
#userManagerAdd dl dt{
	float: left;
	line-height: 40px;
	text-align: right;
	padding-right: 15px;
	width: 40%;
}
#userManagerAdd dl dd{
	float: left;
	line-height: 40px;
	width: 40%;
}
#userManagerAdd .clearfix + .clearfix{
	margin-top: 15px;
}
#userManagerAdd .btn-save{
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
#userManagerAdd .btn-save:hover{
	background: #69c00b;
}
</style>