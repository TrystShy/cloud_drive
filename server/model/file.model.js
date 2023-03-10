/*
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-10 17:51:32
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2023-03-07 16:44:28
 * @FilePath: \cloud_dirve\server\src\model\file.model.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('file', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      comment: "文件编号"
    },
    file_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "文件名称（原始名称）"
    },
    hash_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "文件名称（程序内部区分文件）"
    },
    upload_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "上传时间"
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "文件类型"
    },
    size: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "文件大小"
    },
    download: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "下载次数"
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "上传者（外键）",
      references: {
        model: 'user',
        key: 'uid'
      }
    }
  }, {
    sequelize,
    tableName: 'file',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "uid",
        using: "BTREE",
        fields: [
          { name: "uid" },
        ]
      },
    ]
  });
};
