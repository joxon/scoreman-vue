<template>
  <el-container>
    <el-aside width='100px'>
      <el-menu default-active="/admin/student" router>
        <el-menu-item index="/admin/student">学生管理</el-menu-item>
        <el-menu-item index="/admin/teacher">教师管理</el-menu-item>
        <el-menu-item index="/admin/course">课程管理</el-menu-item>
        <el-menu-item index="/admin/password">修改密码</el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>
        <router-view/>
    </el-main>
    
  </el-container>
</template>

<script>
export default {

};
</script>


<style>
</style>
