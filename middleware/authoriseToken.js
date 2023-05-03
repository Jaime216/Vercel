const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')

  let token = null
  let decodedToken = null

  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)

    try {
      decodedToken = jwt.verify(token, process.env.SECRET)

      if (token && decodedToken.id) {
        request.userName = decodedToken.userName
        request.userId = decodedToken.id
        next()
      }
    } catch (err) {
      const error = {
        name: 'JsonWebTokenError'
      }
      console.log(err)
      next(error)
    }
  }
}
