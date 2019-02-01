import {USER_INFO, USER_TOKEN, USER_LOGIN_OUT} from '../types';

const state = {
  userInfo: sessionStorage.getItem('userInfo') || {},
  userToken: sessionStorage.getItem('userToken') || null
};

const getters = {
  userToken: state => state.userToken
};


const mutations = {
  [USER_INFO](state, res) {
    state.userInfo = res;
  },
  [USER_TOKEN](state, token) {
    state.userToken = token;
  },
  [USER_LOGIN_OUT](state) {
    state.userToken = null;
    state.userInfo = [];
  }
};

const actions = {
  //保存用户信息
  setUserInfo({commit}, user) {
    sessionStorage.setItem('userInfo', user);
    commit(USER_INFO, user);
  },

  //保存用户token
  setUserToken({commit}, token) {
    sessionStorage.setItem('userToken', token);
    commit(USER_TOKEN, token)
  },

  //用户退出
  loginOut({commit}) {
    sessionStorage.setItem('userToken', null);
    commit(USER_LOGIN_OUT)
  }
};


export default {
  state,
  getters,
  mutations,
  actions
}


