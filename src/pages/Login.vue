<template>
  <el-row type="flex" justify="center">
    <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
      <el-form-item prop="name">
        <el-input placeholder="用户名" v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input placeholder="密码" v-model="user.pass" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button id="login-button" plain type="success" icon="el-icon-check" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.user.name === "admin" && this.user.pass === "123") {
            // dispatch采用Promise链式调用
            this.$store.dispatch("login", this.user).then(() => {
              this.$notify({
                type: "success",
                message: "欢迎你," + this.user.name + "!",
                duration: 1000
              });
              this.$router.replace("/student");
            });
          } else {
            this.$message({
              type: "error",
              message: "用户名或密码错误",
              showClose: true
            });
          }
        } else {
          return false;
        }
      });
    }
  },
  // https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function
  data() {
    return {
      user: {},
      rules: {
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  }
};
</script>

<style>
#login-button {
  width: 100%;
}
</style>
