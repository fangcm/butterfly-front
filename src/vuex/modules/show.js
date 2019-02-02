import {APP_TITLE} from '../types';

const state = {
  title: "业务演示"
};

const getters = {
  title: state => state.title
};

const mutations = {
  [APP_TITLE](state, content) {
    state.title = content;
  }
};

const actions = {
  setTitle({commit}, content) {
    commit(APP_TITLE, content)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
