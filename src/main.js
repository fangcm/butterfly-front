import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import fastClick from 'fastclick'
import infiniteScroll from 'vue-infinite-scroll'

import 'vuetify/dist/vuetify.min.css'
import VApp from 'vuetify/es5/components/VApp'
import VBtn from 'vuetify/es5/components/VBtn'
import VCard from 'vuetify/es5/components/VCard'
import VDivider from 'vuetify/es5/components/VDivider'
import VDialog from 'vuetify/es5/components/VDialog'
import VForm from 'vuetify/es5/components/VForm'
import VGrid from 'vuetify/es5/components/VGrid'
import VIcon from 'vuetify/es5/components/VIcon'
import VImg from 'vuetify/es5/components/VImg'
import VList from 'vuetify/es5/components/VList'
import VNavigationDrawer from 'vuetify/es5/components/VNavigationDrawer'
import VSubheader from 'vuetify/es5/components/VSubheader'
import VTextarea from 'vuetify/es5/components/VTextarea'
import VTextField from 'vuetify/es5/components/VTextField'
import VToolbar from 'vuetify/es5/components/VToolbar'
import VTooltip from 'vuetify/es5/components/VTooltip'
import VSwitch from 'vuetify/es5/components/VSwitch'
import VSpeedDial from 'vuetify/es5/components/VSpeedDial'
import VSlider from 'vuetify/es5/components/VSlider'
import Vuetify from 'vuetify/es5/components/Vuetify'

import VantToast from 'vant/lib/toast';
import 'vant/lib/toast/style';

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    fastClick.attach(document.body)
  }, false)
}

Vue.use(Vuetify, {
  // iconfont: 'mdi',
  components: {
    VDialog,
    VForm,
    VTextarea,
    VImg,
    VTextField,
    VSubheader,
    VDivider,
    VApp,
    VCard,
    VNavigationDrawer,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VTooltip,
    VSwitch,
    VSlider,
    VSpeedDial
  },
  theme: {
    "primary": "#2DC6C1",
    "secondary": "#424242",
    "accent": "#82B1FF",
    "error": "#FF5252",
    "info": "#2196F3",
    "success": "#13C56B",
    "warning": "#FFC107",
    "tabscolor": "#7F7F7F"
  }
});

Vue.use(infiniteScroll);

Vue.use(VantToast);
Vue.prototype.$toast = VantToast;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
