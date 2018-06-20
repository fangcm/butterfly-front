import * as types from './mutation-types'

const mutations = {

  [types.SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [types.SET_USER_INFO] (state, info) {
    state.userInfo = info
  }
}

export default mutations
