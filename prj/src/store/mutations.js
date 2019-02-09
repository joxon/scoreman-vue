import * as types from './mutations-types'

export default {
  [types.LOGIN](state, payload) {
    state.logined = true;
    state.user = payload;
  },
  [types.LOGOUT](state) {
    state.logined = false;
    state.user = undefined;
  }
}
