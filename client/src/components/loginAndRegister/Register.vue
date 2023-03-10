<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
    <el-form-item prop="username">
      <el-input type="text" v-model="ruleForm.username" autocomplete="off" :placeholder="$t('Please_enter_the_user_name')">
        <i slot="prefix" class="el-input__icon el-icon-user"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input type="text" v-model="ruleForm.nickname" autocomplete="off" :placeholder="$t('Please_enter_a_nickname')">
        <i slot="prefix" class="el-input__icon el-icon-user"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off" :placeholder="$t('Please_enter_the_password')">
        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="rePassword">
      <el-input type="password" v-model="ruleForm.rePassword" autocomplete="off" :placeholder="$t('Please_confirm_the_password')">
        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button round class="btn" type="primary" @click="submitForm('ruleForm')" icon="el-icon-check" size="medium"
        style="width: 45%; float: left">{{$t('registered')}}
      </el-button>
      <el-button round @click="resetForm('ruleForm')" icon="el-icon-refresh-left" size="medium"
        style="width: 45%; float: right">{{$t('reset')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    // 自定义密码校验规则
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.rePassword !== "") {
          this.$refs.ruleForm.validateField("rePassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      ruleForm: {
        username: "",
        nickname: "",
        password: "",
        rePassword: "",
      },

      // 校验逻辑
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "change" }],
        password: [{ validator: validatePass, trigger: "change" }],
        rePassword: [{ validator: validatePass2, trigger: "change" }],
      },
    };
  },
  mounted() { },
  methods: {
    /**
     * 提交数据到服务器
     * @param {*} formName
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 访问后端服务器
          this.$http
            .post("/user/add", this.ruleForm)
            .then((res) => {
              console.log("【注册回调】", res);
              if (res.data && res.data.code == 1) {
                // 注册成功
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: 'success'
                })
                // 隔2秒后跳转页面
                setTimeout(() => {
                  // H5原生的跳转
                  window.location.replace("/");
                }, 1000);
              } else {
                // 注册失败
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
            .catch((error) => {
              throw new Error(error);
            });
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>

</style>