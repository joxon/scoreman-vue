<template>
  <el-row type="flex" width="100px">
    <el-form label-width="80px">
      <el-form-item label="证件号">
        <el-tag>{{tid}}</el-tag>
      </el-form-item>
      <el-form-item label="姓名">
        <el-tag>{{tname}}</el-tag>
      </el-form-item>
      <el-form-item label="性别">
        <el-tag>{{sex}}</el-tag>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-tag>{{email}}</el-tag>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
  export default {
    name: "TeacherInfo",
    data(){
      return{
        tid:'加载中',
        tname:'加载中',
        sex:'加载中',
        email:'加载中'
      }
    },
    name: "StudentScore",
    created: function () {
      this.getInfo();
    },
    methods: {
      getInfo() {
        console.log(this.$store.state.user.username);
        this.$http.post("/teacher",this.$store.state.user.username)
          .then(res => {
            this.data = res.data;
          });
      },
    },
  }
</script>

<style scoped>

</style>
