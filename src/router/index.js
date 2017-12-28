import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/Index'
import CategoryList from '@/components/pages/CategoryList'
import Login from '@/components/pages/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/category-list',
      name: 'CategoryList',
      component: CategoryList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]
})
