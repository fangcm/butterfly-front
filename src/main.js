// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import fastClick from 'fastclick'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

fastClick.attach(document.body);

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
