import axios from 'axios'
import store from '../store'
import router from '../router'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.timeout = 5000
// axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = store.state.token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  res => {
    return Promise.resolve(res.data)
  },
  err => {
    if (err.response) {
      if (err.response.status === 401) {
        store.state.token = ''
        router.replace({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath}
        })
      }
    }
    return Promise.reject(err)
  }
)

export default axios
