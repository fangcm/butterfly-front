import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import fastClick from 'fastclick'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    fastClick.attach(document.body)
  }, false)
}

Vue.use(Vuetify);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
