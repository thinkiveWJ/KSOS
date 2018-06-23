import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
	  {
	  	path: '/',
	  	redirect: '/login'
	  },
	  {
	  	path: '/login',
	  	component: resolve => require(['@/components/login/login'], resolve)
	  },
	  {
	  	path: '/resetPassword',
	  	component: resolve => require(['@/components/login/resetPassword'], resolve)
	  },
	  {
	  	path: '/menus',
	  	component: resolve => require(['@/components/menus/menus'], resolve),
	  	redirect: '/userManager/query',
	  	children: [
	  		{
		      path: '/userManager/query',
		      component: resolve => require(['@/components/userManager/userManager'], resolve)
		    },
		    {
		    	path: '/userManager/add',
		      component: resolve => require(['@/components/userManager/userManagerAdd.vue'], resolve)
		    },
		    {
		    	path: '/orderManager/queryH',
		    	component: resolve => require(['@/components/orderManager/orderManagerH'], resolve)
		    },
		    {
		    	path: '/orderManager/query',
		    	component: resolve => require(['@/components/orderManager/orderManager'], resolve)
		    },
		    {
		    	path: '/couponManager/query',
		    	component: resolve => require(['@/components/couponManager/couponManager'], resolve)
		    },
		    {
		    	path: '/couponManager/add',
		    	component: resolve => require(['@/components/couponManager/couponManagerAdd'], resolve)
		    },
		    {
		    	path: '/advertManager/query',
		    	component: resolve => require(['@/components/advertManager/advertManager'], resolve)
		    },
		    {
		    	path: '/advertManager/add',
		    	component: resolve => require(['@/components/advertManager/advertManagerAdd'], resolve)
		    },
		    {
		    	path: '/messageManager/query',
		    	component: resolve => require(['@/components/messageManager/messageManager'], resolve)
		    },
		    {
		    	path: '/messageManager/add',
		    	component: resolve => require(['@/components/messageManager/messageManagerAdd'], resolve)
		    }
	  	]
	  },
//  {
//  	path: '*',
//  	redirect: '/'
//  }
  ]
})
