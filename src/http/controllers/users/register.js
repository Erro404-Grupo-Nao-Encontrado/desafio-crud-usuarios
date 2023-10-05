const { UsersRepository } = require('../../../repositories/user-repository')
const {
  EmailAlreadyExistsError,
} = require('../../../services/errors/email-already-exists-error')
const { RegisterService } = require('../../../services/register')

async function register(ctx) {
  const { nome, email, idade } = ctx.request.body

  const usersRepository = new UsersRepository()
  const registerService = new RegisterService(usersRepository)

  try {
    await registerService.execute({
      nome,
      email,
      idade,
    })

    ctx.status = 201
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      ctx.status = 409

      ctx.body = { error: err.message }
    }
  }
}

module.exports = { register }
