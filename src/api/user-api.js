import {fetch} from '@/util/api'
import api from './api-config'

//用户登录
export const userLogin = (data) => fetch(api.baseUrl + 'login', {
  'params': data,
  'type': 'get'
});


export const userMenu = (data) => fetch(api.baseUrl + 'menu', {
  'params': data,
  'type': 'get'
});


// 用户列表
export const adminUserList = (data) => fetch(api.baseUrl + 'adminUserList', {
  'params': data,
  'type': 'get'
});
export const adminRoleList = (data) => fetch(api.baseUrl + 'adminRoleList', {
  'params': data,
  'type': 'get'
});
export const adminMenuList = (data) => fetch(api.baseUrl + 'menu', {
  'params': data,
  'type': 'get'
});
