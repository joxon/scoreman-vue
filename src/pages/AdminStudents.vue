<template>
  <el-container direction='vertical'>
    <el-button-group>
      <el-button type='success' icon='el-icon-plus' @click="addOneStudent()">新增学生</el-button>
      <el-button type='danger' icon='el-icon-minus' @click="deleteSelections()">删除所选</el-button>
    </el-button-group>

    <el-table :data="tableData" stripe height="250">
      <el-table-column type="selection" width="40" />
      <el-table-column sortable prop="sid" label="学生号" width="90" />
      <el-table-column prop="sname" label="姓名" width="70" />
      <el-table-column prop="classno" label="班级" width="100" />
      <el-table-column prop="sex" label="性别" width="50" />
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
            sid: "S0001",
            sname: "王小虎",
            classno: "计科十班",
            sex: "男",
            password: "123"
          },
          {
            sid: "S0002",
            sname: "王小虎",
            classno: "计科十班",
            sex: "男",
            password: "123"
          },
          {
            sid: "S0003",
            sname: "王小虎",
            classno: "计科十班",
            sex: "男",
            password: "123"
          },
          {
            sid: "S0004",
            sname: "王小虎",
            classno: "计科十班",
            sex: "男",
            password: "123"
          },
          {
            sid: "S0005",
            sname: "王小虎",
            classno: "计科十班",
            sex: "男",
            password: "123"
          },
          {
            sid: "S0001",
            sname: "王小虎",
            classno: "计科十班",
            sex: "男",
            password: "123"
          },
          {
            sid: "S0002",
            sname: "王小虎",
            classno: "计科十班",
            sex: "男",
            password: "123"
          },
          {
            sid: "S0003",
            sname: "王小虎",
            classno: "计科十班",
            sex: "男",
            password: "123"
          }
        ]
      };
    }
  };

</script>
