const roles = require('./roles')
const department = require('./department')

// 部门和角色权限
department.hasMany(roles);
roles.belongsTo(department);
