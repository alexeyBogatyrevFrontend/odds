const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const newsRouter = require('./routes/news.routes')

const app = express()
const PORT = 3002

app.use(cors())

app.use(bodyParser.json({ limit: '5mb' }))

const mongoURI = 'mongodb://localhost:27017/odds'

mongoose.connect(mongoURI)

const connection = mongoose.connection
connection.once('open', () => {
	console.log('MongoDB database connection established successfully')
})

app.use('/news', newsRouter)

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`)
})
