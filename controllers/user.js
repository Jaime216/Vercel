const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

userRouter.post('/', async (req, res, next) => {
  const { userName, name, password, number } = req.body

  try {
    // Recordar utilizar los modelos para guardar en la base de datos
    const newUser = new User({
      userName,
      name,
      passwordHash: await bcrypt.hash(password, 10),
      number
    })

    const user = await newUser.save()

    res.status(201).json(user)
  } catch (error) {
    console.log(error.name)
    next(error)
  }
})

module.exports = {
  userRouter
}
