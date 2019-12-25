const Roles = require('../model/roles')
const Department = require('../model/department')
const Op = require('sequelize').Op
const roleAll = async (ctx) => {
  let data = await Roles.findAll({
    include: [{
      model: Department, 
      attributes: ['name', 'desc', 'id'],
    }],
    // 'include': [Department],
  })
  ctx.body = {
    code: 200,
    data
  }
}
const create = async (ctx) => {
  const params = ctx.request.body
  if (!params.name) {
    ctx.body = {
      code: 1003,
      desc: '标签不能为空'
    }
    return false
  }
  try {
    await Roles.create(params)
    ctx.body = {
      code: 1000,
      data: '创建成功'
    }
  }
  catch(err) {
    const msg = err.errors[0]
    ctx.body = {
      code: 300,
      data: msg.value + msg.message
    }
  }
}
const update = async (ctx) => {
  const params = ctx.request.body;
  const where = {
    id: params.id
  }
  await Roles.update(params, { where });
  ctx.body = {
    code: 200,
    message: '更新成功'
  }
};
const destroy = async ctx => {
  await Roles.destroy({where: ctx.request.body})
  ctx.body = {
    code: 1000,
    desc: '删除成功'
  }
}
module.exports = {
  create,
  roleAll,
  update,
  destroy
}
