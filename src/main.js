import Vue from 'vue'
import './plugins/cube-ui'
import './plugins/vuetify'
import App from './App'
import store from './vuex/store'
import router from './router'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
