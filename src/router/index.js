import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/Index'
import CategoryList from '@/components/pages/CategoryList'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Mine from '@/components/pages/Mine'
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
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user/mine',
      name: 'Mine',
      component: Mine
    },
  ]
})
