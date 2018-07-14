<template>
  <el-row type='flex' justify='center'>
    <el-form ref='loginForm' :model='user' :rules='rules' status-icon>
      <el-form-item prop='username'>
        <el-input placeholder='用户名' v-model='user.username' @keyup.enter.native='submitForm("loginForm")'></el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input placeholder='密码' v-model='user.password' type='password' @keyup.enter.native='submitForm("loginForm")'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button id='login-button' type='success' icon='el-icon-check' @click='submitForm("loginForm")'>登录</el-button>
        <el-button id='reset-button' type='danger' icon='el-icon-close' @click='resetForm("loginForm")'>清空</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  // https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function
  data: function() {
    return {
      user: {
        username: null,
        password: null
      },
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
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
            .post('/login', this.user)
            .then(res => {
              // 处理响应
              if (res.data) {
                var usertype = res.data.usertype;
                if (
                  usertype != 'student' &&
                  usertype != 'teacher' &&
                  usertype != 'admin'
                ) {
                  var msgErr = {
                    type: 'error',
                    message: '用户名或密码错误',
                    showClose: true
                  };
                  this.$message(msgErr);
                  return;
                }

                this.user.usertype = res.data.usertype;
                this.$store.dispatch('login', this.user).then(() => {
                  var msgOK = {
                    type: 'success',
                    message: '欢迎您，',
                    duration: 1000
                  };
                  if (usertype == 'student') {
                    msgOK.message += '学生 ' + this.user.username;
                    this.$message(msgOK);
                    this.$router.replace('/student');
                  } else if (usertype == 'teacher') {
                    msgOK.message += '教师 ' + this.user.username;
                    this.$message(msgOK);
                    this.$router.replace('/teacher');
                  } else if (usertype == 'admin') {
                    msgOK.message += '管理员 ' + this.user.username;
                    this.$message(msgOK);
                    this.$router.replace('/admin');
                  }
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '响应数据异常',
                  showClose: true
                });
              }
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '网络超时',
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
