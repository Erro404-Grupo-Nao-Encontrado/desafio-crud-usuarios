const {
  EmailAlreadyExistsError,
} = require('./errors/email-already-exists-error')

class RegisterService {
  #usersRepository

  constructor(usersRepository) {
    this.#usersRepository = usersRepository
  }

  async execute({ nome, email, idade }) {
    const emailAlreadyExists = await this.#usersRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError()
    }

    await this.#usersRepository.create({
      nome,
      email,
      idade,
    })
  }
}

module.exports = { RegisterService }
