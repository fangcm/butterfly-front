import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import zhHans from 'vuetify/lib/locale/zh-Hans'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: {zhHans},
    current: 'zhHans'
  }
});
