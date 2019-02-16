import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

const Home = () => import(/* webpackChunkName: "group-home" */ '@/pages/Home');
const Login = () => import(/* webpackChunkName: "group-login" */ '@/pages/Login');
const Index = () => import(/* webpackChunkName: "group-index" */ '@/pages/Index');

const PackagingMachineryList = () => import(/* webpackChunkName: "group-machinery" */ '@/pages/machinery/PackagingList');
const PackagingMachineryForm = () => import(/* webpackChunkName: "group-machinery" */ '@/pages/machinery/PackagingForm');

const AdminUserList = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/AdminUserList');
const AdminRoleList = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/AdminRoleList');
const AdminMenuList = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/AdminMenuList');

Vue.use(Router);

const routes = [{
  path: '/app',
  name: 'Home',
  component: Home,
  meta: {
    requireAuth: true
  },
  children: [{
    path: 'index',
    name: 'Index',
    component: Index,
    meta: {
      title: '业务演示'
    }
  }, {
    path: 'packagingMachinerys',
    name: 'PackagingMachinerys',
    component: PackagingMachineryList,
    meta: {
      title: '打包机'
    }
  }, {
    path: 'newPackagingMachinery',
    name: 'NewPackagingMachinery',
    component: PackagingMachineryForm,
    meta: {
      title: '新增打包机'
    }
  }, {
    path: 'packagingMachinery/:id',
    name: 'PackagingMachinery',
    component: PackagingMachineryForm,
    meta: {
      title: '修改打包机'
    }
  }, {
    path: 'adminUsers',
    name: 'AdminUsers',
    component: AdminUserList,
    meta: {
      title: '用户管理'
    }
  }, {
    path: 'adminRoles',
    name: 'AdminRoles',
    component: AdminRoleList,
    meta: {
      title: '角色管理'
    }
  }, {
    path: 'adminMenus',
    name: 'AdminMenus',
    component: AdminMenuList,
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
