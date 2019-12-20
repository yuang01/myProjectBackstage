const router = require('koa-router')()
const Tag = require('../controllers/tag')

router.prefix('/tag')
router.get('/list', Tag.list)
router.get('/list/all', Tag.listAll)
router.post('/create', Tag.create)
router.post('/destroy', Tag.destroy)

module.exports = router
