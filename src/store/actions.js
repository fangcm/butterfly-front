import * as types from './mutation-types'
import {saveToken, saveUserInfo} from '@/assets/js/cache'

export function setToken ({commit}, token) {
  commit(types.SET_TOKEN, token)
  saveToken(token)
}

export function setUserInfo ({commit}, userInfo) {
  commit(types.SET_USER_INFO, userInfo)
  saveUserInfo(userInfo)
}
