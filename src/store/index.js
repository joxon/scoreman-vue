import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 官方中文文档
// https://vuex.vuejs.org/zh/guide/

// 每一个 Vuex 应用的核心就是 store（仓库）
const store = new Vuex.Store({
  /* store基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。 */
  state: {
    user: undefined
  },
  // 修改全局变量必须通过mutations中的方法
  // mutations只能采用同步方法
  /* 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。 */
  mutations: {
    login(state, payload) {
      state.user = payload
    },
    logout(state) {
      state.user = undefined
    }
  },
  // 异步方法用actions
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
  actions: {
    login(context, payload) {
      context.commit('login', payload)
    },
    logout(context) {
      context.commit('logout')
    }
  }
})

export default store
