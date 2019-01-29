/**
 * Created by szatpig on 2017/12/26.
 */
import * as _ from '@/util/util'

const state ={
  connect: false,
  message: null
};

const getters={

};

const mutations={
  SOCKET_CONNECT(state,  status )  {
    console.log('socket connected');
    state.connect = true;
  },
  SOCKET_RESPONSE(state,  message) {
    state.message = message;
  },
  SOCKET_DISCONNECT(state){
    state.connect = false;
    console.log('socket disconnected');
  },
  SOCKET_RECONNECT_ATTEMPT(state){//失败了，进行重连中...
    //state.connect = false;
    console.log('socket reconnect_attempt');
  },
  SOCKET_RECONNECT(state){ //成功重连中
    //state.connect = false;
    console.log('socket reconnect');
  }
};

const actions={
  socket_response ({commit}, message) {
    commit('SOCKET_RESPONSE', message);
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
