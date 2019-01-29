/**
 * Created by szatpig on 2018/2/9.
 */
import * as _ from '@/util/util'
import { LOADING_SHOW } from '../types';

const state = {
   loading:false
};

const getters ={
  loading: state => state.loading
};

const mutations = {
  [LOADING_SHOW](state,res){
    state.loading = res;
  }
};

const actions = {
  loadShow({ commit }, res){
    commit(LOADING_SHOW,res)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
