const Article = require('../model/article')
const Op = require('sequelize').Op
const list = async (ctx) => {
  const { limit = 10, page = 1, title, author } = ctx.request.query;

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

  title && title !== '' && (where.title = {
    [Op.like]: '%' + title + '%' // 模糊查询
  });
  author && author !== '' && (where.author = {
    [Op.like]: '%' + author + '%' // 模糊查询
  });

  let data = await Article.findAndCountAll({
    order:[['id', 'DESC']], // 降序查询
    limit: parseInt(limit), //每页10条
    offset: (page - 1) * limit, //第x页*每页个数
    // distinct: true,
    attributes: ['id', 'title', 'author', 'content_short', 'importance', 'createdAt'],
    where
  });
  data.pages = Math.ceil(data.count / limit);
  ctx.body = {
    code: 200,
    data: data
  }
};
const getArticleById = async (ctx) => {
  const id = ctx.request.query.id;
  let data = await Article.findOne({
    where: {
      id: id
    },
  });

  ctx.body = {
    code: 200,
    data: data
  }
};
// 更新
const update = async ctx => {
  const where = {
    id: ctx.request.body.id
  };
  await Article.update(ctx.request.body, { where });
  ctx.body = {
    code: 200,
    message: '更新成功'
  }
}

// 创建部门
const create = async (ctx) => {
  const data = ctx.request.body
  try {
    // 新创建的用户默认权限都是 other
    let newArticle = await Article.create(data);
    ctx.body = {
      code: 200,
      message: '文章创建成功',
    }
  }
  catch (err) {
    const msg = err.errors[0]
    ctx.body = {
      code: 300,
      message: msg.value + msg.message
    }
  }
}

// 删除
const destroy = async ctx => {
  const where = {
    id: ctx.request.query.id
  };
  await Article.destroy({ where })
  ctx.body = {
    code: 200,
    message: '删除成功'
  }
}
module.exports = {
  create,
  list,
  getArticleById,
  update,
  destroy
}
