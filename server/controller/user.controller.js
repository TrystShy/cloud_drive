/*
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-04 14:38:22
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2023-03-09 15:42:13
 * @FilePath: \cloud_dirve\server\src\controller\user.controller.js
 */
// 用户操作的业务实现
// 引入数据库管理
const db = require('../config/db.config.js')
// 引入表模型
const User = db.user
// 因为我们需要使用特殊的sql处理如：多条件判断、模糊查询、分组排序等特殊操作，所以要使用Op对象（Op对象中包含sql关键字）
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/**
 * 新增用户实现
 * @param {*} req request对象，内部包含前端客户端请求的信息
 * @param {*} res response对象，内部包含后端响应到前端的信息
 */
exports.create = (req, res) => {
    // 封装响应到前端的信息
    console.log("用户注册：", req.body);
    let result = {}
    // 前端请求的username和password、nickname不为空
    if (req.body.username && req.body.password && req.body.nickname) {
        User.create(req.body)
            .then(user => {
                if (user) {
                    result = {
                        code: 1,
                        msg: '用户信息注册成功！',
                        uid: user.id,
                        username: user.username,
                        nickname: user.nickname
                    }
                } else {
                    result = {
                        code: 0,
                        msg: '用户信息注册失败！'
                    }
                }
                // 将信息以json字符串的方式响应到前端
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json('Error=> ' + err)
            })
    } else {
        result = {
            code: -1,
            msg: '注册信息不能为空！'
        }
        res.status(200).json(result)
    }
}

// 根据用户名和密码查询用户实现
exports.validate = (req, res) => {
    let result = {}
    // 对请求的信息(username和password)进行非空校验
    if (req.body.username && req.body.password) {
        // 操作数据库
        // sql：select uid,username,nickname from user where username
        // = req.body.username and password 
        // /*  */= req.body.password
        User.findOne({
            where: {
                [Op.and]: [{
                    username: req.body.username
                },
                {
                    password: req.body.password
                }
                ]
            },
            // 这个是要查询的属性，如果不配置，就会返回所有信息
            // 也就是这里不配置，就代表查询所有字段
            attributes: ['uid', 'username', 'nickname']
        })
            .then(user => {
                if (user) {
                    result = {
                        code: 1,
                        msg: '用户登录成功！',
                        user: user
                    }
                } else {
                    result = {
                        code: 0,
                        msg: '用户登录失败！'
                    }
                }
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json('Error=> ' + err)
            })
    } else {
        result = {
            code: -1,
            msg: '用户名或者密码不能为空！'
        }
        res.status(200).json(result)
    }
}

// 修改密码实现
exports.updatePassword = (req, res) => {
    let result = {}
    // 对请求数据进行非空校验
    if (req.body.oldPassword && req.body.newPassword) {
        // 修改密码之前，先检测账户是否存在
        // sql：select * from user where uid=req.params.userId and password= req.oldPassword
        User.findOne({
            where: {
                [Op.and]: [{
                    uid: req.params.userId
                },
                {
                    password: req.body.oldPassword
                }
                ]
            }
        })
            .then(user => {
                if (user) {
                    // 账户存在，修改密码
                    // sql：update user set password = req.body.newPassword where uid = req.params.userId
                    User.update({
                        // 配置需要修改的字段
                        password: req.body.newPassword
                    }, {
                        // 判断条件
                        where: {
                            uid: req.params.userId
                        }
                    })
                        .then(user => {
                            if (user) {
                                result = {
                                    code: 1,
                                    msg: '密码修改成功！'
                                }
                                res.status(200).json(result)
                            } else {
                                result = {
                                    code: 0,
                                    msg: '密码修改失败！'
                                }
                                res.status(200).json(result)
                            }
                        })
                        .catch(err => {
                            res.status(500).json('Error=> ' + err)
                        })
                } else {
                    result = {
                        code: -1,
                        msg: "账户不存在或者旧密码错误！"
                    }
                    res.status(200).json(result)
                }
            })
            .catch(err => {
                res.status(500).json('Error=> ' + err)
            })
    } else {
        result = {
            code: -1,
            msg: '提交的数据不能为空！'
        }
        res.status(200).json(result)
    }
}




/**
 * @description: 上传头像
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
exports.userImg = (req, res) => {
    console.log("头像上传：", req.files)
    // 创建一个result，用来封装响应到前端的信息
    let result = {}

    // 接收前端传过来的文件的信息（只要是文件，这些信息是固定的）
    // let params = {
    //     id: new Date().getTime(),
    //     file_name: req.files[0].originalname, // 文件的实际名称
    //     hash_name: req.files[0].filename, // 文件经过处理后生成的唯一名称
    //     upload_time: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(), // 2022-11-07 10:10:10
    //     type: path.parse(req.files[0].originalname).ext, // 小哥的帅照.png 截取 .png
    //     size: req.files[0].size, // 文件的大小
    //     download: 0, // 下载次数
    //     uid: req.body.uid // 上传者
    // }
    User.update({
        // 配置需要修改的字段
        pic: req.files[0].filename
    }, {
        // 判断条件
        where: {
            uid: req.params.userId
        }
    })
        .then(file => {
            if (file) {
                result = {
                    code: 1,
                    msg: '图片上传成功！'
                }
                res.status(200).json(result)
            } else {
                result = {
                    code: 0,
                    msg: '图片上传失败！'
                }
                res.status(500).json(result)
            }
        })
        .catch(err => {
            res.status(500).json('Error=> ' + err)
        })

}

/**
 * 获取头像
 * @param {*} req 
 * @param {*} res 
 */
exports.download = (req, res) => {
    console.log("获取头像：", req.params)
    let userId = req.params.userId
    User.findOne({
        where: {
            uid: userId
        },
        // 这个是要查询的属性，如果不配置，就会返回所有信息，也就是这里不配置，就代表查询所有字段
        // attributes: ['pic']
    })
        .then(user => {
            console.log("-----user:", user)
            // console.log("获取头像返回：",user.dataValues.pic)
            // console.log('返回给前端的图片路径：',__dirname + "/../resource/" + user.dataValues.pic)
            // res.sendFile( __dirname + "/../resource/" + user.dataValues.pic );
            // let path = `${__dirname}/../resource/${user.dataValues.pic}`
            // console.log("---------path:",path)
            // res.sendFile(path)
            res.sendFile(`D:\\cloud-management-system/cloud_dirve/server/src/resource/${user.dataValues.pic}`)

        })
}




