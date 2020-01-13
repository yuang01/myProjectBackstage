const sequelize = require('../sequelize')
const Sequelize = require('sequelize')
const moment = require('moment') // 日期处理库
// 定义表结构 -- 菜单

const menus = sequelize.define('menus', {
  id: {
    type: Sequelize.INTEGER(11), // 设置字段类型
    primaryKey: true, // 设置为主建
    autoIncrement: true, // 自增
  },
  parentId: {
    type: Sequelize.INTEGER(11),
  },
  name: {
    type: Sequelize.STRING,
  },
  path: {
    type: Sequelize.STRING,
  },
  desc: {
    type: Sequelize.STRING,
  },
  isMenu: { // 是否是菜单，用于区分按钮权限，按钮权限也是用这个表
    type: Sequelize.INTEGER(1),
  },
  title: {
    type: Sequelize.STRING,
  },
  hidden: {
    type: Sequelize.INTEGER(1)
  },
  index: {
    type: Sequelize.INTEGER(11)
  },
  icon: {
    type: Sequelize.STRING,
  },
  component: {
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
module.exports = menus
