// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import router from './router'
import store from './vuex/store'
import 'es6-promise/auto';
//import MintUI from 'mint-ui'
import Wx from 'weixin-js-sdk'
import 'lib-flexible'
import './sass/app'
import {uploadClickStatistics, uploadLoadStatistics} from './util/statistics'
import App from './App'

//Vue.use(MintUI);
Vue.use(Wx);
Vue.prototype.uploadClickStatistics = uploadClickStatistics;
Vue.prototype.uploadLoadStatistics = uploadLoadStatistics;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
