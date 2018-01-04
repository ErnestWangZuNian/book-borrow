import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/Index'
import CategoryList from '@/components/pages/CategoryList'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Mine from '@/components/pages/Mine'
import BorrowRecord from '@/components/pages/BorrowRecord'
import BuyBook from '@/components/pages/BuyBook'
import BuyBookRecord from '@/components/pages/BuyBookRecord'
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
      path: '/mine/borrow-record',
      name: 'BorrowRecord',
      component: BorrowRecord
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/buybook',
      name: 'BuyBook',
      component: BuyBook
    },
    {
      path: '/mine/buy-record',
      name: 'BuyBookRecord',
      component: BuyBookRecord
    },
    {
      path: '/user/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
  ]
})
