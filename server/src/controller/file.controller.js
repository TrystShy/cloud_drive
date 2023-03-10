/*
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-04 14:38:33
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2023-03-09 16:11:33
 * @FilePath: \cloud_dirve\server\src\controller\file.controller.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 文件操作的业务实现

// 引入数据库管理
const db = require('../config/db.config')
// 引入表模型
const File = db.file
// 获取sql关键字对象
const Sequelize = db.Sequelize
const Op = Sequelize.Op
// 路径管理对象
const path = require('path')
// 文件操作的对象
const fs = require('fs')

/**
 * 添加文件
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {
    // 创建一个result，用来封装响应到前端的信息
    let result = {}

    // 接收前端传过来的文件的信息（只要是文件，这些信息是固定的）
    let params = {
        id: new Date().getTime(),
        file_name: req.files[0].originalname, // 文件的实际名称
        hash_name: req.files[0].filename, // 文件经过处理后生成的唯一名称
        upload_time: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(), // 2022-11-07 10:10:10
        type: path.parse(req.files[0].originalname).ext, // xxxxxx.png 截取 .png
        size: req.files[0].size, // 文件的大小
        download: 0, // 下载次数
        uid: req.body.uid // 上传者
    }
    File.create(params)
        .then(file => {
            if (file) {
                result = {
                    code: 1,
                    msg: '文件上传成功！'
                }
                res.status(200).json(result)
            } else {
                result = {
                    code: 0,
                    msg: '文件上传失败！'
                }
                res.status(500).json(result)
            }
        })
        .catch(err => {
            res.status(500).json('Error=> ' + err)
        })
}

/**
 * 删除文件
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = (req, res) => {
    console.log("进入到后端删除的方法");
    let result = {}
    const id = req.params.fileId;
    // 删除数据库中的记录
    File.destroy({
        where: {
            id: id
        }
    })
        .then((file) => {
            if (file) {
                // 从磁盘中删除文件
                let fileName = req.params.fileName // 要删除文件的名称
                let path = `${__dirname}/../resource/${fileName}` // 存放文件的磁盘路径
                // 删除文件的操作
                fs.unlink(path, err => {
                    if (err) {
                        result = {
                            code: 0,
                            msg: '文件删除失败！'
                        }
                    } else {
                        result = {
                            code: 1,
                            msg: '文件删除成功！'
                        }
                    }
                    res.status(200).json(result)
                })
            } else {
                result = {
                    code: 0,
                    msg: '文件删除失败！'
                }
                res.status(200).json(result)
            }
        })
        .catch(err => {
            res.status(500).json('Error=> ' + err)
        })
}
/**
 * 下载文件
 * @param {*} req 
 * @param {*} res 
 */
exports.download = (req, res) => {
    let fileId = req.params.fileId
    File.findOne({
        where: {
            id: fileId
        }
    })
        .then(file => {
            file.increment('download')
                .then(file => {
                    let fileName = req.params.fileName
                    let path = `${__dirname}/../resource/${fileName}`
                    console.log("------下载图片：",path)
                    // 从磁盘路径下下载文件
                    res.download(path, fileName)
                })
                .catch(err => {
                    res.status(500).json('Error=> ' + err)
                })
        })
}
/**
 * 根据类型查找文件
 * @param {*} req 
 * @param {*} res 
 */
exports.findAll = (req, res) => {
    let result = {}
    const keyword = req.params.keyword
    const uid = req.params.uid
    console.log("???", uid, keyword, keyword.length);
    let whereParams = {}
    if (keyword == 'all') {
        whereParams = {
            uid: uid
        }
    } else {
        whereParams = {
            [Op.and]: [{
                uid: uid
            },
            {
                // type: {
                //     [Op.like]: `%${keyword}%`
                // }
                type:keyword.split(',')
            }
            ]
        }
    }

    File.findAll({
        // sql：select * from file where uid=req.body.uid and type like '%'+keyword+'%'
        where: whereParams
    })
        .then(file => {
            if (file) {
                console.log("----file:", file);
                result = {
                    code: 1,
                    msg: '文件列表获取成功！',
                    data: file
                }
            } else {
                result = {
                    code: 0,
                    msg: '文件列表获取失败！',
                }
            }
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json('Error=> ' + err)
        })
}



/**
 * 预览文件
 */
// exports.preview = (req, res) => {
//     console.log("预览文件：", req.params)
//     let fileId = req.params.fileId
//     let fileName = req.params.fileName
//     File.findOne({
//         where: {
//             id: fileId
//         }
//     })
//         .then(file => {
//             console.log('log_file',file);
//             file.sendFile(__dirname + '/resource/' + fileName)
//         })
//         .catch(err => {
//             console.log('err',err);
//         })
// }