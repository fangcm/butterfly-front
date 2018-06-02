import Vue from 'vue'
import Router from 'vue-router'
import blank from '@/views/common/blank.vue'
import login from '@/views/login/login.vue'
import home from '@/views/demo/Home.vue'
import newsDetail from '@/views/demo/NewsDetail.vue'
import mySettings from '@/views/demo/MySettings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: blank,
      children: [{
        path: '',
        name: 'login',
        component: login,
        meta: {
          title: '登录页面'
        }
      }]
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/newsDetail',
      name: 'newsDetail',
      component: newsDetail
    },
    {
      path: '/mySettings',
      name: 'mySettings',
      component: mySettings
    }
  ]
})
