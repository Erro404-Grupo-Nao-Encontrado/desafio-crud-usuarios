function verifyBody(schema) {
  return async function (ctx, next) {
    schema.parse(ctx.request.body)

    // if (result.success === false) {
    //   const formatted = result.error.format()

    //   ctx.status = 400
    //   ctx.body = formatted
    // }

    return next()
  }
}

module.exports = { verifyBody }
