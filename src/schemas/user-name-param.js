const { z } = require('zod')

const userNameParam = z.object({
  name: z.string({
    invalid_type_error: 'Parametro deve ser um texto.',
  }),
})

module.exports = { userNameParam }
