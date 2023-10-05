const Router = require('koa-router')
const { listUsers } = require('../../controllers/users/list')
const { verifyBody } = require('../../middlewares/verify-body')
const { userSchema } = require('../../../schemas/users')
const { register } = require('../../controllers/users/register')
const { detail } = require('../../controllers/users/detail')
const { verifyParam } = require('../../middlewares/verify-param')
const { userNameParam } = require('../../../schemas/user-name-param')
const { remove } = require('../../controllers/users/remove')

const userRoutes = new Router()

userRoutes.get('/', async (ctx) => {
  ctx.body = 'Hello, World!'
})

userRoutes.get('/users', listUsers)
userRoutes.get('/user/:name', verifyParam(userNameParam), detail)
userRoutes.post('/user', verifyBody(userSchema), register)
userRoutes.delete('/user/:name', verifyParam(userNameParam), remove)

module.exports = { userRoutes }
