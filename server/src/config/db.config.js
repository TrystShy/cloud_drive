/*
 * @Author: qianjiang trystshy@163.com
 * @Date: 2022-11-04 14:20:21
 * @LastEditors: qianjiang trystshy@163.com
 * @LastEditTime: 2022-11-04 15:48:46
 * @FilePath: \cloud_dirve\server\src\config\db.config.js
 */

const env = require('./env')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    port: env.port,
    pool: env.pool
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// 引入表模型
db.user = require('../model/user.model')(sequelize, Sequelize);
db.file = require('../model/file.model')(sequelize, Sequelize);

module.exports = db