<template>
  <el-container direction='vertical'>
    <el-button-group>
      <el-dropdown @command="chooseCourse">
        <el-button type="success">
          {{curCourse.cName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in courseInfo" :key="item.id" :command="index">{{item.cName}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type='primary' icon='el-icon-refresh' @click='getStudents()'>刷新</el-button>
      <el-button type='success' icon='el-icon-plus' @click='showAddStuForm()'>新增学生</el-button>
      <el-button type='danger' icon='el-icon-minus' @click='handleDeleteSels()'>删除所选</el-button>
    </el-button-group>

    <el-dialog :title='stuFormTitle' :visible.sync='stuFormVisible'>
      <el-form ref='stuForm' :rules='stuFormRules' :model='stuFormModel' label-width="80px">
        <el-form-item prop='sID' label='学生号'>
          <el-input v-model='stuFormModel.sID'>
            <template slot="prepend">S</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot='footer'>
        <el-button @click='hideStuForm()'>取消</el-button>
        <el-button type='primary' @click='handleAdd()'>确定添加</el-button>
      </div>
    </el-dialog>

    <el-table :data='stuTableData' stripe max-height='500' @selection-change="handleSelectionChange">
      <el-table-column type='selection' width='40' />
      <el-table-column sortable prop='sID' label='学生号' width='90' />
      <el-table-column prop='sName' label='姓名' width='70' />
      <el-table-column prop='classno' label='班级' width='100' />
      <el-table-column fixed='right' label='操作' width='200'>
        <template slot-scope='scope'>
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
        selectedStudents: [],
        stuTableData: [{
          sID: "加载中",
          sName: "加载中",
          classno: "加载中"
        }],
        courseInfo: [{
            cName: "00",
            cID: "0"
          },
          {
            cName: "01",
            cID: "1"
          },
          {
            cName: "02",
            cID: "2"
          },
          {
            cName: "03",
            cID: "5"
          }
        ],
        curCourse: "",
        stuFormRules: {
          sID: [{
            required: true,
            message: "学生号不能为空",
            trigger: "blur"
          }]
        },
        stuFormVisible: false,
        stuFormTitle: "新增学生",
        stuFormModel: {
          sID: ""
        }
      };
    },

    created: function () {
      this.getCourse();
    },

    methods: {
      getCourse: function () {
        this.$http
          .get("/tea/cInfo?tID=" + this.$store.state.user.username)
          .then(res => {
            //console.log(res);
            this.courseInfo = res.data;
            this.curCourse = this.courseInfo[0];
            this.getStudents();
          });
      },

      chooseCourse: function (i) {
        console.log("index=" + i);
        this.curCourse = this.courseInfo[i];
        this.getStudents();
      },

      hideStuForm() {
        this.stuFormVisible = false;
      },

      showAddStuForm() {
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

      resetStuFormModel() {
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
          .get(
            "/tea/getGradeByCID?cID=" +
            this.curCourse.cID +
            "&tID=" +
            this.$store.state.user.username
          )
          .then(res => {
            console.log(res);
            if(res.data != '')
              this.stuTableData=res.data;
            else
              this.stuTabl
            eData='';
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
          .put(
            "/tea/takeAdd/" +
            this.$store.state.user.username +
            "/" +
            student.sID +
            "/" +
            this.curCourse.cID
          )
          .then(res => {
            console.log(res);
            if (res.data == "成功") {
              this.$message({
                type: "success",
                message: "添加学生成功",
                showClose: true,
                center: true
              });
              this.getStudents();
              this.resetStuFormModel();
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

      handleSelectionChange(selections) {
        this.selectedStudents = selections;
      },

      handleDeleteSels() {
        this.selectedStudents.forEach(student => {
          this.delStudent(student.sID);
        });
      },

      handleDeleteFromMenu(index, row) {
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
          .delete(
            "/tea/takeDelete/" +
            this.$store.state.user.username +
            "/" +
            sID +
            "/" +
            this.curCourse.cID
          )
          .then(res => {
            //console.log(res);
            if (res.data == "成功") {
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
