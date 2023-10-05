const { knex: setupKnex } = require('knex')
const { env } = require('../env/index')

const config = {
  client: env.DATABASE_CLIENT,
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'js',
    directory: './db/migrations',
  },
}

const knex = setupKnex(config)

module.exports = { knex, config }
