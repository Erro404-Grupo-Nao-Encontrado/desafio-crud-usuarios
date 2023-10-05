class UserNotFoundError extends Error {
  constructor() {
    super('User not found')
  }
}

module.exports = { UserNotFoundError }
