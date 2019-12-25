const sequelize = require('../sequelize')
const Sequelize = require('sequelize')
const moment = require('moment') // 日期处理库
const roles = require('./roles')
// 定义表结构 -- 部门

const department = sequelize.define('department', {
  id: {
    type: Sequelize.INTEGER(11), // 设置字段类型
    primaryKey: true, // 设置为主建
    autoIncrement: true, // 自增
  },
  parentName: {
    type: Sequelize.STRING,
    unique: { // 唯一
      msg: '已添加'
    }
  },
  name: {
    type: Sequelize.STRING,
    unique: { // 唯一
      msg: '已添加'
    }
  },
  desc: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      // this.getDataValue 获取当前字段value
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm')
    }
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm')
    }
  }
},
{
  // sequelize会自动使用传入的模型名（define的第一个参数）的复数做为表名 设置true取消默认设置
  freezeTableName: true,
})
// department.hasMany(roles);
module.exports = department

