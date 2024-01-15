const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		const mongoURI = 'mongodb://localhost:27017/odds'

		await mongoose.connect(mongoURI)

		console.log('MongoDB connected successfully')
	} catch (error) {
		console.error('MongoDB connection failed:', error.message)
		process.exit(1)
	}
}

module.exports = connectDB
