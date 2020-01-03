const Roles = require('../model/roles')
const Menus = require('../model/menus')
const Department = require('../model/department')
const Op = require('sequelize').Op
const roleAll = async (ctx) => {
  let data = await Roles.findAll({
    include: [{
      model: Department, 
      attributes: ['name', 'desc', 'id'],
    }],
  })
  ctx.body = {
    code: 200,
    data
  }
}
const create = async (ctx) => {
  const params = ctx.request.body
  const checkMenus = params.checkMenus;
  if (!params.name) {
    ctx.body = {
      code: 100,
      message: '名称不能为空'
    }
    return false
  } else if (!params.desc) {
    ctx.body = {
      code: 100,
      message: '描述不能为空'
    }
    return false
  }
  let role = await Roles.create(params)
  let menus = await Menus.findAll({
    where: {
      id: {
        [Op.or]: checkMenus
      }
    }
  })
  // 更新该角色所对应的菜单
  role.setMenus(menus);
  ctx.body = {
    code: 200,
    message: '创建成功'
  }
}
const update = async (ctx) => {
  const body = ctx.request.body;
  const checkMenus = body.checkMenus;

  const where = {
    id: body.id
  }
  await Roles.update(body, { where });

  let role = await Roles.findOne({
    where
  })
  let menus = await Menus.findAll({
    where: {
      id: {
        [Op.or]: checkMenus
      }
    }
  })
  // 更新该角色所对应的菜单
  role.setMenus(menus);

  ctx.body = {
    code: 200,
    message: '更新成功'
  }
};
const destroy = async ctx => {
  const where = {
    id: ctx.request.query.id
  };
  await Roles.destroy({where})
  ctx.body = {
    code: 200,
    desc: '删除成功'
  }
}
module.exports = {
  create,
  roleAll,
  update,
  destroy
}
