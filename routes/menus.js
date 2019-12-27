const router = require('koa-router')()
const Menus = require('../controllers/menus')

router.prefix('/menu')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a menus response!'
})
router.get('/getMenus', Menus.getMenus)
router.get('/getMenusByRoleId', Menus.getMenusByRoleId)
router.get('/getMenusByRoleName', Menus.getMenusByRoleName)
module.exports = router
