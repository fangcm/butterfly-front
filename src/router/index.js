import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import setting from '@/views/setting/setting'
import myInfo from '@/views/setting/myInfo'
import changeInfo from '@/views/setting/changeInfo'
import changePhone from '@/views/setting/changePhone'
import changePassword from '@/views/setting/changePassword'
import about from '@/views/setting/about'

import home from '@/views/setting/about'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/setting'
  }, {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录'
    }
  }, {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '首页'
    }
  }, {
    path: '/setting',
    name: 'setting',
    component: setting,
    meta: {
      title: '设置'
    }
  }, {
    path: 'myInfo',
    name: 'myInfo',
    component: myInfo,
    meta: {
      title: '我的资料'
    }
  }, {
    path: 'changeInfo',
    name: 'changeInfo',
    component: changeInfo,
    meta: {
      title: '修改资料'
    }
  }, {
    path: 'changePhone',
    name: 'changePhone',
    component: changePhone,
    meta: {
      title: '修改手机'
    }
  }, {
    path: 'changePassword',
    name: 'changePassword',
    component: changePassword,
    meta: {
      title: '更改密码'
    }
  }, {
    path: 'about',
    name: 'about',
    component: about,
    meta: {
      title: '关于'
    }
  }]
})
