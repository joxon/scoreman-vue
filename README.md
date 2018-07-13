# scoreman-vue

> student score manager

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 学生成绩管理系统
## 系统总体功能要求
设计一个学生成绩管理系统，提供学生查询成绩；教师查询、录入、修改成绩；管理员查询、录入、修改基本信息。

## 人员角色权限
学生：登陆系统，仅允许查看成绩和自己的基本信息
教师：登陆系统，查询成绩和个人基本信息、录入、修改成绩
管理员：登录系统，查询人员和课程的基本信息、录入、修改人员和课程的基本信息

## 主要功能模块
查询模块：负责学生查询自己的基本信息和成绩，教师查询成绩和个人基本信息，管理员查询基本信息情况
录入模块：以教师的角色登录，允许录入成绩；以管理员身份登录允许录入人员和课程信息；
修改模块：以教师的角色登录，允许修改成绩；以管理员身份登录允许修改人员和课程信息；
系统配置模块：密码修改和重置等
统计模块：统计各分数段学生的成绩分布， 画出直方图和饼图。

## 数据库表
学生 StudentInfo
教师 TeacherInfo
专业班级 ClassInfo
课程 CourseInfo
选课成绩表 StudentCourse

## 系统功能流图
A． 用户分为管理员、教师用户、学生用户三类。不论是管理员或教师用户，还是学生用户都需要通过用户名和口令进行登录，登录成功，根据3类用户的不同权限，提供的功能也不同。
B． 学生登陆成功，可以查询学生的基本信息和学生的成绩，如果查询学生的成绩，只得到该学生所有课程的成绩，不能查看其他同学的信息
C．教师登陆成功，可以查询教师的基本信息和所授课程的基本信息；可以查询所上课程所有学生的成绩；可以录入、修改和删除所上课程所有学生的信息
D．管理员登陆成功，可以查询、修改、删除人员和课程的基本信息


