/**
 * Created by szatpig on 2017/9/26.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import show from './modules/show'
import stastic from './modules/stastic'

Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    user,show,stastic
  }
})
