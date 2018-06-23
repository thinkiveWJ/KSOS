<template>
	<div id="orderManager">
		<div class="search">
			 <div class="block">
			 	<el-row>
				  <el-col :span="8" :push="16">
			  		<el-input placeholder="请输入内容" v-model='searchVal' size="medium">
					    <i @click="searchFunc" slot="suffix" class="el-input__icon el-icon-search"></i>
					</el-input>
				  </el-col>
				</el-row>
			    <!--<span class="demonstration"></span>-->
			    <!--<el-date-picker
			      v-model="dateRang"
			      type="daterange"
			      range-separator="-"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期" @change='queryFunc'>
			    </el-date-picker>-->
			 </div>
			<!--<el-row :gutter="20">
			  <el-col :span="8">
			  	<div class="desc clearfix">
			  		<div class="pull-left">总订单</div>
			  		<div class="pull-right" v-cloak>{{totalOrder}}（个）</div>
			  	</div>
			  </el-col>
			  <el-col :span="8">
			  	<div class="desc clearfix">
			  		<div class="pull-left">总金额</div>
			  		<div class="pull-right" v-cloak>{{totalMount}}（元）</div>
			  	</div>
			  </el-col>
			  <el-col :span="8">
			  	<div class="desc clearfix">
			  		<div class="pull-left">总取消</div>
			  		<div class="pull-right" v-cloak>{{totalTimes}}（次）</div>
			  	</div>
			  </el-col>
			</el-row>-->
		</div>
		
		<!--<div id="container"></div>-->
		
		<el-table :data="tableData" style="width: 100%" :stripe="true" :border="true" 
			v-loading="loading"
			element-loading-text="拼命加载中"
    		element-loading-spinner="el-icon-loading"
    		element-loading-background="rgba(0, 0, 0, 0.6)">
	    	<el-table-column prop="orderId" label="订单ID" align="center"></el-table-column>
		    <el-table-column prop="clientName" label="发货人" align="center"></el-table-column>
		    <el-table-column prop="carrierName" label="收件人" align="center"></el-table-column>
		    <el-table-column prop="status" label="状态" align="center"></el-table-column>
		    <el-table-column prop="" label="里程数" align="center"></el-table-column>
		    <el-table-column prop="createDate" label="订单时间" align="center"></el-table-column>
		    <el-table-column prop="expecteDate" label="预计到达时间" width="170" align="center"></el-table-column>
		    <el-table-column prop="" label="货物数量" align="center"></el-table-column>
		    <el-table-column prop="goodsType" label="货物类型" align="center"></el-table-column>
		    <el-table-column prop="goodsSize" label="货物尺寸" width="150" align="center"></el-table-column>
		    <el-table-column prop="goodsWeight" label="货物重量" align="center"></el-table-column>
		    <el-table-column prop="orderPrice" label="交易金额" align="center"></el-table-column>
		    <el-table-column label="操作" align="center" width="120">
		    	<template slot-scope="scope">
			        <span class="glyphicon glyphicon-edit btn" title="编辑"></span> 
			        <span v-if="scope.row.status === '待处理'" class="glyphicon glyphicon-trash btn" title="取消订单" @click="cancelFunc(scope.row)"></span>
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
	</div>
</template>

<script type="text/ecmascript-6">
//	import {getYYYYMMDD} from '@/api/common'
//	import Highcharts from 'highcharts/highstock';
//	import HighchartsMore from 'highcharts/highcharts-more';
//	import HighchartsDrilldown from 'highcharts/modules/drilldown';
//	import Highcharts3D from 'highcharts/highcharts-3d';
//	import Highmaps from 'highcharts/modules/map';
//	
//	HighchartsMore(Highcharts)
//	HighchartsDrilldown(Highcharts);
//	Highcharts3D(Highcharts);
//	Highmaps(Highcharts);
	export default {
		data () {
			return {
				searchVal: '',
				loading: true,
				
				//table列表数据
				tableData: [],
				//当前页
				currentPage: 1
			}
		},
		created () {
			let data2 = {
				pageNo: 1,
				sizePerPage: 20
			};
			this.getOrderList(data2);
		},
		methods: {
			//搜索获取订单列表
			searchFunc () {
				let data = {
					
				};
				this.getOrderList(data);
			},
			//获取订单列表
			getOrderList (dataParams) {
				this.$ajax(this, {
					url: '/FlightDeliveryServer/ordermanagement/getorderlist',
					data: dataParams
				},
				(result) => {
					this.tableData = result['list']
				});
			},
			//翻页
			handleCurrentChange (currentPage) {
				//查询订单所有列表
				let data = {
					
				};
				this.getOrderList(data);
			},
			//取消订单
			cancelFunc (row) {
				this.$ajax(this, {
					url: 'cancelOrder',
					data: {
						orderId: row['orderId']
					}
				},
				(result) => {
					this.$notify({
			          message: '订单取消成功',
			          type: 'success'
			        });
			        //查询订单所有列表
					let data2 = {
						
					};
					this.getOrderList(data2);
				});
			}
		}
	}
</script>

<style type="text/css" rel='stylesheet'>
#orderManager .search{
	margin-bottom: 15px;
}
#orderManager .search .desc{
	padding: 6px 12px;
	border: 2px solid #ccc;
	-webkit-border-radius: 5px;
	border-radius: 5px;
	font-size: 18px;
}
#orderManager .search .block{
	text-align: right;
	margin-bottom: 15px;
}
</style>