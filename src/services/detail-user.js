const { UserNotFoundError } = require('./errors/user-not-found-error')

class DetailUserService {
  #usersRepository

  constructor(usersRepository) {
    this.#usersRepository = usersRepository
  }

  async execute(name) {
    const user = await this.#usersRepository.findByName(name)

    if (!user) {
      throw new UserNotFoundError()
    }

    return {
      user,
    }
  }
}

module.exports = { DetailUserService }
