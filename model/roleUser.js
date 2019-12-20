const sequelize = require('../sequelize')
const Sequelize = require('sequelize')
const moment = require('moment') // 日期处理库
const roles = require('./roles')
const users = require('./users')
// 定义表结构 -- 角色

const roleUser = sequelize.define('roleUser', {
  id: {
    type: Sequelize.INTEGER(11), // 设置字段类型
    primaryKey: true, // 设置为主建
		autoIncrement: true, // 自增
	},
},
{
  // sequelize会自动使用传入的模型名（define的第一个参数）的复数做为表名 设置true取消默认设置
	freezeTableName: true,
})
roles.belongsToMany(users, {'through': roleUser});
users.belongsToMany(roles, {'through': roleUser});
module.exports = roleUser
