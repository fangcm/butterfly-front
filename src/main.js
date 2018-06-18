// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import '@/assets/style/common.styl'

FastClick.attach(document.body)
Vue.use(infiniteScroll)
Vue.use(VueLazyload, {
  error: require('./assets/image/loading.png'),
  loading: require('./assets/image/loading.png')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
