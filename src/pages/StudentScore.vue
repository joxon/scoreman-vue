<template>
  <el-container direction='vertical'>
    <!--el-button @click="getScore">111</el-button-->
    <el-table :data="tableData" stripe>
      <el-table-column prop="cID" label="课程号" width="150"/>
      <el-table-column prop="cName" label="课程名" width="200"/>
      <el-table-column prop="grade" label="成绩" width="200"/>
    </el-table>
  </el-container>
</template>

<script>
  export default {
    name: "StudentScore",
    created: function () {
      this.getScore();
    },
    methods: {
      getScore() {
        console.log(this.$store.state.user.username);
        this.$http.post("/stu/take",this.info)
          .then(res => {
            console.log(res);
          this.tableData = res.data;
        });
      },
    },
    data() {
      return {
        info:{
          sID:this.$store.state.user.username
        },
        tableData: [{
          cID: "加载中",
          cName: "加载中",
          grade: "加载中"
        }
        ]
      };
    }
  }
</script>


