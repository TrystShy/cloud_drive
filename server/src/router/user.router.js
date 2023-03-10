/*
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-04 14:37:09
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2022-11-11 18:39:31
 * @FilePath: \cloud_dirve\server\src\router\user.router.js
 */
// 用户操作的接口
module.exports = function (app) {
    const user = require('../controller/user.controller')

    // 新增用户
    app.post('/user/add', user.create)

    // 根据用户名和密码查询用户
    app.post('/user/validate', user.validate)

    // 修改密码
    app.put('/user/update/:userId', user.updatePassword)

    // 上传头像
    app.post('/user/addPic/:userId', user.userImg)

    // 获取头像
    app.get('/user/getPic/:userId', user.download)

}