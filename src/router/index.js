import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import home from '@/views/home/index'
import setting from '@/views/setting/setting'
import myInfo from '@/views/setting/myInfo'
import changeInfo from '@/views/setting/changeInfo'
import changePhone from '@/views/setting/changePhone'
import changePassword from '@/views/setting/changePassword'
import about from '@/views/setting/about'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/login'
  }, { // 登录
    path: '/login',
    component: login
  }, { // 首页
    path: '/home',
    component: home
  }, { // 设置
    path: '/setting',
    component: setting,
    children: [{ // 我的资料
      path: '/',
      component: myInfo
    }, { // 我的资料
      path: 'myInfo',
      component: myInfo
    }, { // 修改资料
      path: 'changeInfo',
      component: changeInfo
    }, { // 修改手机
      path: 'changePhone',
      component: changePhone
    }, { // 更改密码
      path: 'changePassword',
      component: changePassword
    }, { // 关于
      path: 'about',
      component: about
    }]
  }]
});

//路由守卫
router.beforeEach((to, from, next) => {
  if (!localStorage.userToken) {
    if (to.path === "/login" || to.path === "/register") {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
