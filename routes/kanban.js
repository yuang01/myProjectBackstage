const router = require('koa-router')()
const Kanban = require('../controllers/kanban')

router.prefix('/kanban')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a kanban response!'
});
module.exports = router
