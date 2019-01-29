import axios from 'axios'
import store from '../store'
// import * as types from '../store/mutation-types'
import router from '../router'
import {stringify} from 'qs'
import {Toast} from 'muse-ui';

axios.defaults.timeout = 10000;
axios.defaults.baseURL = ''; // http://localhost:8080'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = store.state.token
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          // store.commit(types.SET_TOKEN, '');

          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' &&
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.path}
          });
          break;
        case 403:
          break;
        case 504:
          break;
        case 500:
          Toast({
            message: '网络超时，请刷新重试'
          });
          break;
        case 404:
          Toast({
            message: '网络请求不存在',
            duration: 1500,
            forbidClick: true
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          Toast({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          });
      }
    }
    return Promise.reject(error.response.data);
  });


// 封装请求
export function fetch (url, options) {
  var opt = options || {};
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
      // 设置超时时间
      timeout: opt.timeout || 30000
    }).then(response => {
      if (response.data.code === 1) {
        resolve(response.data)
      } else {
        switch (response.data.code) {
          case -2401:
            Toast({
              message: '登录无效'
            });
            router.replace({
              path: '/' + store.state.user.orgCode + '/login',
              query: {redirect: router.currentRoute.fullPath, orgCode: sessionStorage.getItem('orgCode')}
            });
            reject(response.data);
            break;
          case -2408:
            Toast({
              message: response.data.msg || '登录无效'
            });
            router.replace({
              path: '/' + store.state.user.orgCode + '/login',
              query: {redirect: router.currentRoute.fullPath, orgCode: sessionStorage.getItem('orgCode')}
            });
            reject(response.data);
            break;
          case -2418:
            Toast({
              message: response.data.msg || '登录无效'
            });
            router.replace({
              path: '/' + store.state.user.orgCode + '/login',
              query: {redirect: router.currentRoute.fullPath, orgCode: sessionStorage.getItem('orgCode')}
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
            Toast({
              message: response.data.msg || '身份过期,请重新登入'
            });
            router.replace({
              path: '/' + store.state.user.orgCode + '/login',
              query: {redirect: router.currentRoute.fullPath, orgCode: sessionStorage.getItem('orgCode')}
            });
            reject(response.data);
            break;
          case -1:
            Toast({
              message: response.data.msg
            });
            reject(response.data);
            break;
          case 9999:
            Toast({
              message: response.data.msg || '什么都没有留下'
            });
            reject(response.data);
            break;
          default:
            Toast({
              message: response.data.msg || '程序员罢工了,哄哄她去'
            });
            reject(response.data);
        }
        // store.commit('SET_LOADING', false)
      }
    }).catch(error => {
      reject(error)
      // store.commit('SET_LOADING', false)
    })
  })
}

export default axios
