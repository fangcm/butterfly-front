import {
  loadToken,
  loadUserInfo
} from '@/assets/js/cache'

const state = {
  // 用户信息
  userInfo: {
    ...loadUserInfo()
  },
  // 登录token
  token: loadToken(),
  // 顶部提示框
  popupVisible: false,
  // 顶部提示框内容
  popupContent: ''
}

export default () => state
