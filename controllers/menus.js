const Menus = require('../model/menus')
const Roles = require('../model/roles')
const Op = require('sequelize').Op

function treeNode(id, parentId, desc, createdAt, name, path, title, icon, component, children) {
  this.id = id;
  this.parentId = parentId;
  this.desc = desc;
  this.createdAt = createdAt;
  this.name = name;
  this.label = title;
  this.path = path;
  this.meta = {
    title,
    icon,
  };
  this.component = component;
  this.children = children;
}

function getDFSTree(menus, parentId) {
  let treelist = []
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

const getMenus = async (ctx) => {
  let menus = await Menus.findAll();
  
  const menuTree = getDFSTree(menus, 0); // 将菜单表拼装成一个树形结构，因为有的菜单有子菜单

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

const getMenusByRoleName = async (ctx) => {
  const roleName = ctx.request.query.name;
  const data = await Roles.findOne({ 
    include: [{
      model: Menus, 
      through: { attributes: [] }, // 排除中间表  
    }],
    where: { name: roleName } 
  })
  
  let menus = [...data.menus];
  for (let i = 0; i < data.menus.length; i++) { // 不知道什么原因，koa中的foreach不能使用async
    const hasParentMenu = menus.find(elchild => {
      return elchild.id === data.menus[i].parentId;
    });
    if (!hasParentMenu && (data.menus[i].parentId !== 0)) {
      let menu = await Menus.findOne({
        where: {
          id: data.menus[i].parentId
        },
      })
      menus.push(menu);
    }
  }
  const menuTree = getDFSTree(menus, 0);

  ctx.body = {
    code: 200,
    data: menuTree
  }
}

module.exports = {
  getMenus,
  getMenusByRoleId,
  getMenusByRoleName
}