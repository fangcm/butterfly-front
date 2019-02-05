import axios from 'axios'
import store from '@/vuex/store'
import router from '@/router/index'
import {stringify} from 'qs'
import {VAlert} from 'vuetify'

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = '';//'http://localhost:8080';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.user.userToken) {
      config.headers.authorization = store.state.user.userToken;
    }
    if (store.state.user.orgCode) {
      config.headers.orgCode = store.state.user.orgCode;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      //console.log(error.response);
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          //store.commit(types.LOGOUT);
          router.currentRoute.path !== '/login' &&
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.path}
          });
          break;
        case 403:
          break;
        case 504:
          break;
        case 500:
          //store.dispatch(types.AJAX_ERROR,500);
          VAlert.message('网络超时，请刷新重试');
          break;
        case 404:
          //store.dispatch(types.AJAX_ERROR,404);
          VAlert.message('网页丢失，请刷新重试');
          break;
        default:
          VAlert.message('程序员罢工了,哄哄Ta去');
      }
    }
    //console.log(JSON.stringify(error));/
    //console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  });

// 封装请求
export function fetch(url, options) {
  var opt = options || {}
  return new Promise((resolve, reject) => {
    axios({
      method: opt.type || 'post',
      url: url,
      params: opt.params || {},
      // 判断是否有自定义头部，以对参数进行序列化。不定义头部，默认对参数序列化为查询字符串。

      data: (opt.headers && opt.headers['Content-Type'].indexOf('x-www-form-urlencoded') > 0 ? stringify(opt.data) : opt.data) || {},
      responseType: opt.dataType || 'json',
      // 设置默认请求头
      headers: opt.headers || {'Content-Type': 'application/json; charset=UTF-8'},
      //设置超时时间
      timeout: opt.timeout || 30000
    }).then(response => {
      console.log(response.data);
      if (response.data.code === 0) {
        resolve(response.data)
      } else {
        switch (response.data.code) {
          case -2401:
            VAlert.warning('登录无效');
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.path}
            });
            reject(response.data);
            break;
          case -2408:
            VAlert.message(response.data.msg || '登录无效');
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.path}
            });
            reject(response.data);
            break;
          case -2418:
            VAlert.message(response.data.msg || '登录无效');
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.path}
            });
            reject(response.data);
            break;
          case -2510:
            break;
          case -2511:
            break;
          case -2410:
            router.replace({
              path: '/' + store.state.user.orgCode + '/login'
            });
            reject(response.data);
            break;
          case 0:
            VAlert.message(response.data.msg || '身份过期,请重新登入');
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.path}
            });
            reject(response.data);
            break;
          case -1:
            VAlert.message(response.data.msg);
            reject(response.data);
            break;
          case 9999:
            VAlert.message(response.data.msg || '什么都没有留下');
            reject(response.data);
            break;
          default:
            VAlert.warning(response.data.msg || '程序员罢工了,哄哄她去');
            reject(response.data);
        }
        //store.commit('SET_LOADING', false)
      }
    }).catch(error => {
      reject(error)
      //store.commit('SET_LOADING', false)
    })
  })
}

export default axios;
