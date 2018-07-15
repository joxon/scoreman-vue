import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import PasswordEdit from '@/components/PasswordEdit.vue'

import Login from '@/pages/Login.vue'
import Page404 from '@/pages/404.vue'

import Admin from '@/pages/Admin.vue'
import AdminStudents from '@/pages/AdminStudents.vue'
import AdminTeachers from '@/pages/AdminTeachers.vue'
import AdminCourses from '@/pages/AdminCourses.vue'
import {
  Store
} from '../../node_modules/vuex';

Vue.use(Router)

var router = new Router({
  mode: 'history',
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
    meta: {
      requireAdmin: true
    },
    redirect: '/admin/student',
    children: [{
        path: 'student',
        component: AdminStudents
      },
      {
        path: 'teacher',
        component: AdminTeachers
      },
      {
        path: 'course',
        component: AdminCourses
      },
      {
        path: 'password',
        component: PasswordEdit
      }
    ]
  }, {
    path: '*',
    component: Page404
  }]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAdmin)) {
    if (store.state.user.usertype == "admin") {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

export default router;
