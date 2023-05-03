const mongoose = require('mongoose')

const {
  NODE_ENV,
  MONGO_DB_URI,
  MONGO_DB_URI_TEST
} = process.env

const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

mongoose.connect(connectionString).then(() => {
  console.log('Database connected')
}
).catch(error => {
  console.error(error)
})
