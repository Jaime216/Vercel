const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const chatSchema = new Schema({
  users: [
    {
      userName: String,
      userId: Schema.Types.ObjectId,
      userNumber: Number
    }
  ],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
})

chatSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id

    delete returnedObject._id
    delete returnedObject.__v
  }
})

chatSchema.plugin(uniqueValidator)

const Chat = model('Chat', chatSchema)

module.exports = Chat
