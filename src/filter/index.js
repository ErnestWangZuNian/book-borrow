/*
 * @Author: wangzunian 
 * @Date: 2017-04-10 15:58:05 
 * @Last Modified by: wangzunian
 * @Last Modified time: 2018-01-12 15:56:07
 */
import Vue from 'vue'

/**  金额过万处理 */
Vue.filter('amount', (value) => {
  value = Math.floor(value / 10000)
  return value
})

/**  金额利率处理，保留两位小数 */
Vue.filter('interesRate', (value) => {
  value = '￥' + (value  / 100).toFixed(2)
  return value
})

/**  金额千分位处理 */
Vue.filter('toThousands', (value) => {
  value = (value * 100 / 100).toFixed(2)
  return (value || 0).toString().replace(/(\d)(?=(\d{3})+\.)|(\d)(?=(?:\d{3})+$)/g, '$1,')
})

export default Vue.filter

