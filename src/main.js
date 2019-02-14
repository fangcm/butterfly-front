import Vue from 'vue'
import './plugins'
import App from './App'
import router from './router'
import store from './vuex/store'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
