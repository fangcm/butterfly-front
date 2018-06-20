import * as types from './mutation-types'

const mutations = {

  [types.SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [types.SET_USER_INFO] (state, info) {
    state.userInfo = info
  },
  [types.SET_POPUP_VISIBLE] (state, visible) {
    state.popupVisible = Boolean(state.popupContent && visible)
  },
  [types.SET_POPUP_CONTENT] (state, content) {
    state.popupContent = content
  }
}

export default mutations
