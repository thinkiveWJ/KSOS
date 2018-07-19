<template>
	<div id="messageManagerAdd">
		<el-tabs v-model="activeName">
		    <el-tab-pane label="个人" name="person">
		    	<dl>
					<div class="clearfix">
						<dt>消息标题：</dt>
						<dd><el-input v-model.trim="pTitle" placeholder="请输入消息标题"></el-input></dd>
					</div>
					<div class="clearfix">
						<dt>消息类型：</dt>
						<dd>
							<el-select v-model="pType" placeholder="请选择" style="width:100%;">
							    <el-option
							      v-for="item in pTypeList"
							      :key="item.value"
							      :label="item.text"
							      :value="item.value">
							    </el-option>
							</el-select>
						</dd>
					</div>
					<div class="clearfix">
						<dt>接收对象：</dt>
						<dd><el-input v-model.trim="pObj" placeholder="请输入接收人"></el-input></dd>
					</div>
					<div class="clearfix">
						<dt>消息内容：</dt>
						<dd><textarea placeholder="请输入消息内容" v-model="pContent"></textarea></dd>
					</div>
				</dl>
		    </el-tab-pane>
		    <el-tab-pane label="群体" name="group">
		    	<dl>
					<div class="clearfix">
						<dt>消息标题：</dt>
						<dd><el-input v-model.trim="pTitle" placeholder="请输入消息标题"></el-input></dd>
					</div>
					<div class="clearfix">
						<dt>消息类型：</dt>
						<dd>
							<el-select v-model="gType" placeholder="请选择" style="width:100%;">
							    <el-option
							      v-for="item in gTypeList"
							      :key="item.value"
							      :label="item.text"
							      :value="item.value">
							    </el-option>
							</el-select>
						</dd>
					</div>
					<div class="clearfix">
						<dt>生效时间：</dt>
						<dd>
							<el-date-picker
						      v-model="gDateRang"
						      type="daterange"
						      range-separator="-"
						      value-format="yyyy-MM-dd"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期">
						    </el-date-picker>
						</dd>
					</div>
					<div class="clearfix">
						<dt>消息内容：</dt>
						<dd><textarea placeholder="请输入消息内容" v-model="pContent"></textarea></dd>
					</div>
				</dl>
		    </el-tab-pane>
		</el-tabs>
		<a class="btn-save" @click="addMsg">推送</a>
	</div>
</template>

<script type="text/ecmascript-6">
	import {isEmpty} from '@/api/validate'
	export default {
		data () {
			return {
				activeName: 'person',
				//个人信息
				pTitle: '',
				pType: '',
				pTypeList: [
					{
						text: '订单状态变化',
						value: 1
					},
					{
						text: '客服反馈信息',
						value: 2
					}
				],
				pObj: '',
				pContent: '',
				gType: '',
				gTypeList: [
					{
						text: '活动',
						value: 1
					},
					{
						text: '新闻',
						value: 2
					}
				],
				gDateRang: ''
			}
		},
		methods: {
			//点击推送
			addMsg () {
				if (isEmpty(this.pTitle)) {
					return this.$notify.error({
			          message: '请输入标题'
			        });
				}
				if (isEmpty(this.pContent)) {
					return this.$notify.error({
			          message: '请输入内容'
			        });
				}
				//判断是个人还是群体
				if (this.activeName === 'person') {
					if (isEmpty(this.pType)) {
						return this.$notify.error({
				          message: '请选择类型'
				        });
					}
					if (isEmpty(this.pObj)) {
						return this.$notify.error({
				          message: '请输入接收对象'
				        });
					}
					//推送个人消息
					this.pushPrivateMsg ();
				} else {
					if (isEmpty(this.gType)) {
						return this.$notify.error({
				          message: '请选择类型'
				        });
					}
					if (isEmpty(this.gDateRang)) {
						return this.$notify.error({
				          message: '请输入生效时间'
				        });
					}
					//推送群体消息
					this.pushPublicMsg ();
				}
			},
			//推送个人消息
			pushPrivateMsg () {
				this.$ajax(this, {
					url: '/FlightDeliveryServer/messagemanagement/pushprivatemsg',
					data: {
						title: this.pTitle,
						type: this.pType,
						target: this.pObj,
						content: this.pContent
					}
				},
				(result) => {
					//消息推送成功
					this.pushSuccess();
				});
			},
			//推送群体消息
			pushPublicMsg () {
				this.$ajax(this, {
					url: '/FlightDeliveryServer/messagemanagement/pushpublicmsg',
					data: {
						title: this.pTitle,
						type: this.gType,
						startDate: new Date(this.gDateRang[0]).getTime(),
						endDate: new Date(this.gDateRang[1]).getTime(),
						content: this.pContent
					}
				},
				(result) => {
					//消息推送成功
					this.pushSuccess();
				});
			},
			pushSuccess () {
				this.$notify({
			          message: '消息推送成功',
			          type: 'success'
			        });
//				this.activeName = 'person';
//				this.pTitle = '';
//				this.pType = 1;
//				this.pObj = '';
//				this.pContent = '';
//				this.gDateRang = '';
//				this.gType = '';
				this.$router.push({
					path: '/messageManager/query'
				});
			}
		}
	}
</script>

<style type="text/css" rel='stylesheet'>
#messageManagerAdd {
	width: 50%;
	margin: 0 auto;
	padding: 30px 0;
}
#messageManagerAdd dl dt{
	float: left;
	line-height: 40px;
	text-align: right;
	padding-right: 15px;
	width: 40%;
}
#messageManagerAdd dl dd{
	float: left;
	line-height: 40px;
	width: 60%;
}
#messageManagerAdd .clearfix + .clearfix{
	margin-top: 15px;
}
#messageManagerAdd .btn-save{
	display: block;
	background: #69c72b;
	padding: 6px 12px;
	color: #fff;
	-webkit-border-radius: 3px;
	border-radius: 3px;
	margin: 15px auto;
	width: 60%;
	text-align: center;
	cursor: pointer;
	margin-left: 40%;
}
#messageManagerAdd .btn-save:hover{
	background: #69c00b;
}
#messageManagerAdd textarea{
	width: 100%;
}
#messageManagerAdd .el-date-editor--daterange{
	width: 100%;
}
</style>