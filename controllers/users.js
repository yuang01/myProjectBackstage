const Users = require('../model/users')
const Roles = require('../model/roles');
const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
const Op = require('sequelize').Op;
const all = async (ctx) => {
  const { pageSize = 10, page = 1, name, sex } = ctx.request.query;
  let createdDate = ctx.request.query.createdDate;
  let where = {};
  createdDate = eval("("+createdDate+")"); // 根据创建时间查询
  if (createdDate && createdDate.length > 1) {
    const startDate = createdDate[0].split(' ')[0];
    const startTime = createdDate[0].split(' ')[1];
    const endDate = createdDate[1].split(' ')[0];
    const endTime = createdDate[1].split(' ')[1];
    where.createdAt = {
      [Op.between]: [`${startDate}T${startTime}.000Z`, `${endDate}T${endTime}.000Z`]
    }
  }
  name && name !== '' && (where.name = {
    [Op.like]: '%' + name + '%' // 模糊查询
  });
  sex && sex !== '' && (where.sex = parseInt(sex));
  const data = await Users.findAndCountAll({
    order:[['id', 'DESC']], // 降序查询
    limit: parseInt(pageSize), //每页10条
    offset: (page - 1) * pageSize, //第x页*每页个数
    distinct: true,
    include: [{
      model: Roles, 
      attributes: ['name'],
      through: { attributes: [] }, // 排除中间表  
    }],
    where: where
  });
  data.pages = Math.ceil(data.count / pageSize);
  ctx.body = {
    code: 200,
    data
  }
}
const user = async (ctx) => {
  const body = ctx.request.body;
  const where = {
    name: body.username,
    password: body.password
  }
  let data = await Users.findOne({
    where,
    raw: true,
  })
  // 如果找到用户则返回成功
  if (data) {
    ctx.body = {
      data,
      token: getToken({ username: body.username, password: body.password }),
      code: 200,
      message: '登陆成功'
    }
  } else { // 否则返回失败
    ctx.body = {
      code: 100,
      message: '用户名或密码不正确'
    }
  }
}
const userInfo = async (ctx) => {
  // 前端访问时传递token，通过token得到userinfo, 还可以通过ctx.query get中的参数token
  const userinfo = getJWTPayload(ctx.headers.authorization)

  // 如果找到用户则返回成功
  if (userinfo) {
    const { username, password } = userinfo;
    const result = await Users.findAll({ // 通过用户找到所对应的所有角色权限
      include: [{
        model: Roles, 
        attributes: ['name'],
        through: { attributes: [] }, // 排除中间表  
      }],
      where: {
        name: username,
        password
      },
      raw: false
    })
    const { avatar, introduction, name, id, sex } = result[0];
    let data = { avatar, introduction, name, id, sex };
    let roles = [];
    result[0].roles.forEach(el => {
      roles.push(el.name);
    });
    data.roles = roles;
    data.password = password;
    ctx.body = {
      data: data,
      code: 200,
      message: 'success'
    }
  } else { // 否则返回失败
    ctx.body = {
      code: 100,
      message: 'token失效'
    }
  }
}
// 创建用户
const create = async (ctx) => {
  const params = ctx.request.body
  let data = params;
  !data.avatar && (data.avatar = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576503673945&di=4427f71ea7562f888f52c5614fad9f27&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2019-01-16%2F145116704.jpg');
  try {
    // 新创建的用户默认权限都是 other
    let newUser = await Users.create(data);
    let roles = await Roles.findAll({ where: { name: 'other' } });
    await newUser.setRoles(roles);
    ctx.body = {
      code: 200,
      message: '用户创建成功',
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
// 更新
const update = async ctx => {
  const where = {
    id: ctx.request.body.id
  };
  await Users.update(ctx.request.body, {where});
  ctx.body = {
    code: 200,
    message: '更新成功'
  }
}
// 删除
const destroy = async ctx => {
  const where = {
    id: ctx.request.query.id
  };
  await Users.destroy({where})
  ctx.body = {
    code: 200,
    message: '删除成功'
  }
}
/* 获取一个期限为4小时的token */
function getToken(payload = {}) {
  return jwt.sign(payload, 'secret', { expiresIn: '4h' });
}
/* 通过token获取JWT的payload部分 */
function getJWTPayload(token) {
  // 验证并解析JWT
  return jwt.verify(token, 'secret');
}
module.exports = {
  user,
  userInfo,
  create,
  all,
  update,
  destroy
}
