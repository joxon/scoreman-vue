import * as types from './mutations-types'

export default {
  login({commit}, payload) {
    commit(types.LOGIN, payload)
  },
  logout({commit}) {
    commit(types.LOGOUT)
  }
}
