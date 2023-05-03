const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const messageSchema = new Schema({
  writer: { type: Schema.Types.ObjectId, ref: 'User' },
  Date,
  content: { type: String }
})

messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id

    delete returnedObject._id
    delete returnedObject.__v
  }
})

messageSchema.plugin(uniqueValidator)

const Message = model('Message', messageSchema)

module.exports = Message
