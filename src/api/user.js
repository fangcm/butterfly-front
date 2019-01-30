import {fetch} from '@/util/api'
import api from './api-config'

//用户登录
export const userLogin = (data) => fetch(api.baseUrl + 'core/user/login', {
  data
});
