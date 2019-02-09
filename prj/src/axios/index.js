import Vue from 'vue'
import axios from 'axios'

// https://vuejs.org/v2/cookbook/adding-instance-properties.html#Real-World-Example-Replacing-Vue-Resource-with-Axios

axios.defaults.timeout = 5000
axios.defaults.withCredentials = true; // 让ajax携带cookie

// zdh: http://10.206.12.202:3000
// local: http://127.0.0.1:3000
axios.defaults.baseURL = "http://127.0.0.1:3000"

Vue.prototype.$http = axios
// Vue.prototype.$ajax = axios
// Vue.prototype.$axios = axios
