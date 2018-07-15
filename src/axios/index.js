import Vue from 'vue'
import axios from 'axios'

// https://vuejs.org/v2/cookbook/adding-instance-properties.html#Real-World-Example-Replacing-Vue-Resource-with-Axios

axios.defaults.timeout = 1000

// zdh: http://10.206.12.202:3000
axios.defaults.baseURL = "http://localhost:3000"

Vue.prototype.$http = axios
// Vue.prototype.$ajax = axios
// Vue.prototype.$axios = axios
