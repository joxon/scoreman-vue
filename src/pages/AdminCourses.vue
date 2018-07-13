<template>
  <el-table :data="tableData" stripe>
    <el-table-column prop="cid" label="课程号" width="70"/>
    <el-table-column prop="tid" label="教师号" width="70"/>
    <el-table-column prop="cname" label="课程名" width="100"/>
    <el-table-column prop="credit" label="学分" width="50"/>
    <el-table-column prop="semester" label="学期" />
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  methods: {
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
          cid: "C0001",
          tid: "T0001",
          cname: "数据库",
          credit: 2.0,
          semester: "春"
        },
        {
          cid: "C0002",
          tid: "T0002",
          cname: "系统结构",
          credit: 2.0,
          semester: "春"
        }
      ]
    };
  }
};
</script>
