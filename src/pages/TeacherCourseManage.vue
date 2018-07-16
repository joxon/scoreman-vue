<template>
  <el-container direction='vertical'>


    <el-button-group>
      <el-dropdown @command="chooseCourse">
        <el-button type="success">
          {{curCourse.cName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in courseInfo"
                            :key="item.id"
                            :command="index"
          >{{item.cName}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type='primary' icon='el-icon-circle-plus' @click='addScore()'>添加成绩</el-button>
    </el-button-group>

    <el-dialog :title='teaFormTitle' :visible.sync='teaFormVisible'>
      <el-form ref='teaForm' :rules='teaFormRules' :model='teaFormModel' label-width="80px">
        <el-form-item prop='sID' label='学生号' >
          <el-input :disabled="isEdit" v-model='teaFormModel.sID'></el-input>
        </el-form-item>
        <el-form-item prop='sName' label='姓名' >
          <el-input :disabled="isEdit" v-model='teaFormModel.sName'></el-input>
        </el-form-item>
        <el-form-item prop='classno' label='班级' >
          <el-input :disabled="isEdit" v-model='teaFormModel.classno'></el-input>
        </el-form-item>
        <el-form-item prop='score' label='成绩' >
          <el-input v-model='teaFormModel.score'></el-input>
        </el-form-item>
      </el-form>
      <div slot='footer'>
        <el-button @click='hideStuForm()'>取消</el-button>
        <el-button v-if='isAdd' type='primary' @click='commitAdd()'>确定添加</el-button>
        <el-button v-else type='primary' @click='commitEdit()'>确定编辑</el-button>
      </div>
    </el-dialog>

    <el-table :data='score' stripe max-height='500'>
      <el-table-column sortable prop='sID' label='学号' width='90'/>
      <el-table-column prop='sName' label='姓名' width='70'/>
      <el-table-column prop='classno' label='班级' width='100'/>
      <el-table-column prop='score' label='成绩' width='50'/>
      <el-table-column fixed='right' label='操作' width='200'>
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" size="mini" @click="editScore(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-container>
</template>

<script>
  export default {
    name: "TeacherScore",
    data() {
      return {
        score: [{
          sID: '1',
          sName: '1',
          classno: '1',
          score: '1'
        }],
        courseInfo: [{
          cName: "00",
          cID: '0'
        }, {
          cName: "01",
          cID: '1'
        }, {
          cName: "02",
          cID: '2'
        }, {
          cName: "03",
          cID: '5'
        },
        ],
        curCourse: '',
        teaFormVisible:false,
        teaFormTitle:'',
        isAdd:'false',
        isEdit:'false',
        teaFormModel: {
          sID: "",
          sName: "",
          classno: "",
          score:''
        },
        teaFormRules: {
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
          score: [
            {
              required: true,
              message: "成绩不能为空",
              trigger: "blur"
            }
          ]
        },
      }
    },

    created: function () {
      this.curCourse = this.courseInfo[0];
      this.getScore();
    },

    methods: {
      getScore: function () {
        console.log('getScore cID=' + this.curCourse.cID);
      },

      chooseCourse: function (i) {
        console.log("index=" + i);
        this.curCourse = this.courseInfo[i];
        this.getScore();
      },

      hideStuForm:function(){
        this.teaFormVisible=false;
      },

      editScore:function(index,row){
        this.teaFormTitle='编辑成绩';
        this.isEdit=true;
        this.isAdd=false;
        this.teaFormVisible=true;
        this.teaFormModel=this.score[index];
      },

      addScore:function(index,row){
        //console.log(index);
        //console.log(row);
        this.teaFormTitle='添加成绩';
        this.isEdit=false;
        this.isAdd=true;
        this.teaFormVisible=true;
        this.teaFormModel={
          sID: "",
          sName: "",
          classno: "",
          score:''
        };
      },

      commitEdit:function(){
        this.$refs.teaForm.validate(valid => {
          if (valid) {
            console.log('edit');
            this.teaFormVisible = false;
            console.log(this.teaFormModel);
            console.log(this.curCourse)

          } else {
            return false;
          }
        });
      },

      commitAdd:function(){
          this.$refs.teaForm.validate(valid => {
            if (valid) {
              console.log('add');
              this.teaFormVisible = false;
              console.log(this.teaFormModel);
              console.log(this.curCourse)
            } else {
              return false;
            }
          });
      }
    },

  }
</script>

<style scoped>

</style>
