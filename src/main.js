/*
 * @Author: wangzunian 
 * @Date: 2017-04-07 11:45:04 
 * @Last Modified by: wangzunian
 * @Last Modified time: 2017-12-28 16:04:30
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/index'
import filter from './filter/filter'
import validate from './validate/validate'

/**  引入YDUI*/
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';

Vue.use(Vuex);
Vue.use(YDUI);

/** 引入工具类函数 */
import tool from './utils/tool'
import api from './fetch/api'

/**  vue项目配置 */
Vue.config.productionTip = false


/** 把一些公共方法或者属性注入到vue.prototype上面 */
const addVueInstanceMethod = {
  tool,
  api
}
Object.assign(Vue.prototype, addVueInstanceMethod)

/** 初始化入口函数 */
new Vue({
  el: '#app',
  router,
  store,
  filter,
  validate,
  template: '<App/>',
  components: {
    App
  }
})
