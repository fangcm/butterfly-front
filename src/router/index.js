import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Header'
import Body from '@/components/Body'
import Footer from '@/components/Footer'
import LayoutRouter from '@/router/layout-router'
import AdminRouter from '@/router/router-admin'
// import FoodRouter from '@/router/router-food'

var childrenRouter = []
childrenRouter = childrenRouter.concat(AdminRouter)
// childrenRouter = childrenRouter.concat(FoodRouter)

var routersConfigure = [
  // 增加内容页主页面
  {
    path: '/',
    alias: '/index.html',
    components: {
      header: Header,
      body: Body,
      footer: Footer
    },
    children: childrenRouter
  }
]
// 增加其他页面
routersConfigure = routersConfigure.concat(LayoutRouter)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: routersConfigure
})

export default router
