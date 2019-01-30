import {USER_INFO, USER_TOKEN, USER_LOGIN_OUT} from '../types';

const state = {
  userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {},
  userToken: sessionStorage.getItem('userToken') || null,
  userId: sessionStorage.getItem('userId') || '',
  userOrgId: sessionStorage.getItem('userOrgId') || '',
};

const getters = {
  userToken: state => state.userToken
};


const mutations = {
  [USER_INFO](state, res) {
    state.userInfo = res;
    state.userId = res.id;
    state.userOrgId = userOrgId;
  },
  [USER_TOKEN](state, token) {
    state.userToken = token;
  },
  [USER_LOGIN_OUT](state) {
    state.userToken = null;
    state.userInfo = [];
    state.userId = '';
  }
};

const actions = {
  //保存用户信息
  setUserInfo({commit}, res) {
    sessionStorage.setItem('userInfo', JSON.stringify(res));
    commit(USER_INFO, res);
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


