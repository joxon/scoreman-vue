import Vue from 'vue'
import store from './store'
import router from './router'
import './axios'
import './element'
import App from './App.vue'

var app = new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
})
