<template>
  <el-container>
    <el-header>
      <el-container direction='horizontal'>
        <h1>学生成绩管理系统</h1>
        <el-button id='logout-button' type="warning" v-if="logined" @click="logout()">注销</el-button>
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
      this.$confirm("确定注销？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("logout").then(() => {
          this.$router.replace("/login");
          this.$message({
            type: "success",
            message: "注销成功"
          });
        });
      });
    }
  },
  computed: {
    logined() {
      return this.$store.state.logined;
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
