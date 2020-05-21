const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body');
const logger = require('koa-logger')
const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
const jwtKoa = require('koa-jwt');      // 用于路由权限控制
const cors = require('koa2-cors')
const checkToken = require('./middleware/checkToken.js')

const modelIndex = require('./model/index')
const index = require('./routes/index')
const users = require('./routes/users')
const tag = require('./routes/tag')
const roles = require('./routes/roles')
const roleUser = require('./model/roleUser')
const department = require('./routes/department')
const menus = require('./routes/menus')
const article = require('./routes/article')
const kanban = require('./routes/kanban')




// error handler
onerror(app)
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 600*1024*1024    // 设置上传文件大小最大限制，默认6M
  },
}));
// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

/* jwt密钥 */
const secret = 'secret';

/* 当token验证异常时候的处理，如token过期、token错误 */
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        ok: false,
        msg: err.originalError ? err.originalError.message : err.message
      }
    } else {
      throw err;
    }
  });
});

// 配置跨域
app.use(cors({
  origin: function (ctx) {
    return '*'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-token'],
}))

// 验证token的中间件函数
app.use(checkToken)
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(tag.routes(), tag.allowedMethods())
app.use(roles.routes(), roles.allowedMethods())
app.use(department.routes(), department.allowedMethods())
app.use(menus.routes(), menus.allowedMethods())
app.use(article.routes(), article.allowedMethods())



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});



module.exports = app
