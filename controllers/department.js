const Department = require('../model/department')
const Op = require('sequelize').Op

const all = async (ctx) => {
  let data = await Department.findAll({
  });

  function treeNode(id, parentId, desc, createdAt, name, children) {
    this.id = id;
    this.parentId = parentId;
    this.desc = desc;
    this.createdAt = createdAt;
    this.name = name;
    this.children = children;
  }

  function getDFSTree(data, parentId) {
    let treelist = [];
    data.forEach(el => {
      if (el.parentId === parentId) {
        const tree = new treeNode(
          el.id,
          el.parentId,
          el.desc,
          el.createdAt,
          el.name,
          getDFSTree(data, el.id)
        )
        treelist.push(tree);
      }
    });
    return treelist;
  }
  const tree = getDFSTree(data, 0); // 将部门表拼装成一个树形结构，因为有的部门有子部门

  ctx.body = {
    code: 200,
    data: tree
  }
};

const update = async (ctx) => {
  const params = ctx.request.body;
  const where = {
    id: params.id
  }
  await Department.update(params, { where });
  ctx.body = {
    code: 200,
    message: '更新成功'
  }
};

// 删除
const destroy = async ctx => {
  const where = {
    id: ctx.request.query.id
  };
  await Department.destroy({where})
  ctx.body = {
    code: 200,
    message: '删除成功'
  }
};

module.exports = {
  all,
  update,
  destroy
}
