import {popupDelay} from '@/assets/js/config'
import {SHOW_POPUP_VISIBLE, SHOW_POPUP_CONTENT, USER_TOKEN} from '../types';

const state = {
  showPopupVisible: false,
  showPopupContent: {}
};

const getters = {
  showPopupVisible: state => state.showPopupVisible,
  showPopupContent: state => state.showPopupContent
};

const mutations = {
  [SHOW_POPUP_VISIBLE](state, visible) {
    state.showPopupVisible = Boolean(state.popupContent && visible);
  },
  [SHOW_POPUP_CONTENT](state, content) {
    state.showPopupContent = content
  }
};

const actions = {
  hidePopup({commit}) {
    commit(SHOW_POPUP_VISIBLE, false)
  },
  showPopup({commit}, msg, type = 'error') {
    commit(SHOW_POPUP_CONTENT, {msg: msg, type: type})
    commit(SHOW_POPUP_VISIBLE, true)
    setTimeout(() => {
      commit(SHOW_POPUP_CONTENT, {})
      commit(SHOW_POPUP_VISIBLE, false)
    }, popupDelay)
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
