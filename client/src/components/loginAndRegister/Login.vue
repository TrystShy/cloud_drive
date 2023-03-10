<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
    <el-form-item prop="username">
      <el-input type="text" v-model="ruleForm.username" autocomplete="off"
        :placeholder="$t('Please_enter_the_user_name')">
        <i slot="prefix" class="el-input__icon el-icon-user"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"
        :placeholder="$t('Please_enter_the_password')">
        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox :label="$t('rememberPassword')" name="type" v-model="remember"></el-checkbox>
    </el-form-item>

    <el-form-item>
      <el-button round type="primary" @click="submitForm('ruleForm')" style="width: 45%; float: left"
        icon="el-icon-check" size="medium">{{$t('login')}}</el-button>
      <el-button round @click="resetForm('ruleForm')" style="width: 45%; float: right" icon="el-icon-refresh-left"
        size="medium">{{$t('reset')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      ruleForm: {
        username: "",
        password: "",
      },
      // 记住密码
      remember: false,
      // 校验逻辑
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.initForm();
  },
  methods: {
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    /**
     * 初始化表单
     */
    initForm() {
      const remember = localStorage.getItem("remember");
      if (remember && remember === "true") {
        // 复选框选中
        this.remember = true;
      } else {
        // 复选框不选中
        this.remember = false;
      }
      // 将数据填充到表单中
      const uname = localStorage.getItem("username");
      const upwd = localStorage.getItem("password");
      if (uname && upwd) {
        this.ruleForm = {
          username: uname,
          password: upwd,
        };
      }
    },
    /**
     * 提交数据到服务器
     * @param {*} formName
     */
    submitForm(formName) {
      console.log("-----", this.remember);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 访问后端服务器
          this.$http
            .post("/user/validate", this.ruleForm)
            .then((res) => {
              console.log("【登录回调】", res);
              if (res.data && res.data.code == 1) {
                // 登录成功
                // 将返回的用户信息存在session中
                if (res.data.user) {
                  sessionStorage.setItem("uid", res.data.user.uid);
                  sessionStorage.setItem("username", res.data.user.username);
                  sessionStorage.setItem("nickname", res.data.user.nickname);
                }
                // 记住密码(记住密码是在登录成功之后实现)
                if (this.remember) {
                  // 记住密码
                  localStorage.setItem("remember", true);
                  localStorage.setItem("username", this.ruleForm.username);
                  localStorage.setItem("password", this.ruleForm.password);
                } else {
                  // 忘记密码
                  localStorage.setItem("remember", false);
                  localStorage.setItem("username", "");
                  localStorage.setItem("password", "");
                }
                this.openFullScreen()
                // 隔2秒后跳转页面
                setTimeout(() => {
                  this.$router.replace({ name: "HomeView" });
                  this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                  })
                }, 2000);
              } else {
                // 登录失败
                this.$message({
                  showClose: true,
                  message: res.data.msg + '用户名或密码有误-_-',
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
.demo-ruleForm {
  margin-top: 20px;
}
</style>