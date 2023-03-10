<!--
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-07 18:49:44
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2023-03-10 09:54:02
 * @FilePath: \cloud-management-system\cloud_dirve\client\src\view\HomeView.vue
-->

<template>
  <el-container style="height: 100%; border: 1px solid #eee" class="example">
    <!-- 左侧导航菜单 -->
    <el-menu :default-active="activeMenu" :collapse="isCollapse" class="el-menu-vertical-demo" router>
      <!-- logo显示 -->
      <div class="logo-box">
        <img v-show="!isCollapse" src="../assets/logo_l.png" alt="" width="100%" height="100%" />
        <img v-show="isCollapse" src="../assets/logo_s.png" alt="" width="100%" height="100%" />
      </div>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-folder-opened"></i>
          <span slot="title">{{ $t("List_of_files") }}</span></template>
        <el-menu-item index="/home/fileList/all" @click="all"><i class="el-icon-s-grid"></i>{{ $t("all") }}</el-menu-item>
        <el-menu-item index="/home/fileList/video" @click="video"><i class="el-icon-video-camera-solid"></i>{{ $t("video") }}
        </el-menu-item>
        <el-menu-item index="/home/fileList/audio" @click="audio"><i class="el-icon-headset"></i>{{ $t("audio") }}</el-menu-item>
        <el-menu-item index="/home/fileList/image" @click="image"><i class="el-icon-picture"></i>{{ $t("image") }}</el-menu-item>
        <el-menu-item index="/home/fileList/doc" @click="doc"><i class="el-icon-document"></i>{{ $t("document") }}</el-menu-item>
        <!-- <el-menu-item index='1-1' @click="excel"><i class="el-icon-tickets"></i>{{$t('form')}}</el-menu-item> -->
        <el-menu-item index="/home/fileList/app" @click="app"><i class="el-icon-menu"></i>{{ $t("app") }}</el-menu-item>
        <el-menu-item index="/home/fileList/package" @click="packages"><i class="el-icon-box"></i>{{ $t("package") }}</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-upload2"></i>
          <span slot="title">{{ $t("File_Uploading") }}</span></template>
        <el-menu-item index="2-1" @click="upload"><i style="font-size:30px" class="el-icon-upload"></i></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>
          <span slot="title">{{ $t("User_Settings") }}</span></template>
        <el-menu-item index="3-1" @click="changePassword"><i class="el-icon-edit"></i>{{ $t("Changing_Password") }}
        </el-menu-item>
      </el-submenu>
      <div>
        <div class="footer" v-show="iconName == 'el-icon-s-fold'">
          <!-- <el-progress :text-inside="true" :stroke-width="20" :percentage="percentage"></el-progress> -->
          <el-progress type="circle" text-color="#20a0ff" :width='90' :percentage="percentage"></el-progress>
        </div>
      </div>

    </el-menu>
    <!-- 主体内容区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header class="header">
        <div class="header">
          <i slot="reference" :class="iconName" @click="close"
            style="display: block; font-size: 28px; cursor: pointer"></i>
          <i slot="reference" :class="iconNames" @click="fullScreen"
            style="display: block; font-size: 24px; cursor: pointer; transform: translateX(70px);"></i>
          <i class="el-icon-loading" @click="allFilesHandler"
            style="display: block; font-size: 24px; cursor: pointer;"></i>
        </div>
        <!-- ----------------------------- -->
        <el-upload class="avatar-uploader" :action="imgUrlAdd" :show-file-list="false" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <el-tooltip effect="dark" placement="bottom">
            <div slot="content">{{ nickname }}<br />{{ $t('Tap_me') }}</div>
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-tooltip>
      </el-upload>
      <!-- -------------------------------- -->
        <div style="transform:translateX(-180px);">
          <!-- <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>{{$t('Changing_Password')}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
        <!-- <span style="font-size:18px">{{ nickname }}</span> -->
          <el-button type="primary" plain icon="el-icon-switch-button" style="margin-left: 10px" @click="drawer = true">
            {{ $t("Log_out") }}</el-button>
        </div>
      </el-header>

      <el-radio-group v-model="direction">
        <!-- <el-radio label="rtl">
            </el-radio> -->
      </el-radio-group>
      <el-drawer :title="$t('exit')" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
        <div>
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="loader">
                  <div class="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div class="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div class="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div class="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 360px;">
          <img src="../assets/logo_v.png" alt="" width="420px" style="margin-left: 7px;margin-top: -130px;" />
        </div>
      </el-drawer>
      <!-- 选项卡展示区域 -->
      <el-main style="background-color: #fff">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      imgUrlAdd:
        "http://localhost:8082/user/addPic/" + sessionStorage.getItem("uid"),
      imageUrl: sessionStorage.getItem("uid")
        ? "http://localhost:8082/user/getPic/" + sessionStorage.getItem("uid")
        : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",

      drawer: false,
      direction: "rtl",
      // 控制menu菜单的展开与关闭
      isCollapse: false,
      iconName: "el-icon-s-fold",
      iconNames: "el-icon-full-screen",
      tabPosition: "left",
      // tableData: Array(20).fill(item),
      // 左侧菜单盒子默认的宽度
      // 默认不全屏
      date: [],
      fullscreen: false,
      percentage: 10,
      PercentSize: 0,
      Size: 2147483648, //设置内存2G
    };
  },
  computed: {
    nickname() {
      return sessionStorage.getItem("nickname");
    },
    // 计算动态路由
    activeMenu() {
      const route = this.$route.path
      return route
    }
  },
  created() {
    this.getPercentage()
  },

  methods: {
    getPercentage() {
      setTimeout(() => {
        let date = [...this.$store.state.doc,
        ...this.$store.state.video,
        ...this.$store.state.audio,
        ...this.$store.state.image,
        ...this.$store.state.packages,
        ...this.$store.state.app,
        ...this.$store.state.qita]
        this.date = date
        this.date.forEach(item => {
          this.PercentSize += Number(item)
        });
        console.log(this.Size);
        console.log(this.PercentSize);
        this.percentage = Number((this.PercentSize / this.Size * 100).toFixed(2))
      }, 400);

    },
    allFilesHandler() {
      if (this.$router.path !== '/home') {
        this.$router.replace('/home')
      }
      this.reload()
      // this.getPercentage()
    },
    fullScreen() {
      this.$fullscreen.toggle(this.$el.querySelector('.example'), {
        wrap: false,
        callback: this.fullscreenChange
      })
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen
    },
    handleClose(done) {
      this.$confirm("确认退出？")
        .then((_) => {
          this.logout();
        })
        .catch((_) => {
          done();
        });
    },
    all() {
      this.$router.replace(
        "/home/fileList/all",
        () => { },
        () => { }
      );
    },
    video() {
      this.$router.replace(
        "/home/fileList/video",
        () => { },
        () => { }
      );
    },
    audio() {
      this.$router.replace(
        "/home/fileList/audio",
        () => { },
        () => { }
      );
    },
    image() {
      this.$router.replace(
        "/home/fileList/image",
        () => { },
        () => { }
      );
    },
    doc() {
      this.$router.replace(
        "/home/fileList/doc",
        () => { },
        () => { }
      );
    },
    // excel() {
    //   this.$router.replace('/home/fileList/excel', () => { }, () => { })
    // },
    packages() {
      this.$router.replace(
        "/home/fileList/package",
        () => { },
        () => { }
      );
    },
    app() {
      this.$router.replace(
        "/home/fileList/app",
        () => { },
        () => { }
      );
    },
    upload() {
      this.$router.replace(
        "/home/fileUpload",
        () => { },
        () => { }
      );
    },
    changePassword() {
      this.$router.replace(
        "/home/userSet",
        () => { },
        () => { }
      );
    },
    /**
     * 控制menu菜单的展开与关闭
     */
    close() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.iconName = "el-icon-s-unfold";
      } else {
        this.iconName = "el-icon-s-fold";
      }
    },
    /**
     * 退出登录
     */
    logout() {
      // 清空session
      sessionStorage.clear();
      // 跳转页面
      this.$router.replace("/");
    },
    // -----------------------------------------------------------------------
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(file.type);
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      } else if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      } else {
        this.$message.success("头像上传成功");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped>
.el-header {
  /* background-color: #ecf5ff; */
  color: #333;
  line-height: 60px;
}

.header {
  text-align: right;
  font-size: 12px;
  background-color: #fff;
  border-bottom: 1px solid #ecf5ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-box {
  position: relative;
  /* background-color: #eef1f6; */
  width: 100%;
  height: 60px;
  display: flex;
  justify-items: center;
  align-items: center;
}

.logo-box::after {
  content: "";
  display: block;
  width: 1px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fff;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  /* min-height: 400px; */
}

.el-menu-item {
  min-width: 180px;
  text-align: center;
}

.avatar-uploader img {
  margin-right: 30px;
  /* box-shadow:  */
  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px, rgb(64, 158, 255, 0.3) 0px 0px 0px 6px;
}

.avatar-uploader-icon {
  font-size: 24px;
  color: #8c939d;
  width: 40px;
  height: 40px;
  line-height: 55px;
  text-align: center;
  border-radius: 50%;
  /* margin-left: 565px; */
  margin-top: 5px;
  border: 1px dashed #ccc;
  /* transform:translateY(565px) */
}

.avatar-uploader-icon:hover {
  color: #409eff;
  border-color: #409eff;
}

.avatar {
  display: block;
  border-radius: 50%;
  font-size: 24px;
  color: #8c939d;
  width: 40px;
  height: 40px;
  line-height: 55px;
  text-align: center;
  /* background-color: #333; */
  margin-left: 565px;
  margin-top: 25px;
}

.loader {
  --size: 32px;
  --duration: 800ms;
  width: 96px;
  height: 64px;
  margin: 50px auto;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
  position: relative;
}

.loader .box {
  width: 32px;
  height: 32px;
  transform-style: preserve-3d;
  position: absolute;
  top: 0;
  left: 0;
}

.loader .box:nth-child(1) {
  transform: translate(100%, 0);
  animation: box1 800ms linear infinite;
}

.loader .box:nth-child(2) {
  transform: translate(0, 100%);
  animation: box2 800ms linear infinite;
}

.loader .box:nth-child(3) {
  transform: translate(100%, 100%);
  animation: box3 800ms linear infinite;
}

.loader .box:nth-child(4) {
  transform: translate(200%, 0);
  animation: box4 800ms linear infinite;
}

.loader .box>div {
  --translateZ: calc(var(--size) / 2);
  --rotateY: 0deg;
  --rotateX: 0deg;
  background: #5c8df6;
  width: 100%;
  height: 100%;
  transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
  position: absolute;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
}

.loader .box>div:nth-child(1) {
  top: 0;
  left: 0;
}

.loader .box>div:nth-child(2) {
  background: #145af2;
  right: 0;
  --rotateY: 90deg;
}

.loader .box>div:nth-child(3) {
  background: #447cf5;
  --rotateX: -90deg;
}

.loader .box>div:nth-child(4) {
  background: #dbe3f4;
  top: 0;
  left: 0;
  --translateZ: calc(var(--size) * 3 * -1);
}

.footer {
  margin-top: 30px;
  /* margin:0 auto; */
  margin-left: 42px;
}


.footer>>>.el-progress__text {
  color: #20a0ff
}

@keyframes box1 {

  0%,
  50% {
    transform: translate(100%, 0);
  }

  100% {
    transform: translate(200%, 0);
  }
}

@keyframes box2 {
  0% {
    transform: translate(0, 100%);
  }

  50% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(100%, 0);
  }
}

@keyframes box3 {

  0%,
  50% {
    transform: translate(100%, 100%);
  }

  100% {
    transform: translate(0, 100%);
  }
}

@keyframes box4 {
  0% {
    transform: translate(200%, 0);
  }

  50% {
    transform: translate(200%, 100%);
  }

  100% {
    transform: translate(100%, 100%);
  }
}
</style>
