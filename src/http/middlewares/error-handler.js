const { ZodError } = require('zod')

async function errorHandler(ctx, next) {
  try {
    await next()
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.issues.map((err) => {
        return {
          message: err.message,
        }
      })

      ctx.status = 400
      ctx.body = errors

      return
    }
    console.error(err.message)
    ctx.status = 500
    ctx.body = { Error: 'Internal server error.' }
  }
}

module.exports = { errorHandler }
