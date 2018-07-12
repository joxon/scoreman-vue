import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login.vue'
import Page404 from '@/pages/404.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/student',
  }, {
    path: '/teacher',
    children: [{
        path: 'courses'
      },
      {
        path: 'manage'
      }
    ]
  }, {
    path: '/admin',
    children: [{
        path: 'students'
      },
      {
        path: 'teachers'
      },
      {
        path: 'courses'
      }
    ]
  }, {
    path: '*',
    component: Page404
  }]
})
