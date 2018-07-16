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

import Student from '@/pages/Student.vue'
import StudentScore from '@/pages/StudentScore.vue'
import StudentInfo from '@/pages/StudentInfo.vue'

import Teacher from '@/pages/Teacher.vue'
import TeacherCourseManage from '@/pages/TeacherCourseManage.vue'
import TeacherStuManage from '@/pages/TeacherStuManage.vue'
import TeacherInfo from '@/pages/TeacherInfo.vue'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/login'
  },

    {
      path: '/login',
      component: Login
    },

    {
      path: '/student',
      component: Student,
      redirect: '/student/score',
      children: [{
        path: 'score',
        component: StudentScore
      },
        {
          path: 'PasswordEdit',
          component: PasswordEdit
        },
        {
          path: 'info',
          component: StudentInfo
        }
      ]
    },

    {
      path: '/teacher',
      component: Teacher,
      redirect: '/teacher/CourseManage',
      children: [{
        path: 'CourseManage',
        component: TeacherCourseManage
      },
        {
          path: 'StuManage',
          component: TeacherStuManage
        },
        {
          path: 'info',
          component: TeacherInfo
        },
        {
          path: 'PasswordEdit',
          component: PasswordEdit
        }
      ]
    },

    {
      path: '/admin',
      component: Admin,
      redirect: '/admin/students',
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
