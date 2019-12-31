const router = require('koa-router')()
const Department = require('../controllers/department')

router.prefix('/department')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a Department response!'
});

router.get('/all', Department.all);
router.post('/update', Department.update);
router.get('/destroy', Department.destroy);
module.exports = router
