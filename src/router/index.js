import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

const Home = () => import(/* webpackChunkName: "group-home" */ '@/pages/Home');
const Login = () => import(/* webpackChunkName: "group-login" */ '@/pages/Login');
const Index = () => import(/* webpackChunkName: "group-index" */ '@/pages/Index');

const PackagingMachinery = () => import(/* webpackChunkName: "group-machinery" */ '@/pages/machinery/Packaging');

const AdminUser = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/AdminUser');
const AdminRole = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/AdminRole');
const AdminMenu = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/AdminMenu');

Vue.use(Router);

const routes = [{
  path: '/app',
  name: 'Home',
  meta: {
    requireAuth: true
  },
  component: Home,
  children: [{
    path: 'index',
    component: Index,
    name: 'Index',
    meta: {
      title: '业务演示'
    }
  }, {
    path: 'packagingMachinery',
    component: PackagingMachinery,
    name: 'PackagingMachinery',
    meta: {
      title: '打包机'
    }
  }, {
    path: 'adminUser',
    component: AdminUser,
    name: 'AdminUser',
    meta: {
      title: '用户管理'
    }
  }, {
    path: 'adminRole',
    component: AdminRole,
    name: 'AdminRole',
    meta: {
      title: '角色管理'
    }
  }, {
    path: 'adminMenu',
    component: AdminMenu,
    name: 'AdminMenu',
    meta: {
      title: '菜单管理'
    }
  }]
}, {
  path: '*',
  component: () => {
    router.push({
      path: '/login'
    })
  }
}, {
  path: '/',
  component: Login
}, {
  path: '/login',
  name: 'Login',
  component: Login
}];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.user.userToken) {
      next();
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      });
    }
  } else {
    next();
  }
});

export default router
