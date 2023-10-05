const { UserNotFoundError } = require('./errors/user-not-found-error')

class RemoveUserService {
  #usersRepository

  constructor(usersRepository) {
    this.#usersRepository = usersRepository
  }

  async execute(name) {
    const user = await this.#usersRepository.findByName(name)

    if (!user) {
      throw new UserNotFoundError()
    }

    await this.#usersRepository.remove(name)
  }
}

module.exports = { RemoveUserService }
