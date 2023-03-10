<template>
  <div class="container">
    <div class="header">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">{{
        $t("home")
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("User_Settings") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("Changing_Password") }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main" style="margin-top: 20px;">
      <el-card class="box-card" :body-style="{ textAlign: 'center' }" style='height:640px'>
        <div slot="header" class="clearfix">
          <span><i class="el-icon-s-operation"></i>{{ $t("Operation_panel") }}</span>
        </div>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="180px"
              class="change-password">
              <el-form-item :label="$t('Old_password')" prop="oldPass">
                <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off" :placeholder="$t('Please_enter_the_old_password')" style="width:300px"></el-input>
              </el-form-item>
              <el-form-item :label="$t('New_password')" prop="newPass">
                <el-input type="password" v-model="ruleForm.newPass" autocomplete="off" :placeholder="$t('Please_enter_the_new_password')" style="width:300px"></el-input>
              </el-form-item>
              <el-form-item :label="$t('Confirm_the_new_password')" prop="checkNewPass">
                <el-input type="password" v-model="ruleForm.checkNewPass" autocomplete="off" :placeholder="$t('Please_Confirm_the_new_password')" style="width:300px">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" icon="el-icon-finished">{{$t('submit')}}</el-button>
                <el-button @click="resetForm('ruleForm')" icon="el-icon-refresh-left">{{$t('reset')}}</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "userSet",
  data() {
    //  验证原密码
    let validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.oldPass !== "") {
          this.$refs.ruleForm.validateField("newPass");
        }
        callback();
      }
    };
    //  验证新密码
    var validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value === this.ruleForm.oldPass) {
        callback(new Error("新旧密码不能相同!"));
      } else {
        callback();
      }
    };
    //  验证再次输入密码

    var validateCheckNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error("两次输入密码不一致!!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        oldPass: "",
        newPass: "",
        checkNewPass: "",
      },
      rules: {
        // trigger:'blur'  当输入框失去焦点的时候，触发 validateOldPass验证
        oldPass: [{ validator: validateOldPass, trigger: "blur" }],
        newPass: [{ validator: validateNewPass, trigger: "blur" }],
        checkNewPass: [{ validator: validateCheckNewPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            oldPassword: this.ruleForm.oldPass,
            newPassword: this.ruleForm.newPass,
          };
          this.$http
            .put(`/user/update/${sessionStorage.uid}`, params)
            .then((res) => {
              if (res.data && res.data.code === 1) {
                this.$message.success(res.data.msg);
                sessionStorage.clear();
                setTimeout(() => {
                  this.$router.replace({ path: "/" });
                }, 1000);
              } else {
                this.$message.error(res.data.msg);
                this.resetForm("ruleForm");
              }
            })
            .catch((err) => {
              console.log("Error=>", err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.change-password {
  width: 400px;
  margin: 10px auto;
}

</style>