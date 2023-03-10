/*
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-04 11:30:45
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2022-11-10 23:27:58
 * @FilePath: \cloud_dirve\server\src\app.js
 */

// 服务端启动文件，也就是我们之前写的server.js
const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
//const cors = require('cors')
const morgan = require('morgan')
// 实例化express
const app = express()
// 使用其他模块
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }));// 对url进行编码，防止中文乱码
app.use(bodyParser.json())// 直接将json自动解析为obj
// 原生配置：实现跨域
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length,Authorization, Accept, X - Requested - With, yourHeaderFeild');
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

//配置跨域
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:8080',
    optionSuccessStatus: 200
};
app.use(cors(corsOptions))


// 密码支持md5加密
const md5 = require('md5')
// 处理文件上传
const multer = require('multer')
const storage = multer.diskStorage({
    // 设置上传文件存放路径
    destination(req, res, cb) {
        cb(null, './src/resource')
    },
    // 解析文件名称
    filename(req, file, cb) {
        // 简单来说，就是将默认的文件名称截取后使用md5加密
        const fileNameArr = file.originalname.split('.')
        const fileName = `${md5(fileNameArr[0])}.${fileNameArr[1]}`
        cb(null, fileName)
    }
})
// app.use(multer({ storage }).any())

app.use(multer({
    fileFilter(req, file, callback) {
        //解决中文名乱码的问题latin1是一种编码格式
        file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
        callback(null, true)
    },
    storage
}).any())





// 配置路由
require('./router/user.router')(app)
require('./router/file.route')(app)
// 开启服务器监听
let server = app.listen(process.env.PORT || 8082, () => {
    // let host = server.address().address;
    let port = server.address().port;
    console.log(`服务器启动: http://localhost:${port}`);
});