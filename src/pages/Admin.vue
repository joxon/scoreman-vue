<template>
  <el-container>
    <el-aside width='100px'>
      <el-menu default-active="1" router="true">
        <el-menu-item index="/admin/students">学生管理</el-menu-item>
        <el-menu-item index="/admin/teachers">教师管理</el-menu-item>
        <el-menu-item index="/admin/courses">课程管理</el-menu-item>
        <el-menu-item index="/admin/userinfo">信息维护</el-menu-item>
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


<style>
</style>
