import axios from './fetch'

/* 登录 */
export const login = data => axios.post('/api/Account/Authenticate', data)
