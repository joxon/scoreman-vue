<template>
  <el-row type="flex" justify="center">
    <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
      <el-form-item prop="username">
        <el-input placeholder="用户名" v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" v-model="user.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button id="login-button" plain type="success" icon="el-icon-check" @click="submitForm('loginForm')">登录</el-button>
        <el-button id="reset-button" plain type="danger" icon="el-icon-close" @click="resetForm('loginForm')">清空</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  methods: {
    submitForm(formName) {
      // 检验表单内容是否合法
      this.$refs[formName].validate(valid => {
        // 如果合法
        if (valid) {
          // 则发送登录请求
          console.log(this.user);
          this.$http
            .post("/login", this.user)
            .then(res => {
              // 处理响应
              console.log(res);
              if (res.data) {
                var usertype = res.data.usertype;
                if (usertype == "student") {
                  this.$store.dispatch("login", res.data).then(() => {
                    this.$message({
                      type: "success",
                      message: "欢迎你，学生用户！",
                      duration: 1000
                    });
                  });
                  this.$router.replace("/student");
                } else if (usertype == "teacher") {
                  this.$store.dispatch("login", res.data).then(() => {
                    this.$message({
                      type: "success",
                      message: "欢迎你，教师用户！",
                      duration: 1000
                    });
                  });
                  this.$router.replace("/teacher");
                } else if (usertype == "admin") {
                  this.$store.dispatch("login", res.data).then(() => {
                    this.$message({
                      type: "success",
                      message: "欢迎你，管理员！",
                      duration: 1000
                    });
                  });
                  this.$router.replace("/admin");
                } else {
                  this.$message({
                    type: "error",
                    message: "用户名或密码错误",
                    showClose: true
                  });
                }
              } else {
                this.$message({
                  type: "error",
                  message: "响应数据异常",
                  showClose: true
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "网络超时",
                showClose: true
              });
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
    // http://element-cn.eleme.io/#/zh-CN/component/form#form-methods
    // 箭头函数相当于匿名函数，并且简化了函数定义。箭头函数有两种格式，一种像上面的，只包含一个表达式，连{ ... }和return都省略掉了。还有一种可以包含多条语句，这时候就不能省略{ ... }和return
  },
  // https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function
  data() {
    return {
      user: {
        username:'',
        password:''
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
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
/* #login-button {
  width: 50%;
}
#reset-button {
  width: 50%;
} */
</style>
