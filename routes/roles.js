const router = require('koa-router')()
const Roles = require('../controllers/roles')

router.prefix('/role')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a roles response!'
})

router.get('/all', Roles.roleAll)
router.post('/update', Roles.update)
module.exports = router
