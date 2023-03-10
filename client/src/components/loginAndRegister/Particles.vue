<!--
 * @Author: qianjiang trystshy@163.com
 * @Date: 2023-02-15 17:30:55
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2023-02-16 13:38:19
 * @FilePath: \cloud_dirve\client\src\components\loginAndRegister\Particles.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="login">
      <vue-particles
        class="login-bg"
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      >
      </vue-particles>
    </div>
</template>

<style scoped>
	#login{
    width: 100%;
    height: 100%;
    /* color: #cccccc;  */
    /*如果想做背景图片 可以给标签一个class 直接添加背景图*/
    position: absolute;
    /* z-index:-1; */
    overflow:hidden;
}
/* // 如果屎全屏展示 */
.login-bg{
    width: 100%;
    height: 100%;
    background: #3E3E3E;
    /* background: #fff; */
}
</style>

