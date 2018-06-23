<template>
	<div id="advertManager">
		<div class="search">
			 <div class="block">
				<el-row>
				  <el-col :span="8" :push="16">
			  		<el-input placeholder="请输入内容" v-model='searchVal' size="medium">
					    <i @click="searchFunc" slot="suffix" class="el-input__icon el-icon-search"></i>
					</el-input>
				  </el-col>
				</el-row>
			</div>
		</div>
		
		<el-table :data="tableData" style="width: 100%" :stripe="true" :border="true" 
			v-loading="loading"
			element-loading-text="拼命加载中"
    		element-loading-spinner="el-icon-loading"
    		element-loading-background="rgba(0, 0, 0, 0.6)">
	    	<el-table-column prop="advertId" label="ID" align="center"></el-table-column>
		    <el-table-column prop="advertTitle" label="广告标题" align="center"></el-table-column>
		    <el-table-column prop="advertType" label="广告类型" align="center"></el-table-column>
		    <el-table-column prop="advertSize" label="广告尺寸" width="180" align="center"></el-table-column>
		    <el-table-column prop="advertDesc" label="广告描述" align="center"></el-table-column>
		    <el-table-column prop="advertDate" label="上传时间" align="center"></el-table-column>
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
		
		<!--编辑广告-->
		<el-dialog :visible.sync="editDialog" :center="true">
		  <dl class="audit">
		  	<div class="clearfix">
				<dt class="pull-left">版位名称：</dt>
				<dd class="pull-left"><el-input v-model.trim="editAdName" placeholder="请输入版位名称"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">版本类型：</dt>
				<dd class="pull-left">
					<el-select v-model="editAdTypeValue" placeholder="请选择">
					    <el-option
					      v-for="item in editAdTypeList"
					      :key="item.value"
					      :label="item.text"
					      :value="item.value">
					    </el-option>
					</el-select>
				</dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">版位尺寸（宽：px）：</dt>
				<dd class="pull-left"><el-input v-model="editAdWidth" type="number" placeholder="请输入版位尺寸的宽"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">版位尺寸（高：px）：</dt>
				<dd class="pull-left"><el-input v-model="editAdHeight" type="number" placeholder="请输入版位尺寸的高"></el-input></dd>
			</div>
			<div class="clearfix">
				<dt class="pull-left">版位描述：</dt>
				<dd class="pull-left"><el-input v-model.trim="editAdDesc" type="text" placeholder="请输入版位描述"></el-input></dd>
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
		  </dl>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="editDialog = false">取 消</el-button>
		    <el-button @click="editDialogOk">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				searchVal: '',
				loading: true,
				tableData: [],
				currentPage: 1,
				
				//编辑弹出框
				editDialog: false,
				editAdName: '',
				editAdTypeValue: '',
				editAdTypeList: [
					{
						text: '图片轮换广播',
						value: 1
					}
				],
				editAdWidth: '',
				editAdHeight: '',
				editAdDesc: ''
			}
		},
		created () {
			//查询广告列表
			let data = {
				
			};
			this.queryAdvert(data);
		},
		methods: {
			//搜索
			searchFunc () {
				//查询广告列表
				let data = {
					
				};
				this.queryAdvert(data);
			},
			//查询广告列表
			queryAdvert (dataParams) {
				this.$ajax(this, {
					url: '/getAdList',
					data: dataParams
				},
				(result) => {
					this.tableData = result['list'];
				});
			},
			//翻页
			handleCurrentChange (currentPage) {
				//查询广告列表
				let data = {
					
				};
				this.queryAdvert(data);
			},
			//编辑广告并填充数据
			editFunc (row) {
				this.editDialog = true;
				this.$ajax(this, {
					url: '/getAdDetails',
					data: {
						adId: row['advertId']
					}
				},
				(result) => {
					let res = result['data']
					this.editAdName = res['adName'];
					this.editAdTypeValue = res['adType'];
					this.editAdWidth = res['adWidth'];
					this.editAdHeight = res['adHeight'];
					this.editAdDesc = res['adDesc'];
				});
			},
			//点击编辑广告的ok
			editDialogOk () {
				this.$ajax(this, {
					url: '/updateAd',
					data: {
						name: this.editAdName,
						type: this.editAdTypeValue,
						width: this.editAdWidth,
						height: this.editAdHeight,
						desc: this.editAdDesc
					}
				},
				(result) => {
					this.editDialog = false;
					//查询广告列表
					let data = {
						
					};
					this.queryAdvert(data);
				});
			},
			//删除广告
			deleteFunc (row) {
				this.$ajax(this, {
					url: '/deleteAd',
					data: {
						adId: row['advertId']
					}
				},
				(result) => {
					this.$notify({
			          message: '删除广告成功',
			          type: 'success'
			        });
			        //查询广告列表
					let data = {};
					this.queryAdvert (data);
				});
			}
		}
	}
</script>

<style type="text/css" rel='stylesheet'>
#advertManager .search{
	margin-bottom: 15px;
}
#advertManager .search .block{
	text-align: right;
	margin-bottom: 15px;
}
#advertManager .el-upload.el-upload--text{
	width: 100%;
	position: relative;
}
#advertManager .el-upload.el-upload--text button{
	display: block;
	width: 100%;
}
#advertManager .el-upload.el-upload--text input[type='file']{
	display: none;
}
</style>