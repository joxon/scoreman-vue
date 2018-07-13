import Vue from 'vue'
import Router from 'vue-router'

import UserInfo from '@/components/UserInfo.vue'

import Login from '@/pages/Login.vue'
import Page404 from '@/pages/404.vue'

import Admin from '@/pages/Admin.vue'
import AdminStudents from '@/pages/AdminStudents.vue'
import AdminTeachers from '@/pages/AdminTeachers.vue'
import AdminCourses from '@/pages/AdminCourses.vue'

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
    component: Admin,
    redirect: '/admin/students',
    children: [{
        path: 'students',
        component: AdminStudents
      },
      {
        path: 'teachers',
        component: AdminTeachers
      },
      {
        path: 'courses',
        component: AdminCourses
      },
      {
        path: 'userinfo',
        component: UserInfo
      }
    ]
  }, {
    path: '*',
    component: Page404
  }]
})
