<template>
  <el-container direction='vertical'>
    <el-button-group>
      <el-button type='primary' icon='el-icon-refresh' @click='getStudents()'>刷新</el-button>
      <el-button type='success' icon='el-icon-plus' @click='showAddStuForm()'>新增学生</el-button>
      <el-button type='danger' icon='el-icon-minus' @click='deleteSelections()'>删除所选</el-button>
    </el-button-group>

    <el-dialog :title='stuFormTitle' :visible.sync='stuFormVisible'>
      <el-form ref='stuForm' :rules='rules' :model='stuFormModel'>
        <el-form-item prop='sID' label='学生号' :label-width='formLabelWidth'>
          <el-input :disabled="sIDInputDisabled" v-model='stuFormModel.sID' auto-complete='off'>
            <template slot="prepend">学生号开头默认加S</template>
          </el-input>
        </el-form-item>
        <el-form-item prop='sName' label='姓名' :label-width='formLabelWidth'>
          <el-input v-model='stuFormModel.sName' auto-complete='off'></el-input>
        </el-form-item>
        <el-form-item prop='classno' label='班级' :label-width='formLabelWidth'>
          <el-input v-model='stuFormModel.classno' auto-complete='on'></el-input>
        </el-form-item>
        <el-form-item prop='sex' label='性别' :label-width='formLabelWidth'>
          <el-select v-model='stuFormModel.sex' placeholder='请选择性别'>
            <el-option label='男' value='男'></el-option>
            <el-option label='女' value='女'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop='password' label='密码' :label-width='formLabelWidth'>
          <el-input v-model='stuFormModel.password' auto-complete='off' type='password'></el-input>
        </el-form-item>
      </el-form>
      <div slot='footer'>
        <el-button @click='hideStuForm()'>取消</el-button>
        <el-button v-if='addButtonVisible' type='primary' @click='handleAdd()'>确定添加</el-button>
        <el-button v-if='edtButtonVisible' type='primary' @click='handleEditFromForm()'>确定编辑</el-button>
      </div>
    </el-dialog>

    <el-table :data='stuTableData' stripe>
      <el-table-column type='selection' width='40' />
      <el-table-column sortable prop='sID' label='学生号' width='90' />
      <el-table-column prop='sName' label='姓名' width='70' />
      <el-table-column prop='classno' label='班级' width='100' />
      <el-table-column prop='sex' label='性别' width='50' />
      <el-table-column prop='password' label='密码' />
      <el-table-column fixed='right' label='操作' width='200'>
        <template slot-scope='scope'>
          <el-button icon='el-icon-edit' size='mini' @click='handleEditFromMenu(scope.$index, scope.row)'>编辑</el-button>
          <el-button icon='el-icon-delete' size='mini' type='danger' @click='handleDelete(scope.$index, scope.row)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-container>
</template>

<script>
export default {
  data() {
    return {
      stuTableData: [
        {
          sID: "加载中",
          sName: "加载中",
          classno: "加载中",
          sex: "加载中",
          password: "加载中"
        }
      ],
      rules: {
        sID: [
          {
            required: true,
            message: "学生号不能为空",
            trigger: "blur"
          }
        ],
        sName: [
          {
            required: true,
            message: "学生姓名不能为空",
            trigger: "blur"
          }
        ],
        classno: [
          {
            required: true,
            message: "班级不能为空",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "性别不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      },
      sIDInputDisabled: false,
      addButtonVisible: false,
      edtButtonVisible: false,
      stuFormVisible: false,
      stuFormTitle: "",
      stuFormModel: {
        sID: "",
        sName: "",
        classno: "",
        sex: "",
        password: ""
      },
      formLabelWidth: "80px"
    };
  },

  created: function() {
    this.getStudents();
  },

  methods: {
    hideStuForm() {
      this.stuFormVisible = false;
    },

    showAddStuForm() {
      this.stuFormTitle = "新增学生";
      this.sIDInputDisabled = false;
      this.addButtonVisible = true;
      this.edtButtonVisible = false;
      this.stuFormVisible = true;
    },

    showEdtStuForm() {
      this.stuFormTitle = "编辑学生";
      this.sIDInputDisabled = true;
      this.addButtonVisible = false;
      this.edtButtonVisible = true;
      this.stuFormVisible = true;
    },

    resetFormModel() {
      this.stuFormModel = {
        sID: "",
        sName: "",
        classno: "",
        sex: "",
        password: ""
      };
    },

    getStudents() {
      this.$http
        .get("/admin/student")
        .then(res => {
          this.stuTableData = res.data;
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "getStudents():网络超时",
            showClose: true,
            center: true
          });
        });
    },

    handleAdd() {
      this.$refs.stuForm.validate(valid => {
        if (valid) {
          var student = this.stuFormModel;
          student.sID = "S" + student.sID;
          this.addStudent(student);
        } else {
          return false;
        }
      });
    },

    addStudent(student) {
      this.hideStuForm();
      this.$http
        .post("/admin/student", student)
        .then(res => {
          if (res.data.restype == "success") {
            this.$message({
              type: "success",
              message: "添加学生成功",
              showClose: true,
              center: true
            });
            this.getStudents();
            this.resetFormModel();
          } else {
            this.$message({
              type: "error",
              message: "添加学生失败",
              showClose: true,
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "addStudent():网络超时",
            showClose: true,
            center: true
          });
        });
    },

    handleEditFromMenu(index, row) {
      this.stuFormModel = row;
      this.sIDInputDisabled = true;
      this.showEdtStuForm();
    },

    handleEditFromForm() {
      this.$refs.stuForm.validate(valid => {
        if (valid) {
          this.edtStudent(this.stuFormModel);
        } else {
          return false;
        }
      });
    },

    edtStudent(student) {
      this.hideStuForm();
      this.$http
        .put("/admin/student/" + student.sID, student)
        .then(res => {
          if (res.data.restype == "success") {
            this.$message({
              type: "success",
              message: "编辑学生成功",
              showClose: true,
              center: true
            });
            this.getStudents();
            this.resetFormModel();
          } else {
            this.$message({
              type: "error",
              message: "编辑学生失败",
              showClose: true,
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "edtStudent():网络超时",
            showClose: true,
            center: true
          });
        });
    },

    handleDelete(index, row) {
      this.$confirm("确定删除" + row.sID + "？", "警告", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delStudent(row.sID);
      });
    },

    delStudent(sID) {
      this.$http
        .delete("/admin/student/" + sID)
        .then(res => {
          if (res.data.restype == "success") {
            this.$message({
              type: "success",
              message: "删除学生成功",
              showClose: true,
              center: true
            });
            this.getStudents();
          } else {
            this.$message({
              type: "error",
              message: "删除学生失败",
              showClose: true,
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "delStudent():网络超时",
            showClose: true,
            center: true
          });
        });
    }
  }
};
</script>
