<template>
  <el-container direction='vertical'>
    <el-button-group>
      <el-button type='primary' icon='el-icon-refresh' @click="getData()">刷新</el-button>
      <el-button type='success' icon='el-icon-plus' @click="addOneCourse()">新增课程</el-button>
      <el-button type='danger' icon='el-icon-minus' @click="deleteSelections()">删除所选</el-button>
    </el-button-group>

    <el-table :data="tableData" stripe>
      <el-table-column type="selection" width="40" />
      <el-table-column prop="cID" label="课程号" width="70" />
      <el-table-column prop="tID" label="教师号" width="70" />
      <el-table-column prop="cName" label="课程名" width="150" />
      <el-table-column prop="credit" label="学分" width="50" />
      <el-table-column prop="semester" label="学期" />
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
      this.$http.get("/admin/course").then(res => {
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
          cID: "加载中",
          tID: "加载中",
          cName: "加载中",
          credit: "加载中",
          semester: "加载中"
        }
      ]
    };
  }
};
</script>
