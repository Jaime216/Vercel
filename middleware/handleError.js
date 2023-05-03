const ERROR_DICTIONARY = {
  ValidationError: (res, err) => {
    res.status(400).send({ errorName: err.name, error: 'User name alredy exist' })
  },
  DefaultError: (res, err) => {
    console.log(err.name)
    res.status(500)
  },
  CastError: (response, error) => {
    console.log(error)
    response
      .status(400)
      .send({ error: 'La Id introducida no existe' })
  },
  JsonWebTokenError: (response, error) => {
    response
      .status(400)
      .json({ error })
  },
  TokenExpirerError: (response, error) => {
    response
      .status(401)
      .send({ error: 'Token expired' })
  },
  TypeError: (response, error) => {
    response.status(400).send({ error: 'La id introducida no existe' })
  }
}

// Repasar
module.exports = (err, req, res, next) => {
  const handler = ERROR_DICTIONARY[err.name] || ERROR_DICTIONARY.DefaultError
  handler(res, err)
}
