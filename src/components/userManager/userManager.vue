<template>
	<div id="userManager">
		<div class="header">
			<el-row>
			  <el-col :span="8" :push="16">
		  		<el-input placeholder="请输入手机号码" v-model='searchVal' size="medium">
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
	    	<el-table-column prop="userId" label="角色ID" align="center" width="90"></el-table-column>
		    <!-- <el-table-column prop="userName" label="用户名" align="center"></el-table-column> -->
		    <el-table-column prop="accountStatus" label="状态" :formatter="formatterStatus"
		    	:filters="tableFilters" :filter-method="filterTag" :filter-multiple="false"
		    	filter-placement="bottom" align="center">
		      
		    </el-table-column>
		    <el-table-column prop="consumerLevel" label="消费等级" align="center">
		    	<template slot-scope="scope">
		    		<v-start :start="scope.row.consumerLevel"></v-start>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="creditLevel" label="信用等级" align="center">
		    	<template slot-scope="scope">
		    		<v-start :start="scope.row.creditLevel"></v-start>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="phoneNumber" label="手机号" align="center"></el-table-column>
		    <el-table-column prop="userCreateDate" label="创建时间" align="center"></el-table-column>
		    <!-- <el-table-column label="最近成交" align="center"></el-table-column> -->
		    <el-table-column label="操作" align="center" width="120">
		    	<template slot-scope="scope">
			        <span class="glyphicon glyphicon-cog btn" title="审核" @click="auditFunc(scope.row)"></span> 
			        <span class="glyphicon glyphicon-eye-open btn" title="查看" @click="lookFunc(scope.row)"></span>
			        <span class="glyphicon glyphicon-edit btn" title="编辑" @click="editFunc(scope.row)"></span> 

			        <span v-if="scope.row.accountStatus !== 4" class="glyphicon glyphicon-log-in btn" title="加入黑名单" @click="deleteFunc(scope.row, 1)"></span>
					<span v-else class="glyphicon glyphicon-log-out btn" title="退出黑名单" style="color:#ddd" @click="deleteFunc(scope.row, 0)"></span>
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
		      :total="total"
		      prev-text="上一页"
		      next-text="下一页">
		    </el-pagination>
		</div>
		
		<!--审核用户弹出框-->
		<el-dialog :visible.sync="auditDialog" :center="true">
		  <dl class="audit">
		  	<dt class="pull-left">用户审核：</dt>
		  	<dd class="pull-left">
		  		 <el-select v-model="auditValue" placeholder="请选择">
				    <el-option
				      v-for="item in auditList"
				      :key="item.value"
				      :label="item.text"
				      :value="item.value">
				    </el-option>
				</el-select>
		  	</dd>
		  </dl>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="auditDialog = false">取 消</el-button>
		    <el-button @click="auditDialogOk">确 定</el-button>
		  </div>
		</el-dialog>

		<!--查看用户详细信息-->
		<el-dialog :visible.sync="lookDialog" :center="true">
		  <dl class="audit">
		  	<div class="clearfix">
		  		<dt class="pull-left">账户余额：</dt>
		  		<dd class="pull-left" v-cloak>{{lookDetails['accountBalance']}}元</dd>
		  	</div>
		  	<div class="clearfix">
		  		<dt class="pull-left">代金券总数：</dt>
		  		<dd class="pull-left" v-cloak>{{lookDetails['couponAmount']}}张</dd>
		  	</div>
			<div class="clearfix">
				<dt class="pull-left">完成订单数：</dt>
		  		<dd class="pull-left" v-cloak>{{lookDetails['userOrderCompletedNum']}}单</dd>
			</div>
		  	<div class="clearfix">
		  		<dt class="pull-left">取消订单数：</dt>
		  		<dd class="pull-left" v-cloak>{{lookDetails['userOrderCanceledNum']}}单</dd>
		  	</div>
		  </dl>
		  <div slot="footer" class="dialog-footer">
		    <!--<el-button @click="lookDialog = false">取 消</el-button>-->
		    <el-button @click="lookDialog=false">确 定</el-button>
		  </div>
		</el-dialog>
		
		<!--编辑用户详细信息-->
		<el-dialog :visible.sync="editDialog" :center="true">
		  <dl class="audit">
		  	<!-- <div class="clearfix">
				<dt class="pull-left">用户名：</dt>
				<dd class="pull-left"><el-input v-model.trim="editUserName" placeholder="请输入用户名"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">身份：</dt>
				<dd class="pull-left">
					<el-select v-model="editIdentityVal" placeholder="请选择" style="width:100%;">
					    <el-option
					      v-for="item in identity"
					      :key="item.value"
					      :label="item.text"
					      :value="item.value">
					    </el-option>
					</el-select>
				</dd>
			</div> -->
			<!-- <div class="clearfix">
				<dt class="pull-left">手机号：</dt>
				<dd class="pull-left"><el-input v-model.trim="editPhone" placeholder="请输入手机号"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">密码：</dt>
				<dd class="pull-left"><el-input v-model.trim="editPassword" type="password" placeholder="请输入密码"></el-input></dd>
			</div> -->
			<div class="clearfix">
				<dt class="pull-left">消费等级：</dt>
				<dd class="pull-left">
					<el-select v-model="editConsumerLevel" placeholder="请选择消费等级">
						<el-option
							v-for="item in consumerLevelList"
							:key="item.value"
							:label="item.text"
							:value="item.value">
						</el-option>
					</el-select>
				</dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">信用等级：</dt>
				<dd class="pull-left">
					<el-select v-model="editCreditLevel" placeholder="请选择信用等级">
						<el-option
							v-for="item in creditLevelList"
							:key="item.value"
							:label="item.text"
							:value="item.value">
						</el-option>
					</el-select>
				</dd>
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
	import {directoryText, getDirectory} from '@/api/directory';
	import start from '@/components/userManager/start';
	import {phoneValidate, isEmpty} from '@/api/validate';

	export default {
		data () {
			return {
				loading: true,
				tableData: [
					
				],
				searchVal: '',
				tableFilters: [],
				//当前页
				currentPage: 1,
				total: 0,
				//用户审核数据
				auditValue: '1',
				auditUserId: '',
				auditList: [
					{
						text: '通过审核',
						value: '1',
					},
					{
						text: '不通过审核',
						value: '2',
					}
				],
				// 消费等级
				consumerLevelList: [
					{
						text: '1',
						value: '1',
					},
					{
						text: '2',
						value: '2',
					},
					{
						text: '3',
						value: '3',
					},
					{
						text: '4',
						value: '4',
					},
					{
						text: '5',
						value: '5',
					}
				],
				// 信用等级
				creditLevelList:[
					{
						text: '1',
						value: '1',
					},
					{
						text: '2',
						value: '2',
					},
					{
						text: '3',
						value: '3',
					},
					{
						text: '4',
						value: '4',
					},
					{
						text: '5',
						value: '5',
					}
				],
				//
				auditDialog: false,
				//用户具体信息的数据
				lookDetails: {},
				lookDialog: false,
				//用户编辑
				editDialog: false,
				// 编辑第几个用户
				editUserInfo: '',
				identity: [
					{
						text: "委托人", 
						value: 1
					},
					{
						text: "捎件人",
						value: 2
					}
				],
				editConsumerLevel: '',
				editCreditLevel: ''
				// editUserName: '',
				// editIdentityVal: '',
				// editPhone: '',
				// editPassword: ''
			}
		},
		methods: {
			searchFunc () {
				//查询用户管理的列表所有信息
				let queryParam = {
					pageNo: 1,
					sizePerPage: 20,
					phoneNum: this.searchVal

				};
				this.getUserList(queryParam);
			},
			filterTag (value, row) {
				return row['accountStatus'] == value;
			},
			//从数据字典中获取accountStatus对应的文字
			formatterStatus (row, column, cellValue) {
				return getDirectory('accountStatus2', row['accountStatus']);
			},
			//获取数据字典中的accountStatus状态并转换为数组
			getAccountStatusFunc () {
				let accountStatus = directoryText('accountStatus')
				this.tableFilters = []
				for (let i in accountStatus) {
					if (accountStatus.hasOwnProperty(i)) {
						this.tableFilters.push({
							text: i,
							value: accountStatus[i]
						})
					}
				}
			},
			//查询用户管理的列表所有信息
			getUserList (queryParam) {
				this.$ajax(this, {
					url: "/FlightDeliveryServer/usermanagement/getuseroptlist",
					data: queryParam
				},
				(result) => {
					this.tableData = result['data']['userOptListDtoList']
					this.currentPage = result['data']['tablePageDto']['pageNo']
					this.total = result['data']['tablePageDto']['total']
				});
			},
			//翻页
			handleCurrentChange (currentPage) {
				//查询用户管理的列表所有信息
				let queryParam = {
					pageNo: currentPage,
					sizePerPage: 20,
					phoneNum: this.searchVal

				};
				this.getUserList(queryParam);
				this.getUserList(queryParam);
			},
			//填充审核用户信息
			auditFunc (row) {
				this.auditUserId = row['userId'];
				this.auditDialog = true;
			},
			//点击审核用户信息的确定按钮
			auditDialogOk () {
				// console.log(this.auditValue)
				this.$ajax(this,{
					url: '/FlightDeliveryServer/usermanagement/audituser',
					data: {
						userId: this.auditUserId,
						accountStatus: this.auditValue-0,
						accountStatusReason: ''
					}
				},
				(result) => {
					this.auditDialog = false;
					//查询用户管理的列表所有信息
					this.getUserList({
						pageNo: 1,
						sizePerPage: 20
					});
				});
			},
			//查看用户详细信息
			lookFunc (row) {
				this.auditUserId = row['userId'];
				this.$ajax(this, {
					url: '/FlightDeliveryServer/usermanagement/getcoreuserdata',
					data: {
						userId: this.auditUserId
					}
				},
				(result) => {
					this.lookDetails = result['data']
					this.lookDialog = true;
				});
				
			},
			//编辑用户信息，填充数据
			editFunc (row) {
				this.editUserInfo = row
				this.editConsumerLevel = row['consumerLevel']
				this.editCreditLevel = row['creditLevel']
				this.editDialog = true;
				// this.$ajax(this, {
				// 	url: '/getUserInfo',
				// 	data: {
				// 		userId: row['userId']
				// 	}
				// }, 
				// (result) => {
				// 	let res = result['data']
				// 	this.editUserName = res['userName'];
				// 	this.editIdentityVal = res['identity'];
				// 	this.editPhone = res['phoneNumber'];
				// 	this.editPassword = res['password'];
				// });
			},
			//更新用户信息
			editDialogOk () {
				// if (isEmpty(this.editUserName)) {
				// 	return this.$notify.error({
			    //       message: '请输入用户名'
			    //     });
				// }
				// if (isEmpty(this.editIdentityVal)) {
				// 	return this.$notify.error({
			    //       message: '请选择身份'
			    //     });
				// }
				// if (isEmpty(this.editPhone)) {
				// 	return this.$notify.error({
			    //       message: '请输入手机号码'
			    //     });
				// }
				// if (!phoneValidate(this.editPhone)) {
				// 	return this.$notify.error({
			    //       message: '请输入正确格式的手机号码'
			    //     });
				// }
				if (isEmpty(this.editConsumerLevel)) {
					return this.$notify.error({
			          message: '请选择消费等级'
			        });
				}
				if (isEmpty(this.editCreditLevel)) {
					return this.$notify.error({
			          message: '请选择信用等级'
			        });
				}
				this.$ajax(this, {
					url: '/FlightDeliveryServer/usermanagement/updateuseropt',
					data: {
						// userName: this.editUserName,
						// identity: this.editIdentityVal,
						// phoneNumber: this.editPhone,
						// password: this.editPassword
						userId: this.editUserInfo['userId'],
						consumerLevel: this.editConsumerLevel-0,
						creditLevel: this.editCreditLevel-0,
						accountStatusReason: ''
					}
				}, 
				(result) => {
					this.editDialog = false;
					let queryParam = {
						pageNo: 1,
						sizePerPage: 20
					};
					this.getUserList(queryParam);
				});

			},
			//删除当前个人用户信息
			deleteFunc (row, flag) {
				this.$ajax(this, {
					url: '/FlightDeliveryServer/usermanagement/disableuser',
					data: {
						userId: row['userId'],
						accountStatus: flag - 0,
						accountStatusReason: ''
					}
				}, 
				(result) => {
					let errorInfo = ""
					if(flag === 1){
						errorInfo = '加入黑名单成功'
					}else {
						errorInfo = '拉出黑名单成功'
					}
					this.$notify({
			          message: errorInfo,
			          type: 'success'
			        });
			        //查询用户管理的列表所有信息
					let queryParam = {
						pageNo: 1,
						sizePerPage: 20
					};
					this.getUserList(queryParam);
				});
			}
		},
		created () {
			////获取数据字典中的accountStatus状态并转换为数组
			this.getAccountStatusFunc();
			
			
			//查询用户管理的列表所有信息
			let queryParam = {
				pageNo: 1,
				sizePerPage: 20
			};
			this.getUserList(queryParam);
		},
		components: {
			'v-start': start
		}
	}
</script>

<style type="text/css" rel='stylesheet'>


</style>