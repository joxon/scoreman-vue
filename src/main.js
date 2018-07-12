import Vue from 'vue'
import store from './store'
import router from './router'
import axios from './axios'
import './element'
import App from './App.vue'

const app = new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

