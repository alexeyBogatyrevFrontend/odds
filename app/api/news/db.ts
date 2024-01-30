// utils/db.js
import mongoose from 'mongoose'

const MONGODB_URI_NEWS = 'mongodb://odds:27017/odds'

const connectDB = async () => {
	if (mongoose.connections[0].readyState) return

	try {
		await mongoose.connect(MONGODB_URI_NEWS)
		console.log('MONGODB_URI_NEWS connected successfully')
	} catch (error) {
		console.error('Error connecting to MongoDB:', error)
		process.exit(1)
	}
}

export default connectDB
