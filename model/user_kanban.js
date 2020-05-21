const sequelize = require('../sequelize')
const Sequelize = require('sequelize')
const moment = require('moment') // 日期处理库
const user = require('./users')
const kanban = require('./kanban')
const user_kanban = sequelize.define('user_kanban', {
  id: {
    type: Sequelize.INTEGER(11), // 设置字段类型
    primaryKey: true, // 设置为主建
    autoIncrement: true, // 自增
  },
},
  {
    // sequelize会自动使用传入的模型名（define的第一个参数）的复数做为表名 设置true取消默认设置
    freezeTableName: true,
  }
)
// 用户和看板
user.belongsToMany(kanban, { 'through': user_kanban });
kanban.belongsToMany(user, { 'through': user_kanban });