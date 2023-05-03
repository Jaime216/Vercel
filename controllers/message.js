// const authoriseToken = require('../middleware/authoriseToken')
const Chat = require('../models/chat')
const Message = require('../models/message')
const messagesRouter = require('express').Router()

messagesRouter.get('', async (req, res) => {
  const authorization = req.get('authorization')

  const chat = await Chat.findById(authorization).populate('messages')

  res.json(chat)
})

messagesRouter.post('', async (req, res) => {
  const { userName, content, chatId } = req.body

  const newMessage = new Message({
    writer: userName,
    content,
    Date: new Date().toISOString()
  })
  const newMessageSaved = await newMessage.save()

  const chat = await Chat.findById(chatId)

  const newMessages = chat.messages
    ? {
        messages: [...chat.messages, newMessageSaved]
      }
    : {
        messages: [newMessageSaved]
      }

  const chatUpdated = await Chat.findByIdAndUpdate(chatId, newMessages, { new: true }).populate('messages')
  res.json(chatUpdated)
})

module.exports = {
  messagesRouter
}
