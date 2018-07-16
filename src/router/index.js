import Vue from 'vue'
import Router from 'vue-router'

import UserInfo from '@/components/UserInfo.vue'

import Login from '@/pages/Login.vue'
import Page404 from '@/pages/404.vue'

import Admin from '@/pages/Admin.vue'
import AdminStudents from '@/pages/AdminStudents.vue'
import AdminTeachers from '@/pages/AdminTeachers.vue'
import AdminCourses from '@/pages/AdminCourses.vue'

import Student from '@/pages/Student.vue'
import StudentScore from '@/pages/StudentScore.vue'
import StudentInfo from '@/pages/StudentInfo.vue'

import Teacher from '@/pages/Teacher.vue'
import TeacherCourseManage from '@/pages/TeacherCourseManage.vue'
import TeacherStuManage from '@/pages/TeacherStuManage.vue'
import TeacherInfo from '@/pages/TeacherInfo.vue'

Vue.use(Router)

export default new Router({
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
          path: 'userinfo',
          component: UserInfo
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
          path: 'userinfo',
          component: UserInfo
        }
      ]
    },

    {
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
