<template>
  <el-container direction='vertical'>
    <el-button-group>
      <el-button type='success' icon='el-icon-plus' @click="addOneCourse()">新增课程</el-button>
      <el-button type='danger' icon='el-icon-minus' @click="deleteSelections()">删除所选</el-button>
    </el-button-group>

    <el-table :data="tableData" stripe>
      <el-table-column type="selection" width="40" />
      <el-table-column prop="cid" label="课程号" width="70" />
      <el-table-column prop="tid" label="教师号" width="70" />
      <el-table-column prop="cname" label="课程名" width="100" />
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
        tableData: [{
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
