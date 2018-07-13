<template>
  <el-container>
    <el-aside width='100px'>
      <el-menu default-active="1">
        <el-menu-item index="1">学生管理</el-menu-item>
        <el-menu-item index="2">教师管理</el-menu-item>
        <el-menu-item index="3">成绩管理</el-menu-item>
        <el-menu-item index="4">信息管理</el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>
        欢迎您，{{ user.username }}，请在左侧选择相应的面板
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


<style>
</style>
