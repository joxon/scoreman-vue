import * as types from './mutations-types'

export default {
  [types.LOGIN](state, payload) {
    state.user = payload
  },
  [types.LOGOUT](state) {
    state.user = undefined
  }
}
