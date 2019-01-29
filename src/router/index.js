import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

const Home = () => import(/* webpackChunkName: "group-home" */ '@/pages/home');

const Info = () => import(/* webpackChunkName: "group-company" */ '@/pages/companyInfo');
const User = () => import(/* webpackChunkName: "group-company" */ '@/pages/user');
const CreateTask = () => import(/* webpackChunkName: "group-company" */ '@/pages/createTask');
const TaskDetail = () => import(/* webpackChunkName: "group-company" */ '@/pages/companyTaskDetail');
const FeedBack = () => import(/* webpackChunkName: "group-company" */ '@/pages/companyFeedBack');

const Balance = () => import(/* webpackChunkName: "group-recharge" */ '@/pages/balance');
const RechargeRecord = () => import(/* webpackChunkName: "group-recharge" */ '@/pages/rechargeRecord');
const RechargeInfo = () => import(/* webpackChunkName: "group-recharge" */ '@/pages/rechargeInfo');

const Login = () => import(/* webpackChunkName: "group-user" */ '@/pages/login');
const Account = () => import(/* webpackChunkName: "group-user" */ '@/pages/companyAccount');
const Author = () => import(/* webpackChunkName: "group-user" */ '@/pages/author');

const Register = () => import(/* webpackChunkName: "group-user" */ '@/pages/register');
const FindPassword = () => import(/* webpackChunkName: "group-user" */ '@/pages/findPassword');
const Agreement = () => import(/* webpackChunkName: "group-user" */ '@/pages/agreement');


//Vue.use(Router);

const routes = [{
  path: '/:orgCode',
  meta: {
    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
  },
  name: 'Home',
  component: Home,
  children:[{
    path: 'info',
    name: 'Info',
    component: Info,
    meta:{
      title:'企业信息'
    }
  },{
    path:'success',
    redirect:'account',
    meta:{
      title:'支付成功'
    }
  },{
    path:'payfail',
    redirect:'account',
    meta:{
      title:'支付失败'
    }
  },{
    path: 'account',
    name: 'User',
    component: User,
    meta:{
      title:'个人中心'
    }
  },{
    path: 'task/:id',
    name: 'TaskDetail',
    component: TaskDetail,
    meta:{
      title:'任务详情'
    }
  },{
    path: 'create',
    name: 'CreateTask',
    component: CreateTask,
    meta:{
      title:'创建任务'
    }
  },{
    path: 'feedBack',
    name: 'FeedBack',
    component: FeedBack
  },{
    path: 'balance',
    name: 'balance',
    component: Balance,
    meta:{
      title:'我的余额'
    }
  },{
    path: 'rechargeRecord',
    name: 'rechargeRecord',
    component: RechargeRecord,
    meta:{
      title:'消费记录'
    }
  },{
    path: 'rechargeInfo',
    name: 'RechargeInfo',
    component: RechargeInfo,
    meta:{
      title:'充值'
    }
  },{
    path: 'useraccount',
    name: 'Account',
    component: Account
  }]
},{
  path: '/:orgCode/author',
  name: 'Author',
  component: Author,
  meta:{
    title:'授权登录'
  }
},{
  path: '/:orgCode/login',
  name: 'Login',
  component: Login,
  meta:{
    title:'用户登录'
  }
},{
  path: '/:orgCode/register',
  name: 'Register',
  component: Register,
  meta:{
    title:'用户注册'
  }
},{
  path: '/:orgCode/findpassword',
  name: 'FindPassword',
  component: FindPassword,
  meta:{
    title:'找回密码'
  }
},{
  path: '/:orgCode/agreement',
  name: 'Agreement',
  component: Agreement,
  meta:{
    title:'找回密码'
  }
},{
  path: '/',
  component: User,
  meta:{
    title:'个人中心',
    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
  }
}
];

const router = new Router({
  mode: 'history',
  routes
});

let ua = window.navigator.userAgent.toLowerCase();
router.beforeEach((to, from, next) => {
  if(to.params && to.params.orgCode){
    store.dispatch('userOrgCode',to.params.orgCode.toLowerCase());
  }
  if((from.name==="balance"||from.name==="TaskDetail"||from.name==="rechargeRecord")&&to.query.jumpUrl){
    if (!store.state.user.openId && to.path.indexOf('author') < 0 && ua.match(/MicroMessenger/i) == 'micromessenger') {
      next({
        path: '/' + to.params.orgCode + '/author',
        query: {redirect: to.path == '/'? '/'+ to.params.orgCode +'/account' : to.fullPath}
      });
    }else {
      if(!!!store.state.user.userToken){
        next({
          path: '/' + to.params.orgCode + '/login',
          query: { redirect: to.fullPath}
        });
      }else{
        next({
          path: '/'+to.params.orgCode +'/account',
        });
      }
    }
  }
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (!store.state.user.openId && to.path.indexOf('author') < 0 && ua.match(/MicroMessenger/i) == 'micromessenger') {
      next({
        path: '/' + to.params.orgCode + '/author',
        query: {redirect: to.path == '/'? '/'+ to.params.orgCode +'/account' : to.fullPath}
      });
    }else {
      if(!!!store.state.user.userToken){
        next({
          path: '/' + to.params.orgCode + '/login',
          query: { redirect: to.fullPath}
        });
      }else{
        next();
      }
    }
  }else {
    if( to.path.indexOf('author') < 0 && ua.match(/MicroMessenger/i) == 'micromessenger'){
      if (!store.state.user.openId) {
        next({
          path:'/' + to.params.orgCode + '/author',
          query: {redirect: to.path == '/'? '/'+ to.params.orgCode +'/account' : to.fullPath }
        });
      }else {
        next();
      }
    }else{
      next();
    }
  }
});

router.afterEach((to,from) => {
  document.title = to.meta.title + '- 助销帮';
});

export default router
