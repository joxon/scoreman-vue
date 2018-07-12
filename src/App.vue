<template>
  <el-container>
    <el-header>
      <el-container direction='horizontal'>
        <h1>学生成绩管理系统</h1>
        <el-button id='logout-button' type="warning" v-if="logined()" @click="logout()">注销</el-button>
      </el-container>
    </el-header>
    <el-container>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <p>Copyright © 2018, @Joxon, @Awesomeyyy</p>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "App",
    methods: {
      logout() {
        this.$store.dispatch("logout").then(() => {
          this.$router.replace("/login");
        });
      },
      logined() {
        return this.$store.state.user;
      }
    }
  };

</script>

<style>
  .el-header {
    background-color: rgb(0, 174, 255);
    color: white;
  }

  #logout-button {
    margin: 10px;
    position: absolute;
    right: 10px;
  }

  .el-footer {
    background-color: rgb(230, 230, 230);
  }

</style>
