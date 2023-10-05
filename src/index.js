const { env } = require('./env/index')
const bodyParser = require('koa-bodyparser')
const Koa = require('koa')
const { userRoutes } = require('./http/controllers/users/routes')
const { errorHandler } = require('./http/middlewares/error-handler')

const PORT = env.PORT

const app = new Koa()

app.use(bodyParser())

app.use(errorHandler)

app.use(userRoutes.routes()).use(userRoutes.allowedMethods())

const server = app.listen(PORT)

module.exports = server
