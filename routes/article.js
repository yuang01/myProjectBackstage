const router = require('koa-router')()
const Article = require('../controllers/article')

router.prefix('/article')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a article response!'
});
router.post('/create', Article.create);
router.post('/update', Article.update);
router.get('/list', Article.list);
router.get('/getArticleById', Article.getArticleById);
router.get('/delete', Article.destroy);
module.exports = router
