/**
 * Created by szatpig on 2017/10/9.
 */
import * as _ from '@/util/util'
import { USER_INFO, USER_TOKEN, USER_LOGIN_OUT, USER_OPENID,USER_ORGCODE} from '../types';

const state={
    userInfo:JSON.parse(sessionStorage.getItem('userInfo')) || {},
    userToken:sessionStorage.getItem('userToken') || null,
    userAvatar:'',
    openId:sessionStorage.getItem('openId') || '',
    orgCode:sessionStorage.getItem('orgCode') || '',
};

const getters={

};


const mutations={
  [USER_INFO](state,res){
    state.userInfo=res;
    state.userAvatar=res.avatar;
  },
  [USER_TOKEN](state,token){
    state.userToken=token;
  },
  [USER_LOGIN_OUT](state){
    state.userToken=null;
    state.userInfo=[];
  },
  [USER_OPENID](state,openId){
    state.openId = openId;
  },
  [USER_ORGCODE](state,orgCode){
    state.orgCode = orgCode;
  }
};

const actions={
  //保存用户信息
  userInfo({ commit }, res) {
    sessionStorage.setItem('userInfo',JSON.stringify(res));
    commit(USER_INFO, res);
  },

  //保存用户token
  userToken({ commit }, token) {
    sessionStorage.setItem('userToken',token);
    commit(USER_TOKEN,token)
  },

  //用户退出
  userLoginOut({commit}){
    sessionStorage.setItem('userToken',null);
    commit(USER_LOGIN_OUT)
  },

  //保存用户openId
  userOpenId({commit},openId){
    sessionStorage.setItem('openId',openId);
    commit(USER_OPENID,openId);
  },
  //保存用户orgCode
  userOrgCode({commit},orgCode){
    sessionStorage.setItem('orgCode',orgCode);
    commit(USER_ORGCODE,orgCode);
  }
};



export default {
  state,
  getters,
  mutations,
  actions
}


