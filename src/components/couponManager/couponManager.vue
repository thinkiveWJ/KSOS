<template>
	<div id="couponManager">
		<div class="header">
			<el-row>
			  <el-col :span="8" :push="16">
		  		<el-input placeholder="请输入内容" v-model='searchVal' size="medium">
				    <i @click="searchFunc" slot="suffix" class="el-input__icon el-icon-search"></i>
				</el-input>
			  </el-col>
			</el-row>
		</div>
		
		<el-table :data="tableData" style="width: 100%" :stripe="true" :border="true" 
			v-loading="loading"
			element-loading-text="拼命加载中"
    		element-loading-spinner="el-icon-loading"
    		element-loading-background="rgba(0, 0, 0, 0.6)">
	    	<el-table-column prop="couponId" label="ID" align="center"></el-table-column>
		    <el-table-column prop="couponName" label="优惠券名称" align="center"></el-table-column>
		    <el-table-column prop="money" label="金额" align="center"></el-table-column>
		    <el-table-column prop="endDate" label="有效期限" width="180" align="center"></el-table-column>
		    <el-table-column prop="rang" label="使用范围" align="center"></el-table-column>
		    <el-table-column label="操作" align="center">
		    	<template slot-scope="scope">
			        <span class="glyphicon glyphicon-edit btn" title="编辑" @click="editFunc(scope.row)"></span> 
			        <span class="glyphicon glyphicon-trash btn" title="删除" @click="deleteFunc(scope.row)"></span>
		      </template>
		    </el-table-column>
	  	</el-table>
	  	
	  	<div class="block text-right pagers">
		    <el-pagination
		    	background
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-size="20"
		      layout="total, prev, pager, next, jumper"
		      :total="400"
		      prev-text="上一页"
		      next-text="下一页">
		    </el-pagination>
		</div>
		
		<!--编辑优惠券-->
		<el-dialog :visible.sync="editDialog" :center="true">
		  <dl class="audit">
		  	<div class="clearfix">
				<dt class="pull-left">优惠券名称：</dt>
				<dd class="pull-left"><el-input v-model.trim="editCouponName" placeholder="请输入优惠券名称"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">优惠券金额（元）：</dt>
				<dd class="pull-left"><el-input type="number" v-model.trim="editMoney" placeholder="请输入优惠券金额"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">使用期限：</dt>
				<dd class="pull-left"><el-date-picker v-model="editEndDate" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker></dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">使用范围：</dt>
				<dd class="pull-left"><el-input v-model.trim="editRang" type="text" placeholder="请输入使用范围"></el-input></dd>
			</div>
		  </dl>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="editDialog = false">取 消</el-button>
		    <el-button @click="editDialogOk">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
	import {isEmpty} from '@/api/validate'
	export default {
		data () {
			return {
				//搜索框内容
				searchVal: '',
				tableData: [],
				loading: true,
				currentPage: 1,
				//编辑优惠券
				editDialog: false,
				editCouponName: '',
				editMoney: '',
				editEndDate: '',
				editRang: '',
				pickerOptions: {
		          disabledDate(time) {
		            return time.getTime() < Date.now() - 8.64e7;
		          }
		        }
			}
		},
		methods: {
			//搜索方法
			searchFunc () {
				
			},
			//查询优惠券列表
			queryCoupon (dataParams) {
				this.$ajax(this, {
					url: '/queryCoupon',
					data: dataParams
				},
				(result) => {
					this.tableData = result['list'];
				});
			},
//			翻页
			handleCurrentChange () {
				//查询优惠券列表
				let data = {};
				this.queryCoupon (data);
			},
			//点击编辑填充数据
			editFunc (row) {
				this.editDialog = true;
				this.editCouponName = row['couponName'];
				this.editMoney = row['money'];
				this.editEndDate = row['endDate'];
				this.editRang = row['rang'];
				
			},
			//点击编辑的确定按钮
			editDialogOk () {
				if (isEmpty(this.editCouponName)) {
					return this.$notify.error({
			          message: '请输入优惠券名称'
			        });
				}
				if (isEmpty(this.editMoney)) {
					return this.$notify.error({
			          message: '请输入优惠券金额'
			        });
				}
				if (isEmpty(this.editEndDate)) {
					return this.$notify.error({
			          message: '请输入有效期限'
			        });
				}
				if (isEmpty(this.editRang)) {
					return this.$notify.error({
			          message: '请输入使用范围'
			        });
				}
				this.$ajax(this, {
					url: '/updateCoupon',
					data: {
						couponName: this.editCouponName,
						money: this.editMoney,
						endDate: this.editEndDate,
						rang: this.editRang
					}
				},
				(result) => {
					this.editDialog = false;
					//查询优惠券列表
					let data = {};
					this.queryCoupon (data);
				});
			},
			//删除优惠券
			deleteFunc (row) {
				this.$ajax(this, {
					url: '/deleteCoupon',
					data: {
						couponId: row['couponId']
					}
				},
				(result) => {
					this.$notify({
			          message: '删除优惠券成功',
			          type: 'success'
			        });
			        //查询优惠券列表
					let data = {};
					this.queryCoupon (data);
				});
			}
		},
		created () {
			//查询优惠券列表
			let data = {};
			this.queryCoupon (data);
		}
	}
</script>

<style type="text/css" rel='stylesheet'>

</style>