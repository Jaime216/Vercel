const cors = require('cors')
const express = require('express')
require('dotenv').config()
require('./mongoose')
const bodyParse = require('body-parser')

app.use(cors())
// Express app
const app = express()

app.use(bodyParse.json())
// Express Routers
const { userRouter } = require('./controllers/user')
const { loginRouter } = require('./controllers/login')
const { messagesRouter } = require('./controllers/message')
const { chatRouter } = require('./controllers/chat')

// Middlewares
const handleErrors = require('./middleware/handleError')

// Se necesita para las request
app.use(express.json())

// React App Static
app.use('', express.static('../FrontEnd/dist'))

// Use Routers
aa.get('', (req, res ) => { res.send(<h1>Hola mundo</h1>)})

app.use('/api/chat', chatRouter)

app.use('/api/users', userRouter)

app.use('/api/login', loginRouter)

app.use('/api/messages', messagesRouter)

app.use(handleErrors)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})

module.exports = {
  server,
  app
}
