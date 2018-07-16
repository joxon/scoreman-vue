<template>
  <el-container direction='vertical'>
    <el-button-group>
      <el-button type='primary' icon='el-icon-refresh' @click='getCourses()'>刷新表格</el-button>
      <el-button type='success' icon='el-icon-plus' @click='showAddCrsForm()'>新增课程</el-button>
      <el-button type='danger' icon='el-icon-minus' @click='handleDeleteSels()'>删除所选</el-button>
    </el-button-group>

    <el-dialog :title='crsFormTitle' :visible.sync='crsFormVisible'>
      <el-form ref='crsForm' :rules='crsFormRules' :model='crsFormModel' label-width="80px">
        <el-form-item prop='cID' label='课程号'>
          <el-input :disabled="cIDInputDisabled" v-model='crsFormModel.cID'>
            <template slot="prepend">C</template>
          </el-input>
        </el-form-item>
        <el-form-item prop='tID' label='教师号'>
          <el-input v-model='crsFormModel.tID'>
              <template slot="prepend">T</template>
          </el-input>
        </el-form-item>
        <el-form-item prop='cName' label='课程名'>
          <el-input v-model='crsFormModel.cName'></el-input>
        </el-form-item>
        <el-form-item prop='credit' label='学分'>
          <el-input v-model='crsFormModel.credit'></el-input>
        </el-form-item>
        <el-form-item prop='semester' label='学期'>
          <el-input v-model='crsFormModel.semester'></el-input>
        </el-form-item>
      </el-form>
      <div slot='footer'>
        <el-button v-if="rstButtonVisible" @click='resetCrsForm()'>清空</el-button>
        <el-button @click='hideCrsForm()'>取消</el-button>
        <el-button v-if='addButtonVisible' type='primary' @click='handleAdd()'>确定添加</el-button>
        <el-button v-if='edtButtonVisible' type='primary' @click='handleEditFromForm()'>确定编辑</el-button>
      </div>
    </el-dialog>

    <el-table :data='crsTableData' stripe max-height='500' @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column prop="cID" label="课程号" width="70" />
      <el-table-column prop="tID" label="教师号" width="70" />
      <el-table-column prop="cName" label="课程名" width="150" />
      <el-table-column prop="credit" label="学分" width="50" />
      <el-table-column prop="semester" label="学期" />
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
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
      selectedCourses: [],
      crsTableData: [
        {
          cID: "加载中",
          tID: "加载中",
          cName: "加载中",
          credit: "加载中",
          semester: "加载中"
        }
      ],
      crsFormRules: {
        cID: [
          {
            required: true,
            message: "课程号不能为空",
            trigger: "blur"
          }
        ],
        tID: [
          {
            required: true,
            message: "教师号不能为空",
            trigger: "blur"
          }
        ],
        cName: [
          {
            required: true,
            message: "课程名不能为空",
            trigger: "blur"
          }
        ],
        credit: [
          {
            required: true,
            message: "学分不能为空",
            trigger: "blur"
          }
        ],
        semester: [
          {
            required: true,
            message: "学期不能为空",
            trigger: "blur"
          }
        ]
      },
      cIDInputDisabled: false,
      rstButtonVisible: false,
      addButtonVisible: false,
      edtButtonVisible: false,
      crsFormVisible: false,
      crsFormTitle: "",
      crsFormModel: {
        cID: "",
        tID: "",
        cName: "",
        credit: "",
        semester: ""
      }
    };
  },

  created: function() {
    this.getCourses();
  },

  methods: {
    resetCrsForm() {
      this.resetCrsFormModel();
      this.$refs.crsForm.resetFields();
    },

    hideCrsForm() {
      this.crsFormVisible = false;
    },

    showAddCrsForm() {
      this.crsFormTitle = "新增课程";
      this.cIDInputDisabled = false;
      this.rstButtonVisible = true;
      this.addButtonVisible = true;
      this.edtButtonVisible = false;
      this.crsFormVisible = true;
    },

    showEdtCrsForm() {
      this.crsFormTitle = "编辑课程";
      this.cIDInputDisabled = true;
      this.rstButtonVisible = false;
      this.addButtonVisible = false;
      this.edtButtonVisible = true;
      this.crsFormVisible = true;
    },

    resetCrsFormModel() {
      this.crsFormModel = {
        cID: "",
        tID: "",
        cName: "",
        credit: "",
        semester: ""
      };
    },

    getCourses() {
      this.$http
        .get("/admin/course")
        .then(res => {
          this.crsTableData = res.data;
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "getCourses():网络超时",
            showClose: true,
            center: true
          });
        });
    },

    handleAdd() {
      this.$refs.crsForm.validate(valid => {
        if (valid) {
          var course = this.crsFormModel;
          course.cID = "C" + course.cID;
          course.tID = "T" + course.tID;
          this.addCourse(course);
        } else {
          return false;
        }
      });
    },

    addCourse(course) {
      this.hideCrsForm();
      this.$http
        .post("/admin/course", course)
        .then(res => {
          if (res.data.restype == "success") {
            this.$message({
              type: "success",
              message: "添加课程成功",
              showClose: true,
              center: true
            });
            this.getCourses();
            this.resetCrsFormModel();
          } else {
            this.$message({
              type: "error",
              message: "添加课程失败",
              showClose: true,
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "addCourse():网络超时",
            showClose: true,
            center: true
          });
        });
    },

    handleEditFromMenu(index, row) {
      // 此处不能让model=row，因为这样是传引用
      // 传引用的话，输入表单的时候会把修改渲染到表格上面
      // 下面传值不影响界面渲染
      this.crsFormModel.cID = row.cID;
      this.crsFormModel.tID = row.tID;
      this.crsFormModel.cName = row.cName;
      this.crsFormModel.credit = row.credit;
      this.crsFormModel.semester = row.semester;

      this.cIDInputDisabled = true;
      this.showEdtCrsForm();
    },

    handleEditFromForm() {
      this.$refs.crsForm.validate(valid => {
        if (valid) {
          this.edtCourse(this.crsFormModel);
        } else {
          return false;
        }
      });
    },

    edtCourse(course) {
      this.hideCrsForm();
      this.$http
        .put("/admin/course/" + course.cID, course)
        .then(res => {
          if (res.data.restype == "success") {
            this.$message({
              type: "success",
              message: "编辑课程成功",
              showClose: true,
              center: true
            });
            this.getCourses();
            this.resetCrsFormModel();
          } else {
            this.$message({
              type: "error",
              message: "编辑课程失败",
              showClose: true,
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "edtCourse():网络超时",
            showClose: true,
            center: true
          });
        });
    },

    handleSelectionChange(selections) {
      this.selectedCourses = selections;
    },

    handleDeleteSels() {
      this.selectedCourses.forEach(course => {
        this.delCourse(course.cID);
      });
    },

    handleDeleteFromMenu(index, row) {
      this.$confirm("确定删除" + row.cID + "？", "警告", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delCourse(row.cID);
      });
    },

    delCourse(cID) {
      this.$http
        .delete("/admin/course/" + cID)
        .then(res => {
          if (res.data.restype == "success") {
            this.$message({
              type: "success",
              message: "删除课程成功",
              showClose: true,
              center: true
            });
            this.getCourses();
          } else {
            this.$message({
              type: "error",
              message: "删除课程失败",
              showClose: true,
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "delCourse():网络超时",
            showClose: true,
            center: true
          });
        });
    }
  }
};
</script>
