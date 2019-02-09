<template>
  <el-row type="flex" width="100px">
    <el-form label-width="80px">
      <div class="FormTeaInfoFields">
        <el-form-item label="证件号">
          <el-tag>{{info.tID}}</el-tag>
        </el-form-item>
        <el-form-item label="姓名">
          <el-tag>{{info.tName}}</el-tag>
        </el-form-item>
        <el-form-item label="性别">
          <el-tag>{{info.sex}}</el-tag>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-tag>{{info.email}}</el-tag>
        </el-form-item>
      </div>
    </el-form>
  </el-row>
</template>

<script>
export default {
  name: "TeacherInfo",

  data() {
    return {
      info: {
        tID: "加载中",
        tName: "加载中",
        sex: "加载中",
        email: "加载中"
      }
    };
  },

  name: "StudentScore",

  created: function() {
    this.getInfo();
  },

  methods: {
    getInfo() {
      console.log(this.$store.state.user.username);
      this.$http
        .get("/tea/mInfo?tID=" + this.$store.state.user.username)
        .then(res => {
          console.log(res);
          this.info = res.data;
        });
    }
  }
};
</script>

<style>
.FormTeaInfoFields {
  width: 300px;
  border-radius: 10px;
  border: 1px solid lightgray;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 24px 15px;
}
</style>
