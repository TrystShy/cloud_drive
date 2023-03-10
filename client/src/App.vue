<!--
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-07 18:49:44
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2023-03-03 17:22:50
 * @FilePath: \cloud-management-system\cloud_dirve\client\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" /> -->
    <div class="item">
      <template>
        <el-select v-model="value" placeholder="请选择" @change="selectHandler">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
    </div>


    <!-- <li>{{$t('message.login')}}</li> -->


    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        isRouterAlive: true,
        options: [{
          value: 'zh',
          label: '中文'
        }, {
          value: 'en',
          label: 'English'
        }],
        value: localStorage.getItem('language') ? localStorage.getItem('language') : 'zh'
      }
    },
    provide() {
    //提供
    return {
      reload: this.reload,
    };
  },
    methods: {
      selectHandler() {
        this.reload()
        // location.reload()
        console.log(this.value)
        console.log(this.$i18n)
        this.$i18n.locale = this.value
        localStorage.setItem("language", this.value)
      },
      reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    }
    }
  }


</script>

<style>
  html,
  body {
    width: 100%;
    height: 100%;
    user-select: none;
  }

  * {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
    height: 100%;
    overflow: hidden;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .item {
    position: absolute;
    top: 10px;
    right: 30px;
    width: 150px;
    z-index: 10;
  }

  .icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>