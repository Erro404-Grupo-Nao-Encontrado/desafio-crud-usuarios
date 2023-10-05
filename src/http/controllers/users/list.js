const { UsersRepository } = require('../../../repositories/user-repository')
const { ListUsersService } = require('../../../services/list-users')

async function listUsers(ctx) {
  const usersRepsitory = new UsersRepository()
  const listUsersService = new ListUsersService(usersRepsitory)

  const { users } = await listUsersService.execute()

  ctx.body = users
}

module.exports = { listUsers }
