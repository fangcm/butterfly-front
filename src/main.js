import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import fastClick from 'fastclick'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import infiniteScroll from 'vue-infinite-scroll'
import toast from "@/components/toast"

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    fastClick.attach(document.body)
  }, false)
}

Vue.use(Vuetify);
Vue.use(infiniteScroll)
Vue.use(toast, {
  x: 'center', y: 'top',
  color: 'info', icon: 'info',
  timeout: 5000,
  dismissable: true,
  autoHeight: false,
  multiLine: false,
  vertical: false,
  shorts: {
    custom: {
      color: 'purple'
    }
  },
  property: '$toast' // default
})

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
