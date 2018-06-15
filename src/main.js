// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import axios from 'axios'
import store from './store'

FastClick.attach(document.body)
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8080'
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('userToken');
    if (token) {
      // Bearer是JWT的认证头部信息
      config.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
