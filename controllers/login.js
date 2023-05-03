const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res) => {
  const { userName, password } = req.body
  console.log(userName, password)
  const user = await User.findOne({ userName })

  console.log(password)
  const correctPassword = user === null
    ? res.send({ error: 'Incorrect user or password' })
    : await bcrypt.compare(password.toString(), user.passwordHash)

  try {
    if (correctPassword) {
      const dataForToken = {
        userName: user.userName,
        id: user._id
      }
      const token = jwt.sign(dataForToken, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 7
      })
      res.send({
        userName: user.userName,
        name: user.name,
        token
      }).status(202)
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = {
  loginRouter
}
