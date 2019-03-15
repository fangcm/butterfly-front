import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

const Home = () => import(/* webpackChunkName: "group-home" */ '@/pages/Home');
const Login = () => import(/* webpackChunkName: "group-home" */ '@/pages/Login');
const Index = () => import(/* webpackChunkName: "group-home" */ '@/pages/Index');

const SubmitPackingData = () => import(/* webpackChunkName: "group-packing" */ '@/pages/packing/SubmitPackingData');
const MyPackingDataList = () => import(/* webpackChunkName: "group-packing" */ '@/pages/packing/MyPackingDataList');
const AuditPackingDataList = () => import(/* webpackChunkName: "group-packing" */ '@/pages/packing/AuditPackingDataList');

const SubmitTruckDepartData = () => import(/* webpackChunkName: "group-transport" */ '@/pages/transport/SubmitTruckDepartData');
const SubmitTruckEntryRegData = () => import(/* webpackChunkName: "group-transport" */ '@/pages/transport/SubmitTruckEntryRegData');
const MyTransportRecord = () => import(/* webpackChunkName: "group-transport" */ '@/pages/transport/MyTransportRecord');

const PackagingMachineryList = () => import(/* webpackChunkName: "group-machinery" */ '@/pages/machinery/PackagingMachineryList');
const PackagingMachineryForm = () => import(/* webpackChunkName: "group-machinery" */ '@/pages/machinery/PackagingMachineryForm');
const TransportMachineryList = () => import(/* webpackChunkName: "group-machinery" */ '@/pages/machinery/TransportMachineryList');
const TransportMachineryForm = () => import(/* webpackChunkName: "group-machinery" */ '@/pages/machinery/TransportMachineryForm');
const MyPackingMachineryList = () => import(/* webpackChunkName: "group-machinery" */ '@/pages/machinery/MyPackingMachineryList');
const MyTransportMachineryList = () => import(/* webpackChunkName: "group-machinery" */ '@/pages/machinery/MyTransportMachineryList');

const Report1 = () => import(/* webpackChunkName: "group-report" */ '@/pages/report/Report1');

const UserList = () => import(/* webpackChunkName: "group-admin" */ '@/pages/user/UserList');
const UserForm = () => import(/* webpackChunkName: "group-admin" */ '@/pages/user/UserForm');

const MyInfo = () => import(/* webpackChunkName: "group-my" */ '@/pages/my/MyInfo');
const MySetting = () => import(/* webpackChunkName: "group-my" */ '@/pages/my/Setting');

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
    path: 'submitPackingData',
    name: 'submitPackingData',
    component: SubmitPackingData,
    meta: {
      title: '提交我的打包数据'
    }
  }, {
    path: 'myPackingData',
    name: 'myPackingData',
    component: MyPackingDataList,
    meta: {
      title: '我的打包作业数据'
    }
  }, {
    path: 'auditPackingData',
    name: 'auditPackingData',
    component: AuditPackingDataList,
    meta: {
      title: '打包作业审核'
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
  }, {
    path: 'transportMachinery',
    name: 'transportMachinery',
    component: TransportMachineryList,
    meta: {
      title: '运输车辆'
    }
  }, {
    path: 'newTransportMachinery',
    name: 'newTransportMachinery',
    component: TransportMachineryForm,
    meta: {
      title: '新增运输车辆'
    }
  }, {
    path: 'transportMachinery/:id',
    name: 'transportMachinery',
    component: TransportMachineryForm,
    meta: {
      title: '修改运输车辆'
    }
  }, {
    path: 'myPackingMachinery',
    name: 'myPackingMachinery',
    component: MyPackingMachineryList,
    meta: {
      title: '我的打包机'
    }
  }, {
    path: 'myTransportMachinery',
    name: 'myTransportMachinery',
    component: MyTransportMachineryList,
    meta: {
      title: '我的运输车辆'
    }
  }]
}, {
  path: '/report',
  name: 'report',
  component: Home,
  meta: {
    requireAuth: true
  },
  children: [{
    path: 'report1',
    name: 'report1',
    component: Report1,
    meta: {
      title: '报表'
    }
  }]
}, {
  path: '/user',
  name: 'user',
  component: Home,
  meta: {
    requireAuth: true
  },
  children: [{
    path: 'listUser/:roleCode',
    name: 'listUser',
    component: UserList,
    meta: {
      title: '人员管理'
    }
  }, {
    path: 'newUser',
    name: 'newUser',
    component: UserForm,
    meta: {
      title: '新增人员信息'
    }
  }, {
    path: 'editUser/:id',
    name: 'editUser',
    component: UserForm,
    meta: {
      title: '修改人员信息'
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
    path: 'user',
    name: 'user',
    component: AdminUserList,
    meta: {
      title: '用户管理'
    }
  }, {
    path: 'role',
    name: 'role',
    component: AdminRoleList,
    meta: {
      title: '角色管理'
    }
  }, {
    path: 'org',
    name: 'org',
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
  }, {
    path: 'setting',
    name: 'setting',
    component: MySetting,
    meta: {
      title: '设置'
    }
  }, {
    path: 'myInfo',
    name: 'myInfo',
    component: MyInfo,
    meta: {
      title: '我的信息'
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
