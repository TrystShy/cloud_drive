/*
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-04 11:26:51
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2022-11-09 09:54:10
 * @FilePath: \cloud-management-system\cloud_dirve\client\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Router from 'vue-router'
import LoginAndRegisterView from '@/view/LoginAndRegisterView'
import HomeView from '@/view/HomeView'
Vue.use(Router)

let router = new Router({
  routes: [{
    title: '登录|注册',
    path: '/',
    name: 'LoginAndRegisterView',
    component: LoginAndRegisterView
  },
  {
    title: '首页',
    path: '/home',
    name: 'HomeView',
    redirect:'/home/fileList/all',
    component: HomeView,
    children: [
      {
        title: '文件列表',
        path: 'fileList/:type',
        name: 'FileListView',
        props: true,
        component: () => import('@/view/FileListView')
      },
      {
        title: '文件上传',
        path: 'fileUpload',
        name: 'FileUploadView',
        component: () => import('@/view/FileUploadView')
      },
      {
        title: '用户设置',
        path: 'userSet',
        name: 'UserSetView',
        component: () => import('@/view/UserSetView')
      },
    ]
  },

  {
    title: '页面丢失',
    path: '*',
    name: 'UndefinedPage',
    component: () => import('../view/UndefinedPage')
  }],
  mode: 'history'
})


// 通过全局路由守卫，配置登录校验
router.beforeEach((to, from, next) => {
  if (to.name === 'HomeView' || to.name === 'FileListView' || to.name === 'FileUploadView' || to.name === 'UserSetView') {
    if (!sessionStorage.username) { // 未登录
      return window.location.replace('/')
    } else { // 登录
      next()
    }
  } else {
    if (to.name === 'LoginAndRegisterView') {
      // 如果已经是登录状态，就不让在跳转登录界面
      if (sessionStorage.username) {
        return window.location.replace('/home')
      } else {
        next()
      }
    }
  }
  if (to.name == 'UndefinedPage') {
    next()
  }
})
export default router
