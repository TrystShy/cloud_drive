<!--
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-07 20:37:54
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2022-11-10 09:39:39
 * @FilePath: \cloud-management-system\cloud_dirve\client\src\view\UndefinedPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-empty :description="$t('The_page_is_missing')" :image-size="300">
            <el-button @click="backHome" type="success" round="true" icon="el-icon-thumb">
                {{$t('Click_Me_back_to_the_home_page')}}
            </el-button>
        </el-empty>
    </div>

</template>

<script>
export default {
    methods: {
        backHome() {
            this.$router.replace({
                path: './'
            })
        }
    }
}
</script>

<style>

</style>