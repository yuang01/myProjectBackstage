const router = require('koa-router')()
const fs = require('fs');
const path = require('path');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
// 上传文件
router.post('/uploadfile',  async (ctx, next) => {
  // 有upload文件夹就执行函数，没有则创建该文件夹
  let mkdirs = (dirname, callback) => {
    fs.exists(dirname, function(exists) {
      if (exists) {
        callback();
      } else {
        mkdirs(path.dirname(dirname), function() {
          fs.mkdir(dirname, callback);
        });
      }
    });
  }; // 该方法其实可有可无，因为public/upload这个文件夹是存在的, 为了以后的学习可以留着
  function uploadFile() {
    return new Promise((resolve, reject) => {
      const file = ctx.request.files.file;	// 获取上传文件
      const reader = fs.createReadStream(file.path);	// 创建可读流
      const ext = file.name.split('.').pop();		// 获取上传文件扩展名
      
      mkdirs('public/upload', function() {
        const upStream = fs.createWriteStream(`public/upload/${Math.random().toString()}.${ext}`); // 创建可写流
        reader.pipe(upStream);	// 可读流通过管道写入可写流
        resolve(upStream);
      })
    });
  }
  let upStream = await uploadFile();
  let index = upStream.path.indexOf('/'); // 去掉public字符串
  let url = `http://${ctx.req.headers.host}${upStream.path.substring(index)}`;

  ctx.body = {
    code: 200,
    data: url,
    message: '上传成功'
  }
})

module.exports = router
