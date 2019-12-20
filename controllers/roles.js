const Roles = require('../model/roles')
const Op = require('sequelize').Op
const roleAll = async (ctx) => {
  const data = await Roles.findAll()
  ctx.body = {
    code: 1000,
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
  destroy
}
