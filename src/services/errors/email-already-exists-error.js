class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Email já existe.')
  }
}

module.exports = { EmailAlreadyExistsError }
