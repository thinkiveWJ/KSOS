<template>
	<div id="menus">
		<el-container style="height: 500px; border: 1px solid #eee">
		  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
		  	<div class="title text-center">国飞快捎运营系统</div>
		    <!--<el-menu
		      :default-active="menusActive"
		      class="el-menu-vertical-demo">
		      <el-submenu index="1">
		        <template slot="title">
		          <i class="el-icon-location"></i>
		          <span>导航一</span>
		        </template>
		        <el-menu-item-group>
		          <el-menu-item index="1-1">选项1</el-menu-item>
		          <el-menu-item index="1-2">选项2</el-menu-item>
		        </el-menu-item-group>
		      </el-submenu>
		    </el-menu>-->
		    <el-menu :default-openeds="openMenus" :default-active="menusActive" :unique-opened="true">
		      <el-submenu v-for="(item, index) in menus" :key="index" :index="index+''">
		        <template slot="title" v-cloak><span :class="item['icon']"></span> {{item['text']}}</template>
		        <el-menu-item-group v-if="item['children'] && item['children'].length > 0">
		          <el-menu-item v-for="(ite, ind) in item['children']" :key="ind" :index="index+'-'+ind">
		          	<router-link :to="ite['link']" v-cloak>{{ite['text']}}</router-link>
		          </el-menu-item>
		        </el-menu-item-group>
		      </el-submenu>
		    </el-menu>
		  </el-aside>
		  <el-container>
		    <el-header style="font-size: 12px" class="clearfix">
		    	<div class="pull-left" v-cloak>
		    		<span class="glyphicon glyphicon-menu-hamburger"></span> 您好，欢迎{{nickName}}
		    	</div>
		      <!--<el-dropdown>
		        <i class="el-icon-setting" style="margin-right: 15px"></i>
		        <el-dropdown-menu slot="dropdown">
		          <el-dropdown-item>查看</el-dropdown-item>
		          <el-dropdown-item>新增</el-dropdown-item>
		          <el-dropdown-item>删除</el-dropdown-item>
		        </el-dropdown-menu>
		      </el-dropdown>-->
		      <!--<span>王小虎</span>-->
		      <div class="pull-right">
	      		<a class="reset-password" @click="resetPassword"><span class="glyphicon glyphicon-lock"></span> 修改密码</a>
	      		<a class="logout" @click="logout"><span class="glyphicon glyphicon-log-out"></span> 退出系统</a>
		      </div>
		    </el-header>
		    
		    <el-main>
		      <!--<el-table :data="tableData">
		        <el-table-column prop="date" label="日期" width="140">
		        </el-table-column>
		        <el-table-column prop="name" label="姓名" width="120">
		        </el-table-column>
		        <el-table-column prop="address" label="地址">
		        </el-table-column>
		      </el-table>-->
		      <router-view/>
		    </el-main>
		  </el-container>
		</el-container>
	</div>
</template>
<script type="text/ecmascript-6">
	import { mapGetters } from 'vuex'
export default {
    data() {
      return {
      	menusActive: '0-0',
      	nickName: '',
      	currentPath: '/',
      	openMenus: [],
        menus: [
        	{
        		text: '用户管理',
        		icon: 'glyphicon glyphicon-user',
        		children: [
        			{
        				link: {
		        			path: '/userManager/query'
		        		},
		        		text: '用户管理'
        			},
        			{
        				link: {
		        			path: '/userManager/add'
		        		},
		        		text: '新增用户'
        			}
        		]
        	},
        	{
        		text: '订单管理',
        		icon: 'glyphicon glyphicon-shopping-cart',
        		children: [
        			{
        				link: {
		        			path: '/orderManager/queryH'
		        		},
		        		text: '订单管理图'
        			},
        			{
        				link: {
		        			path: '/orderManager/query'
		        		},
		        		text: '订单管理'
        			}
        		]
        	},
        	{
        		text: '广告管理',
        		icon: 'glyphicon glyphicon-tags',
        		children: [
        			{
        				link: {
        					path: '/advertManager/query'
        				},
        				text: '广告管理'
        			},
        			{
        				text: '新增广告',
        				link: {
        					path: '/advertManager/add'
        				}
        			}
        		]
        	},
        	{
        		text: '优惠券管理',
        		icon: 'glyphicon glyphicon-credit-card',
        		children: [
        			{
        				link: {
        					path: '/couponManager/query'
        				},
        				text: '优惠券管理'
        			},
        			{
        				link: {
        					path: '/couponManager/add'
        				},
        				text: '新增优惠券'
        			}
        		]
        	},
        	{
        		text: '消息管理',
        		icon: 'glyphicon glyphicon-envelope',
        		children: [
        			{
        				link: {
        					path: '/messageManager/query'
        				},
        				text: '消息管理'
        			},
        			{
        				link: {
        					path: '/messageManager/add'
        				},
        				text: '新增消息'
        			}
        		]
        	}
        ]
      }
    },
      computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
		...mapGetters([
	      'getNickName'
	    ])
	},
    created () {
    	//判断哪个子元素显示被选中
    	this.isActive();
    	//判断哪个父级菜单应该打开
    	this.openMenusFunc();
    	this.nickName = this.getNickName;
    },
    methods: {
    	//退出系统
    	logout () {
    		sessionStorage.clear();
    		this.$router.push({
    			path: '/'
    		});
    	},
    	//重置密码
    	resetPassword () {
    		this.$router.push({
    			path: '/resetPassword'
    		});
    	},
    	//刷新时候显示展开对应的父级菜单
    	openMenusFunc () {
    		if (this.currentPath.indexOf('/userManager/') > -1){
    			this.openMenus = ['0'];
    		} else if (this.currentPath.indexOf('/orderManager/') > -1) {
    			this.openMenus = ['1'];
    		}  else if (this.currentPath.indexOf('/advertManager/') > -1) {
    			this.openMenus = ['2'];
    		} else if (this.currentPath.indexOf('/couponManager/') > -1) {
    			this.openMenus = ['3'];
    		} else if (this.currentPath.indexOf('/messageManager/') > -1) {
    			this.openMenus = ['4'];
    		}
    	},
    	//判断哪个子元素显示被选中
    	isActive () {
    		let qPath = this.$route.path;
    		let menuArr = [];
    		for (let i = 0; i < this.menus.length; i ++) {
    			for (let j = 0; j< this.menus[i]['children'].length; j ++) {
    				if (qPath === this.menus[i]['children'][j]['link']['path']) {
    					this.menusActive = i + '-' + j;
    				}
    			}
    		}
    	}
    },
    watch: {
    	'$route': function() {
    		//判断哪个子元素显示被选中
    		this.isActive();
    		//判断哪个父级菜单应该打开
    		this.openMenusFunc();
    	}
    }
  };
</script>

<style>
#menus{
	width: 100%;
	height: 100%;
	overflow: hidden;
}
#menus .title{
	/*width: 199px;*/
	height: 60px;
	line-height: 60px;
	font-size: 18px;
	margin-bottom: 30px;
	background: #232a32;
	color: #fff;
}
#menus .el-header .pull-right{
	margin-right: 30px;
}
#menus .el-header .pull-right a{
	display: inline-block;
}
#menus .el-header .pull-right a + a{
	margin-left: 24px;
}
#menus .el-menu .glyphicon{
	top: -2px;
}
#menus .el-container.is-vertical{
	margin-left: 200px;
}
</style>