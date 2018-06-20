import {
  loadToken,
  loadUserInfo
} from '@/assets/js/cache'

const state = {
  userInfo: {
    ...loadUserInfo()
  },
  token: loadToken()
}

export default () => state
