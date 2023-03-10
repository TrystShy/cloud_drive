<!--
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-07 18:49:44
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2023-03-10 09:50:06
 * @FilePath: \cloud-management-system\cloud_dirve\client\src\view\FileUploadView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <div class="header">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">{{$t('home')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('File_Uploading')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('upload')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main" style="margin-top: 20px">
      <el-card class="box-card" :body-style="{ textAlign: 'center' }">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-s-operation"></i>{{$t('Operation_panel')}}</span>
        </div>
        <!-- 上传组件 -->

        <el-upload drag multiple action="http://localhost:8082/file/add" :data="userInfo" :on-success="dealSuccess"
          :on-error="dealError" style="margin-top: 140px;height:50vh;">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">{{$t('upload_text')}}<em>{{$t('Click_Upload')}}</em></div>
        </el-upload>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  computed: {
    userInfo() {
      return {
        uid: sessionStorage.getItem("uid"),
      };
    },
  },
  methods: {
    dealSuccess(res) {
      console.log("文件上传成功：", res);
      this.$message.success("文件上传成功！");
      this.$store.dispatch('getEcharts')
      this.reload()
      this.$router.replace('/home/fileList/all')
    },
    dealError(err) {
      this.$message.error("上传文件失败,请重新上传!");
    },
    handleChange(file, fileList) {
      // var _this = this;
      // if (file.raw) {
      //   let reader = new FileReader();
      //   reader.onload = function (e) {
      //     //_this.contentHtml = e.target.result;
      //   };
      //   reader.readAsText(file.raw, "utf-8");
      // }
      // console.log(file, fileList);
    },
  },
};
</script>

<style>

</style>