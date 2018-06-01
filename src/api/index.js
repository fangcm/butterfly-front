import axios from './fetch'

/* 登录 */
export const login = data => axios.post('/core/user/login', data)
