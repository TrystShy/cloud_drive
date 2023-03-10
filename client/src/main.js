/*
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-07 18:49:44
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2023-03-03 13:35:40
 * @FilePath: \cloud-management-system\cloud_dirve\client\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入axios，并将其挂载到vue实例上
import http from './utils/http'
// 引入ElementUI
import ElementUI from 'element-ui'
// 引入ElementUI默认主题
import 'element-ui/lib/theme-chalk/index.css'
// 引入字体图标
// import '@/assets/css/iconfont.css'
import '@/assets/js/iconfont.js'


// import i18n from './language'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

import VueParticles from 'vue-particles'  
Vue.use(VueParticles)  


const i18n = new VueI18n({
  locale: localStorage.getItem('language') ? localStorage.getItem('language') : 'zh',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh': require('./language/zh'),   // 中文语言包
    'en': require('./language/en')    // 英文语言包
  }
});

import fullscreen from 'vue-fullscreen'
Vue.use(fullscreen)

import store from './store'


// import request from './utils/request'
// Vue.prototype.$http = request


import *as echarts from 'echarts';
Vue.prototype.$echarts = echarts;


Vue.config.productionTip = false

Vue.prototype.$http = http

Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})



