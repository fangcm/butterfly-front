import Vue from 'vue'
import Router from 'vue-router'

const User = () => import('@/views/user/user')
const Login = () => import('@/views/login')
const Home = () => import('@/views/home')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      alias: '/index.html'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    { // 登录
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})

export default router
