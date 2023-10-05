const { UsersRepository } = require('../../../repositories/user-repository')
const { DetailUserService } = require('../../../services/detail-user')
const {
  UserNotFoundError,
} = require('../../../services/errors/user-not-found-error')

async function detail(ctx) {
  const { name } = ctx.request.params

  const usersRepository = new UsersRepository()
  const detailUser = new DetailUserService(usersRepository)

  try {
    const { user } = await detailUser.execute(name)

    ctx.body = user
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      ctx.status = 404
      ctx.body = { error: err.message }
    }
  }
}

module.exports = { detail }
