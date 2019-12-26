const Menus = require('../model/menus')
const Roles = require('../model/roles')
const Op = require('sequelize').Op
const getMenus = async (ctx) => {
  let menus = await Menus.findAll();
  function treeNode(id, parentId, desc, createdAt, name, path, title, icon, component, children) {
    this.id = id;
    this.parentId = parentId;
    this.desc = desc;
    this.createdAt = createdAt;
    this.name = name;
    this.label = title;
    this.path = path;
    this.title = title;
    this.icon = icon;
    this.component = component;
    this.children = children;
  }

  function getDFSTree(menus, parentId) {
    let treelist = [];
    let checkList = [];
    menus.forEach(el => {
      if (el.parentId === parentId) {
        const tree = new treeNode(
          el.id,
          el.parentId,
          el.desc,
          el.createdAt,
          el.name,
          el.path,
          el.title,
          el.icon,
          el.component,
          getDFSTree(menus, el.id)
        )
        treelist.push(tree);
      }
    });
    return treelist;
  }
  const menuTree = getDFSTree(menus, 0); // 将部门表拼装成一个树形结构，因为有的部门有子部门

  ctx.body = {
    code: 200,
    data: menuTree
  }
}
const getMenusByRoleId = async (ctx) => {
  const roleId = ctx.request.query.id;
  const data = await Roles.findOne({ 
    include: [{
      model: Menus, 
      through: { attributes: [] }, // 排除中间表  
    }],
    where: { id: roleId } 
  })
  
  let checkMenus = [];
  data.menus.forEach(el => {
    checkMenus.push(el.id);
  })

  ctx.body = {
    code: 200,
    data: checkMenus
  }
}

module.exports = {
  getMenus,
  getMenusByRoleId
}
