import 'muse-ui/dist/muse-ui.css'

import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import fastClick from 'fastclick'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    fastClick.attach(document.body)
  }, false)
}

Vue.use(MuseUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
