import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

const Home = () => import(/* webpackChunkName: "group-home" */ '@/pages/home');
const Login = () => import(/* webpackChunkName: "group-login" */ '@/pages/login');
const Index = () => import(/* webpackChunkName: "group-index" */ '@/pages/index');

const AdminUser = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/adminUser');
const AdminRole = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/adminRole');
const AdminMenu = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/adminMenu');

Vue.use(Router);

const routes = [{
  path: '/home',
  name: 'Home',
  meta: {
    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
  },
  component: Home,
  children: [{
    path: 'index',
    component: Index,
    name: 'Index',
    meta: {
      title: '首页'
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
