import {fetch} from './axios'
import api from './api-config'

//地区
export const addressList = (data) => fetch(api.baseUrl + 'core/address.json', {
  'params': data,
  'type': 'get'
});

//用户登录
export const userLogin = (data) => fetch(api.baseUrl + 'core/login.json', {
  'params': data,
  'type': 'get'
});


export const userMenu = (data) => fetch(api.baseUrl + 'core/menu.json', {
  'params': data,
  'type': 'get'
});


// 用户列表
export const adminUserList = (data) => fetch(api.baseUrl + 'core/adminUserList.json', {
  'params': data,
  'type': 'get'
});
export const adminRoleList = (data) => fetch(api.baseUrl + 'core/adminRoleList.json', {
  'params': data,
  'type': 'get'
});
export const adminMenuList = (data) => fetch(api.baseUrl + 'core/menu.json', {
  'params': data,
  'type': 'get'
});
