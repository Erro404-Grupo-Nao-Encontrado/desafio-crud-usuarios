const { UsersRepository } = require('../../../repositories/user-repository')
const {
  UserNotFoundError,
} = require('../../../services/errors/user-not-found-error')
const { RemoveUserService } = require('../../../services/remove-user')

async function remove(ctx) {
  const { name } = ctx.request.params

  const usersRepository = new UsersRepository()
  const removeUserService = new RemoveUserService(usersRepository)

  try {
    await removeUserService.execute(name)

    ctx.status = 204
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      ctx.status = 404

      ctx.body = { error: err.message }
    }
  }
}

module.exports = { remove }
