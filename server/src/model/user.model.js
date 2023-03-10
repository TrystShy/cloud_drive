/*
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-10 17:50:54
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2022-11-11 18:38:41
 * @FilePath: \cloud-management-system\cloud_dirve\server\src\model\user.model.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    uid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "用户编号"
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "登录名",
      unique: "username"
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "登录密码"
    },
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "昵称"
    },
    pic: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "头像"
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "uid" },
        ]
      },
      {
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
