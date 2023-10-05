const { knex } = require('../libs/database')

class UsersRepository {
  async create(data) {
    const user = await knex('users').insert(data)

    return user
  }

  async remove(name) {
    await knex('users').delete().where({
      nome: name,
    })
  }

  async findByEmail(email) {
    const user = await knex('users')
      .where({
        email,
      })
      .first()

    return user
  }

  async findByName(name) {
    const user = await knex('users')
      .where({
        nome: name,
      })
      .first()

    if (!user) {
      return null
    }

    return user
  }

  async findMany() {
    const users = await knex('users').select('*')

    return users
  }
}

module.exports = { UsersRepository }
