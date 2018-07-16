<template>
  <el-container>
    <el-aside width='100px'>
      <el-menu default-active="/teacher/CourseManage" router>
        <el-menu-item index="/teacher/CourseManage">成绩管理</el-menu-item>
        <el-menu-item index="/teacher/StuManage">学生管理</el-menu-item>
        <el-menu-item index="/teacher/info">个人信息</el-menu-item>
        <el-menu-item index="/teacher/PasswordEdit">修改密码</el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>
      <router-view/>
    </el-main>

  </el-container>
</template>

<script>
  export default {
    computed: {
      user() {
        return this.$store.state.user;
      }
    }
  };
</script>
