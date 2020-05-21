const roles = require('./roles')
const department = require('./department')
const roleMenu = require('./roleMenu')
const user_kanban = require('./user_kanban')
// 部门和角色权限
department.hasMany(roles);
roles.belongsTo(department);

