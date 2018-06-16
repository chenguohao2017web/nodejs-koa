const Koa = require('koa')
const route = require('koa-route')
const path = require('path')
const koaStatic = require('koa-static')
const koaBody = require('koa-body')

const app = new Koa()

// 定义静态资源
const static = koaStatic(path.join(__dirname, 'dist'))

// 定义重定向中间件
const redirect = ctx => {
  ctx.response.redirect('/index.html')
}

// 定义表单接口中间件
const post = ctx => {
  // if (ctx.request.accepts('json'))
  const body = ctx.request.body
  if (body.username == 'aaa' && body.password === '123456') {
    ctx.response.type = 'json'
    ctx.response.body = {
      message: '登陆成功',
      token: 'fjjksjdkljfkld&&%$#%$@%',
      name: 'desc'
    }
  } else {
    ctx.response.type = 'json'
    ctx.response.body = {
      message: '账户或者密码信息错误',
      data: {}
    }
  }
}

// 使用静态资源
app.use(static)

// 使用第三方表单解析
app.use(koaBody())

// 使用重定向
app.use(route.get('/', redirect))

// 使用接口
app.use(route.post('/api/post', post))

app.listen(8080);