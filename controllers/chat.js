// const Message = require('../models/message')
const User = require('../models/user')
const Chat = require('../models/chat')

const authoriseToken = require('../middleware/authoriseToken')
// const mongodb = require('mongodb')
const chatRouter = require('express').Router()

chatRouter.post('', authoriseToken, async (req, res) => {
  const { userId, userName } = req
  const { number } = req.body

  const user = await User.findOne({ number })

  const newChat = new Chat({
    users: [
      {
        userName,
        userId,
        userNumber: number
      }, {
        userName: user.userName,
        userId: user._id.toString(),
        userNumber: user.number
      }
    ],
    messages: []
  })

  const savedChat = await newChat.save()

  const user1 = await User.findById(userId)
  const newUser1 = {
    chats: [savedChat._id, ...user1.chats]
  }
  await User.findByIdAndUpdate(userId, newUser1, { new: true })

  const user2 = await User.findById(user._id.toString())
  const newUser2 = {
    chats: [savedChat._id, ...user2.chats]
  }
  await User.findByIdAndUpdate(user._id.toString(), newUser2, { new: true })

  res.json(savedChat).status(201)
})

chatRouter.get('/all', async (req, res) => {
  const chats = await Chat.find({})

  res.json(chats)
})

chatRouter.get('', authoriseToken, async (req, res) => {
  const { userId } = req

  const user = await User.findById(userId)
  const chats = user.chats

  const c = []

  for await (const id of chats) {
    const receivedChat = await Chat.findById(id.toString()).populate('messages')
    c.push(receivedChat)
  }

  res.json(c)
//   const chatss = chats.map(result => Chat.findById(result.toString()).then(result => {
//     res.json(result)
//   }))
})

chatRouter.get('/:id', authoriseToken, async (req, res) => {
  const { id } = req.params

  const user = await Chat.findById(id).populate('messages')

  res.json(user)
})

module.exports = {
  chatRouter
}
