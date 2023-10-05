const { z } = require('zod')

const userSchema = z.object({
  nome: z.string({
    required_error: 'O campo nome é obrigatório',
    invalid_type_error: 'O campo nome deve ser um texto.',
  }),

  email: z
    .string({
      required_error: 'O campo email é obrigatório',
    })
    .email({
      message: 'Email inválido',
    }),

  idade: z
    .number({
      required_error: 'O campo idade é obrigatório',
      invalid_type_error: 'O campo idade deve ser um número',
    })
    .min(18, {
      message: 'User must to be 18 or more',
    }),
})

module.exports = { userSchema }
