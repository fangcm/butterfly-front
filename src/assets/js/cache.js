import storage from 'good-storage'

window.storage = storage

const TOKEN_KEY = '__token__'
const USER_INFO_KEY = '__user_info__'

/*
function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
*/

// 检测用户上次登陆是否超过7天
export function loadToken () {
  return storage.get(TOKEN_KEY, '')
}

// 设置当前时间为上次登录时间
export function saveToken (token) {
  return storage.set(TOKEN_KEY, token)
}

// 载入保存的用户信息
export function loadUserInfo () {
  const emptyUserInfo = {
    username: '',
    nickname: '',
    mobile: ''
  }
  const initUserInfo = storage.get(USER_INFO_KEY, {})
  const userInfo = {
    ...emptyUserInfo,
    ...initUserInfo
  }
  return loadToken() ? userInfo : emptyUserInfo
}

// 保存用户信息
export function saveUserInfo (outUserInfo) {
  const initUserInfo = storage.get(USER_INFO_KEY, {})
  const userInfo = {
    ...initUserInfo,
    ...outUserInfo
  }
  return storage.set(USER_INFO_KEY, userInfo)
}
