/*
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-04 14:37:21
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2023-02-15 17:10:30
 * @FilePath: \cloud_dirve\server\src\router\file.route.js
 */
// 文件
// 文件操作的接口
module.exports = function (app) {
    // 获取文件操作的实现
    const file = require('../controller/file.controller')

    // 添加文件
    app.post('/file/add', file.create)

    // 删除文件
    app.delete('/file/delete/:fileName/:fileId', file.delete)

    // 下载文件
    app.get('/file/download/:fileName/:fileId', file.download)

    // 获取文件信息列表
    app.get('/file/list/:uid/:keyword', file.findAll)

    // 预览文件
    // app.get('/file/preview/:fileName/:fileId', file.preview)

}