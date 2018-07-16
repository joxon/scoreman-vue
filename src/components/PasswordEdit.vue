<template>
  <el-row type='flex' width='100px'>

    <el-form ref='pwdForm' :model='pwdFormModel' label-width='80px'>
      <div class="FormPwdEditFields">
        <el-form-item label='类型'>
          <el-tag>{{ user.usertype }}</el-tag>
        </el-form-item>
        <el-form-item label='账号'>
          <el-tag>{{ user.username }}</el-tag>
        </el-form-item>
        <el-form-item label='旧密码' prop='pwdOld'>
          <el-input type='password' clearable placeholder='请输入旧密码' v-model='pwdFormModel.pwdOld'></el-input>
        </el-form-item>
        <el-form-item label='新密码' prop='pwdNew'>
          <el-input type='password' clearable placeholder='请输入新密码' v-model='pwdFormModel.pwdNew'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' @click='handleEditPassword()'>更新密码</el-button>
        </el-form-item>
      </div>
    </el-form>

  </el-row>
</template>

<script>
export default {
  data() {
    return {
      pwdFormModel: {
        pwdOld: null,
        pwdNew: null
      },
      pwdFormRules: {
        pwdOld: [
          {
            required: true,
            message: "旧密码不能为空",
            trigger: "blur"
          }
        ],
        pwdNew: [
          {
            required: true,
            message: "新密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  // https://cn.vuejs.org/v2/guide/computed.html
  // 计算属性
  // 我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
  //相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。
  // 我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。
  computed: {
    user() {
      var u = this.$store.state.user;
      if (u == undefined || u == null) {
        return {
          usertype: "",
          username: ""
        };
      } else {
        return u;
      }
    }
  },
  methods: {
    handleEditPassword() {
      this.$refs.pwdForm.validate(valid => {
        if (valid) {
          this.editPassword({
            username: this.$store.state.user.username,
            password_old: this.pwdFormModel.pwdOld,
            password_new: this.pwdFormModel.pwdNew
          });
        } else {
          return false;
        }
      });
    },

    editPassword(editPasswordMsg) {
      this.$http
        .put("/password", editPasswordMsg)
        .then(res => {
          if (res.data.restype == "success") {
            this.pwdFormModel = {
              pwdOld: null,
              pwdNew: null
            };
            this.$message({
              type: "success",
              message: "修改密码成功",
              showClose: true
            });
          } else {
            this.$message({
              type: "error",
              message: "修改密码失败",
              showClose: true
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "网络超时",
            showClose: true,
            center: true
          });
        });
    }
  }
};
</script>

<style>
.FormPwdEditFields {
  width: 300px;
  border-radius: 10px;
  border: 1px solid lightgray;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 24px 15px;
}
</style>
