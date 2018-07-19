// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 路由插件
import VueRouter from 'vue-router'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
// 防止ie浏览器的不兼容性
import 'babel-polyfill'
import 'eventsource-polyfill'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/bootstrap/style/bootstrap.css'
import '@/assets/style/base.css'
import '@/assets/style/element-ui.css'

import '@/api/fetch'
import {store} from '@/api/store'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueLazyload)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
