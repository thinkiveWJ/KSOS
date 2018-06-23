<template>
	<div id="messageManager">
		<div class="search">
			 <div class="block">
			    <!--<span class="demonstration"></span>-->
			    <el-date-picker
			      v-model="dateRang"
			      type="daterange"
			      range-separator="-"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期" @change='queryFunc'>
			    </el-date-picker>
			 </div>
		</div>
		<el-table :data="tableData" style="width: 100%" :stripe="true" :border="true" 
			v-loading="loading"
			element-loading-text="拼命加载中"
    		element-loading-spinner="el-icon-loading"
    		element-loading-background="rgba(0, 0, 0, 0.6)">
	    	<el-table-column prop="msgId" label="ID" align="center"></el-table-column>
		    <el-table-column prop="msgTitle" label="标题" align="center"></el-table-column>
		    <el-table-column prop="msgContent" label="内容" align="center"></el-table-column>
		    <el-table-column prop="msgType" label="类型" align="center"></el-table-column>
		    <el-table-column prop="msgObj" label="接收对象" align="center"></el-table-column>
		    <el-table-column prop="msgCreateDate" label="创建时间" align="center"></el-table-column>
		    <el-table-column prop="msgStartDate" label="生效开始时间" align="center"></el-table-column>
		    <el-table-column prop="msgEndDate" label="生效截止时间" align="center"></el-table-column>
		    <el-table-column label="操作" align="center" width="120">
		    	<template slot-scope="scope" v-if="scope.row.msgObjType === 2">
			        <span class="glyphicon glyphicon-edit btn" title="编辑" @click="editMsg(scope.row)"></span> 
			        <span class="glyphicon glyphicon-trash btn" title="禁止" @click="deleteMsg(scope.row)"></span>
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
				<dt class="pull-left">消息标题：</dt>
				<dd class="pull-left"><el-input v-model.trim="editTitle" placeholder="请输入消息标题"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">消息类型：</dt>
				<dd class="pull-left">
					<el-select v-model="editMsgTypeValue" placeholder="请选择">
					    <el-option
					      v-for="item in editMsgTypeList"
					      :key="item.value"
					      :label="item.text"
					      :value="item.value">
					    </el-option>
					</el-select>
				</dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">生效时间：</dt>
				<dd class="pull-left">
					<el-date-picker
				      v-model="editDateRang"
				      type="daterange"
				      range-separator="-"
				      value-format="yyyy-MM-dd"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期">
				    </el-date-picker>
				</dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">消息内容：</dt>
				<dd class="pull-left"><textarea v-model.trim="editContent" type="text" placeholder="请输入消息内容"></textarea></dd>
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
	import {isEmpty} from '@/api/validate';
	export default {
		data () {
			return {
				dateRang: '',
				tableData: [],
				loading: true,
				currentPage: 1,
				//编辑
				editDialog: false,
				editMsgTypeValue: '',
				editMsgTypeList: [
					{
						text: '活动',
						value: 1
					},
					{
						text: '新闻',
						value: 2
					}
				],
				editTitle: '',
				editDateRang: '',
				editContent: ''
			}
		},
		created () {
//			查询所有消息
			let data = {
				
			};
			this.getMsgList(data);
		},
		methods: {
			//修改日期查询信息
			queryFunc () {
				//			查询所有消息
				let data = {
					
				};
				this.getMsgList(data);
			},
			//			查询所有消息
			getMsgList (dataParams) {
				this.$ajax(this, {
					url: '/getMsgList',
					data: dataParams
				},
				(result) => {
					this.tableData = result['list']
				});
			},
			//翻页
			handleCurrentChange (currentPage) {
				//			查询所有消息
				let data = {
					
				};
				this.getMsgList(data);
			},
			//编辑 填充
			editMsg (row) {
				this.editDialog = true;
				this.$ajax(this, {
					url: '/getMsgDetails',
					data: {
						msgId: row['msgId']
					}
				},
				(result) => {
					let res = result['data'];
					this.editTitle = res['msgTitle'];
					let arr= [];
					arr.push(res['msgStartDate']);
					arr.push(res['msgEndDate']);
					this.editDateRang = arr;
					this.editContent = res['msgContent'];
					this.editMsgTypeValue = res['msgType'];
				});
			},
			//编辑确定按钮
			editDialogOk () {
				if (isEmpty(this.editTitle)) {
					return this.$notify.error({
			          message: '请输入消息标题'
			        });
				}
				if (this.editDateRang && this.editDateRang.length !== 2) {
					return this.$notify.error({
			          message: '请输入选择有效时间'
			        });
				}
				if (isEmpty(this.editMsgTypeValue)) {
					return this.$notify.error({
			          message: '请选择消息类型'
			        });
				}
				if (isEmpty(this.editContent)) {
					return this.$notify.error({
			          message: '请输入消息内容'
			        });
				}
				this.$ajax(this, {
					url: '/updateMsg',
					data: {
						title: this.editTitle,
						type: this.editMsgTypeValue,
						startDate: this.editDateRang[0],
						endDate: this.editDateRang[1],
						content: this.editContent
					}
				},
				(result) => {
					this.editDialog = false;
					//			查询所有消息
					let data = {
						
					};
					this.getMsgList(data);
				});
			},
			//删除
			deleteMsg (row) {
				this.$ajax(this, {
					url: '/deleteMsg',
					data: {
						msgId: row['msgId']
					}
				},
				(result) => {
					this.$notify({
			          message: '禁用消息成功',
			          type: 'success'
			        });
			        //			查询所有消息
					let data = {
						
					};
					this.getMsgList(data);
				});
			}
		}
	}
</script>

<style type="text/css" rel='stylesheet'>
#messageManager .search .block{
	text-align: right;
	margin-bottom: 15px;
}
#messageManager .el-dialog__body .el-date-editor--daterange{
	width: 100%;
}
#messageManager .el-dialog__body textarea{
	width: 100%;
}
</style>