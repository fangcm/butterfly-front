import axios from 'axios'
import store from '../store'
import router from '../router'

axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://localhost:8080'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = store.state.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          // store.commit(types.LOGOUT)

          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' &&
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.path}
          })
      }
    }
    // console.log(JSON.stringify(error));
    // console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  }
)

export default axios
