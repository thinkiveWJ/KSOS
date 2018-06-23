<template>
	<div id="orderManager">
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
			<el-row :gutter="20">
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
			</el-row>
		</div>
		
		<div id="container"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {getYYYYMMDD} from '@/api/common'
	import Highcharts from 'highcharts/highstock';
	import HighchartsMore from 'highcharts/highcharts-more';
	import HighchartsDrilldown from 'highcharts/modules/drilldown';
	import Highcharts3D from 'highcharts/highcharts-3d';
	import Highmaps from 'highcharts/modules/map';
	
	HighchartsMore(Highcharts)
	HighchartsDrilldown(Highcharts);
	Highcharts3D(Highcharts);
	Highmaps(Highcharts);
	export default {
		data () {
			return {
				//日期区间
				dateRang: '',
				
//				loading: true,
				//总数据
				totalOrder: 0,
				totalMount: 0,
				totalTimes: 0
				
			}
		},
		created () {
			///获取订单的整体统计信息
			let startDate = '';
			let endDate = '';
			if (this.dateRang) {
				
				startDate = getYYYYMMDD(this.dateRang[0]);
				endDate = getYYYYMMDD(this.dateRang[1]);
			}
			//获取订单的整体统计信息
			let data = {
				startDate,
				endDate
			};
			this.getOrderSummary(data);
		},
		mounted () {
			//展示折线图
			this.showHighCharts();
		},
		methods: {
			//根据时间段开始查询
			queryFunc () {
				let startDate = '';
				let endDate = '';
				if (this.dateRang) {
					
					startDate = getYYYYMMDD(this.dateRang[0]);
					endDate = getYYYYMMDD(this.dateRang[1]);
				}
				//获取订单的整体统计信息
				let data = {
					startDate,
					endDate
				};
				this.getOrderSummary(data);
				//展示折线图
				this.showHighCharts();
			},
			//展示折线图
			showHighCharts () {
				new Highcharts.chart('container', {
				    title: {
				        text: '2010 ~ 2016 年状态趋势图'
				    },
				    subtitle: {
				        text: ''
				    },
				    yAxis: {
				        title: {
				            text: '就业人数'
				        }
				    },
				    legend: {
				        layout: 'vertical',
				        align: 'right',
				        verticalAlign: 'middle'
				    },
				    plotOptions: {
				        series: {
				            label: {
				                connectorAllowed: false
				            },
				            pointStart: 2010
				        }
				    },
				    series: [{
				        name: '安装，实施人员',
				        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
				    }, {
				        name: '工人',
				        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
				    }, {
				        name: '销售',
				        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
				    }, {
				        name: '项目开发',
				        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
				    }, {
				        name: '其他',
				        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
				    }],
				    responsive: {
				        rules: [{
				            condition: {
				                maxWidth: 500
				            },
				            chartOptions: {
				                legend: {
				                    layout: 'horizontal',
				                    align: 'center',
				                    verticalAlign: 'bottom'
				                }
				            }
				        }]
				    }
				});

			},
			//获取订单的整体统计信息
			getOrderSummary (dataParams) {
				this.$ajax(this, {
					url: '/FlightDeliveryServer/ordermanagement/getordersummary',
					data: dataParams
				},
				(result) => {
					let total = result['data'];
					this.totalOrder = total['totalOrderNum'];
					this.totalMount = total['totalOrderPrice'];
					this.totalTimes = total['totalOrderNum'] - total['totalCompletedOrderNum'];
				});
			},
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