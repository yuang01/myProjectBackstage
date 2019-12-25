const router = require('koa-router')()
const Department = require('../controllers/department')

router.prefix('/department')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a Department response!'
})
module.exports = router
