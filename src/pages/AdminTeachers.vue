          // tID: "加载中",
          // tName: "加载中",
          // email: "加载中",
          // sex: "加载中",
          // password: "加载中"
<template>
  <el-container direction='vertical'>
    <el-button-group>
      <el-button type='primary' icon='el-icon-refresh' @click='getTeachers()'>刷新表格</el-button>
      <el-button type='success' icon='el-icon-plus' @click='showAddTeaForm()'>新增教师</el-button>
      <el-button type='danger' icon='el-icon-minus' @click='handleDeleteSels()'>删除所选</el-button>
    </el-button-group>

    <el-dialog :title='teaFormTitle' :visible.sync='teaFormVisible'>
      <el-form ref='teaForm' :rules='teaFormRules' :model='teaFormModel' label-width="80px" status-icon>
        <el-form-item prop='tID' label='教师号' >
          <el-input :disabled="tIDInputDisabled" v-model='teaFormModel.tID'>
            <template slot="prepend">T</template>
          </el-input>
        </el-form-item>
        <el-form-item prop='tName' label='姓名' >
          <el-input v-model='teaFormModel.tName'></el-input>
        </el-form-item>
        <el-form-item prop='email' label='邮箱' >
          <el-input v-model='teaFormModel.email'></el-input>
        </el-form-item>
        <el-form-item prop='sex' label='性别' >
          <el-select v-model='teaFormModel.sex' placeholder='请选择性别'>
            <el-option label='男' value='男'></el-option>
            <el-option label='女' value='女'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop='password' label='密码' >
          <el-input v-model='teaFormModel.password' ></el-input>
        </el-form-item>
      </el-form>
      <div slot='footer'>
        <el-button v-if="rstButtonVisible" @click='resetTeaForm()'>清空</el-button>
        <el-button @click='hideTeaForm()'>取消</el-button>
        <el-button v-if='addButtonVisible' type='primary' @click='handleAdd()'>确定添加</el-button>
        <el-button v-if='edtButtonVisible' type='primary' @click='handleEditFromForm()'>确定编辑</el-button>
      </div>
    </el-dialog>

    <el-table :data='teaTableData' stripe max-height='500' @selection-change="handleSelectionChange">
      <el-table-column type='selection' width='40' />
      <el-table-column sortable prop='tID' label='教师号' width='90' />
      <el-table-column prop='tName' label='姓名' width='70' />
      <el-table-column prop='email' label='邮箱' width='100' />
      <el-table-column prop='sex' label='性别' width='50' />
      <el-table-column prop='password' label='密码' />
      <el-table-column fixed='right' label='操作' width='200'>
        <template slot-scope='scope'>
          <el-button icon='el-icon-edit' size='mini' @click='handleEditFromMenu(scope.$index, scope.row)'>编辑</el-button>
          <el-button icon='el-icon-delete' size='mini' type='danger' @click='handleDeleteFromMenu(scope.$index, scope.row)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-container>
</template>

<script>
export default {
  data() {
    return {
      selectedTeachers: [],
      teaTableData: [
        {
          tID: "加载中",
          tName: "加载中",
          email: "加载中",
          sex: "加载中",
          password: "加载中"
        }
      ],
      teaFormRules: {
        tID: [
          {
            required: true,
            message: "教师号不能为空",
            trigger: "blur"
          }
        ],
        tName: [
          {
            required: true,
            message: "教师姓名不能为空",
            trigger: "blur"
          }
        ],
        email: [
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
      tIDInputDisabled: false,
      rstButtonVisible: false,
      addButtonVisible: false,
      edtButtonVisible: false,
      teaFormVisible: false,
      teaFormTitle: "",
      teaFormModel: {
        tID: "",
        tName: "",
        email: "",
        sex: "",
        password: ""
      }
    };
  },

  created: function() {
    this.getTeachers();
  },

  methods: {
    resetTeaForm() {
      this.resetTeaFormModel();
      this.$refs.teaForm.resetFields();
    },

    hideTeaForm() {
      this.teaFormVisible = false;
    },

    showAddTeaForm() {
      this.teaFormTitle = "新增教师";
      this.tIDInputDisabled = false;
      this.rstButtonVisible = true;
      this.addButtonVisible = true;
      this.edtButtonVisible = false;
      this.teaFormVisible = true;
    },

    showEdtTeaForm() {
      this.teaFormTitle = "编辑教师";
      this.tIDInputDisabled = true;
      this.rstButtonVisible = false;
      this.addButtonVisible = false;
      this.edtButtonVisible = true;
      this.teaFormVisible = true;
    },

    resetTeaFormModel() {
      this.teaFormModel = {
        tID: "",
        tName: "",
        email: "",
        sex: "",
        password: ""
      };
    },

    getTeachers() {
      this.$http
        .get("/admin/teacher")
        .then(res => {
          this.teaTableData = res.data;
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "getTeachers():网络超时",
            showClose: true,
            center: true
          });
        });
    },

    handleAdd() {
      this.$refs.teaForm.validate(valid => {
        if (valid) {
          var teacher = this.teaFormModel;
          teacher.tID = "T" + teacher.tID;
          this.addTeacher(teacher);
        } else {
          return false;
        }
      });
    },

    addTeacher(teacher) {
      this.hideTeaForm();
      this.$http
        .post("/admin/teacher", teacher)
        .then(res => {
          if (res.data.restype == "success") {
            this.$message({
              type: "success",
              message: "添加教师成功",
              showClose: true,
              center: true
            });
            this.getTeachers();
            this.resetTeaFormModel();
          } else {
            this.$message({
              type: "error",
              message: "添加教师失败",
              showClose: true,
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "addTeacher():网络超时",
            showClose: true,
            center: true
          });
        });
    },

    handleEditFromMenu(index, row) {
      // 此处不能让model=row，因为这样是传引用
      // 传引用的话，输入表单的时候会把修改渲染到表格上面
      // 下面传值不影响界面渲染
      this.teaFormModel.tID = row.tID;
      this.teaFormModel.tName = row.tName;
      this.teaFormModel.email = row.email;
      this.teaFormModel.sex = row.sex;
      this.teaFormModel.password = row.password;

      this.tIDInputDisabled = true;
      this.showEdtTeaForm();
    },

    handleEditFromForm() {
      this.$refs.teaForm.validate(valid => {
        if (valid) {
          this.edtTeacher(this.teaFormModel);
        } else {
          return false;
        }
      });
    },

    edtTeacher(teacher) {
      this.hideTeaForm();
      this.$http
        .put("/admin/teacher/" + teacher.tID, teacher)
        .then(res => {
          if (res.data.restype == "success") {
            this.$message({
              type: "success",
              message: "编辑教师成功",
              showClose: true,
              center: true
            });
            this.getTeachers();
            this.resetTeaFormModel();
          } else {
            this.$message({
              type: "error",
              message: "编辑教师失败",
              showClose: true,
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "edtTeacher():网络超时",
            showClose: true,
            center: true
          });
        });
    },

    handleSelectionChange(selections) {
      this.selectedTeachers = selections;
    },

    handleDeleteSels() {
      this.selectedTeachers.forEach(teacher => {
        this.delTeacher(teacher.tID);
      });
    },

    handleDeleteFromMenu(index, row) {
      this.$confirm("确定删除" + row.tID + "？", "警告", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delTeacher(row.tID);
      });
    },

    delTeacher(tID) {
      this.$http
        .delete("/admin/teacher/" + tID)
        .then(res => {
          if (res.data.restype == "success") {
            this.$message({
              type: "success",
              message: "删除教师成功",
              showClose: true,
              center: true
            });
            this.getTeachers();
          } else {
            this.$message({
              type: "error",
              message: "删除教师失败",
              showClose: true,
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "delTeacher():网络超时",
            showClose: true,
            center: true
          });
        });
    }
  }
};
</script>
