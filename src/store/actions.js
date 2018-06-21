import * as types from './mutation-types'
import {popupDelay} from '@/assets/js/config'
import {saveToken, saveUserInfo} from '@/assets/js/cache'

export function setToken ({commit}, token) {
  commit(types.SET_TOKEN, token)
  saveToken(token)
}

export function setUserInfo ({commit}, userInfo) {
  commit(types.SET_USER_INFO, userInfo)
  saveUserInfo(userInfo)
}

export function hidePopup ({commit}) {
  commit(types.SET_POPUP_CONTENT, {})
  commit(types.SET_POPUP_VISIBLE, false)
}

export function showPopup ({commit}, msg, type = 'error') {
  commit(types.SET_POPUP_CONTENT, {msg: msg, type: type})
  commit(types.SET_POPUP_VISIBLE, true)
  setTimeout(() => {
    commit(types.SET_POPUP_CONTENT, {})
    commit(types.SET_POPUP_VISIBLE, false)
  }, popupDelay)
}
