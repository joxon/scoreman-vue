<template>
  <el-container>
    <el-aside width='100px'>
      <el-menu default-active="/student/score" router>
        <el-menu-item index="/student/score">成绩查询</el-menu-item>
        <el-menu-item index="/student/info">个人信息</el-menu-item>
        <el-menu-item index="/student/userinfo">修改密码</el-menu-item>
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

