<template>
  <el-container direction='vertical'>
    <el-button-group>
      <el-button type='primary' icon='el-icon-refresh' @click="getData()">刷新</el-button>
      <el-button type='success' icon='el-icon-plus' @click="addOneCourse()">新增教师</el-button>
      <el-button type='danger' icon='el-icon-minus' @click="deleteSelections()">删除所选</el-button>
    </el-button-group>

    <el-table :data="tableData" stripe>
      <el-table-column type="selection" width="40" />
      <el-table-column prop="tID" label="教师号" width="70" />
      <el-table-column prop="tName" label="姓名" width="70" />
      <el-table-column prop="sex" label="性别" width="50" />
      <el-table-column prop="email" label="邮箱" width="150" />
      <el-table-column prop="password" label="密码" />
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
export default {
  created: function() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get("/admin/teacher").then(res => {
        this.tableData = res.data;
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },

  data() {
    return {
      tableData: [
        {
          tID: "加载中",
          tName: "加载中",
          email: "加载中",
          sex: "加载中",
          password: "加载中"
        }
      ]
    };
  }
};
</script>
