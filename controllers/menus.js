const Menus = require('../model/menus')
const Roles = require('../model/roles')
const Op = require('sequelize').Op

function treeNode(id, index, parentId, desc, createdAt, name, path, title, icon, component, isMenu, hidden, children) {
  this.id = id;
  this.index = index;
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
  this.isMenu = isMenu;
  this.hidden = hidden;
  this.children = children;
}

function getDFSTree(menus, parentId) { 
  let treelist = []
  menus.forEach(el => {
    if (el.parentId === parentId) {
      const tree = new treeNode(
        el.id,
        el.index,
        el.parentId,
        el.desc,
        el.createdAt,
        el.name,
        el.path,
        el.title,
        el.icon,
        el.component,
        el.isMenu,
        el.hidden,
        getDFSTree(menus, el.id)
      )
      treelist.push(tree);
    }
  });
  return treelist;
}
// 树形结构排序函数
function _sort(data) {
  for(let i = 0; i < data.length; i++) {
    _sort(data[i].children)
  }
  data.sort(function(a,b) {
    return a.index - b.index
  })
  return data;
}


const getMenus = async (ctx) => {
  let menus = await Menus.findAll();
  
  let menuTree = getDFSTree(menus, 0); // 将菜单表拼装成一个树形结构，因为有的菜单有子菜单
  menuTree = _sort(menuTree);
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
  for (let i = 0; i < data.menus.length; i++) {
    // 找到该菜单儿子的总数
    let menus = await Menus.findAll({
      where: {
        parentId: data.menus[i].id
      }
    });
    // 假如说一个菜单有5个子菜单，他底下选中的子菜单要等于5个，他才能被选中，返回给前端
    let oldChildLength = menus.length;
    let newChildLength = filterCurMenusChildLength(data.menus[i].id);
    if (oldChildLength <= newChildLength) {
      checkMenus.push(data.menus[i].id);
    } else {
      let parentMenu = await Menus.findOne({
        where: {
          id: data.menus[i].parentId
        }
      });
      if (parentMenu) {
        const deleteIndex = checkMenus.indexOf(parentMenu.id);
        deleteIndex !== -1 && (checkMenus.splice(deleteIndex, 1));
      }
    }
  }
  function filterCurMenusChildLength(id) {
     // 得到一个菜单被选中的子菜单
    let arr = [];
    data.menus.forEach(el => {
      if (el.parentId === id) {
        arr.push(el);
      }
    });
    return arr.length;
  }

  ctx.body = {
    code: 200,
    data: checkMenus
  }
}

const getMenusByRoleName = async (ctx) => {
  let roleName = ctx.request.query.name;
  roleName = eval("("+roleName+")");
  const data = await Roles.findAll({ 
    include: [{
      model: Menus,
      where: {
        isMenu: 1
      },
      through: { attributes: [] }, // 排除中间表  
    }],
    where: { 
      name: {
        [Op.or]: roleName
      }
    }
  });

  let menusArr = [];
  data.forEach(el => {
    menusArr = menusArr.concat(el.menus);
  })
  // 数组对象去重
  let obj = {};
  menusArr = menusArr.reduce((item, next) => {
    if (!obj[next.id]) {
      item.push(next);
      obj[next.id] = true;
    }
    return item;
  }, []);

  let menus = [...menusArr];
  for (let i = 0; i < menusArr.length; i++) {
    const hasParentMenu = menusArr.find(elchild => {
      return elchild.id === menusArr[i].parentId;
    });
    if (!hasParentMenu && (menusArr[i].parentId !== 0)) {
      let menu = await Menus.findOne({
        where: {
          id: menusArr[i].parentId
        },
      })
      menus.push(menu); // 将没有的父级菜单添加进来
    }
  }
  let menuTree = getDFSTree(menus, 0);
  menuTree = _sort(menuTree);

  ctx.body = {
    code: 200,
    data: menuTree
  }
}

const addMenu = async (ctx) => {
  const data = ctx.request.body
  try {
    let newMenu = await Menus.create(data);
    ctx.body = {
      code: 200,
      message: '菜单创建成功',
    }
  }
  catch(err) {
    const msg = err.errors[0]
    ctx.body = {
      code: 300,
      message: msg.value + msg.message
    }
  }
}

module.exports = {
  getMenus,
  getMenusByRoleId,
  getMenusByRoleName,
  addMenu
}
