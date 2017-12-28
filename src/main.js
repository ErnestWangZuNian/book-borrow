// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/index'
import filter from './filter/index'
Vue.config.productionTip = false

/** 引入工具类函数 */
import tool from './utils/tool'
import api from './fetch/api'

/** 把一些公共方法或者属性注入到vue.prototype上面 */
const addVueInstanceMethod = {
  tool,
  api
}
Object.assign(Vue.prototype, addVueInstanceMethod)

//  ui组件
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import 'vue-ydui/dist/ydui.base.css';
import 'vue-ydui/dist/ydui.flexible.js';
Vue.use(YDUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  filter,
  template: '<App/>',
  components: { App }
})
