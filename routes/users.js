const router = require('koa-router')()
const Users = require('../controllers/users')
router.prefix('/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
// 通过条件查找用户或者获取所有用户
router.get('/all', Users.all)
// 通过token获取用户信息
router.get('/info', Users.userInfo)
// 用户登陆
router.post('/login', Users.user)
// 用户注册
router.post('/create', Users.create)
// 用户更新
router.post('/update', Users.update)
// 用户删除
router.get('/destroy', Users.destroy)

module.exports = router
