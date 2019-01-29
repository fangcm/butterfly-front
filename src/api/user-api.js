/**
 * Created by szatpig on 2018/1/22.
 */
import { fetch } from './../util/api'
import api from './api-config'


//用户登录
export const userLogin= (data)=> fetch(api.user+'/assenterprise/userinfo/password/login',{
  data
});

//用户注册
export const userRegist = (data)=> fetch(api.user+'/assenterprise/userinfo/register',{
  data
});

//用户修改密码
export const modifyPass= (data)=> fetch(api.user+'/assenterprise/userinfo/modify/payPass',{
  data
});

//发送验证码
export const sendSms= (data)=> fetch(api.user+'/assenterprise/userinfo/sendSms',{
  data,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
});

//获取用户信息
export const getUserInfo= (data,url)=> fetch(api.user + '/assenterprise/userinfo/userInfo',{
  data
});

//获取用户信息
export const balanceInfo= (data)=> fetch(api.user + '/assenterprise/fund/balance/info',{
  data,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});

//获取微信用户信息
export const getWxUserInfo = (data)=> fetch( api.wex + '/weixin/auth/getOpenId',{
  'params': data ,
  'type':'get'
});


export const getWxUser = (data)=> fetch( api.wex + '/weixin/user/getUserInfo',{
  'params': data ,
  'type':'get'
});


//获取微信用户信息
export const openidLogin = (data)=> fetch(api.user + '/assenterprise/userinfo/openid/login',{
  data,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
});


