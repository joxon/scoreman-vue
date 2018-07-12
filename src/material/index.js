import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'red',
  warn: 'red',
  background: 'grey'
})
Vue.material.registerTheme('night', {
  primary: {
    color: 'blue-grey',
    hue: 900
  },
  accent: {
    color: 'grey',
    hue: 700
  },
  background: {
    color: 'blue-grey',
    hue: 800
  }
})
Vue.material.setCurrentTheme('night')