<!--
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-08 13:01:31
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2023-03-02 10:35:22
 * @FilePath: \cloud-management-system\cloud_dirve\client\src\view\LoginAndRegisterView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template class="Login">
  <div>
  <Particles></Particles> 

  <el-container class="login-box">

    <el-main>
      <el-card class="box-card" type="border-card">
        <div class="logo">
          <img src="@/assets/logo_v.png" alt="" />
        </div>
        <div class="tabs">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('userLogin')" name="first">
              <Login></Login>
            </el-tab-pane>
            <el-tab-pane :label="$t('userRegister')" name="second">
              <Register></Register>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </el-main>
  </el-container>

</div>
</template>

<script>
import Login from "../components/loginAndRegister/Login.vue";
import Register from "../components/loginAndRegister/Register.vue";
import Particles from "../components/loginAndRegister/Particles.vue";

export default {
  components: {
    Login,
    Register,
    Particles
  },
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped>

.box-card {
  width: 720px;
  height: 380px;
  margin: 140px auto;
  box-sizing: border-box;
  position: relative;
  z-index:10;
  border-radius: 30px;
  opacity: 0.9;
  /* box-shadow: 30px 30px 30px -10px rgba(0,0,0,0.15),
  inset 15px 15px 10px rgba(255,255,255,0.75),
  -15px -15px 35px rgba(255,255,255,0.55); */
  box-shadow: rgba(255, 255, 255, 0.25) 0px 14px 28px, rgba(255, 255, 255, 0.22) 0px 10px 10px;
}
.box-card .logo,
.box-card .tabs {
  width: 50%;
  height: 100%;
  float: left;
}
.box-card .logo img {
  width: 100%;
  height: 100%;
  margin-top: 20px;
}
</style>