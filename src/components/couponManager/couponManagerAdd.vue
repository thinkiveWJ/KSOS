<template>
	<div id="couponManagerAdd">
		<dl>
			<div class="clearfix">
				<dt>优惠券名称：</dt>
				<dd><el-input v-model.trim="couponName" placeholder="请输入优惠券名称"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt>优惠券金额（元）：</dt>
				<dd><el-input v-model.trim="money" type="number" placeholder="请输入优惠券金额"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt>使用期限：</dt>
				<dd><el-date-picker v-model="endDate" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker></dd>
			</div>
			<div class="clearfix">
				<dt>使用范围：</dt>
				<dd><el-input v-model.trim="rang"  placeholder="请输入使用范围"></el-input></dd>
			</div>
			<a class="btn-save" @click="addCoupon">保存</a>
		</dl>
	</div>
</template>

<script type="text/ecmascript-6">
	import {phoneValidate, isEmpty} from '@/api/validate'
	export default {
		data () {
			return {
				couponName: '',
				money: '',
				endDate: '',
				rang: '',
				pickerOptions: {
		          disabledDate(time) {
		            return time.getTime() < Date.now() - 8.64e7;
		          }
		        }
			}
		},
		methods: {
			addCoupon () {
				if (isEmpty(this.couponName)) {
					return this.$notify.error({
			          message: '请输入优惠券名称'
			        });
				}
				if (isEmpty(this.money)) {
					return this.$notify.error({
			          message: '请选择优惠券金额'
			        });
				}
				if (isEmpty(this.endDate)) {
					return this.$notify.error({
			          message: '请输入使用期限'
			        });
				}
				if (isEmpty(this.rang)) {
					return this.$notify.error({
			          message: '请输入使用范围'
			        });
				}
				this.$ajax(this, {
					url: '/createCoupon',
					data: {
						couponName: this.couponName,
						money: this.money,
						endDate: this.endDate,
						rang: this.rang
					}
				}, 
				(result) => {
					this.$notify({
			          message: '新增优惠券成功',
			          type: 'success'
			        });
//			        this.couponName = '';
//					this.money = '';
//					this.endDate = '';
//					this.rang = '';
					this.$router.push({
						path: '/couponManager/query'
					});
				});
			}
		}
	}
</script>

<style type="text/css" rel='stylesheet'>
#couponManagerAdd{
	padding: 30px 0;
}
#couponManagerAdd dl dt{
	float: left;
	line-height: 40px;
	text-align: right;
	padding-right: 15px;
	width: 40%;
}
#couponManagerAdd dl dd{
	float: left;
	line-height: 40px;
	width: 40%;
}
#couponManagerAdd .clearfix + .clearfix{
	margin-top: 15px;
}
#couponManagerAdd .btn-save{
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
#couponManagerAdd .btn-save:hover{
	background: #69c00b;
}
#couponManagerAdd .el-date-editor.el-input{
	width: 100%;
}
</style>