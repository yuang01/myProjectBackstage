// 单独的创建一个中间件，然后在app.js中注册使用
const jwt = require('jsonwebtoken')
async function check(ctx, next) {

    let url = ctx.url.split('?')[0]
    
    // 如果是登陆页面和注册页面就不需要验证token了
    if (url === '/user/login' || url === '/user/create') {
        await next()
    } else {

        // 否则获取到token
        let token = ctx.request.headers["authorization"]

        if (token) {
          let isPass = true;
          jwt.verify(token, 'secret', (error, decoded) => {
            if (error) {
              isPass = false;
              ctx.body = {
                code: 405,
                message:'token 已过期，请重新登陆'
              } 
            }
          })
          if (isPass) {
            await next();
          }
        }
    }
}



module.exports = check
