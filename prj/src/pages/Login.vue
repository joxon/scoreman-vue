<template>
  <el-row type='flex' justify='center'>
    <el-form class="Form" ref='loginForm' :model='loginFormModel' :rules='loginFormRules'>
      <h1 class="Form-title">登录</h1>
      <p class="Form-description">请验证身份</p>

      <div class="Form-fields">
        <label class="Control-label">用户名</label>
        <el-form-item prop='username'>
          <el-input class="ControlInput" clearable placeholder='请输入用户名' v-model='loginFormModel.username' @keyup.enter.native='submitForm("loginForm")'></el-input>
        </el-form-item>

        <label class="Control-label">密码</label>
        <el-form-item prop='password'>
          <el-input class="ControlInput" clearable placeholder='请输入密码' v-model='loginFormModel.password' type='password' @keyup.enter.native='submitForm("loginForm")'></el-input>
        </el-form-item>

        <el-form-item>
          <el-button id='login-button' type='success' icon='el-icon-check' @click='submitForm("loginForm")'>登录</el-button>
          <el-button id='reset-button' type='danger' icon='el-icon-close' @click='resetForm("loginForm")'>清空</el-button>
        </el-form-item>
      </div>

    </el-form>
  </el-row>
</template>

<script>
export default {
  // https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function
  data: function() {
    return {
      loginFormModel: {
        username: null,
        password: null
      },
      loginFormRules: {
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
  },
  // http://element-cn.eleme.io/#/zh-CN/component/form#form-methods
  // 箭头函数相当于匿名函数，并且简化了函数定义。箭头函数有两种格式，一种像上面的，只包含一个表达式，连{ ... }和return都省略掉了。还有一种可以包含多条语句，这时候就不能省略{ ... }和return
  methods: {
    submitForm(formName) {
      // 检验表单内容是否合法
      this.$refs[formName].validate(valid => {
        // 如果合法
        if (valid) {
          // 则发送登录请求
          this.$http
            .post("/login", this.loginFormModel)
            .then(res => {
              // 处理响应
              if (res.data) {
                var usertype = res.data.usertype;
                if (
                  usertype != "student" &&
                  usertype != "teacher" &&
                  usertype != "admin"
                ) {
                  this.$message({
                    type: "error",
                    message: "用户名或密码错误",
                    showClose: true
                  });
                  return;
                }

                var user = {
                  usertype: null,
                  username: null
                };
                user.usertype = res.data.usertype;
                user.username = this.loginFormModel.username;

                this.$store.dispatch("login", user).then(() => {
                  var msgOK = {
                    type: "success",
                    message: "欢迎您，",
                    duration: 1000,
                    center: true
                  };
                  if (usertype == "student") {
                    msgOK.message += "学生 " + user.username;
                    this.$message(msgOK);
                    this.$router.replace("/student");
                  } else if (usertype == "teacher") {
                    msgOK.message += "教师 " + user.username;
                    this.$message(msgOK);
                    this.$router.replace("/teacher");
                  } else if (usertype == "admin") {
                    msgOK.message += "管理员 " + user.username;
                    this.$message(msgOK);
                    this.$router.replace("/admin");
                  }
                });
              } else {
                this.$message({
                  type: "error",
                  message: "响应数据异常",
                  showClose: true,
                  center: true
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.$message({
                type: "error",
                message: "网络超时",
                showClose: true,
                center: true
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
  }
};
</script>

<style lang="scss" type="text/scss">
@import "./Login.scss";
#login-button {
  width: 70%;
}

</style>
