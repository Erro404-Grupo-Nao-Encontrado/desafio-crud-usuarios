const { config } = require('dotenv')
const { z } = require('zod')

// when run test automatic sets NODE_ENV to 'test'
if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test', override: true })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  PORT: z.coerce.number().default(3333),
  DATABASE_CLIENT: z.string(),
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ Ivalid environment variables.', _env.error.format())

  throw new Error('Ivalid environment variables.')
}

const env = _env.data

module.exports = { env }
