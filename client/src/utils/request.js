/*
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-04 17:15:32
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2022-11-07 16:05:39
 * @FilePath: \cloud_dirve\client\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Site_Config from '@/config/site.js'
import axios from 'axios'

const instance = axios.create({
    baseURL: Site_Config.API_URL,
    timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {    
    config.headers.Authorization = localStorage.getItem('Token')
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default instance