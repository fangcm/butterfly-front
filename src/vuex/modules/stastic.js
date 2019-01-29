/**
 * Created by szatpig on 2018/2/12.
 */
import { uploadLoadStatistics, uploadClickStatistics } from '@/api/common-api'
import { UPLOAD, UPCLICK} from '../types';

const state = {
  uniqueCode: sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo')).uniqueCode || ''
};

const getters={

};

const mutations = {
   [UPLOAD](state,action){
     state.uniqueCode && uploadLoadStatistics({},state.uniqueCode,action);
   },
   [UPCLICK](state,action){
     state.uniqueCode && uploadClickStatistics({},state.uniqueCode,action);
   }
};

const actions ={
  upLoad({commit},action){
    commit(UPLOAD,action)
  },
  upClick({commit},action){
    commit(UPCLICK,action)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}

