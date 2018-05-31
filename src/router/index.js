import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/apps/components/demo/HelloFromVux'
import demo from '@/apps/components/demo/demo'
import login from '@/apps/views/login'
import main from '@/apps/components/main'
import home from '@/apps/views/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        index: 0
      }
    },
    {
      path: '/main',
      component: main,
      meta: {
        index: 1
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: home,
          meta: {
            index: 1
          }
        },
        {
          path: '/demo',
          name: 'demo',
          component: demo,
          meta: {
            index: 2
          }
        }
      ]
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        index: 3
      }
    }
  ]
})
