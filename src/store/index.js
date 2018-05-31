/**
 * Created by apple on 2017/6/28.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'good-storage'

Vue.use(Vuex)

const state = {
  user: {},
  token: storage.get('token'),
  autoLogin: storage.get('autoLogin')
}

const actions = {}

const mutations = {
  // 设置用户
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    token = token ? 'Bearer ' + token : ''
    storage.set('token', token)
    state.token = token
  },
  setAutoLogin (state, autoLogin) {
    storage.set('autoLogin', autoLogin)
    state.autoLogin = autoLogin
  }
}

const getters = {
  getUser (state) {
    return state.user
  },
  getToken (state) {
    return state.token
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
