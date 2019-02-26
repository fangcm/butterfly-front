import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

const Home = () => import(/* webpackChunkName: "group-home" */ '@/pages/Home');
const Login = () => import(/* webpackChunkName: "group-login" */ '@/pages/Login');
const Index = () => import(/* webpackChunkName: "group-index" */ '@/pages/Index');

const MyPackingDataList = () => import(/* webpackChunkName: "group-packing" */ '@/pages/packing/MyPackingDataList');
const SubmitPackingData = () => import(/* webpackChunkName: "group-packing" */ '@/pages/packing/SubmitPackingData');
const AuditPackingDataList = () => import(/* webpackChunkName: "group-packing" */ '@/pages/packing/AuditPackingDataList');

const MyTransportRecord = () => import(/* webpackChunkName: "group-transport" */ '@/pages/transport/MyTransportRecord');
const SubmitTruckDepartData = () => import(/* webpackChunkName: "group-transport" */ '@/pages/transport/SubmitTruckDepartData');
const SubmitTruckEntryRegData = () => import(/* webpackChunkName: "group-transport" */ '@/pages/transport/SubmitTruckEntryRegData');

const MyMachineryList = () => import(/* webpackChunkName: "group-packing" */ '@/pages/machinery/MyMachineryList');
const PackagingMachineryList = () => import(/* webpackChunkName: "group-machinery" */ '@/pages/machinery/PackagingMachineryList');
const PackagingMachineryForm = () => import(/* webpackChunkName: "group-machinery" */ '@/pages/machinery/PackagingMachineryForm');

const AdminUserList = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/AdminUserList');
const AdminRoleList = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/AdminRoleList');
const AdminOrgList = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/AdminOrgList');
const AdminAddressList = () => import(/* webpackChunkName: "group-admin" */ '@/pages/admin/AdminAddressList');

Vue.use(Router);

const routes = [{
  path: '/packing',
  name: 'packing',
  component: Home,
  meta: {
    requireAuth: true
  },
  children: [{
    // 提交打包数据
    path: 'submitPackingData',
    name: 'submitPackingData',
    component: SubmitPackingData,
    meta: {
      title: '提交我的打包数据'
    }
  }, {
    // 我的打包机列表
    path: 'myMachinery',
    name: 'myMachinery',
    component: MyMachineryList,
    meta: {
      title: '我的打包机'
    }
  }, {
    // 我的打包作业列表
    path: 'myPackingData',
    name: 'myPackingData',
    component: MyPackingDataList,
    meta: {
      title: '我的打包数据'
    }
  }, {
    // 审核打包作业列表
    path: 'auditPackingData',
    name: 'auditPackingData',
    component: AuditPackingDataList,
    meta: {
      title: '作业审核'
    }
  }]
}, {
  path: '/transport',
  name: 'transport',
  component: Home,
  meta: {
    requireAuth: true
  },
  children: [{
    path: 'submitTruckDepartData',
    name: 'submitTruckDepartData',
    component: SubmitTruckDepartData,
    meta: {
      title: '提交货车出发数据'
    }
  }, {
    path: 'submitTruckEntryRegData',
    name: 'submitTruckEntryRegData',
    component: SubmitTruckEntryRegData,
    meta: {
      title: '提交货车入厂登记数据'
    }
  }, {
    path: 'myTransportRecord',
    name: 'myTransportRecord',
    component: MyTransportRecord,
    meta: {
      title: '我的运输记录'
    }
  }]
}, {
  path: '/machinery',
  name: 'machinery',
  component: Home,
  meta: {
    requireAuth: true
  },
  children: [{
    path: 'myMachinery',
    name: 'myMachinery',
    component: MyMachineryList,
    meta: {
      title: '我的打包机'
    }
  }, {
    path: 'packagingMachinery',
    name: 'packagingMachinery',
    component: PackagingMachineryList,
    meta: {
      title: '打包机'
    }
  }, {
    path: 'newPackagingMachinery',
    name: 'newPackagingMachinery',
    component: PackagingMachineryForm,
    meta: {
      title: '新增打包机'
    }
  }, {
    path: 'packagingMachinery/:id',
    name: 'packagingMachinery',
    component: PackagingMachineryForm,
    meta: {
      title: '修改打包机'
    }
  }]
}, {
  path: '/core',
  name: 'core',
  component: Home,
  meta: {
    requireAuth: true
  },
  children: [{
    path: 'users',
    name: 'users',
    component: AdminUserList,
    meta: {
      title: '用户管理'
    }
  }, {
    path: 'roles',
    name: 'roles',
    component: AdminRoleList,
    meta: {
      title: '角色管理'
    }
  }, {
    path: 'orgs',
    name: 'orgs',
    component: AdminOrgList,
    meta: {
      title: '机构管理'
    }
  }, {
    path: 'address',
    name: 'address',
    component: AdminAddressList,
    meta: {
      title: '作业区域管理'
    }
  }]
}, {
  path: '/app',
  name: 'app',
  component: Home,
  meta: {
    requireAuth: true
  },
  children: [{
    path: 'index',
    name: 'index',
    component: Index,
    meta: {
      title: '业务演示'
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
  name: 'login',
  component: Login
}
];

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
