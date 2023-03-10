/*
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-04 14:17:18
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2022-11-04 16:38:23
 * @FilePath: \cloud_dirve\server\src\config\env.js
 */
// 数据库连接配置
const env = {
    // 配置数据库
    database: 'cloud_drive',
    // 数据库的用户名
    username: 'root',
    // 数据库访问密码
    password: '123456',
    // host:数据库和服务程序在同一台电脑可以通过localhost访问
    host: 'localhost',
    // 3307
    port: 3307,
    // 要访问的数据库类型
    dialect: 'mysql',
    // 配置数据库连接池
    pool: {
        max: 5, //最多连接5个客户端
        min: 0, //最少连接0个客户端
        acquire: 30000, //最大活跃度
        idle: 10000, //最大空闲
    }
}
module.exports = env
